
//puxar dados de login

import { API_BASE_URL } from "../config/api";

export async function dadosLogin() {

  const token = localStorage.getItem("Define-Pilates-AuthToken")
  if (!token) {
    console.warn('❌ Token não encontrado no localStorage');
    return null;
  }
  
  console.log("✅ Token encontrado:", token.substring(0, 50) + "...");
  console.log("📍 URL:", `${API_BASE_URL}/auth/me`);
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true"
      }
    });

    console.log("📥 Status:", response.status, response.statusText);
    console.log("📥 Content-Type:", response.headers.get("content-type"));

    // Verifica se a resposta é bem-sucedida
    if (!response.ok) {
      if (response.status === 401) {
        console.warn('⚠️ Token inválido ou expirado (401). Removendo token...');
        localStorage.removeItem("Define-Pilates-AuthToken");
        localStorage.removeItem("userType");
        window.location.href = '/login';
        return null;
      }
      
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    // Verifica se o content-type é JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("❌ Resposta não é JSON. Content-Type:", contentType);
      const text = await response.text();
      console.error("Conteúdo:", text.substring(0, 500));
      throw new Error("Resposta não é JSON. O servidor pode estar retornando HTML.");
    }

    const data = await response.json();
    console.log("✅ Dados obtidos:", data);
    return data.data; 

  } catch (error) {
    console.error('Erro ao buscar dados de acesso:', error);
    return null; 
  }
}