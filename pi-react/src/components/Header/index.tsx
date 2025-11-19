import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../index.css";
"use client";
import Botao from "../Botao/Botao";
import React, { useState } from 'react';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // MOCK DE ESTADO DE LOGIN
  const [isLoggedIn, setIsLoggedIn] = useState(true); 

  const currentPath = location.pathname.toLowerCase().replace(/\/$/, "");

  // 1. ROTAS ONDE O BOTÃO DEVE SER OCULTADO
  const hideButtonPaths = [
    "/login/aluno",
    "/login/funcionario",
  ];

  // 2. ROTAS ONDE DEVE APARECER "SAIR DA CONTA"
  const logoutButtonPaths = [
    // Rotas de Cadastro/Admin/Home/Pesquisa (existentes)
    "/cadastro/aluno",
    "/cadastro/instrutor",
    "/cadastro/administrador/recepcionista",
    "/login/instrutor",
    "/admin/home",
    "/aluno/home",
    "/cadastro/adm-recep",
    "/home/funcionario",
    "/admin/pesquisa-usuarios",
    // ✅ NOVAS ROTAS ADICIONADAS:
    "/calendario/aluno",
    "/calendario/funcionario",
  ];

  // Verificações
  const shouldHideCompletely = hideButtonPaths.includes(currentPath);
  const shouldShowLogout = logoutButtonPaths.includes(currentPath);

  const handleLogout = () => {
    // Lógica real de logout aqui
    setIsLoggedIn(false); 
    navigate("/"); 
  };
  
  // Lógica de renderização
  let buttonOrPlaceholder;

  if (shouldHideCompletely) {
    // 1. Ocultar totalmente o botão nas rotas de login específicas
    buttonOrPlaceholder = (
      <div 
        className="hidden w-full h-full"
      >
        &nbsp; 
      </div>
    );
  } else if (shouldShowLogout) {
    // 2. Mostrar "Sair da conta" nas rotas restritas restantes
    buttonOrPlaceholder = (
      <Botao 
        texto="Sair da conta" 
        onClick={handleLogout}
        // ✅ CORREÇÃO FINAL: Usando var(--azul-segundario) para a cor base.
        style="!bg-[var(--azul-segundario)] hover:!bg-red-600 !text-white !p-2" 
      />
    );
  } else {
    // 3. Mostrar "Acessar conta" nas demais rotas (públicas)
    buttonOrPlaceholder = (
      <Botao 
        texto="Acessar conta" 
        onClick={() => navigate("/login/aluno")}
      />
    );
  }

  return(
    <header className={`text-black-600 body-font bg-[var(--background] ${window.location.href === 'http://localhost:5173/' ? "" : "py-[3%]"}`}>
      <div className="container mx-auto flex items-center justify-between flex-wrap flex-col md:flex-row">

        <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
          <Link to="/" className="mr-7 text-[var(--foreground)] hover:text-[var(--destaque)] text-[1.8rem] md:text-[1.8rem] lg:text-[1.3rem] ">
            Planos
          </Link>

          <Link to="/" className="mr-7 text-[var(--foreground)] hover:text-[var(--destaque)] text-[1.8rem] md:text-[1.8rem] lg:text-[1.3rem] ">
            Calendário
          </Link>

          <Link to="/" className="mr-7 text-[var(--foreground)] hover:text-[var(--destaque)] text-[1.8rem] md:text-[1.8rem] lg:text-[1.3rem] ">
            Saiba Mais
          </Link>      
        </nav>

        <a href="/" className=" flex order-first lg:order-none lg:w-1/5 lg:items-center lg:justify-center mb-4 md:mb-0">
          <span className="text-[2rem] kaisei-tokumin-regular font-bold text-[var(--destaque)] tracking-[-0.1px] ">
            Defıne Pilates
            <span className="font-extrabold text-[3rem]">.</span>
          </span>
        </a>
        <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
          
          <div className="w-[200px] my-8">
            {buttonOrPlaceholder}
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;