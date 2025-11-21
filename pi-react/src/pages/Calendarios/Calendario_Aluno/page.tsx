import { useEffect, useState } from "react";
import BlocoCalendario from "./../../../components/Calendario/BlocoCalendario";
import { FetchAulasPendentes } from "../../../services/aluno/fetchAulasPendentes"
import Estilizacoes from "../../../uteis/Estilizacoes";
import { useNavigate } from "react-router-dom";

export default function Calendario_Aluno() {

  const [aulaPendente, setAulaPendente] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
      async function load() {
        const aulas = await FetchAulasPendentes();
        setAulaPendente(aulas.length);
      }
  
      load();
    }, []);

  return (
    <main className="w-full h-full flex flex-col gap-6">
        <section className="flex flex-col gap-10 w-full">
            <header className="w-full px-[15%]">
                <h1 className="text-[3.3rem] font-semibold text-[var(--destaque)]">Calendário de aulas</h1>
                <p className="text-[2rem] font-semibold">Consulte abaixo aulas passadas e futuras</p>
            </header>

          <div className="lg:w-full h-full px-[15%] flex flex-col gap-8">
            <div className="w-full text-[1.8rem] h-full flex flex-col gap-2 lg:text-[1.5rem]">
                <h1 className={Estilizacoes.segundo_titulo_principal}>Marcar aula pendente, atualmente voce tem {aulaPendente} aulas pendentes</h1>
                <h1>Utilize o botão abaixo para acessar a página de marcar aula pendente. Aula pendente é aquela que voce desmarcou 3 horas antes do horario de inicio da aula, com uma justificativa plausivel.</h1>            
            </div>
            
            <div className="w-[60%] min-w-80">
              <button
              type="button"
              // disabled={aulaPendente === 0}
              onClick={() => navigate("/aluno/aula-pendente")}
              className={`w-full flex justify-center items-center  p-5 m-0 ` +
              `text-white hover:!text-white text-[1.5rem] md:text-[1.3rem] font-semibold text-center tracking-[1px] rounded-md whitespace-nowrap h-[50px] cursor-pointer ` +
              `transition-all duration-200 bg-[var(--azul-segundario)] hover:!bg-[var(--destaque)]`}
              >Marcar aula pendente</button>

            </div>
          </div>
        </section>
              
      <BlocoCalendario/>

    </main>
  );
}
