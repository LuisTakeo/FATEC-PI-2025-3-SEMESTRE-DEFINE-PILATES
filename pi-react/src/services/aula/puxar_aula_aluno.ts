//puxa aulas com base no id do aluno

import { API_BASE_URL } from "../../config/api";
import type { Aula } from "../../types/Aula";


export async function fetchAulasAluno(alunoId: string): Promise<Aula[]> {

  try {

    const response = await fetch(`${ API_BASE_URL }/students/${alunoId}/aulas`, {
      headers: {
        "ngrok-skip-browser-warning": "true"
      }
    });
    const data = await response.json();
    
    const aulas: Aula[] = data.data;
    return aulas

  } catch (error) {
    console.error('Erro ao buscar aulas:', error);
    return []; 
  }
}