import type { Aula } from "../../types/Aula";
import Botao from "./../Botao/Botao"
import { useState, useEffect } from "react";
import FiltrosCalendario from "./FiltrosCalendario"
import separadorRequisicoes from "../../.../../components/Calendario/separadorRequisicoes";
import presencaInstrutor from "../../services/funcionarios/presencaInstrutor";

export default function BlocoCalendario() {

  const [dataInicio, setDataInicio] = useState<Date | null>(new Date());
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [cargo, setCargo] = useState(null)
  // const [id_login, SetId_login] = useState(Number)


  useEffect(() => {
    async function load() {
      const resultado = await separadorRequisicoes();
      if (resultado) {
        const {aulas, cargo, id} = resultado;
        console.log(id)
        setAulas(aulas);
        setCargo(cargo);
        // SetId_login(id);
      }
    }

    load();
  }, []);

  console.log("Aulas carregadas:", aulas)
  console.log("Cargo:", cargo)
  





 
  const aulasFiltradas = aulas
  .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())        
  .filter((aula) => {
        if (!dataInicio) return true
        const [dia, mes, ano] = aula.data.split("-").map(d => parseInt(d))
        const data_aula = new Date(ano, mes - 1, dia)
        return data_aula >= dataInicio
  })

  async function confirmarPresencaInstructor(id) {  
    await presencaInstrutor(id)
  }

  console.log("AULAS FILTRADAS",aulasFiltradas)

  

  return(
   
    
      <section className="grid grid-cols-1 gap-10 w-full h-full px-[15%] text-[1.5rem] mt-10">

        <FiltrosCalendario
          dataInicio={dataInicio}
          setDataInicio={setDataInicio}
        />

        {aulasFiltradas.length === 0 ? (
          <div className="flex flex-row w-full h-full items-end justify-center gap-5 p-15">
            <div>
              <h1>Não existe nenhuma aula nesta data, procure por outras datas.</h1>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#26a269" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-dumbbell-icon lucide-dumbbell"><path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"/><path d="m2.5 21.5 1.4-1.4"/><path d="m20.1 3.9 1.4-1.4"/><path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"/><path d="m9.6 14.4 4.8-4.8"/></svg>            </div>
          </div>
          ) : (
          aulasFiltradas.map(aula => (
              <div
                key={aula.id}
                className="bg-white shadow-2xl rounded-[8px] min-w-full min-h-[230px] flex flex-col items-center justify-between px-[30px] py-[30px] gap-5 border-l-[10px] border-l-[var(--destaque)] md:flex-row md:min-h-[130px]"
                >
                <div className="w-full flex flex-col gap-2 md:gap-3">
                    <p>{aula.data.replace('-','/').replace('-','/')}</p>
                    <p>{aula.horario}</p>
                    <p>{aula.unidade.id === 1
                    ? "Unidade: São Miguel Paulista"
                    : aula.unidade.id === 2
                    ? "Unidade: Itaquera"
                    : aula.unidade.id === 3
                    ? "Unidade: Vila Jacuí"
                    : ""}</p>

                    {(cargo === "Instructor" || cargo === "Administrator" || cargo === "Receptionist") && aula.alunos && aula.alunos.length > 0 && (
                      <div className="mt-2">
                        <p className="font-semibold">Alunos matriculados:</p>
                        {aula.alunos.map((aluno: any) => (
                          <p key={aluno.id_student} className="text-sm ml-2">• {aluno.nome}</p>
                        ))}
                      </div>
                    )}
                    
                    {cargo !== "Instructor" && (<p>Instrutor: {aula.instructor.nome}</p>)}
                </div>
                <div className="w-full md:w-[40%] flex flex-col gap-5">

                    <Botao texto="Mais informações" type="button"
                    onClick={() =>
                    {if (cargo == "student"){  
                    alert(`Aula do tipo ${aula.tipo}, ela ocorrerá as ${aula.horario} na ${aula.unidade.id === 1
                    ? "unidade São Miguel Paulista, endereço R. José Aldo Piassi, 165 - São Miguel Paulista, São Paulo - SP, 08011-300"
                    : aula.unidade.id === 2
                    ? "unidade: Itaquera, endereço Estrada Itaquera Guaianazes, 45 - Parada XV de Novembro, São Paulo - SP, 08246-000"
                    : aula.unidade.id === 3
                    ? "unidade: Vila Jacuí, endereço Rua Santana de Pirapama, 91 - Vila Jacuí, São Paulo - SP, 08060-370"
                    : ""}, com o(a) instrutor/instrutora ${aula.instructor.nome}` + `. Caso você desmarque a aula em 3 horas antes do início dela, ela poderá ser reposta, caso desmarque depois, não terá direito de reposição e perderá a aula.`)
                    }else if (cargo == "instructor"){
                      <>
                        <div>
                            <Botao texto="Confirmar presença" type="button" onClick={() => confirmarPresencaInstructor(aula.id ? aula.id : null)}/>
                        </div>
                      </>
                    }
                    else{
                    alert(`Aula do tipo ${aula.tipo}, ela ocorrerá as ${aula.horario} na ${aula.unidade.id === 1
                    ? "unidade São Miguel Paulista, endereço R. José Aldo Piassi, 165 - São Miguel Paulista, São Paulo - SP, 08011-300"
                    : aula.unidade.id === 2
                    ? "unidade: Itaquera, endereço Estrada Itaquera Guaianazes, 45 - Parada XV de Novembro, São Paulo - SP, 08246-000"
                    : aula.unidade.id === 3
                    ? "unidade: Vila Jacuí, endereço Rua Santana de Pirapama, 91 - Vila Jacuí, São Paulo - SP, 08060-370"
                    : ""}, com o(a) instrutor/instrutora ${aula.instructor.nome}.`)
                    }
                  }}
                    />
                </div>
            </div>
          ))
        )}

      </section>
      
  )
    
  

}