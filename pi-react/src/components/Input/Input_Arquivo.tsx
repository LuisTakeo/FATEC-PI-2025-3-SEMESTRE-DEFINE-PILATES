import { useState } from "react";
import {comprimirImagem} from "../../services/comprimirImagem"
import Estilizacoes from "../../uteis/Estilizacoes";

interface BotaoProps {
    id: string;
    titulo?: string;
    label?: string;
    texto_input?: string;
    onArquivoComprimido?: (arquivo: File) => void

}

export default function Input_Arquivo({
    id,
    titulo = "",
    label = "",
    texto_input = "", 
    onArquivoComprimido,
}: BotaoProps){
    
    const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null)

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]){
            setArquivoSelecionado(e.target.files[0])            
            const arquivoOriginal = e.target.files[0];
            const arquivoComprimido = await comprimirImagem(arquivoOriginal);
            
            setArquivoSelecionado(arquivoComprimido)
            onArquivoComprimido?.(arquivoComprimido)
            
        }
    }
    

    return(  
        <>
            <div>
                <h1
                className={Estilizacoes.segundo_titulo_principal}
                >{titulo}</h1>
            </div>
            <div className="flex justify-start items-start flex-col">
                <div className="flex justify-start items-start flex-col">
                    <label className={Estilizacoes.titulo_segundario}>
                        {label}
                    </label>
                    <div className="w-full h-[50px] mb-8 cursor-poiter" >
                        <label htmlFor={id}
                            className="w-full flex justify-center items-center bg-[var(--azul-segundario)] 
                                    text-white font-semibold text-center tracking-[1px] rounded-md whitespace-nowrap mt-5
                                    h-[50px]"
                            >
                            {texto_input}
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
                </div>
            </div>
        </>  
        
    )
    
}

