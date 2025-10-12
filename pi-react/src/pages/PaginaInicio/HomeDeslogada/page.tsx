import Estilizacoes from "../../../model/Estilizacoes";
import Botao from "../../../components/Cadastros/Botao"
import { AiOutlineHeart } from "react-icons/ai";

function PaginaInicio(){

    return(
        <main className={`${Estilizacoes.container_main} w-full`}>
<section className="relative flex w-full h-[620px] justify-start items-center px-[8%] py-[5%]">
  {/* Fundo responsivo */}
  <div 
    className="absolute inset-0 bg-[url('/background.jpg')] bg-center bg-cover
               sm:bg-[length:150%_auto] md:bg-[length:100%_auto] bg-no-repeat"
  ></div>

  {/* Conteúdo */}
  <div className="relative z-10 bg-white/90 px-5 py-8 rounded-[7px]">
    <h1 className={Estilizacoes.titulo_principal}>
      A Define Pilates é um espaço acolhedor, feito para você cuidar do corpo e da mente com atenção, leveza e bem-estar
    </h1>
  </div>
</section>



            <section className="text-gray-600 body-font w-full px-[8%]">
                <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                <h1 className={`${Estilizacoes.titulo_principal} text-[3rem] lg:text-[2.6rem]`}>Conheça nossos planos</h1>
                </div>
                <div className="-m-4 w-full lg:grid-cols-2 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] max-[1000px]:grid-cols-2 max-[900px]:grid-cols-2 max-[800px]:grid-cols-1">
                    <div className="p-4">
                        <div className="flex rounded-lg h-full bg-white  shadow-2xl p-8 flex-col">
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

                                <li>- Aulas o ano todo</li>
                                <li>- Escolha entre 1 a 3 aulas por semana</li>
                                <li>- Sem taxa de cancelamento</li>
                            </ul>
                            <ul className="flex flex-col gap-5 my-8">
                                <li>1x por semana <span className="font-bold">R$155,00</span></li>
                                <li>2x por semana <span className="font-bold">R$255,00</span></li>
                                <li>3x por semana <span className="font-bold">R$345,00</span></li>
                            </ul>
                        </div>
                        <div>
                            <Botao texto="Saiba mais" type="button" link="/"/> 
                        </div>
                        </div>
                    </div>

                    
                     <div className="p-4">
                        <div className="flex rounded-lg h-full bg-white  shadow-2xl p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <h2 className={`${Estilizacoes.titulo_principal}`}>Plano Anual</h2>
                        </div>
                        <div className="flex-grow text-[1.3rem] text-black">
                            <ul className="flex flex-col gap-2 my-2">
                                <li>- Aulas o ano todo</li>
                                <li>- Escolha entre 1 a 3 aulas por semana</li>
                                <li>- Sem taxa de cancelamento</li>
                            </ul>
                            <ul className="flex flex-col gap-5 my-8">
                                <li>1x por semana <span className="font-bold">R$155,00</span></li>
                                <li>2x por semana <span className="font-bold">R$255,00</span></li>
                                <li>3x por semana <span className="font-bold">R$345,00</span></li>
                            </ul>
                        </div>
                        <div>
                            <Botao texto="Saiba mais" type="button" link="/"/> 
                        </div>
                        </div>
                    </div>

                     <div className="p-4">
                        <div className="flex rounded-lg h-full bg-white  shadow-2xl p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <h2 className={`${Estilizacoes.titulo_principal}`}>Plano Anual</h2>
                        </div>
                        <div className="flex-grow text-[1.3rem] text-black">
                            <ul className="flex flex-col gap-2 my-2">
                                <li>- Aulas o ano todo</li>
                                <li>- Escolha entre 1 a 3 aulas por semana</li>
                                <li>- Sem taxa de cancelamento</li>
                            </ul>
                            <ul className="flex flex-col gap-5 my-8">
                                <li>1x por semana <span className="font-bold">R$155,00</span></li>
                                <li>2x por semana <span className="font-bold">R$255,00</span></li>
                                <li>3x por semana <span className="font-bold">R$345,00</span></li>
                            </ul>
                        </div>
                        <div>
                            <Botao texto="Saiba mais" type="button" link="/"/> 
                        </div>
                        </div>
                    </div>
                     <div className="p-4">
                        <div className="flex rounded-lg h-full bg-white  shadow-2xl p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <h2 className={`${Estilizacoes.titulo_principal}`}>Plano Anual</h2>
                        </div>
                        <div className="flex-grow text-[1.3rem] text-black">
                            <ul className="flex flex-col gap-2 my-2">
                                <li>- Aulas o ano todo</li>
                                <li>- Escolha entre 1 a 3 aulas por semana</li>
                                <li>- Sem taxa de cancelamento</li>
                            </ul>
                            <ul className="flex flex-col gap-5 my-8">
                                <li>1x por semana <span className="font-bold">R$155,00</span></li>
                                <li>2x por semana <span className="font-bold">R$255,00</span></li>
                                <li>3x por semana <span className="font-bold">R$345,00</span></li>
                            </ul>
                        </div>
                        <div>
                            <Botao texto="Saiba mais" type="button" link="/"/> 
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>



        </main>
    )
}

export default PaginaInicio;