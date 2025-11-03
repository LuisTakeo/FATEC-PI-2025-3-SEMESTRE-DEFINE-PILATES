import { useNavigate } from "react-router-dom";
import Botao from "./../../../components/Botao/Botao"
import Input from "./../../../components/Input/Input"

export default function Cadastro_Aula(){

  const navigate = useNavigate();

    return(
        <main className="w-full h-full flex flex-col px-[15%]">
            <header className="w-full h-full flex flex-row">
                <div className="w-full text-[2rem] font-semibold text-[var(--destaque)]">
                    <h1>Cadastrar aula</h1>
                </div>
                <div className="w-full">
                    <Botao texto="Voltar a página anterior" type="button" onClick={() => navigate(-1)}/>
                </div>
            </header>
            <form action="">
                <section>

                     <div>
                        <div>
                            <h1>Unidade</h1>
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
                        // onChange={(e) => {
                        //     const valorSelecionado = e.target.value;
                        //     const [latitude , longitude] = valorSelecionado.split(",").map(Number)
                        //     setLatitude(latitude)
                        //     setLongitude(longitude)
                        // }}
                        />
                    </div>

                    <div className="flex flex-col">
                        <div>
                            <h1>Data e Hora</h1>
                        </div>
                        <div className="flex flex-row">
                            <div>
                                <Input
                                label="Data da Aula"
                                type="date"
                                />
                            </div>
                            <div>
                                <Input
                                label="Hora de Inicio"
                                type="date"
                                />
                            </div>
                            <div>
                                <Input
                                label="Hora de Fim"
                                type="date"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div>
                            <h1>Instrutor</h1>
                        </div>
                        <div className="flex flex-row">
                            <div>
                                <Input
                                type="text"
                                />
                            </div>
                            <div>
                                <Botao texto="Pesquisar"/>
                            </div>
                        </div>
                    </div>
                    
                     {/* <div>
                        <p>Quais planos contém esta aula?</p>
                        <label htmlFor="">
                            <input type="checkbox" name="recorrente" value="sim"/>
                            Plano anual
                        </label>
                        <label htmlFor="">
                            <input type="checkbox" name="recorrente" value="nao"/>
                            Plano trimestral
                        </label>
                        <label htmlFor="">
                            <input type="checkbox" name="recorrente" value="nao"/>
                            Plano semestral
                        </label>
                        <label htmlFor="">
                            <input type="checkbox" name="recorrente" value="nao"/>
                            Plano mensal
                        </label>
                        <label htmlFor="">
                            <input type="checkbox" name="recorrente" value="nao"/>
                            Plano semanal
                        </label>
                    </div>

                    <div>
                        <p>Tornar recorrente?</p>
                        <label htmlFor="">
                            <input type="radio" name="recorrente" value="sim"/>
                            Sim
                        </label>
                        <label htmlFor="">
                            <input type="radio" name="recorrente" value="nao"/>
                            Não
                        </label>
                        {/* ao clicar em se tornar recorrente, perguntar se deve se repetir em quais dias e por quanto tempo 
                    </div>
                        */}
                    

                    <div>
                        <Input
                        label="Observações"
                        as="textarea"
                        />
                    </div>

                </section>

                <Botao texto="Cadastrar Aula"/>

            </form>
        </main>
    )
}