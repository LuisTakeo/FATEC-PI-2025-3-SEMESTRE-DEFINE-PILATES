import "../../index.css";
import "./stylesHeader.css";
"use client";
import { Link, useNavigate, useLocation } from "react-router-dom"; // <-- adicionei useLocation

function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // pega a rota atual
  const isLoginPage = location.pathname === "/user/login";

  return (
    <header className="bg-transparent body-font text-[var(--foreground)]">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-between p-5">

        {/* Logo */}
        <div className="order-1 md:order-2 w-full md:w-auto flex justify-center mb-4 md:mb-0">
          <span className="text-[2rem] italiana-regular font-bold text-[var(--destaque)]">
            Define Pilates
          </span>
        </div>

        {/* Navegação */}
        <nav className="order-2 md:order-1 w-full md:w-2/5 flex flex-col md:flex-row items-center md:items-center text-base mb-4 md:mb-0 gap-2 md:gap-8">
          <Link to="/"><span className="text-[0.9rem] md:text-[1.3rem] cursor-pointer hover:text-[var(--destaque)]">Página Inicial</span></Link>
          <Link to="/"><span className="text-[0.9rem] md:text-[1.3rem] cursor-pointer hover:text-[var(--destaque)]">Calendário</span></Link>
          <Link to="/"><span className="text-[0.9rem] md:text-[1.3rem] cursor-pointer hover:text-[var(--destaque)]">Contato</span></Link>
        </nav>

        {/* Botão de acesso */}
        {!isLoginPage && ( // <-- só aparece se NÃO estiver na página login
          <div className="order-3 w-full md:order-3 md:w-2/5 flex justify-center md:justify-end">
            <button
              className="!bg-[var(--azul-segundario)] !text-white text-[1rem] md:text-[1.2rem] tracking-[.2px] py-1.5 px-4 md:py-2 md:px-5 rounded-md font-semibold transition-all duration-200
                         hover:!bg-[var(--destaque)]"
              onClick={() => navigate("/login")}
            >
              Acessar Conta
            </button>
          </div>
        )}

      </div>
    </header>
  );
}

export default Header;
