import { useEffect, useState } from "react";
import { fetchProximaAula } from "./../../services/aula/fetchProximaAula" 
import type {ProximaAulaApi } from "./../../types/ProximaAula"



interface ProximaAulaProps{
    aluno_id?: number 
}

export default function ProximaAula({aluno_id}: ProximaAulaProps){
    console.log("id_proxima_aula", aluno_id)

    const [aulas, setAulas] = useState<ProximaAulaApi[]>([])
    const [mensagem, setMensagem] = useState("")

    useEffect(() => {

        if (aluno_id === undefined || aluno_id === null) {
            console.error("Id Vazio")
            return
        }
        
        async function load() {
            const aula = await fetchProximaAula({alunoId: aluno_id!});
            setAulas(aula?.data ? [aula.data] : [])
            setMensagem(aula?.message ? aula.message : "")
        }
    
        load();
    }, [aluno_id]);

    console.log("aula:",aulas)
    console.log("mensagem:", mensagem)


    return(
        <>
       {aulas.length === 0 ? (
            <section>
                <div>{mensagem}</div>
            </section>
        ) : (
            <section>
                <div>
                    <h1>{mensagem}</h1>
                </div>

                {aulas.map((aula) => (
                    <div>
                        <h1>{aula.data}</h1>
                        <h1>{aula.unidade.endereco}</h1>
                        <h1>{aula.unidade.name}</h1>
                        <h1>{aula.horario}</h1>
                        <h1>{aula.instructor.nome}</h1>
                    </div>
                ))}

            </section>
        )} 
        </>
    )
}