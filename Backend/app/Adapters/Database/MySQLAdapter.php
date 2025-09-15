<?php

namespace App\Adapters\Database;

use App\Application\Ports\SQLPort;
use Illuminate\Support\Facades\DB;

/**
 * Adapter para MySQL usando Laravel Query Builder/Eloquent
 * Implementa SQLPort para operações em banco relacional
 */
class MySQLAdapter implements SQLPort
{
    public function create(string $table, array $data): array
    {
        $id = DB::table($table)->insertGetId($data);
        return $this->findById($table, $id);
    }

    public function findById(string $table, int $id): ?array
    {
        $result = DB::table($table)->where('id', $id)->first();
        return $result ? (array) $result : null;
    }

    public function findAll(string $table, array $conditions = []): array
    {
        $query = DB::table($table);

        foreach ($conditions as $field => $value) {
            $query->where($field, $value);
        }

        return $query->get()->toArray();
    }

    public function update(string $table, int $id, array $data): ?array
    {
        $updated = DB::table($table)->where('id', $id)->update($data);
        return $updated ? $this->findById($table, $id) : null;
    }

    public function delete(string $table, int $id): bool
    {
        return DB::table($table)->where('id', $id)->delete() > 0;
    }

    public function findUserByEmail(string $email): ?array
    {
        $result = DB::table('users')->where('email', $email)->first();
        return $result ? (array) $result : null;
    }

    public function createUser(array $userData): array
    {
        $userData['password'] = bcrypt($userData['password']);
        $userData['created_at'] = now();
        $userData['updated_at'] = now();

        return $this->create('users', $userData);
    }

    public function updateUserLastLogin(int $userId): bool
    {
        return DB::table('users')
            ->where('id', $userId)
            ->update(['last_login_at' => now()]) > 0;
    }

    public function findClassesByInstructor(int $instructorId): array
    {
        return DB::table('pilates_classes')
            ->where('instructor_id', $instructorId)
            ->get()
            ->toArray();
    }

    public function findAvailableClasses(\DateTime $date): array
    {
        return DB::table('pilates_classes')
            ->whereDate('scheduled_at', '>=', $date)
            ->where('status', 'scheduled')
            ->get()
            ->toArray();
    }

    public function createBooking(int $userId, int $classId): array
    {
        $bookingData = [
            'user_id' => $userId,
            'class_id' => $classId,
            'booked_at' => now(),
            'status' => 'confirmed',
            'created_at' => now(),
            'updated_at' => now()
        ];

        return $this->create('bookings', $bookingData);
    }

    public function findUsersWithActiveBookings(): array
    {
        return DB::table('users')
            ->join('bookings', 'users.id', '=', 'bookings.user_id')
            ->where('bookings.status', 'confirmed')
            ->select('users.*')
            ->distinct()
            ->get()
            ->toArray();
    }

    public function getClassesWithBookingCount(): array
    {
        return DB::table('pilates_classes')
            ->leftJoin('bookings', 'pilates_classes.id', '=', 'bookings.class_id')
            ->select(
                'pilates_classes.*',
                DB::raw('COUNT(bookings.id) as booking_count')
            )
            ->groupBy('pilates_classes.id')
            ->get()
            ->toArray();
    }
}
