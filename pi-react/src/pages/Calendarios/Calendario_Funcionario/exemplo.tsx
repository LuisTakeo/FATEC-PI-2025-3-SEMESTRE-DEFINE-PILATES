import { useEffect, useState } from "react";
import BlocoCalendario from "./../../../components/Calendario/BlocoCalendario";
import type { Filtros } from "./../../../types/Filtros";
import type { Aula } from "./../../../types/Aula";

export default function exemplo_calendario_funcionario() {
  const KEY_USER_ROLE = "userRole";
  const cargo = localStorage.getItem(KEY_USER_ROLE) || "";
  let Filtro_adm_recep: React.FC | null = null;

  const [aulas, setAulas] = useState<Aula[]>([]);
  const [aulasFiltradas, setAulasFiltradas] = useState<Aula[]>([]);
  const [filtros, setFiltros] = useState<Filtros>({});

  // Componente de filtros extras para admin/recepção
  if (cargo === "adm" || cargo === "recep") {
    Filtro_adm_recep = () => (
      <>
        <div>
          <button onClick={() => setFiltros({ ...filtros, unidade: "Unidade 1" })}>
            Unidade 1
          </button>
        </div>
        <div>
          <button onClick={() => setFiltros({ ...filtros, instrutor: "Carlos Silva" })}>
            Instrutor Carlos
          </button>
        </div>
      </>
    );
  }

  // Buscar dados do backend (mock por enquanto)
  useEffect(() => {
    const aulasMock: Aula[] = [
      { id: 1, unidade: "Unidade 1", instrutor: "Carlos Silva", data: "2025-10-21", horario: { inicio: "08:00", fim: "09:00" } },
      { id: 2, unidade: "Unidade 2", instrutor: "Maria Souza", data: "2025-10-22", horario: { inicio: "10:00", fim: "11:00" } },
      { id: 3, unidade: "Unidade 1", instrutor: "Carlos Silva", data: "2025-10-22", horario: { inicio: "09:00", fim: "10:00" } },
    ];
    setAulas(aulasMock);
    setAulasFiltradas(aulasMock); // inicialmente todas
  }, []);

  // Atualiza aulas filtradas quando filtros mudam
  useEffect(() => {
    let filtradas = [...aulas];

    if (filtros.unidade) {
      filtradas = filtradas.filter((a) => a.unidade === filtros.unidade);
    }
    if (filtros.instrutor) {
      filtradas = filtradas.filter((a) => a.instrutor === filtros.instrutor);
    }
    if (filtros.data) {
      const dataStr = filtros.data.toISOString().slice(0, 10);
      filtradas = filtradas.filter((a) => a.data === dataStr);
    }
    if (filtros.horario) {
      filtradas = filtradas.filter(
        (a) =>
          a.horario.inicio >= filtros.horario!.inicio &&
          a.horario.fim <= filtros.horario!.fim
      );
    }

    setAulasFiltradas(filtradas);
  }, [filtros, aulas]);

  return (
    <main>
      <header>
        <h1>Calendário de aulas</h1>
      </header>

      <section>
        <div className={`${cargo !== "adm" ? "hidden" : ""}`}>
          <button>Cadastrar aula</button>
        </div>
      </section>

      <section>
        <div>
          <h1>Filtros</h1>
        </div>
        <div>
          <div>
            <button onClick={() => setFiltros({ ...filtros, data: new Date() })}>
              Hoje
            </button>
          </div>
          <div>
            <button onClick={() => setFiltros({ ...filtros, horario: { inicio: "08:00", fim: "09:00" } })}>
              08:00 - 09:00
            </button>
          </div>

          {Filtro_adm_recep && <Filtro_adm_recep />}
        </div>
      </section>

      <section>
        <div>
          <BlocoCalendario filtros={filtros} aulas={aulasFiltradas} />
        </div>
      </section>
    </main>
  );
}
