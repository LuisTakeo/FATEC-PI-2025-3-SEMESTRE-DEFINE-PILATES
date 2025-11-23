<?php

namespace App\Adapters\Database\Aulas;

use App\Application\DTOs\AulaDTO;
use App\Application\Ports\Aulas\AulasRepositoryPort;
use App\Models\Studio;
use App\Models\TypeClass;
use App\Models\ScheduleStudio;
use App\Models\StudentSchedule;
use Carbon\Carbon;
use Date;
use DateTime;
use DB;
use Exception;
use Log;

class AulasMySQLAdapter implements AulasRepositoryPort
{
    public function getAulasTypes(): array
    {
        $aulasTypes = TypeClass::all();
        if (!$aulasTypes) {
            return [];
        }

        $aulasTypes = collect($aulasTypes);
        $aulasTypes = $aulasTypes->map(function ($item) {
            return [
                'id' => $item->Id_type_classes,
                'type' => $item->typeclass,
            ];
        });
        return $aulasTypes->toArray();
    }

    public function getStudios(): array
    {
        $studios = Studio::select('Id_studios', 'studioname', 'address')
            ->get();
        if (!$studios) {
            return [];
        }

        $studios = collect($studios);
        $studios = $studios->map(function ($item) {
            return [
                'id' => $item->Id_studios,
                'name' => $item->studioname,
                'location' => $item->address,
            ];
        });
        return $studios->toArray();
    }

    public function saveAula(AulaDTO $aulaDTO): bool
    {

        $response = DB::transaction(
            function () use ($aulaDTO) {

                // Verifica se o estúdio já está ocupado nesse horário
                $scheduleVerify = ScheduleStudio::where('scheduledate', $aulaDTO->data->format('Y-m-d'))
                    ->where('scheduletime', $aulaDTO->horario)
                    ->where('Id_studios', $aulaDTO->id_studio)
                    ->first();
                if ($scheduleVerify) {
                    Log::warning('Estúdio em conflito', [
                        'date' => $aulaDTO->data->format('Y-m-d'),
                        'time' => $aulaDTO->horario,
                        'studio_id' => $aulaDTO->id_studio
                    ]);
                    throw new Exception('Este estúdio já possui uma aula agendada para este horário.');
                }

                // Verifica se o instrutor já tem aula nesse horário
                $instructorVerify = ScheduleStudio::where('scheduledate', $aulaDTO->data->format('Y-m-d'))
                    ->where('scheduletime', $aulaDTO->horario)
                    ->where('Id_instructors', $aulaDTO->id_instrutor)
                    ->first();
                if ($instructorVerify) {
                    Log::warning('Instrutor em conflito', [
                        'date' => $aulaDTO->data->format('Y-m-d'),
                        'time' => $aulaDTO->horario,
                        'instructor_id' => $aulaDTO->id_instrutor
                    ]);
                    throw new Exception('Este instrutor já possui uma aula agendada para este horário.');
                }
                
                $schuduleSave = ScheduleStudio::create([
                    'Id_type_classes' => $aulaDTO->id_tipo_aula,
                    'Id_instructors' => $aulaDTO->id_instrutor,
                    'Id_studios' => $aulaDTO->id_studio,
                    'scheduledate' => $aulaDTO->data->format('Y-m-d'),
                    'scheduletime' => $aulaDTO->horario,
                ]);

                Log::info($schuduleSave);
            }
        );
        
        return true;
    }
    

    // public function getAulasByDay(int $id_studio, string $data): array
    // {
    //     $aulas = ScheduleStudio::where('Id_studios', $id_studio)
    //         ->where('scheduledate', $data)
    //         ->get();
    //     if (!$aulas) {
    //         return [];
    //     }
    //     /*
    //     Quero que me traga um array com as seguintes informações:
            
    //         id: 2
    //         horario: "09:00",
    //         unidade: "unidade 1",
    //         instructor: {
    //                 id: 1,
    //                 nome:"João"
    //         },
    //         data: "10-11-2025"
            
    //     */
    //     $aulas = collect($aulas);
    //     $aulas = $aulas->map(function ($item) {
    //         return [
    //             'id' => $item->Id_schedule_studios,
    //             'horario' => $item->scheduletime,
    //             'unidade' => [
    //                 'id' => $item->studio->Id_studios,
    //                 'name' => $item->studio->studioname
    //             ],
    //             'instructor' => [
    //                 'id' => $item->instructor->Id_instructors,
    //                 'nome' => $item->instructor->collaborator->namecollaborator
    //             ],
    //             'data' => $item->scheduledate,
    //         ];
    //     });
    //     return $aulas->toArray();
    // }

    public function getAulasByDay(?string $data = null, ?int $id_studio = null, ?int $id_instrutor = null): array
    {
        $query = ScheduleStudio::query()
            ->with(['studio', 'instructor.user', 'typeClass']);

        // Aplica filtro de data se fornecido
        if ($data) {
            $query->where('scheduledate', $data);
        }

        // Aplica filtro de estúdio se fornecido
        if ($id_studio) {
            $query->where('Id_studios', $id_studio);
        }

        // Aplica filtro de instrutor se fornecido
        if ($id_instrutor) {
            $query->where('Id_instructors', $id_instrutor);
        }

        // Ordena por data e horário
        $query->orderBy('scheduledate', 'asc')
              ->orderBy('scheduletime', 'asc');

        $aulas = $query->get();

        if ($aulas->isEmpty()) {
            return [];
        }

        // Mapeia para o formato desejado
        $aulas = $aulas->map(function ($item) {
            $date = DateTime::createFromFormat('Y-m-d', $item->scheduledate);
            $horario = DateTime::createFromFormat('H:i:s', $item->scheduletime);
            return [
                'id' => $item->Id_schedule_studios,
                'horario' => $horario->format('H:i'),
                'tipo' => $item->typeClass->typeclass,
                'unidade' => [
                    'id' => $item->studio->Id_studios,
                    'name' => $item->studio->studioname,
                ],
                'instructor' => [
                    'id' => $item->instructor->Id_instructors,
                    'nome' => $item->instructor->user->fullname
                ],
                'data' => $date->format('d-m-Y'),
            ];
        });

        return $aulas->toArray();
    }

    public function getAulasByStudent(int $id_student): array
    {
        $query = ScheduleStudio::query()
            ->with(['studio', 'instructor.user', 'typeClass', 'studentSchedules'])
            ->whereHas('studentSchedules', function($q) use ($id_student) {
                $q->where('Id_students', $id_student)
                  ->where('status', '!=', 'cancelled'); // Apenas inscrições não canceladas
            });

        // Ordena por data e horário
        $query->orderBy('scheduledate', 'asc')
              ->orderBy('scheduletime', 'asc');

        $aulas = $query->get();

        if ($aulas->isEmpty()) {
            return [];
        }

        // Mapeia para o formato desejado
        $aulas = $aulas->map(function ($item) {
            $date = DateTime::createFromFormat('Y-m-d', $item->scheduledate);
            $horario = DateTime::createFromFormat('H:i:s', $item->scheduletime);

            return [
                'id' => $item->Id_schedule_studios,
                'horario' => $horario->format('H:i'),
                'tipo' => $item->typeClass->typeclass,
                'unidade' => [
                    'id' => $item->studio->Id_studios,
                    'name' => $item->studio->studioname,
                    'endereco' => $item->studio->address
                ],
                'instructor' => [
                    'id' => $item->instructor->Id_instructors,
                    'nome' => $item->instructor->user->fullname
                ],
                'data' => $date->format('d-m-Y'),
            ];
        });

        return $aulas->toArray();
    }

    public function getNextAulaByStudent(int $id_student): ?array
    {
        $now = \Carbon\Carbon::now();
        $currentDate = $now->format('Y-m-d');
        $currentTime = $now->format('H:i:s');

        $nextAula = ScheduleStudio::query()
            ->with(['studio', 'instructor.user', 'typeClass'])
            ->whereHas('studentSchedules', function($q) use ($id_student) {
                $q->where('Id_students', $id_student)
                  ->where('status', '!=', 'cancelled');
            })
            ->where(function($q) use ($currentDate, $currentTime) {
                // Aulas futuras (data maior que hoje)
                $q->where('scheduledate', '>', $currentDate)
                  // OU aulas de hoje que ainda não passaram
                  ->orWhere(function($q2) use ($currentDate, $currentTime) {
                      $q2->where('scheduledate', '=', $currentDate)
                         ->where('scheduletime', '>', $currentTime);
                  });
            })
            ->orderBy('scheduledate', 'asc')
            ->orderBy('scheduletime', 'asc')
            ->first();

        if (!$nextAula) {
            return null;
        }

        $date = \DateTime::createFromFormat('Y-m-d', $nextAula->scheduledate);
        $horario = \DateTime::createFromFormat('H:i:s', $nextAula->scheduletime);

        return [
            'id' => $nextAula->Id_schedule_studios,
            'horario' => $horario->format('H:i'),
            'tipo' => $nextAula->typeClass->typeclass,
            'unidade' => [
                'id' => $nextAula->studio->Id_studios,
                'name' => $nextAula->studio->studioname,
                'endereco' => $nextAula->studio->address
            ],
            'instructor' => [
                'id' => $nextAula->instructor->Id_instructors,
                'nome' => $nextAula->instructor->user->fullname
            ],
            'data' => $date->format('d-m-Y'),
        ];
    }

    public function enrollStudentInAula(int $id_student, int $id_aula): bool
    {
        try {
            // Verifica se a aula existe
            $aula = ScheduleStudio::find($id_aula);
            if (!$aula) {
                throw new Exception('Aula não encontrada');
            }

            // Verifica se o aluno já está cadastrado nesta aula com status diferente de 'cancelled'
            $existingEnrollment = StudentSchedule::where('Id_students', $id_student)
                ->where('Id_schedule_studios', $id_aula)
                ->first();

            if ($existingEnrollment) {
                // Se existe e não está cancelada, não pode cadastrar novamente
                if ($existingEnrollment->status !== 'cancelled') {
                    throw new Exception('Aluno já está cadastrado nesta aula');
                }
                // Se existe mas está cancelada, permite reativar (será atualizado abaixo)
            }

            // Verifica a quantidade de alunos já cadastrados nesta aula (excluindo cancelados)
            $totalStudents = StudentSchedule::where('Id_schedule_studios', $id_aula)
                ->where('status', '!=', 'cancelled')
                ->count();

            if ($totalStudents >= 3) {
                throw new Exception('Aula já está com a capacidade máxima de alunos (3 alunos)');
            }

            // Se já existe uma inscrição cancelada, reativa; caso contrário, cria nova
            if ($existingEnrollment && $existingEnrollment->status === 'cancelled') {
                // Usa query builder com WHERE para atualizar apenas este registro
                StudentSchedule::where('Id_students', $id_student)
                    ->where('Id_schedule_studios', $id_aula)
                    ->update(['status' => 'pending']);
            } else {
                StudentSchedule::create([
                    'Id_students' => $id_student,
                    'Id_schedule_studios' => $id_aula,
                    'status' => 'pending' // Status padrão
                ]);
            }

            Log::info('Aluno cadastrado na aula', [
                'id_student' => $id_student,
                'id_aula' => $id_aula,
                'total_students' => $totalStudents + 1
            ]);

            return true;
        } catch (Exception $e) {
            Log::error('Erro ao cadastrar aluno na aula', [
                'id_student' => $id_student,
                'id_aula' => $id_aula,
                'error' => $e->getMessage()
            ]);
            throw $e;
        }
    }

    public function getAvailableAulasForStudent(int $id_student): array
    {
        $tomorrow = Carbon::tomorrow()->format('Y-m-d');

        $query = ScheduleStudio::query()
            ->with(['studio', 'instructor.user', 'typeClass'])
            ->withCount(['studentSchedules' => function($q) {
                // Conta apenas inscrições não canceladas
                $q->where('status', '!=', 'cancelled');
            }]) 
            ->where('scheduledate', '>=', $tomorrow) // Apenas aulas futuras
            ->whereDoesntHave('studentSchedules', function($q) use ($id_student) {
                // Exclui aulas onde o aluno já está cadastrado com status diferente de cancelled
                $q->where('Id_students', $id_student)
                  ->where('status', '!=', 'cancelled');
            })
            ->having('student_schedules_count', '<', 3) // Apenas aulas com vagas
            ->orderBy('scheduledate', 'asc')
            ->orderBy('scheduletime', 'asc');

        $aulas = $query->get();

        if ($aulas->isEmpty()) {
            return [];
        }

        // Mapeia para o formato desejado
        $aulas = $aulas->map(function ($item) {
            $date = DateTime::createFromFormat('Y-m-d', $item->scheduledate);
            $horario = DateTime::createFromFormat('H:i:s', $item->scheduletime);

            return [
                'id' => $item->Id_schedule_studios,
                'horario' => $horario->format('H:i'),
                'tipo' => $item->typeClass->typeclass,
                'unidade' => [
                    'id' => $item->studio->Id_studios,
                    'name' => $item->studio->studioname,
                    'location' => $item->studio->address
                ],
                'instructor' => [
                    'id' => $item->instructor->Id_instructors,
                    'nome' => $item->instructor->user->fullname
                ],
                'data' => $date->format('d-m-Y'),
                'inscritos' => $item->student_schedules_count,
                'vagas_disponiveis' => 3 - $item->student_schedules_count
            ];
        });

        return $aulas->toArray();
    }

    public function updateStudentAulaStatus(int $id_student, int $id_aula, string $status): bool
    {
        try {
            // Atualiza diretamente com as chaves compostas
            $updated = StudentSchedule::where('Id_students', $id_student)
                ->where('Id_schedule_studios', $id_aula)
                ->update(['status' => $status]);

            if ($updated === 0) {
                throw new Exception('Inscrição não encontrada');
            }

            Log::info('Status da inscrição atualizado', [
                'id_student' => $id_student,
                'id_aula' => $id_aula,
                'new_status' => $status
            ]);

            return true;
        } catch (Exception $e) {
            Log::error('Erro ao atualizar status da inscrição', [
                'id_student' => $id_student,
                'id_aula' => $id_aula,
                'status' => $status,
                'error' => $e->getMessage()
            ]);
            throw $e;
        }
    }

    public function getAulaById(int $id_aula): ?array
    {
        $aula = ScheduleStudio::find($id_aula);
        
        if (!$aula) {
            return null;
        }

        return [
            'id' => $aula->Id_schedule_studios,
            'scheduledate' => $aula->scheduledate,
            'scheduletime' => $aula->scheduletime
        ];
    }
}