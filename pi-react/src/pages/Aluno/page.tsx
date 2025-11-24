"use client";
import { useState, useEffect, useCallback } from 'react';
import { fetchProximaAula, type ProximaAulaApi } from '../../services/aula/proxima_aula';
import Mapa from '../../components/Mapa/Mapa'; 
import Botao from '../../components/Botao/Botao';
import Estilizacoes from '../../uteis/Estilizacoes';
import ProximaAula from './ProximaAula';
import { dadosLogin } from "../../services/dadoslogin"

const COR_DESTAQUE_PRINCIPAL = 'text-[var(--destaque)]';
const ESTILO_TITULO_MODAL = `${COR_DESTAQUE_PRINCIPAL} text-lg font-bold mb-4`;


export default function HomeAlunoPage() {
    
    
    // const handleConfirmClick = useCallback(() => setShowConfirmModal(true), []);
    // const handleCancelClick = useCallback(() => setShowCancelModal(true), []);

   
    
    // const proximaAulaExiste = proximaAula !== null && proximaAula !== undefined;
    
    // const aulaBlock = proximaAulaExiste ? (
    //     <div className="w-full bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
            
    //         <div>
    //             <h2 className={`${Estilizacoes.titulo_principal} ${COR_DESTAQUE_PRINCIPAL} font-bold mb-6 text-left`}>
    //                 Calendário
    //             </h2>
    //             <div className="mb-0">
    //                 <div className="pb-1 flex items-center gap-2">
    //                     <svg 
    //                         style={{ color: 'var(--azul-segundario)' }}
    //                         width="20" height="20" viewBox="0 0 24 24" fill="none" 
    //                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    //                     >
    //                         <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    //                         <line x1="16" y1="2" x2="16" y2="6"></line>
    //                         <line x1="8" y1="2" x2="8" y2="6"></line>
    //                         <line x1="3" y1="10" x2="21" y2="10"></line>
    //                     </svg>
    //                     <h3
    //                         className={`${Estilizacoes.titulo_segundario} mb-1 font-bold`}
    //                         style={{ color: 'var(--azul-segundario)' }}
    //                     >
    //                         Sua próxima aula ({proximaAula!.tipo})
    //                     </h3>
    //                 </div>
    //                 <p className="text-base text-black mb-3 font-bold">
    //                     Em {horarioExibicaoParaModal} ({proximaAula!.unidade.name})
    //                 </p>
    //             </div>
    //         </div>
            
    //         <div>
    //             {/* Lógica do Botão (Confirmar / Desmarcar) */}
    //             {proximaAula!.status !== 'CONFIRMADA' ? (
    //                 <div className="flex gap-3 mt-4 justify-start">
    //                     <div className="max-w-[150px] flex-1" onClick={handleConfirmClick}>
    //                         <Botao texto="Confirmar" type="button" />
    //                     </div>
    //                     <div className="max-w-[150px] flex-1" onClick={handleCancelClick}>
    //                         <Botao
    //                             texto="Desmarcar"
    //                             type="button"
    //                             style="hover:!bg-red-700"
    //                         />
    //                     </div>
    //                 </div>
    //             ) : (
    //                 <div className="mt-4">
    //                     <p className="text-base text-green-600 font-bold">
    //                         Sua aula está confirmada! ✅
    //                     </p>
    //                     <div className="max-w-[150px] mt-2" onClick={handleCancelClick}>
    //                         <Botao
    //                             texto="Desmarcar"
    //                             type="button"
    //                             style="bg-red-500 hover:!bg-red-700"
    //                         />
    //                     </div>
    //                 </div>
    //             )}

    //             <p className="text-xs text-red-600 mt-4">
    //                 Atenção se você desmarcar em 3 horas antes do início da aula, será cobrada, caso desmarque depois, não terá direito de reposição e perde a aula.
    //             </p>
    //         </div>
    //     </div>
    // ) : (
    //     <div className="w-full bg-white rounded-xl shadow-lg p-6 flex flex-col justify-start text-left">
    //          <h2 className={`${Estilizacoes.titulo_principal} ${COR_DESTAQUE_PRINCIPAL} font-bold mb-4`}>Calendário</h2>
             
    //          <p className='text-lg text-red-600 mb-6'>Nenhuma aula futura agendada.</p>
             
    //          <div className='w-full max-w-[300px]'> 
    //              <Botao 
    //                  texto="Verificar se há reposições" 
    //                  type="button" 
    //                  link="/calendario/aluno" 
    //              />
    //          </div>
    //     </div>
    // );


    const [userInfo, setUserInfo] = useState<{nome: string | null, id: number | null} | null>(null)

    useEffect(() => {
        async function load() {
        const aluno = await dadosLogin();
        setUserInfo({nome: aluno.user.name, id: aluno.user.id});
        }
    
        load();
    }, []);



    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-150 font-sans">
            
            <main className="flex-grow w-full pt-2 pb-4 md:pt-1 md:pb-1">
                
                <section className="mb-20 relative overflow-hidden bg-[var(--background)] w-full">
                    
                    <div className="max-w-6xl mx-auto px-8 md:px-2">
                        
                        <h1 className="text-2xl font-bold text-gray-800 mb-4 pt-6">
                            Olá, {userInfo?.nome ?? "Aluno(a)"}!
                        </h1>

                        <ProximaAula user_id={userInfo?.id}/>
                        
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