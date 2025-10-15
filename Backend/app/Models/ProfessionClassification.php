<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProfessionClassification extends Model
{
    protected $table = 'profession_classifications';
    protected $primaryKey = 'Id_classprofessions';
    public $timestamps = false;

    protected $fillable = [
        'classifications',
    ];

    public function students(): HasMany
    {
        return $this->hasMany(Student::class, 'Id_classprofessions');
    }
}