import { API_BASE_URL } from "../../config/api";
import type { AulaInstrutor } from "../../types/AulaInstrutor";

export async function fetchAulaInstrutor(instructorId: number): Promise<AulaInstrutor> {
  try {
    const res = await fetch(`${API_BASE_URL}/instructors/${instructorId}/classes`, {
      headers: {
        "accept": "application/json",
        "ngrok-skip-browser-warning": "true"
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    console.log("Aulas do instrutor com alunos:", json)
    return json as AulaInstrutor; 
    
  } catch (error) {
    console.error('Erro ao buscar aulas do instrutor:', error);
    return { status: "error", message: "Falha ao buscar aulas", data: [] };
  }
}
