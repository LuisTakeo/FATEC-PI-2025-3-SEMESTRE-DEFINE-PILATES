import { useState } from "react";
import "../index.css"

interface BotaoProps {
    texto: string;
}

export default function BotaoInput({texto}: BotaoProps){
    
    const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]){
            setArquivoSelecionado(e.target.files[0])
            console.log(e.target.files[0])
        }
    }

    return(  
        <>
            <div className="w-full h-[50px] mb-8 cursor-poiter" >
                <label htmlFor="input"
                    className="w-full flex justify-center items-center bg-[var(--rosa-segundario)] 
                            text-[var(--background)] font-semibold text-center tracking-[1px] rounded-md whitespace-nowrap mt-5
                            h-[50px]"
                    >
                    {texto}
                </label>
                <input
                    className="hidden "
                    id="input" 
                    type="file"
                    accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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

