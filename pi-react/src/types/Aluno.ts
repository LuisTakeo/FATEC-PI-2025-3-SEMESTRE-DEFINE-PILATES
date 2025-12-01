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
    // 🛑 CORREÇÃO APLICADA: File foi substituído por string para aceitar Base64
    fotos: {[key: string]: string}; 
    contatos: Contato[];
    enderecos: Endereco[];
}