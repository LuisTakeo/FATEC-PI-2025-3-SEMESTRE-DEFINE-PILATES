import { useState, useEffect, useCallback } from "react"
import Botao from "../../components/Botao/Botao"
import Input from "../../components/Input/Input" 
import Estilizacoes from "../../uteis/Estilizacoes"
import { useLocation } from 'react-router-dom';
import React from 'react';

const SIMULATED_PHONE = "(11) 99999-0000"; 

export default function RecebimentoCodigo(){

    const location = useLocation();
    const telefoneRecebido: string = (location.state as { telefone?: string } | null)?.telefone || SIMULATED_PHONE;

    const [codigo, setCodigo] = useState("")
    const [erroCodigo, setErroCodigo] = useState("") 
    const [contador, setContador] = useState(30)
    const [reenviarHabilitado, setReenviarHabilitado] = useState(false)
    const [tentativaReenvio, setTentativaReenvio] = useState(0); 
    const [isLoading, setIsLoading] = useState(false); 

    const handleCodigoChange = (value: string) => {
        const numericValue = value.replace(/\D/g, '').slice(0, 6); 
        setCodigo(numericValue);
        setErroCodigo(""); 
    };

    const handleReenviarCodigo = useCallback(() => {
        console.log(`Reenviando código para ${telefoneRecebido}.`); 
        
        // Lógica de API (Simulação)

        setContador(30);
        setReenviarHabilitado(false);
        setTentativaReenvio(prev => prev + 1);
        setTimeout(() => { setContador(30); }, 5000); 
    }, [telefoneRecebido]);

    useEffect(() => {
        let timerId: NodeJS.Timeout | null = null;
        let delayId: NodeJS.Timeout | null = null;

        delayId = setTimeout(() => { 
            setContador(30); 
            timerId = setInterval(() => {
                setContador(prevContador => {
                    if (prevContador <= 1) {
                        clearInterval(timerId as NodeJS.Timeout);
                        setReenviarHabilitado(true); 
                        return 0;
                    }
                    return prevContador - 1;
                });
            }, 1000);
        }, 5000); 

        return () => {
            if (timerId) clearInterval(timerId);
            if (delayId) clearTimeout(delayId);
        };
    }, [tentativaReenvio]);


    const handleConfirmarCodigo = async (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        setErroCodigo(""); 

        const numericCode = codigo.replace(/\D/g, "");
        
        if (!numericCode.trim()) {
            setErroCodigo("Campo obrigatório.");
            return; 
        }
        
        if (numericCode.length !== 6) {
            setErroCodigo("O código deve ter exatamente 6 dígitos numéricos.");
            return; 
        }
        
        setIsLoading(true);
        // ... (Lógica de API para confirmação) ...
        setIsLoading(false);
    };


    return(
        <div className="flex flex-col items-center justify-start w-full font-sans overflow-x-hidden"> 
            <main 
                className="w-[80vw] flex flex-col justify-center px-[2%] py-6" 
                style={{ backgroundColor: 'var(--background)' }}
            >
                {/* O container principal do formulário */}
                <div className="w-full mx-auto"> 
                    
                    <form onSubmit={handleConfirmarCodigo} className="w-full flex flex-col gap-8">
                        <section className="flex flex-col items-start w-full gap-8"> 
                            
                            {/* Bloco Título e Descrição */}
                            <header className="flex flex-col gap-2 w-full mb-2">
                                <h1 className={`${Estilizacoes.titulo_principal} text-[2rem]`}>
                                    Código de Segurança
                                </h1>
                                <h2 className={`${Estilizacoes.segundo_titulo_principal} text-[1.0rem] text-[var(--foreground)]`}>
                                    Enviamos um código para o número **{telefoneRecebido}**. Digite-o abaixo.
                                </h2>
                            </header>

                            <div className="w-full flex flex-col gap-1"> 
                                
                                <p className=" text-[1rem] font-medium text-[var(--cor-do-texto-secundario)]"> 
                                    Digite o código de segurança
                                </p>

                                <Input
                                    id="codigo"
                                    value={codigo}
                                    onChange={(e) => handleCodigoChange(e.target.value)} 
                                    type="text"
                                    pattern="[0-9]{6}"
                                    placeholder="000000"
                                    maxLength={6}
                                />

                                {erroCodigo && (
                                    <span className="text-red-500 text-sm mt-1">
                                        {erroCodigo}
                                    </span>
                                )}
                            </div>

                            {/* Botão de Ação Principal */}
                            <div className="w-full">
                                <Botao 
                                    texto={isLoading ? "Confirmando..." : "Confirmar Código"} 
                                    type="submit" 
                                /> 
                            </div>

                            {/* Bloco de Reenvio de Código */}
                            <div className="w-full flex flex-col"> 
                                
                                {reenviarHabilitado ? (
                                    <button 
                                        type="button" 
                                        onClick={handleReenviarCodigo}
                                        className="text-[var(--destaque)] text-[1rem] underline self-start bg-transparent border-none p-0 cursor-pointer"
                                    >
                                        Solicitar reenvio do código
                                    </button>
                                ) : (
                                    <p className="text-base font-normal text-[var(--cor-do-texto-secundario)]"> 
                                        <span className="text-[var(--destaque)] font-semibold">
                                            Não recebeu seu código?
                                        </span>
                                        <br />
                                        Retorne à tela anterior ou solicite o reenvio do 
                                        código novamente em
                                        <span className="text-[var(--destaque)] font-semibold"> {contador}</span>
                                        <span className="text-[var(--destaque)] font-semibold"> segundos</span>
                                    </p>
                                )}

                                {/* Adicionado link de retorno para o Login */}
                                {/* <a
                                    href="/" 
                                    className="text-[var(--destaque)] text-[1rem] underline font-medium self-start mt-4"
                                >
                                    Voltar para o Login
                                </a> */}
                            </div>
                        </section>
                    </form>
                </div>
            </main>
        </div>
    )
}