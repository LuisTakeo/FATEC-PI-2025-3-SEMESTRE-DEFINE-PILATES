import Options_categprofis from "./Options_categprofis"
import Estilizacoes from "../../../model/Estilizacoes";
import Input_Arquivo from "../../../components/Cadastros/Input_Arquivo";
import Botao from "../../../components/Cadastros/Botao"
import Input from "../../../components/Cadastros/Input"
import inputCPF from "../../../services/inputCPF"
import { useState } from "react";

function Cadastro_Aluno(){
    
    const [permissao, setPermissao] = useState(false);

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("");
    const [cpf, setCPF] = useState("");
    const [data, setData] = useState("");
    const [ddd, setDDD] = useState("");
    const [telefone, setTelefone] = useState("");

    const [cep, setCEP] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");

    const [medicamento, setMedicamento] = useState("")
    const [tratProposto, setTratProposto] = useState("")


    function permitirInputs(state: boolean){
        setPermissao(state);
    }

    //enviar back-end
    const handleSubmit = async () => {
        console.log(medicamento, tratProposto)
    }

    return(
        <div className="flex flex-col items-center justify-center w-full">
            <main className="flex flex-col  w-[80vw] px-[2%]">
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
                            <div className="w-full">
                                <Input
                                    id="nome"
                                    label="Nome"
                                    value={nome}
                                    onChange={setNome}
                                    type = "text"
                                    pattern="[a-zA-Z0-9/]+"
                                    placeholder = "Digite o nome"
                                    size = "w-full"
                                />
                            </div>

                            <div className="w-full">
                                <Input
                                    id="email"
                                    label="E-mail"
                                    value={email}
                                    onChange={setEmail}
                                    type = "email"
                                    pattern=".*"
                                    placeholder = "Digite o email"
                                    size = "w-full"
                                />
                            </div>

                            <div id="campo-numero" className="flex justify-start items-start flex-row w-full  gap-4">
                                <div className="w-1/5">
                                    <Input
                                        id="ddd"
                                        label="DDD"
                                        value={ddd}
                                        onChange={setDDD}
                                        type = "text"
                                        pattern="[0-9]+"
                                        placeholder = "DDD"
                                        size = "w-full"
                                    />
                                </div>

                                <div className="w-full">
                                    <Input
                                        id="telefone"
                                        label="Telefone"
                                        value={telefone}
                                        onChange={setTelefone}
                                        type = "text"
                                        pattern="[0-9]+"
                                        placeholder = "Digite o Telefone"
                                        size = "w-full"
                                    />
                                </div>
                            </div>

                            <div id="cpf-dtnascimento" className="flex justify-start items-start flex-row gap-4 w-full">

                                    <div className="w-full">
                                        <Input
                                            id="cpf"
                                            label="CPF"
                                            value={cpf}
                                            onChange={(valor) =>{
                                                setCPF(inputCPF(valor));
                                            }}
                                            type = "text"
                                            pattern="[.-0-9]+"
                                            placeholder = "Digite o CPF"
                                            size = "w-full"
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Input
                                            id="data"
                                            label="Data de Nacimento"
                                            value={data}
                                            onChange={setData}
                                            type = "date"
                                            pattern="[0-9]+"
                                            size = "w-full"
                                        />
                                    </div>
                            </div>

                            <Options_categprofis/>
                        </section>

                        <section id="ft-postura" className="flex justify-start items-start flex-col gap-5 mt-8">
                            <div className="w-full">
                                <Input_Arquivo
                                id="ft-postura"
                                titulo="Foto"
                                label="Selecione uma imagem dos seus arquivos"
                                texto_input="Clique aqui para selecionar"
                                />
                            </div>
                        </section>

                        <section id="endereço" className="flex justify-start items-start flex-col gap-5 mt-5">
                            <div>
                                <h1 className={Estilizacoes.segundo_titulo_principal}>Endereço</h1>
                            </div>

                            {/* aplicar api */}
                           <div className="w-full">
                                <Input
                                    id="cep"
                                    label="CEP"
                                    value={cep}
                                    onChange={setCEP}
                                    type = "text"
                                    pattern="[0-9]+"
                                    placeholder = "CEP"
                                    size = "w-full"
                                />
                            </div>

                            <div className="flex justify-start items-start w-full gap-4">
                                <div className="w-[75%]">
                                    <Input
                                        id="rua"
                                        label="Rua"
                                        value={rua}
                                        onChange={setRua}
                                        type = "text"
                                        pattern=".*"
                                        placeholder = "Digite a Rua"
                                        size = "w-full"
                                    />
                                </div>

                                <div className="w-[25%]">
                                    <Input
                                        id="numero"
                                        label="Número"
                                        value={numero}
                                        onChange={setNumero}
                                        type = "text"
                                        pattern=".*"
                                        placeholder = "Número"
                                        size = "w-full"
                                    />
                                </div>
                            </div>

                            <div className="w-full">
                                <Input
                                    id="bairro"
                                    label="Bairro"
                                    value={bairro}
                                    onChange={setBairro}
                                    type = "text"
                                    pattern=".*"
                                    placeholder = "Digite o Bairro"
                                    size = "w-full"
                                />
                            </div>

                            <div className="flex justify-start items-start flex-row mb-8 w-full">
                                <div id="input-city" className="w-full">
                                    <Options_categprofis/>
                                </div>
                            </div>
                        </section>

                        <section id="info-medicas" className="flex justify-start items-start flex-col gap-5">
                            <div id="option-info-medica" className="flex flex-col gap-3">
                                <label className={Estilizacoes.segundo_titulo_principal}>Informações médicas</label>
                                <h1 className={Estilizacoes.titulo_segundario}>Este aluno vai fazer acompanhamento médico no pilates?</h1>
                                    <div>
                                        <input type="radio" id="nao-info-medicas" name="info-medicas" required
                                        onClick={() => permitirInputs(false)}
                                        className="scale-150 accent-[var(--destaque)]"
                                        />
                                        <label htmlFor="nao-info-medicas" className="text-[1.2rem] pl-5">Não</label>
                                    </div>
                                    
                                    <div>
                                        <input type="radio" id="sim-info-medicas" name="info-medicas" required
                                        className="scale-150 accent-[var(--destaque)]" 
                                        onClick={() => permitirInputs(true)}
                                        />
                                        <label htmlFor="sim-info-medicas" className="text-[1.2rem] pl-5">Sim, ele(a) vai fazer acompanhamento médico</label>
                                    </div>
                            </div>

                            {permissao && (
                                <div className="flex flex-col gap-5 mt-5">                        
                                    <div className="w-full">
                                        <Input_Arquivo
                                        id="histico-medico"
                                        titulo="Histórico Médico"
                                        label="Selecione uma imagem dos seus arquivos"
                                        texto_input="Clique aqui para selecionar"
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Input_Arquivo
                                        id="diagnostico"
                                        titulo="Diagnóstico"
                                        label="Selecione uma imagem dos seus arquivos"
                                        texto_input="Clique aqui para selecionar"
                                        />
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
                                            className="border rounded-[5px] w-full h-40 px-5 py-3 text-[1.2rem] resize-none" 
                                            onChange={(e) => setMedicamento(e.target.value)}
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
                                            className="border rounded-[5px] w-full h-40 px-5 py-3 text-[1.2rem] resize-none" 
                                            onChange={(e) => setTratProposto(e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            )}     
                        </section>

                        <section 
                        className="mt-10">
                            <Botao texto="Cadastrar" onClick={handleSubmit}/>
                        </section>

                    </form>
            </main>
        </div>
    )
}

export default Cadastro_Aluno;