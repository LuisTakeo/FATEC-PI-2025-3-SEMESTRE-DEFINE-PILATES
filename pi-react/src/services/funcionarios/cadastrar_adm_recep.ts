import type { Funcionario } from "../../types/Funcionario"

export async function cadastrar_adm_recep(funcionario: Funcionario) {
    try {
        const response = await fetch("http://localhost:8000/api/admin_receptionist/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(funcionario),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erro na API:", errorData);
            return false;
        }

        const data = await response.json();
        console.log("Sucesso:", data);
        return true;
    } catch (error) {
        console.error("Erro de conexão:", error);
        return false;
    }
}


