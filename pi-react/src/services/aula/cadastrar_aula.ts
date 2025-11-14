import { API_BASE_URL } from "../../config/api";
import type {Aula} from "./../../types/Aula"

export async function Cadastrar_aula(aula: Aula) {
    try{
        console.log(aula);
        console.log(API_BASE_URL);
        const response = await fetch(`${API_BASE_URL}/class/save`, 
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(aula)
            }
        )
        console.log(response)
        const data = await response.json()
        console.log(data)
        if(response.status !== 201){
            return false
        }

        return true

    }catch(error){
        console.log(error)
        return false
    }

    return true
}


