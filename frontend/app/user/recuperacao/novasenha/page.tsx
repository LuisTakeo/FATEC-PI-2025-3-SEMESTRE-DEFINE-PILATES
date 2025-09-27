"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function NewPasswordPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter">
      {/* HEADER */}
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

      {/* MAIN */}
      <main className="flex flex-col items-center justify-center flex-1 px-6 py-6">
        <h2 className="text-2xl font-bold text-[#832965] mb-2">Escreva sua nova senha</h2>
        <p className="text-black text-center mb-6 font-inter">
          A senha deve ter caracteres  <b>maiúsculos</b>, <b>minúsculos</b> e <b>número</b>
        </p>

        <input
          type="password"
          placeholder="Nova senha"
          className="w-full max-w-sm bg-[#D9D9D9] px-4 py-3 rounded-md mb-4 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Escreva a nova senha novamente"
          className="w-full max-w-sm bg-[#D9D9D9] px-4 py-3 rounded-md mb-4 focus:outline-none"
        />

        <button
          onClick={() => router.push("/login")}
          className="bg-[#CF94AA] text-white font-inter py-3 px-6 rounded-md hover:opacity-90"
        >
          Finalizar
        </button>
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
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
  );
}
