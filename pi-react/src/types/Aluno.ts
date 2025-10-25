
export interface Endereco{
    tipo: string;
    rua: string; 
    numero: string;
    complemente: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    principal: boolean;
}

export interface Contato{
    tipo: string;
    valor: string;
    observacao?: string;
}

export interface Aluno{
    name: string;
    phone: string;
    password: string;
    cpf: string;
    profession: string;
    birth_date: string;
    fotos: {[key: string]: File}
    contatos: Contato[];
    enderecos: Endereco[];
}