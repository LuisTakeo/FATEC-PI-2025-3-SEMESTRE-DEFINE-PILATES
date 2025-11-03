import BlocoHome from "./../../../components/BlocoHome/BlocoHome"
import Estilizacoes from "../../../model/Estilizacoes";
import { useState } from "react";

interface Item {
    texto: string;
    link: string;
}

// interface HomeAlunoProps {
//     itens?: Item[];
//     cargo?: string;
// }



const KEY_IS_LOGGED = "isEmployeeLoggedIn";
const KEY_USER_ROLE = "userRole";

export default function HomeFuncionario(){
    const rotas = (): Item[] => {

        const isLogado = localStorage.getItem(KEY_IS_LOGGED) === "true";
        const userRole = localStorage.getItem(KEY_USER_ROLE);

        if (!isLogado || !userRole) return [];

        switch(userRole) {
            case "adm":
                return [
                    { texto: "Cadastro de colaborador", link: "/admin/Home" },
                    { texto: "Pesquisa geral", link: "/home/funcionario" },
                    { texto: "Consultar agendas", link: "/home/funcionario" },
                    { texto: "Marcar aula ou editar plano", link: "/home/funcionario" },
                    { texto: "Financeiro", link: "/home/funcionario" }
                ];
            case "recep":
                return [
                    { texto: "Cadastro de aluno", link: "/cadastro/aluno" },
                    { texto: "Pesquisa geral", link: "/pesquisa" }
                ];
            case "instr":
                return [
                    { texto: "Calendário aulas", link: "/calendario" },
                    { texto: "Pesquisa geral", link: "/pesquisa" }
                ];
            default:
                return [];
        }
    }

    const itensAtuais = rotas();
    const isLogado = itensAtuais.length > 0;

    return (
        <main className="w-full h-full px-[8%] flex flex-col gap-8">

            <header>
                <h1 className={Estilizacoes.titulo_principal}>Tela de inicio de funcionário</h1>
            </header>

            <div>
                <h1 className={Estilizacoes.titulo_principal}>Serviços</h1>
            </div>
            <section className="w-full h-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3
            gap-10">
                {isLogado && itensAtuais.map((item) => (
                    <BlocoHome 
                        texto={item.texto} 
                        link={item.link} 
                    />
                ))}
            </section>
        </main>
    );
}
