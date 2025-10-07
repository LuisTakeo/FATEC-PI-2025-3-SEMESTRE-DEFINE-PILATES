import"./stylesCadastroAluno.css"
import OptionsForm from "./optionsForm"

function Cadastro_Aluno(){

    let estilizacao_input: string = "bg-[var(--input-background)] rounded-[7px] p-3 text-lg h-[50px] focus:border-none"
    // let estilizacao_input_file: string = ""

    return(
        <div className="flex flex-col items-center justify-center w-full">
            <main className="flex flex-col  w-[80vw]">
                <header className="flex justify-start flex-col mb-10">
                    <div>
                        <h1 className="text-[2rem] font-bold text-[var(--destaque)]">Cadastro de Aluno</h1>
                    </div>
                    <div>
                        <h1 className="text-[1.5rem] font-semibold">Informe os dados abaixo para criar o acesso</h1>
                    </div>
                </header>
                    <form>
                        <section id="info-pessoais-section" className="flex justify-start items-start flex-col gap-5 w-full  ">
                            <div>
                                <h1 className="text-[1.3rem] font-bold text-[var(--destaque)]">Informações pessoais</h1>
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

                        <section id="ft-postura" className="flex justify-start items-start flex-col">
                            <div>
                                <h1>Foto da postura</h1>
                            </div>
                            <div className="flex justify-start items-start flex-col">
                                <label htmlFor="img-postura">
                                    Selecione um documento ou imagem 
                                </label>
                                <input 
                                className=""
                                id="img-postura" 
                                type="file"
                                accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                />
                            </div>
                        </section>

                        <section id="endereço" className="flex justify-start items-start flex-col">
                            <div>
                                <h1 className="text-[1.5rem]">Endereço</h1>
                            </div>

                            {/* aplicar api */}
                            <div id="cep" className="flex flex-col">
                                <label htmlFor="cep-input" className="">
                                    CEP
                                </label>
                                <div className="flex">
                                    <input 
                                    id="cep-input"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]+"
                                    maxLength={10}
                                    className={estilizacao_input}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-start items-start flex-row">
                                <div id="rua" className="flex flex-col">
                                    <label htmlFor="rua-input" className="">
                                        Rua
                                    </label>
                                    <div className="flex">
                                        <input 
                                        id="rua-input"
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[a-zA-Z0-9/-]+"
                                        maxLength={15}
                                        className={estilizacao_input}
                                        />
                                    </div>
                                </div>
                                <div id="numero" className="flex flex-col">
                                    <label htmlFor="numero-input" className="">
                                        Número
                                    </label>
                                    <div className="flex">
                                        <input 
                                        id="numero-input"
                                        type="text"
                                        inputMode="text"
                                        pattern="[a-zA-Z0-9/-]+"
                                        maxLength={15}
                                        className={estilizacao_input}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div id="bairro" className="flex flex-col">
                                <label htmlFor="bairro-input" className="">
                                    Bairro
                                </label>
                                <div className="flex">
                                    <input 
                                    id="bairro-input"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]+"
                                    maxLength={15}
                                    className={estilizacao_input}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-start items-start flex-row">
                                <div>

                                </div>
                                <div>

                                </div>
                            </div>
                        </section>

                        <section id="info-medicas" className="flex justify-start items-start flex-col">
                            <div>
                                <label>Informações médicas</label>
                                <h1>Este aluno vai fazer acompanhamento médico no pilates?</h1>
                                    <div>
                                        <input type="radio" id="nao-info-medicas" name="info-medicas" defaultChecked />
                                        <label htmlFor="nao-info-medicas">Não</label>
                                    </div>
                                    
                                    <div>
                                        <input type="radio" id="sim-info-medicas" name="info-medicas" />
                                        <label htmlFor="sim-info-medicas">Sim, ele(a) tem acompanhamento médico</label>
                                    </div>
                            </div>

                            <div>
                                <div>
                                    <h1>Historico Médico</h1>
                                </div>
                                <div className="flex justify-start items-start flex-col">
                                    <label htmlFor="img-hist-medico-input">
                                        Selecione um documento ou imagem 
                                    </label>
                                    <input 
                                    className=""
                                    id="img-hist-medico-input" 
                                    type="file"
                                    accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    />
                                </div>
                            </div>

                            <div>
                                <div>
                                    <h1>Diagnóstico</h1>
                                </div>
                                <div className="flex justify-start items-start flex-col">
                                    <label htmlFor="img-diagnostico-input">
                                        Selecione um documento ou imagem 
                                    </label>
                                    <input 
                                    className=""
                                    id="img-diagnostico-input" 
                                    type="file"
                                    accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    />
                                </div>
                            </div>

                            <div>
                                <div>
                                    <h1>Medicamentos </h1>
                                </div>
                                <div className="flex justify-start items-start flex-col">
                                    <label htmlFor="medicamentos-boxarea">
                                        Caso o aluno(a) utilize algum medicamento prescrito, escreva abaixo quais medicamentos ele utiliza
                                    </label>
                                    <textarea name="medicamentos" id="medicamentos-boxarea"></textarea>
                                </div>
                            </div>

                            <div className="flex justify-start items-start flex-col">
                                <div>
                                    <h1>Tratamento proposto  </h1>
                                </div>
                                <div className="flex justify-start items-start flex-col">
                                    <label htmlFor="medicamentos-boxarea">
                                        Escreva abaixo qual é o tratamento proposto pelo seu medico(a) do aluno(a)
                                    </label>
                                    <textarea name="medicamentos" id="medicamentos-boxarea"></textarea>
                                </div>
                            </div>     
                        </section>

                        <section>
                            <div>
                                <button type="submit">Cadastrar</button>
                            </div>
                        </section>

                    </form>
            </main>
        </div>
    )
}

export default Cadastro_Aluno;