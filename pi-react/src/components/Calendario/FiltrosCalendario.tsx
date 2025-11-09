import Input from "./../Input/Input"
import Botao from "./../Botao/Botao"
import Estilizacoes from "../../uteis/Estilizacoes";

interface FiltrosCalendarioProps {
  dataInicio: Date | null;
  setDataInicio: (date: Date | null) => void;
}

export default function FiltrosCalendario({
  dataInicio, setDataInicio
}: FiltrosCalendarioProps) {

  const mesesDoAno: string[] = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  
  const limparFiltros = () => {
    setDataInicio(new Date());
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
      md:text-[1.5rem] lg:flex-row md:items-end">
        <div className="flex flex-col w-full gap-5 lg:flex-row">
          <div className="flex flex-col w-full gap-5">
            <h1>Filtrar por Data</h1>
            <Input 
              id="data"
              type="date" 
              value={dataInicio ? dataInicio.toISOString().split('T')[0] : ''}
              onChange={e => setDataInicio(e.target.value ? new Date(e.target.value) : null)} 
            />
          </div>

        </div>

        <Botao texto="Limpar" onClick={limparFiltros}/>
      </div>
    </section>
  )
}