import { useState } from "react";
import type { ChangeEvent } from "react";
import type { FormEvent } from "react";
import "./stylesCadastroInstrutor.css";
import Input from "../../../../components/Input/Input";
import { registerInstructor } from "../../../../services/instructorService";

interface FormData {
    name: string;
    password: string;
    phone: string;
    birth_date: string;
    hiring: string;
    classification: string;
    cref: string;
    crefito: string;
    cep: string;
    fulladdress: string;
    number: string;
}

function Cadastro_Instrutor(){
    const [formData, setFormData] = useState<FormData>({
        name: '',
        password: '',
        phone: '',
        birth_date: '',
        hiring: '',
        classification: '',
        cref: '',
        crefito: '',
        cep: '',
        fulladdress: '',
        number: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isAddressFound, setIsAddressFound] = useState(false);
    // const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    
    const fetchAddressByCep = async (cep: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                setError("CEP não encontrado. Por favor, verifique.");
                setIsAddressFound(false);
                setFormData(prev => ({ ...prev, fulladdress: '' }));
            } else {
                const address = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
                setFormData(prev => ({ ...prev, fulladdress: address }));
                setIsAddressFound(true);
                setError(null);
            }
        } catch (err) {
            setError("Falha ao buscar o CEP. Tente novamente.");
            setIsAddressFound(false);
        }
    };
    
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'cep') {
            const cepDigits = value.replace(/\D/g, '');
            if (cepDigits.length === 8) {
                fetchAddressByCep(cepDigits);
            } else if (isAddressFound) {
                setIsAddressFound(false);
                setFormData(prev => ({ ...prev, fulladdress: '' }));
            }
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const payload = {
            ...formData, // Inclui name, password, phone, etc.
            birth_date: formatDate(formData.birth_date),
            hiring: formatDate(formData.hiring),
            // Combina endereço, número e CEP em um único campo
            fulladdress: `${formData.fulladdress}, ${formData.number}, ${formData.cep}`
        };

        try {
            await registerInstructor(payload);
            setSuccess('Instrutor cadastrado com sucesso!');
            setFormData({
                name: '', password: '', phone: '', birth_date: '', hiring: '', cep: '', number: '',
                classification: '', cref: '', crefito: '', fulladdress: ''
            });
        } catch (err: any) {
            if (err.status === 422 && err.errors) {
                    const errorMessages = Object.values(err.errors).flat().join(' ');
                    throw new Error(errorMessages);
                }
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="cadastro-instrutor-container">
            <main className="cadastro-instrutor-main">
                <header className="cadastro-instrutor-header">
                    <h1 className="main-title">Cadastro de Instrutor</h1>
                    <h2 className="subtitle">Informe os dados abaixo para criar o acesso</h2>
                </header>

                {/* Exibição de mensagens de sucesso ou erro */}
                {success && <div className="alert alert-success" role="alert">{success}</div>}
                {error && <div className="alert alert-error" role="alert">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <section id="info-pessoais-section" className="form-section">
                        <h3 className="form-section-title">Informações Pessoais e Acesso</h3>

                        <Input id="name" name="name" label="Nome" placeholder="Digite o nome completo" required value={formData.name} onChange={handleChange} />

                        <Input id="phone" name="phone" label="Telefone" type="tel" placeholder="(11) 99999-9999" required value={formData.phone} onChange={handleChange} />
                        <div className="w-full">
                                <Input
                                    id="senha"
                                    label="Senha"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    type = "password"
                                    pattern="[a-zA-Z0-9/]+"
                                    placeholder = "Digite a senha"

                                />
                            </div>
                            <div className="w-full">
                                <Input
                                    id="confirmar-senha"
                                    label="Confirmar Senha"
                                    value={confirmarPassword}
                                    onChange={(e) => {
                                        setConfirmarPassword(e.target.value);
                                        if (e.target.value !== formData.password) {
                                            setPasswordError(true);
                                        } else {
                                            setPasswordError(false);
                                        }
                                    }}
                                    type = "password"
                                    pattern="[a-zA-Z0-9/]+"
                                    placeholder = "Confirme a senha"
                                    error={passwordError && confirmarPassword !== ""}
                                    errorMessage="As senhas não coincidem"
                                />
                            </div>
                        <div className="form-row">
                            <div className="form-group-half">
                                <Input id="birth_date" name="birth_date" label="Data de Nascimento" type="date" required value={formData.birth_date} onChange={handleChange} />
                            </div>

                            <div className="form-group-half">
                                <Input id="hiring" name="hiring" label="Data de Contratação" type="date" required value={formData.hiring} onChange={handleChange} />
                            </div>
                        </div>
                    </section>

                    <section id="info-profissionais-section" className="form-section mt-10">
                        <h3 className="form-section-title">Informações Profissionais</h3>
                        
                        <Input 
                            as="select"
                            id="classification"
                            name="classification"
                            label="Classificação"
                            required
                            value={formData.classification}
                            onChange={handleChange}
                            options={[
                                { value: 'A', label: 'A' },
                                { value: 'B', label: 'B' },
                                { value: 'C', label: 'C' },
                            ]}
                        />

                        <Input id="cref" name="cref" label="CREF" placeholder="Ex: 123456-G/SP" required value={formData.cref} onChange={handleChange} />

                        <Input id="crefito" name="crefito" label="CREFITO" placeholder="Ex: 123456-F" required value={formData.crefito} onChange={handleChange} />

                    </section>

                    <section id="endereco-section" className="form-section mt-10">
                        <h3 className="form-section-title">Endereço</h3>

                        <div className="form-row">
                            <div className="form-group" style={{ flex: 3 }}>
                                <Input id="cep" name="cep" label="CEP" placeholder="Digite o CEP" required value={formData.cep} onChange={handleChange} maxLength={8} />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <Input id="number" name="number" label="Número" placeholder="Ex: 123" required value={formData.number} onChange={handleChange} />
                            </div>
                        </div>

                        <Input
                            as="input"
                            id="fulladdress"
                            name="fulladdress"
                            label="Endereço Completo"
                            placeholder="Preenchido automaticamente após digitar o CEP"
                            value={formData.fulladdress}
                            onChange={handleChange}
                            disabled
                        />

                    </section>

                    <section className="mt-10">
                        <button type="submit" disabled={loading} className="submit-button">
                            {loading ? 'Cadastrando...' : 'Cadastrar Instrutor'}
                        </button>
                    </section>
                </form>
            </main>
        </div>
    );
}

export default Cadastro_Instrutor;