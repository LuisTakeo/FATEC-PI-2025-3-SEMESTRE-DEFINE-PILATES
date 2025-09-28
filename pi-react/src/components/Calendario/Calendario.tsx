import Estilizacoes from "../../model/Estilizacoes";
import { useState } from "react";

export default function Calendario(){
    const meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    const diaSemana = [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
    const hoje: Date = new Date()
    const mesAtual: number = hoje.getMonth();
    const mesTexto: string = meses[mesAtual]
    const anoAtual: number = hoje.getFullYear();

    const primeiroDia = new Date(anoAtual, mesAtual, 1).getDate()
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0).getDate();

     const dias = [
    ...Array(primeiroDia).fill(null),
    ...Array.from({ length: ultimoDia }, (_, i) => i + 1),
     ]

    const cargo = localStorage.getItem('cargo');
    const cargoObj = cargo ? JSON.parse(cargo) : null;

    const isAdmRecep = cargo === "adm" || cargo === "recep";
    const isAlunoInstr = cargo === "aluno" || cargo === "instr";

    const abrirDia = (dia: number | null) => {
        console.log(dia)
    }

    const [mes, setMes] = useState(mesAtual);
    const [ano, setAno] = useState(anoAtual);

      const mesAnterior = () => {
    if (mes === 0) {
      setMes(11);
      setAno(ano - 1);
    } else {
      setMes(mes - 1);
    }
  };

  const mesProximo = () => {
    if (mes === 11) {
      setMes(0);
      setAno(ano + 1);
    } else {
      setMes(mes + 1);
    }
  };


    return(
        <div className="w-full h-full flex flex-col justify-center items-center border">
            <header className="w-full h-full mt-[5%] flex flex-row justify-center items-center">
                <div>
                    <button onClick={mesAnterior}>{"<="}</button>
                </div>
                <div>
                    <h1 className={`${Estilizacoes.titulo_principal} text-white`}>{meses[mes]} de {ano}</h1>
                </div>
                <div>
                    <button onClick={mesProximo}>{"=>"}</button>
                </div>
            </header>
            <main>
                <section id="calendario">
                    <div className="grid grid-cols-7 grap-10 list-none text-[1.2rem]">
                        {diaSemana.map((dia, i) => (
                            <li key={i}>{dia}</li>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 list-none gap-10 text-[1.2rem]"> 
                        {dias.map((dia, index) => (
                            <div
                            key={index}
                            className=""
                            onClick={() => abrirDia(dia)}
                            >
                                {dia || ""}
                            </div>
                        ))}
                    </div>

                </section>

                <section id="filtros">
                    <div id="filtro-unidade">
                        {isAdmRecep && (
                        <div>
                            <label htmlFor="unidades">Unidade</label>
                            <select name="unidades">
                                <option value="unidade-itaquera">Unidade Itaquera</option>
                                <option value="unidade-saomiguel">Unidade São Miguel Paulista</option>
                            </select>
                        </div>
                        )}
                    </div>

                    <div>
                        {isAlunoInstr && (
                        <div>
                            <label htmlFor="ordem">Ordem</label>
                            <select name="ordem">
                                <option value="recente">Mais recente</option>
                                <option value="antigo">Mais antigo</option>
                            </select>
                        </div>
                        )}
                    </div>

                </section>
            </main>

            
        </div>
    )
}