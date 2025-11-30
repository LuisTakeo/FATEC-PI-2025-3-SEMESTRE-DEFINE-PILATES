import { useNavigate } from "react-router-dom";
import Botao from "./../../../components/Botao/Botao"
import Input from "./../../../components/Input/Input"
import Estilizacoes from "../../../uteis/Estilizacoes";
import { useState } from "react";
import AulasDisponiveis from "./AulasDisponiveis";
import { API_BASE_URL } from "../../../config/api"
import type { Instrutor, Unidade } from "../../../types/InstrutorUnidade"
import { useEffect } from "react";

import { InstrutorUnidade } from "./../../../services/funcionarios/InstrutorUnidade"

export default function Cadastro_Aula(){

  const navigate = useNavigate();

    const [instrutorOptions, setInstrutorOptions] = useState<{value: string, label: string}[]>([]);
    const [data, setData] = useState("")
    const [unidade, setUnidade] = useState<Unidade | any>()
    const [instrutor, setInstrutor] = useState("")


    useEffect(() => {
        async function carregar() {
            const instrutores = await InstrutorUnidade();

            const options = instrutores.map((i: any) => ({
            value: i.id,
            label: i.nome
            }));


            setInstrutorOptions(options)
        }

        carregar();
    }, []);
  
    return(
        <main className="w-full h-full flex flex-col px-[15%] py-[5%]">
            <header className="w-full h-full flex gap-5 flex-col mb-8 md:flex-row">
                <div className={`${Estilizacoes.titulo_principal} w-full`}>
                    <h1>Cadastrar aula</h1>
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
                                {value:"", label:"Selecione Unidade"},
                                {value:"1", label:"São Miguel Paulista"},
                                {value:"2", label:"Itaquera"},
                                {value:"3", label:"Vila Jacuí"} 
                            ]}
                            onChange={(e) => {
                                const target = e.target
                                const valor = target.value
                                const select = target as HTMLSelectElement;
                                const label = select.options[select.selectedIndex]?.text ?? ""
                                setUnidade({valor: valor, nome: label})
                                console.log(unidade)
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
                                onChange={(e) => {
                                    setInstrutor(e.target.value)
                                    console.log(e.target.value)
                                }}
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
                                    const value = e.target.value
                                    if (value) {
                                        const [y, m, d] = value.split("-").map(Number)
                                        const diaFormatado = d.toString().padStart(2, '0')
                                        const mesFormatado = m.toString().padStart(2, '0')
                                        const novaData = `${diaFormatado}-${mesFormatado}-${y}`
                                        setData(novaData)
                                        console.log(novaData)
                                    } else {
                                        setData("")
                                    }
                                }}
                            />
                        </div>

                    </div>

                    <AulasDisponiveis
                        unidade={unidade?.valor}
                        instrutor={instrutor}
                        data={data}
                    />

                </section>

            </form>
        </main>
    )
}