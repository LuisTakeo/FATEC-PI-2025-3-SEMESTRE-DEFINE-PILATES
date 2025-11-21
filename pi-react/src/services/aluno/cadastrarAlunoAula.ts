import { API_BASE_URL } from "../../config/api";
import { dadosLogin } from "../../services/dadoslogin"

export interface CadastroAulaResponse {
  status: string;
  message: string;
  data: {
    id_student: number;
    id_aula: number;
  };
}

export async function CadastrarAlunoAula(aula_id: number) {

    const acesso = await dadosLogin()
    const id_aluno = acesso.user.id

    try{
        const response = await fetch(`${API_BASE_URL}/students/aulas/${aula_id}/enroll`, 
            //enviar id do aluno no id da aula
             
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    "id_student": id_aluno
                })
            }
        )
        const data = await response.json()
        const mensagem: CadastroAulaResponse[] = data.message

        if(response.status !== 201){
            return false
        }

        return mensagem

    }catch(error){
        console.log(error)
        return false
    }

}


