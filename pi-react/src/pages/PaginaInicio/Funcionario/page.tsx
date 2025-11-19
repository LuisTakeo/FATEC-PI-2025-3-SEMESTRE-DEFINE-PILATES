"use client";
import BlocoHome from "./../../../components/BlocoHome/BlocoHome"
import Estilizacoes from "../../../uteis/Estilizacoes";
import { useState } from "react";

interface Item {
    texto: string;
    subtexto?: string; 
    link: string;
}

export default function HomeFuncionario(){
    const rotas = (): Item[] => {
    
    const usuarioInfo = localStorage.getItem("Define-Pilates-UserInfo")
    const usuarioIfoObj = usuarioInfo ? JSON.parse(usuarioInfo) : null;
    const userRole = usuarioIfoObj ? usuarioIfoObj.type : null; 
    
    let isLogado = true
        if (!isLogado || !userRole) return [];

        switch(userRole) {
            case "administrator":
                return [
                    { texto: "Cadastros", link: "/admin/Home", subtexto: "Cadastro e gestão de usuários." },
                    { texto: "Pesquisa geral", link: "/admin/pesquisa-usuarios", subtexto: "Pesquise por clientes e funcionários." },
                    { texto: "Consultar agendas", link: "/home/funcionario", subtexto: "Consulte todas as agendas de aulas." },
                    { texto: "Marcar aula", link: "/home/funcionario", subtexto: "Agende aulas para aluno(a) e instrutor(a) específico(a)." },
                ];
            case "receptionist":
                return [
                    { texto: "Cadastro de aluno", link: "/cadastro/aluno", subtexto: "Cadastre novos alunos rapidamente." },
                    { texto: "Pesquisa geral", link: "/admin/pesquisa-usuarios", subtexto: "Pesquise por clientes ou outros usuários." }
                ];
            case "instructor":
                return [
                    { texto: "Consultar agenda", link: "/calendario/funcionario", subtexto: "Visualize a sua agenda semanal de aulas." },
                ];
            default:
                return [];
        }
    }

    const itensAtuais = rotas();
    const isLogado = itensAtuais.length > 0;
    
    // Verifica se há apenas um item (caso do Instrutor)
    const isSingleItem = itensAtuais.length === 1 && itensAtuais[0].texto === "Consultar agenda";
    
    // Define as classes da seção: se for um item, usa flexbox centralizado, se não, usa o grid original.
    const sectionClasses = isSingleItem 
        ? "w-full h-full flex justify-center items-start" // Flexbox para centralizar um único item
        : "w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-6"; // Grid original (para Admin/Recepcionista)
    

    return (
        <main className="w-full h-full px-[8%] flex flex-col gap-6 py-2">

            <header>
                <h1 className={Estilizacoes.titulo_principal}>Tela de inicio de funcionário</h1>
            </header>

            <div>
                <h1 className="text-2xl font-semibold text-gray-800 py-3">Serviços</h1>
            </div>
            
            {/* Usamos a classe dinâmica que escolhe Flexbox para centralizar */}
            <section className={sectionClasses}> 
                {isLogado && itensAtuais.map((item, index) => (
                    // 🎯 MUDANÇA CRÍTICA AQUI: Se for item único, ele ocupa metade do espaço da tela
                    // (que é o tamanho que ele tinha no grid original, w-1/2) e é centralizado.
                    <div key={index} className={isSingleItem ? "w-full sm:w-1/2" : "w-full"}>
                        <BlocoHome 
                            // O BlocoHome não precisa de classes aqui, o <div> pai controla o tamanho
                            texto={item.texto} 
                            subtexto={item.subtexto}
                            link={item.link} 
                        />
                    </div>
                ))}
            </section>
        </main>
    );
}