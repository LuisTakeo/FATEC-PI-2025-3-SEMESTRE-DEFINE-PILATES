import { API_BASE_URL } from "../../config/api";
import { dadosLogin } from "../../services/dadoslogin"; 

export interface CadastroAulaResponse {
    status: string;
    message: string;
    data: {
        id_student: number;
        id_aula: number;
    };
}

export async function CadastrarAlunoAula(aula_id: number): Promise<CadastroAulaResponse | false> {

    const acesso = await dadosLogin(); 

   
    if (!acesso || !acesso.id) {
        console.error("Cadastro falhou: Dados de login do aluno não encontrados ou inválidos.");
        return false;
    }
    
    const id_aluno = acesso.id; 

    try {
        const response = await fetch(`${API_BASE_URL}/students/aulas/${aula_id}/enroll`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    "id_student": id_aluno 
                })
            }
        );
        
        const data = await response.json();
        

        if (response.status === 201) {
          
            return data as CadastroAulaResponse; 
            
        } else {
            console.error(`Falha ao cadastrar aula (Status: ${response.status}). Mensagem:`, data.message);
            return false;
        }

    } catch (error) {
        console.error("Erro de rede/processamento no cadastro de aula:", error);
        return false;
    }
}