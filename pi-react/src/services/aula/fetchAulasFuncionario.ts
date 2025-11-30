
import { API_BASE_URL } from "../../config/api";
import type { Aula } from "../../types/Aula";

export async function fetchAulasFuncionario(): Promise<Aula[]> {
  
  try {
    const response = await fetch(`${ API_BASE_URL }/aulas`);
    const data = await response.json();
    return data.data; 
  } catch (error) {
    console.error('Erro ao buscar aulas:', error);
    return []; 
  }
}