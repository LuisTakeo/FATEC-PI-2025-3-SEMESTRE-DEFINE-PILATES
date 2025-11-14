import { useState, useEffect } from "react";
import Estilizacoes from "../../../uteis/Estilizacoes";
import Botao from "../../../components/Botao/Botao"
import type { Unidade } from "../../../types/InstrutorUnidade";
import { API_BASE_URL } from "../../../config/api"

export default function AulasDisponiveis({unidade, instrutor, data}:{
    unidade: Unidade | null;
    instrutor: string | null;
    data: string;
}){

    console.log(unidade, instrutor,  data)

    const [listAllow, setListAllow] = useState(false)
    const [horariosAula, setHorariosAula] = useState<string[]>([]);
    const [mensagemErro, setMensagemErro] = useState("")


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
        if (!unidade || !instrutor || !data) return;

        const horarios = [
            "07:00", "08:00", "09:00", "10:00",
            "11:00", "12:00", "13:00", "14:00", "15:00",
            "16:00", "17:00", "18:00", "19:00", "20:00",
            "21:00"
        ];

        const fetchAula = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/class`);
                if (!response.ok) throw new Error("Erro ao buscar aulas");

                const lista = await response.json();
                
                const horariosDisponiveis = horarios.filter(h =>
                    !lista.some((aula: any) =>
                        aula.horario === h &&
                        aula.unidade === unidade.valor &&
                        aula.instrutor === instrutor &&
                        aula.data === data
                    )
                );

                setHorariosAula(horariosDisponiveis);
                setListAllow(true);
            } catch (err: any) {
                const erroTratado = tratarErroBackend(err);
                setMensagemErro(erroTratado.mensagem);
                setListAllow(false);
            }
        };

        fetchAula();
    }, [unidade, instrutor, data]);

    async function handleAula(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
    }





    return(
        <form onSubmit={(e) => handleAula(e)}>

            <section className="flex flex-col gap-10 w-full">
                <div className="flex flex-col gap-4 justify-center w-full pb-10">
                    <h1 className={Estilizacoes.titulo_principal}>Aulas disponiveis</h1>
                    <h1 className={Estilizacoes.titulo_segundario}>Escolha qual horário o instrutor selecionado irá ministrar sua aula, conforme a data selecionada</h1>
                </div>

                {listAllow && (
                    <>
                        <div>
                            <h1>{instrutor} - {data}</h1>
                        </div>

                        <div className="w-full flex flex-col gap-10">
                            {horariosAula.map((i) => (
                                <div 
                                key={i}
                                id="bloco-instrtor"
                                className="bg-white shadow-2xl rounded-[8px] min-w-full min-h-[230px] 
                                flex flex-col items-center justify-between px-[30px] py-[30px] gap-5 
                                md:flex-row md:min-h-[130px] ">
                                    <div className="w-[50%]">
                                        <h1 className="text-[1.5rem]">
                                            Horário:{i}
                                        </h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )} 

                {mensagemErro !== "" && (
                    <div>
                        <h1 className="text-[1.3rem] text-red-700 md:text-[1.3rem]">{mensagemErro}</h1>
                    </div>
                )}
            </section>

        <Botao texto="Cadastrar Aula" type="submit"/>

        </form>
    )
}