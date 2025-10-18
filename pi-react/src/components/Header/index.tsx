import "../../index.css";
import "./stylesHeader.css";
"use client";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname.toLowerCase().replace(/\/$/, "");

  const hidePaths = [
    "/cadastro/aluno",
    "/cadastro/instrutor",
    "/cadastro/administrador/recepcionista",
    "/login/aluno",
    "/login/instrutor",
    "/admin/home",
  ];
  
  const shouldHideButton = hidePaths.includes(currentPath);

  return (
    <header className="bg-transparent body-font text-[var(--foreground)]">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-between p-5">

        <nav className="order-2 md:order-1 w-full md:w-auto flex flex-col md:flex-row items-center md:items-center text-base mb-4 md:mb-0 gap-2 md:gap-8">
          <Link
            to="/"
            className="text-[var(--foreground)] hover:text-[var(--destaque)] text-[1.3rem] max-sm:text-[1rem] cursor-pointer transition-colors relative z-50"
          >
            Página Inicial
          </Link>
          <Link
            to="/"
            className="text-[var(--foreground)] hover:text-[var(--destaque)] text-[1.3rem] max-sm:text-[1rem] cursor-pointer transition-colors relative z-50"
          >
            Calendário
          </Link>
          <Link
            to="/"
            className="text-[var(--foreground)] hover:text-[var(--destaque)] text-[1.3rem] max-sm:text-[1rem] cursor-pointer transition-colors relative z-50"
          >
            Contato
          </Link>
        </nav>

        <div className="order-1 md:order-2 w-full md:w-auto flex justify-center mb-4 md:mb-0">
          <span className="flex items-baseline gap-1 whitespace-nowrap text-[2.2rem] max-sm:text-[1.8rem] kaisei-tokumin-regular font-bold text-[var(--destaque)] tracking-[-0.1px] transition-all duration-300">
            Defıne Pilates
           <span className="font-extrabold text-[3rem] max-sm:text-[2.4rem] leading-none">.</span>
          </span>
        </div>

        {/* BOTÃO ACESSAR CONTA (DIREITA em telas maiores) */}
        {!shouldHideButton && (
          <div className="order-3 w-full md:order-3 md:w-auto flex justify-center md:justify-end">
            <button
              className="!bg-[var(--azul-segundario)] !text-white text-[1.2rem] max-sm:text-[1rem] tracking-[.2px] py-1.5 px-4 md:py-2 md:px-5 rounded-md font-semibold transition-all duration-200 hover:!bg-[var(--destaque)] max-sm:py-1 max-sm:px-3 relative z-50"
              onClick={() => navigate("/login/aluno")}
            >
              Acessar conta
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;