import React, { useState, useRef } from "react";

export interface InputProps {
    id: string;
    label: string;
    value: string;
    onChange: (val: string) => void;
    
    onBlur?: () => void; 
    inputRef?: React.Ref<HTMLInputElement | HTMLSelectElement | null>; 
    
    type: string; 
    placeholder?: string;
    size?: string;
    erro?: string; 
    mostrarSenhaToggle?: boolean; 
    
    maxLength?: number; 
    options?: { value: string; label: string }[]; // Para select
}

export default function Input({
    id,
    label,
    value,
    onChange,
    onBlur,
    type,
    placeholder,
    size = "w-full",
    erro,
    mostrarSenhaToggle = false,
    inputRef,
    maxLength,
    options = [],
}: InputProps) {
    
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const defaultRef = useRef<HTMLInputElement | HTMLSelectElement>(null);
    const ref = inputRef || defaultRef;
    const inputType = mostrarSenhaToggle ? (mostrarSenha ? "text" : "password") : type;

    console.log(size);
    return (
        <div className="flex flex-col gap-2 relative">
            <label htmlFor={id} className="text-sm font-inter">{label}</label>

            <div className="relative w-full">
                {type === "select" ? (
                    <select
                        id={id}
                        ref={ref as React.Ref<HTMLSelectElement>}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={onBlur}
                        className={`
                            w-full px-4 h-12
                            rounded-md border ${erro ? "border-red-500" : "border-gray-300"}
                            bg-[var(--input-background)] text-[var(--color-foreground)]
                            focus:outline-none ${!erro ? "focus:ring-1 focus:ring-[var(--destaque)]" : ""}
                            text-sm transition-all
                        `}
                    >
                        <option value="" disabled>{placeholder || "Selecione uma opção"}</option>
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        id={id}
                        ref={ref as React.Ref<HTMLInputElement>}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={onBlur} 
                        type={inputType} 
                        placeholder={placeholder}
                        maxLength={maxLength} 
                        className={`
                            w-full px-4 ${mostrarSenhaToggle ? "pr-9" : "pr-4"} h-12
                            rounded-md border ${erro ? "border-red-500" : "border-gray-300"}
                            bg-[var(--input-background)] text-[var(--color-foreground)]
                            focus:outline-none ${!erro ? "focus:ring-1 focus:ring-[var(--destaque)]" : ""}
                            text-sm transition-all
                            flex items-center
                        `}
                    />
                )}

                {mostrarSenhaToggle && type !== "select" && (
                    <div
                        className="absolute right-2 top-0 bottom-0 flex items-center px-1 cursor-pointer text-gray-500 hover:text-[var(--destaque)]"
                        onClick={() => setMostrarSenha(!mostrarSenha)}
                    >
                        {mostrarSenha ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18M10.585 10.585A3 3 0 0012 15a3 3 0 002.415-4.415M12 3C7.477 3 3 7.477 3 12c0 1.033.154 2.03.44 2.964m3.053 3.053A9.956 9.956 0 0012 19c5.523 0 10-4.477 10-10 0-1.033-.154-2.03-.44-2.964" />
                            </svg>
                        )}
                    </div>
                )}
            </div>

            {erro && <span className="text-red-500 text-sm">{erro}</span>}
        </div>
    );
}