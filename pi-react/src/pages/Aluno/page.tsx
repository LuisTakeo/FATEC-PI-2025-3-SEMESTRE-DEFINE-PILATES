// pages/Aluno/page.tsx

// IMPORTAÇÕES DOS COMPONENTES NECESSÁRIOS:
import Mapa from '../../components/Mapa/Mapa'; 
import Botao from '../../components/Botao/Botao'; 
import Estilizacoes from '../../model/Estilizacoes'; 

export default function HomeAlunoPage() {

    const proximaAula = {
        data: "25/10/2023",
        horario: "25/10/2025 às 14h - 15h", 
        local: "São Miguel Paulista",
        confirmada: true,
    };

    return (
        // Container Principal (Fundo Cinza Claro: bg-gray-100)
        <div className="w-full min-h-screen flex flex-col bg-gray-150 font-sans">
            
            <main className="flex-grow w-full py-8 md:py-10"> 
                
                {/* 1. SEÇÃO CALENDÁRIO/AULA - AGORA COM LARGURA DO MAPA */}
                {/* O conteúdo do Calendário será envolto em um contêiner para garantir a largura e o padding lateral. */}
                <section className="mb-10"> 
                    
                    <div className="max-w-7xl mx-auto px-6"> {/* Garante largura responsiva, centralizada, com padding lateral */}
                        
                        {/* Card Principal: Branco (bg-white) - Ocupa a largura total do contêiner centralizado */}
                        <div className="w-full bg-white rounded-xl shadow-lg p-6 )]"> 
                            
                            <h2 className={`${Estilizacoes.titulo_principal} text-[var(--foreground)] mb-6 text-left`}>
                                Calendário
                            </h2>
                            
                            <div className="mb-0"> 
                                {/* Bloco da Próxima Aula: Integrado ao fundo branco do card. */}
                                <div className="pb-4 border-b border-gray-200">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-1">Sua próxima aula</h3>
                                    <p className="text-base text-gray-700 mb-3">
                                        Em <span className="font-bold">{proximaAula.horario}</span>
                                    </p>
                                    <div className="flex gap-3 mt-4 justify-start">
                                        <div className="max-w-[150px] flex-1"> <Botao texto="Confirmar" type="button" /> </div>
                                        <div className="max-w-[150px] flex-1"> <Botao texto="Desmarcar" type="button" /> </div>
                                    </div>
                                    <p className="text-xs text-red-600 mt-4">
                                        Atenção se você desmarcar em 3 horas antes do início da aula, será cobrada, caso desmarque depois, não terá direito de reposição e perde a aula.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* BLOCO: ACESSE SEU CALENDÁRIO COMPLETO - Desacoplado, ocupando a mesma largura e padding */}
                        <div className="w-full text-left mt-6 bg-white rounded-xl shadow-lg p-6 )]">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                Acesse seu calendário completo de aulas abaixo
                            </h3>

                            <div className="flex justify-start">
                                <div className='w-full max-w-[250px]'> 
                                    <Botao texto="Visualizar" type="button" />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </section>
                
                {/* 2. SEÇÃO PLANO - Versão Original (Fundo BORDÔ) */}
                <section className="mb-10 relative overflow-hidden bg-[var(--background)] w-full"> 
                    <div className="bg-cover bg-center h-96 flex flex-col items-center justify-center gap-2 p-4"
                        style={{
                            backgroundImage: "url('/mulherpilates.png')",
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        }} 
                    >
                        {/* Overlay escuro para contraste */}
                        <div className="absolute inset-0 bg-black opacity-30"></div> 
                        
                        {/* Texto e botão - Mantido como estava */}
                        <div className="relative z-10 flex flex-col items-center justify-center h-full">
                            <div className="bg-gray-400 bg-opacity-70 px-4 py-2 mb-2 rounded-md">
                                <h2 className="text-2xl text-white font-bold drop-shadow-md">
                                    Consultar meu
                                </h2>
                            </div>
                            <div className="bg-gray-400 bg-opacity-70 px-4 py-2 rounded-md translate-x-3">
                                <h2 className="text-2xl text-white font-bold drop-shadow-md">
                                    Plano
                                </h2>
                            </div>
                            <div className='w-full max-w-[250px] mt-6'>
                                <Botao 
                                    texto="Consultar" 
                                    type="button" 
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. CHAMADA DIRETA DA SEÇÃO DO MAPA. */}
                {/* Nota: O componente Mapa deve aplicar o mesmo padding lateral (px-6) e max-w-7xl internamente, se necessário. */}
                <div className="w-full py-10">
                    <Mapa /> 
                </div>
                
            </main>

            {/* CHAMADA DO SEU FOOTER. Fundo Cinza Claro (Herdado)
            <FooterComponente /> */}
        </div>
    );
}