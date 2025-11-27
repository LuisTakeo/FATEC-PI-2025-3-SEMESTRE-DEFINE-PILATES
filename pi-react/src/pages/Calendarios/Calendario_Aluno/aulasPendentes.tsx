import { useEffect, useState } from "react";
import { FetchAulasPendentes } from "../../../services/aluno/fetchAulasPendentes"
import { CadastrarAlunoAula , type CadastroAulaResponse} from "../../../services/aluno/cadastrarAlunoAula";
import type { aulasPendentesType } from "../../../types/aulasPendentesType";
import Estilizacoes from "../../../uteis/Estilizacoes";
import Botao from "../../../components/Botao/Botao"

export default function AulasPendentes(){
    const [aulaPendente, setAulaPendente] = useState<aulasPendentesType[]>([])

    useEffect(() => {
      async function load() {
        const aulas = await FetchAulasPendentes();
        setAulaPendente(aulas);
      }
  
      load();
    }, []);

    console.log(aulaPendente)

    async function reposicaoAula(aula_id: number){

        try{
            const mensagem = await CadastrarAlunoAula(aula_id );
            console.log("Retornou:", mensagem?.message)
            
            if (mensagem?.message === "Aluno já está cadastrado nesta aula"){
                alert("Você já esta cadastrado nesta aula")
            }else if(mensagem?.message === "Aluno cadastrado na aula com sucesso"){
                alert("Cadastro neste aula finalizadocom sucesso, veja mais informações sobre esta aula no seu caléndario")
            }


        }catch(err){
            console.error("Erro ao cadastrar aluno em aula")
        }

        window.location.reload();

    }

    return(
        <section className="flex flex-col px-[15%] gap-10">
            <h1 className={Estilizacoes.titulo_principal}>Cadastre-se em alguma aula disponível abaixo</h1>
            <h1 className={Estilizacoes.titulo_principal}>Atualmente voce tem {aulaPendente.length} aulas pendentes</h1>

            {aulaPendente.length === 0 ? (
                <div className="flex flex-row w-full h-full items-center justify-center gap-5 p-20">
                    <h1 className="text-[1.5rem]">Você tem nenhuma aula pendente!</h1>
                    
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#26a269" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-smile-icon lucide-smile"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
                    </div>
                    
                </div>
            ) : (
                aulaPendente.map((aula) => (
                    <div
                        key={aula.id}
                        className="bg-white shadow-2xl rounded-[8px] min-w-full min-h-[230px] flex flex-col items-center justify-between px-[30px] py-[30px] gap-5 border-l-[10px] border-l-[var(--destaque)] md:flex-row md:min-h-[130px]"
                    >
                        <div className="flex flex-col text-[1.5rem] gap-3">
                            <h1><span className="font-semibold">Data da Aula:</span> {aula.data.replace("-", "/").replace("-", "/")}</h1>
                            <h1><span className="font-semibold">Unidade:</span> {aula.unidade.name}</h1>
                            <h1><span className="font-semibold">Instrutor:</span> {aula.instructor.nome}</h1>
                        </div>

                        <div className="flex flex-col md:w-[50%] w-full h-full gap-5 items-start md:items-end">
                            <h1 className="text-[1.4rem]">
                                {aula.vagas_disponiveis} vagas disponíveis!
                            </h1>       
                            <Botao texto="Cadastrar-me" type="submit" onClick={() => reposicaoAula(aula.id)}></Botao>
                        </div>
                        

                    </div>
                )))}

        </section>
    )
}