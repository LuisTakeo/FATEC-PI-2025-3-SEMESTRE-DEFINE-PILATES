import type {Aluno} from "./../../types/Aluno"

export async function cadastrar_aluno(aluno: Aluno) {
    try{
        console.log(aluno);
        const response = await fetch("http://localhost:8000/api/students/save", 
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

        return true

    }catch(error){
        console.log(error)
        return false
    }

    return true
}


