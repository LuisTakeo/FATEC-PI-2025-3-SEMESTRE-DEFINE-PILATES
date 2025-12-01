import { API_BASE_URL } from "../../config/api";

export interface AulaDisponivel {
    id: number;
    data: string;
    horario: string;
    instructor: {
        id: number;
        nome: string;
    };
    unidade: {
        id: number;
        name: string;
    };
    vagas_disponiveis: number;
}

export async function fetchAulasDisponiveisAluno(idAluno: string): Promise<AulaDisponivel[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/students/${idAluno}/aulas/available`, {
            headers: {
                "accept": "application/json",
                "ngrok-skip-browser-warning": "true"
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status} ao buscar aulas disponíveis`);
        }

        const data = await response.json();
        
        if (data.status === 'success' && Array.isArray(data.data)) {
            return data.data;
        }

        console.error("Formato de resposta inválido:", data);
        return [];
    } catch (error) {
        console.error("Erro ao buscar aulas disponíveis:", error);
        return [];
    }
}
