"use client";
import { useState, useEffect, useCallback } from 'react';
import Mapa from '../../components/Mapa/Mapa'; 
import Botao from '../../components/Botao/Botao';
import Estilizacoes from '../../uteis/Estilizacoes';
import ProximaAula from './ProximaAula';
import { dadosLogin } from "../../services/dadoslogin"

const COR_DESTAQUE_PRINCIPAL = 'text-[var(--destaque)]';
const ESTILO_TITULO_MODAL = `${COR_DESTAQUE_PRINCIPAL} text-lg font-bold mb-4`;


export default function HomeAlunoPage() {

    const [userInfo, setUserInfo] = useState("")
    const [userId, setUserId] = useState<number | null>(null)

    useEffect(() => {
        async function load() {
        const aluno = await dadosLogin();
        const nome_aluno = aluno.user.name
        setUserInfo(nome_aluno)

        const id_aluno = aluno.user.id
        setUserId(id_aluno)
        }
    
        load();
    }, []);

    console.log(userInfo)

    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-150 font-sans">
            
            <main className="flex-grow w-full pt-2 pb-4 md:pt-1 md:pb-1">
                
                <section className="mb-20 relative overflow-hidden bg-[var(--background)] w-full">
                    
                    <div className="max-w-6xl mx-auto px-8 md:px-2">
                        
                        <h1 className="text-2xl font-bold text-gray-800 mb-4 pt-6">
                            Olá, {userInfo ?? "Aluno(a)"}!
                        </h1>

                        {userId !== null && <ProximaAula aluno_id={userId} />}
                        
                    </div>
                </section>
                
                <section className="mb-10 relative overflow-hidden bg-[var(--background)] w-full">
                    <div className="bg-cover bg-center h-96 flex flex-col items-center justify-center gap-2 p-4"
                        style={{
                            backgroundImage: "url('/mulherpilates.png')",
                            backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
                        }}
                    >
                        <div className="absolute z-10 top-1/2 right-4 transform -translate-y-1/2 flex flex-col items-end justify-center
                                 md:left-1/2 md:translate-x-[15%] md:right-auto">
                            
                            <div className="bg-gray-400 bg-opacity-70 px-4 py-2 mb-2 rounded-md w-fit ">
                                <h2 className="text-3xl md:text-6xl text-white font-bold drop-shadow-md whitespace-nowrap">Consultar meu</h2>
                            </div>
                            <div className="bg-gray-400 bg-opacity-70 px-4 py-2 rounded-md w-fit">
                                <h2 className="text-3xl md:text-6xl text-white font-bold drop-shadow-md whitespace-nowrap">Plano</h2>
                            </div>
                            
                            <div className='w-full max-w-[160px] md:max-w-[280px] mt-6'>
                                <Botao texto="Consultar" type="button" link="/plano/aluno" />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="w-full py-10w-full pt-10 pb-0">
                    <Mapa />
                </div>
                
            </main>

          
        </div>
    );
}