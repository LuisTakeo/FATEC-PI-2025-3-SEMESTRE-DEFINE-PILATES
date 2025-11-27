
import { API_BASE_URL } from "../../config/api";
import type { ApiResponse } from "../../types/ProximaAula";


export async function fetchProximaAula({ alunoId }: { alunoId: number }) {
    
    const token = localStorage.getItem("Define-Pilates-AuthToken")
    
    // if (!token) {
    //     return { status: "error", message: "Token ausente", data: null };
    // }

    try {
        const url = `${ API_BASE_URL }/students/${alunoId}/aulas/next`; 
        
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            method: "GET"
        });
        
        if (!response.ok) {
            const msg =
                response.status === 404
                    ? "Nenhuma próxima aula encontrada"
                    : "Erro ao buscar próxima aula";

            return { status: "error", message: msg, data: null };
        }

        const result: ApiResponse = await response.json();

        console.log("id_fetch_aula", alunoId)
        return result;
        

    } catch (error) {
        return { status: "error", message: "Erro de rede", data: null };
    }
}