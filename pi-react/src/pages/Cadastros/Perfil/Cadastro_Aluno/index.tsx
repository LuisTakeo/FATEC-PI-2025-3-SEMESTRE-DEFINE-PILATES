import Options_categprofis from "./Options_categprofis"
import Estilizacoes from "../../../../model/Estilizacoes";
import Input_Arquivo from "../../../../components/Input/Input_Arquivo";
import Botao from "../../../../components/Botao/Botao"
import Input from "../../../../components/Input/Input"
import inputCPF from "../../../../services/inputCPF"
import { useState } from "react";
import { type Aluno, type Endereco, type Contato, cadastrar_aluno } from "../../../../services/aluno/cadastroservice";
import ContatoComplem from "../../../../components/Section/ContatoComplem"
import OutroEndereco from "../../../../components/Section/OutroEndereco";

function Cadastro_Aluno(){
    console.log("carregando")

    const [nome, setNome] = useState("")
    const [cpf, setCPF] = useState("");
    const [data, setData] = useState("");
    const [ddd, setDDD] = useState("");
    const [telefone, setTelefone] = useState("");

    const [cep, setCEP] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [complemento, setComplemento] = useState("")

    const [cepComplementar, setCEPComplementar] = useState("");
    const [ruaComplementar, setRuaComplementar] = useState("");
    const [numeroComplementar, setNumeroComplementar] = useState("");
    const [bairroComplementar, setBairroComplementar] = useState("");
    const [complementoComplementar, setComplementoComplementar] = useState("")
    const [isPrincipal, setIsPrincipal] = useState(false)

    const [permissao_medica, setPermissao_medica] = useState(false);
    const [medicamento, setMedicamento] = useState("")
    const [tratProposto, setTratProposto] = useState("")
    const [categoria, setCategoria] = useState("")
    
    const [observacoes, setObservacoes] = useState("")
    const [email, setEmail] = useState("");
    const [outro_telefone, setOutro_telefone] = useState("")
    const [outro_DDD, setOutroDDD] = useState("")
    const [ativo, setAtivo] = useState("")

    const [arquivoComprimido, setArquivoComprimido] = useState<{[key: string]: File}>({})

  

    function permitirInputs(state: boolean){
        setPermissao_medica(state);
    }

    async function submitAluno(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        console.log("chego")

        const contato: Contato = {
            tipo: ativo === "email_opcao" ? "email" : "outro telefone",
            valor: ativo === "email_opcao" ? email : outro_DDD + outro_telefone,
            observacao: observacoes,
        }

        const endereco: Endereco[]= [{
            tipo: "numero",
            rua: rua, 
            numero: numero,
            complemente: complemento,
            bairro: bairro,
            cidade: "São Paulo",
            estado: "SP",
            cep: cep,
            principal: isPrincipal,
        },
        {
            tipo: "numero",
            rua: ruaComplementar, 
            numero: numeroComplementar,
            complemente: complementoComplementar,
            bairro: bairroComplementar,
            cidade: "São Paulo",
            estado: "SP",
            cep: cepComplementar,
            principal: isPrincipal, 
        }]
        
        const aluno: Aluno = {
                name: nome,
                phone: ddd + telefone,
                password: "123Ab!",
                cpf: cpf,
                profession: categoria,
                birth_date: data,
                fotos: arquivoComprimido,
                contatos: [
                    contato
                ],
                enderecos: endereco
        }

        const response = await cadastrar_aluno(aluno);

        return aluno

    }


    console.log("Quantidade de arquivos:", Object.keys(arquivoComprimido).length);
    console.log("Arquivos:", arquivoComprimido);

    return(
        <div className="flex flex-col items-center justify-center w-full mt-10">
            <main className="flex flex-col  w-[80vw] px-[2%]">
                <header className="flex justify-start flex-col mb-10">
                    <div>
                        <h1 className={`${Estilizacoes.titulo_principal} text-[2rem]`}>Cadastro de Aluno</h1>
                    </div>
                    <div>
                        <h1 className={`${Estilizacoes.segundo_titulo_principal} text-[var(--foreground)]`}>Informe os dados abaixo para criar o acesso</h1>
                    </div>
                </header>
                    <form onSubmit={(e) => submitAluno(e)}>
                        <section id="info-pessoais-section" className="flex justify-start items-start flex-col gap-5 w-full  ">
                            <div>
                                <h1 className={`${Estilizacoes.segundo_titulo_principal} text-[var(--destaque)]`}>Informações pessoais</h1>
                            </div>

                            <div className="w-full">
                                <Input
                                    id="nome"
                                    label="Nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    type = "text"
                                    pattern="[a-zA-Z0-9/]+"
                                    placeholder = "Digite o nome"
                                    
                                />
                                
                            </div>

                            <div id="campo-numero" className="flex justify-start items-start flex-row w-full  gap-4">
                                <div className="w-1/5">
                                    <Input
                                        id="ddd"
                                        label="DDD"
                                        value={ddd}
                                        onChange={(e) => setDDD(e.target.value)}
                                        type = "numeric"
                                        pattern=".*"
                                        placeholder = "DDD"
                                        
                                        maxLength={4}
                                    />
                                </div>

                                <div className="w-full">
                                    <Input
                                        id="telefone"
                                        label="Telefone"
                                        value={telefone}
                                        onChange={(e) => setTelefone(e.target.value)}
                                        type = "text"
                                        pattern="[0-9]+"
                                        placeholder = "Digite o Telefone"
                                        
                                    />
                                </div>

                            </div>

                            <ContatoComplem
                                ativo={ativo}
                                setAtivo={setAtivo}
                                observacoes={observacoes}
                                setObservacoes={setObservacoes}
                                email={email}
                                setEmail={setEmail}
                                outro_telefone={outro_telefone}
                                setOutro_telefone={setOutro_telefone}
                                outro_DDD={outro_DDD}
                                setOutroDDD={setOutroDDD}
                            />

                            
                        <div id="cpf-dtnascimento" className="flex justify-start items-start flex-row gap-4 w-full">

                            <div className="w-full">
                                <Input
                                    id="cpf"
                                    label="CPF"
                                    value={cpf}
                                    onChange={(e) => {setCPF(inputCPF(e.target.value))}}
                                    type = "text"
                                    pattern="[.-0-9]+"
                                    placeholder = "Digite o CPF"
                                    
                                    // maxLength={15}
                                />
                            </div>

                            <div className="w-full">
                                <Input
                                    id="data"
                                    label="Data de Nacimento"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    type = "date"
                                    pattern="[0-9]+"
                                    
                                    maxLength={8}
                                />
                            </div>
                        </div>
                            <Options_categprofis value={categoria} onChange={setCategoria}/>
                        </section>

                        <div className="w-full mt-8">
                            <Input_Arquivo
                            id="ft-postura"
                            titulo="Foto da Postura"
                            label="Selecione uma imagem dos seus arquivos"
                            texto_input="Clique aqui para selecionar"
                            onArquivoComprimido={(arquivoComprimido) => setArquivoComprimido(prev => ({...prev, ["ft-postura"]: arquivoComprimido }))}
                            />
                        </div>

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
                                    onChange={(e) => setCEP(e.target.value)}
                                    type = "text"
                                    pattern="[-0-9]+"
                                    placeholder = "CEP"
                                    
                                    maxLength={8}
                                />
                            </div>

                            <div className="flex justify-start items-start w-full gap-4">
                                <div className="w-[75%]">
                                    <Input
                                        id="rua"
                                        label="Rua"
                                        value={rua}
                                        onChange={(e) => setRua(e.target.value)}
                                        type = "text"
                                        pattern=".*"
                                        placeholder = "Digite a Rua"
                                        
                                    />
                                </div>

                                <div className="w-[25%]">
                                    <Input
                                        id="numero"
                                        label="Número"
                                        value={numero}
                                        onChange={(e) => setNumero(e.target.value)}
                                        type = "text"
                                        pattern=".*"
                                        placeholder = "Número"
                                        
                                    />
                                </div>
                            </div>

                            <div className="w-full">
                                <Input
                                    id="bairro"
                                    label="Bairro"
                                    value={bairro}
                                    onChange={(e) => setBairro(e.target.value)}
                                    type = "text"
                                    pattern=".*"
                                    placeholder = "Digite o Bairro"
                                    
                                />
                            </div>

                            <div className="w-full">
                                <Input
                                    id="complemento"
                                    label="Complemento"
                                    value={complemento}
                                    onChange={(e) => setComplemento(e.target.value)}
                                    type = "text"
                                    pattern=".*"
                                    placeholder = "Ex: Apartamento 156"
                                    
                                />
                            </div>


                        </section>

                        <OutroEndereco
                            cepComplementar={cepComplementar}
                            setCEPComplementar={setCEPComplementar}
                            ruaComplementar={ruaComplementar}
                            setRuaComplementar={setRuaComplementar}
                            numeroComplementar={numeroComplementar}
                            setNumeroComplementar={setNumeroComplementar}
                            bairroComplementar={bairroComplementar}
                            setBairroComplementar={setBairroComplementar}
                            complementoComplementar={complementoComplementar}
                            setComplementoComplementar={setComplementoComplementar}
                            isPrincipal={isPrincipal}
                            setIsPrincipal={setIsPrincipal}
                        />


                        <section id="info-medicas" className="flex justify-start items-start flex-col gap-5 mt-8">
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

                            {permissao_medica && (
                                <div className="flex flex-col gap-5 mt-5">                        
                                    <div className="w-full">
                                        <Input_Arquivo
                                        id="histico-medico"
                                        titulo="Histórico Médico"
                                        label="Selecione uma imagem dos seus arquivos"
                                        texto_input="Clique aqui para selecionar"
                                        onArquivoComprimido={(arquivoComprimido) => setArquivoComprimido(prev => ({...prev, ["histico-medico"]: arquivoComprimido }))}

                                        />
                                    </div>

                                    <div className="w-full">
                                        <Input_Arquivo
                                        id="diagnostico"
                                        titulo="Diagnóstico"
                                        label="Selecione uma imagem dos seus arquivos"
                                        texto_input="Clique aqui para selecionar"
                                        onArquivoComprimido={(arquivoComprimido) => setArquivoComprimido(prev => ({...prev, ["diagnostico"]: arquivoComprimido }))}

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
                                            className="border rounded-[5px] w-full h-40 px-5 py-3 text-[1.2rem] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--destaque)] focus:border-none" 
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
                                            className="border rounded-[5px] w-full h-40 px-5 py-3 text-[1.2rem] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--destaque)] focus:border-none" 
                                            onChange={(e) => setTratProposto(e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            )}     
                        </section>

                        <section 
                        className="mt-10">
                            <Botao texto="Cadastrar" type="submit"/>
                        </section>

                    </form>
            </main>
        </div>
    )
}

export default Cadastro_Aluno;