<?php

namespace App\Adapters\Database;

use App\Application\DTOs\StudentDTO;
use App\Application\Ports\StudentNoSQLPort;
use App\Models\MongoModels\StudentMongo;
use Exception;
use Log;

class StudentMongoDBAdapter implements StudentNoSQLPort
{
    public function __construct()
    {
        // Inject dependencies here
    }

    public function saveStudentData(StudentDTO $studentDTO): array
    {
        try {
            // Busca ou cria o documento MongoDB para este student
            $studentMongo = StudentMongo::firstOrCreate(
                ['Id_students' => $studentDTO->id], // critério de busca
                [
                    'Id_students' => $studentDTO->id,
                    'fotos' => [],
                    'contatos' => [],
                    'enderecos' => []
                ]
            );

            Log::info('StudentMongo document created/found', [
                'Id_students' => $studentDTO->id,
                'mongo_id' => $studentMongo->_id
            ]);

            // Salva fotos usando o método do modelo
            foreach ($studentDTO->fotos as $foto) {
                if (is_string($foto)) {
                    $studentMongo->adicionarFoto($foto, 'Foto de perfil');
                }
            }

            // Salva contatos usando o método do modelo
            foreach ($studentDTO->contatos as $contato) {
                if (isset($contato['tipo'], $contato['valor'])) {
                    $studentMongo->adicionarContato(
                        $contato['tipo'],
                        $contato['valor'],
                        $contato['observacao'] ?? null
                    );
                }
            }

            // Salva endereços usando o método do modelo
            foreach ($studentDTO->enderecos as $endereco) {
                if (isset($endereco['rua'], $endereco['numero'], $endereco['bairro'], 
                         $endereco['cidade'], $endereco['estado'], $endereco['cep'])) {
                    $studentMongo->adicionarEndereco($endereco);
                }
            }

            Log::info('Student NoSQL data saved successfully', [
                'Id_students' => $studentDTO->id,
                'fotos_count' => count($studentDTO->fotos),
                'contatos_count' => count($studentDTO->contatos),
                'enderecos_count' => count($studentDTO->enderecos)
            ]);

            return [
                'status' => StudentNoSQLPort::SUCCESS,
                'mongo_id' => (string)$studentMongo->_id,
                'message' => 'Student data saved to MongoDB successfully'
            ];

        } catch (Exception $e) {
            Log::error('Failed to save student data to MongoDB', [
                'Id_students' => $studentDTO->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return [
                'status' => StudentNoSQLPort::FAILURE,
                'error' => $e->getMessage(),
                'message' => 'Failed to save student data to MongoDB'
            ];
        }
    }

    /**
     * Busca dados do MongoDB por ID do student
     */
    public function getStudentData(int $studentId): array
    {
        try {
            $studentMongo = StudentMongo::where('Id_students', $studentId)->first();
            
            if (!$studentMongo) {
                return [
                    'status' => StudentNoSQLPort::FAILURE,
                    'message' => 'Student data not found in MongoDB'
                ];
            }

            return [
                'status' => StudentNoSQLPort::SUCCESS,
                'data' => [
                    'Id_students' => $studentMongo->Id_students,
                    'fotos' => $studentMongo->fotos ?? [],
                    'contatos' => $studentMongo->contatos ?? [],
                    'enderecos' => $studentMongo->enderecos ?? [],
                    'fotos_evolucao' => $studentMongo->getFotosEvolucao()
                ]
            ];

        } catch (Exception $e) {
            Log::error('Failed to get student data from MongoDB', [
                'Id_students' => $studentId,
                'error' => $e->getMessage()
            ]);

            return [
                'status' => StudentNoSQLPort::FAILURE,
                'error' => $e->getMessage()
            ];
        }
    }
}
