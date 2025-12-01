
import {dadosLogin} from "./../../services/dadoslogin"
import { API_BASE_URL } from "../../config/api"
import type { CadastroAulaResponse } from "../aluno/cadastrarAlunoAula"

export default async function presencaInstrutor(id_aula: number) {
    console.log(id_aula)
    const acesso = await dadosLogin()
    const id_aluno = acesso.user.id
    console.log(id_aluno);
    try{
        const response = await fetch(`${API_BASE_URL}/instructors/`, 
            //enviar id do aluno no id da aula
             
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "ngrok-skip-browser-warning": "true"
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