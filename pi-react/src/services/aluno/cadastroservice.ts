
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

export async function cadastrar_aluno(aluno: Aluno) {
    
}



// {
//   "name": "João Silva",
//   "phone": "(11)99999-9999",
//   "password": "abc123A",
//   "cpf": "12345678901",
//   "profession": "Engenheiro",
//   "birth_date": "15-01-1990",
//   "fotos": [
//     "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD"
//   ],
//   "contatos": [
//     {
//       "tipo": "email",
//       "valor": "joao@email.com",
//       "observacao": "Email pessoal"
//     }
//   ],
//   "enderecos": [
//     {
//       "tipo": "residencial",
//       "rua": "Rua das Flores",
//       "numero": "123",
//       "complemento": "Apto 45",
//       "bairro": "Centro",
//       "cidade": "São Paulo",
//       "estado": "SP",
//       "cep": "01234-567",
//       "principal": true
//     }
//   ]
// }