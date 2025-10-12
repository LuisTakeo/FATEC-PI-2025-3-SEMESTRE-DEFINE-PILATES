"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function CadastroInicialPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => router.back()}
            className="bg-[#CF94AA] text-white font-inter flex items-center gap-2 px-4 py-2 rounded hover:opacity-90"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          <button
            onClick={() => router.push("/")}
            className="bg-[#CF94AA] text-white font-inter px-4 py-2 rounded hover:opacity-90"
          >
            Pagina inicial
          </button>
        </div>

        <h1 className="text-[#832965] font-italiana text-3xl ml-auto">
          Define Pilates
        </h1>
      </header>

      {/* Main */}
      <main className="flex flex-col items-center px-6 py-8 bg-white">
        <div className="w-full max-w-sm flex flex-col">
          <h2 className="text-2xl text-[#832965] font-bold font-inter mb-8">
            Cadastro
          </h2>

          <div className="flex flex-col gap-6 w-full">
            <button className="bg-[#832965] text-white font-inter py-4 rounded-md text-lg font-semibold hover:opacity-90">
              Aluno
            </button>

            <button className="bg-[#832965] text-white font-inter py-4 rounded-md text-lg font-semibold hover:opacity-90">
              Instrutor
            </button>

            <button className="bg-[#832965] text-white font-inter py-4 rounded-md text-lg font-semibold hover:opacity-90">
              Recepcionista | Administrador
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#832965] text-white mt-auto px-6 py-4">
        <div className="text-center font-italiana text-lg mb-2">Define Pilates</div>

        <div className="flex justify-center gap-4 text-sm font-inter mb-2">
          <a href="/" className="hover:underline">Pagina inicial</a>
          <a href="/user/login" className="hover:underline">Login</a>
          <a href="/agendamento" className="hover:underline">Agendamento</a>
        </div>

        <div className="flex justify-center gap-6 mt-1">
          <a href="https://wa.me/5511941424166" target="_blank" rel="noreferrer">
            <img src="/whatsapp.png" alt="WhatsApp" className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/definepilates/" target="_blank" rel="noreferrer">
            <img src="/instagram.png" alt="Instagram" className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </div>
  );
}
