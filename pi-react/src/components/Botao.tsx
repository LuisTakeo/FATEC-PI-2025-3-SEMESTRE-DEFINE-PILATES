import { Link } from "react-router-dom";

interface BotaoProps {
    texto: string;
    link?: string;  
    onClick?: () => void;
    type?: "button" | "submit" | "reset"; 
}

export default function Botao({ texto, link, onClick, type = "button" }: BotaoProps) {
    const classesBase = `
        w-full flex justify-center items-center bg-azul-important
        text-[var(--background)] font-semibold text-center tracking-[1px]
        rounded-md mb-5 mt-5 h-[50px] hover:bg-[var(--destaque)]
    `;

    if (link) {
        return (
            <Link to={link} className={classesBase}>
                {texto}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} className={classesBase}>
            {texto}
        </button>
    );
}