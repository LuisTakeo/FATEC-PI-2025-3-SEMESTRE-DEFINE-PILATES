// /components/Erro/InputTelefone.tsx

// import React from 'react';
// Importa o tipo InputProps para que possamos herdar as propriedades do Input
import Input, { type InputProps } from './Input'; 
import useInputTelefone from './useInputTelefone'; 

// CRIAÇÃO DA NOVA INTERFACE QUE INCLUI A PROPRIEDADE 'size'
export interface InputTelefoneProps {
    id: string;
    label: string;
    value: string;
    onChange: (val: string) => void;
    erro: string;
    
    // 🎯 CORREÇÃO: Adicione a propriedade 'size' à interface. 
    // Tornamos opcional (size?: string) ou simplesmente definimos (size: string)
    // Para consistência com as outras páginas, vamos forçar 'w-full' por padrão ou aceitar string:
    size?: InputProps['size']; // Reutiliza o tipo 'size' do InputProps
}

export default function InputTelefone({ 
    id, 
    label, 
    value, 
    onChange, 
    erro: erroExterno,
    size = "w-full" // 🎯 GARANTIA: Define 'w-full' como padrão se não for fornecido
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
            // 🎯 REPASSE: Adicione a prop 'size' aqui para que o componente 'Input' use o valor.
            size={size} 
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