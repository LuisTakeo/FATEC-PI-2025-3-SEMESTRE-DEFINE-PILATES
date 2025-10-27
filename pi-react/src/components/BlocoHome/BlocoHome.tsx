
import Botao from "./../Botao/Botao"

interface BlocoHomeProps {
    texto: string;
    link: string;
}

export default function BlocoHome({
    texto, link = ""
}: BlocoHomeProps){
    return(
        <div className="bg-white min-w-full min-h-[300px] rounded-2xl shadow-md
        flex flex-col justify-between items-start p-10 ">
            <h1
            className="text-[2rem] font-semibold text-[var(--destaque)] 
            md:text-[2.3rem] w-full py-5"
            >{texto}</h1>
            <Botao texto="Acessar" link={link}/>
        </div>

    )
}