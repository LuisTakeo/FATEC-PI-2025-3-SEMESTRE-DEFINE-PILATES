import { useState } from "react";
import "../index.css"
import {comprimirImagem} from "../services/comprimirImagem"

interface BotaoProps {
    texto: string;
    id: string;
}

export default function BotaoInput({texto, id}: BotaoProps){
    
    const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null)

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]){
            setArquivoSelecionado(e.target.files[0])
            console.log(e.target.files[0])
            
            const arquivoOriginal = e.target.files[0];
            const arquivoComprimido = await comprimirImagem(arquivoOriginal);
            
            console.log("Arquivo original:", arquivoOriginal.size);
            console.log("Arquivo comprimido:", arquivoComprimido.size);
        }
    }

    return(  
        <>
            <div className="w-full h-[50px] mb-8 cursor-poiter" >
                <label htmlFor={id}
                    className="w-full flex justify-center items-center bg-[var(--azul-segundario)] 
                            text-[var(--background)] font-semibold text-center tracking-[1px] rounded-md whitespace-nowrap mt-5
                            h-[50px]"
                    >
                    {texto}
                </label>
                <input
                    className="hidden "
                    id={id} 
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                />
            </div>
            {arquivoSelecionado && (
                <h1>
                    Arquivo <span className="font-bold">{arquivoSelecionado.name}</span> selecionado com sucesso
                </h1>
            )}
        </>   
    )
}

