import type { Aula } from "../../types/Aula";
import Botao from "./../Botao/Botao"
import { useState } from "react";
import FiltrosCalendario from "./FiltrosCalendario"

interface BlocoCalendarioProps {
  aulas: Aula[]; 
  cargo?: "adm" | "recep" | "aluno" | "instru" | null;
}

function getBrazilToday() {
  try {
    const parts = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(new Date());
    const year = Number(parts.find(p => p.type === 'year')?.value ?? new Date().getFullYear());
    const month = Number(parts.find(p => p.type === 'month')?.value ?? (new Date().getMonth() + 1));
    const day = Number(parts.find(p => p.type === 'day')?.value ?? new Date().getDate());
    return new Date(year, month - 1, day);
  } catch (e) {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }
}

export default function BlocoCalendario({ aulas, cargo }: BlocoCalendarioProps) {
  const [dataInicio, setDataInicio] = useState<Date | null>(getBrazilToday());

  const parseAulaDate = (dateStr: string) => {
    if (!dateStr) return null;
    if (dateStr.includes('/')) {
      const [d, m, y] = dateStr.split('/').map(x => Number(x));
      return new Date(y, (m || 1) - 1, d || 1);
    }
    if (dateStr.includes('-')) {
      const [y, m, d] = dateStr.split('-').map(x => Number(x));
      return new Date(y || new Date().getFullYear(), (m || 1) - 1, d || 1);
    }
    return new Date(dateStr);
  };

  function isSameDate(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  const aulasFiltradas = aulas.filter(aula => {
    const aulaDateObj = parseAulaDate(aula.data);
    if (!aulaDateObj) return false;

    const aulaDateOnly = new Date(aulaDateObj.getFullYear(), aulaDateObj.getMonth(), aulaDateObj.getDate());

    if (!dataInicio) return false;

    const dataInicioOnly = new Date(dataInicio.getFullYear(), dataInicio.getMonth(), dataInicio.getDate());
    return aulaDateOnly.getTime() >= dataInicioOnly.getTime();
  });

  const Componente: React.FC = () => (
    <>
      {aulasFiltradas
        .sort((a, b) => {
          const dateAObj = parseAulaDate(a.data) || new Date();
          const dateBObj = parseAulaDate(b.data) || new Date();
          return dateAObj.getTime() - dateBObj.getTime();
        })
        .map((aula) => (
          <div
            key={aula.id}
            className="bg-white shadow-2xl rounded-[8px] min-w-full min-h-[230px] flex flex-col items-center justify-between px-[30px] py-[30px] gap-5 border-l-[10px] border-l-[var(--destaque)] md:flex-row md:min-h-[130px]"
          >
            <div className="w-full flex flex-col gap-2 md:gap-3">
              <p>{aula.unidade === "unidade 1"
                ? "Unidade: São Miguel Paulista"
                : aula.unidade === "unidade 2"
                ? "Unidade: Itaquera"
                : aula.unidade === "unidade 3"
                ? "Unidade: Vila Jacuí"
                : ""}</p>
              {cargo !== "instru" && <p>Instrutor: {aula.instrutor}</p>}
              {cargo !== "aluno" && <p>Quantidade de Alunos: {aula.alunos.length}</p>}
              <p>{aula.data}</p>
            </div>
            <div className="w-full md:w-[40%]">
              <Botao texto="Mais informações" />
            </div>
          </div>
        ))}
    </>
  );

  return (
    <section className="grid grid-cols-1 gap-10 w-full h-full px-[15%] text-[1.5rem] mt-10">
      <FiltrosCalendario
        dataInicio={dataInicio}
        setDataInicio={setDataInicio}
      />

      {aulasFiltradas.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl">
            {(!dataInicio || isSameDate(dataInicio, new Date()))
              ? "Não há aulas agendadas para hoje." 
              : "Nenhuma aula encontrada com o filtro de data."
            }
          </p>
        </div>
      ) : (
        <Componente/>
      )}
    </section>
  );
}