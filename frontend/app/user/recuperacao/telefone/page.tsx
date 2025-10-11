"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function RecoveryPhonePage() {
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
        <img
          src="/envelope.png"
          alt="Telefone"
          className="w-32 h-32 object-contain mb-6"
        />

        <div className="w-full max-w-sm flex flex-col">
          <h2 className="text-2xl font-bold text-[var(--destaque)] mb-2 text-left">
            Digite seu telefone
          </h2>
          <p className="text-[var(--color-foreground)] mb-6 text-left">
            Para receber o seu código de segurança por SMS
          </p>

          <input
            type="tel"
            placeholder="(99) 99999-9999"
            maxLength={14}
            className="w-full bg-[var(--input-background)] px-4 py-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--destaque)]"
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");
              if (value.length > 11) value = value.slice(0, 11);
              value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
              value = value.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
              e.target.value = value;
            }}
          />

          <button
            onClick={() => router.push("/user/recuperacao/codigo")}
            className="bg-[var(--destaque)] text-white font-inter py-3 rounded-md hover:opacity-90 w-full font-semibold"
          >
            Solicitar código
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--destaque)] text-white px-6 py-6">
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
