import { useState, useEffect } from "react";
import Input from "./../../../components/Input/Input";
import Estilizacoes from "../../../uteis/Estilizacoes";
import { fetchStudentsList, type Student } from "./../../../services/aluno/fetchStudentsList";
import { fetchAulasDisponiveisAluno, type AulaDisponivel } from "./../../../services/aluno/fetchAulasDisponiveis";
import { enrollStudentInAula } from "./../../../services/aluno/enrollStudentInAula";

export default function CadastroAlunoAula() {
    const [alunoOptions, setAlunoOptions] = useState<{value: string, label: string}[]>([]);
    const [alunoSelecionado, setAlunoSelecionado] = useState("");
    const [alunoNome, setAlunoNome] = useState("");
    const [carregandoAlunos, setCarregandoAlunos] = useState(true);
    const [pesquisarClicado, setPesquisarClicado] = useState(false);
    const [aulasDisponiveis, setAulasDisponiveis] = useState<AulaDisponivel[]>([]);
    const [carregandoAulas, setCarregandoAulas] = useState(false);
    const [aulasSelecionadas, setAulasSelecionadas] = useState<Set<number>>(new Set());
    const [cadastrando, setCadastrando] = useState(false);

    // Carregar lista de alunos
    useEffect(() => {
        async function carregar() {
            setCarregandoAlunos(true);
            try {
                const alunos = await fetchStudentsList();
                if (alunos && Array.isArray(alunos)) {
                    const options = [
                        { value: "", label: "Selecione um Aluno" },
                        ...alunos.map((aluno: Student) => ({
                            value: aluno.id.toString(),
                            label: aluno.fullname
                        }))
                    ];
                    setAlunoOptions(options);
                } else {
                    console.error("Formato de resposta inválido:", alunos);
                    setAlunoOptions([{ value: "", label: "Erro ao carregar alunos" }]);
                }
            } catch (error) {
                console.error("Erro ao carregar alunos:", error);
                setAlunoOptions([{ value: "", label: "Erro ao carregar alunos" }]);
            } finally {
                setCarregandoAlunos(false);
            }
        }

        carregar();
    }, []);

    // Buscar aulas disponíveis quando clicar em pesquisar
    useEffect(() => {
        if (!pesquisarClicado || !alunoSelecionado) return;

        async function buscarAulas() {
            setCarregandoAulas(true);
            try {
                const aulas = await fetchAulasDisponiveisAluno(alunoSelecionado);
                setAulasDisponiveis(aulas);
            } catch (error) {
                console.error("Erro ao buscar aulas disponíveis:", error);
                setAulasDisponiveis([]);
            } finally {
                setCarregandoAulas(false);
            }
        }

        buscarAulas();
    }, [pesquisarClicado, alunoSelecionado]);

    const handlePesquisar = () => {
        if (!alunoSelecionado) {
            alert("Por favor, selecione um aluno");
            return;
        }
        setAulasSelecionadas(new Set());
        setPesquisarClicado(true);
    };

    const toggleAulaSelecionada = (idAula: number) => {
        setAulasSelecionadas(prev => {
            const novoSet = new Set(prev);
            if (novoSet.has(idAula)) {
                novoSet.delete(idAula);
            } else {
                novoSet.add(idAula);
            }
            return novoSet;
        });
    };

    const handleCadastrar = async () => {
        if (aulasSelecionadas.size === 0) {
            alert("Por favor, selecione pelo menos uma aula");
            return;
        }

        setCadastrando(true);

        try {
            const promises = Array.from(aulasSelecionadas).map(idAula => 
                enrollStudentInAula(idAula, parseInt(alunoSelecionado))
            );

            const resultados = await Promise.all(promises);
            const sucessos = resultados.filter(r => r).length;
            const falhas = resultados.length - sucessos;

            if (falhas === 0) {
                alert(`Aluno matriculado com sucesso em ${sucessos} aula(s)!`);
                setPesquisarClicado(false);
                setAulasSelecionadas(new Set());
            } else {
                alert(`${sucessos} aula(s) cadastrada(s) com sucesso. ${falhas} falha(s).`);
            }
        } catch (error) {
            console.error("Erro ao cadastrar aluno nas aulas:", error);
            alert("Erro ao cadastrar aluno nas aulas. Por favor, tente novamente.");
        } finally {
            setCadastrando(false);
        }
    };

    const formatDate = (dateString: string): string => {
        if (dateString.includes('/')) return dateString;
        try {
            const parts = dateString.split('-');
            if (parts.length === 3) {
                return `${parts[0]}/${parts[1]}/${parts[2]}`;
            }
        } catch (e) {
            console.error("Erro ao formatar data:", e);
        }
        return dateString;
    };

    return (
        <main className="w-full h-full flex flex-col px-[15%] py-[5%]">
            <header className="w-full h-full flex gap-5 flex-col mb-8 md:flex-row">
                <div className={`${Estilizacoes.titulo_principal} w-full`}>
                    <h1>Cadastrar Aluno em Aula</h1>
                </div>
            </header>

            <section className="w-full h-full flex flex-col justify-center items-start gap-8 py-8">
                <div className="flex flex-col lg:flex-row gap-10 w-full">
                    <div className="flex-1">
                        <div>
                            <h1 className={Estilizacoes.titulo_segundario}>Selecione o Aluno</h1>
                        </div>
                        <Input
                            id="aluno-input"
                            name="aluno-input"
                            as="select"
                            options={alunoOptions}
                            onChange={(e) => {
                                const valor = e.target.value;
                                setAlunoSelecionado(valor);
                                const select = e.target as HTMLSelectElement;
                                const label = select.options[select.selectedIndex]?.text ?? "";
                                setAlunoNome(label);
                                setPesquisarClicado(false);
                            }}
                        />
                    </div>
                </div>

                <div className="w-full flex justify-center mt-6">
                    <button
                        type="button"
                        onClick={handlePesquisar}
                        disabled={carregandoAlunos || !alunoSelecionado}
                        className="w-full max-w-md flex justify-center items-center p-5 m-0 
                        text-white hover:!text-white text-[1.5rem] md:text-[1.3rem] font-semibold text-center tracking-[1px] rounded-md whitespace-nowrap h-[50px] cursor-pointer 
                        transition-all duration-200 bg-[var(--azul-segundario)] hover:!bg-[var(--destaque)]
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {carregandoAlunos ? "Carregando..." : "Pesquisar Aulas Disponíveis"}
                    </button>
                </div>

                {pesquisarClicado && (
                    <div className="w-full flex flex-col gap-6">
                        <div className="flex flex-col gap-4 justify-center w-full pb-4">
                            <h1 className={Estilizacoes.titulo_principal}>Aulas Disponíveis</h1>
                            <h1 className={Estilizacoes.titulo_segundario}>
                                Selecione uma ou mais aulas para matricular {alunoNome}
                            </h1>
                        </div>

                        {carregandoAulas ? (
                            <div className="flex justify-center items-center py-10">
                                <p className="text-xl text-gray-600">Carregando aulas disponíveis...</p>
                            </div>
                        ) : aulasDisponiveis.length === 0 ? (
                            <div className="flex justify-center items-center py-10">
                                <p className="text-xl text-gray-600">Nenhuma aula disponível para este aluno</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {aulasDisponiveis.map((aula) => (
                                        <div
                                            key={aula.id}
                                            onClick={() => toggleAulaSelecionada(aula.id)}
                                            className={`cursor-pointer shadow-lg rounded-lg p-6 transition-all duration-300 
                                            ${aulasSelecionadas.has(aula.id) 
                                                ? 'bg-[var(--destaque)] text-white border-4 border-[var(--destaque)]' 
                                                : 'bg-white text-gray-800 border-2 border-gray-200 hover:border-[var(--destaque)]'
                                            }`}
                                        >
                                            <div className="flex flex-col gap-3">
                                                <h3 className={`text-lg font-bold ${aulasSelecionadas.has(aula.id) ? 'text-white' : 'text-[var(--destaque)]'}`}>
                                                    {formatDate(aula.data)} - {aula.horario}
                                                </h3>
                                                <p className="text-sm">
                                                    <span className="font-semibold">Instrutor:</span> {aula.instructor.nome}
                                                </p>
                                                <p className="text-sm">
                                                    <span className="font-semibold">Unidade:</span> {aula.unidade.name}
                                                </p>
                                                <p className="text-sm">
                                                    <span className="font-semibold">Vagas:</span> {aula.vagas_disponiveis}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="w-full flex justify-center mt-6">
                                    <button
                                        type="button"
                                        onClick={handleCadastrar}
                                        disabled={aulasSelecionadas.size === 0 || cadastrando}
                                        className="w-full max-w-md flex justify-center items-center p-5 m-0 
                                        text-white hover:!text-white text-[1.5rem] md:text-[1.3rem] font-semibold text-center tracking-[1px] rounded-md whitespace-nowrap h-[50px] cursor-pointer 
                                        transition-all duration-200 bg-[var(--azul-segundario)] hover:!bg-[var(--destaque)]
                                        disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {cadastrando 
                                            ? "Cadastrando..." 
                                            : `Matricular em ${aulasSelecionadas.size} aula(s)`
                                        }
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </section>
        </main>
    );
}
