import { useEffect, useState } from "react";
import BlocoCalendario from "./../../../components/Calendario/BlocoCalendario";
import type { Filtros } from "./../../../types/Filtros";
import type { Aula } from "./../../../types/Aula";
import Botao from "./../../../components/Botao/Botao"

export default function Calendario_Funcionario() {
  const KEY_USER_ROLE = "userRole";
  const cargo = localStorage.getItem(KEY_USER_ROLE) || "";
  let Filtro_adm_recep: React.FC | null = null;

  const [aulas, setAulas] = useState<Aula[]>([]);

  if (cargo === "adm" || cargo === "recep") {
    Filtro_adm_recep = () => (
      <>
        <div>
          <button>Filtrar por unidade</button>
        </div>
        <div>
          <button>Filtrar por instrutor</button>
        </div>
      </>
    );
  }

  // 1️⃣ Buscar aulas do backend (ou usar mock)
  useEffect(() => {
    // Exemplo com mock, substitua pelo fetch do seu backend
    const aulasMock: Aula[] = [
      { id: 1, unidade: "Unidade 1", instrutor: "Carlos Silva", data: "2025-10-21", horario: { inicio: "08:00", fim: "09:00" } },
      { id: 2, unidade: "Unidade 2", instrutor: "Maria Souza", data: "2025-10-22", horario: { inicio: "10:00", fim: "11:00" } },
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
    <main>
      <header>
        <h1>Calendário de aulas</h1>
      </header>

      <section>
        <div className={`${cargo !== "adm" ? "hidden" : ""}`}>
          <Botao texto="Cadastrar Aula" link="/cadastro/aula" type="button"/>
        </div>
      </section>

      <section className="hidden">
        <div>
          <h1>Filtros</h1>
        </div>
        <div>
          <div>
            <button>Filtrar por dia</button>
          </div>
          <div>
            <button>Filtrar por horário</button>
          </div>

          {Filtro_adm_recep && <Filtro_adm_recep />}
        </div>
      </section>

      <section>
        <div>
          <BlocoCalendario filtros={filtros} aulas={aulas} />
        </div>
      </section>
    </main>
  );
}
