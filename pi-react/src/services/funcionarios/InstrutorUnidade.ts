import { API_BASE_URL } from "../../config/api";

export async function InstrutorUnidade() {
    const response = await fetch(`${API_BASE_URL}/instructors`, {
        headers: {
            "ngrok-skip-browser-warning": "true"
        }
    });
    if (!response.ok) throw new Error("Erro ao buscar instrutores");

    const data = await response.json();
    return data.data
}
