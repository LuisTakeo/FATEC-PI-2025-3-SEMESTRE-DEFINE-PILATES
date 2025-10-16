import { useState } from "react"
import Botao from "../../components/Cadastros/Botao"
import Input from "../../components/Cadastros/Input"
import Estilizacoes from "../../model/Estilizacoes"
import React from 'react'; 

export default function AlterarSenha() {
    const [senha, setSenha] = useState("")
    const [senhaConfirmacao, setSenhaConfirmacao] = useState("")

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        console.log("Tentativa de salvar nova senha:", { senha, senhaConfirmacao });
    };

    return (
        
        <div className="min-h-screen w-full font-sans overflow-x-hidden"> 

            <main 
                className="w-full flex justify-center py-20 md:py-32"
                style={{ backgroundColor: 'var(--background)' }}
            >
                
                <div className="w-full max-w-md mx-auto px-4"> 
                    
                    <form onSubmit={handleSave} className="w-full">
                        
                        <div className="flex flex-col items-start w-full gap-8">
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
                                type="password" 
                                pattern=".*"
                                placeholder="Digite a senha"
                                size="w-full"
                            />

                            <Input
                                id="senhaconfirmacao"
                                label="Digite sua nova senha novamente"
                                value={senhaConfirmacao}
                                onChange={setSenhaConfirmacao}
                                type="password" 
                                pattern=".*"
                                placeholder="Digite a senha novamente"
                                size="w-full"
                            />

                            <Botao texto="Salvar nova senha" type="submit"/>

                        </div>
                    </form>
                </div>
            </main>
            

        </div>
    )
}