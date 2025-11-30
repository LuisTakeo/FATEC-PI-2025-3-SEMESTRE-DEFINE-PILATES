import { API_BASE_URL } from "../../config/api";
import type { AulaInstrutor } from "../../types/AulaInstrutor";

export async function fetchAulaInstrutor(id: number): Promise<AulaInstrutor> {
  try {
    const res = await fetch(`${API_BASE_URL}/instructors/1/classes`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    console.log(json)
    return json as AulaInstrutor; 
    
  } catch (error) {
    console.error('Erro ao buscar aulas:', error);
    return { status: "error", message: "Falha ao buscar aulas", data: [] };
  }
}
