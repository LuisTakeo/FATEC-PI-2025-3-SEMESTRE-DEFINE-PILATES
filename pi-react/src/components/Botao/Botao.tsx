import { Link } from 'react-router-dom';

interface BotaoProps {
    texto: string;
    link?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
}


export default function Botao({texto, link, onClick, type}: BotaoProps){
    
    const estilo: string = "w-full flex justify-center items-center bg-[var(--azul-segundario)]" +
    "text-white text-[1.2rem] font-semibold text-center tracking-[1px] rounded-md whitespace-nowrap h-[50px] cursor-poiter" +
    "transition-all duration-200 hover:!bg-[var(--destaque)]"
// className="!bg-[var(--azul-segundario)] !text-white text-[1.2rem] max-sm:text-[1rem] tracking-[.2px] py-1.5 px-4 md:py-2 md:px-5 rounded-md font-semibold transition-all duration-200 hover:!bg-[var(--destaque)] max-sm:py-1 max-sm:px-3 relative z-50"


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

