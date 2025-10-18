"use client";
import { useState, type FormEvent } from "react";
import Estilizacoes from "../../../model/Estilizacoes";
import Input from "../../../components/Erro/Input";
import InputTelefone from "../../../components/Erro/InputTelefone";
import Botao from "../../../components/Botao/Botao";

const MIN_LENGTH = 6;
const MAX_LENGTH = 10;

export default function LoginPage() {
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [erroTelefone, setErroTelefone] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

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
    } else if (senha.length < MIN_LENGTH || senha.length > MAX_LENGTH) {
      setErroSenha(`A senha deve ter entre ${MIN_LENGTH} e ${MAX_LENGTH} caracteres.`);
      hasError = true;
    } else {
      const erroConteudo = validarConteudoSenha(senha);
      if (erroConteudo) {
        setErroSenha("A senha deve conter letras maiúsculas, minúsculas, números e um caractere especial.");
        hasError = true;
      }
    }

    if (!hasError) {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const authSuccess = true;

        if (authSuccess) {
          if (typeof window !== "undefined") {
            localStorage.setItem("isLoggedIn", "true");
          }
          console.log("Login SUCESSO. Usuário logado.");
        } else {
          setErroSenha("Credenciais inválidas. Verifique telefone e senha.");
        }
      } catch (error) {
        console.error("Erro na API de Login:", error);
        setErroSenha("Erro de conexão. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
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

        <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-8">
          <p className={`${Estilizacoes.segundo_titulo_principal} w-full text-left`}>
            Acessar
          </p>

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

          <div className="flex flex-col gap-4">
            <Botao
              texto={isLoading ? "Acessando..." : "Acessar conta"}
              type="submit"
            />

            <a
              href="/login/funcionario"
              className="text-[var(--destaque)] text-sm underline self-start"
            >
              Acesso de Funcionário
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}
