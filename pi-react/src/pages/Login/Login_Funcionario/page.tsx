"use client";
import { useState, type FormEvent } from "react";
import Estilizacoes from "../../../uteis/Estilizacoes";
import Input from "../../../components/Erro/Input";
import InputTelefone from "../../../components/Erro/InputTelefone";
import Botao from "../../../components/Botao/Botao";
// Assumindo que login_funcionario retorna um boolean
import { login_funcionario } from "../../../services/funcionarios/loginservice";
import { useNavigate } from "react-router-dom";

const MIN_LENGTH = 6;
const MAX_LENGTH = 20;

export default function LoginFuncionario() {
  const navigate = useNavigate();

  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [erroTelefone, setErroTelefone] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [erroTipoUsuario, setErroTipoUsuario] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const clearAllErrors = () => {
    setErroTelefone("");
    setErroSenha("");
    setErroTipoUsuario("");
  };

  const handleTelefoneChange = (val: string) => {
    setTelefone(val);
    setErroTelefone("");
  };

  const handleSenhaChange = (val: string) => {
    setSenha(val);
    setErroSenha("");
  };

  const handleTipoUsuarioChange = (val: string) => {
    setTipoUsuario(val);
    setErroTipoUsuario("");
  };

  const validarTelefoneBasico = (tel: string) => {
    const digits = tel.replace(/\D/g, "");
    return digits.length === 10 || digits.length === 11;
  };

  const validarConteudoSenha = (s: string): string | null => {
    const temMinuscula = /[a-z]/.test(s);
    const temMaiuscula = /[A-Z]/.test(s);
    const temNumero = /[0-9]/.test(s);

    if (!temMinuscula 
      || !temMaiuscula 
      || !temNumero 
    ) {
      return "Senha inválida.";
    }
    return null;
  };

  const handleLogin = async (e: FormEvent) => { 
    e.preventDefault();

    if (isLoading) return;

    clearAllErrors(); 
    let hasError = false;

    // --- Validações (Idênticas) ---
    if (!tipoUsuario.trim()) {
      setErroTipoUsuario("Selecione uma opção.");
      hasError = true;
    }

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
        setErroSenha(
          "A senha deve conter letras maiúsculas, minúsculas e números."
        );
        hasError = true;
      }
    }
    // --- Fim Validações ---

    if (!hasError) {
      setIsLoading(true);
      try {
        const authSuccess = await login_funcionario(telefone, senha, tipoUsuario);
        
        if (authSuccess) {
            
            // ✅ CORREÇÃO CRÍTICA: Não capitaliza. Usa o valor exato do select ('instructor').
            const userRoleExact = tipoUsuario; 
            
            const userInfoToStore = {
                type: userRoleExact, // Garante que o menu leia o valor correto em minúsculo
            };

            if (typeof window !== "undefined") {
              localStorage.setItem("isLoggedIn", "true");
              // Salva o tipo de usuário que foi selecionado no formulário
              localStorage.setItem("Define-Pilates-UserInfo", JSON.stringify(userInfoToStore)); 
            }
            
            console.log("Tipo acesso salvo:", userRoleExact);
            
            // Redireciona
            navigate("/home/funcionario"); 
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
    <div className="flex flex-col items-center justify-center w-full mt-1">
      <main className="flex flex-col w-[80vw] px-[2%]">
        
        <header className="grid grid-cols-1 md:grid-cols-2 items-center mb-1">
          
          <div className="flex flex-col justify-center gap-1 text-left">
            <h1 className={`${Estilizacoes.titulo_principal} text-[2rem]`}>
              Acesso de Funcionário
            </h1>
            <h2 className={`${Estilizacoes.segundo_titulo_principal} text-[1.0rem] text-[var(--foreground)]`}>
              Acesse sua conta com seu telefone e senha
            </h2>
          </div>

          <div className="flex justify-center md:justify-end mt-6 md:mt-0">
            <img
              src="/pilates.png" 
              alt="Ilustração de um funcionário ou instrutor de pilates acessando o sistema."
              className="w-[35%] md:w-[35%] lg:w-[30%] object-contain"
            />
          </div>
        </header>

        <form onSubmit={handleLogin} className="flex flex-col gap-8 w-full">
          <section className="flex flex-col gap-6 w-full">
            <h3 className={`${Estilizacoes.segundo_titulo_principal} text-[var(--destaque)] text-[1.3rem]`}>
              Dados de acesso
            </h3>

            <div className="w-full flex flex-col gap-8">
              <div className="text-[1rem] font-medium">
                <Input
                  id="tipo-usuario-login"
                  label="Tipo de Funcionário"
                  value={tipoUsuario}
                  onChange={handleTipoUsuarioChange}
                  type="select"
                  placeholder="Selecione o tipo de funcionário"
                  erro={erroTipoUsuario}
                  options={[
                    { value: "administrator", label: "Administrador" },
                    { value: "receptionist", label: "Recepcionista" },
                    { value: "instructor", label: "Instrutor" }
                  ]}
                />
              </div>

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

          <section className="mt-2 flex flex-col gap-6">
            <Botao
              texto={isLoading ? "Acessando..." : "Acessar conta"}
              type="submit"
            />

            <a
              href="/login/aluno" 
              className="text-[var(--destaque)] text-[1rem] underline font-medium self-start"
            >
              Voltar para Login do Aluno
            </a>
          </section>
        </form>
      </main>
    </div>
  );
}