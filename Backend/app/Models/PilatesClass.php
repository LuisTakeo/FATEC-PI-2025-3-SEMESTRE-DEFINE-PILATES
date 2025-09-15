<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Pilates Class Model
 * Representa uma aula de Pilates no sistema
 */
class PilatesClass extends Model
{
    use HasFactory;

    protected $table = 'pilates_classes';

    protected $fillable = [
        'name',
        'description',
        'instructor_id',
        'max_participants',
        'start_time',
        'end_time',
        'price',
        'status',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'price' => 'decimal:2',
        'max_participants' => 'integer',
    ];

    /**
     * Relacionamento com o instrutor (User)
     */
    public function instructor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    /**
     * Relacionamento com as reservas (Bookings)
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'class_id');
    }

    /**
     * Reservas confirmadas
     */
    public function confirmedBookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'class_id')->where('status', 'confirmed');
    }

    /**
     * Verifica se a aula está disponível para reserva
     */
    public function isAvailable(): bool
    {
        if ($this->status !== 'scheduled') {
            return false;
        }

        if ($this->start_time <= now()) {
            return false;
        }

        $confirmedBookings = $this->confirmedBookings()->count();
        return $confirmedBookings < $this->max_participants;
    }

    /**
     * Retorna o número de vagas disponíveis
     */
    public function availableSpots(): int
    {
        $confirmedBookings = $this->confirmedBookings()->count();
        return max(0, $this->max_participants - $confirmedBookings);
    }

    /**
     * Scopes para consultas frequentes
     */
    public function scopeScheduled($query)
    {
        return $query->where('status', 'scheduled');
    }

    public function scopeAvailable($query)
    {
        return $query->where('status', 'scheduled')
                    ->where('start_time', '>', now())
                    ->whereRaw('(SELECT COUNT(*) FROM bookings WHERE class_id = pilates_classes.id AND status = "confirmed") < max_participants');
    }

    public function scopeByInstructor($query, $instructorId)
    {
        return $query->where('instructor_id', $instructorId);
    }

    public function scopeUpcoming($query)
    {
        return $query->where('start_time', '>', now());
    }

    public function scopePast($query)
    {
        return $query->where('end_time', '<', now());
    }

    /**
     * Accessor para formatação do preço
     */
    public function getFormattedPriceAttribute(): string
    {
        return 'R$ ' . number_format($this->price, 2, ',', '.');
    }

    /**
     * Accessor para duração da aula em minutos
     */
    public function getDurationInMinutesAttribute(): int
    {
        return $this->start_time->diffInMinutes($this->end_time);
    }

    /**
     * Accessor para status da aula em português
     */
    public function getStatusTextAttribute(): string
    {
        return match($this->status) {
            'scheduled' => 'Agendada',
            'ongoing' => 'Em Andamento',
            'completed' => 'Concluída',
            'cancelled' => 'Cancelada',
            default => 'Desconhecido'
        };
    }
}
