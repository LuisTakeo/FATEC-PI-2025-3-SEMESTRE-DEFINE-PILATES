
import { useState } from "react"
import Botao from "../../components/Cadastros/Botao"
import Input from "../../components/Cadastros/Input"
import Estilizacoes from "../../model/Estilizacoes"

export default function RecuperacaoTelefone(){

    const [telefone, setTelefone] = useState("")

    return(
        <>
            <main className="w-full h-150 flex">
                <section className=" w-full flex flex-col items-center justify-center flex-1 px-[10%] py-6 gap-10">
                    <header className=" flex flex-row justify-between items-center gap-10 w-full">
                        <div className="gap-3 flex flex-col">
                            <h1
                            className={`${Estilizacoes.titulo_principal} word-break`}>Digite seu telefone </h1>
                            <p
                            className={Estilizacoes.titulo_segundario}
                            >para pordermos te enviar um código de segurança pelo seu SMS</p>
                        </div>
                        <img
                        src="/envelope.png"
                        alt="Envelope"
                        className="w-35 object-contain mb-6"
                        />
                    </header>

                    <div className="w-full gap-10 flex flex-col">
                        <Input
                        id="telefone"
                        label="Digite seu telefone"
                        value={telefone}
                        onChange={setTelefone}
                        type = "tel"
                        pattern=".*"
                        placeholder = "Digite seu telefone"
                        size = "w-full"
                        />

                        <Botao texto="Solicitar Código" type="submit" link="/recuperarsenha/confirmarcodigo"/>
                    </div>
            </section>
        </main>
        </>
    )
}