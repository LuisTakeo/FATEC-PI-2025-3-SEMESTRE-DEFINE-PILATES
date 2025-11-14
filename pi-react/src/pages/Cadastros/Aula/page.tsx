import { useNavigate } from "react-router-dom";
import Botao from "./../../../components/Botao/Botao"
import Input from "./../../../components/Input/Input"
import Estilizacoes from "../../../uteis/Estilizacoes";
import { useState } from "react";
import AulasDisponiveis from "./AulasDisponiveis";
import { API_BASE_URL } from "../../../config/api"
import type { Instrutor, Unidade } from "../../../types/InstrutorUnidade"
import { useEffect } from "react";

export default function Cadastro_Aula(){

  const navigate = useNavigate();

    const [instrutorOptions, setInstrutorOptions] = useState<{value: string, label: string}[]>([]);
    const [data, setData] = useState("")
    const [unidade, setUnidade] = useState<Unidade | any>()
    const [instrutor, setInstrutor] = useState("")

    useEffect(() => {
        if (!unidade) return;

        const fetchInstrutores = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/class`);
                if (!response.ok) throw new Error("Erro ao buscar aulas");

                const lista = await response.json();

                const filtrados = lista
                    .filter((i: any) => i.unidade === unidade.valor)
                    .map((i: any) => ({
                        value: i.Instructors.nome,
                        label: i.Instructors.nome
                    }));

                setInstrutorOptions(filtrados);
            } catch (err) {
                console.error(err);
            }
        };

        fetchInstrutores();
    }, [unidade]);


 
    return(
        <main className="w-full h-full flex flex-col px-[15%]">
            <header className="w-full h-full flex gap-5 flex-col md:flex-row">
                <div className={`${Estilizacoes.titulo_principal} w-full`}>
                    <h1>Cadastrar aula</h1>
                </div>
                <div className="w-full">
                    <Botao texto="Voltar a página anterior" type="button" onClick={() => navigate(-1)}/>
                </div>
            </header>
            <form>
                <section className="w-full h-full flex flex-col justify-center items-start gap-8 py-8">
                    <div className="flex flec-col lg:flex-row gap-10">
                        
                        <div>
                            <div>
                                <h1 className={Estilizacoes.titulo_segundario}>Unidade</h1>
                            </div>
                            <Input
                            id="unidade-input"
                            name="unidade-input"
                            as="select"
                            placeholder=""
                            options={[
                                {value:"unidade 1", label:"São Miguel Paulista"},
                                {value:"unidade 2", label:"Itaquera"},
                                {value:"unidade 3", label:"Vila Jacuí"} 
                            ]}
                            onChange={(e) => {
                                const target = e.target
                                const valor = target.value
                                const select = target as HTMLSelectElement;
                                const label = select.options[select.selectedIndex]?.text ?? ""
                                setUnidade({valor: valor, nome: label})
                            }}
                            />
                        </div>

                        <div>
                            <div>
                                <h1 className={Estilizacoes.titulo_segundario}>Instrutores</h1>
                            </div>
                            <Input
                                id="instrutor-input"
                                name="instrutor-input"
                                as="select"
                                options={instrutorOptions}
                                onChange={(e) => setInstrutor(e.target.value)}
                            />
                        </div>

                        <div>
                            <div>
                                <h1 className={Estilizacoes.titulo_segundario}>Data</h1>
                            </div>
                            <Input
                                id="data-input"
                                name="data-input"
                                type="date"
                                onChange={(e) => {
                                    const data = new Date(e.target.value)
                                    const dia = data.getDate()
                                    const mes = data.getMonth()
                                    const ano = data.getFullYear()
                                    setData(`${dia}-${mes}-${ano}`)
                                }}
                            />
                        </div>

                    </div>

                    <AulasDisponiveis
                        unidade={unidade}
                        instrutor={instrutor}
                        data={data}
                    />

                </section>

            </form>
        </main>
    )
}