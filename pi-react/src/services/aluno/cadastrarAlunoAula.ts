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

export async function CadastrarAlunoAula(aula_id: number): Promise<CadastroAulaResponse | null> {

    const acesso = await dadosLogin(); 
    const id_aluno = acesso.user.id
    console.log(id_aluno)

    if (!id_aluno) {
        console.error("Cadastro falhou: Dados de login do aluno não encontrados ou inválidos.");
        return null
    }

    try {
        const response = await fetch(`${API_BASE_URL}/students/aulas/${aula_id}/enroll`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    id_student: id_aluno 
                })
            }
        );
        
        const data: CadastroAulaResponse = await response.json();
        return data

    } catch (error) {
        console.error("Erro de rede/processamento no cadastro de aula:", error);
        return null
    }
}