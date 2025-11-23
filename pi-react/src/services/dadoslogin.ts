import { API_BASE_URL } from "../config/api";

interface MeResponse {
    data: {
        id: number;
        fullname: string; 
    };
}

export async function dadosLogin() {

    const token = localStorage.getItem("Define-Pilates-AuthToken");
    if (!token) return;
    
    try {
        
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }, 
            method: "GET"
        }); 

        const data: MeResponse = await response.json();
        const user = data.data; 

        if (user && user.fullname) {
            
            const userInfoParaStorage = {
                ...user, 
                id: user.id,
                nome: user.fullname.toString().trim() 
            };

            localStorage.setItem("Define-Pilates-UserInfo", JSON.stringify(userInfoParaStorage));
        }
        
        return user; 

    } catch (error) {
        console.error('Erro ao buscar dados de acesso:', error);
        return null; 
    }
}