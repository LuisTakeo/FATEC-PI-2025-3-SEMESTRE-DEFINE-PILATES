"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter">
      <header className="flex items-center justify-between px-6 py-4">
        <button
          onClick={() => router.back()}
          className="bg-[#CF94AA] text-white font-inter flex items-center gap-2 px-4 py-2 rounded hover:opacity-90"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>
        <h1 className="text-[#832965] font-italiana text-3xl ml-auto">Define Pilates</h1>
      </header>

      <main className="flex flex-col items-center px-6 py-4">
        <div className="flex w-full max-w-sm justify-between items-end mb-6">
          <h2 className="text-2xl text-[#832965] font-bold font-inter leading-tight">
            Entre <br /> na sua conta
          </h2>
          <img
            src="/pilates.png"
            alt="Pilates Illustration"
            className="w-32 h-32 object-contain -mt-4"
          />
        </div>

        <div className="w-full max-w-sm flex flex-col gap-4">
          <p className="text-[#832965] text-lg font-semibold font-inter">Acessar</p>

          <div className="flex flex-col gap-3">
            <label className="font-inter text-black text-sm">Escreva seu e-mail</label>
            <input
              type="email"
              className="bg-[#D9D9D9] px-4 py-3 rounded-md focus:outline-none"
            />
            <label className="font-inter text-black text-sm">Escreva sua senha</label>
            <input
              type="password"
              className="bg-[#D9D9D9] px-4 py-3 rounded-md focus:outline-none"
            />
            <a href="#" className="text-[#832965] font-inter text-sm underline">
              Esqueci a minha senha
            </a>
          </div>

          <button
            type="submit"
            className="bg-[#CF94AA] text-white font-inter py-3 rounded-md mt-2 hover:opacity-90"
          >
            Entrar
          </button>
        </div>
      </main>

      <footer className="bg-[#832965] text-white mt-auto px-6 py-6">
        <div className="text-center font-italiana text-lg mb-4">Define Pilates</div>
        <div className="flex justify-center gap-4 text-sm font-inter mb-4">
          <a href="#" className="hover:underline">Pagina inicial</a>
          <a href="#" className="hover:underline">Login</a>
          <a href="#" className="hover:underline">Agendamento</a>
        </div>
        <div className="flex justify-center gap-6 mt-2">
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