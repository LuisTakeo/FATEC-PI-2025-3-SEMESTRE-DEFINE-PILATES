import { Link } from 'react-router-dom';
import "../index.css"

interface BotaoProps {
    texto: string;
    link: string;
}

// <button className="text-[1.2rem] tracking-[.2px] inline-flex items-center border-0 py-1 px-3 rounded text-[var(--background)] text-base mt-4 md:mt-0 bg-[var(--azul-segundario)] hover:bg-[var(--destaque)]"


export default function Botao({texto, link}: BotaoProps){ 
    return(  
        <Link 
            className='w-full flex justify-center items-center bg-[var(--azul-segundario)] 
            text-[var(--background)] font-semibold text-center tracking-[1px] rounded-md whitespace-nowrap mb-5 mt-5
            h-[50px] cursor-poiter
            '
            
            to={link}
        >
            {texto}
        </Link>
    )
}

