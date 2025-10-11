import "./stylesPaginaInicio.css"
import Estilizacoes from "../../../model/Estilizacoes";

function PaginaInicio(){

    return(
        <main className={`${Estilizacoes.container_main} h-screen`}>
            <article className="relative flex flex-col w-full h-full justify-between items-center">
                <section className="
                    flex flex-col justify-start items-start gap-5
                    w-full h-[80%] px-[8%] py-[5%] bg-[var(--destaque)]">
                    <div>
                    <h1 className="text-[1.8rem] font-semibold text-[var(--background)] py-5">
                        A Define Pilates é um espaço acolhedor, feito para você cuidar do corpo e da mente com atenção, leveza e bem-estar
                    </h1>
                    </div>
                </section>

               
            </article>
        </main>
    )
}

export default PaginaInicio;