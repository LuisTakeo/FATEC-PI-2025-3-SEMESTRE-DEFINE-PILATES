<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;

    protected $table = 'payments';
    protected $primaryKey = 'Id_payments';

    protected $fillable = [
        'Id_plans',
        'paymentmethod',
        'paymentinitiation',
        'deadline',
        'paymentstatus',
    ];

    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class, 'Id_plans');
    }
}