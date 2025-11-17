import React, { useState, useEffect, useCallback } from 'react'; 
import { AiOutlineSearch, AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'; 
import Botao from '../../../components/Botao/Botao'; 

const COR_DESTAQUE_ADMIN = 'text-[var(--destaque)]'; 


interface UserResult {
  id: number;
  tipoUsuario: string; 
  nomeCompleto: string; 
  cpf: string;
  estudio: string; 
  telefone: string; 
  registroProfissional?: string; // Opcional: CREF ou CREFITO para instrutores
}

// --- 2. DADOS MOCKADOS ---
const mockResults: UserResult[] = [
  { 
    id: 1, 
    tipoUsuario: 'instrutores', 
    nomeCompleto: 'Alexana Mosqueteiro', 
    cpf: '123.456.789-01', 
    estudio: 'Rua Santana de Pirapama, 91 - Vila Jacuí', 
    telefone: '(11) 98765-4321',
    registroProfissional: 'CREFITO 123456-F' 
  },
  { 
    id: 2, 
    tipoUsuario: 'alunos', 
    nomeCompleto: 'Marcola Chupetao', 
    cpf: '987.654.321-02', 
    estudio: 'Estrada Itaquera Guaianazes, 45', 
    telefone: '(11) 99999-8888' 
  }, 
  { 
    id: 3, 
    tipoUsuario: 'administradores', 
    nomeCompleto: 'Carlos Administrador', 
    cpf: '000.111.222-03', 
    estudio: 'R. José Aldo Piassi, 165 - São Miguel Paulista', 
    telefone: '(11) 97777-6666' 
  }, 
  { 
    id: 4, 
    tipoUsuario: 'recepcionistas', 
    nomeCompleto: 'Bruna Recepcionista', 
    cpf: '333.444.555-04', 
    estudio: 'Rua Santana de Pirapama, 91 - Vila Jacuí', 
    telefone: '(11) 95555-4444' 
  }, 
  { 
    id: 5, 
    tipoUsuario: 'instrutores', 
    nomeCompleto: 'Arthur Neves', 
    cpf: '666.777.888-05', 
    estudio: 'Estrada Itaquera Guaianazes, 45', 
    telefone: '(11) 93333-2222',
    registroProfissional: 'CREF 654321-G' 
  },
];

const tiposDeUsuario = [
  { value: '', label: 'Selecione o tipo de usuário' }, 
  { value: 'administradores', label: 'Administradores' },
  { value: 'alunos', label: 'Alunos' },
  { value: 'instrutores', label: 'Instrutores' },
  { value: 'recepcionistas', label: 'Recepcionistas' },
  { value: 'todos', label: 'Usuários (Todos)' }, 
];


const applyFilters = (situacao: string, nomeFiltro: string, results: UserResult[]): UserResult[] => {
    return results.filter(item => {
      const situacaoMatch = situacao === 'todos' || situacao === '' || item.tipoUsuario === situacao; 
      const nomeLower = nomeFiltro.toLowerCase();
      const nomeMatch = nomeFiltro === '' || item.nomeCompleto.toLowerCase().includes(nomeLower);
      return situacaoMatch && nomeMatch;
    });
};

const applySorting = (results: UserResult[], currentOrder: string): UserResult[] => {
    const sorted = [...results].sort((a, b) => {
      const nomeA = a.nomeCompleto.toLowerCase();
      const nomeB = b.nomeCompleto.toLowerCase();
      
      if (nomeA < nomeB) return currentOrder === 'crescente' ? -1 : 1;
      if (nomeA > nomeB) return currentOrder === 'crescente' ? 1 : -1;
      return 0;
    });
    return sorted;
};


function PesquisaGeralContent() { 
  // Estado inicial definido como '' para mostrar o placeholder
  const [situacao, setSituacao] = useState(''); 
  const [nome, setNome] = useState('');
  const [ordem, setOrdem] = useState('crescente'); 
  // Estado inicial da lista como vazio para não mostrar resultados na entrada
  const [filteredResults, setFilteredResults] = useState<UserResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  
  const handlePesquisar = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (situacao === '') {
        console.log("Validação: Selecione um tipo de usuário.");
        return; 
    }

    setIsLoading(true);
    
    const timeout = setTimeout(() => {
        // Usa os filtros atuais (situacao e nome)
        const results = applyFilters(situacao, nome, mockResults); 
        const sorted = applySorting(results, ordem);
        setFilteredResults(sorted);
        setIsLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [situacao, nome, ordem]);

  // Efeito para aplicar ordenação sempre que a ordem mudar
  useEffect(() => {
    // Só reordena se já houver resultados
    if (filteredResults.length > 0) {
        setFilteredResults(prevResults => applySorting(prevResults, ordem));
    }
  }, [ordem]); 

  // Handler para alternar a ordem
  const handleToggleOrdem = useCallback(() => {
    setOrdem(prev => prev === 'crescente' ? 'decrescente' : 'crescente');
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-150 font-sans">
      <main className="flex-grow w-full pt-6 pb-6"> 
        <section className="relative overflow-hidden w-full"> 
          
          <div className="w-full px-4 md:px-15 lg:px-20 mx-auto"> 
            
            <div className="w-full"> 
                
                <h1 className={`text-4xl font-bold ${COR_DESTAQUE_ADMIN} mb-8`}>
                    Pesquisa geral
                </h1>

                <form onSubmit={handlePesquisar} className="space-y-4">

                <h2 className={`text-xl font-semibold ${COR_DESTAQUE_ADMIN} mb-8`}> 
                    Pesquisar por Usuário
                </h2>

                <div>
                    <label htmlFor="tipoUsuario" className="block text-sm font-medium text-gray-900 mb-1">
                    Tipo de Usuários *
                    </label>
                    <div className="relative">
                    <select
                        id="tipoUsuario"
                        required 
                        value={situacao}
                        onChange={(e) => setSituacao(e.target.value)}
                        className="block w-full py-3 px-4 pr-10 border border-gray-300 bg-gray-300 rounded-lg text-gray-800 appearance-none focus:outline-none focus:ring-1 focus:ring-[var(--destaque)] focus:border-[var(--destaque)]"
                    >
                        {tiposDeUsuario.map((tipo) => (
                        <option 
                            key={tipo.value} 
                            value={tipo.value}
                            disabled={tipo.value === ''} 
                        >
                            {tipo.label}
                        </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <AiOutlineArrowDown className="h-5 w-5 text-[var(--destaque)]" />
                    </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                    </label>
                    <div className="relative">
                    <input
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="" 
                        className="block w-full py-3 px-4 pr-10 border border-gray-300 bg-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-[var(--destaque)] focus:border-[var(--destaque)]"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <AiOutlineSearch className="h-5 w-5 text-[var(--destaque)]" />
                    </div>
                </div>
                </div>

                <div className="pt-6 w-full max-w-xs mx-auto"> 
                    <Botao
                        texto={isLoading ? 'Pesquisando...' : 'Pesquisar'}
                        type="submit"
                        style={`py-3 px-4 shadow-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                </div>
                </form>

                <hr className="my-4 border-gray-200" />

                <h2 className={`text-xl font-semibold text-gray-900 mb-4`}> 
                    Ordem Alfabética
                </h2>
                
                <div className="w-full mb-6"> 
                    <button
                        onClick={handleToggleOrdem}
                        className="w-full flex items-center justify-between py-2 px-4 bg-gray-300 border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-300 transition duration-150 shadow-sm disabled:opacity-50"
                    >
                        {ordem === 'crescente' ? 'Crescente (A-Z)' : 'Decrescente (Z-A)'}
                        {ordem === 'crescente' 
                            ? <AiOutlineArrowDown className="ml-2 h-5 w-5 text-[var(--destaque)]" /> 
                            : <AiOutlineArrowUp className="ml-2 h-5 w-5 text-[var(--destaque)]" />}
                    </button>
                </div>

                <div className="space-y-4 mb-6"> 
                    {isLoading ? (
                        <p className={`${COR_DESTAQUE_ADMIN} italic`}>Buscando resultados...</p>
                    ) : filteredResults.length > 0 ? (
                        filteredResults.map((item) => (
                        <div 
                            key={item.id} 
                            className={`flex flex-col sm:flex-row rounded-lg shadow-md bg-white border-l-8 border-[var(--destaque)] hover:shadow-lg transition duration-300`}
                        >
                            
                            <div className="p-3 flex-1 bg-white rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none">
                                <p className={`${COR_DESTAQUE_ADMIN} font-bold text-lg mb-0.5`}>
                                    {item.nomeCompleto}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <span className="font-semibold">Tipo:</span> {tiposDeUsuario.find(t => t.value === item.tipoUsuario)?.label || item.tipoUsuario}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <span className="font-semibold">Telefone:</span> {item.telefone}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <span className="font-semibold">CPF:</span> {item.cpf}
                                </p>
                                {item.tipoUsuario === 'instrutores' && item.registroProfissional && (
                                    <p className="text-sm text-gray-700 font-bold mt-1">
                                        Registro: {item.registroProfissional}
                                    </p>
                                )}
                            </div>
                            
                            <div 
                                className="p-3 flex flex-col justify-center bg-gray-300 text-gray-800 w-full sm:w-auto flex-shrink-0 
                                rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none sm:max-w-xs"
                            >
                                <p className="text-sm text-gray-800">
                                    <span className="font-semibold">Estúdio:</span> {item.estudio}
                                </p>
                            </div>
                        </div>
                        ))
                    ) : (
                        <p className="text-gray-600 italic">Nenhum usuário encontrado com os filtros aplicados.</p>
                    )}
                </div>
            </div>

          </div> 
        </section>
      </main>
    </div>
  );
}

export default function AdminUsuariosPage() {
    return <PesquisaGeralContent />;
}