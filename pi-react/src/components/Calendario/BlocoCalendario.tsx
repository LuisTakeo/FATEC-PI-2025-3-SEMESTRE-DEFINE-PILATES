import type { Aula } from "../../types/Aula";
import Botao from "./../Botao/Botao"
import { useState, useEffect } from "react";
import FiltrosCalendario from "./FiltrosCalendario"
import separadorRequisicoes from "../../.../../components/Calendario/separadorRequisicoes";


export default function BlocoCalendario() {

  const [dataInicio, setDataInicio] = useState<Date | null>(new Date());
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [cargo, setCargo] = useState(null)


  useEffect(() => {
    async function load() {
      const {aulas, cargo} = await separadorRequisicoes();
      setAulas(aulas);
      setCargo(cargo)
    }

    load();
  }, []);

  console.log("Aulas", aulas)
  console.log("Cargo", cargo)

  const parseAulaDate = (dateStr: string) =>
    dateStr ? new Date(dateStr) : null;


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
              <p>{aula.unidade.id === 1
                ? "Unidade: São Miguel Paulista"
                : aula.unidade.id === 2
                ? "Unidade: Itaquera"
                : aula.unidade.id === 3
                ? "Unidade: Vila Jacuí"
                : ""}</p>
              {cargo !== "instructor" && <p>Instrutor: {aula.instructor.nome}</p>}
              {/* {cargo !== "aluno" && <p>Quantidade de Alunos: {aula.alunos?.length}</p>} */}
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