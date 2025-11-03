import { useState } from "react";
import Input from "./../Input/Input"
import Botao from "./../Botao/Botao" // Importe o componente Botao

export default function FiltrosCalendario(){
  const mesesDoAno = [
    "Janeiro",
    "Fevereiro", 
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];

    const dataAtual = new Date()

    const [dataInicio, setDataInicio] = useState(dataAtual)
    const [dataFim, setDataFim] = useState(dataAtual)
    const [allowDataFim, setAllowDataFim] = useState(false)

    const [horaInicio, setHoraInicio] = useState(dataAtual.getTime())
    const [horaFim, setHoraFim] = useState(dataAtual.getTime())

  return (
    <>
    <section>
      <div className="flex flex-row gap-2 ">
        <h1 className="text-[2.2rem] text-[var(--destaque)] font-semibold
        md:text-[2.5rem]">
        {dataInicio.getDate()} de {mesesDoAno[dataInicio.getMonth()]} de {dataInicio.getFullYear()}
        </h1>
        {allowDataFim && (
           <h1
            className="text-[1.7rem] text-[var(--destaque)] font-semibold
            md:text-[2rem]"
           >- {dataFim.getDate() + 1} de {mesesDoAno[dataFim.getMonth()]} de {dataFim.getFullYear()}</h1> 
        )}
      </div>

      <div className="flex flex-col w-full h-auto text-[2rem] py-10 gap-10 items-center justify-between 
            md:flex-row md:text-[1.5rem] 
            ">
            <div className="w-full">
                <h1 className="text-[2rem] font-semibold">Filtros</h1>
            </div>

            <div className="flex flex-col w-full gap-5 lg:flex-row">
                <div className="flex flex-col w-full gap-5">
                    <div>
                        <h1>Filtrar por Data</h1>
                    </div>
                    <div className="flex flex-col gap-5 
                    md:flex-row">
                        <Input
                            label="Data inicio" 
                            type="date"
                            onChange={(e) => {
                                if (e.target.value === ""){
                                    setDataInicio(new Date())
                                }else{
                                    setDataInicio(new Date(e.target.value))
                                }
                            }}
                        />
                        <Input
                            label="Data fim" 
                            type="date"
                            onChange={(e) => {
                                if (e.target.value === ""){
                                    setAllowDataFim(false)
                                }else{
                                    setDataFim(new Date(e.target.value))
                                    setAllowDataFim(true)
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full gap-5 ">
                    <div>
                        <h1>Filtrar por Horário</h1>
                    </div>
                    <div className="flex flex-col gap-5 
                    md:flex-row">
                        <Input
                            label="Hora inicio" 
                            type="time"
                            onChange={(e) => {setHoraInicio(new Date(e.target.value).getTime())}}
                        />
                        <Input
                            label="Hora fim" 
                            type="time"
                            onChange={(e) => {setHoraFim(new Date(e.target.value).getTime())}}
                        />
                    </div>
                </div>
            </div>

            <Botao texto="Limpar" onClick={() => {}}/>         
      </div>
    </section>
    </>
  )
}