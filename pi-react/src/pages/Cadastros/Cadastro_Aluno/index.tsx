import OptionsForm from "./optionsForm"
import Estilizacoes from "../../../model/Estilizacoes";
import BotaoInput from "../../../components/BotaoInput";
import Botao from "../../../components/Botao"
import OptionsFormCidades from "./optionsFormCidades"
import { useState } from "react";

function Cadastro_Aluno(){

    let estilizacao_input: string = "bg-[var(--input-background)] rounded-[7px] p-3 text-lg h-[50px] focus:border-none"
    // let estilizacao_input_file: string = ""
    
    const [permissao, setPermissao] = useState(false);

    function permitirInputs(state: boolean){
        setPermissao(state);
    }

    return(
        <div className="flex flex-col items-center justify-center w-full">
            <main className="flex flex-col  w-[80vw]">
                <header className="flex justify-start flex-col mb-10">
                    <div>
                        <h1 className={`${Estilizacoes.titulo_principal} text-[2rem]`}>Cadastro de Aluno</h1>
                    </div>
                    <div>
                        <h1 className={`${Estilizacoes.segundo_titulo_principal} text-[var(--foreground)]`}>Informe os dados abaixo para criar o acesso</h1>
                    </div>
                </header>
                    <form>
                        <section id="info-pessoais-section" className="flex justify-start items-start flex-col gap-5 w-full  ">
                            <div>
                                <h1 className={`${Estilizacoes.segundo_titulo_principal} text-[var(--destaque)]`}>Informações pessoais</h1>
                            </div>
                            <div id="nome" className="flex flex-col gap-3 w-full">
                                <label htmlFor="nome-input" className="text-[1.2rem]">
                                    Nome
                                </label>
                                <div className="flex">
                                    <input 
                                    id="nome-input"
                                    type="text"
                                    pattern="[a-zA-Z]+"
                                    placeholder="Digite o nome" 
                                    autoComplete="off"
                                    className={`${estilizacao_input}  w-full`}
                                    />
                                </div>
                            </div>

                            <div id="email" className="flex flex-col gap-3 w-full">
                                <label htmlFor="email-input" className="text-[1.2rem]">
                                    E-mail
                                </label>
                                <div className="flex">
                                    <input 
                                    id="email-input"
                                    type="email"
                                    pattern="[a-zA-Z0-9/-]+"
                                    placeholder="Digite o e-mail" 
                                    className={`${estilizacao_input}  w-full`}
                                    />
                                </div>
                            </div>

                            <div id="campo-numero" className="flex justify-start items-start flex-row w-full  gap-4">
                                <div id="ddd" className="flex flex-col w-1/5 gap-3">
                                    <label htmlFor="ddd-input" className="text-[1.2rem]">
                                        DDD
                                    </label>
                                    <div className="flex">
                                        <input 
                                        id="ddd-input"
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]+"
                                        placeholder="DDD"
                                        maxLength={4}
                                        className={`${estilizacao_input} w-full`}
                                        />
                                    </div>
                                </div>

                                <div id="telefone" className="flex flex-col w-full gap-3">
                                    <label htmlFor="telefone-input" className="text-[1.2rem] ">
                                        Telefone
                                    </label>
                                    <div className="flex">
                                        <input 
                                        id="telefone-input"
                                        type="text"
                                        inputMode="text"
                                        pattern="[0-9]+"
                                        maxLength={20}
                                        placeholder="Telefone"
                                        className={`${estilizacao_input} w-full`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div id="cpf-dtnascimento" className="flex justify-start items-start flex-col gap-4">

                                <div id="cpf" className="flex flex-col gap-3">
                                    <label htmlFor="cpf-input" className="text-[1.2rem]">
                                        CPF
                                    </label>
                                    <div className="flex">
                                        <input 
                                        id="cpf-input"
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]+"
                                        maxLength={11}
                                        placeholder="CPF"
                                        className={estilizacao_input}
                                        />
                                    </div>
                                </div>

                                <div id="dtnascimento" className="flex flex-col gap-3">
                                    <label htmlFor="dtnascimento-input" className="text-[1.2rem]">
                                        Data de Nascimento
                                    </label>
                                    <div className="flex">
                                        <input 
                                        id="dtnascimento-input"
                                        type="date"
                                        inputMode="numeric"
                                        pattern="[0-9]+"
                                        maxLength={8}
                                        className={estilizacao_input}
                                        />
                                    </div>
                                </div>
                            </div>
                            <OptionsForm/>
                        </section>

                        <section id="ft-postura" className="flex justify-start items-start flex-col gap-5 mt-8">
                            <div>
                                <h1 className={`${Estilizacoes.segundo_titulo_principal} text-[var(--destaque)]`}>Foto da postura</h1>
                            </div>
                            <div className="flex justify-start items-start flex-col">
                                <label htmlFor="img-postura" className={Estilizacoes.titulo_segundario}>
                                    Selecione um documento ou imagem 
                                </label>
                               <BotaoInput texto="Clique para selecionar" id="img-postura"/>
                               
                            </div>
                        </section>

                        <section id="endereço" className="flex justify-start items-start flex-col gap-5 mt-5">
                            <div>
                                <h1 className={Estilizacoes.segundo_titulo_principal}>Endereço</h1>
                            </div>

                            {/* aplicar api */}
                            <div id="cep" className="flex flex-col gap-3">
                                <label htmlFor="cep-input" className="text-[1.2rem]">
                                    CEP
                                </label>
                                <div className="flex">
                                    <input 
                                    id="cep-input"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]+"
                                    maxLength={10}
                                    placeholder="CEP"
                                    className={estilizacao_input}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-start items-start w-full">
                                <div id="rua" className="flex flex-col w-[75%] gap-3">
                                    <label htmlFor="rua-input" className="text-[1.2rem]">Rua</label>
                                    <input
                                    id="rua-input"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[a-zA-Z0-9/-]+"
                                    maxLength={15}
                                    placeholder="Rua"
                                    className={estilizacao_input}
                                    />
                                </div>

                                <div id="numero" className="flex flex-col w-[25%] ml-4 gap-3">
                                    <label htmlFor="numero-input" className="text-[1.2rem]">Número</label>
                                    <input
                                    id="numero-input"
                                    type="text"
                                    inputMode="text"
                                    pattern="[a-zA-Z0-9/-]+"
                                    maxLength={15}
                                    placeholder="Número"
                                    className={estilizacao_input}
                                    />
                                </div>
                            </div>


                            <div id="bairro" className="flex flex-col gap-3">
                                <label htmlFor="bairro-input" className="text-[1.2rem]">
                                    Bairro
                                </label>
                                <div className="flex">
                                    <input 
                                    id="bairro-input"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]+"
                                    maxLength={15}
                                    placeholder="Bairro"
                                    className={estilizacao_input}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-start items-start flex-row mb-8 w-full">
                                <div id="input-city" className="w-full">
                                    <OptionsFormCidades/>
                                </div>
                            </div>
                        </section>

                        <section id="info-medicas" className="flex justify-start items-start flex-col gap-5">
                            <div className="flex flex-col gap-3">
                                <label className={Estilizacoes.segundo_titulo_principal}>Informações médicas</label>
                                <h1 className={Estilizacoes.titulo_segundario}>Este aluno vai fazer acompanhamento médico no pilates?</h1>
                                    <div>
                                        <input type="radio" id="nao-info-medicas" name="info-medicas"
                                        onClick={() => permitirInputs(false)}
                                        className="scale-150 accent-[var(--destaque)]"
                                        />
                                        <label htmlFor="nao-info-medicas" className="text-[1.2rem] pl-5">Não</label>
                                    </div>
                                    
                                    <div>
                                        <input type="radio" id="sim-info-medicas" name="info-medicas"
                                        className="scale-150 accent-[var(--destaque)]" 
                                        onClick={() => permitirInputs(true)}
                                        />
                                        <label htmlFor="sim-info-medicas" className="text-[1.2rem] pl-5">Sim, ele(a) vai fazer acompanhamento médico</label>
                                    </div>
                            </div>

                            {permissao && (
                                <div className="flex flex-col gap-5 mt-5">                        
                                    <div>
                                        <div>
                                            <h1
                                            className={Estilizacoes.segundo_titulo_principal}
                                            >Historico Médico</h1>
                                        </div>
                                        <div className="flex justify-start items-start flex-col">
                                            <div className="flex justify-start items-start flex-col">
                                                    <label htmlFor="historico-medico" className={Estilizacoes.titulo_segundario}>
                                                        Selecione um documento ou imagem 
                                                    </label>
                                                <BotaoInput texto="Clique para selecionar" id="historico-medico"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div>
                                            <h1
                                            className={Estilizacoes.segundo_titulo_principal}
                                            >Diegnóstico</h1>
                                        </div>
                                        <div className="flex justify-start items-start flex-col">
                                            <div className="flex justify-start items-start flex-col">
                                                    <label htmlFor="diegnostico" className={Estilizacoes.titulo_segundario}>
                                                        Selecione um documento ou imagem 
                                                    </label>
                                                <BotaoInput texto="Clique para selecionar" id="diegnostico"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 w-full">
                                        <div>
                                            <h1
                                            className={Estilizacoes.segundo_titulo_principal}
                                            >Medicamentos </h1>
                                        </div>
                                        <div className="flex justify-start items-start flex-col gap-3">
                                            <label htmlFor="medicamentos-boxarea"
                                            className="text-[1.3rem] font-semibold text-[var(--foreground)]"
                                            >
                                                Caso o aluno(a) utilize algum medicamento prescrito, escreva abaixo quais medicamentos ele(a) utiliza
                                            </label>
                                            <textarea 
                                            name="medicamentos" 
                                            id="medicamentos-boxarea"
                                            className="border rounded-[5px] w-full h-40 px-5 py-3 text-[1.2rem]" 
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 w-full">
                                        <div>
                                            <h1
                                            className={Estilizacoes.segundo_titulo_principal}
                                            >Tratamento Proposto</h1>
                                        </div>
                                        <div className="flex justify-start items-start flex-col gap-3">
                                            <label htmlFor="medicamentos-boxarea"
                                            className="text-[1.3rem] font-semibold text-[var(--foreground)]"
                                            >
                                                Escreva abaixo o tratamento proposto que o(a) aluno(a) recebeu                                            
                                            </label>
                                            <textarea 
                                            name="medicamentos" 
                                            id="medicamentos-boxarea"
                                            className="border rounded-[5px] w-full h-40 px-5 py-3 text-[1.2rem]" 
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            )}     
                        </section>

                        <section 
                        className="mt-10"
                        onClick={() => console.log("certo")}>
                            <Botao texto="Cadastrar" link="/"/>
                        </section>

                    </form>
            </main>
        </div>
    )
}

export default Cadastro_Aluno;