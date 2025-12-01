import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../index.css";
"use client";
import Botao from "../Botao/Botao";
import React, { useEffect } from 'react';

interface NavLink {
    name: string;
    path: string;
}

const getAuthStatus = () => {
    if (typeof window === "undefined") {
        return { isLoggedIn: false, userType: 'nao-logado' };
    }
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userType = localStorage.getItem("userType") || 'nao-logado';
    return { isLoggedIn: loggedIn, userType: userType };
};

const navLinks: { [key: string]: NavLink[] } = {
    // Links centrais e finais para USUÁRIO DESLOGADO
    'public_middle_end': [
        { name: "Contato", path: "https://api.whatsapp.com/send/?phone=5511941424166&text&type=phone_number&app_absent=0&utm_source=ig" },
        { name: "Saiba Mais", path: "https://business.google.com/v/define-pilates/012366385222516970590/b9c1/_?" },
    ],
    // Links centrais e finais para ALUNO LOGADO
    'Student_middle_end': [ 
        { name: "Calendário", path: "/calendario/aluno" },
        { name: "Saiba Mais", path: "https://business.google.com/v/define-pilates/012366385222516970590/b9c1/_?" },
    ],
    // Links para ADMINISTRADOR (Pesquisa)
    'Administrator_middle_end': [ 
        { name: "Pesquisa", path: "/admin/pesquisa-usuarios" }, 
        { name: "Saiba Mais", path: "https://business.google.com/v/define-pilates/012366385222516970590/b9c1/_?" },
    ],
    // Links para RECEPCIONISTA (Agenda)
    'Receptionist_middle_end': [ 
        { name: "Agenda", path: "/calendario/funcionario" }, 
        { name: "Saiba Mais", path: "https://business.google.com/v/define-pilates/012366385222516970590/b9c1/_?" },
    ],
    // Links para INSTRUTOR (Apenas Saiba Mais)
    'Instructor_middle_end': [ 
        { name: "Saiba Mais", path: "https://business.google.com/v/define-pilates/012366385222516970590/b9c1/_?" },
    ],
};

const getProfileHomePath = (type: string) => {
    switch (type) {
        case 'Student': return "/aluno/home";
        case 'Administrator':
        case 'Receptionist':
        case 'Instructor': return "/home/funcionario";
        default: return "/";
    }
};


function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoggedIn, userType } = getAuthStatus(); 

    useEffect(() => {
        if (location.state && location.state.loginSuccess) {
            navigate(location.pathname, { replace: true, state: {} }); 
        }
    }, [location, navigate]);

    const currentPath = location.pathname.toLowerCase().replace(/\/$/, "");
    const hideButtonPaths = ["/login/aluno", "/login/funcionario"];
    const shouldHideCompletely = hideButtonPaths.includes(currentPath);
    const shouldShowLogout = isLoggedIn && !shouldHideCompletely; 
    
    // Função de Logout Refinada
    const handleLogout = () => {
        if (typeof window !== "undefined") {
            // 1. Limpa o localStorage
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userType");
            localStorage.removeItem("Define-Pilates-AuthToken");
            localStorage.removeItem("Define-Pilates-UserInfo");
        }
        
        // 2. Navega para a Home
        navigate("/", { replace: true }); 

        // 3. Força o recarregamento APENAS se o usuário estiver na Home (/)
        const currentPathNormalized = location.pathname.toLowerCase().replace(/\/$/, "");
        const currentPathIsHome = currentPathNormalized === "/";
        
        if (currentPathIsHome && typeof window !== "undefined") {
            window.location.reload(); 
        }
    };
    
    let buttonOrPlaceholder;
    if (shouldHideCompletely) { 
        buttonOrPlaceholder = (<div className="hidden w-full h-full">&nbsp;</div>); 
    } else if (shouldShowLogout) { 
        buttonOrPlaceholder = (<Botao texto="Sair da conta" onClick={handleLogout} style="!bg-[var(--azul-segundario)] hover:!bg-red-600 !text-white !p-2" />); 
    } else {
        buttonOrPlaceholder = (<Botao texto="Acessar conta" onClick={() => navigate("/login/aluno")} />);
    }

    const userHomePath = getProfileHomePath(userType);
    const userHomePathNormalized = userHomePath.toLowerCase().replace(/\/$/, "");
    const isOnHomePage = currentPath === userHomePathNormalized;
    
    let firstLink: NavLink;

    if (isLoggedIn) {
        if (isOnHomePage) {
            firstLink = { name: "Planos", path: "/" };
        } else {
            firstLink = { name: "Minha Página", path: userHomePath };
        }
    } else {
        firstLink = { name: "Planos", path: "/" };
    }

    let middleEndLinks: NavLink[];
    if (isLoggedIn) {
        if (userType === 'Student') { 
            middleEndLinks = navLinks['Student_middle_end'];
        } else if (userType === 'Administrator') { 
            middleEndLinks = navLinks['Administrator_middle_end'];
        } else if (userType === 'Receptionist') { 
            middleEndLinks = navLinks['Receptionist_middle_end'];
        } else if (userType === 'Instructor') { 
            middleEndLinks = navLinks['Instructor_middle_end'];
        } else {
            middleEndLinks = navLinks['public_middle_end'];
        }
    } else {
        middleEndLinks = navLinks['public_middle_end'];
    }

    const activeLinks: NavLink[] = [firstLink, ...middleEndLinks];


    return(
        <header className={`text-black-600 body-font bg-[var(--background] py-6`}> 
            {/* CONTAINER PRINCIPAL: flex-col (mobile) | lg:flex-row (desktop, alinhado) */}
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-start lg:justify-between">
                
                {/* 1. LOGO: order-1 (topo) e centralizado em mobile. lg:w-1/5. */}
                <span 
                    className="flex order-1 lg:order-none lg:w-1/5 items-center justify-center w-full mb-4 cursor-default" 
                >
                    <span className="text-[2rem] kaisei-tokumin-regular font-bold text-[var(--destaque)] tracking-[-0.1px] ">
                        Defıne Pilates
                        <span className="font-extrabold text-[3rem]">.</span>
                    </span>
                </span>
                
                {/* 2. LINKS DE NAVEGAÇÃO: order-2 (meio) em mobile. lg:w-2/5. */}
                <nav className="flex flex-nowrap overflow-x-auto lg:w-2/5 items-center text-base order-2 lg:order-first w-full justify-center lg:justify-start">
                    {/* Adicionado justify-center: Centraliza os links no mobile, mantendo a rolagem. */}
                    {activeLinks.map((link) => (
                        link.path.startsWith('http') ? (
                            <a 
                                key={link.path} 
                                href={link.path} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="mr-7 text-[var(--foreground)] hover:text-[var(--destaque)] text-[1.8rem] md:text-[1.8rem] lg:text-[1.3rem] inline-block whitespace-nowrap" 
                            >
                                {link.name}
                            </a>
                        ) : (
                            <Link 
                                key={link.path} 
                                to={link.path} 
                                className="mr-7 text-[var(--foreground)] hover:text-[var(--destaque)] text-[1.8rem] md:text-[1.8rem] lg:text-[1.3rem] inline-block whitespace-nowrap" 
                            >
                                {link.name}
                            </Link>
                        )
                    ))}
                </nav>

                {/* 3. BOTÃO (Sair/Acessar): order-3 (baixo) e centralizado em mobile. lg:w-2/5. */}
                <div className="order-3 lg:order-none lg:w-2/5 flex justify-center lg:justify-end mt-4 lg:mt-0">
                    {/* O justify-center é a chave para centralizar o botão em mobile. */}
                    <div className="w-[200px]"> 
                        {buttonOrPlaceholder}
                    </div>

                </div>
            </div>
        </header>
    );
}

export default Header;