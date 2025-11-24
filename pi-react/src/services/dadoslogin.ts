
//puxar dados de login

import { API_BASE_URL } from "../config/api";

export async function dadosLogin() {

  const token = localStorage.getItem("Define-Pilates-AuthToken")
  if (!token) return;
  console.log(token)

  try {
    
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
      }, 
      method: "GET"
    }) 

    const data = await response.json();
    return data.data; 

  } catch (error) {
    console.error('Erro ao buscar dados de acesso:', error);
    return []; 
  }
}