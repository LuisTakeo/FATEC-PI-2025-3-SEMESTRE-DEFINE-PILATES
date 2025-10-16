"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)] font-inter">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <button
          onClick={() => router.back()}
          className="bg-[var(--azul-segundario)] text-white flex items-center gap-2 px-4 py-2 rounded hover:opacity-90"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <h1 className="text-[var(--destaque)] font-italiana text-3xl ml-auto">
          Define Pilates
        </h1>
      </header>

      {/* Main */}
      <main className="flex flex-col items-center px-6 py-4">
        <div className="flex w-full max-w-sm justify-between items-end mb-6">
          <h2 className="text-2xl text-[var(--destaque)] font-bold font-inter leading-tight">
            Entre <br /> na sua conta
          </h2>
          <img
            src="/pilates.png"
            alt="Pilates Illustration"
            className="w-32 h-32 object-contain -mt-4"
          />
        </div>

        <div className="w-full max-w-sm flex flex-col gap-4">
          <p className="text-[var(--destaque)] text-lg font-semibold font-inter">
            Acessar
          </p>

          <div className="flex flex-col gap-3">
            <label className="font-inter text-[var(--color-foreground)] text-sm">
              Escreva seu e-mail
            </label>
            <input
              type="email"
              className="bg-[var(--input-background)] px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--destaque)]"
            />

            <label className="font-inter text-[var(--color-foreground)] text-sm">
              Escreva sua senha
            </label>
            <input
              type="password"
              className="bg-[var(--input-background)] px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--destaque)]"
            />

            <a
              href="#"
              className="text-[var(--destaque)] font-inter text-sm underline hover:opacity-90"
            >
              Esqueci a minha senha
            </a>
          </div>

          <button
            type="submit"
            className="bg-[var(--destaque)] text-white font-inter py-3 rounded-md mt-2 font-semibold hover:opacity-90"
          >
            Entrar
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--destaque)] text-white mt-auto px-6 py-6">
        <div className="text-center font-italiana text-lg mb-4">
          Define Pilates
        </div>

        <div className="flex justify-center gap-4 text-sm font-inter mb-4">
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

        <div className="flex justify-center gap-6 mt-2">
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
