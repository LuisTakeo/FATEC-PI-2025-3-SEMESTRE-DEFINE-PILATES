import { useState, useEffect } from "react";
import Estilizacoes from "../../../uteis/Estilizacoes";
import type { Unidade } from "../../../types/InstrutorUnidade";
import { API_BASE_URL } from "../../../config/api"
import { Cadastrar_aula } from "./../../../services/aula/cadastrar_aula"


export default function AulasDisponiveis({unidade, instrutor, data, onPesquisar}:{
    unidade: Unidade | any;
    instrutor: string;
    data: string;
    onPesquisar: boolean;
}){

    const [horariosAula, setHorariosAula] = useState<string[]>([]);
    const [mensagemErro, setMensagemErro] = useState("")
    const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>("")
    const [instrutorNome, setInstrutorNome] = useState("")
    const [carregando, setCarregando] = useState(false);
    const [cadastrando, setCadastrando] = useState(false);

    const tratarErroBackend = (err: any) => {
        if (err.status === 404) {
            return { erro: true, mensagem: "Horario não encontrado" }
        }

        if (err.status === 400) {
            return { erro: true, mensagem: "Erro nos dados, a sua solicitação foi inválida" }
        }

        return { erro: true, mensagem: "Erro inesperado, tente novamente" }
    }

    useEffect(() => {
        if (!onPesquisar || !unidade || !instrutor || !data) return;

        const horarios = [
            "07:00", "08:00", "09:00", "10:00",
            "11:00", "12:00", "13:00", "14:00", "15:00",
            "16:00", "17:00", "18:00", "19:00", "20:00",
            "21:00"
        ];

        const fetchAula = async () => {
            setCarregando(true);
            try {
                const response = await fetch(`${API_BASE_URL}/aulas`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true"
                    }
                });
                if (!response.ok) throw new Error("Erro ao buscar aulas");

                const lista = await response.json();
                
                console.log("Horarios",lista.data)

                const horariosDisponiveis = horarios.filter(h =>
                    !lista.data.some((aula: any) =>
                        aula.unidade.id == unidade &&
                        aula.instructor.id == instrutor &&
                        aula.data === data &&
                        aula.horario === h
                    )
                );

                setHorariosAula(horariosDisponiveis);
                setMensagemErro("");
         
            } catch (err: any) {
                const erroTratado = tratarErroBackend(err);
                setMensagemErro(erroTratado.mensagem);
                setHorariosAula([]);
            } finally {
                setCarregando(false);
            }
        };

        fetchAula();
    }, [onPesquisar, unidade, instrutor, data]);

    useEffect(() => {
        if (!instrutor) return;

        async function fetchInstrutor() {
            try {
                const response = await fetch(`${API_BASE_URL}/instructors`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true"
                    }
                });
                if (!response.ok) throw new Error("Erro ao buscar nome do instrutor");

                const data = await response.json();

                const instrutorEncontrado = data.data.find((i: any) => i.id == instrutor);
                if (instrutorEncontrado)
                    setInstrutorNome(instrutorEncontrado.nome); 
            } catch (error) {
                console.error("Erro ao buscar instrutor:", error);
            }
        }

        fetchInstrutor();
    }, [instrutor]);


    


    async function handleAula(e: React.MouseEvent<HTMLButtonElement>, instrutor: string, unidade: number, horarioSelecionado: string | null, data: string) {
        e.preventDefault()

        setCadastrando(true);

        try {
            const aula = {
                id_tipo_aula: 1, 
                id_instrutor: instrutor, 
                id_studio: unidade,
                data: data, 
                horario: horarioSelecionado 
            }

            console.log(aula)

            const isCadastrado = await Cadastrar_aula(aula);
            
            if (isCadastrado)
            {
                alert("Aula cadastrada com sucesso!");
            }
            else
                alert("Erro ao cadastrar aula. Por favor, tente novamente.");

            return aula;
        } finally {
            setCadastrando(false);
        }
    }





    return(
        <form>

            <section className="flex flex-col gap-10 w-full">
                {onPesquisar && (
                    <>
                        <div className="flex flex-col gap-4 justify-center w-full pb-10">
                            <h1 className={Estilizacoes.titulo_principal}>Aulas disponiveis</h1>
                            <h1 className={Estilizacoes.titulo_segundario}>Escolha qual horário o instrutor selecionado irá ministrar sua aula, conforme a data selecionada</h1>
                        </div>

                        <div>
                            <h1 className={`${Estilizacoes.titulo_principal}`}>{instrutorNome} - {data.replace("-", "/").replace("-", "/")}</h1>
                        </div>

                        {carregando ? (
                            <div className="flex justify-center items-center py-10">
                                <p className="text-xl text-gray-600">Carregando horários disponíveis...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 mb-10 py-[3%]">
                                {horariosAula.map((i) => (
                                <div 
                                key={i}
                                id="bloco-instrtor"
                                className={`shadow-2xl rounded-[8px] min-w-full min-h-[100px] 
                                            flex flex-col items-center justify-center px-[30px]  gap-5 
                                            md:flex-row md:min-h-[130px] 
                                            ${horarioSelecionado === i ? "bg-red-500" : "bg-white"}`}
                                onClick={() => {
                                    setHorarioSelecionado(horarioSelecionado === String(i) ? null : String(i))
                                }}
                                >
                                    <div className="w-[50%] h-5 flex items-center justify-center">
                                        <h1 className="text-[1.5rem]">
                                            Horário:{i}
                                        </h1>
                                    </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {mensagemErro !== "" && (
                            <div>
                                <h1 className="text-[1.3rem] text-red-700 md:text-[1.3rem]">{mensagemErro}</h1>
                            </div>
                        )}

                        <button 
                            onClick={(e) => handleAula(e, instrutor, unidade, horarioSelecionado, data)}
                            type="submit"
                            disabled={!horarioSelecionado || carregando || cadastrando}
                            className="w-full flex justify-center items-center p-5 m-0 
                            text-white hover:!text-white text-[1.5rem] md:text-[1.3rem] font-semibold text-center tracking-[1px] rounded-md whitespace-nowrap h-[50px] cursor-pointer 
                            transition-all duration-200 bg-[var(--azul-segundario)] hover:!bg-[var(--destaque)] 
                            disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {cadastrando ? "Cadastrando..." : "Cadastrar Aula"}
                        </button>
                    </>
                )}
            </section>

        </form>
    )
}