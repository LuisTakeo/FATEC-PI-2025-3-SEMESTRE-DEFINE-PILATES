import Estilizacoes from "../../model/Estilizacoes";

interface InputProps {
    id: string;
    label?: string;
    setValue?: string;
    value?: string;
    onChange?: (v: string) => void;
    type?: string;
    pattern?: string;
    placeholder?: string;
    size?: string;
    maxLength?: number
}

export default function Input({
    id,
    label = "",
    value = "",
    onChange = () => {},
    type = "text",
    pattern = ".*",
    placeholder = "",
    size = "",
    maxLength = 500
}: InputProps) {

    return (
        <div id={`${id}-input`} className="flex flex-col gap-3 w-full">
            <label htmlFor={id} className="text-[1.2rem]">{label}</label>
            <div className="flex">
                <input
                    id={id}
                    value={value}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    type={type}
                    pattern={pattern}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className={`${Estilizacoes.estilizacao_input} ${size}`}
                />
            </div>
        </div>
    );
}

//  <Input
//     id="email"
//     label="E-mail"
//     value={email}
//     onChange={setEmail}
//     type = "email"
//     pattern=".*"
//     placeholder = "Digite o email"
//     size = "w-full"
// />
