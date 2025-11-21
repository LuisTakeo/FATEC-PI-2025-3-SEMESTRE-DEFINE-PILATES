
//puxar dados de login

import { API_BASE_URL } from "../../config/api";
import { dadosLogin } from "./../dadoslogin"


export async function aulasPendentes() {

    const acesso = await dadosLogin()
    const id = acesso.user.id

    try {

    const response = await fetch(`${API_BASE_URL}/students/${id}/aulas/available`)
    const data = await response.json();
    return data.data; 

    } catch (error) {
    console.error('Erro ao buscar aulas pendentes:', error);
    return []; 
    }
}