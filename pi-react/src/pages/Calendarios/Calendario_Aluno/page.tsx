import Botao from "../../../components/Botao/Botao"
import Estilizacoes from "../../../model/Estilizacoes";
import Calendario from "../../../components/Calendario/Calendario"

function Calendario_Aluno(){

    
    return(
        <div className={`${Estilizacoes.container_main} min-h-screen w-full`}>

            <header className={`${Estilizacoes.container_main} pl-[8%] pr-[8%]`}>
                <div>
                    <h1 className={Estilizacoes.titulo_principal}>Calendário de aulas</h1>
                    <h1 className={`${Estilizacoes.titulo_segundario} text-[1.7rem]`}>Consulte as suas futuras aulas</h1>
                </div>

                <div className="flex flex-row justify-start items-center w-full h-[200px] ">
                    <div className=" w-[50%] h-full flex flex-col items-start justify-end ">
                        <div>
                            <h1 className={Estilizacoes.segundo_titulo_principal}>Consultar meu plano</h1>
                        </div>
                        <div className='w-full mb-5'>
                            <Botao texto="Consultar Plano" link="/"/>
                        </div>
                    </div>

                    <div className=" w-[50%] h-full flex flex-col items-center justify-end ">
                        <img className="h-full" src="./public/woman.png" alt="woman" />
                    </div>
                </div>
            </header>

            <main className={`${Estilizacoes.container_main} bg-[var(--destaque)] min-h-screen w-full pl-[8%] pr-[8%]  rounded-t-[15px] mt-[3%]`}>
                <section className={Estilizacoes.container_main}>
                   <Calendario/>
                </section>
            </main>

        </div>
    )
}

export default Calendario_Aluno;