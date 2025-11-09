<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TypeClass;

class TypeClassesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $typeClasses = [
            [
                'typeclass' => 'Pilates',
            ],
            [
                'typeclass' => 'Ioga',
            ],
            [
                'typeclass' => 'Curso',
            ],
        ];

        foreach ($typeClasses as $typeClass) {
            TypeClass::create($typeClass);
        }
    }
}
