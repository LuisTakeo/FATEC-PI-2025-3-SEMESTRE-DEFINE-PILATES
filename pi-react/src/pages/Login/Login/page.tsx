
"use client";
import { useState } from "react";
import Estilizacoes from "../../../model/Estilizacoes";
import Input from "../../../components/Erro/Input"; 
import Botao from "../../../components/Cadastros/Botao"; 

export default function LoginPage() {
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [erroTelefone, setErroTelefone] = useState(""); 
  const [erroSenha, setErroSenha] = useState("");

  const handleLogin = () => {
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
        
        <div className="w-full flex flex-col gap-8">
            
            <p className={`${Estilizacoes.segundo_titulo_principal} w-full text-left`}>Acessar</p>

            <div className="flex flex-col gap-8">
                <Input
                    id="telefone-login"
                    label="Telefone"
                    value={telefone}
                    onChange={setTelefone}
                    type="text"
                    placeholder="(DD) XXXXX-XXXX"
                    size="w-full"
                    erro={erroTelefone} 
                    telefone={true}
                />
            </div>
            
            
            <div className="mb-0"> 
                <Input
                    id="senha-login"
                    label="Senha"
                    value={senha}
                    onChange={setSenha}
                    type="password"
                    placeholder="Digite a sua senha"
                    size="w-full"
                    erro={erroSenha} 
                    mostrarSenhaToggle={true}
                />
            </div>
            
           
            <a 
                href="/recuperarsenha/dados" 
                className="text-[var(--destaque)] text-sm underline self-start -mt-4" 
            >
                Esqueci a minha senha
            </a>
            
            
            <div className="flex flex-col gap-1 mt-0"> 
                <Botao texto="Acessar conta" type="button" onClick={handleLogin} />

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