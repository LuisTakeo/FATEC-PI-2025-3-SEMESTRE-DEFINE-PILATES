import Estilizacoes from "../../model/Estilizacoes";
import { useEffect, useState } from "react";

export default function Calendario(){
    const meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    const diaSemana = [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
    const hoje: Date = new Date()
    const mesAtual: number = hoje.getMonth();
    const anoAtual: number = hoje.getFullYear();

    const cargo = localStorage.getItem('cargo');
    const cargoObj = cargo ? JSON.parse(cargo) : null;

    const isAdmRecep = cargo === "adm" || cargo === "recep";
    const isAlunoInstr = cargo === "aluno" || cargo === "instr";

    const [diaSelecionado, setDiaSelecionado] = useState<number | null>(null);

    const abrirDia = (dia: number | null) => {
        if (dia === null) return;
        if(diaSelecionado === dia){
            setDiaSelecionado(null)
        }else{
            setDiaSelecionado(dia)
        }
    }

    const [mes, setMes] = useState(mesAtual);
    const [ano, setAno] = useState(anoAtual);
    const [dias, setDias] = useState<number[]>([]);

    useEffect(() => {
        atualizarDias(ano, mes)
    }, [])

    function atualizarDias(anoNovo: number, mesNovo: number) {
    const primeiroDia = new Date(anoNovo, mesNovo, 1).getDay(); // dia da semana
    const ultimoDia = new Date(anoNovo, mesNovo + 1, 0).getDate(); // último dia do mês

    const novosDias = [
        ...Array(primeiroDia).fill(null), // espaços vazios até o primeiro dia
        ...Array.from({ length: ultimoDia }, (_, i) => i + 1),
    ];

    setDias(novosDias);
    }

    function mudarMes(value: "before" | "after") {
    let novoMes = mes;
    let novoAno = ano;

    if (value === "before") {
        if (mes === 0) {
        novoMes = 11;
        novoAno = ano - 1;
        } else {
        novoMes = mes - 1;
        }
    } else {
        if (mes === 11) {
        novoMes = 0;
        novoAno = ano + 1;
        } else {
        novoMes = mes + 1;
        }
    }

    setMes(novoMes);
    setAno(novoAno);
    atualizarDias(novoAno, novoMes);
    }

    


    return(
        <div className="w-full h-full flex flex-col justify-center items-center border">
            <header className="w-full h-full mt-[5%] flex flex-row justify-center items-center gap-5">
                <div className="bg-[var(--background)] w-8 h-8 rounded-full flex justify-center cursor-pointer">
                    <button onClick={() => mudarMes("before")}>{"<="}</button>
                </div>
                <div>
                    <h1 className={`${Estilizacoes.titulo_principal} text-white`}>{meses[mes]} de {ano}</h1>
                </div>
                <div 
                    className="bg-[var(--background)] w-8 h-8 rounded-full flex justify-center cursor-pointer">
                    <button onClick={() => mudarMes("after")}>{"=>"}</button>
                </div>
            </header>
            <main>
                <section id="calendario">
                    <div className="grid grid-cols-7 grap-10 list-none text-[1.2rem] w-full gap-6 py-5 font-semibold">
                        {diaSemana.map((dia, i) => (
                            <li key={i}>{dia}</li>
                        ))}
                    </div>

                    <div 
                    className="grid grid-cols-7 list-none gap-0 text-[1.2rem]
                    "> 
                        {dias.map((dia, index) => (
                            <div
                            key={index}
                            className={`border p-5  font-semibold cursor-pointer 
                            ${diaSelecionado == dia ? "bg-[var(--background)]" : "bg-transparent"}
                            hover:bg-[var(--background)]`}
                            onClick={() => {if (typeof dia === "number" && dia >= 1 && dia <=31) {abrirDia(dia)} }}
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