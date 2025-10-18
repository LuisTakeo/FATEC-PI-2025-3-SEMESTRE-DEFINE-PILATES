import { useState } from "react";
import type { HTMLInputTypeAttribute } from "react";
import type { ChangeEvent } from "react";
import type { FocusEvent } from "react";


interface InputProps {
    id?: string;
    name?: string;
    label?: string;
    value?: string;
    onChange?: ((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void);

    onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    type?: HTMLInputTypeAttribute;
    as?: 'input' | 'select' | 'textarea';
    placeholder?: string;
    pattern?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
    rows?: number;
    disabled?: boolean;
    maxLength?: number;
}

function Input({
    id, name, label, value, onChange, onBlur, type = 'text', as = 'input',
    placeholder, pattern, required = false, options = [], rows = 4, disabled = false, maxLength
}: InputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    const renderInput = () => {
        
        const commonProps = { id, name, placeholder, pattern, required, value, onChange, onBlur, disabled, maxLength, autoComplete: "off" };
        const baseProps = { id, name, placeholder, required, value, onChange, onBlur, disabled };


    if (as === 'textarea') {
        return (
            <textarea
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange} 
                onBlur={onBlur}
                rows={rows}
                disabled={disabled}
                className="form-textarea"
            />
        );
    }


        if (as === 'select') {
            return (
                <select {...baseProps} className="form-input">
                    <option value="" disabled>Selecione uma opção</option>
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            );
        }

        if (type === 'password') {
            const inputType = isPasswordVisible ? 'text' : 'password';
            return (
                <div className="input-wrapper">
                    <input {...commonProps} type={inputType} className="form-input" />
                    <button type="button" onClick={togglePasswordVisibility} className="password-toggle-btn">
                        {isPasswordVisible ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                        )}
                    </button>
                </div>
            );
        }

        return <input {...commonProps} type={type} className="form-input" />;
    };

    return (
        <div className="form-group">
            <label htmlFor={id} className="form-label">{label}</label>
            {renderInput()}
        </div>
    );
}

export default Input;