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
    let valido = true;

    const digits = telefone.replace(/\D/g, "");
    if (digits.length !== 11) {
      setErroTelefone("Telefone inválido");
      valido = false;
    } else setErroTelefone("");

    if (senha.trim() === "") {
      setErroSenha("Senha não pode ser vazia");
      valido = false;
    } else setErroSenha("");

    if (valido) {
      console.log("Login válido!", { telefone, senha });
    }
  };

  return (
    <main className="flex flex-col justify-center items-center px-6 py-4 mt-8">
      <section className="flex w-full max-w-sm justify-between items-center mb-6">
        <h2 className={Estilizacoes.titulo_principal}>
          Entre <br /> na sua conta
        </h2>
        <img src="/pilates.png" alt="Pilates Illustration" className="w-[40%] object-contain -mt-4" />
      </section>

      <section className="w-full max-w-sm flex flex-col gap-8">
        <p className={Estilizacoes.segundo_titulo_principal}>Acessar</p>

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

          <Input
            id="senha-login"
            label="Senha"
            value={senha}
            onChange={setSenha}
            type="text"
            placeholder="Digite a sua senha"
            size="w-full"
            erro={erroSenha}
            mostrarSenhaToggle={true}
          />

          <a
            href="/recuperarsenha/dados"
            className="text-[var(--destaque)] text-[1.2rem] font-inter text-sm underline"
          >
            Esqueci a minha senha
          </a>
        </div>

        <div className="flex flex-col gap-8">
          <Botao texto="Acessar conta" type="button" onClick={handleLogin} />
          <a
            href="/login/funcionario"
            className="text-[var(--destaque)] text-[1.2rem] font-inter text-sm underline"
          >
            Acesso de Funcionário
          </a>
        </div>
      </section>
    </main>
  );
}
