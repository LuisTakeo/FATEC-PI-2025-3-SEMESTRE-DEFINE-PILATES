import Options_categprofis from "./Options_categprofis"
import Estilizacoes from "../../../../uteis/Estilizacoes";
import Botao from "../../../../components/Botao/Botao"
import Input from "../../../../components/Input/Input"
import inputCPF from "../../../../services/cadastro/inputCPF"
import React, { useState } from "react";
import { cadastrar_aluno } from "../../../../services/aluno/cadastroservice";
import type {Aluno} from "../../../../types/Aluno" 
import type {Endereco as EnderecoType} from "../../../../types/Aluno"
import type {Contato} from "../../../../types/Aluno"
import ContatoComplem from "../../../../components/Section/ContatoComplem"
import Endereco from "../../../../components/Section/Endereco";
import { useNavigate } from "react-router-dom";
import { comprimirImagem } from "../../../../services/cadastro/comprimirImagem" 

// =========================================================================
// 🧩 COMPONENTE INPUT_ARQUIVO (COM BASE64 E ESTILO CORRIGIDOS)
// =========================================================================

// A interface agora aceita string (Base64)
interface InputArquivoProps {
    id: string;
    titulo?: string;
    label?: string;
    texto_input?: string;
    onArquivoComprimido?: (arquivo: string) => void 
}

function Input_Arquivo({
    id,
    titulo = "",
    label = "",
    texto_input = "", 
    onArquivoComprimido,
}: InputArquivoProps){
    
    // O estado armazena a STRING (Base64)
    const [arquivoSelecionado, setArquivoSelecionado] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string | null>(null); // Para exibir o nome

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]){
            
            const arquivoOriginal = e.target.files[0];
            
            setFileName(arquivoOriginal.name); // Armazena o nome original
            
            // Assumindo que comprimirImagem retorna uma STRING Base64
            const arquivoComprimido: string = await comprimirImagem(arquivoOriginal) as string;
            
            setArquivoSelecionado(arquivoComprimido)
            onArquivoComprimido?.(arquivoComprimido)
        } else {
            setFileName(null);
            setArquivoSelecionado(null);
        }
    }
    
    return( 	
        <div className="flex flex-col gap-3 w-full">
            <div>
                <h1 className="text-[1.8rem] font-bold text-[var(--foreground)]">{titulo}</h1>
            </div>
            
            <label htmlFor={id} className="text-[1.3rem] font-semibold text-[var(--foreground)]">
                {label}
            </label>
            
            <div className="flex flex-row gap-5 items-center">
                <input
                    type="file"
                    id={id}
                    className="hidden" 
                    onChange={handleChange}
                    accept="image/*,.pdf" 
                />
                
                {/* 🎨 ESTILO PADRONIZADO PARA O BOTÃO PRINCIPAL */}
                <label 
                    htmlFor={id} 
                    className="
                        px-6 py-3 
                        rounded-[5px] 
                        text-[1.3rem] font-bold text-white cursor-pointer 
                        bg-[var(--destaque)] 
                        hover:bg-[var(--azul-segundario)] 
                        transition duration-300
                    "
                >
                    {texto_input}
                </label>
                {/* FIM DO ESTILO PADRONIZADO */}

                {/* MENSAGEM DE SUCESSO CORRIGIDA */}
                {arquivoSelecionado && fileName && (
                    <p className="text-[1.2rem] font-semibold text-green-600">
                        Arquivo <span className="font-bold">{fileName}</span> selecionado com sucesso
                    </p>
                )}
            </div>
        </div>
    );
}

// =========================================================================
// 🔚 FIM DO INPUT_ARQUIVO
// =========================================================================


interface EnderecoState {
    id: number;
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    complemento: string;
    isPrincipal: boolean;
}

function converterInputParaDDMMYYYY(dataInput: string): string {
    const [ano, mes, dia] = dataInput.split('-');
    return `${dia}-${mes}-${ano}`;
}

function Cadastro_Aluno(){
    console.log("carregando")
    const navigate = useNavigate();

    const [nome, setNome] = useState("")
    const [cpf, setCPF] = useState("");
    const [data, setData] = useState("");
    const [ddd, setDDD] = useState("");
    const [telefone, setTelefone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 

    const [enderecos, setEnderecos] = useState<EnderecoState[]>([
        {
            id: 1,
            cep: "",
            rua: "",
            numero: "",
            bairro: "",
            complemento: "",
            isPrincipal: true
        }
    ]);

    const [permissao_medica, setPermissao_medica] = useState(false);
    const [medicamento, setMedicamento] = useState("")
    const [tratProposto, setTratProposto] = useState("")
    console.log(tratProposto)
    const [categoria, setCategoria] = useState("")
    
    const [observacoes, setObservacoes] = useState("")
    const [email, setEmail] = useState("");
    const [outro_telefone, setOutro_telefone] = useState("")
    const [outro_DDD, setOutroDDD] = useState("")
    const [ativo, setAtivo] = useState("")

    // 🔴 CORREÇÃO CRÍTICA: O estado deve aceitar STRING (Base64)
    const [arquivoComprimido, setArquivoComprimido] = useState<{[key: string]: string}>({}) 

    const fetchAddressByCep = async (cep: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                console.error("CEP não encontrado.");
                return null;
            } else {
                return {
                    rua: data.logradouro,
                    bairro: data.bairro,
                };
            }
        } catch (error) {
            console.error("Falha ao buscar o CEP:", error);
            return null;
        }
    };

    console.log(medicamento);

    const adicionarEndereco = () => {
        const novoId = Math.max(...enderecos.map(e => e.id), 0) + 1;
        setEnderecos([...enderecos, {
            id: novoId,
            cep: "",
            rua: "",
            numero: "",
            bairro: "",
            complemento: "",
            isPrincipal: false
        }]);
    };

    const removerEndereco = (id: number) => {
        if (enderecos.length > 1) {
            setEnderecos(enderecos.filter(e => e.id !== id));
        }
    };

    const atualizarEndereco = async (id: number, campo: keyof EnderecoState, valor: any) => {
        
        let novoEnderecos = enderecos.map(e => 
            e.id === id ? { ...e, [campo]: valor } : e
        );
        
        if (campo === 'cep') {
            const cepDigits = String(valor).replace(/\D/g, '');

            if (cepDigits.length === 8) {
                const addressData = await fetchAddressByCep(cepDigits);

                if (addressData) {
                    novoEnderecos = novoEnderecos.map(e => 
                        e.id === id ? { 
                            ...e, 
                            rua: addressData.rua || '', 
                            bairro: addressData.bairro || '',
                        } : e
                    );
                } else {
                    novoEnderecos = novoEnderecos.map(e => 
                        e.id === id ? { ...e, rua: '', bairro: '' } : e
                    );
                }
            } else {
                 novoEnderecos = novoEnderecos.map(e => 
                    e.id === id ? { ...e, rua: '', bairro: '' } : e
                );
            }
        }

        setEnderecos(novoEnderecos);
    };

    function permitirInputs(state: boolean){
        setPermissao_medica(state);
    }

    async function submitAluno(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (isLoading) return; 
        setIsLoading(true); 

        console.log("chego")
        
        if (password !== confirmarPassword) {
            alert("As senhas não coincidem. Por favor, verifique.");
            setIsLoading(false);
            return;
        }


        const contatos: Contato[] = [];
        
        if (ativo !== "") {
            const contato: Contato = {
                tipo: ativo === "email_opcao" ? "email" : "telefone",
                valor: ativo === "email_opcao" ? email : outro_DDD + outro_telefone,
                observacao: observacoes,
            };
            contatos.push(contato);
        }

        const enderecosFormatados: EnderecoType[] = enderecos.map(end => ({
            tipo: "residencial",
            rua: end.rua, 
            numero: end.numero,
            complemente: end.complemento,
            bairro: end.bairro,
            cidade: "São Paulo", 
            estado: "SP",       
            cep: end.cep,
            principal: end.isPrincipal,
        }));
        
        // Se a tipagem de Aluno foi corrigida para string, este objeto estará correto
        const aluno: Aluno = {
                name: nome,
                phone: ddd + telefone,
                password: password,
                cpf: cpf,
                profession: categoria,
                birth_date: converterInputParaDDMMYYYY(data),
                fotos: arquivoComprimido, // Contém Base64 (string)
                contatos: contatos, 
                enderecos: enderecosFormatados
        }

        const isCadastrado = await cadastrar_aluno(aluno);
        
        if (isCadastrado)
        {
            alert("Aluno cadastrado com sucesso!");
            setIsLoading(false); 
            navigate("/login/aluno");
        }
        else {
            alert("Erro ao cadastrar aluno. Por favor, tente novamente.");
            setIsLoading(false); 
        }

        return aluno

    }


    console.log("Quantidade de arquivos:", Object.keys(arquivoComprimido).length);
    console.log("Arquivos:", arquivoComprimido);

    return(
        <div className="flex flex-col items-start w-full mt-10"> 
            <main className="flex flex-col w-[80vw] px-[2%] self-center"> 
                <header className="flex justify-start flex-col mb-10">
                    <div>
                        <h1 className={`${Estilizacoes.titulo_principal} text-[2rem]`}>Cadastro de Aluno</h1>
                    </div>
                    <div>
                        <h1 className={`${Estilizacoes.segundo_titulo_principal} text-[var(--foreground)]`}>Informe os dados abaixo para criar o acesso</h1>
                    </div>
                </header>
                    <form onSubmit={(e) => submitAluno(e)}>
                        <section id="info-pessoais-section" className="flex justify-start items-start flex-col gap-5 w-full  ">
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
                                    required
                                />
                                
                            </div>

                            <div id="campo-numero" className="flex justify-start items-start flex-row w-full gap-8">
                                <div className="w-1/5">
                                    <Input
                                        id="ddd"
                                        label="DDD"
                                        value={ddd}
                                        onChange={(e) => setDDD(e.target.value.replace(/\D/g, ''))} 
                                        type = "tel" 
                                        pattern="[0-9]+"
                                        placeholder = "Ex: 11" 
                                        required 
                                        maxLength={2} 
                                    />
                                </div>

                                <div className="w-full">
                                    <Input
                                        id="telefone"
                                        label="Telefone"
                                        value={telefone}
                                        onChange={(e) => setTelefone(e.target.value.replace(/\D/g, ''))} 
                                        type = "tel" 
                                        pattern="[0-9]+"
                                        placeholder = "999999999" 
                                        required 
                                        maxLength={9} 
                                    />
                                </div>

                            </div>

                            <div className="w-full">
                                <Input
                                    id="senha"
                                    label="Senha"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type = "password"
                                    pattern="[a-zA-Z0-9/]+"
                                    placeholder = "Digite a senha"
                                    required 
                                />
                            </div>
                            <div className="w-full">
                                <Input
                                    id="confirmar-senha"
                                    label="Confirmar Senha"
                                    value={confirmarPassword}
                                    onChange={(e) => {
                                        setConfirmarPassword(e.target.value);
                                        if (e.target.value !== password) {
                                            setPasswordError(true);
                                        } else {
                                            setPasswordError(false);
                                        }
                                    }}
                                    type = "password"
                                    pattern="[a-zA-Z0-9/]+"
                                    placeholder = "Confirme a senha"
                                    error={passwordError && confirmarPassword !== ""}
                                    errorMessage="As senhas não coincidem"
                                    required 
                                />
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
                                    required 
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
                                    required 
                                    
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
                            // Passando a string Base64 para o estado
                            onArquivoComprimido={(comprimido) => setArquivoComprimido(prev => ({...prev, ["ft-postura"]: comprimido }))}
                            />
                        </div>

                        <div id="endereco-complementar" className="w-full my-11 flex flex-col gap-6">
                            
                            <div className="flex flex-col gap-6">
                                {enderecos.map((endereco, index) => (
                                    <Endereco
                                        key={endereco.id}
                                        titulo={index === 0 ? "Endereço Principal" : `Endereço ${index + 1}`}
                                        cep={endereco.cep}
                                        setCep={(valor) => atualizarEndereco(endereco.id, 'cep', typeof valor === 'function' ? valor(endereco.cep) : valor)}
                                        rua={endereco.rua}
                                        setRua={(valor) => atualizarEndereco(endereco.id, 'rua', typeof valor === 'function' ? valor(endereco.rua) : valor)}
                                        numero={endereco.numero}
                                        setNumero={(valor) => atualizarEndereco(endereco.id, 'numero', typeof valor === 'function' ? valor(endereco.numero) : valor)}
                                        bairro={endereco.bairro}
                                        setBairro={(valor) => atualizarEndereco(endereco.id, 'bairro', typeof valor === 'function' ? valor(endereco.bairro) : valor)}
                                        complemento={endereco.complemento}
                                        setComplemento={(valor) => atualizarEndereco(endereco.id, 'complemento', typeof valor === 'function' ? valor(endereco.complemento) : valor)}
                                        isPrincipal={endereco.isPrincipal}
                                        setIsPrincipal={(valor) => atualizarEndereco(endereco.id, 'isPrincipal', typeof valor === 'function' ? valor(endereco.isPrincipal) : valor)}
                                        mostrarPrincipal={index > 0}
                                        onRemover={enderecos.length > 1 ? () => removerEndereco(endereco.id) : undefined}
                                    />
                                ))}
                            </div>
                            <div className="text-[1.5rem] flex flex-row gap-10 flex-wrap">
                                <div className="flex gap-8 items-center justify-center">
                                    <div>
                                        <h1 className={Estilizacoes.titulo_segundario}>Adicionar outro endereço</h1>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className="flex items-center justify-center w-[50px] h-full rounded-full text-[2rem] text-white cursor-pointer bg-[var(--azul-segundario)]"
                                            onClick={adicionarEndereco}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


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
                                        onArquivoComprimido={(comprimido) => setArquivoComprimido(prev => ({...prev, ["histico-medico"]: comprimido }))}

                                        />
                                    </div>

                                    <div className="w-full">
                                        <Input_Arquivo
                                        id="diagnostico"
                                        titulo="Diagnóstico"
                                        label="Selecione uma imagem dos seus arquivos"
                                        texto_input="Clique aqui para selecionar"
                                        onArquivoComprimido={(comprimido) => setArquivoComprimido(prev => ({...prev, ["diagnostico"]: comprimido }))}

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
                            <div className="inline-block"> 
                                <Botao 
                                    texto={isLoading ? "Cadastrando..." : "Cadastrar Aluno"} 
                                    type="submit"
                                />
                            </div>
                        </section>

                    </form>
            </main>
        </div>
    )
}

export default Cadastro_Aluno;