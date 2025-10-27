"use client";
import { useState, type FormEvent } from "react";
import Estilizacoes from "../../../model/Estilizacoes";
import Input from "../../../components/Erro/Input";
import InputTelefone from "../../../components/Erro/InputTelefone";
import Botao from "../../../components/Botao/Botao";

const MIN_LENGTH = 6;
const MAX_LENGTH = 10;

const KEY_IS_LOGGED = "isEmployeeLoggedIn";
const KEY_USER_ROLE = "userRole";

export default function LoginFuncionario() {
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [erroTelefone, setErroTelefone] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

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

  const validarConteudoSenha = (s: string): string | null => {
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

    clearAllErrors();
    let hasError = false;

    // Validação do Telefone
    if (!telefone.trim()) {
      setErroTelefone("Campo obrigatório.");
      hasError = true;
    } else if (!validarTelefoneBasico(telefone)) {
      setErroTelefone("Telefone inválido.");
      hasError = true;
    }

    // Validação da Senha
    if (!senha.trim()) {
      setErroSenha("Campo obrigatório.");
      hasError = true;
    } else if (senha.length < MIN_LENGTH || senha.length > MAX_LENGTH) {
      setErroSenha(`A senha deve ter entre ${MIN_LENGTH} e ${MAX_LENGTH} caracteres.`);
      hasError = true;
    } else {
      const erroConteudo = validarConteudoSenha(senha);
      if (erroConteudo) {
        setErroSenha(
          "A senha deve conter letras maiúsculas, minúsculas, números e um caractere especial."
        );
        hasError = true;
      }
    }

    if (!hasError) {
      setIsLoading(true);
      try {
        // Simulação de delay da API (usando await new Promise)
        await new Promise((resolve) => setTimeout(resolve, 1500)); 

        const authResult = true; 

        if (authResult) {
          const cargoRecebido = "adm"; 
          
          if (typeof window !== "undefined") {
            // Armazenamento local adaptado para Funcionário
            localStorage.setItem(KEY_IS_LOGGED, "true");
            localStorage.setItem(KEY_USER_ROLE, cargoRecebido);
            setAuthSuccess(true); 
          }
          console.log("✅ Login de funcionário bem-sucedido. LocalStorage atualizado.");
        } else {
          setErroSenha("Credenciais de funcionário inválidas.");
          setAuthSuccess(false);
        }
      } catch (error) {
        console.error("Erro na API de Login de Funcionário:", error);
        setErroSenha("Erro de conexão. Tente novamente mais tarde.");
        setAuthSuccess(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mt-1">
      <main className="flex flex-col w-[80vw] px-[2%]">
        
        {/* Cabeçalho com imagem à direita - Adaptado para o Funcionário */}
        <header className="grid grid-cols-1 md:grid-cols-2 items-center mb-1">
          
          {/* Texto à esquerda */}
          <div className="flex flex-col justify-center gap-1 text-left">
            <h1 className={`${Estilizacoes.titulo_principal} text-[2rem]`}>
              Acesso de Funcionário
            </h1>
            <h2 className={`${Estilizacoes.segundo_titulo_principal} text-[1.0rem] text-[var(--foreground)]`}>
              Acesse sua conta com seu telefone e senha
            </h2>
          </div>

          {/* Imagem à direita */}
          <div className="flex justify-center md:justify-end mt-6 md:mt-0">
            <img
              src="/pilates.png" 
              alt="Ilustração de Funcionário"
              className="w-[35%] md:w-[35%] lg:w-[30%] object-contain"
            />
          </div>
        </header>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="flex flex-col gap-8 w-full">
          <section className="flex flex-col gap-6 w-full">
            <h3 className={`${Estilizacoes.segundo_titulo_principal} text-[var(--destaque)] text-[1.3rem]`}>
              Dados de acesso
            </h3>

            <div className="w-full flex flex-col gap-8">
              <div className="text-[1rem] font-medium">
                <InputTelefone
                  id="telefone-login"
                  label="Telefone"
                  value={telefone}
                  onChange={handleTelefoneChange}
                  erro={erroTelefone}
                />
              </div>

              <div className="text-[1rem] font-medium">
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
              </div>

              <a
                href="/recuperarsenha/RecuperacaoTelefone"
                className="text-[var(--destaque)] text-[1rem] underline font-medium self-start"
              >
                Esqueci a minha senha
              </a>
            </div>
          </section>

          {/* Botões */}
          <section className="mt-2 flex flex-col gap-6">
            <Botao
              texto={isLoading ? "Acessando..." : "Acessar conta"}
              type="submit"
              // Adicionando o link condicional do funcionário
              link={authSuccess ? "/home/funcionario" : ""} 
            />

            {/* <a
              href="/" // Link de volta para o login do aluno
              className="text-[var(--destaque)] text-[1rem] underline font-medium self-start"
            >
              Voltar para Login do Aluno
            </a> */}
          </section>
        </form>
      </main>
    </div>
  );
}