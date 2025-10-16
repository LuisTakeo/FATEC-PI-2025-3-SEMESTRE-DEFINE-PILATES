"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function NewPasswordPage() {
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
      <main className="flex flex-col items-center justify-center flex-1 px-6 py-6">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-[var(--destaque)] mb-2">
            Escreva sua nova senha
          </h2>
          <p className="mb-6">
            A senha deve ter caracteres <b>maiúsculos</b>, <b>minúsculos</b> e <b>número</b>
          </p>

          <input
            type="password"
            placeholder="Nova senha"
            className="w-full px-4 py-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--destaque)]"
            style={{ backgroundColor: "var(--input-background)", color: "var(--color-foreground)" }}
          />
          <input
            type="password"
            placeholder="Escreva a nova senha novamente"
            className="w-full px-4 py-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--destaque)]"
            style={{ backgroundColor: "var(--input-background)", color: "var(--color-foreground)" }}
          />

          <button
            onClick={() => router.push("/user/login")}
            className="bg-[var(--destaque)] text-white py-3 px-6 rounded-md w-full font-inter hover:opacity-90"
          >
            Finalizar
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--destaque)] text-white px-6 py-6">
      <div className="text-center font-italiana text-lg mb-4">Define Pilates</div>
      <div className="flex justify-center gap-4 text-sm font-inter mb-4">
        <a href="/" className="hover:underline">Página inicial</a>
        <a href="/user/login" className="hover:underline">Login</a>
        <a href="/agendamento" className="hover:underline">Agendamento</a>
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
