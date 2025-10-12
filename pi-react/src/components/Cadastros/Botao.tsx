import { Link } from 'react-router-dom';

interface BotaoProps {
    texto?: string;
    link?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
}


export default function Botao({texto, link, onClick, type}: BotaoProps){
    
    const estilo: string = 'w-full flex justify-center items-center bg-[var(--azul-segundario)] text-white font-semibold text-center tracking-[1px] rounded-md whitespace-nowrap mb-5 mt-5 h-[50px] cursor-pointer'

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

