import Estilizacoes from "../../../uteis/Estilizacoes";
import Botao from "../../../components/Botao/Botao"
import { AiOutlineHeart } from "react-icons/ai";
import Mapa from "./../../../components/Mapa/Mapa"
import { API_BASE_URL, API_URL } from "../../../config/api";


function PaginaInicio(){
    console.log(API_BASE_URL)

    return(
    <main className={`${Estilizacoes.container_main} w-full`}>
    {/* SEÇÃO 1: Conheça nosso estudio */}
    <section className="relative flex w-full min-h-[620px] h-auto justify-end items-center 
        bg-[url('/background.jpg')] bg-center bg-cover sm:bg-[length:150%_auto] md:bg-[length:100%_auto] 
        bg-no-repeat overflow-visible">

        <div className="lg:w-[40%] min-w-[40%] max-w-[80%] min-h-75 sm:h-80 md:h-80 bg-[var(--background)] mr-13 mb-6
        rounded-[10px] flex flex-col gap-5 items-start px-10 py-7">
            <div>
                <h1 className="text-[1.5rem] text-[var(--destaque)] font-semibold">Conheça nosso estudio</h1>
            </div>
            <div>
                <h1
                className="text-[1.2rem]"
                >Com 3 estúdios localizados na Zona Leste de São Paulo, oferecemos 
                    atendimento para todas as idades. Nossos profissionais
                    qualificados realizam avaliações completas para garantir que cada aluno tenha um
                    plano personalizado, seguro e eficiente. Oreferemos 4 tipos de plano
                    sem taxa de cancelamento além de aula experimental gratuita</h1>
            </div>
        </div>

        <svg className="absolute bottom-0 w-full h-16 sm:h-20 md:h-24" viewBox="0 0 1440 150" preserveAspectRatio="none">
            <path d="M0,50 C480,150 960,0 1440,50 L1440,150 L0,150 Z" fill="#EBEBEB"/>
        </svg>
    </section>


    {/* SEÇÃO 2: Conheça nossos planos */}
        <section className="text-gray-600 body-font w-full px-[8%]">
                    <div className="px-5 py-5 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                    <h1 className={`${Estilizacoes.titulo_principal} text-[3rem] lg:text-[2.6rem]`}>Conheça nossos planos</h1>
                    </div>
                    <div className="-m-4 w-full lg:grid-cols-2 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] max-[1000px]:grid-cols-2 max-[900px]:grid-cols-2 max-[800px]:grid-cols-1">
                        <div className="p-4">
                            <div className="flex rounded-lg h-full bg-white  shadow-2xl p-8 flex-col">
                            <div className="flex items-center mb-3">
                                <h2 className={`${Estilizacoes.titulo_principal}`}>Plano Anual</h2>
                            </div>
                            <div className="flex-grow text-[1.3rem] text-black">
                                <ul className="flex flex-col gap-2 my-2">
                                    <li className="font-bold text-[var(--azul-segundario)] text-[1.5rem] flex gap-3 items-center">
                                        <span>
                                            <AiOutlineHeart />
                                        </span>
                                        Plano mais popular!
                                        </li>

                                    <li>• Aulas garantidas o ano todo</li>
                                    <li>• Plano mais popular, ideal para quem quer praticidade. Aulas garantidas o ano todo, sem se preocupar em remarcar ou ajustar a frequência.</li>

                                </ul>
                                <ul className="flex flex-col gap-5 my-8">
                                    <li>Aula 1x por semana — 12 parcelas de <span className="font-bold">R$155,00</span></li>
                                    <li>Aula 2x por semana — 12 parcelas de <span className="font-bold">R$255,00</span></li>
                                    <li>Aula 3x por semana — 12 parcelas de <span className="font-bold">R$345,00</span></li>
                                </ul>
                            </div>
                            <div>
                                <Botao texto="Saiba mais" type="button" link="/"/> 
                            </div>
                            </div>
                        </div>

                        
                        <div className="p-4">
                            <div className="flex rounded-lg h-full bg-white  shadow-2xl p-8 flex-col">
                            <div className="flex items-center mb-3">
                                <h2 className={`${Estilizacoes.titulo_principal}`}>Plano Trimestral</h2>
                            </div>
                            <div className="flex-grow text-[1.3rem] text-black">
                                <ul className="flex flex-col gap-2 my-2">
                                    <li>• Aulas garantida por 3 meses</li>
                                    <li>• Ideal para quem quer consistência e resultados, mas ainda gosta de flexibilidade. Com 3 meses de aulas, você consegue criar hábito sem se prender a um compromisso longo.</li>
                                    
                                </ul>
                                <ul className="flex flex-col gap-5 my-8">
                                    <li>Aula 1x por semana — 3 parcelas de <span className="font-bold">R$185,55</span></li>
                                    <li>Aula 2x por semana — 3 parcelas de <span className="font-bold">R$285,00</span></li>
                                    <li>Aula 3x por semana — 3 parcelas de <span className="font-bold">R$375,00</span></li>
                                </ul>
                            </div>
                            <div>
                                <Botao texto="Saiba mais" type="button" link="/"/> 
                            </div>
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="flex rounded-lg h-full bg-white  shadow-2xl p-8 flex-col">
                            <div className="flex items-center mb-3">
                                <h2 className={`${Estilizacoes.titulo_principal}`}>Plano Mensal</h2>
                            </div>
                            <div className="flex-grow text-[1.3rem] text-black">
                                <ul className="flex flex-col gap-2 my-2">
                                    <li>• Aulas garantidas o mês todo</li>
                                    <li>• Ideal para quem quer experimentar e encaixar aulas na rotina sem compromisso. Perfeito se você gosta de flexibilidade e quer decidir mês a mês como participar.</li>
                                </ul>
                                <ul className="flex flex-col gap-5 my-8">
                                    <li>Aula 1x por semana — 1 parcela de <span className="font-bold">R$210,00</span></li>
                                    <li>Aula 2x por semana — 1 parcela de <span className="font-bold">R$310,00</span></li>
                                    <li>Aula 3x por semana — 1 parcela de <span className="font-bold">R$390,00</span></li>
                                </ul>
                            </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex rounded-lg h-full bg-white  shadow-2xl p-8 flex-col">
                            <div className="flex items-center mb-3">
                                <h2 className={`${Estilizacoes.titulo_principal}`}>Plano Semestral</h2>
                            </div>
                            <div className="flex-grow text-[1.3rem] text-black">
                                <ul className="flex flex-col gap-2 my-2">
                                    <li>• Aulas garantidas por 6 meses</li>
                                    <li>• Para quem quer se dedicar de forma contínua e perceber evolução real. Seis meses de aulas te dão ritmo e motivação, sem sobrecarregar sua agenda</li>
                                </ul>
                                <ul className="flex flex-col gap-5 my-8">
                                    <li>Aula 1x por semana — 6 parcela de <span className="font-bold">R$170,00</span></li>
                                    <li>Aula 2x por semana — 6 parcela de <span className="font-bold">R$270,00</span></li>
                                    <li>Aula 3x por semana — 6 parcela de <span className="font-bold">R$360,00</span></li>
                                </ul>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>

    {/* SEÇÃO 3: Agende sua aula experimental (MOBILE MAIOR) */}
        <section 
            className="relative flex justify-center items-center py-[5%] w-full h-[800px]"
        >
            {/* Div de Background e Conteúdo (Container Relativo) */}
            <div 
                className="flex items-start justify-end flex-col w-full h-full 
                           bg-[url('/womanbackgrounf.png')] bg-right bg-no-repeat bg-cover 
                           px-[8%] py-[8%]" 
            >
                {/* Div de Conteúdo (ABSOLUTO e ALINHADO À ESQUERDA) */}
                <div 
                    className="absolute z-10 top-1/2 left-4 transform -translate-y-1/2 flex flex-col items-start justify-center 
                                md:left-6 md:right-auto" 
                >
                    {/* Linha 1 do texto */}
                        <div className="bg-gray-400 bg-opacity-70 px-6 py-2 mb-2 rounded-md w-fit">
                            <h2 className="text-5xl md:text-6xl text-white font-bold drop-shadow-md whitespace-nowrap">
                                Agende sua aula
                            </h2>
                        </div>
                        
                    {/* Linha 2 do texto */}
                        <div className="bg-gray-400 bg-opacity-70 px-6 py-2 rounded-md w-fit">
                            <h2 className="text-5xl md:text-6xl text-white font-bold drop-shadow-md whitespace-nowrap">
                                experimental
                            </h2>
                        </div>
                        
                    {/* Botão */}
                        <div className='w-full max-w-[200px] md:max-w-[280px] mt-6'>
                            <Botao texto="Saiba mais" type="button" link="/"/>
                        </div>
                </div>
            </div>
        </section>

        
        <Mapa />
                    
    </main>
    )
    
}

export default PaginaInicio;