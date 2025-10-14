import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../UserLogin/button";

export default function RecoveryPhonePage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState<string>("");
  const [confirmPhone, setConfirmPhone] = useState<string>("");
  const [error, setError] = useState<string>("");

  const formatPhone = (value: string): string => {
    let digits = value.replace(/\D/g, "").slice(0, 11);
    digits = digits.replace(/^(\d{2})(\d)/, "($1) $2");
    digits = digits.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
    return digits;
  };

  const handlePhoneChange = (value: string) => {
    setPhone(formatPhone(value));
    setError("");
  };

  const handleConfirmChange = (value: string) => {
    setConfirmPhone(formatPhone(value));
    setError("");
  };

  const handleSubmit = (): void => {
    if (phone.length < 15 || confirmPhone.length < 15) {
      setError("O telefone está incompleto.");
      return;
    }
    if (phone !== confirmPhone) {
      setError("Os telefones não conferem.");
      return;
    }
    setError("");
    navigate("/recupera-senha/code");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)] font-inter">
      <main className="flex flex-col items-center justify-center flex-1 px-6 py-3 mt-[-80px] max-sm:mt-[-40px] transition-all duration-300">
        <img
          src="/envelope.png"
          alt="Telefone"
          className="w-32 h-32 max-sm:w-24 max-sm:h-24 object-contain mb-6 transition-all duration-300"
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
            maxLength={15}
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            className="w-full px-4 py-3 rounded-md mb-4 bg-[var(--input-background)] text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--destaque)] transition-all"
          />

          <input
            type="tel"
            placeholder="Confirme seu telefone"
            maxLength={15}
            value={confirmPhone}
            onChange={(e) => handleConfirmChange(e.target.value)}
            className="w-full px-4 py-3 rounded-md mb-4 bg-[var(--input-background)] text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--destaque)] transition-all"
          />

          {error && (
            <p className="text-red-500 mb-4 text-sm text-center">{error}</p>
          )}

          <Button onClick={handleSubmit}>Solicitar Código</Button>
        </div>
      </main>
    </div>
  );
}
