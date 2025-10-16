"use client";
import { useState } from "react";
import Estilizacoes from "../../../model/Estilizacoes";
import Input from "../../../components/Erro/Input"; 
import InputTelefone from "../../../components/Erro/InputTelefone"; 
import Botao from "../../../components/Cadastros/Botao";

export default function LoginPage() {
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

    const handleLogin = () => {
        let hasError = false;

        clearAllErrors();

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

        if (!hasError) {
            console.log("Tentativa de Login:", { telefone, senha });
        }
    };

    return (
        <main className="flex flex-col justify-start items-center px-6 pt-32 pb-10 flex-grow bg-[var(--background)]">
            <section className="w-full max-w-sm flex flex-col items-center">
                
                <div className="flex w-full justify-between items-start mb-6">
                    <h2 className={`${Estilizacoes.titulo_principal} text-2xl leading-tight`}>
                        Entre <br /> na sua conta
                    </h2>
                    <img
                        src="/pilates.png"
                        alt="Pilates Illustration"
                        className="w-[30%] object-contain -mt-4"
                    />
                </div>

                <div className="w-full max-w-sm flex flex-col gap-8"> 
                    <p className={`${Estilizacoes.segundo_titulo_principal} w-full text-left`}>Acessar</p>

                    <div className="flex flex-col gap-8">
                        <InputTelefone
                            id="telefone-login"
                            label="Telefone"
                            value={telefone}
                            onChange={handleTelefoneChange} 
                            erro={erroTelefone}
                        />
                    </div>
                    
                    <div className="mt-8"> 
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
                        />
                    </div>

                    <a
                        href="/recuperarsenha/dados"
                        className="text-[var(--destaque)] text-sm underline self-start mt-4" 
                    >
                        Esqueci a minha senha
                    </a>

                    <div className="flex flex-col gap-7 mt-6"> 
                        <Botao texto="Acessar conta" onClick={handleLogin} />

                        <a
                            href="/login/funcionario"
                            className="text-[var(--destaque)] text-sm underline self-start"
                        >
                            Acesso de Funcionário
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}