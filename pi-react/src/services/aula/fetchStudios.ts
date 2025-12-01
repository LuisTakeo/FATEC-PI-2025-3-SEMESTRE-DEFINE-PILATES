import { API_BASE_URL } from "../../config/api";

export interface Studio {
    id: number;
    name: string;
    location: string;
}

export async function fetchStudios(): Promise<Studio[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/aulas/studios`, {
            headers: {
                "accept": "application/json",
                "ngrok-skip-browser-warning": "true"
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status} ao buscar unidades/studios`);
        }

        const data = await response.json();
        
        if (data.status === 'success' && Array.isArray(data.data)) {
            return data.data;
        }

        console.error("Formato de resposta inválido:", data);
        return [];
    } catch (error) {
        console.error("Erro ao buscar studios:", error);
        return [];
    }
}
