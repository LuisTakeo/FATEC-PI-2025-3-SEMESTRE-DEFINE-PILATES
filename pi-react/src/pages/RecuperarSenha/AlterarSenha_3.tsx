import { useState } from "react"
import Botao from "../../components/Botao/Botao"
import Input from "../../components/Erro/Input" 
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
 
    // @ts-ignore
    const handleSenhaChange = (val) => {
        setSenha(val);
        setErroSenha(""); 
        if (erroConfirmacao && val === senhaConfirmacao) {
            setErroConfirmacao(""); 
        }
};

    // @ts-ignore
    const handleSenhaConfirmacaoChange = (val) => {
        setSenhaConfirmacao(val);
        setErroConfirmacao(""); 
        if (erroSenha && val === senha) {
            setErroSenha("");
        }
    };

    // @ts-ignore
    const validarConteudoSenha = (s) => {
        const temNumero = /[0-9]/.test(s);
        const temMinuscula = /[a-z]/.test(s);
        const temMaiuscula = /[A-Z]/.test(s);
        const temEspecial = /[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~`]/.test(s);
        
        let erros = [];

        if (!temMinuscula) { erros.push("minúscula"); }
        if (!temMaiuscula) { erros.push("maiúscula"); }
        if (!temNumero) { erros.push("número"); }
        if (!temEspecial) { erros.push("caractere especial"); }

        if (erros.length > 0) {
            return `A senha deve conter: ${erros.join(", ")}.`;
        }
        return null;
    }

    // @ts-ignore
    const handleSave = async (e) => {
        e.preventDefault();

        let hasError = false;

        setErroSenha("");
        setErroConfirmacao("");

        // [Validação da Nova Senha]
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

        // [Validação da Confirmação]
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

        // [Validação de Coincidência]
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
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            console.log("Senha salva com sucesso!");

        } catch (error) {
            console.error("Erro ao salvar senha:", error);
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

                            <header className="flex flex-col gap-3 w-full">
                                <h2 className={Estilizacoes.titulo_principal}>
                                    Nova senha
                                    </h2>
                                <p className={Estilizacoes.titulo_segundario}>
                                    Defina sua nova senha (máx. 10 caracteres). Para ser válida, ela deve combinar letras maiúsculas, minúsculas, números e um símbolo especial.
                                </p>
                            </header>

                            <div className="w-full flex flex-col gap-4"> 

                                <div className="flex flex-col gap-0">
                                    <Input
                                        id="senha"
                                        label="Nova Senha" 
                                        value={senha}
                                        onChange={handleSenhaChange}
                                        type="password"
                                        placeholder="Digite a senha"
                                        size="w-full"
                                        maxLength={MAX_LENGTH}
                                        mostrarSenhaToggle={true} 
                                        erro={erroSenha} 
                                     />
                                </div>

                                <div className="flex flex-col gap-0"> 
                                    <Input
                                    id="senhaconfirmacao"
                                        label="Confirme a Senha" 
                                        value={senhaConfirmacao}
                                        onChange={handleSenhaConfirmacaoChange}
                                        type="password"
                                        placeholder="Digite a senha novamente"
                                        size="w-full"
                                        maxLength={MAX_LENGTH}
                                        mostrarSenhaToggle={true} 
                                        erro={erroConfirmacao} // 👈 Adicionado!
                                 />
                                </div>
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