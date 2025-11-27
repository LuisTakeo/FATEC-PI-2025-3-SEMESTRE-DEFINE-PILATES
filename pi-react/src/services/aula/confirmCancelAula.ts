import { API_BASE_URL } from "../../config/api";
import type { ConfirmacaoAulaResponse } from "../../types/ConfirmacaoAulaResponse";

export async function confirmCancelAula(aula_id: number, aluno_id: number, status: string){

    const token = localStorage.getItem("Define-Pilates-AuthToken")

    if (status !== "confirm" && status !== "cancel"){
        console.log("Status diferente do esperado")
    } 

    try {
        const response = await fetch(`${API_BASE_URL}/students/${aluno_id}/aulas/${aula_id}/status`,
            {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: status
                })

            }
        );
        const resposta: ConfirmacaoAulaResponse = await response.json();
        return resposta
        
    } catch(err){
        console.error("Erro ao atualizar status do aluno em aula")
    }
}

