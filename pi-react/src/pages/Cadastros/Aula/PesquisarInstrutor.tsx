import { useState } from "react";
import Estilizacoes from "../../../uteis/Estilizacoes";
import Botao from "../../../components/Botao/Botao"
import type { FormData } from "../../../types/FormData";
import { API_BASE_URL } from "../../../config/api"

export default function PesquisarInstrutor({unidadeAula, dataAula, horaAula}:{
    unidadeAula: string;
    dataAula: string;
    horaAula:string;
}){

    const [instrutorSelecionado, setInstrutorSelecionado] = useState<number | null>(null);
    const [instrutores, setInstrutores] = useState<{ id: number; nome: string }[]>([]);
    const [listAllow, setListAllow] = useState(false)
    const [instrutorError, setInstrutorError] = useState(false)
    const [mensagemErro, setMensagemErro] = useState("")

    const tratarErroBackend = (err: any) => {
        if (err.status === 404) {
            return { erro: true, mensagem: "Instrutor não encontrado" }
        }

        if (err.status === 400) {
            return { erro: true, mensagem: "Nome inválido" }
        }

        return { erro: true, mensagem: "Erro inesperado, tente novamente" }
    }

    const buscarInstrutor = async () => {
        try {
            const response = await fetch(
            `${API_BASE_URL}/instructors/disponiveis?unidade=${unidadeAula}&data=${dataAula}&hora=${horaAula}`
            )

            if (!response.ok) {
            throw response
            }

            const data = await response.json()
            return data

        } catch (err: any) {
            return tratarErroBackend(err)
        }
    }

    const handlePesquisar = async () => {
        setListAllow(true)
        const resultado = await buscarInstrutor()

        if (resultado.erro) {
            setInstrutorError(true)
            setMensagemErro(resultado.mensagem)
            return
        } else {
            setInstrutorError(false);
            setInstrutores(resultado);
        }


        setInstrutorError(false)
    }

    return(
        <div className="flex flex-col gap-10 w-full">
            <div className="flex flex-col gap-4 justify-start w-full 
            md:flex-row md:items-end md:gap-10">
                <div>
                    <h1 className={Estilizacoes.titulo_principal}>Instrutor</h1>
                    <h1 className={Estilizacoes.titulo_segundario}>Escolha qual instrutor irá realizar esta aula</h1>
                </div>
                <div>
                    <Botao texto="Pesquisar" type="button" onClick={handlePesquisar}/>
                </div>
            </div>

           {listAllow && (
                <div className="w-full flex flex-col gap-10">
                    {instrutores.length > 0 && instrutores.map(i => (
                        <div id="bloco-instrtor"
                            className={`bg-white shadow-2xl rounded-[8px] min-w-full min-h-[230px] 
                            flex flex-col items-center justify-between px-[30px] py-[30px] gap-5 
                            md:flex-row md:min-h-[130px] 
                            ${instrutorSelecionado === i.id ? "border-l-[10px] border-l-red-700" : "border-l-[10px] border-l-[var(--destaque)]"}
                            `}>

                            <div className="w-[50%]">
                                <p className="text-[1.5rem]"
                                key={i.id}>{i.nome}</p>
                            </div>
                           
                            {instrutorSelecionado !== i.id && (
                                <div className="w-[50%]">
                                    <Botao texto="Atribuir aula" type="button" onClick={() => setInstrutorSelecionado(i.id)} />
                                </div>
                                
                            )}

                            {instrutorSelecionado === i.id && (
                                <div className="w-[50%]">
                                    <Botao texto="Desmarcar" type="button" style="bg-red-500 hover:!bg-red-700" onClick={() => setInstrutorSelecionado(null)} />
                                </div>
                            )}
                        </div>
                        
                    ))}
                </div>
            )} 

            {instrutorError && (
                <div>
                    <h1 className="text-[1.3rem] text-red-700 md:text-[1.3rem]">{mensagemErro}</h1>
                </div>
            )}
        </div>
    )
}