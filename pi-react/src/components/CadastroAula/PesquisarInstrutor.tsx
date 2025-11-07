import { useState } from "react";
import Estilizacoes from "../../model/Estilizacoes";
import Input from "../Input/Input";
import Botao from "../Botao/Botao"

export default function PesquisarInstrutor(){

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
            const response = await fetch("urlbackend")
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
        const resultado = await buscarInstrutor()

        if (resultado.erro) {
            setInstrutorError(true)
            setMensagemErro(resultado.mensagem)
            return
        }

        setInstrutorError(false)
    }



    return(
        <div className="flex flex-col gap-4  w-full">
            <div>
                <h1 className={Estilizacoes.titulo_segundario}>Instrutor</h1>
            </div>
            <div className="flex flex-col gap-4 justify-start  w-full 
            md:flex-row md:items-end">
                <div className="w-full md:w-[50%]">
                    <Input
                    type="text"
                    />
                </div>
                <div>
                    <Botao texto="Pesquisar" type="button" onClick={handlePesquisar}/>
                </div>
            </div>

            {instrutorError && (
                <div>
                    <h1 className="text-[1.3rem] text-red-700 md:text-[1.5rem]">{mensagemErro}</h1>
                </div>
            )}
        </div>
    )
}