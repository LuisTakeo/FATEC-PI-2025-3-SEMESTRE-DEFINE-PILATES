import { useNavigate } from "react-router-dom";

export default function CadastroInicialPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)] font-inter">
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex flex-col gap-2 w-[140px]" />
      </header>

      <main className="flex flex-col items-center px-6 pt-24 pb-8 bg-[var(--color-background)]">
        <div className="w-full max-w-sm flex flex-col">
          <h2 className="text-2xl text-[var(--destaque)] font-bold font-inter mb-8 text-center">
            Cadastro
          </h2>

          <div className="flex flex-col gap-6 w-full">
            <button
              className="!bg-[var(--destaque)] text-white font-inter py-4 rounded-md text-lg font-semibold !border-2 !border-[var(--destaque)] hover:!bg-[var(--azul-segundario)] hover:!border-[var(--azul-segundario)] transition-colors duration-200"
              onClick={() => navigate("/cadastro/aluno")}
            >
              Aluno
            </button>

            <button
              className="!bg-[var(--destaque)] text-white font-inter py-4 rounded-md text-lg font-semibold !border-2 !border-[var(--destaque)] hover:!bg-[var(--azul-segundario)] hover:!border-[var(--azul-segundario)] transition-colors duration-200"
              onClick={() => navigate("/cadastro/instrutor")}
            >
              Instrutor
            </button>

            <button
              className="!bg-[var(--destaque)] text-white font-inter py-4 rounded-md text-lg font-semibold !border-2 !border-[var(--destaque)] hover:!bg-[var(--azul-segundario)] hover:!border-[var(--azul-segundario)] transition-colors duration-200"
              onClick={() => navigate("/cadastro/recepcionista")}
            >
              Recepcionista | Administrador
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
