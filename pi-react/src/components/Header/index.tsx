import "../../index.css";
import "./stylesHeader.css";
"use client";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="text-black-600 body-font bg-transparent">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        {/* Navegação */}
        <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
          <Link to="/">
            <span className="mr-7 text-[var(--foreground)] hover:text-[var(--destaque)] text-[1.3rem] cursor-pointer">
              Página Inicial
            </span>
          </Link>

          <Link to="/">
            <span className="mr-7 text-[var(--foreground)] hover:text-[var(--destaque)] text-[1.3rem] cursor-pointer">
              Calendário
            </span>
          </Link>

          <Link to="/">
            <span className="mr-7 text-[var(--foreground)] hover:text-[var(--destaque)] text-[1.3rem] cursor-pointer">
              Contato
            </span>
          </Link>
        </nav>

        {/* Logo */}
        <span className="text-bold flex order-first lg:order-none lg:w-1/5 italiana-regular text-[var(--destaque)] lg:items-center lg:justify-center mb-4 md:mb-0">
          <span className="ml-3 text-[2rem]">Define Pilates</span>
        </span>

        {/* Botão de acesso */}
        <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
          <button
            className="text-white text-[1.2rem] tracking-[.2px] inline-flex items-center py-2 px-5 rounded-md font-semibold transition-all duration-200
                       !bg-[var(--azul-segundario)] hover:!bg-[var(--destaque)]"
            onClick={() => navigate("/login")}
          >
            Acessar Conta
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
