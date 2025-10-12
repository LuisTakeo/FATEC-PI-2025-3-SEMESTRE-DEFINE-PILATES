import { useState } from "react"
import Botao from "../../components/Cadastros/Botao"
import Input from "../../components/Cadastros/Input"
import Estilizacoes from "../../model/Estilizacoes"

export default function RecebimentoCodigo(){

    const [codigo, setCodigo] = useState("")

    return(
        <>
        <main className="w-full h-150 flex">
            <section className="flex flex-col items-start justify-center flex-1 px-[10%] py-6 gap-10">
                <div className="flex flex-col gap-3">
                    <h2 className={Estilizacoes.titulo_principal}>
                        Código de segurança
                    </h2>
                    <p className={Estilizacoes.titulo_segundario}>
                        Escreva abaixo o código que você recebeu por SMS
                    </p>
                </div>

                <Input
                id="codigo"
                label="Digite o código de segurança"
                value={codigo}
                onChange={setCodigo}
                type = "text"
                pattern=".*"
                placeholder = "Digite o código"
                size = "w-full"
                />

                <Botao texto="Confirmar Código" type="submit" link="/recuperarsenha/alterarsenha"/>

                <p className="text-[1.2rem] text-black text-left">
                    <span className="text-[var(--destaque)] font-semibold">
                    Não recebeu seu código?
                    </span>
                    <br />
                    Retorne à tela anterior e reescreva seu telefone e clique em solicitar
                    código novamente em{" "}
                    <span className="text-[var(--destaque)] font-semibold">30</span>
                    <span className="text-[var(--destaque)] font-semibold"> segundos</span>
                </p>
            </section>
        </main>
        </>
    )
}