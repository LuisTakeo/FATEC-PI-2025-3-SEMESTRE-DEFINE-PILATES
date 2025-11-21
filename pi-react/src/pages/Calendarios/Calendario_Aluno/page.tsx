import { useState } from "react";
import BlocoCalendario from "./../../../components/Calendario/teste";
import Botao from "./../../../components/Botao/Botao"

export default function Calendario_Aluno() {

  //REQUISIÇÃO PARA STUDENTS/{ID_STUDENT}AULA/AVAILABLE
  const [aulaPendente, setAulaPendente] = useState("8")

  return (
    <main className="w-full h-full flex flex-col gap-6">
        <section className="flex flex-col gap-10 w-full">
            <header className="w-full px-[15%]">
                <h1 className="text-[3.3rem] font-semibold text-[var(--destaque)]">Calendário de aulas</h1>
                <p className="text-[2rem] font-semibold">Consulte abaixo aulas passadas e futuras</p>
            </header>

          <div className="lg:w-full max-w-[80%] h-full px-[15%] flex flex-col gap-8 ">
            <div className="w-full text-[1.8rem] lg:text-[1.5rem]">
                <h1>Marcar aula pendente, atualmente voce tem {aulaPendente} aulas pendentes</h1>
            </div>
            <div className="w-full">
                <Botao texto="Marcar aula pendente" link="/cadastro/aula" type="button"/>
            </div>
          </div>
        </section>
              
      <BlocoCalendario/>

    </main>
  );
}
