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

   
    const buttonOrPlaceholder = shouldHideButton ? (
        <div 
             className="invisible max-sm:hidden !bg-[var(--azul-segundario)] !text-white text-[1.2rem] max-sm:text-[1rem] tracking-[.2px] py-1.5 px-4 md:py-2 md:px-5 rounded-md font-semibold relative z-50"
          >
             &nbsp; 
        </div>
    ) : (
        <button
          className="!bg-[var(--azul-segundario)] !text-white text-[1.2rem] max-sm:text-[1rem] tracking-[.2px] py-1.5 px-4 md:py-2 md:px-5 rounded-md font-semibold transition-all duration-200 hover:!bg-[var(--destaque)] max-sm:py-1 max-sm:px-3 relative z-50"
          onClick={() => navigate("/login/aluno")}
        >
          Acessar conta
        </button>
    );

    return (
    <header className="bg-transparent body-font text-[var(--foreground)]">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 items-center p-5"> 

        <nav className="w-full flex justify-center md:justify-start text-base mb-4 md:mb-0 gap-2 md:gap-8 order-2 md:order-1 col-span-1">
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

        <div className="w-full flex justify-center mb-4 md:mb-0 order-1 md:order-2 col-span-1">
            <span className="flex items-baseline gap-1 whitespace-nowrap text-[2.2rem] max-sm:text-[1.8rem] kaisei-tokumin-regular font-bold text-[var(--destaque)] tracking-[-0.1px] transition-all duration-300">
                Defıne Pilates
                <span className="font-extrabold text-[3rem] max-sm:text-[2.4rem] leading-none">.</span>
                </span>
                </div>

        <div className="w-full flex justify-center md:justify-end order-3 md:order-3 col-span-1">
            {buttonOrPlaceholder}
            </div>
            </div>
            </header>
            );
}

export default Header;