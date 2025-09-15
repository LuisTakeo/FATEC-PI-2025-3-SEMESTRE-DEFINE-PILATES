<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\PilatesClass;
use App\Models\Booking;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PilatesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Criar usuários instrutores
        $instructors = collect([
            [
                'name' => 'Maria Silva',
                'email' => 'maria.silva@pilates.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'João Santos',
                'email' => 'joao.santos@pilates.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Ana Costa',
                'email' => 'ana.costa@pilates.com',
                'password' => Hash::make('password123'),
            ],
        ])->map(fn($instructor) => User::create($instructor));

        // Criar usuários alunos
        $students = User::factory(20)->create();

        // Criar aulas para cada instrutor
        $classes = collect();
        $instructors->each(function ($instructor) use ($classes) {
            $instructorClasses = PilatesClass::factory(5)
                ->forInstructor($instructor)
                ->upcoming()
                ->create();

            $classes->push(...$instructorClasses);
        });

        // Criar algumas aulas passadas (concluídas)
        $instructors->each(function ($instructor) {
            PilatesClass::factory(3)
                ->forInstructor($instructor)
                ->completed()
                ->create([
                    'start_time' => fake()->dateTimeBetween('-30 days', '-1 day'),
                    'end_time' => fake()->dateTimeBetween('-30 days', '-1 day'),
                ]);
        });

        // Criar reservas para as aulas
        $classes->each(function ($class) use ($students) {
            // Reservar de 3 a 8 alunos por aula (não exceder max_participants)
            $bookingCount = min(
                fake()->numberBetween(3, 8),
                $class->max_participants
            );

            $selectedStudents = $students->random($bookingCount);

            $selectedStudents->each(function ($student) use ($class) {
                Booking::factory()
                    ->forUser($student)
                    ->forClass($class)
                    ->confirmed()
                    ->paid()
                    ->create();
            });
        });

        // Criar algumas reservas pendentes
        $students->random(5)->each(function ($student) use ($classes) {
            $availableClass = $classes->random();

            Booking::factory()
                ->forUser($student)
                ->forClass($availableClass)
                ->pending()
                ->create();
        });

        // Criar admin user
        User::create([
            'name' => 'Admin Pilates',
            'email' => 'admin@pilates.com',
            'password' => Hash::make('admin123'),
        ]);

        $this->command->info('✅ Pilates seeder completed successfully!');
        $this->command->info("📊 Created:");
        $this->command->info("   - " . User::count() . " users");
        $this->command->info("   - " . PilatesClass::count() . " pilates classes");
        $this->command->info("   - " . Booking::count() . " bookings");
    }
}
