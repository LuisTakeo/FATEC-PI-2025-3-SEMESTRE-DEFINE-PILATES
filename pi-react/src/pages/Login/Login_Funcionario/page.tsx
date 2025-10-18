"use client";
import { useState } from "react";
import Estilizacoes from "../../../model/Estilizacoes";
import Input from "../../../components/Erro/Input"; 
import InputTelefone from "../../../components/Erro/InputTelefone"; 
import Botao from "../../../components/Cadastros/Botao";

// Constantes de tamanho de senha
const MIN_LENGTH = 6; 
const MAX_LENGTH = 10; 

export default function LoginFuncionario() {
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [erroTelefone, setErroTelefone] = useState("");
    const [erroSenha, setErroSenha] = useState("");

    const clearAllErrors = () => {
        setErroTelefone("");
        setErroSenha("");
    };

    const handleTelefoneChange = (val: string) => {
        setTelefone(val);
        clearAllErrors(); 
    };

    const handleSenhaChange = (val: string) => {
        setSenha(val);
        clearAllErrors();
    };

    const validarTelefoneBasico = (tel: string) => {
        const digits = tel.replace(/\D/g, "");
        return digits.length === 10 || digits.length === 11;
    };
    
    const validarConteudoSenha = (s: string) => {
        const temMinuscula = /[a-z]/.test(s);
        const temMaiuscula = /[A-Z]/.test(s);
        const temNumero = /[0-9]/.test(s);
        const temEspecial = /[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~`]/.test(s);
        
        if (!temMinuscula || !temMaiuscula || !temNumero || !temEspecial) {
            return "Senha inválida."; 
        }
        return null;
    }


    const handleLogin = () => {
        clearAllErrors(); 
        let hasError = false;

        if (!telefone.trim()) {
            setErroTelefone("Campo obrigatório.");
            hasError = true;
        } else if (!validarTelefoneBasico(telefone)) {
            setErroTelefone("Telefone inválido.");
            hasError = true;
        }

        if (!senha.trim()) {
            setErroSenha("Campo obrigatório.");
            hasError = true;
        } 
        else if (senha.length < MIN_LENGTH || senha.length > MAX_LENGTH) {
            setErroSenha(`A senha deve ter entre ${MIN_LENGTH} e ${MAX_LENGTH} caracteres.`);
            hasError = true;
        } 
        else {
            const erroConteudo = validarConteudoSenha(senha);
            if (erroConteudo) {
                setErroSenha("Senha inválida."); 
                hasError = true;
            }
        }

        if (!hasError) {
            console.log("Login funcionário válido!", { telefone, senha });
            // Adicionar lógica de chamada à API de login de funcionário aqui
        }
    };

    return (
        <main className="flex flex-col justify-start items-center px-6 pt-32 pb-10 flex-grow bg-[var(--background)]">
            
            <section className="flex w-full max-w-sm justify-between items-center mb-6">
                <h2 className={Estilizacoes.titulo_principal}>
                    Acesso de Funcionário
                </h2>
            </section>

            <section className="w-full max-w-sm flex flex-col gap-8">
                <p className={Estilizacoes.segundo_titulo_principal}>Acessar</p>

                <div className="flex flex-col gap-8">
                    <InputTelefone
                        id="telefone-login"
                        label="Telefone"
                        value={telefone}
                        onChange={handleTelefoneChange} 
                        erro={erroTelefone}
                    />

                    <Input
                        id="senha-login"
                        label="Senha"
                        value={senha}
                        onChange={handleSenhaChange} 
                        type="password" 
                        placeholder="Digite a sua senha"
                        size="w-full"
                        erro={erroSenha}
                        mostrarSenhaToggle={true} 
                        maxLength={MAX_LENGTH} 
                    />

                    <a
                        href="/recuperarsenha/dados"
                        className="text-[var(--destaque)] text-sm underline self-start"
                    >
                        Esqueci a minha senha
                    </a>
                </div>

                <div className="flex flex-col gap-8 mt-8">
                    <Botao texto="Acessar conta" onClick={handleLogin} type="button" /> 
                </div>
            </section>
        </main>
    );
}