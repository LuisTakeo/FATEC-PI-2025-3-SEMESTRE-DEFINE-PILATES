<?php

namespace Database\Factories;

use App\Models\PilatesClass;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PilatesClass>
 */
class PilatesClassFactory extends Factory
{
    protected $model = PilatesClass::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startTime = $this->faker->dateTimeBetween('+1 day', '+30 days');
        $endTime = (clone $startTime)->modify('+1 hour');

        return [
            'name' => $this->faker->randomElement([
                'Pilates Iniciante',
                'Pilates Intermediário',
                'Pilates Avançado',
                'Pilates Mat',
                'Pilates Aparelhos',
                'Pilates Funcional',
                'Pilates Terapêutico',
                'Pilates Core',
                'Pilates Flexibilidade',
                'Pilates Power'
            ]),
            'description' => $this->faker->optional()->paragraph(),
            'instructor_id' => User::factory(),
            'max_participants' => $this->faker->numberBetween(5, 15),
            'start_time' => $startTime,
            'end_time' => $endTime,
            'price' => $this->faker->randomFloat(2, 50, 150),
            'status' => $this->faker->randomElement(['scheduled', 'ongoing', 'completed', 'cancelled']),
        ];
    }

    /**
     * Indicate that the class is scheduled.
     */
    public function scheduled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'scheduled',
        ]);
    }

    /**
     * Indicate that the class is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
        ]);
    }

    /**
     * Indicate that the class is cancelled.
     */
    public function cancelled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'cancelled',
        ]);
    }

    /**
     * Create a class for a specific instructor.
     */
    public function forInstructor(User $instructor): static
    {
        return $this->state(fn (array $attributes) => [
            'instructor_id' => $instructor->id,
        ]);
    }

    /**
     * Create an upcoming class.
     */
    public function upcoming(): static
    {
        $startTime = $this->faker->dateTimeBetween('+1 hour', '+7 days');
        $endTime = (clone $startTime)->modify('+1 hour');

        return $this->state(fn (array $attributes) => [
            'start_time' => $startTime,
            'end_time' => $endTime,
            'status' => 'scheduled',
        ]);
    }
}
