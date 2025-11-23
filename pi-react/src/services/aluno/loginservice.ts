// Caminho: services/aluno/loginservice.ts

import { API_BASE_URL } from "../../config/api";

// Define a interface para o retorno esperado no componente LoginPage
interface AuthResult {
    success: boolean;
    token?: string;
    alunoId?: string; 
    message?: string;
}

// Função auxiliar para formatar o telefone, removendo caracteres não numéricos.
function formatar_telefone(telefone: string): string {
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

        // 🔑 1. VERIFICAÇÃO DE SUCESSO E EXISTÊNCIA DO TOKEN
        if (response.status === 200 && data.data?.token) {
            
            const token = data.data.token;
            const user = data.data.user;
            const student = data.data.student; // Incluímos 'student' para garantir a coleta do ID, se necessário
            
            // 💥 CORREÇÃO PRINCIPAL: Usa a chave 'fullname' para extrair o nome
            const nomeDoAluno = user?.fullname?.toString().trim() || 'Aluno(a)'; 
            
            // Cria o objeto para salvar no localStorage
            const userInfoParaStorage = {
                id: student?.id?.toString() || user?.id?.toString(), // Tenta ID de 'student' primeiro
                alunoId: student?.id?.toString() || user?.id?.toString(),
                // MAPEAR 'fullname' (API) para 'nome' (HomeAlunoPage)
                nome: nomeDoAluno 
            };

            // 2. ARMAZENAMENTO NO localStorage
            localStorage.setItem("Define-Pilates-AuthToken", token);
            localStorage.setItem("Define-Pilates-UserInfo", JSON.stringify(userInfoParaStorage));

            // 3. RETORNA O OBJETO DE SUCESSO
            return {
                success: true,
                token: token,
                alunoId: student?.id?.toString() || user?.id?.toString() 
            };
        } else {
            // Caso de falha de credenciais
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