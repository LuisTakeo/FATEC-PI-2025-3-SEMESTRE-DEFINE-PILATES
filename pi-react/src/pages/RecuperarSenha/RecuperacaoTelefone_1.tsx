import { useState } from "react"
import React from 'react';
import Estilizacoes from "../../model/Estilizacoes"
import InputTelefone from "../../components/Erro/InputTelefone"; 
import Botao from "../../components/Cadastros/Botao" 

export default function RecuperacaoTelefone(){

    const [telefone, setTelefone] = useState("");
    const [erroTelefone, setErroTelefone] = useState(""); 

    const validarTelefoneBasico = (tel: string) => {
        const digits = tel.replace(/\D/g, "");
        return digits.length === 10 || digits.length === 11; 
    };

    const handleTelefoneChange = (val: string) => {
        setTelefone(val);
        setErroTelefone(""); 
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setErroTelefone(""); 
        
        let hasError = false;
        let errorMessage = "";

        if (!telefone.trim()) {
            errorMessage = "O telefone não pode ser vazio.";
            hasError = true;
        } 

        else if (!validarTelefoneBasico(telefone)) {
            errorMessage = "Número de telefone inválido ou incompleto.";
            hasError = true;
        }
        
        if (hasError) {
            setErroTelefone(errorMessage);
            return; 
        }
        
        // Lógica de navegação ou chamada à API para enviar o código SMS
        console.log("Solicitando código para telefone:", telefone);
    };

    return(
        <div className="min-h-screen w-full font-sans overflow-x-hidden"> 
            <main 
                className="w-full flex justify-center py-20 md:py-32"
                style={{ backgroundColor: 'var(--background)' }}
            >
                <div className="w-full max-w-md mx-auto px-4"> 
                    
                    <form onSubmit={handleSubmit} className="w-full">
                        <section className=" w-full flex flex-col items-center flex-1 py-6 gap-8">
                            
                            <header className=" flex flex-col md:flex-row justify-between items-center gap-6 w-full">
                                <div className="gap-3 flex flex-col flex-1">
                                    <h1
                                    className={`${Estilizacoes.titulo_principal} word-break text-2xl font-bold text-[var(--destaque)] font-inter mb-2 text-left`}
                                    >
                                        Digite seu telefone
                                    </h1>
                                    <p
                                    className={`${Estilizacoes.titulo_segundario} text-base font-inter mb-6 text-left`}
                                    >para podermos te enviar um código de segurança pelo seu SMS</p>
                                </div>
                                
                                <img
                                src="/envelope.png"
                                alt="Envelope"
                                className="w-35 object-contain flex-shrink-0"
                                />
                                
                            </header>

                            <div className="w-full gap-4 flex flex-col">
                                <InputTelefone
                                    id="telefone"
                                    label="Digite seu telefone"
                                    value={telefone}
                                    onChange={handleTelefoneChange} 
                                    erro={erroTelefone} 
                                />

                                <Botao texto="Solicitar Código" type="submit" />
                            </div>
                        </section>
                    </form>
                </div>
            </main>
        </div>
    )
}
