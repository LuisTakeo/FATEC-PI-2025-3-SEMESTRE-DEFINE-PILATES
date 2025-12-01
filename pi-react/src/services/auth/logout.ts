import { API_BASE_URL } from "../../config/api";

export async function logout(): Promise<boolean> {
    try {
        const token = localStorage.getItem("Define-Pilates-AuthToken");
        
        if (!token) {
            console.warn("Nenhum token encontrado para logout");
            // Limpa o localStorage mesmo sem token
            localStorage.removeItem("Define-Pilates-AuthToken");
            return true;
        }

        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "ngrok-skip-browser-warning": "true"
            }
        });

        // Limpa o token do localStorage independente da resposta
        localStorage.removeItem("Define-Pilates-AuthToken");

        if (!response.ok) {
            console.error(`Erro ${response.status} ao fazer logout`);
            // Mesmo com erro, retorna true pois o token já foi removido
            return true;
        }

        const data = await response.json();
        console.log("Logout realizado com sucesso:", data);
        return true;

    } catch (error) {
        console.error("Erro ao fazer logout:", error);
        // Remove o token mesmo em caso de erro
        localStorage.removeItem("Define-Pilates-AuthToken");
        return true;
    }
}
