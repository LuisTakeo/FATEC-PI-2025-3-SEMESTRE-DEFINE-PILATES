import { useEffect, useState } from "react";
import BlocoCalendario from "./../../../components/Calendario/BlocoCalendario";
import type { Aula } from "./../../../types/Aula";
import Botao from "./../../../components/Botao/Botao"
import API_BASE_URL from "../../../config/api"


export default function Calendario_Funcionario() {
  
  const [cargo, setCargo] = useState<"adm" | "recep" | "aluno" | "instru" | null>(null);

  useEffect(() => {
    setCargo("adm");
  }, []);

  const [aulas, setAulas] = useState<Aula[]>([]);

  // useEffect(() => {
  //   async function fetchAulas() {
  //     try {
  //       const response = await fetch(`${API_BASE_URL}/class`);
  //       const data: Aula[] = await response.json();
  //       setAulas(data);
  //     } catch (error) {
  //       console.error("Erro ao buscar aulas:", error);
  //     }
  //   }

  //   fetchAulas();
  // }, []);

  //MOCKADO
  useEffect(() => { const aulasMock: Aula[] = [ { id: 1, unidade: "unidade 1", instrutor: "Carlos Silva", alunos: ["Maria"], data: "21/10/2025", horario: { inicio: "08:00", fim: "09:00" } }, { id: 2, unidade: "unidade 2", instrutor: "Maria Souza", alunos: ["Joao", "Maria","Pedro"], data: "22/10/2025", horario: { inicio: "10:00", fim: "11:00" } }, { id: 3, unidade: "unidade 3", instrutor: "João Santos",alunos: ["Joao", "Maria"], data: "23/10/2025", horario: { inicio: "14:00", fim: "15:30" } }, { id: 4, unidade: "unidade 1", instrutor: "Ana Oliveira",alunos: ["Joao", "Maria", "Julia"], data: "24/10/2025", horario: { inicio: "09:00", fim: "10:30" } }, { id: 5, unidade: "unidade 3", instrutor: "Pedro Costa",alunos: ["Joao", "Maria", "Bruno"], data: "25/10/2025", horario: { inicio: "16:00", fim: "17:00" } }, { id: 6, unidade: "unidade 2", instrutor: "Maria Souza",alunos: ["Joao", "Maria"], data: "26/10/2025", horario: { inicio: "11:00", fim: "12:30" } }, { id: 7, unidade: "unidade 3", instrutor: "Carlos Silva",alunos: ["Joao", "Maria", "Samara"], data: "27/10/2025", horario: { inicio: "13:00", fim: "14:30" } }, { id: 8, unidade: "unidade 3", instrutor: "Fernanda Lima",alunos: ["Joao", "Maria", "Maraisa"], data: "28/10/2025", horario: { inicio: "15:00", fim: "16:30" } } ]; setAulas(aulasMock); }, []);


  return (
    <main className="w-full h-full flex flex-col gap-6 lg">
      <section>
        <header className="w-full px-[15%]">
          <h1 className="text-[3.3rem] font-semibold text-[var(--destaque)]">Calendário de aulas</h1>
          <p className="text-[2rem] font-semibold">Consulte abaixo aulas passadas e futuras</p>
        </header>

        <section className={`${cargo !== "adm" ? "hidden" : ""} w-full lg:max-w-[70%] h-full px-[15%] py-10 flex flex-col gap-5`}>
            <div className="w-full text-[1.8rem] lg:text-[1.5rem]">
              <h1>Cadastre futuras aulas</h1>
            </div>
            <div className="w-full">
              <Botao texto="Cadastrar Aula" link="/cadastro/aula" type="button"/>
            </div>
        </section>
      </section>
      
      <BlocoCalendario aulas={aulas} cargo={cargo}/>

    </main>
  );
}
