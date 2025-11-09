import Input from "./../Input/Input"
import Botao from "./../Botao/Botao"
import Estilizacoes from "../../uteis/Estilizacoes";

interface FiltrosCalendarioProps {
  dataInicio: Date | null;
  setDataInicio: (date: Date | null) => void;
  horaInicio: number | null;
  setHoraInicio: (time: number | null) => void;
}

export default function FiltrosCalendario({
  dataInicio, setDataInicio,
  horaInicio, setHoraInicio
}: FiltrosCalendarioProps){

  const mesesDoAno: string[] = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  
  const limparFiltros = () => {
    setDataInicio(new Date());
    setHoraInicio(null);

  }


  return (
    <section>
      <div className="flex flex-row gap-2 ">
        {dataInicio && (
          <h1 className={Estilizacoes.titulo_principal}
          >Todas as aulas de {dataInicio.getDate()} de {mesesDoAno[(dataInicio.getMonth())]} de {dataInicio.getFullYear()}</h1>
        )}
      </div>

      <div className="flex flex-col  w-full h-auto text-[2rem] py-10 gap-10 items-center justify-between 
      md:text-[1.5rem] lg:flex-row md:items-start">
        <div className="flex flex-col w-full gap-5 lg:flex-row">
          <div className="flex flex-col w-full gap-5">
            <h1>Filtrar por Data</h1>
            <Input 
              id="data"
              type="date" 
              label="Data início" 
              value={dataInicio ? dataInicio.toISOString().split('T')[0] : ''}
              onChange={e => setDataInicio(e.target.value ? new Date(e.target.value) : null)} 
            />
          </div>

          <div className="flex flex-col w-full gap-5">
            <h1>Filtrar por Horário</h1>
            <Input
                  label="Hora de Início"
                  type="select"
                  as="select"
                  options={[
                      { value: "07:00", label: "07:00" },
                      { value: "08:00", label: "08:00" },
                      { value: "09:00", label: "09:00" },
                      { value: "10:00", label: "10:00" },
                      { value: "11:00", label: "11:00" },
                      { value: "12:00", label: "12:00" },
                      { value: "13:00", label: "13:00" },
                      { value: "14:00", label: "14:00" },
                      { value: "15:00", label: "15:00" },
                      { value: "16:00", label: "16:00" },
                      { value: "17:00", label: "17:00" },
                      { value: "18:00", label: "18:00" },
                      { value: "19:00", label: "19:00" },
                      { value: "20:00", label: "20:00" },
                      { value: "21:00", label: "21:00" },
                  ]}
                  onChange={e => setHoraInicio(e.target.value ? new Date(`1970-01-01T${e.target.value}`).getTime() : null)} 
              />
          </div>
        </div>

        <Botao texto="Limpar" onClick={limparFiltros}/>
      </div>
    </section>
  )
}