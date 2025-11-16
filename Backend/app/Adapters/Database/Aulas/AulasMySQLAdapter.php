<?php

namespace App\Adapters\Database\Aulas;

use App\Application\DTOs\AulaDTO;
use App\Application\Ports\Aulas\AulasRepositoryPort;
use App\Models\Studio;
use App\Models\TypeClass;
use App\Models\ScheduleStudio;
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
    
}