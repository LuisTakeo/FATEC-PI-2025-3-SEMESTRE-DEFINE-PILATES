// Caminho: services/aula/proxima_aula.ts

import { API_BASE_URL } from "../../config/api";

// Interface que define o formato de dados da próxima aula retornado pela sua API
export interface ProximaAulaApi {
    id: number;
    horario: string; 
    tipo: string; 
    unidade: {
        id: number;
        name: string;
        endereco: string;
    };
    instructor: {
        id: number;
        nome: string;
    };
    data: string;
    status?: 'AGENDADA' | 'CONFIRMADA' | 'CANCELADA'; 
}

interface ApiResponse {
    status: string;
    message: string;
    data: ProximaAulaApi | null; 
}

/**
 * Busca a próxima aula agendada para um aluno usando o endpoint OTIMIZADO da API.
 */
export async function fetchProximaAula(alunoId: string): Promise<ProximaAulaApi | null> {
    
    const authToken = localStorage.getItem("Define-Pilates-AuthToken");

    if (!authToken) {
        console.error("Token de autenticação não encontrado.");
        return null;
    }
    
    try {
        // Usa o endpoint otimizado: /students/{id}/next-aula
        const url = `${ API_BASE_URL }/students/${alunoId}/aulas/next`; 
        
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
        });
        
        // 💥 CORREÇÃO: Trata o 404 como "Sem Aula Encontrada"
        if (!response.ok) {
            // Se o status for 404 (Not Found), retorna null sem erro
            if (response.status === 404) {
                console.log(`INFO: Nenhuma próxima aula encontrada para o aluno ${alunoId}.`);
                return null; 
            }

            // Para qualquer outro erro (401, 500, etc.), logamos como erro.
            const errorText = await response.text(); 
            console.error(`Erro ${response.status} ao buscar próxima aula. Detalhes: ${errorText}`);
            return null;
        }

        const result: ApiResponse = await response.json();
        
        return result.data; 

    } catch (error) {
        console.error('Erro de rede/processamento:', error);
        return null; 
    }
}