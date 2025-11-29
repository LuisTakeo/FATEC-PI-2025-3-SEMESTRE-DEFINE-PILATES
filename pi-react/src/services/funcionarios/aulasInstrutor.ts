import { API_BASE_URL } from "../../config/api";

export async function InstrutorUnidade() {

    const response = await fetch(`${API_BASE_URL}/instructors/${instrutor_id}/classes`);
    if (!response.ok) throw new Error("Erro ao buscar aulas do instrutor");

    const data = await response.json();
    return data.data
}
