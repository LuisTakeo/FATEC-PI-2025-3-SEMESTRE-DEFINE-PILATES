import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewPasswordPage() {
  const navigate = useNavigate();
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [erro, setErro] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  // Flags para controlar se o usuário saiu do input
  const [touchedSenha, setTouchedSenha] = useState(false);
  const [touchedConfirmar, setTouchedConfirmar] = useState(false);

  const validarSenha = () => {
    const temMaiuscula = /[A-Z]/.test(senha);
    const temMinuscula = /[a-z]/.test(senha);
    const temNumero = /\d/.test(senha);

    if (!senha || !confirmar) {
      setErro("Preencha todos os campos.");
      return false;
    }

    if (!temMaiuscula || !temMinuscula || !temNumero) {
      setErro("A senha deve conter letras maiúsculas, minúsculas e números.");
      return false;
    }

    if (senha !== confirmar) {
      setErro("As senhas não coincidem.");
      return false;
    }

    setErro("");
    return true;
  };

  const handleSenhaChange = (value: string) => {
    setSenha(value);
    setErro("");
    setTouchedSenha(false); // remove borda vermelha enquanto digita
  };

  const handleConfirmarChange = (value: string) => {
    setConfirmar(value);
    setErro("");
    setTouchedConfirmar(false); // remove borda vermelha enquanto digita
  };

  const handleSubmit = () => {
    setTouchedSenha(true);
    setTouchedConfirmar(true);

    if (validarSenha()) {
      navigate("/user/login");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 transition-all pr-10";

  const senhaHasError = touchedSenha && (!senha || !/[A-Z]/.test(senha) || !/[a-z]/.test(senha) || !/\d/.test(senha));
  const confirmarHasError = touchedConfirmar && (confirmar !== senha || !confirmar);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)] font-inter">
      <main className="flex flex-col items-center justify-center flex-1 px-6 py-3 mt-[-80px]">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-[var(--destaque)] mb-2">
            Escreva sua nova senha
          </h2>
          <p className="mb-6">
            A senha deve ter caracteres <b>maiúsculos</b>, <b>minúsculos</b> e <b>números</b>.
          </p>

          <div className="relative mb-4">
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Nova senha"
              value={senha}
              onChange={(e) => handleSenhaChange(e.target.value)}
              onBlur={() => setTouchedSenha(true)}
              className={`${inputClass} ${
                senhaHasError ? "border-2 border-red-500 focus:ring-red-500" : "focus:ring-[var(--destaque)]"
              }`}
              style={{
                backgroundColor: "var(--input-background)",
                color: "var(--color-foreground)",
              }}
            />
            {senha && (
              <button
                type="button"
                className="absolute right-0 top-0 w-10 h-full opacity-0"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              />
            )}
          </div>

          <div className="relative mb-2">
            <input
              type={mostrarConfirmar ? "text" : "password"}
              placeholder="Escreva a nova senha novamente"
              value={confirmar}
              onChange={(e) => handleConfirmarChange(e.target.value)}
              onBlur={() => setTouchedConfirmar(true)}
              className={`${inputClass} ${
                confirmarHasError ? "border-2 border-red-500 focus:ring-red-500" : "focus:ring-[var(--destaque)]"
              }`}
              style={{
                backgroundColor: "var(--input-background)",
                color: "var(--color-foreground)",
              }}
            />
            {confirmar && (
              <button
                type="button"
                className="absolute right-0 top-0 w-10 h-full opacity-0"
                onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
              />
            )}
          </div>

          {erro && (
            <p className="text-red-500 text-sm mb-4 text-center">{erro}</p>
          )}

          <button
            onClick={handleSubmit}
            className="!bg-[var(--azul-segundario)] text-white font-inter py-3 rounded-md hover:!bg-[var(--destaque)] transition-all w-full font-semibold"
          >
            Finalizar
          </button>
        </div>
      </main>
    </div>
  );
}
