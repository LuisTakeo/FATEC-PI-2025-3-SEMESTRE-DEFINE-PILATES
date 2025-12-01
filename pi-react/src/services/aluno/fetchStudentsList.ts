import { API_BASE_URL } from "../../config/api";

export interface Student {
    id: number;
    fullname: string;
    phone: string;
    cpf?: string;
    active?: boolean;
}

export async function fetchStudentsList(): Promise<Student[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/students/list`, {
            headers: {
                "accept": "application/json",
                "ngrok-skip-browser-warning": "true"
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status} ao buscar lista de alunos`);
        }

        const data = await response.json();
        
        if (data.data && Array.isArray(data.data)) {
            return data.data;
        }

        console.error("Formato de resposta inválido:", data);
        return [];
    } catch (error) {
        console.error("Erro ao buscar lista de alunos:", error);
        return [];
    }
}
