import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  // Função para formatar o telefone no padrão brasileiro
  const formatPhone = (value: string): string => {
    let digits = value.replace(/\D/g, "").slice(0, 11); // até 11 dígitos
    digits = digits.replace(/^(\d{2})(\d)/, "($1) $2");
    digits = digits.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
    return digits;
  };

  const handleLogin = () => {
    // Validação simulada
    if (telefone !== "(12) 34567-8901" || senha !== "1234") {
      setError("Telefone ou senha incorretos");
    } else {
      setError("");
      navigate("/cadastro"); // página de destino
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)] font-inter">
      <main className="flex flex-col items-center px-6 py-4">
        <div className="flex w-full max-w-sm justify-between items-end mb-6">
          <h2 className="text-2xl text-[var(--destaque)] font-bold leading-tight">
            Entre <br /> na sua conta
          </h2>
          <img
            src="/pilates.png"
            alt="Pilates Illustration"
            className="w-32 h-32 object-contain -mt-4"
          />
        </div>

        <div className="w-full max-w-sm flex flex-col gap-4">
          <p className="text-[var(--destaque)] text-lg font-semibold">Acessar</p>

          <div className="flex flex-col gap-3">
            {/* Campo telefone com máscara */}
            <label className="text-sm">Escreva seu telefone</label>
            <input
              type="tel"
              placeholder="(99) 99999-9999"
              maxLength={15}
              value={telefone}
              onChange={(e) => setTelefone(formatPhone(e.target.value))}
              className="bg-[var(--input-background)] px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--destaque)]"
            />

            <label className="text-sm">Escreva sua senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="bg-[var(--input-background)] px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[var(--destaque)] pr-10"
              />

              {/* Olhinho aparece apenas quando há algo digitado */}
              {senha && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                ></button>
              )}
            </div>

            <a
              href="#"
              className="text-[var(--destaque)] text-sm underline hover:opacity-90"
            >
              Esqueci a minha senha
            </a>

            {/* Mensagem de erro */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <Button onClick={handleLogin}>Entrar</Button>
        </div>
      </main>
    </div>
  );
}
