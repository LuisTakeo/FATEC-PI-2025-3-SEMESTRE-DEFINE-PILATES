import { useState } from "react"
import React from 'react';
import Estilizacoes from "../../model/Estilizacoes"
import InputTelefone from "../../components/Erro/InputTelefone"; 
import Botao from "../../components/Botao/Botao" 

export default function RecuperacaoTelefone(){

    const [telefone, setTelefone] = useState("");
    const [telefoneConfirmacao, setTelefoneConfirmacao] = useState(""); 
    const [erroTelefone, setErroTelefone] = useState(""); 
    const [erroConfirmacao, setErroConfirmacao] = useState(""); 
    const [isLoading, setIsLoading] = useState(false); 

    const validarTelefoneBasico = (tel: string) => {
        const digits = tel.replace(/\D/g, "");
        return digits.length === 10 || digits.length === 11; 
    };

    const handleTelefoneChange = (val: string) => {
        setTelefone(val);
        setErroTelefone(""); 
        if (erroConfirmacao && val === telefoneConfirmacao) {
            setErroConfirmacao("");
        }
    };

    const handleTelefoneConfirmacaoChange = (val: string) => {
        setTelefoneConfirmacao(val);
        setErroConfirmacao("");
        if (erroTelefone && val === telefone) {
            setErroTelefone("");
        }
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoading) return;
        
        setErroTelefone(""); 
        setErroConfirmacao("");
        let hasError = false;

        // [Validação do Telefone Principal]
        if (!telefone.trim()) {
            setErroTelefone("O telefone não pode ser vazio.");
            hasError = true;
        } else if (!validarTelefoneBasico(telefone)) {
            setErroTelefone("Número de telefone inválido ou incompleto.");
            hasError = true;
        }

        // [Validação da Confirmação]
        if (!telefoneConfirmacao.trim()) {
            setErroConfirmacao("Confirmação obrigatória.");
            hasError = true;
        } else if (!validarTelefoneBasico(telefoneConfirmacao)) {
            setErroConfirmacao("Número de telefone inválido ou incompleto.");
            hasError = true;
        }

        // [Validação de Coincidência]
        if (!hasError && telefone !== telefoneConfirmacao) {
            const mensagemErro = "Os números de telefone não coincidem.";
            setErroTelefone(mensagemErro);
            setErroConfirmacao(mensagemErro);
            hasError = true;
        }
        
        if (hasError) {
            return; 
        }
        
        //  Lógica de envio e feedback
        setIsLoading(true);
        console.log("Solicitando código para telefone:", telefone);

        try {
            // Simulação de chamada à API
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            console.log("Código enviado com sucesso!");

            // Se o envio for bem-sucedido, você navegaria para a próxima tela
            // Ex: router.push('/recuperarsenha/RecebimentoCodigo', { state: { telefone: telefone }}); // Exemplo de como passar o telefone

        } catch (error) {
            console.error("Erro ao solicitar código:", error);
            setErroTelefone("Erro ao tentar enviar código. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return(
    
        // O Container principal
        <div className="flex flex-col items-center justify-start w-full font-sans overflow-x-hidden"> 
            <main 
                className="w-[80vw] flex flex-col justify-center px-[2%] py-6"
                style={{ backgroundColor: 'var(--background)' }}
            >
                {/* O container principal do formulário */}
                <div className="w-full mx-auto"> 
                    
                    <form onSubmit={handleSubmit} className="w-full">
                        <section className="w-full flex flex-col items-start gap-8">
                            
                            <header className="flex flex-col md:flex-row justify-between items-start gap-6 w-full mb-0">
                                
                                <div className="gap-3 flex flex-col flex-4 max-w-sm md:max-w-none"> 
                                    <h1
                                    className={`${Estilizacoes.titulo_principal} text-[2rem] text-left`}
                                    >
                                        Recuperação de Senha por Telefone
                                    </h1>
                                    <h2
                                    className={`${Estilizacoes.segundo_titulo_principal} text-[1.0rem] text-[var(--foreground)] text-left`}
                                    >
                                        Para podermos te enviar um código de segurança pelo seu SMS. Digite o número duas vezes para confirmar.
                                    </h2>
                                </div>
                                
                                <img
                                    src="/envelope.png"
                                    alt="Envelope"
                                    className="w-30 object-contain flex-shrink-0 mt-4 md:mt-0 mx-auto" 
                                />
                            </header>

                            {/* Bloco de Inputs e Botão: Largura total (w-full) */}
                            <div className="text-[1rem] font-medium w-full gap-8 flex flex-col"> 
                                
                                {/* Input Telefone Principal */}
                                <InputTelefone
                                    id="telefone"
                                    label="Seu Telefone"
                                    value={telefone}
                                    onChange={handleTelefoneChange} 
                                    erro={erroTelefone} 
                                    size="w-full" 
                                />

                                {/* Input Confirmação de Telefone */}
                                <InputTelefone
                                    id="telefone-confirmacao"
                                    label="Confirme seu Telefone"
                                    value={telefoneConfirmacao}
                                    onChange={handleTelefoneConfirmacaoChange} 
                                    erro={erroConfirmacao} 
                                    size="w-full" 
                                />

                                {/* Botão */}
                                <div className="mt-4 w-full">
                                    <Botao 
                                        texto={isLoading ? "Enviando..." : "Solicitar Código"} 
                                        type="submit" 
                                    />
                                </div>
                                
                            </div>
                        </section>
                    </form>
                </div>
            </main>
        </div>
    )
}