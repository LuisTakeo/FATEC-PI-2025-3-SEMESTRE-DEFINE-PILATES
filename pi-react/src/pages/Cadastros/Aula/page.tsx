import { useNavigate } from "react-router-dom";
import Botao from "./../../../components/Botao/Botao"
import Input from "./../../../components/Input/Input"
import Estilizacoes from "../../../model/Estilizacoes";
import { useState } from "react";
import PesquisarInstrutor from "./PesquisarInstrutor";

export default function Cadastro_Aula(){

  const navigate = useNavigate();

  const [unidade, setUnidade] = useState("")
  const [hora, setHora] = useState("")
  const [data, setData] = useState("")
 
    return(
        <main className="w-full h-full flex flex-col px-[15%]">
            <header className="w-full h-full flex flex-row">
                <div className={`${Estilizacoes.titulo_principal} w-full`}>
                    <h1>Cadastrar aula</h1>
                </div>
                <div className="w-full">
                    <Botao texto="Voltar a página anterior" type="button" onClick={() => navigate(-1)}/>
                </div>
            </header>
            <form action="">
                <section className="w-full h-full flex flex-col justify-center items-start gap-8 py-8">

                     <div>
                        <div>
                            <h1 className={Estilizacoes.titulo_segundario}>Unidade</h1>
                        </div>
                        <Input
                        id=""
                        name=""
                        as="select"
                        options={[
                            {value:"unidade 1", label:"São Miguel Paulista"},
                            {value:"unidade 2", label:"Itaquera"},
                            {value:"unidade 3", label:"Vila Jacuí"} 
                        ]}
                        onChange={(e) => setUnidade(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className={Estilizacoes.titulo_segundario}>Data e Hora de Incio</h1>
                        </div>
                        <div className="flex flex-col gap-10
                        md:flex-row">
                            <div>
                                <Input
                                label="Data da Aula"
                                type="date"
                                onChange={(e) => setData(e.target.value)}
                                />
                            </div>
                            <div>
                                <Input
                                label="Hora de Início"
                                type="time"
                                onChange={(e) => setHora(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <PesquisarInstrutor
                        unidadeAula={unidade}
                        dataAula={data}
                        horaAula={hora}
                    />

                </section>

                <Botao texto="Cadastrar Aula"/>

            </form>
        </main>
    )
}