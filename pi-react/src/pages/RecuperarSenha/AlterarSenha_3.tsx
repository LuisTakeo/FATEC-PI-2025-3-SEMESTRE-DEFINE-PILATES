import { useState } from "react"
import Botao from "../../components/Cadastros/Botao"
import Input from "../../components/Cadastros/Input"
import Estilizacoes from "../../model/Estilizacoes"

export default function AlterarSenha(){

    const [senha, setSenha] = useState("")
    const [senhaConfirmacao, setSenhaConfirmacao] = useState("")

    return(
        <>
        <main className="w-full h-150 flex">
            <section className="flex flex-col items-start justify-center flex-1 px-[10%] py-6 gap-10">
                <div className="flex flex-col gap-3">
                    <h2 className={Estilizacoes.titulo_principal}>
                        Nova senha
                    </h2>
                    <p className={Estilizacoes.titulo_segundario}>
                        Escreva sua nova senha abaixo e, em seguida, digite-a novamente para confirmar que você se lembrará dela.
                    </p>
                </div>

                <Input
                id="senha"
                label="Digite sua nova senha"
                value={senha}
                onChange={setSenha}
                type = "text"
                pattern=".*"
                placeholder = "Digite a senha"
                size = "w-full"
                />

                <Input
                id="senhaconfirmacao"
                label="Digite sua nova senha novamente"
                value={senhaConfirmacao}
                onChange={setSenhaConfirmacao}
                type = "text"
                pattern=".*"
                placeholder = "Digite a senha novamente"
                size = "w-full"
                />

                <Botao texto="Salvar nova senha" type="submit"/>

            </section>
        </main>
        </>
    )
}