import type { Filtros } from "../../types/Filtros";
import type { Aula } from "../../types/Aula";
import Botao from "./../Botao/Botao"
import { useState } from "react";
import FiltrosCalendario from "./FiltrosCalendario"

interface BlocoCalendarioProps {
  filtros: Filtros;
  aulas: Aula[]; 
  cargo: string;
}

export default function BlocoCalendario({ filtros, aulas, cargo }: BlocoCalendarioProps) {

  // const cargo: string = localStorage.getItem(KEY_USER_ROLE)

  const Componente: React.FC = () => {
    if (cargo === "instru"){
      return(
        aulas.map((aula) => (
          <div key={aula.id}>
            <p>{aula.data} | {aula.horario.inicio} - {aula.horario.fim}</p>
          </div>
        ))
      )
    }else if (cargo === "adm" || cargo === "recep" ){
      return(
        <>
        {[...aulas]
          .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
          // .filter((aula) => new Date(aula.data) >= new Date(datainicio) && new Date(aula.data) <= new Date(datafim))          
          .map((aula) => (
            <div 
              key={aula.id}
              className="bg-white shadow-2xl rounded-[8px] min-w-full min-h-[230px] 
              flex flex-col items-center justify-between px-[30px] py-[30px] gap-5 
              border-l-[10px] border-l-[var(--destaque)]
              md:flex-row md:min-h-[130px] 
              ">
              <div className="w-full flex flex-col gap-2
                md:gap-3">
                <p>{aula.unidade}</p>
                <p>Instrutor: {aula.instrutor}</p>
                <p>Quantidade de Alunos: {aula.alunos.length}</p>
                <p>{aula.data} | {aula.horario.inicio} - {aula.horario.fim}</p>
              </div>
              <div className="w-full md:w-[40%]">
                <Botao texto="Mais informações"/>
              </div>
            </div>
          ))     
        }
        </> 
      )}else{
        // ALUNO
        return(
          <>

          </>
        )
      }
  }

  return (
    <section className="grid grid-cols-1 gap-10 w-full h-full px-[15%] text-[1.5rem] mt-10
    ">

      <FiltrosCalendario/>

      <Componente/>
    </section>
  );
}



