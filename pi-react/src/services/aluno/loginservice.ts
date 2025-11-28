// Caminho: services/aluno/loginservice.ts

import { API_BASE_URL } from "../../config/api";

// Define a interface para o retorno esperado no componente LoginPage
interface AuthResult {
    success: boolean;
    token?: string;
    alunoId?: string; 
    message?: string;
}

// ✅ EXPORTAÇÃO: A função é definida aqui e exportada para evitar duplicação em outros arquivos.
export function formatar_telefone(telefone: string): string {
    return telefone.replace(/\D/g, '');
}

export async function login_aluno(login: string, password: string): Promise<AuthResult> {
    try {
        const telefoneLogin = formatar_telefone(login);

        const response = await fetch(`${API_BASE_URL}/students/login`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    login: telefoneLogin,
                    password
                })
            }
        );
        
        const data = await response.json();

        if (response.status === 200 && data.data?.token) {
            
            const token = data.data.token;
            const user = data.data.user; 
            const student = data.data.student; 
            
            const nomeDoAluno = user?.fullname?.toString().trim() || 'Aluno(a)'; 
            
            const userInfoParaStorage = {
                id: student?.id?.toString() || user?.id?.toString(),
                alunoId: student?.id?.toString() || user?.id?.toString(),
                nome: nomeDoAluno 
            };

            // 2. ARMAZENAMENTO NO localStorage
            if (typeof window !== "undefined") {
                localStorage.setItem("Define-Pilates-AuthToken", token);
                localStorage.setItem("Define-Pilates-UserInfo", JSON.stringify(userInfoParaStorage));
                
                // CHAVES DE CONTROLE DO HEADER
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userType", user.type); // Salva o valor da API
            }

            // 3. RETORNA O OBJETO DE SUCESSO
            return {
                success: true,
                token: token,
                alunoId: student?.id?.toString() || user?.id?.toString() 
            };
        } else {
            const errorMessage = data.message || "Credenciais inválidas. Verifique telefone e senha.";
            
            return {
                success: false,
                message: errorMessage
            };
        }

    }catch(error){
        console.error("Erro de rede/servidor:", error);
        return {
            success: false,
            message: "Erro de conexão. Tente novamente mais tarde."
        };
    }
}