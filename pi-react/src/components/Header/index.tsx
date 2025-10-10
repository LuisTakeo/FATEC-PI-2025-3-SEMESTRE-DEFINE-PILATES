import "../../index.css";
import "./stylesHeader.css"
"use client";
import Botao from "../Cadastros/Botao"
import { Link, useNavigate, useLocation } from "react-router-dom";

function Header(){

    const navigate = useNavigate();
    const location = useLocation();

    const Pagina: boolean = location.pathname !== "/Login" && location.pathname !== "/Login_Funcionario";

    return(
        <header className="text-black-600 body-font bg-transparent">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">

                <Link to="/">
                <a className="mr-7 text-[var(--foreground)] hover:text-[var(--destaque)] text-[1.3rem]">
                    Página Inicial
                </a>
                </Link>

                <Link to="/">
                <a className="mr-7 text-[var(--foreground)] hover:text-[var(--destaque)] text-[1.3rem]">
                    Calendário
                </a>
                </Link>

                <Link to="/">
                <a className="mr-7 text-[var(--foreground)] hover:text-[var(--destaque)] text-[1.3rem]">
                    Contato
                </a>
                </Link>        
                </nav>

                <a href="/" className="text-bold flex order-first lg:order-none lg:w-1/5 italiana-regular text-[var(--destaque)] lg:items-center lg:justify-center mb-4 md:mb-0">
                <span className="ml-3 text-[2rem]">Define Pilates</span>
                </a>
                <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">

                {Pagina && (
                    <div className="w-[200px]">
                        <Botao texto="Acessar conta" link="/Login" />
                    </div>
                )}

                </div>
            </div>
        </header>
        );
}

export default Header;