import { useState } from "react"
import Botao from "../../components/Botao/Botao"
import Input from "../../components/Erro/Input" 
import Estilizacoes from "../../model/Estilizacoes"

const MIN_LENGTH = 6; 
const MAX_LENGTH = 10; 

export default function AlterarSenha() {
    const [senha, setSenha] = useState("");
    const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
    const [erroSenha, setErroSenha] = useState(""); 
    const [erroConfirmacao, setErroConfirmacao] = useState(""); 
    const [isLoading, setIsLoading] = useState(false); 
 
    // @ts-ignore
    const handleSenhaChange = (val) => {
        setSenha(val);
        setErroSenha(""); 
        if (erroConfirmacao && val === senhaConfirmacao) {
            setErroConfirmacao(""); 
        }
    };

    // @ts-ignore
    const handleSenhaConfirmacaoChange = (val) => {
        setSenhaConfirmacao(val);
        setErroConfirmacao(""); 
        if (erroSenha && val === senha) {
            setErroSenha("");
        }
    };

    // @ts-ignore
    const validarConteudoSenha = (s) => {
        const temNumero = /[0-9]/.test(s);
        const temMinuscula = /[a-z]/.test(s);
        const temMaiuscula = /[A-Z]/.test(s);
        const temEspecial = /[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~`]/.test(s);
        
        let erros = [];

        if (!temMinuscula) { erros.push("minúscula"); }
        if (!temMaiuscula) { erros.push("maiúscula"); }
        if (!temNumero) { erros.push("número"); }
        if (!temEspecial) { erros.push("caractere especial"); }

        if (erros.length > 0) {
            return `A senha deve conter: ${erros.join(", ")}.`;
        }
        return null;
    }

    // @ts-ignore
    const handleSave = async (e) => {
        e.preventDefault();

        let hasError = false;

        setErroSenha("");
        setErroConfirmacao("");

        // [Validação da Nova Senha]
        if (!senha.trim()) {
            setErroSenha("Campo obrigatório.");
            hasError = true;
        } else if (senha.length < MIN_LENGTH || senha.length > MAX_LENGTH) {
            setErroSenha(`A senha deve ter entre ${MIN_LENGTH} e ${MAX_LENGTH} caracteres.`);
            hasError = true;
        } else {
            const erroConteudo = validarConteudoSenha(senha);
            if (erroConteudo) {
                setErroSenha(erroConteudo);
                hasError = true;
            }
        }

        // [Validação da Confirmação]
        if (!senhaConfirmacao.trim()) {
            setErroConfirmacao("Campo obrigatório.");
            hasError = true;
        } else if (senhaConfirmacao.length < MIN_LENGTH || senhaConfirmacao.length > MAX_LENGTH) {
            setErroConfirmacao(`A confirmação deve ter entre ${MIN_LENGTH} e ${MAX_LENGTH} caracteres.`);
            hasError = true;
        } else {
            const erroConteudo = validarConteudoSenha(senhaConfirmacao);
            if (erroConteudo) {
                setErroConfirmacao(erroConteudo);
                hasError = true;
            }
        }

        // [Validação de Coincidência]
        if (!hasError && senha !== senhaConfirmacao) {
            const mensagemErro = "As senhas não coincidem.";
            setErroSenha(mensagemErro);
            setErroConfirmacao(mensagemErro);
            hasError = true;
        }

        if (hasError) {
            return;
        }
        
        setIsLoading(true);
        console.log("Tentativa de salvar nova senha:", { senha, senhaConfirmacao });
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            console.log("Senha salva com sucesso!");

        } catch (error) {
            console.error("Erro ao salvar senha:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start w-full">
            <main className="flex flex-col w-[80vw] px-[2%] py-6"> 
        
                <header className="flex flex-col items-start mb-12 w-full"> 
                    
                    <div className="flex flex-col justify-center gap-1 text-left w-full">
                        <h1 className={`${Estilizacoes.titulo_principal} text-[2rem]`}>
                            Definir Nova Senha
                        </h1>
                        <h2 className={`${Estilizacoes.segundo_titulo_principal} text-[1.1rem] text-[var(--foreground)]`}>
                            Para ser válida, ela deve ter entre {MIN_LENGTH} e {MAX_LENGTH} caracteres, e conter letras maiúsculas, minúsculas, números e um caractere especial.
                        </h2>
                    </div>
                </header>

                <form onSubmit={handleSave} className="flex flex-col gap-8 w-full">
                    <section className="flex flex-col gap-6 w-full">
                        <h3 className={`${Estilizacoes.segundo_titulo_principal} text-[var(--destaque)] text-[1.3rem]`}>
                            Dados da Nova Senha
                        </h3>
                        
                        {/* Inputs e Botão de Salvar VÃO OCUPAR A LARGURA TOTAL DO MAIN (w-[80vw]) */}
                        <div className="w-full flex flex-col gap-8">
                            
                            {/* Input Nova Senha (w-full garante o estiramento) */}
                            <div className="text-[1rem] font-medium">
                                <Input
                                    id="senha"
                                    label="Nova Senha" 
                                    value={senha}
                                    onChange={handleSenhaChange}
                                    type="password"
                                    placeholder="Digite a nova senha"
                                    size="w-full"
                                    maxLength={MAX_LENGTH}
                                    mostrarSenhaToggle={true} 
                                    erro={erroSenha} 
                                />
                            </div>

                            {/* Input Confirmação (w-full garante o estiramento) */}
                            <div className="text-[1rem] font-medium">
                                <Input
                                    id="senhaconfirmacao"
                                    label="Confirme a Nova Senha" 
                                    value={senhaConfirmacao}
                                    onChange={handleSenhaConfirmacaoChange}
                                    type="password"
                                    placeholder="Digite a senha novamente"
                                    size="w-full"
                                    maxLength={MAX_LENGTH}
                                    mostrarSenhaToggle={true} 
                                    erro={erroConfirmacao} 
                                />
                            </div>
                        </div>
                    </section>
                    
                    {/* Botões (w-full garante o estiramento) */}
                    <section className="mt-3 flex flex-col gap-6">
                        <Botao 
                            texto={isLoading ? "Salvando..." : "Salvar nova senha"} 
                            type="submit"
                        />
                         
                         {/* <a
                            href="/" 
                            className="text-[var(--destaque)] text-[1rem] underline font-medium self-start"
                        >
                            Voltar para o Login
                        </a> */}
                    </section>
                </form>
            </main>
        </div>
    );
}