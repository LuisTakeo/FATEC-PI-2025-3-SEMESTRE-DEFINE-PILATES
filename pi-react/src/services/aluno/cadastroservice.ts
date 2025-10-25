import type {Aluno} from "./../../types/Aluno"

export async function cadastrar_aluno(aluno: Aluno) {
    try{
        const response = await fetch("http://localhost:8080/api/students/save", 
            {
                method: "POST",
                headers:{
                    "Content-Type": "aplication/json",
                    "Accept": "aplication/json"
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



// {
//   "name": "João Silva",
//   "phone": "(11)99999-9999",
//   "password": "abc123A",
//   "cpf": "12345678901",
//   "profession": "Engenheiro",
//   "birth_date": "15-01-1990",
//   "fotos": [
//     "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD"
//   ],
//   "contatos": [
//     {
//       "tipo": "email",
//       "valor": "joao@email.com",
//       "observacao": "Email pessoal"
//     }
//   ],
//   "enderecos": [
//     {
//       "tipo": "residencial",
//       "rua": "Rua das Flores",
//       "numero": "123",
//       "complemento": "Apto 45",
//       "bairro": "Centro",
//       "cidade": "São Paulo",
//       "estado": "SP",
//       "cep": "01234-567",
//       "principal": true
//     }
//   ]
// }