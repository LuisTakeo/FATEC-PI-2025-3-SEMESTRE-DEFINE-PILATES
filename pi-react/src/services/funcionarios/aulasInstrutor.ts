import { useEffect } from "react";
import { API_BASE_URL } from "../../config/api";


//ACHAR AULA A PARTIR DO ID DO INSTRUTOR
export async function aulasInstrutor(){
      useEffect(() => {
        if (!unidade) return;

        const fetchInstrutores = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/class`);
                if (!response.ok) throw new Error("Erro ao buscar aulas");

                const lista = await response.json();

                const filtrados = lista
                    .filter((i: any) => i.unidade === unidade.valor)
                    .map((i: any) => ({
                        value: i.Instructors.nome,
                        label: i.Instructors.nome
                    }));

                setInstrutorOptions(filtrados);
            } catch (err) {
                console.error(err);
            }
        };

        fetchInstrutores();
    }, [unidade]);
}