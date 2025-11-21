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

  

 
  return(
    
    <>
        <section className="grid grid-cols-1 gap-10 w-full h-full px-[15%] text-[1.5rem] mt-10">



        {aulas.map((aula) => (
            
        <div
            key={aula.id}
            className="bg-white shadow-2xl rounded-[8px] min-w-full min-h-[230px] flex flex-col items-center justify-between px-[30px] py-[30px] gap-5 border-l-[10px] border-l-[var(--destaque)] md:flex-row md:min-h-[130px]"
            >
            <div className="w-full flex flex-col gap-2 md:gap-3">
                <p>{aula.data.replace('-','/').replace('-','/')}</p>
                <p>{aula.unidade.id === 1
                ? "Unidade: São Miguel Paulista"
                : aula.unidade.id === 2
                ? "Unidade: Itaquera"
                : aula.unidade.id === 3
                ? "Unidade: Vila Jacuí"
                : ""}</p>
                {/* {cargo !== "aluno" && <p>Quantidade de Alunos: {aula.alunos?.length}</p>} */}
                {cargo !== "instructor" && <p>Instrutor: {aula.instructor.nome}</p>}
            </div>
            <div className="w-full md:w-[40%] flex flex-col gap-5">

                <Botao texto="Mais informações" type="button"/>

                {aula.data > new Date().toLocaleDateString('pt-BR') && (
                    <Botao texto="Desmarcar presença" type="button" />
                )}
            </div>
        </div>
         
            
        ))}
        </section>
    </>
  )
    
  

}