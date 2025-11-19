// components/BlocoHome/BlocoHome.jsx

import Botao from "./../Botao/Botao"

interface BlocoHomeProps {
    texto: string;
    // 🎯 NOVO PROP: Subtexto opcional
    subtexto?: string; 
    link: string;
}

export default function BlocoHome({
    texto, subtexto, link = ""
}: BlocoHomeProps){
    return(
        // Card de 200px de altura
        <div className="bg-white h-[200px] rounded-lg shadow-lg
        flex flex-col justify-between overflow-hidden">
            
            {/* Contêiner de Texto (Título e Subtítulo) */}
            <div className="p-6 flex-grow flex flex-col items-start"> 
                {/* Título: Usa a cor de destaque */}
                <h1
                className="text-2xl font-bold text-[var(--destaque)] 
                md:text-2xl w-full"
                >
                    {texto}
                </h1>
                
                {/* 🎯 SUBTEXTO: Novo campo exibido em cinza e menor */}
                {subtexto && (
                    <p className="text-sm text-gray-500 mt-1">
                        {subtexto}
                    </p>
                )}
            </div>
            
            {/* Contêiner do Botão */}
            <div className="w-full p-4 flex justify-center">
                <Botao 
                    texto="Acessar" 
                    link={link}
                />
            </div>
        </div>
    )
}