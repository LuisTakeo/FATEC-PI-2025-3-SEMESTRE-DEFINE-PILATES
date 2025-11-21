import { useEffect, useState } from "react";
import BlocoCalendario from "./../../../components/Calendario/BlocoCalendario";
import Botao from "./../../../components/Botao/Botao"
import { dadosLogin } from "../../../services/dadoslogin"


export default function Calendario_Aluno() {

  const [cargo, setCargo] = useState("")

  useEffect(() => {
    async function login(){
        const acesso = await dadosLogin()
        const cargo = acesso.user.type
        setCargo(cargo)
  }
  login()
  })

  return (
    <main className="w-full h-full flex flex-col gap-6">
        <section className="flex flex-col gap-10 w-full">
            <header className="w-full px-[15%]">
                <h1 className="text-[3.3rem] font-semibold text-[var(--destaque)]">Calendário de aulas</h1>
                <p className="text-[2rem] font-semibold">Consulte abaixo aulas passadas e futuras</p>
            </header>
          {cargo === "adm" &&(
            <div className="lg:w-full max-w-[80%] h-full px-[15%] flex flex-col gap-8 ">
              <div className="w-full text-[1.8rem] lg:text-[1.5rem]">
                  <h1>Cadastre aulas futuras abaixo</h1>
              </div>
              <div className="w-full">
                  <Botao texto="Cadastrar aula" link="/cadastro/aula" type="button"/>
              </div>
          </div>)}
        </section>
              
      <BlocoCalendario/>

    </main>
  );
}
