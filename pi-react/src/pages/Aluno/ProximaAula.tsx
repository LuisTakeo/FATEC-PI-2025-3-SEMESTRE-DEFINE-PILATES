import { useEffect, useState } from "react";
import { fetchProximaAula } from "./../../services/aula/fetchProximaAula" 
import type {ProximaAulaApi } from "./../../types/ProximaAula"
import Botao from "../../components/Botao/Botao";
import { confirmCancelAula} from "./../../services/aula/confirmCancelAula"
import Estilizacoes from "../../uteis/Estilizacoes";

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

        if (status === "cancel"){
            const resposta_cancelar = window.confirm("Tem certeza que deseja cancelar sua presença nesta aula? Clique em Ok para continuar ou em Cancelar para cancelar essa solicitação")

            if (!resposta_cancelar) {
                console.log("Cancelamento de presença cancelado");
                return
            }
        }
        

        //requisição
        const resultado = await confirmCancelAula(aula_id, aluno_id!, status)

        if (!resultado) {
            console.log("Erro: Resposta vazia de confirmCancelAula")
            return
        }

        console.log(resultado.data.action)

        if(resultado.status === "error"){
            setMsgConfirmCancelAula("Você já confirmou ou cancelou sua presença nesta aula")
        }
        else if (resultado.data.action === "confirm"){
            setMsgConfirmCancelAula(`Você confirmou sua presença nesta aula com sucesso.`)
        }else if (resultado.data.action === "cancel"){
            setMsgConfirmCancelAula(`Você cancelou sua presença nesta aula com sucesso.`)
        }

    }


    return(
        <>
        <section className="flex flex-col gap-10">
            {aulas.length === 0 ? (
                <section>
                    <div className="bg-white shadow-2xl rounded-[8px] min-w-full min-h-[230px] flex flex-row md:flex-row items-center justify-between px-[30px] py-[30px] 
                        gap-5 border-l-[10px] border-l-[var(--destaque)] md:min-h-[130px]">

                        <div className="flex flex-col aling-center items-center gap-3 items-start">
                                <div>
                                <h1 className={Estilizacoes.titulo_principal}>Próxima Aula</h1>
                            </div>
                            <div className="flex flex-row gap-3 aling-center items-center">
                                <div>
                                    <h1 className="text-[1.6rem]">{mensagemProxAula}</h1>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2ec27e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-frown-icon lucide-frown"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
                                </div>
                            </div>         
                        </div>
                        </div>
                </section>
                ) : (
                <section className="flex flex-col w-full h-full">
                    {aulas.map((aula) => (
                        <div key={aula.id}
                        className="bg-white shadow-2xl rounded-[8px] min-w-full min-h-[230px] flex items-start flex-col items-center justify-between px-[30px] py-[30px] 
                        gap-5 border-l-[10px] border-l-[var(--destaque)] md:min-h-[130px]">
                            <h1 className={Estilizacoes.titulo_principal}>Próxima Aula</h1>
                            <div className="flex flex-col gap-5 text-[1.4rem]">
                                <div className="flex flex-row aling-center items-center gap-3">

                                    <div> 
                                        <h1 className="font-semibold text-[1.6rem]">{msgConfirmCancelAula}</h1>
                                    </div>
                                    <div className={`${!msgConfirmCancelAula ? "hidden" : ""}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#26a269" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-smile-icon lucide-smile"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
                                    </div>

                                </div>
                                <div>
                                    <h1><span className="font-semibold">Data da Aula:</span> {aula.data.replace("-", "/").replace("-", "/")}</h1>
                                    <h1><span className="font-semibold">Horário:</span> {aula.horario}</h1>
                                </div>
                                
                                <div>
                                    <h1><span className="font-semibold">Unidade:</span> {aula.unidade.name}</h1>
                                    <h1><span className="font-semibold">Endereço:</span> {aula.unidade.endereco}</h1>
                                </div>    

                                <h1><span className="font-semibold">Instrutor:</span> {aula.instructor.nome}</h1>
                            </div>
                            <div className="flex flex-col md:flex-row gap-10 py-5">
                                <div>
                                    <Botao texto="Confirmar Presença" type="button" onClick={() => statusAula(aula.id, "confirm")}/>
                                </div>
                                <div>
                                    <Botao texto="Cancelar Presença" type="button"  style="bg-red-800 hover:bg-red-600" onClick={() => statusAula(aula.id, "cancel")}/>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div>
                        <h1 className="text-[1.3rem] text-red-800 py-8 w-full h-full">
                            Caso voce desmarque a aula antes de completar 3 horas para a data da aula, voce terá direito a reposição de aula, 
                            conforme uma justificativa apropriada. Caso desmarque 3 horas antes da aula, não tem direito a reposição
                        </h1>
                    </div>
                </section>
                
            )} 

            <section className="bg-white shadow-2xl rounded-[8px] min-w-full min-h-[230px] flex items-start flex-col md:flex-row items-center justify-between px-[30px] py-[30px] 
                        gap-5 border-l-[10px] border-l-[var(--destaque)] md:min-h-[130px]">
                <div className="flex flex-col md:flex-row justify-between items-center w-full h-full">
                    <div className="flex flex-col gap-5">
                        <div className="flex md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#2ec27e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar-days-icon lucide-calendar-days"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>

                        </div>
                        <div>
                            <h1 className={Estilizacoes.titulo_principal}>Consulte suas aulas e marque pendências</h1>
                        </div>
                        <div>
                            <Botao texto="Acessar Caléndario" link="/calendario/aluno"/>
                        </div>
                    </div>
                    <div className="hidden md:flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#2ec27e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar-days-icon lucide-calendar-days"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                    </div>
                </div>
                
                
            </section>
        </section>
        </> 
    )
}