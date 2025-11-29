import { API_BASE_URL } from "../../config/api";

export async function Cadastrar_aula(aula: any) {
    try{
        console.log(aula);
        console.log(API_BASE_URL);
        const response = await fetch(`${API_BASE_URL}/aulas/cadastro`, 
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
        console.log("RESPOSTA", data)
        
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


