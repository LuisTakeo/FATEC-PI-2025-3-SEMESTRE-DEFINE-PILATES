// Header.js - VERSÃO FINAL (Mobile First)
import "../../index.css";
import "./stylesHeader.css";
"use client";
import Botao from "../Cadastros/Botao";
import { Link, useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();

    const paginasSemBotao = [
        "/login/aluno",
        "/login/funcionario",
        "/cadastro/aluno",
        "/cadastro/instrutor",
        "/cadastro/administrador"
    ];

    const permissao: boolean = !paginasSemBotao.includes(location.pathname);

    return (
        <header className="text-black-600 body-font bg-[var(--background)]"> 
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                
                <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                    
                    
                    <Link
                        to="/"
                        className="mr-3 md:mr-7 text-[var(--foreground)] hover:text-[var(--destaque)] text-lg md:text-[1.3rem]"
                    >
                        Página Inicial
                    </Link>

                    <Link
                        to="/"
                        className="mr-3 md:mr-7 text-[var(--foreground)] hover:text-[var(--destaque)] text-lg md:text-[1.3rem]"
                    >
                        Calendário
                    </Link>

                    <Link
                        to="/"
                        className="mr-3 md:mr-7 text-[var(--foreground)] hover:text-[var(--destaque)] text-lg md:text-[1.3rem]"
                    >
                        Contato
                    </Link>
                </nav>

                <Link
                    to="/"
                    className="flex order-first lg:order-none lg:w-1/5 lg:items-center lg:justify-center mb-4 md:mb-0"
                >
                    <span className="ml-3 text-[2.2rem] kaisei-tokumin-regular font-bold text-[var(--destaque)] tracking-[-0.1px]">
                        Defıne Pilates
                        <span className="font-extrabold text-[3rem]">.</span>
                    </span>
                </Link>

                <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                    {permissao && (
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