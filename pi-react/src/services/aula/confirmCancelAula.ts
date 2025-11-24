import { API_BASE_URL } from "../../config/api";

export async function confirmarAula(aula_id, aluno_id){
    try {
        const response = await fetch(`${API_BASE_URL}/students/${aluno_id}/aulas/${aula_id}/status`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(
                {
                    "action": "confirm"
                }
                )
            }
        );
        return await response.json();
        
    } catch(err){
        console.error("Erro ao atualizar status do aluno em aula")
    }
}

export async function desmarcarAula(aula_id, aluno_id){
       try {
        const response = await fetch(`${API_BASE_URL}/students/${aluno_id}/aulas/${aula_id}/status`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(
                {
                    "action": "cancel"
                }
                )
            }
        );
        return await response.json();

    } catch(err){
        console.error("Erro ao atualizar status do aluno em aula")
    } 
}