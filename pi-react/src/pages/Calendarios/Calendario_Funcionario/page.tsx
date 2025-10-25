import { useEffect, useState } from "react";
import BlocoCalendario from "./../../../components/Calendario/BlocoCalendario";
import type { Filtros } from "./../../../types/Filtros";
import type { Aula } from "./../../../types/Aula";
import Botao from "./../../../components/Botao/Botao"


export default function Calendario_Funcionario() {
  const KEY_USER_ROLE = "userRole";
  const cargo = localStorage.getItem(KEY_USER_ROLE) || "";
  let Filtro_adm_recep: React.FC | null = null;

  console.log(cargo)

  const [aulas, setAulas] = useState<Aula[]>([]);
  const [ativo, setAtivo] = useState<string | null>(null)



  if (cargo === "adm" || cargo === "recep") {
    Filtro_adm_recep = () => (
      <>
        <div>
          <button>Filtrar por unidade</button>
        </div>
        <div>
          <button>Filtrar por instrutor</button>
        </div>
        <div>
          {/* essa opção fará mostrar as aulas mais recentes com mais vaga disponivel */}
          <button>Quantidade de Alunos</button>
        </div>
      </>
    );
  }

  // 1️⃣ Buscar aulas do backend (ou usar mock)
  useEffect(() => {
    // Exemplo com mock, substitua pelo fetch do seu backend
  const aulasMock: Aula[] = [
    { id: 1, unidade: "Unidade 1", instrutor: "Carlos Silva", alunos: ["Maria"], data: "21/10/2025", horario: { inicio: "08:00", fim: "09:00" } },
    { id: 2, unidade: "Unidade 2", instrutor: "Maria Souza", alunos: ["Joao", "Maria","Pedro"], data: "22/10/2025", horario: { inicio: "10:00", fim: "11:00" } },
    { id: 3, unidade: "Unidade 3", instrutor: "João Santos",alunos: ["Joao", "Maria"], data: "23/10/2025", horario: { inicio: "14:00", fim: "15:30" } },
    { id: 4, unidade: "Unidade 1", instrutor: "Ana Oliveira",alunos: ["Joao", "Maria", "Julia"], data: "24/10/2025", horario: { inicio: "09:00", fim: "10:30" } },
    { id: 5, unidade: "Unidade 3", instrutor: "Pedro Costa",alunos: ["Joao", "Maria", "Bruno"], data: "25/10/2025", horario: { inicio: "16:00", fim: "17:00" } },
    { id: 6, unidade: "Unidade 2", instrutor: "Maria Souza",alunos: ["Joao", "Maria"], data: "26/10/2025", horario: { inicio: "11:00", fim: "12:30" } },
    { id: 7, unidade: "Unidade 3", instrutor: "Carlos Silva",alunos: ["Joao", "Maria", "Samara"], data: "27/10/2025", horario: { inicio: "13:00", fim: "14:30" } },
    { id: 8, unidade: "Unidade 3", instrutor: "Fernanda Lima",alunos: ["Joao", "Maria", "Maraisa"], data: "28/10/2025", horario: { inicio: "15:00", fim: "16:30" } }
  ];
    setAulas(aulasMock);

    // Se for buscar do backend:
    // fetch("/api/aulas")
    //   .then(res => res.json())
    //   .then((data: Aula[]) => setAulas(data));
  }, []);

  // 2️⃣ Filtros por enquanto não aplicados
  const filtros: Filtros = {};

  return (
    <main className="w-full h-full flex flex-col gap-6 lg">
      <section>
        <header className="w-full px-[15%]">
          <h1 className="text-[3.3rem] font-semibold text-[var(--destaque)]">Calendário de aulas</h1>
          <p className="text-[2rem] font-semibold">Consulte o registre de aulas</p>
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

      <div className="hidden">
        {Filtro_adm_recep && <Filtro_adm_recep />}
        {/* temporariamente desabilitado pois ainda nao vou fazer isso */}
      </div>
      
      <BlocoCalendario filtros={filtros} aulas={aulas} cargo={cargo}/>

    </main>
  );
}
