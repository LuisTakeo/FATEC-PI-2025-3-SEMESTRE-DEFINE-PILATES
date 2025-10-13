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

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)] font-inter">
      <main className="flex flex-col items-center justify-center flex-1 px-6 py-3">
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
            className={`w-full bg-[var(--input-background)] px-4 py-3 rounded-md mb-2 focus:outline-none focus:ring-2 transition-all ${
              erro ? "border-2 border-red-500 focus:ring-red-500" : "focus:ring-[var(--destaque)]"
            }`}
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
