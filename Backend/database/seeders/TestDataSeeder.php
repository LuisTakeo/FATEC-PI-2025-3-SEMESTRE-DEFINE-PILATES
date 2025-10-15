<?php
    namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\UserTgi;
use App\Models\Collaborator;
use App\Models\Instructor;
use App\Models\Student;
use App\Models\Plan;
use App\Models\ScheduleStudio;
use App\Models\Contract;

class TestDataSeeder extends Seeder
{
    public function run(): void
    {
        DB::transaction(function () {

            // ========== Users ==========
            $userNames = ['Alice', 'Bruno', 'Carla', 'Diego', 'Elisa'];
            $userIds = [];
            foreach ($userNames as $name) {
                $user = UserTgi::firstOrCreate(
                    ['nameuser' => $name],
                    [
                        'password' => Hash::make('12345678'),
                        'typeuser'     => 'Administrator',
                        'statususer'   => 'Active',
                    ]
                );
                $userIds[] = $user->id_users ?? $user->getKey();
            }

            // ========== Collaborators ==========
            $types            = ['Admin', 'Finance', 'HR', 'Instructor', 'Coordinator'];
            $classifications  = ['A', 'B', 'C', 'B', 'A'];
            $collaboratorIds  = [];

            for ($i = 0; $i < count($userIds); $i++) {
                $collab = Collaborator::firstOrCreate(
                    ['Id_users' => $userIds[$i]],
                    [
                        'typecollaborator' => $types[$i],
                        'birthday'         => now()->subYears(26 + $i)->toDateString(),
                        'fulladdress'      => "Rua Teste, Número " . ($i + 1),
                        'hiring'           => now()->subYears($i + 1)->toDateString(),
                        'classification'   => $classifications[$i],
                    ]
                );
                $collaboratorIds[] = $collab->Id_collaborators ?? $collab->getKey();
            }

            // ========== Profession Classifications ==========
            $rawClassifications = ['A','B','C','D','E'];
            $classificationIds  = [];
            foreach ($rawClassifications as $label) {
                $existingId = DB::table('profession_classifications')
                    ->where('classifications', $label)
                    ->value('Id_classprofessions');
                if (!$existingId) {
                    $existingId = DB::table('profession_classifications')->insertGetId([
                        'classifications' => $label,
                    ]);
                }
                $classificationIds[] = $existingId;
            }

            // ========== Students ==========
            $studentNames = ['Gabriel', 'Helena', 'Igor', 'Juliana', 'Kevin'];
            $studentIds   = [];
            for ($i = 0; $i < count($studentNames); $i++) {
                $student = Student::firstOrCreate(
                    [
                        'cpf' => str_pad((string)(20000000000 + $i), 11, '0', STR_PAD_LEFT),
                    ],
                    [
                        'namestudent'         => $studentNames[$i],
                        'Id_classprofessions' => $classificationIds[$i] ?? null,
                    ]
                );
                $studentIds[] = $student->Id_students ?? $student->getKey();
            }

            // ========== Instructors ==========
            $crefs    = ['CREF123','CREF234','CREF345','CREF456','CREF567'];
            $crefitos = ['CREFITO123','CREFITO234','CREFITO345','CREFITO456','CREFITO567'];
            $instructorIds = [];
            for ($i = 0; $i < count($collaboratorIds); $i++) {
                $instr = Instructor::firstOrCreate(
                    ['Id_collaborators' => $collaboratorIds[$i]],
                    [
                        'cref'          => $crefs[$i],
                        'crefito'       => $crefitos[$i],
                        'birthday'      => now()->subYears(31 + $i)->toDateString(),
                        'hiring'        => now()->subYears($i + 1)->toDateString(),
                        'classification'=> "InstructorClass " . ($i + 1),
                    ]
                );
                $instructorIds[] = $instr->Id_instructors ?? $instr->getKey();
            }

            // ========== Type Plans ==========
            DB::table('type_plans')->insertOrIgnore([
                [
                    'Id_type_plans'   => 1,
                    'type'            => 'Mensal',
                    'weeklyfrequency' => 2,
                    'baseprice'       => 120.000,
                    'created_at'      => now(),
                    'updated_at'      => now(),
                ],
                [
                    'Id_type_plans'   => 2,
                    'type'            => 'Trimestral',
                    'weeklyfrequency' => 3,
                    'baseprice'       => 300.000,
                    'created_at'      => now(),
                    'updated_at'      => now(),
                ],
            ]);

            // ========== Type Classes ==========
            DB::table('type_classes')->insertOrIgnore([
                ['Id_type_classes' => 1, 'typeclass' => 'Pilates',     'created_at' => now(), 'updated_at' => now()],
                ['Id_type_classes' => 2, 'typeclass' => 'Alongamento', 'created_at' => now(), 'updated_at' => now()],
            ]);

            // ========== Plans ==========
            // CONFIRMAR se a tabela plans tem 'frequency' e 'baseprice'. Remova se não existir.
            $planIds = [];
            for ($i = 0; $i < count($studentIds); $i++) {
                $plan = Plan::firstOrCreate(
                    [
                        'Id_students'   => $studentIds[$i],
                        'Id_type_plans' => ($i % 2) + 1,
                    ],
                    [
                        'datebeginning' => now()->toDateString(),
                        'datefinal'     => now()->addMonths(2 + $i)->toDateString(),
                        'statusplan'    => 'Active',
                        'frequency'     => 4,            // REMOVER se não existir na migration
                        'baseprice'     => 50 + ($i * 10) // REMOVER se não existir na migration
                    ]
                );
                $planIds[] = $plan->Id_plans ?? $plan->getKey();
            }

            // ========== Schedule Studios ==========
            $scheduleIds = [];
            for ($i = 0; $i < count($studentIds); $i++) {
                $sched = ScheduleStudio::firstOrCreate(
                    [
                        'Id_type_classes' => 1,
                        'Id_instructors'  => $instructorIds[$i],
                        'Id_students'     => $studentIds[$i],
                        'scheduledate'    => now()->addDays($i + 1)->toDateString(),
                        'scheduletime'    => now()->setTime(9 + $i, 0)->format('H:i:s'),
                    ],
                    [
                        'observation'     => "Aula " . ($i + 1),
                    ]
                );
                $scheduleIds[] = $sched->Id_schedule_studios ?? $sched->getKey();
            }

            // ========== Student Schedules (pivot) ==========
            // Se a Model StudentSchedule complica, use DB::table(...)->insertOrIgnore.
            foreach ($scheduleIds as $idx => $sid) {
                DB::table('student_schedules')->insertOrIgnore([
                    'Id_schedule_studios' => $sid,
                    'Id_students'         => $studentIds[$idx],
                ]);
            }

            // ========== Contracts ==========
            for ($i = 0; $i < count($studentIds); $i++) {
                Contract::firstOrCreate(
                    [
                        'Id_students' => $studentIds[$i],
                        'Id_plans'    => $planIds[$i],
                    ],
                    [
                        'datebeginning'  => now()->subDays($i + 1)->toDateString(),
                        'deadline'       => now()->addMonths($i + 1)->toDateString(),
                        'contractstatus' => 'Active',
                        'freeuseimage'   => false,
                    ]
                );
            }

        }); // end transaction
    }
}