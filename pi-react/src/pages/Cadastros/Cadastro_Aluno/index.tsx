import Options_categprofis from "./Options_categprofis"
import Estilizacoes from "../../../model/Estilizacoes";
import Input_Arquivo from "../../../components/Cadastros/Input_Arquivo";
import Botao from "../../../components/Cadastros/Botao"
import Input from "../../../components/Cadastros/Input"
import inputCPF from "../../../services/inputCPF"
import { useState } from "react";
import type { Aluno, Endereco, Contato } from "../../../services/aluno/cadastroservice";

function Cadastro_Aluno(){
    
    const [permissao_medica, setPermissao_medica] = useState(false);
    const [ativo, setAtivo] = useState("")
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("");
    const [cpf, setCPF] = useState("");
    const [data, setData] = useState("");
    const [ddd, setDDD] = useState("");
    const [telefone, setTelefone] = useState("");
    const [outro_telefone, setOutro_telefone] = useState("")
    const [outro_DDD, setOutroDDD] = useState("")
    const [cep, setCEP] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    //const [medicamento, setMedicamento] = useState("")
    //const [tratProposto, setTratProposto] = useState("")
    const [arquivoComprimido, setArquivoComprimido] = useState<{[key: string]: File}>({})
    const [categoria, setCategoria] = useState("")
    const [observacoes, setObservacoes] = useState("")
    const [isPrincipal, setIsPrincipal] = useState(false)

    function permitirInputs(state: boolean){
        setPermissao_medica(state);
    }

    async function submitAluno(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const contato: Contato = {
            tipo: ativo === "email_opcao" ? "email" : "outro telefone",
            valor: ativo === "email_opcao" ? email : outro_DDD + outro_telefone,
            observacao: observacoes,
        }

        const endereco: Endereco = {
            tipo: "numero",
            rua: rua, 
            numero: numero,
            complemente: "Casa",
            bairro: bairro,
            cidade: "São Paulo",
            estado: "SP",
            cep: cep,
            principal: isPrincipal,
        }
        
        const aluno: Aluno = {
                name: nome,
                phone: ddd + telefone,
                password: "123",
                cpf: cpf,
                profession: categoria,
                birth_date: data,
                fotos: arquivoComprimido,
                contatos: [
                    contato
                ],
                enderecos: [
                    endereco
                ],
        }

        console.log(aluno)
        return aluno

    }


    console.log("Quantidade de arquivos:", Object.keys(arquivoComprimido).length);
    console.log("Arquivos:", arquivoComprimido);

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
                                    onChange={setNome}
                                    type = "text"
                                    pattern="[a-zA-Z0-9/]+"
                                    placeholder = "Digite o nome"
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
                                        type = "numeric"
                                        pattern=".*"
                                        placeholder = "DDD"
                                        size = "w-full"
                                        maxLength={4}
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

                            <div id="contato-complementar" className="w-full my-8 flex flex-col gap-6 ">
                                <div className="">
                                    <h1 className={Estilizacoes.segundo_titulo_principal}> Contato complementar</h1>
                                </div>

                               <div className="text-[1.5rem] flex flex-row gap-10 flex-wrap ">
                                    <div>
                                        <input type="radio" id="desabilitado" value="desabilitado"
                                        onClick={() => setAtivo("")}
                                        checked={ativo == "" ? true : false}
                                        className="scale-200 accent-[var(--destaque)]"
                                        />
                                        <label htmlFor="email_opcao" className="text-[1.2rem] pl-5">Nenhum</label>
                                    </div>

                                    <div>
                                        <input type="radio" id="email_opcao" name="email_opcao" value="email_opcao"
                                        onClick={() => setAtivo("email_opcao")}
                                        checked={ativo == "email_opcao" ? true : false}
                                        className="scale-200 accent-[var(--destaque)]"
                                        />
                                        <label htmlFor="email_opcao" className="text-[1.2rem] pl-5">E-mail</label>
                                    </div>
                                    
                                    <div>
                                        <input type="radio" id="outro_telefone_opcao" name="outro_telefone_opcao" value="outro_telefone_opcao" 

                                        className="scale-200 accent-[var(--destaque)]" 
                                        onClick={() => {setAtivo("outro_telefone_opcao")}}
                                        checked={ativo == "outro_telefone_opcao" ? true : false}
                                        />
                                        <label htmlFor="outro_telefone_opcao" className="text-[1.2rem] pl-5">Outro telefone</label>
                                    </div>
                                </div>
                            
                               

                                <div className={`w-full flex flex-col gap-5 ${ativo == "email_opcao" ? "" : "hidden"}`} id="campo-email">
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
                                     <div className="flex flex-col gap-3 w-full">
                                        <div>
                                            <h1
                                            className="text-[1.2rem] font-semibold text-[var(--foreground)]"
                                            >Observação</h1>
                                            </div>
                                            <div className="flex justify-start items-start flex-col gap-3">
                                            <label htmlFor="observacoes"
                                            className="text-[1.1rem] text-[var(--foreground)]"
                                            >
                                                Caso queira, escreva alguma observação em relação a esse outro meio de contato                                           
                                            </label>
                                            <textarea 
                                            name="observacoes" 
                                            id="observacoes"
                                            className="border rounded-[5px] w-full h-40 px-5 py-3 text-[1.2rem] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--destaque)] focus:border-none" 
                                            onChange={(e) => setObservacoes(e.target.value)}
                                            placeholder="Exemplo: Apenas vejo o e-mail aos finais de semana "
                                            ></textarea>
                                        </div>
                                    </div>

                                </div>

                                <section id="outro-numero" className={`${ativo == "outro_telefone_opcao" ? "" : "hidden"} flex justify-start items-start flex-col w-full gap-5`}>
                                    <div className=" flex flex-row gap-5 w-full flex-wrap">
                                        <div className="w-1/5 flex-none">
                                            <Input
                                                id="ddd"
                                                label="DDD"
                                                value={outro_DDD}
                                                onChange={setOutroDDD}
                                                type = "numeric"
                                                pattern=".*"
                                                placeholder = "DDD"
                                                size = "w-full"
                                                maxLength={4}
                                            />
                                        </div>

                                        <div className="w-full flex-1">
                                            <Input
                                                id="telefone"
                                                label="Telefone"
                                                value={outro_telefone}
                                                onChange={setOutro_telefone}
                                                type = "text"
                                                pattern="[0-9]+"
                                                placeholder = "Digite o Telefone"
                                                size = "w-full"
                                            />
                                        </div>
                                    </div>
                                    
                                   
                                    <div className="flex flex-col gap-2 w-full">
                                        <div>
                                            <h1
                                            className="text-[1.2rem] font-semibold text-[var(--foreground)]"
                                            >Observação
                                            </h1>
                                        </div>
                                        <div className="flex justify-start items-start flex-col gap-3">
                                            <label htmlFor="observacoes"
                                            className="text-[1.1rem] text-[var(--foreground)]"
                                            >
                                                Caso queira, escreva alguma observação em relação a esse outro meio de contato                                           
                                            </label>
                                            <textarea 
                                            name="observacoes" 
                                            id="observacoes"
                                            className="border rounded-[5px] w-full h-40 px-5 py-3 text-[1.2rem] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--destaque)] focus:border-none" 
                                            onChange={(e) => setObservacoes(e.target.value)}
                                            placeholder="Exemplo: Não respondo no whatzapp a partir das 21h todos os dias"
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="flex flex-row gap-6 w-full justify-start">
                                        <div>
                                            <h1 className="text-[1.2rem] font-semibold text-[var(--foreground)]">Este número é principal?</h1>
                                        </div>
                                        <div className="mx-5">
                                            <input type="radio" id="isPrincipal_true" name="isPrincipal_true" value="isPrincipal_true"
                                            onClick={() => setIsPrincipal(true)}
                                            checked={isPrincipal == true ? true : false}
                                            className="scale-200 accent-[var(--destaque)]"
                                            />
                                            <label htmlFor="isPrincipal_true" className="text-[1.2rem] pl-5">Sim</label>
                                        </div>
                                        <div className="mx-5">
                                            <input type="radio" id="isPrincipal_false" name="isPrincipal_false" value="isPrincipal_false"
                                            onClick={() => setIsPrincipal(false)}
                                            checked={isPrincipal == false ? true : false}
                                            className="scale-200 accent-[var(--destaque)]"
                                            />
                                            <label htmlFor="isPrincipal_false" className="text-[1.2rem] pl-5">Não</label>
                                        </div>
                                    </div>

                                    
                                </section>
                                
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
                                            maxLength={11}
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
                                            maxLength={8}
                                        />
                                    </div>
                            </div>
                            
                            

                            <Options_categprofis value={categoria} onChange={setCategoria}/>
                        </section>

                        <div className="w-full mt-8">
                            <Input_Arquivo
                            id="ft-postura"
                            titulo="Foto"
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
                                    onChange={setCEP}
                                    type = "text"
                                    pattern="[-0-9]+"
                                    placeholder = "CEP"
                                    size = "w-full"
                                    maxLength={8}
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
                        </section>

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