<?php

namespace Database\Seeders;

use App\Models\Studio;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // mapear com maiss de um studio se necessario

        $studios = [
            [
                'studioname' => 'Unidade São Miguel',
                'address' => 'Rua José Aldo, 165 - São Miguel Paulista',
            ],
            [
                'studioname' => 'Unidade Itaquera',
                'address' => 'Estrada Itaquera Guaianazes, 45 - Parada XV de Novembro',
            ],
            [
                'studioname' => 'Unidade Vila Jacuí',
                'address' => 'Rua Santana de Pirapama, 91 - Vila Jacuí',
            ],
        ];

        foreach ($studios as $studio) {
            Studio::updateOrCreate(
                ['studioname' => $studio['studioname']], // Condição de busca pelo nome
                $studio // Dados para criar/atualizar
            );
        }
    }
}
