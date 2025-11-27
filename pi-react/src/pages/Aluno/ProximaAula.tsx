import { useEffect, useState } from "react";
import { fetchProximaAula } from "./../../services/aula/fetchProximaAula" 
import type {ProximaAulaApi } from "./../../types/ProximaAula"
import Botao from "../../components/Botao/Botao";
import { confirmCancelAula} from "./../../services/aula/confirmCancelAula"
import type { ConfirmacaoAulaResponse } from "../../types/ConfirmacaoAulaResponse";


interface ProximaAulaProps{
    aluno_id?: number 
}

export default function ProximaAula({aluno_id}: ProximaAulaProps){
    console.log("id_proxima_aula", aluno_id)

    const [aulas, setAulas] = useState<ProximaAulaApi[]>([])
    const [mensagemProxAula, setMensagemProxAula] = useState("")
    const [msgConfirmCancelAula, setMsgConfirmCancelAula] = useState("")

    useEffect(() => {

        if (aluno_id === undefined || aluno_id === null) {
            console.error("Id Vazio")
            return
        }
        
        async function load() {
            const aula = await fetchProximaAula({alunoId: aluno_id!});
            setAulas(aula?.data ? [aula.data] : [])
            setMensagemProxAula(aula?.message ? aula.message : "")
        }
    
        load();
    }, [aluno_id]);

    console.log("aula:",aulas)
    console.log("mensagem:", mensagemProxAula)

    async function statusAula(aula_id: number, status: string){

        if (status !== "confirm" && status !== "cancel"){
            console.log("Status diferente do esperado")
        } 

        const resultado = await confirmCancelAula(aula_id, aluno_id!, status)
        console.log("Resultado: ", resultado)

        if (!resultado) {
            console.log("Erro: Resposta vazia de confirmCancelAula")
            return
        }

        if(resultado.status === "error"){
            setMsgConfirmCancelAula("Você já confirmou ou cancelou sua presença nesta aula")
        }
        else if (resultado.status === "success"){
            setMsgConfirmCancelAula(`Você ${status === "confirm" ? "confirmou" : "cancelou"} sua presença nesta aula com sucesso.`)
        }

    }

    return(
        <>
       {aulas.length === 0 ? (
            <section>
                <div>{mensagemProxAula}</div>
            </section>
        ) : (
            <section>
                <div>
                    <h1>{mensagemProxAula}</h1>
                </div>

                {aulas.map((aula) => (
                    <div key={aula.id}>
                        <h1>{aula.data}</h1>
                        <h1>{aula.unidade.endereco}</h1>
                        <h1>{aula.unidade.name}</h1>
                        <h1>{aula.horario}</h1>
                        <h1>{aula.instructor.nome}</h1>

                        <div>
                            <div>
                                <Botao texto="Confirmar Presença" type="button" onClick={() => statusAula(aula.id, "confirm")}/>
                            </div>
                            <div>
                                <Botao texto="Cancelar Presença" type="button" onClick={() => statusAula(aula.id, "cancel")}/>
                            </div>
                        </div>

                    </div>
                    
                ))}

                <div>
                    <h1>{msgConfirmCancelAula}</h1>
                </div>


            </section>
        )} 
        </>
    )
}