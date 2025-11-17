// import type {Aluno} from "./../../types/Aluno"

import { API_BASE_URL } from "../../config/api";

export async function login_aluno(login: string , password: string) {
    try{
        const telefoneLogin = formatar_telefone(login);
        console.log(telefoneLogin);
        console.log(password);
        console.log(API_BASE_URL);
        const response = await fetch(`${API_BASE_URL}/students/login`, 
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    login: telefoneLogin,
                    password
                })
            }
        )
        console.log(response)
        const data = await response.json()
        console.log(data.data.user)
        console.log(data.data.token)
        localStorage.setItem("Define-Pilates-AuthToken", data.data.token);
        localStorage.setItem("Define-Pilates-UserInfo", (JSON.stringify(data.data.user)));
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

function formatar_telefone(telefone: string)
{
    return telefone.replace(/\D/g, '');

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