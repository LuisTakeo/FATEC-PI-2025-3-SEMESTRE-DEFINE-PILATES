<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Booking Model
 * Representa uma reserva de aula de Pilates
 */
class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'class_id',
        'status',
        'paid_amount',
        'booking_date',
        'notes',
    ];

    protected $casts = [
        'booking_date' => 'datetime',
        'paid_amount' => 'decimal:2',
    ];

    /**
     * Relacionamento com o usuário
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relacionamento com a aula de Pilates
     */
    public function pilatesClass(): BelongsTo
    {
        return $this->belongsTo(PilatesClass::class, 'class_id');
    }

    /**
     * Scopes para consultas frequentes
     */
    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirmed');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeCancelled($query)
    {
        return $query->where('status', 'cancelled');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeByClass($query, $classId)
    {
        return $query->where('class_id', $classId);
    }

    public function scopeUpcoming($query)
    {
        return $query->whereHas('pilatesClass', function ($q) {
            $q->where('start_time', '>', now());
        });
    }

    public function scopePast($query)
    {
        return $query->whereHas('pilatesClass', function ($q) {
            $q->where('end_time', '<', now());
        });
    }

    /**
     * Verifica se a reserva pode ser cancelada
     */
    public function canBeCancelled(): bool
    {
        if ($this->status !== 'confirmed') {
            return false;
        }

        // Pode cancelar até 2 horas antes da aula
        return $this->pilatesClass->start_time->subHours(2) > now();
    }

    /**
     * Verifica se o pagamento está pendente
     */
    public function isPaid(): bool
    {
        return $this->paid_amount !== null && $this->paid_amount > 0;
    }

    /**
     * Accessor para status em português
     */
    public function getStatusTextAttribute(): string
    {
        return match($this->status) {
            'pending' => 'Pendente',
            'confirmed' => 'Confirmada',
            'cancelled' => 'Cancelada',
            'completed' => 'Concluída',
            default => 'Desconhecido'
        };
    }

    /**
     * Accessor para valor pago formatado
     */
    public function getFormattedPaidAmountAttribute(): string
    {
        if ($this->paid_amount === null) {
            return 'Não pago';
        }
        return 'R$ ' . number_format($this->paid_amount, 2, ',', '.');
    }
}
