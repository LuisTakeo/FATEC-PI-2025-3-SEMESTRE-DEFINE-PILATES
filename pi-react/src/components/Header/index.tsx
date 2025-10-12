import "../../index.css";
import "./stylesHeader.css"
"use client";
import Botao from "../Cadastros/Botao"
import { Link, useNavigate, useLocation } from "react-router-dom";

function Header(){

    const location = useLocation();

    const Pagina: boolean = location.pathname !== "/login/aluno" && location.pathname !== "/login/funcionario";

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

                <a href="/" className=" flex order-first lg:order-none lg:w-1/5  lg:items-center lg:justify-center mb-4 md:mb-0">
                    <span className="ml-3 text-[2.2rem] kaisei-tokumin-regular font-bold text-[var(--destaque)] tracking-[-0.1px] ">
                        Defıne Pilates
                        <span className="font-extrabold text-[3rem]">.</span>
                    </span>
                </a>
                <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">

                {Pagina && (
                    <div className="w-[200px]">
                        <Botao texto="Acessar conta" link="/login/aluno" />
                    </div>
                )}

                </div>
            </div>
        </header>
        );
}

export default Header;