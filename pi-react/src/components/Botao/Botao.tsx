// Botao.tsx

import { Link } from 'react-router-dom';

interface BotaoProps {
    texto: string;
    link?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
}

export default function Botao({texto, link, onClick, type}: BotaoProps){
    
    // O ajuste é AQUI: adicionamos hover:!text-white
    const estilo: string = "w-full flex justify-center items-center bg-[var(--azul-segundario)] p-5 " +
    "text-white hover:!text-white text-[1.2rem] font-semibold text-center tracking-[1px] rounded-md whitespace-nowrap h-[50px] cursor-pointer " +
    "transition-all duration-200 hover:!bg-[var(--destaque)]"

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