import BlocoHome from "./../../../components/BlocoHome/BlocoHome"
import Estilizacoes from "../../../uteis/Estilizacoes";
import { useState } from "react";

interface Item {
    texto: string;
    // 🎯 Adicionado subtexto opcional à interface Item
    subtexto?: string; 
    link: string;
}

export default function HomeFuncionario(){
    const rotas = (): Item[] => {
    const usuarioInfo = localStorage.getItem("Define-Pilates-UserInfo")
    console.log("Usuario Info:", usuarioInfo);
    console.log("Usuario Info Type:", typeof usuarioInfo);

    const usuarioIfoObj = usuarioInfo ? JSON.parse(usuarioInfo) : null;
    console.log("Usuario Info Obj:", usuarioIfoObj);
    const userRole = usuarioIfoObj ? usuarioIfoObj.type : null;
    console.log("User Role:", userRole);
    let isLogado = true
        if (!isLogado || !userRole) return [];

        switch(userRole) {
            case "Administrator":
                return [
                    { texto: "Cadastros", link: "/admin/Home", subtexto: "Cadastro e gestão de usuários." },
                    { texto: "Pesquisa geral", link: "/admin/pesquisa-usuarios", subtexto: "Pesquise por clientes e funcionários." },
                    { texto: "Consultar agendas", link: "/home/funcionario", subtexto: "Consulte todas as agendas de aulas." },
                    { texto: "Marcar aula", link: "/home/funcionario", subtexto: "Agende aulas para aluno(a) e instrutor(a) específico(a)." },
                    // { texto: "Financeiro", link: "/home/funcionario" }
                ];
            case "Recepcionist":
                return [
                    { texto: "Cadastro de aluno", link: "/cadastro/aluno", subtexto: "Cadastre novos alunos rapidamente." },
                    { texto: "Pesquisa geral", link: "/admin/pesquisa-usuarios", subtexto: "Pesquise por clientes ou outros usuários." }
                ];
            case "Instructor":
                return [
                    { texto: "Calendário aulas", link: "/calendario", subtexto: "Visualize a sua agenda semanal de aulas." },
                    { texto: "Pesquisa geral", link: "/pesquisa", subtexto: "Pesquise por informações de alunos e agendamentos." }
                ];
            default:
                return [];
        }
    }

    const itensAtuais = rotas();
    const isLogado = itensAtuais.length > 0;

    return (
        <main className="w-full h-full px-[8%] flex flex-col gap-6 py-2">

            <header>
                <h1 className={Estilizacoes.titulo_principal}>Tela de inicio de funcionário</h1>
            </header>

            <div>
                {/* Título Serviços: Preto e menor */}
                <h1 className="text-2xl font-semibold text-gray-800 py-3">Serviços</h1>
            </div>
            
            <section className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-6"> 
                {isLogado && itensAtuais.map((item, index) => (
                    <BlocoHome 
                        key={index}
                        texto={item.texto} 
                        subtexto={item.subtexto}
                        link={item.link} 
                    />
                ))}
            </section>
        </main>
    );
}