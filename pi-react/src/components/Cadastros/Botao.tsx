import { Link } from 'react-router-dom';

interface BotaoProps {
    texto: string;
    link?: string;
    onClick?: () => void;
}


export default function Botao({texto, link, onClick}: BotaoProps){
    
    const estilo: string = 'w-full flex justify-center items-center bg-[var(--azul-segundario)] text-[var(--background)] font-semibold text-center tracking-[1px] rounded-md whitespace-nowrap mb-5 mt-5 h-[50px] cursor-poiter'

    if (!link){
    return(  
        <button 
            className={estilo}
            onClick={onClick}
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
        >
            {texto}
        </Link>
    )
}

