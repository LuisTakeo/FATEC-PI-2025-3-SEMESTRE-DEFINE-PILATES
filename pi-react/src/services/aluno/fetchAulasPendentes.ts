
//puxar dados de login

import { API_BASE_URL } from "../../config/api";
import { dadosLogin } from "../dadoslogin"
import type { aulasPendentesType } from "../../types/aulasPendentesType"


export async function FetchAulasPendentes() {

    const acesso = await dadosLogin()
    const id = acesso.user.id

    try {

    const response = await fetch(`${API_BASE_URL}/students/${id}/aulas/available`, {
      headers: {
        "ngrok-skip-browser-warning": "true"
      }
    })
    const data = await response.json();
    const aulas: aulasPendentesType[] = data.data
    return aulas; 

    } catch (error) {
        console.error('Erro ao buscar aulas pendentes:', error);
    return []; 
    }
}