// ARQUIVO: HomeAlunoPage.tsx

"use client";
import { useState, useEffect, useCallback } from 'react';
import Mapa from '../../components/Mapa/Mapa'; 
import Botao from '../../components/Botao/Botao';
import Estilizacoes from '../../uteis/Estilizacoes';
import ProximaAula from './ProximaAula';
import { dadosLogin } from "../../services/dadoslogin"

const COR_DESTAQUE_PRINCIPAL = 'text-[var(--destaque)]';
const ESTILO_TITULO_MODAL = `${COR_DESTAQUE_PRINCIPAL} text-lg font-bold mb-4`;

// =================================================================
// FUNÇÕES AUXILIARES 
// =================================================================

const Spinner = ({ size = 'h-8 w-8', color = 'text-[var(--destaque)]' }: { size?: string, color?: string }) => (
    <svg 
        className={`animate-spin ${size} ${color}`} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
    >
        <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
        ></circle>
        <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
    </svg>
);

const LoadingModal = ({ message }: { message: string }) => (
    <div 
        // CORREÇÃO FINAL: Z-INDEX super alto (99999) para garantir que ele fique ACIMA de QUALQUER mapa.
        className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        style={{ zIndex: 99999 }} 
    >
        <div 
            className="flex flex-col items-center justify-center p-8 rounded-xl shadow-2xl bg-white text-gray-800"
        >
            <Spinner size="h-12 w-12" color="text-[var(--destaque)]" /> 
            <p className="mt-5 text-xl font-semibold text-center leading-relaxed">
                {message}
            </p>
        </div>
    </div>
);

// =================================================================
// COMPONENTE PRINCIPAL HOMEALUNOPAGE
// =================================================================

export default function HomeAlunoPage() {

    const [userInfo, setUserInfo] = useState("")
    const [userId, setUserId] = useState<number | null>(null)
    // 1. Estados de Carregamento
    const [isLoadingAluno, setIsLoadingAluno] = useState(true) // Carregamento do aluno
    const [isLoadingProximaAula, setIsLoadingProximaAula] = useState(true) // Carregamento da ProximaAula

    // Determina o estado final
    const showLoadingModal = isLoadingAluno || isLoadingProximaAula;
    const loadingMessage = "Carregando dados do Aluno e Próxima Aula...";

    // Função de callback para ser passada ao ProximaAula
    const handleProximaAulaLoaded = useCallback(() => {
        setIsLoadingProximaAula(false);
    }, []);

    // Efeito para carregar os dados do aluno
    useEffect(() => {
        async function load() {
            try {
                const aluno = await dadosLogin();
                
                // Verifica se os dados foram retornados com sucesso
                if (!aluno || !aluno.user) {
                    console.warn("Dados do aluno não disponíveis");
                    return;
                }
                
                const nome_aluno = aluno.user.name
                setUserInfo(nome_aluno)

                const id_aluno = aluno.user.id
                setUserId(id_aluno)
            } catch (error) {
                console.error("Erro ao carregar dados do aluno:", error);
                // Mesmo em caso de erro, remove o loading do aluno para prosseguir
            } finally {
                setIsLoadingAluno(false);
            }
        }
        
        load();
    }, []);    // console.log(userInfo) 
    
    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-150 font-sans">
            
            <main className="flex flex-col w-full pt-2 md:pt-1 md:pb-1">
                
                <section className="mb-20 relative overflow-hidden bg-[var(--background)] w-full">
                    
                    <div className="w-full px-[18%]">
                        
                        <h1 className="text-2xl font-bold text-gray-800 mb-4 pt-6">
                            Olá, {userInfo ?? "Aluno(a)"}!
                        </h1>

                        {/* Renderiza ProximaAula */}
                        {userId !== null && (
                            <ProximaAula 
                                aluno_id={userId} 
                                onDataLoaded={handleProximaAulaLoaded}
                            />
                        )}
                        
                    </div>
                </section>
                
                <section className="mb-10 relative overflow-hidden bg-[var(--background)] w-full">
                    <div className="bg-cover bg-center h-[80vh] flex flex-col items-center justify-center gap-2 p-4"
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
                    {/* REVERTIDO: O Mapa é renderizado SEMPRE, mas o LoadingModal cobre ele devido ao z-index alto. */}
                    <Mapa />
                </div>
                
            </main>

            {/* O LoadingModal permanece para cobrir a tela, agora com Z-INDEX 99999 */}
            {showLoadingModal && <LoadingModal message={loadingMessage} />}
            
        </div>
    );
}