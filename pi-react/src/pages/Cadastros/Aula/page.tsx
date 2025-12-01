import { useNavigate } from "react-router-dom";
// import Botao from "./../../../components/Botao/Botao"
import Input from "./../../../components/Input/Input"
import Estilizacoes from "../../../uteis/Estilizacoes";
import { useState } from "react";
import AulasDisponiveis from "./AulasDisponiveis";
import type { 
    // Instrutor, 
    Unidade } from "../../../types/InstrutorUnidade"
import { useEffect } from "react";

import { InstrutorUnidade } from "./../../../services/funcionarios/InstrutorUnidade"
import { fetchStudios } from "./../../../services/aula/fetchStudios"

export default function Cadastro_Aula(){

  const navigate = useNavigate();
    console.log(navigate)
    const [instrutorOptions, setInstrutorOptions] = useState<{value: string, label: string}[]>([]);
    const [unidadeOptions, setUnidadeOptions] = useState<{value: string, label: string}[]>([]);
    const [data, setData] = useState("")
    const [unidade, setUnidade] = useState<Unidade | any>()
    const [instrutor, setInstrutor] = useState("")
    const [pesquisarClicado, setPesquisarClicado] = useState(false)
    const [carregandoDados, setCarregandoDados] = useState(true)


    useEffect(() => {
        async function carregar() {
            setCarregandoDados(true);
            try {
                // Buscar instrutores
                const instrutores = await InstrutorUnidade();
                if (instrutores && Array.isArray(instrutores)) {
                    const options = [
                        { value: "", label: "Selecione um Instrutor" },
                        ...instrutores.map((i: any) => ({
                            value: i.id.toString(),
                            label: i.nome
                        }))
                    ];
                    setInstrutorOptions(options);
                } else {
                    console.error("Formato de resposta inválido:", instrutores);
                    setInstrutorOptions([{ value: "", label: "Erro ao carregar instrutores" }]);
                }

                // Buscar unidades/studios
                const studios = await fetchStudios();
                if (studios && Array.isArray(studios)) {
                    const studioOptions = [
                        { value: "", label: "Selecione Unidade" },
                        ...studios.map((studio) => ({
                            value: studio.id.toString(),
                            label: studio.name
                        }))
                    ];
                    setUnidadeOptions(studioOptions);
                } else {
                    console.error("Formato de resposta inválido:", studios);
                    setUnidadeOptions([{ value: "", label: "Erro ao carregar unidades" }]);
                }
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                setInstrutorOptions([{ value: "", label: "Erro ao carregar instrutores" }]);
                setUnidadeOptions([{ value: "", label: "Erro ao carregar unidades" }]);
            } finally {
                setCarregandoDados(false);
            }
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
                        options={unidadeOptions}
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

                <div className="w-full flex justify-center mt-6">
                    <button
                        type="button"
                        onClick={() => {
                            if (!unidade || !instrutor || !data) {
                                alert("Por favor, preencha todos os campos (Unidade, Instrutor e Data)");
                                return;
                            }
                            setPesquisarClicado(true);
                        }}
                        disabled={carregandoDados}
                        className="w-full max-w-md flex justify-center items-center p-5 m-0 
                        text-white hover:!text-white text-[1.5rem] md:text-[1.3rem] font-semibold text-center tracking-[1px] rounded-md whitespace-nowrap h-[50px] cursor-pointer 
                        transition-all duration-200 bg-[var(--azul-segundario)] hover:!bg-[var(--destaque)]
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {carregandoDados ? "Carregando..." : "Pesquisar Horários Disponíveis"}
                    </button>
                </div>

                <AulasDisponiveis
                    unidade={unidade?.valor}
                    instrutor={instrutor}
                    data={data}
                    onPesquisar={pesquisarClicado}
                />

            </section>
        </main>
    )
}