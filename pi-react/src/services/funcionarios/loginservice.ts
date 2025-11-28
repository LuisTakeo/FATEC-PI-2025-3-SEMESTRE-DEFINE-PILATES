// Caminho: services/funcionarios/loginservice.ts

import { API_BASE_URL } from "../../config/api";
// ✅ Importa a função formatar_telefone do serviço de aluno, usando o caminho corrigido.
import { formatar_telefone } from "../aluno/loginservice"; 

export async function login_funcionario(login: string , password: string, acesso: string) {
    try{
        const telefoneLogin = formatar_telefone(login);

        const requestURL = acesso === "instructor" ? 
            `${API_BASE_URL}/instructors/login` 
            : `${API_BASE_URL}/admin_receptionist/login`;

        const response = await fetch(requestURL, 
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

        const data = await response.json()
        const user = data.data.user; // Objeto user contém o 'type' (Ex: "Instructor")

        if (typeof window !== "undefined") {
            // Salva o token e informações do usuário
            localStorage.setItem("Define-Pilates-AuthToken", data.data.token);
            localStorage.setItem("Define-Pilates-UserInfo", (JSON.stringify(user)));
            
            // ✅ CHAVES DE CONTROLE DO HEADER
            // Estas chaves corrigem o problema do redirecionamento do logo na Home pública (/)
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userType", user.type); // Salva o tipo da API
        }

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