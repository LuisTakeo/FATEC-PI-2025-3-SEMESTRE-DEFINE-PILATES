import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecoveryCodePage() {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState<string>("");
  const [erro, setErro] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setCodigo(value);
    if (erro) setErro("");
  };

  const handleSubmit = () => {
    if (codigo.length !== 6) {
      setErro("Código incorreto, digite novamente");
      return;
    }
    navigate("/recupera-senha/nova-senha");
  };

  const getInputClass = () => {
    const isErro = erro !== "";
    return `
      w-full px-4 py-3 rounded-md mb-1 
      border ${isErro ? "border-red-500" : "border-gray-300"} 
      bg-[var(--input-background)] text-[var(--color-foreground)] 
      focus:outline-none 
      ${!isErro ? "focus:ring-1 focus:ring-[var(--destaque)]" : ""} 
      transition-all
    `;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)] font-inter">
      <main className="flex flex-col items-center justify-center flex-1 px-6 py-3 mt-[-80px]">
        <div className="w-full max-w-sm flex flex-col">
          <h2 className="text-2xl font-bold text-[var(--destaque)] mb-2 text-left">
            Digite o código
          </h2>
          <p className="text-[var(--color-foreground)] mb-6 text-left">
            Escreva abaixo o código que você recebeu por SMS no seu número de telefone
          </p>

          <label className="font-inter text-[var(--color-foreground)] text-sm mb-2 text-left">
            Código recebido
          </label>
          <input
            type="text"
            placeholder="Digite o código"
            value={codigo}
            onChange={handleChange}
            className={getInputClass()}
          />

          {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}

          <button
            onClick={handleSubmit}
            className="!bg-[var(--azul-segundario)] text-white font-inter py-3 rounded-md hover:!bg-[var(--destaque)] transition-all w-full font-semibold"
          >
            Criar nova senha
          </button>

          <p className="text-sm text-[var(--color-foreground)] mt-6 text-left">
            <span className="text-[var(--destaque)] font-semibold">
              Não recebeu seu código?
            </span>
            <br />
            Retorne à tela anterior, reescreva seu número de telefone e clique em solicitar
            código novamente em{" "}
            <span className="text-[var(--destaque)] font-semibold">
              30 segundos
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}
