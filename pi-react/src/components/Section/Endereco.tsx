import Estilizacoes from "../../model/Estilizacoes";
import Input from "./../Input/Input";

interface EnderecoProps {
    titulo?: string;
    cep: string;
    setCep: React.Dispatch<React.SetStateAction<string>>;
    rua: string;
    setRua: React.Dispatch<React.SetStateAction<string>>;
    numero: string;
    setNumero: React.Dispatch<React.SetStateAction<string>>;
    bairro: string;
    setBairro: React.Dispatch<React.SetStateAction<string>>;
    complemento: string;
    setComplemento: React.Dispatch<React.SetStateAction<string>>;
    isPrincipal?: boolean;
    setIsPrincipal?: React.Dispatch<React.SetStateAction<boolean>>;
    mostrarPrincipal?: boolean;
    onRemover?: () => void;
}

export default function Endereco({
    titulo = "Endereço",
    cep, setCep,
    rua, setRua,
    numero, setNumero,
    bairro, setBairro,
    complemento, setComplemento,
    isPrincipal,
    setIsPrincipal,
    mostrarPrincipal = false,
    onRemover
}: EnderecoProps) {
    return (
        <section id="endereço" className="flex justify-start items-start flex-col gap-5 mt-5">
            <div className="flex justify-between items-center w-full">
                <div>
                    <h1 className={Estilizacoes.segundo_titulo_principal}>{titulo}</h1>
                </div>
                {onRemover && (
                    <button
                        type="button"
                        onClick={onRemover}
                        className="text-red-500 hover:text-red-700 font-semibold text-[1.2rem]"
                    >
                        Remover
                    </button>
                )}
            </div>

            {/* aplicar api */}

           <div className="w-full">
                <Input
                    id={`cep-${titulo}`}
                    label="CEP"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    type="text"
                    pattern="[-0-9]+"
                    placeholder="CEP"
                    
                    maxLength={8}
                />
            </div>

            <div className="flex justify-start items-start w-full gap-4">
                <div className="w-[75%]">
                    <Input
                        id={`rua-${titulo}`}
                        label="Rua"
                        value={rua}
                        onChange={(e) => setRua(e.target.value)}
                        type="text"
                        pattern=".*"
                        placeholder="Digite a Rua"
                        
                    />
                </div>

                <div className="w-[25%]">
                    <Input
                        id={`numero-${titulo}`}
                        label="Número"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        type="text"
                        pattern=".*"
                        placeholder="Número"
                        
                    />
                </div>
            </div>

            <div className="w-full">
                <Input
                    id={`bairro-${titulo}`}
                    label="Bairro"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    type="text"
                    pattern=".*"
                    placeholder="Digite o Bairro"
                    
                />
            </div>

            <div className="w-full">
                <Input
                    id={`complemento-${titulo}`}
                    label="Complemento"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                    type="text"
                    pattern=".*"
                    placeholder="Ex: Apartamento 156"
                    
                />
            </div>

            {mostrarPrincipal && setIsPrincipal && (
                <div className="flex flex-row gap-6 w-full justify-start my-4">
                    <h1 className="text-[1.2rem] font-semibold text-[var(--foreground)]">
                        Este endereço é principal?
                    </h1>
                    <div className="mx-5">
                        <input
                            type="radio"
                            id={`isPrincipal_true-${titulo}`}
                            name={`isPrincipal-${titulo}`}
                            onChange={() => setIsPrincipal(true)}
                            checked={isPrincipal === true}
                            className="scale-200 accent-[var(--destaque)]"
                        />
                        <label htmlFor={`isPrincipal_true-${titulo}`} className="text-[1.2rem] pl-5">
                            Sim
                        </label>
                    </div>
                    <div className="mx-5">
                        <input
                            type="radio"
                            id={`isPrincipal_false-${titulo}`}
                            name={`isPrincipal-${titulo}`}
                            onChange={() => setIsPrincipal(false)}
                            checked={isPrincipal === false}
                            className="scale-200 accent-[var(--destaque)]"
                        />
                        <label htmlFor={`isPrincipal_false-${titulo}`} className="text-[1.2rem] pl-5">
                            Não
                        </label>
                    </div>
                </div>
            )}
        </section>
    );
}
