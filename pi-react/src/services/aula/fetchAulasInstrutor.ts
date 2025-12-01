import { API_BASE_URL } from "../../config/api";
import type { Aula } from "../../types/Aula";

export async function fetchAulasInstrutor(instructorId: number): Promise<Aula[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/instructors/${instructorId}/classes`, {
      headers: {
        "accept": "application/json",
        "ngrok-skip-browser-warning": "true"
      }
    });
    
    if (!response.ok) {
      throw new Error(`Erro ${response.status} ao buscar aulas do instrutor`);
    }
    
    const result = await response.json();
    
    // O endpoint retorna { status, message, data }
    if (result.status === "success" && Array.isArray(result.data)) {
      // Transforma os dados para o formato esperado por Aula[]
      return result.data.map((aulaData: any) => ({
        id: aulaData.id_aula,
        data: aulaData.data,
        horario: aulaData.horario,
        tipo: aulaData.tipo || "Pilates",
        instructor: {
          id: instructorId,
          nome: aulaData.instructor || ""
        },
        unidade: {
          id: aulaData.unidade?.id || 0,
          name: aulaData.unidade?.name || ""
        },
        alunos: aulaData.alunos || []
      }));
    }
    
    console.error("Formato de resposta inválido:", result);
    return [];
  } catch (error) {
    console.error('Erro ao buscar aulas do instrutor:', error);
    return []; 
  }
}
