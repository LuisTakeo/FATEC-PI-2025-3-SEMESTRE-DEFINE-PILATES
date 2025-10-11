"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Cadastro_Usuario() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)] font-inter">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => router.back()}
            className="bg-[var(--azul-segundario)] text-white flex items-center gap-2 px-4 py-2 rounded hover:opacity-90"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          <button
            onClick={() => router.push("/")}
            className="bg-[var(--azul-segundario)] text-white px-4 py-2 rounded hover:opacity-90"
          >
            Página inicial
          </button>
        </div>

        <h1 className="text-[var(--destaque)] font-italiana text-3xl ml-auto">
          Define Pilates
        </h1>
      </header>

      {/* Main */}
      <main className="flex flex-col items-center justify-center flex-grow px-6 py-8">
        <div className="w-full max-w-md bg-[var(--input-background)] rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-[var(--destaque)] mb-6 text-center">
            Cadastro de Usuário
          </h2>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nome completo"
              className="p-3 rounded bg-white text-[var(--foreground)] placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--destaque)]"
            />
            <input
              type="email"
              placeholder="E-mail"
              className="p-3 rounded bg-white text-[var(--foreground)] placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--destaque)]"
            />
            <input
              type="password"
              placeholder="Senha"
              className="p-3 rounded bg-white text-[var(--foreground)] placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--destaque)]"
            />

            <button
              type="submit"
              className="bg-[var(--destaque)] text-white py-3 rounded-md font-semibold hover:opacity-90"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--destaque)] text-white mt-auto px-6 py-4">
        <div className="text-center font-italiana text-lg mb-2">Define Pilates</div>

        <div className="flex justify-center gap-4 text-sm font-inter mb-2">
          <a href="/" className="hover:underline">
            Página inicial
          </a>
          <a href="/user/login" className="hover:underline">
            Login
          </a>
          <a href="/agendamento" className="hover:underline">
            Agendamento
          </a>
        </div>

        <div className="flex justify-center gap-6 mt-1">
          <a
            href="https://wa.me/5511941424166"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/whatsapp.png" alt="WhatsApp" className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/definepilates/"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/instagram.png" alt="Instagram" className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </div>
  );
}
