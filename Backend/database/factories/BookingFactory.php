<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\PilatesClass;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    protected $model = Booking::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'class_id' => PilatesClass::factory(),
            'status' => $this->faker->randomElement(['pending', 'confirmed', 'cancelled', 'completed']),
            'paid_amount' => $this->faker->optional(0.7)->randomFloat(2, 50, 150),
            'booking_date' => $this->faker->dateTimeBetween('-30 days', 'now'),
            'notes' => $this->faker->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the booking is confirmed.
     */
    public function confirmed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'confirmed',
        ]);
    }

    /**
     * Indicate that the booking is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
        ]);
    }

    /**
     * Indicate that the booking is cancelled.
     */
    public function cancelled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'cancelled',
        ]);
    }

    /**
     * Indicate that the booking is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
        ]);
    }

    /**
     * Create a booking for a specific user.
     */
    public function forUser(User $user): static
    {
        return $this->state(fn (array $attributes) => [
            'user_id' => $user->id,
        ]);
    }

    /**
     * Create a booking for a specific class.
     */
    public function forClass(PilatesClass $class): static
    {
        return $this->state(fn (array $attributes) => [
            'class_id' => $class->id,
            'paid_amount' => $class->price,
        ]);
    }

    /**
     * Create a paid booking.
     */
    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'paid_amount' => $this->faker->randomFloat(2, 50, 150),
            'status' => 'confirmed',
        ]);
    }
}
