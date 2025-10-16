import { useState } from "react"
import Botao from "../../components/Cadastros/Botao"
import Input from "../../components/Cadastros/Input"
import Estilizacoes from "../../model/Estilizacoes"
import React from 'react';

export default function RecuperacaoTelefone(){

    const [telefone, setTelefone] = useState("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Lógica para enviar o telefone e solicitar o código SMS
        console.log("Solicitando código para telefone:", telefone);
        // A navegação para /recuperarsenha/confirmarcodigo ocorreria aqui após o sucesso
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
                        
                        <section className=" w-full flex flex-col items-center flex-1 py-6 gap-10">
                            
                            {/* Ajuste de layout para mobile: a imagem será colocada abaixo do texto em telas pequenas */}
                            <header className=" flex flex-col md:flex-row justify-between items-center gap-6 w-full">
                                <div className="gap-3 flex flex-col flex-1">
                                    <h1
                                    className={`${Estilizacoes.titulo_principal} word-break`}>
                                        Digite seu telefone
                                    </h1>
                                    <p
                                    className={Estilizacoes.titulo_segundario}
                                    >para podermos te enviar um código de segurança pelo seu SMS</p>
                                </div>
                                
                                {/* CÓDIGO DA IMAGEM RESTAURADO */}
                                <img
                                src="/envelope.png"
                                alt="Envelope"
                                className="w-35 object-contain mb-6 flex-shrink-0"
                                />
                                
                            </header>

                            <div className="w-full gap-10 flex flex-col">
                                <Input
                                id="telefone"
                                label="Digite seu telefone"
                                value={telefone}
                                onChange={setTelefone}
                                type = "tel" // 'tel' é mais apropriado para telefones
                                pattern=".*"
                                placeholder = "Digite seu telefone"
                                size = "w-full"
                                />

                                <Botao texto="Solicitar Código" type="submit" link="/recuperarsenha/confirmarcodigo"/>
                            </div>
                        </section>
                    </form>
                </div>
            </main>
        </div>
    )
}
