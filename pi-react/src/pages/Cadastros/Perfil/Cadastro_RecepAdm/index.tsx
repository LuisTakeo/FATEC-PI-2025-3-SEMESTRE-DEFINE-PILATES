import { useState } from "react";
import type { ChangeEvent } from "react";
import type { FormEvent } from "react";
import Input from "../../../../components/Input/Input";

interface FormData {
    name: string;
    phone: string;
    birth_date: string;
    hiring: string;
    classification: string;
    cep: string;
    fulladdress: string;
    number: string;
    typecollaborator: string;
}

export default function Cadastro_Adm_Recep(){
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        birth_date: '',
        hiring: '',
        classification: '',
        cep: '',
        fulladdress: '',
        number: '',
        typecollaborator: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isAddressFound, setIsAddressFound] = useState(false);
    
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

        // try {
        //     await registerInstructor(payload);
        //     setSuccess('Instrutor cadastrado com sucesso!');
        //     setFormData({
        //         name: '', phone: '', birth_date: '', hiring: '', cep: '', number: '', typecollaborator: '',
        //         classification: '', fulladdress: ''
        //     });
        // } catch (err: any) {
        //     if (err.status === 422 && err.errors) {
        //             const errorMessages = Object.values(err.errors).flat().join(' ');
        //             throw new Error(errorMessages);
        //         }
        //     setError(err.message);
        // } finally {
        //     setLoading(false);
        // }
    };

    return(
        <div className="cadastro-instrutor-container">
            <main className="cadastro-instrutor-main">
                <header className="cadastro-instrutor-header">
                    <h1 className="main-title">Cadastro de Funcionário</h1>
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
                            id="tipo-func"
                            name="tipo-func"
                            label="Tipo de Funcionário"
                            required
                            value={formData.typecollaborator}
                            onChange={handleChange}
                            options={[
                                { value: 'adm', label: 'Administrador' },
                                { value: 'recep', label: 'Recepcionista' },
                            ]}
                        />

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

