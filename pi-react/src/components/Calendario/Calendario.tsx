import Estilizacoes from "../../model/Estilizacoes";

export default function Calendario(){
    const meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

    const hoje: Date = new Date()
    const mes: string = meses[hoje.getMonth()]
    const ano: number = hoje.getFullYear();

    const cargo = localStorage.getItem('cargo');
    const cargoObj = cargo ? JSON.parse(cargo) : null;

    const isAdmRecep = cargo === "adm" || cargo === "recep";
    const isAlunoInstr = cargo === "aluno" || cargo === "instr";

    return(
        <div>
        <header className="w-full h-full mt-[5%] ">
            <div>
                <h1 className={`${Estilizacoes.titulo_principal} text-white`}>{mes} de {ano}</h1>
            </div>
        </header>
        <main>
            <section id="calendario">

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