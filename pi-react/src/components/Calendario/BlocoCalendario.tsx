import type { Aula } from "../../types/Aula";
import Botao from "./../Botao/Botao"
import { useState, useEffect } from "react";
import FiltrosCalendario from "./FiltrosCalendario"

interface BlocoCalendarioProps {
  aulas: Aula[]; 
  cargo?: "adm" | "recep" | "aluno" | "instru" | null;
}

export default function BlocoCalendario({ aulas, cargo }: BlocoCalendarioProps) {
  const [dataInicio, setDataInicio] = useState<Date | null>(new Date());
  const [horaInicio, setHoraInicio] = useState<number | null>(null);
  const [aulasDeHoje, setAulasDeHoje] = useState<Aula[]>([]);

  // Função para obter a data de hoje no formato dd/mm/yyyy
  const getDataHoje = () => {
    const hoje = new Date();
    const dia = hoje.getDate().toString().padStart(2, '0');
    const mes = (hoje.getMonth() + 1).toString().padStart(2, '0');
    const ano = hoje.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  // Efeito para filtrar aulas de hoje quando as aulas mudam
  useEffect(() => {
    const dataHoje = getDataHoje();
    const aulasHoje = aulas.filter(aula => aula.data === dataHoje);
    setAulasDeHoje(aulasHoje);
  }, [aulas]);

  // Lógica de filtro corrigida
  const aulasFiltradas = aulas.filter(aula => {
    // Se não há filtros aplicados, mostra apenas as aulas de hoje
    if (!dataInicio && !horaInicio) {
      const dataHoje = getDataHoje();
      return aula.data === dataHoje;
    }

    // Se há filtros aplicados, usa a lógica normal de filtro
    const [day, month, year] = aula.data.split("/");
    const aulaData = new Date(`${year}-${month}-${day}`);
    const aulaHora = new Date(`${year}-${month}-${day}T${aula.horario.inicio}`).getTime();

    const dentroData = !dataInicio || 
      aulaData.getTime() >= new Date(dataInicio.toDateString()).getTime();
    
    const dentroHora = !horaInicio || aulaHora >= horaInicio;

    return dentroData && dentroHora;
  });

  const Componente: React.FC = () => {
   return (
        <>
          {aulasFiltradas
            .sort((a, b) => {
              const [dayA, monthA, yearA] = a.data.split("/");
              const [dayB, monthB, yearB] = b.data.split("/");
              const dateA = new Date(`${yearA}-${monthA}-${dayA}T${a.horario.inicio}`);
              const dateB = new Date(`${yearB}-${monthB}-${dayB}T${b.horario.inicio}`);
              return dateA.getTime() - dateB.getTime();
            })
            .map((aula) => (
              <div 
                key={aula.id}
                className="bg-white shadow-2xl rounded-[8px] min-w-full min-h-[230px] 
                flex flex-col items-center justify-between px-[30px] py-[30px] gap-5 
                border-l-[10px] border-l-[var(--destaque)]
                md:flex-row md:min-h-[130px] 
                ">
                <div className="w-full flex flex-col gap-2 md:gap-3">

                  <p>{aula.unidade === "unidade 1" ? "Unidade: São Miguel Paulista" 
                  : aula.unidade === "unidade 2" ? "Unidade: Itaquera" 
                  : aula.unidade === "unidade 3" ? "Unidade: Vila Jacuí" : ""
                  }</p>

                  {cargo !== "instru" && (
                    <p>Instrutor: {aula.instrutor}</p>
                  )}

                  {cargo !== "aluno" && (
                    <p>Quantidade de Alunos: {aula.alunos.length}</p>
                  )}

                  <p>{aula.data} | {aula.horario.inicio} - {aula.horario.fim}</p>
                </div>
                <div className="w-full md:w-[40%]">
                  <Botao texto="Mais informações"/>
                </div>
              </div>
            ))     
          }
        </> 
      );
  };

  return (
    <section className="grid grid-cols-1 gap-10 w-full h-full px-[15%] text-[1.5rem] mt-10">
      <FiltrosCalendario
        dataInicio={dataInicio}
        setDataInicio={setDataInicio}
        horaInicio={horaInicio}
        setHoraInicio={setHoraInicio}
      />

      {aulasFiltradas.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl">
            {!dataInicio && !horaInicio 
              ? "Não há aulas agendadas para hoje." 
              : "Nenhuma aula encontrada com os filtros aplicados."
            }
          </p>
        </div>
      ) : (
        <Componente/>
      )}
    </section>
  );
}