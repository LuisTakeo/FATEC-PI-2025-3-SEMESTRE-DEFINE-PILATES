import { useState, useEffect, useCallback } from "react"
import Botao from "../../components/Cadastros/Botao"
import Input from "../../components/Cadastros/Input" 
import Estilizacoes from "../../model/Estilizacoes"
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
        

        setContador(30);
        setReenviarHabilitado(false);
        setTentativaReenvio(prev => prev + 1);
        setTimeout(() => { setContador(30); }, 5000); 
    }, [tentativaReenvio, telefoneRecebido]);

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
        // ... (Lógica de API) ...
        setIsLoading(false);
    };


    return(
        <div className="min-h-screen w-full font-sans overflow-x-hidden"> 
            <main 
                className="w-full flex justify-center py-20 md:py-32"
                style={{ backgroundColor: 'var(--background)' }}
            >
                <div className="w-full max-w-md mx-auto px-4"> 
                    
                    <form onSubmit={handleConfirmarCodigo} className="w-full" noValidate>
                        <section className="flex flex-col items-start w-full gap-3"> 
                            <div className="flex flex-col gap-3">
                                <h2 className={Estilizacoes.titulo_principal}>Código de segurança</h2>
                                <p className={Estilizacoes.titulo_segundario}>
                                    Escreva abaixo o código que você recebeu por SMS
                                </p>
                            </div>

                            <div className="w-full flex flex-col gap-1 mt-3">
                                <Input
                                    id="codigo"
                                    label="Digite o código de segurança"
                                    value={codigo}
                                    onChange={handleCodigoChange}
                                    type="text"
                                    pattern="[0-9]{6}"
                                    placeholder="000000"
                                    size="w-full"
                                    maxLength={6}
                                />

                                {erroCodigo && (
                                    <span className="text-red-500 text-sm mt-1">
                                        {erroCodigo}
                                    </span>
                                )}
                            </div>

                            <Botao 
                                texto={isLoading ? "Confirmando..." : "Confirmar Código"} 
                                type="submit" 
                            /> 

                            <div className="w-full flex flex-col"> 
                                
                                {reenviarHabilitado ? (
                                    <button 
                                        type="button" 
                                        onClick={handleReenviarCodigo}
                                        className="text-[var(--destaque)] text-sm underline self-start bg-transparent border-none p-0 cursor-pointer"
                                    >
                                        Solicitar reenvio do código
                                    </button>
                                ) : (
                                    <p className="text-[1.2rem] text-black text-left">
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
                            </div>
                        </section>
                    </form>
                </div>
            </main>
        </div>
    )
}