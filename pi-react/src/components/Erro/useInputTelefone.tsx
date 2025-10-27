import React, { useState, useRef, useCallback, useEffect } from "react";

export interface UseInputTelefoneResult {
    inputRef: React.RefObject<HTMLInputElement | null>; 
    handleTelefoneChange: (rawValue: string) => void;
    handleBlur: () => void;
    errorToDisplay: string;
    telefoneProps: { type: string; placeholder: string };
}

export default function useInputTelefone(
    value: string, 
    onChange: (val: string) => void, 
    erroExterno: string
): UseInputTelefoneResult {
    
    const inputRef = useRef<HTMLInputElement>(null);
    const [erroInterno, setErroInterno] = useState("");

    const errorToDisplay = erroExterno || erroInterno;
    
    useEffect(() => {
        if (erroExterno) {
            setErroInterno(""); 
        }
    }, [erroExterno]);

    const validarTelefone = useCallback((tel: string) => {
        const digits = tel.replace(/\D/g, "");
        return digits.length === 10 || digits.length === 11;
    }, []);

    const handleTelefoneChange = useCallback((rawValue: string) => {
        if (!inputRef.current) return;

        let digits = rawValue.replace(/\D/g, "").slice(0, 11);
        let formatted = digits;
        
        if (digits.length > 2) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        if (digits.length > 7 && digits.length <= 10) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
        if (digits.length > 10) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;

        onChange(formatted);
        setErroInterno("");

        const finalValue = formatted; 
        
        setTimeout(() => {
            inputRef.current?.setSelectionRange(finalValue.length, finalValue.length);
        }, 0);
    }, [onChange]);

    const handleBlur = useCallback(() => {
        if (value && !erroExterno) {
            if (!validarTelefone(value)) {
                setErroInterno("Telefone inválido");
            } else {
                setErroInterno("");
            }
        }
    }, [value, validarTelefone, erroExterno]);

    return { 
        inputRef, 
        handleTelefoneChange, 
        handleBlur,
        errorToDisplay,
        telefoneProps: { type: "text", placeholder: "(DD) XXXXX-XXXX" }
    };
}