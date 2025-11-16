import React, { useState, useEffect, useCallback } from 'react'; 
import { AiOutlineSearch, AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'; 
import Botao from '../../../components/Botao/Botao'; 

const COR_DESTAQUE_ADMIN = 'text-[var(--destaque)]'; 


// --- INTERFACES E DADOS MOCK (Mantidos) ---
interface UserResult {
  id: number;
  tipoUsuario: string; 
  tipo: string;
  data: string;
  horario: string;
  instrutor: string;
}

const mockResults: UserResult[] = [
  { id: 1, tipoUsuario: 'instrutores', tipo: 'Pilates clássico', data: '14/10/2025', horario: '08:00 - 10:00', instrutor: 'Alexana Mosqueteiro' },
  { id: 2, tipoUsuario: 'alunos', tipo: 'Pilates para Idosos', data: '15/10/2025', horario: '08:00 - 10:00', instrutor: 'Marcola Chupetao' },
  { id: 3, tipoUsuario: 'administradores', tipo: 'Gerenciamento', data: '16/10/2025', horario: '10:00 - 18:00', instrutor: 'Carlos Administrador' },
  { id: 4, tipoUsuario: 'recepcionistas', tipo: 'Atendimento', data: '13/10/2025', horario: '09:00 - 17:00', instrutor: 'Bruna Recepcionista' },
  { id: 5, tipoUsuario: 'instrutores', tipo: 'Pilates clássico', data: '15/10/2025', horario: '13:00 - 15:00', instrutor: 'Arthur Neves' },
];

const tiposDeUsuario = [
  { value: 'administradores', label: 'Administradores' },
  { value: 'alunos', label: 'Alunos' },
  { value: 'instrutores', label: 'Instrutores' },
  { value: 'recepcionistas', label: 'Recepcionistas' },
  { value: 'todos', label: 'Usuários (Todos)' }, 
];

const applyFilters = (situacao: string, nomeFiltro: string, results: UserResult[]): UserResult[] => {
    return results.filter(item => {
      const situacaoMatch = situacao === 'todos' || item.tipoUsuario === situacao; 
      const nomeLower = nomeFiltro.toLowerCase();
      const nomeMatch = nomeFiltro === '' || item.instrutor.toLowerCase().includes(nomeLower);
      return situacaoMatch && nomeMatch;
    });
};

const applySorting = (results: UserResult[], currentOrder: string): UserResult[] => {
    const sorted = [...results].sort((a, b) => {
      const dateA = new Date(a.data.split('/').reverse().join('-'));
      const dateB = new Date(b.data.split('/').reverse().join('-'));
      
      return currentOrder === 'crescente' 
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
    return sorted;
};

function PesquisaGeralContent() { 
  const [situacao, setSituacao] = useState('todos'); 
  const [nome, setNome] = useState('');
  const [ordem, setOrdem] = useState('decrescente');
  const [filteredResults, setFilteredResults] = useState<UserResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const apiResponse = applyFilters(situacao, nome, mockResults);
    const timeout = setTimeout(() => {
        const initialSorted = applySorting(apiResponse, ordem);
        setFilteredResults(initialSorted);
        setIsLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, []); 

  const handlePesquisar = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const timeout = setTimeout(() => {
        const results = applyFilters(situacao, nome, mockResults); 
        const sorted = applySorting(results, ordem);
        setFilteredResults(sorted);
        setIsLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [situacao, nome, ordem]);

  useEffect(() => {
    setFilteredResults(prevResults => applySorting(prevResults, ordem));
  }, [ordem]); 

  const handleToggleOrdem = useCallback(() => {
    setOrdem(prev => prev === 'decrescente' ? 'crescente' : 'decrescente');
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-150 font-sans">
      <main className="flex-grow w-full pt-6 pb-6"> 
        <section className="relative overflow-hidden w-full"> 
          
          <div className="w-full px-4 md:px-15 lg:px-20 mx-auto"> 
            
            <div className="w-full"> 
                
                <h1 className={`text-3xl font-bold ${COR_DESTAQUE_ADMIN} mb-2`}>
                    Pesquisa geral
                </h1>
                
                <p className="text-gray-900 mb-8">
                    Pesquise por colaborador ou por aula, apenas um por vez
                </p>

                <form onSubmit={handlePesquisar} className="space-y-4">

                <h2 className={`text-xl font-semibold ${COR_DESTAQUE_ADMIN} mb-2`}> 
                    Pesquisar por Colaborador
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
                        <option key={tipo.value} value={tipo.value}>
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
                    Data em ordem
                </h2>
                
                <div className="w-full mb-6"> 
                    <button
                        onClick={handleToggleOrdem}
                        className="w-full flex items-center justify-between py-2 px-4 bg-gray-300 border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-300 transition duration-150 shadow-sm disabled:opacity-50"
                    >
                        {ordem === 'decrescente' ? 'Decrescente' : 'Crescente'}
                        {ordem === 'decrescente' 
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
                                <p className={`${COR_DESTAQUE_ADMIN} font-bold text-lg mb-0.5`}>{item.tipo}</p>
                                <p className="text-sm text-gray-700">
                                    <span className="font-semibold">{item.data}</span>
                                </p>
                                <p className="text-sm text-gray-700">
                                    {item.horario}
                                </p>
                            </div>
                            
                            <div 
                                className="p-3 flex items-center justify-start sm:justify-center bg-gray-300 text-gray-800 w-full sm:w-auto flex-shrink-0 
                                rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none sm:max-w-xs"
                            >
                                <p className="text-gray-800">
                                    <span className="font-semibold">Instrutor:</span> {item.instrutor}
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