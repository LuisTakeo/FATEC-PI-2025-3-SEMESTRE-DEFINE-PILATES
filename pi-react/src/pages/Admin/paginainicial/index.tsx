import { useNavigate } from "react-router-dom";

export default function CadastroInicialPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[var(--color-background)] text-[var(--color-foreground)] font-inter flex flex-col items-center justify-start">
      
      <main className="w-full max-w-5xl mx-auto px-6 py-15">
        
        <div className="w-full max-w-lg mx-auto flex flex-col items-center">
          
          <h2 className="text-3xl text-[var(--destaque)] font-bold font-inter mb-6 text-center">
            Cadastro
          </h2>

          <div className="flex flex-col gap-8 w-full">
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
              onClick={() => navigate("/cadastro/adm-recep")}
            >
              Recepcionista | Administrador
            </button>
          </div>
        
          <a
            href="/" 
            className="text-[var(--destaque)] text-[1rem] underline font-medium mt-6 text-center"
          >
            Voltar
          </a>
        </div>
      </main>
    </div>
  );
}