import { useState } from "react";
import {comprimirImagem} from "../../services/cadastro/comprimirImagem"
import Estilizacoes from "../../uteis/Estilizacoes";

// 1. AJUSTE: A interface agora aceita string (Base64)
interface BotaoProps {
    id: string;
    titulo?: string;
    label?: string;
    texto_input?: string;
    onArquivoComprimido?: (arquivo: string) => void // ⬅️ DEVE SER STRING (Base64)
}

export default function Input_Arquivo({
    id,
    titulo = "",
    label = "",
    texto_input = "", 
    onArquivoComprimido,
}: BotaoProps){
    
    // 2. AJUSTE: O estado agora armazena string (Base64)
    const [arquivoSelecionado, setArquivoSelecionado] = useState<string | null>(null)
    
    // NOVO ESTADO: Para exibir o nome original na mensagem de sucesso
    const [fileName, setFileName] = useState<string | null>(null);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]){
            
            const arquivoOriginal = e.target.files[0];
            
            // 3. AJUSTE: Armazena o nome original
            setFileName(arquivoOriginal.name); 

            // Assumindo que comprimirImagem retorna uma STRING Base64
            const arquivoComprimido: string = await comprimirImagem(arquivoOriginal) as string;
            
            // setArquivoSelecionado recebe a string Base64, resolvendo o ts(2345)
            setArquivoSelecionado(arquivoComprimido)
            onArquivoComprimido?.(arquivoComprimido)
            
        } else {
            // Limpa estados se o arquivo for deselecionado
            setFileName(null);
            setArquivoSelecionado(null);
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
                        {/* ESTILO PADRONIZADO PARA O BOTÃO PRINCIPAL */}
                        <label htmlFor={id}
                            className="
                                px-6 py-3 
                                rounded-[5px] 
                                text-[1.3rem] font-bold text-white cursor-pointer 
                                bg-[var(--destaque)] 
                                hover:bg-[var(--azul-segundario)] 
                                transition duration-300
                                mt-5
                                inline-block 
                            "
                            >
                            {texto_input}
                        </label>
                        {/* FIM DO ESTILO */}
                        <input
                            className="hidden "
                            id={id} 
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                        />
                    </div>
                    {/* MENSAGEM DE SUCESSO COM NOME DO ARQUIVO */}
                    {arquivoSelecionado && fileName && (
                        <h1 className="text-green-600 font-semibold text-[1.2rem]">
                            Arquivo <span className="font-bold">{fileName}</span> selecionado com sucesso
                        </h1>
                    )}
                </div>
            </div>
        </>  
        
    )
    
}