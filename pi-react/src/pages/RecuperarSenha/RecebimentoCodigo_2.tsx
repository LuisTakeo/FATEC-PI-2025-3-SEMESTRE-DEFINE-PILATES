import { useState } from "react"
import Botao from "../../components/Cadastros/Botao"
import Input from "../../components/Cadastros/Input"
import Estilizacoes from "../../model/Estilizacoes"
import React from 'react'; 

export default function RecebimentoCodigo(){

    const [codigo, setCodigo] = useState("")
    const [contador, setContador] = useState(30)

    // Função de manipulação de envio (submit)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Lógica de confirmação do código (aqui você faria a chamada à API)
        console.log("Código submetido:", codigo);
        // O Botao já tem o link para a próxima página, mas a lógica de navegação viria aqui após o sucesso.
    };

    return(
        // 1. Container principal: Ocupa toda a tela e remove rolagem lateral.
        <div className="min-h-screen w-full font-sans overflow-x-hidden"> 
            
            {/* 2. Faixa Cinza Completa: Usa a cor exata do body (var(--background)) */}
            <main 
                className="w-full flex justify-center py-20 md:py-32"
                style={{ backgroundColor: 'var(--background)' }}
            >
                
                {/* 3. Container do Conteúdo: Define a largura máxima e centraliza horizontalmente. */}
                <div className="w-full max-w-md mx-auto px-4"> 
                    
                    <form onSubmit={handleSubmit} className="w-full">
                        
                        {/* A seção interna foi simplificada para um div para melhor layout */}
                        <div className="flex flex-col items-start w-full gap-8">
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

                            {/* O botão agora é type="submit" para funcionar com o <form> */}
                            <Botao texto="Confirmar Código" type="submit" link="/recuperarsenha/alterarsenha"/>

                            <p className="text-[1.2rem] text-black text-left">
                                <span className="text-[var(--destaque)] font-semibold">
                                Não recebeu seu código?
                                </span>
                                <br />
                                Retorne à tela anterior e reescreva seu telefone e clique em solicitar
                                código novamente em{" "}
                                <span className="text-[var(--destaque)] font-semibold">{contador}</span>
                                <span className="text-[var(--destaque)] font-semibold"> segundos</span>
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}
