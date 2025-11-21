// Botao.tsx

import { Link } from 'react-router-dom';

interface BotaoProps {
    texto: string;
    link?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => void;
    type?: "button" | "submit" | "reset" | undefined;
    style?: string;
}

export default function Botao({texto, link, onClick, type, style}: BotaoProps){
    

    const estilo = `w-full flex justify-center items-center bg-[var(--azul-segundario)] p-5 m-0 ` +
    `text-white hover:!text-white text-[1.5rem] md:text-[1.3rem] font-semibold text-center tracking-[1px] rounded-md whitespace-nowrap h-[50px] cursor-pointer ` +
    `transition-all duration-200 hover:!bg-[var(--destaque)] ${style ?? ""}`

    if (!link){
    return(  
        <button 
            className={estilo}
            onClick={onClick}
            type={type}
        >
            {texto}
        </button>
    )
    };

    return( 
        <Link 
            className={estilo}
            onClick={onClick}
            to={link}
            type={type}
        >
            {texto}
        </Link>
    )
}