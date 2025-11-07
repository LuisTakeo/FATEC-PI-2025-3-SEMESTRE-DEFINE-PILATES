import { useState, useEffect, useCallback } from 'react'; 
import Mapa from '../../components/Mapa/Mapa'; 
import Botao from '../../components/Botao/Botao'; 
import Estilizacoes from '../../model/Estilizacoes'; 

const COR_DESTAQUE_PRINCIPAL = 'text-[var(--destaque)]'; 
const ESTILO_TITULO_MODAL = `${COR_DESTAQUE_PRINCIPAL} text-lg font-bold mb-4`; 

// --- INTERFACES ---
interface ProximaAula {
    data: string;
    horario: string;
    local: string;
    confirmada: boolean;
}

interface ModalProps {
    isVisible: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText: string;
}

// --- COMPONENTE SIMPLEMENTAL (CORREÇÃO DE ESTRUTURA E FUNDO ESCURO) ---
const SimpleModal = ({ isVisible, title, message, onConfirm, onCancel, confirmText }: ModalProps) => {
    if (!isVisible) return null;

    return (
        // Fundo com opacidade (rgba(0, 0, 0, 0.7)) usando CSS inline
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center" 
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
        >
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto">
                
                <h3 className={ESTILO_TITULO_MODAL}>{title}</h3>
                
                <p className="mb-6">{message}</p>
                <div className="flex justify-end gap-3">
                    <button 
                        onClick={onCancel} 
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="px-4 py-2 text-white bg-[var(--azul-segundario)] rounded-md hover:bg-[var(--destaque)] transition"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- COMPONENTE PRINCIPAL (HOMEALUNOPAGE) ---

export default function HomeAlunoPage() {
    const [proximaAula, setProximaAula] = useState<ProximaAula | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);

    useEffect(() => {
        const mockData: ProximaAula = {
            data: "25/10/2023",
            horario: "25/10/2025 às 14h - 15h", 
            local: "São Miguel Paulista",
            confirmada: false, 
        };
        setProximaAula(mockData);
    }, []);

    const handleConfirmClick = useCallback(() => setShowConfirmModal(true), []);
    const handleCancelClick = useCallback(() => setShowCancelModal(true), []);

    const confirmClass = useCallback(() => {
        setProximaAula(prev => prev ? { ...prev, confirmada: true } : null);
        setShowConfirmModal(false);
    }, []);

    const cancelClass = useCallback(() => {
        setProximaAula(null); 
        setShowCancelModal(false);
    }, []);

    if (!proximaAula) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-gray-150 font-sans">
                {proximaAula === null ? 'Carregando dados da próxima aula...' : 'Nenhuma aula futura agendada.'}
            </div>
        );
    }
    
    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-150 font-sans">
            
            <main className="flex-grow w-full py-8 md:py-10"> 
                
                <section className="mb-10"> 
                    
                    <div className="max-w-7xl mx-auto px-6"> 
                        
                        <div className="flex flex-col gap-4 w-full"> 
                        
                            {/* Card 1: Próxima Aula */}
                            <div className="w-full bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between"> 
                                
                                <div> 
                                    <h2 className={`${Estilizacoes.titulo_principal} ${COR_DESTAQUE_PRINCIPAL} font-bold mb-6 text-left`}>
                                        Calendário
                                    </h2>
                                    <div className="mb-0"> 
                                        <div className="pb-4">
                                            <h3 
                                                className={`${Estilizacoes.titulo_segundario} mb-1 font-bold`}
                                                style={{ color: 'var(--azul-segundario)' }}
                                            >
                                                Sua próxima aula
                                            </h3>
                                            <p className="text-base text-black mb-3 font-bold">
                                                Em {proximaAula.horario}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    {!proximaAula.confirmada ? (
                                        <div className="flex gap-3 mt-4 justify-start">
                                            <div className="max-w-[150px] flex-1" onClick={handleConfirmClick}> <Botao texto="Confirmar" type="button" /> </div>
                                            <div className="max-w-[150px] flex-1" onClick={handleCancelClick}> <Botao texto="Desmarcar" type="button" /> </div>
                                        </div>
                                    ) : (
                                        <p className="text-base text-green-600 font-bold mt-4">
                                            Sua aula está confirmada! ✅
                                        </p>
                                    )}

                                    <p className="text-xs text-red-600 mt-4"> 
                                        Atenção se você desmarcar em 3 horas antes do início da aula, será cobrada, caso desmarque depois, não terá direito de reposição e perde a aula.
                                    </p>
                                </div>
                            </div>
                            
                            {/* Card 2: Calendário Completo */}
                            <div className="w-full text-left bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
                                
                                <h3 className={`${Estilizacoes.titulo_segundario} ${COR_DESTAQUE_PRINCIPAL} mb-4 font-bold`}>
                                    Acesse seu calendário completo de aulas abaixo
                                </h3>

                                <div className="flex justify-start mt-auto"> 
                                    <div className='w-full max-w-[250px]'> 
                                        <Botao texto="Visualizar" type="button" link="/calendario/aluno" /> 
                                    </div>
                                </div>
                            </div>
                        
                        </div> 
                        
                    </div>
                </section>
                
                <section className="mb-10 relative overflow-hidden bg-[var(--background)] w-full"> 
                    
                    <div className="bg-cover bg-center h-96 flex flex-col items-center justify-center gap-2 p-4"
                        style={{
                            backgroundImage: "url('/mulherpilates.png')",
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        }} 
                    >
                        <div className="absolute inset-0 bg-black opacity-30"></div> 
                        
                        <div className="absolute z-10 top-1/2 left-1/2 transform -translate-y-1/2 translate-x-[5%] md:translate-x-[15%] flex flex-col items-end justify-center">
                            
                            <div className="bg-gray-400 bg-opacity-70 px-4 py-2 mb-2 rounded-md w-fit">
                                <h2 className="text-3xl md:text-6xl text-white font-bold drop-shadow-md whitespace-nowrap">
                                    Consultar meu
                                </h2>
                            </div>
                            
                            <div className="bg-gray-400 bg-opacity-70 px-4 py-2 rounded-md w-fit">
                                <h2 className="text-3xl md:text-6xl text-white font-bold drop-shadow-md whitespace-nowrap">
                                    Plano
                                </h2>
                            </div>
                            
                            <div className='w-full max-w-[160px] md:max-w-[280px] mt-6'>
                                <Botao 
                                    texto="Consultar" 
                                    type="button" 
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="w-full py-10">
                    <Mapa /> 
                </div>
                
            </main>

            {/* MODAIS RENDERIZADOS */}
            <SimpleModal
                isVisible={showConfirmModal}
                title="Confirmar Aula"
                message={`Deseja realmente confirmar sua aula em ${proximaAula.horario}?`}
                onConfirm={confirmClass}
                onCancel={() => setShowConfirmModal(false)}
                confirmText="Sim, Confirmar"
            />
            
            <SimpleModal
                isVisible={showCancelModal}
                title="Desmarcar Aula"
                message={`Deseja realmente desmarcar sua aula em ${proximaAula.horario}? Atenção: pode haver cobrança conforme aviso abaixo.`}
                onConfirm={cancelClass}
                onCancel={() => setShowCancelModal(false)}
                confirmText="Sim, Desmarcar"
            />
        </div>
    );
}