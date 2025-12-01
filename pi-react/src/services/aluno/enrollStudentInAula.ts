import { API_BASE_URL } from "../../config/api";

export async function enrollStudentInAula(idAula: number, idAluno: number): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/students/aulas/${idAula}/enroll`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json",
                "ngrok-skip-browser-warning": "true"
            },
            body: JSON.stringify({
                id_student: idAluno
            })
        });

        if (!response.ok) {
            console.error(`Erro ${response.status} ao matricular aluno na aula`);
            return false;
        }

        const data = await response.json();
        
        if (data.status === 'success') {
            return true;
        }

        console.error("Erro na resposta:", data);
        return false;
    } catch (error) {
        console.error("Erro ao matricular aluno na aula:", error);
        return false;
    }
}
