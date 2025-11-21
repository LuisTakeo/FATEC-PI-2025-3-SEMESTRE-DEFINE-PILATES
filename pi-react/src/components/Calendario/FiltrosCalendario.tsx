import Input from "./../Input/Input"
import Botao from "./../Botao/Botao"
import Estilizacoes from "../../uteis/Estilizacoes";

interface FiltrosCalendarioProps {
  dataInicio: Date | null;
  setDataInicio: (date: Date | null) => void;
}

//api/aulas?11-11-2025

export default function FiltrosCalendario({
  dataInicio, setDataInicio
}: FiltrosCalendarioProps) {

  const mesesDoAno: string[] = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  
  const limparFiltros = () => {
    const d = new Date();
    setDataInicio(new Date(d.getFullYear(), d.getMonth(), d.getDate()));
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
              value={dataInicio ? `${dataInicio.getFullYear()}-${String(dataInicio.getMonth()+1).padStart(2,'0')}-${dataInicio.getDate()}` : ''}
              onChange={e => {
                const v = e.target.value; // 'YYYY-MM-DD'
                if (!v) {
                  setDataInicio(null);
                  return;
                }
                const [y, m, d] = v.split('-').map(Number);
                setDataInicio(new Date(y, (m || 1) - 1, d || 1));
              }}
            />
          </div>

        </div>

        <Botao texto="Limpar" onClick={limparFiltros}/>
      </div>
    </section>
  )
}