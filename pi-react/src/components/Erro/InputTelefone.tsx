// /components/Erro/InputTelefone.tsx

import React from 'react';
// CORREÇÃO: Usar 'type' para importar a interface 'InputProps'
import Input, { type InputProps } from './Input'; 
import useInputTelefone from './useInputTelefone'; 

export interface InputTelefoneProps {
    id: string;
    label: string;
    value: string;
    onChange: (val: string) => void;
    erro: string;
}

export default function InputTelefone({ 
    id, 
    label, 
    value, 
    onChange, 
    erro: erroExterno 
}: InputTelefoneProps) {
    
    const { 
        inputRef, 
        handleTelefoneChange, 
        handleBlur, 
        errorToDisplay,
        telefoneProps
    } = useInputTelefone(value, onChange, erroExterno);

    return (
        <Input
            id={id}
            label={label}
            value={value}
            onChange={handleTelefoneChange} 
            onBlur={handleBlur}             
            type={telefoneProps.type}
            placeholder={telefoneProps.placeholder}
            erro={errorToDisplay} 
            inputRef={inputRef}   
        />
    );
}