import { useState } from "react"
import Botao from "../../components/Cadastros/Botao"
import Input from "../../components/Cadastros/Input"
import Estilizacoes from "../../model/Estilizacoes"
import React from 'react'; 

const MIN_LENGTH = 6; 
const MAX_LENGTH = 10; 

export default function AlterarSenha() {
    const [senha, setSenha] = useState("");
    const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
    const [erroSenha, setErroSenha] = useState(""); 
    const [erroConfirmacao, setErroConfirmacao] = useState(""); 
    const [isLoading, setIsLoading] = useState(false); 

    const handleSenhaChange = (val: string) => {
        setSenha(val);
        setErroSenha(""); 
        if (erroConfirmacao && val === senhaConfirmacao) {
            setErroConfirmacao(""); 
        }
    };

    const handleSenhaConfirmacaoChange = (val: string) => {
        setSenhaConfirmacao(val);
        setErroConfirmacao(""); 
        if (erroSenha && val === senha) {
            setErroSenha("");
        }
    };

    const validarConteudoSenha = (s: string) => {
        const temLetra = /[a-zA-Z]/.test(s);
        const temNumero = /[0-9]/.test(s);
        
        if (!temLetra || !temNumero) {
            return "A senha deve conter letras e números.";
        }
        return null;
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        
        let hasError = false;

        setErroSenha("");
        setErroConfirmacao("");

        if (!senha.trim()) {
            setErroSenha("Campo obrigatório.");
            hasError = true;
        } else if (senha.length < MIN_LENGTH || senha.length > MAX_LENGTH) {
            setErroSenha(`A senha deve ter entre ${MIN_LENGTH} e ${MAX_LENGTH} caracteres.`);
            hasError = true;
        } else {
            const erroConteudo = validarConteudoSenha(senha);
            if (erroConteudo) {
                setErroSenha(erroConteudo);
                hasError = true;
            }
        }

        if (!senhaConfirmacao.trim()) {
            setErroConfirmacao("Campo obrigatório.");
            hasError = true;
        } else if (senhaConfirmacao.length < MIN_LENGTH || senhaConfirmacao.length > MAX_LENGTH) {
            setErroConfirmacao(`A confirmação deve ter entre ${MIN_LENGTH} e ${MAX_LENGTH} caracteres.`);
            hasError = true;
        } else {
            const erroConteudo = validarConteudoSenha(senhaConfirmacao);
            if (erroConteudo) {
                setErroConfirmacao(erroConteudo);
                hasError = true;
            }
        }

        if (!hasError && senha !== senhaConfirmacao) {
            const mensagemErro = "As senhas não coincidem.";
            setErroSenha(mensagemErro);
            setErroConfirmacao(mensagemErro);
            hasError = true;
        }

        if (hasError) {
            return;
        }
        
        setIsLoading(true);
        console.log("Tentativa de salvar nova senha:", { senha, senhaConfirmacao });
        
        try {
            // Lógica de API
        } catch (error) {
            // Tratar erro da API
        } finally {
            setIsLoading(false);
        }
    };

    return (
        
        <div className="min-h-screen w-full font-sans overflow-x-hidden"> 

            <main 
                className="w-full flex justify-center py-20 md:py-32"
                style={{ backgroundColor: 'var(--background)' }}
            >
                
                <div className="w-full max-w-md mx-auto px-4"> 
                    
                    <form onSubmit={handleSave} className="w-full" noValidate>
                        
                        <div className="flex flex-col items-start w-full gap-8">
                            <div className="flex flex-col gap-3">
                                <h2 className={Estilizacoes.titulo_principal}>
                                    Nova senha
                                </h2>
                                <p className={Estilizacoes.titulo_segundario}>
                                    Escreva sua nova senha abaixo e, em seguida, digite-a novamente para confirmar que você se lembrará dela.
                                </p>
                            </div>

                            <div className="w-full flex flex-col gap-1">
                                <Input
                                    id="senha"
                                    label="Digite sua nova senha"
                                    value={senha}
                                    onChange={handleSenhaChange}
                                    type="password" 
                                    placeholder="Digite a senha"
                                    size="w-full"
                                />
                                {erroSenha && ( 
                                    <span className="text-red-500 text-sm mt-1">
                                        {erroSenha}
                                    </span>
                                )}
                            </div>

                            <div className="w-full flex flex-col gap-1 mt-4">
                                <Input
                                    id="senhaconfirmacao"
                                    label="Digite sua nova senha novamente"
                                    value={senhaConfirmacao}
                                    onChange={handleSenhaConfirmacaoChange}
                                    type="password" 
                                    placeholder="Digite a senha novamente"
                                    size="w-full"
                                />
                                {erroConfirmacao && ( 
                                    <span className="text-red-500 text-sm mt-1">
                                        {erroConfirmacao}
                                    </span>
                                )}
                            </div>

                            <Botao 
                                texto={isLoading ? "Salvando..." : "Salvar nova senha"} 
                                type="submit"
                            />

                        </div>
                    </form>
                </div>
            </main>
            
        </div>
    )
}