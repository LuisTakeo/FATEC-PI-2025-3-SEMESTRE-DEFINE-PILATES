import { API_BASE_URL } from "../../config/api";
import type {Aluno} from "./../../types/Aluno"

export async function cadastrar_aluno(aluno: Aluno) {
    try{
        console.log(aluno);
        console.log(API_BASE_URL);
        const response = await fetch(`${API_BASE_URL}/students/save`, 
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(aluno)
            }
        )
        console.log(response)
        const data = await response.json()
        console.log(data)
        if(response.status !== 200){
            return false
        }

        return true

    }catch(error){
        console.log(error)
        return false
    }

    return true
}


