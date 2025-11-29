import React, { useState, useEffect, useCallback } from 'react';
import { AiOutlineSearch, AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import Botao from '../../../components/Botao/Botao'; 

// Importações do serviço de pesquisa original
import type { UserResult } from '../../../services/admin/pesquisaservice'; 
import { 
    fetchAllUsers, 
    applyFilters, 
    applySorting, 
} from '../../../services/admin/pesquisaservice'; 


const COR_DESTAQUE_ADMIN = 'text-[var(--destaque)]'; 

const tiposDeUsuario = [
    { value: '', label: 'Selecione o tipo de usuário' },
    { value: 'administradores', label: 'Administradores' },
    { value: 'alunos', label: 'Alunos' },
    { value: 'instrutores', label: 'Instrutores' },
    { value: 'todos', label: 'Usuários (Todos)' }, 
];

// FUNÇÃO AUXILIAR PARA O SPINNER
const Spinner = ({ size = 'h-8 w-8', color = 'text-[var(--destaque)]' }: { size?: string, color?: string }) => (
    <svg 
        className={`animate-spin ${size} ${color}`} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
    >
        <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
        ></circle>
        <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
    </svg>
);

// FUNÇÃO AUXILIAR PARA O MODAL DE CARREGAMENTO (Refinado com Tailwind)
const LoadingModal = ({ message }: { message: string }) => (
    <div 
        // Fundo mais sutil e blur leve
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
        <div 
            // Design do card de carregamento mais limpo e elegante
            className="flex flex-col items-center justify-center p-8 rounded-xl shadow-2xl bg-white text-gray-800"
        >
            <Spinner size="h-12 w-12" color="text-[var(--destaque)]" /> 
            <p className="mt-5 text-xl font-semibold text-center leading-relaxed">
                {message}
            </p>
        </div>
    </div>
);

function PesquisaGeralContent() {
    
    const [situacao, setSituacao] = useState(''); 
    const [nome, setNome] = useState('');
    const [ordem, setOrdem] = useState('crescente'); 
    const [allUsers, setAllUsers] = useState<UserResult[]>([]);
    const [filteredResults, setFilteredResults] = useState<UserResult[]>([]);
    
    const [isFetchingAllUsers, setIsFetchingAllUsers] = useState(false); 
    const [isReady, setIsReady] = useState(false); 
    const [isSearching, setIsSearching] = useState(false); 
    const [hasSearched, setHasSearched] = useState(false);

    const [error, setError] = useState<string | null>(null);
    
    // Determina se devemos mostrar o modal
    const showLoadingModal = isFetchingAllUsers || isSearching;
    
    // Define a mensagem do modal
    let loadingMessage = "";
    if (isFetchingAllUsers) {
        loadingMessage = "Aguarde o carregamento dos dados iniciais...";
    } else if (isSearching) {
        loadingMessage = "Pesquisando...";
    }
    
    const isDisabled = isSearching || !!error;
    const isFieldsDisabled = !!error || isFetchingAllUsers; 

    const handleToggleOrdem = useCallback(() => {
        setOrdem(prev => prev === 'crescente' ? 'decrescente' : 'crescente');
    }, []);

    const formatDate = (dateString?: string): string => {
        if (!dateString) return 'N/A';
        
        if (dateString.includes('/')) return dateString;

        try {
            const parts = dateString.split('-');
            if (parts.length === 3) {
                return `${parts[0]}/${parts[1]}/${parts[2]}`;
            }
            
            const date = new Date(dateString);
            if (!isNaN(date.getTime())) {
                 return date.toLocaleDateString('pt-BR');
            }
        } catch (e) {
        }
        return dateString; 
    };

    // 1. Efeito para carregar TODOS os usuários (Busca Inicial)
    useEffect(() => {
        const loadAllUsers = async () => {
            setIsFetchingAllUsers(true); 
            setError(null);
            try {
                const combinedUsers = await fetchAllUsers();
                setAllUsers(combinedUsers);
            } catch (err: any) {
                setError(err.message || 'Falha ao carregar os dados iniciais dos usuários.');
            } finally {
                setIsFetchingAllUsers(false); 
                setIsReady(true); 
            }
        };

        loadAllUsers();
    }, []); 

    // 2. Handler de Pesquisa (Ação do Clique)
    const handlePesquisar = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        
        if (situacao === '') {
            alert("Por favor, selecione um tipo de usuário.");
            return; 
        }
        
        if (!isReady || isFetchingAllUsers) { 
            alert("Aguarde a carga inicial dos dados para realizar a pesquisa.");
            return; 
        }
        
        if (isSearching) { 
            return; 
        }

        setIsSearching(true); 
        setHasSearched(true); 
        
        const timeout = setTimeout(() => {
            const results = applyFilters(situacao, nome, allUsers); 
            const sorted = applySorting(results, ordem);
            setFilteredResults(sorted);
            setIsSearching(false); 
        }, 300); 
        return () => clearTimeout(timeout);
    }, [situacao, nome, ordem, allUsers, isSearching, isReady, isFetchingAllUsers]); 

    // 3. Efeito para aplicar ordenação
    useEffect(() => {
        if (filteredResults.length > 0 && hasSearched) {
            setFilteredResults(prevResults => applySorting(prevResults, ordem));
        }
    }, [ordem, filteredResults.length, hasSearched]); 
    
    
    // 4. DETERMINAÇÃO DAS MENSAGENS DE STATUS NA TELA - Lógica Simplificada
    let displayMessage = ""; // INICIA VAZIO, como solicitado.

    if (error) {
        displayMessage = `Erro ao carregar os dados: ${error}. Por favor, verifique a API.`;
    } else if (hasSearched && filteredResults.length === 0) {
        displayMessage = "Nenhum usuário encontrado com os filtros aplicados.";
    } else if (hasSearched && filteredResults.length > 0) {
        displayMessage = `Exibindo ${filteredResults.length} resultados.`;
    } 


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

                            <h2 className={`text-xl font-semibold ${COR_DESTAQUE_ADMIN} mb-8`}> Pesquisar por Usuário </h2>
                            
                            {/* SELECT Tipo de Usuário */}
                            <div>
                                <label htmlFor="tipoUsuario" className="block text-sm font-medium text-gray-900 mb-1">Tipo de Usuários *</label>
                                <div className="relative">
                                <select
                                    id="tipoUsuario"
                                    required 
                                    value={situacao}
                                    onChange={(e) => setSituacao(e.target.value)}
                                    className="block w-full py-3 px-4 pr-10 border border-gray-300 bg-gray-300 rounded-lg text-gray-800 appearance-none focus:outline-none focus:ring-1 focus:ring-[var(--destaque)] focus:border-[var(--destaque)]"
                                    disabled={isFieldsDisabled}
                                >
                                    {tiposDeUsuario.map((tipo) => (
                                    <option key={tipo.value} value={tipo.value} disabled={tipo.value === ''}>
                                        {tipo.label}
                                    </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <AiOutlineArrowDown className="h-5 w-5 text-[var(--destaque)]" />
                                </div>
                                </div>
                            </div>
                            
                            {/* INPUT Nome */}
                            <div>
                                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                                <div className="relative">
                                <input
                                    id="nome"
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder="" 
                                    className="block w-full py-3 px-4 pr-10 border border-gray-300 bg-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-[var(--destaque)] focus:border-[var(--destaque)]"
                                    disabled={isFieldsDisabled}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <AiOutlineSearch className="h-5 w-5 text-[var(--destaque)]" />
                                </div>
                                </div>
                            </div>
                            
                            {/* BOTÃO Pesquisar */}
                            <div className="pt-6 w-full max-w-xs mx-auto"> 
                                <Botao
                                    texto={isSearching ? 'Pesquisando...' : 'Pesquisar'}
                                    type="submit"
                                    style={`bg-[var(--azul-segundario)] hover:!bg-[var(--destaque)] py-3 px-4 shadow-md ${
                                        isDisabled ? 'opacity-70 cursor-not-allowed' : '' 
                                    }`}
                                />
                            </div>
                            </form>

                            <hr className="my-0 py-0 border-gray-200" />
                            
                            { !showLoadingModal && (
                                <div className="py-2 mb-6 text-center"> 
                                    {error ? (
                                        <p className="text-red-500 font-bold">{displayMessage}</p>
                                    ) : (
                                        displayMessage && (
                                            <p className={`${COR_DESTAQUE_ADMIN} italic`}>
                                                {displayMessage}
                                            </p>
                                        )
                                    )}
                                </div>
                            )}

                            <h2 className={`text-xl font-semibold text-gray-900 mb-4`}> Ordem Alfabética </h2>
                            
                            <div className="w-full mb-6"> 
                                <button
                                    onClick={handleToggleOrdem} 
                                    className="w-full flex items-center justify-between py-2 px-4 bg-gray-300 border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-300 transition duration-150 shadow-sm disabled:opacity-50"
                                    disabled={isFieldsDisabled}
                                >
                                    {ordem === 'crescente' ? 'Crescente (A-Z)' : 'Decrescente (Z-A)'}
                                    {ordem === 'crescente' 
                                        ? <AiOutlineArrowDown className="ml-2 h-5 w-5 text-[var(--destaque)]" /> 
                                        : <AiOutlineArrowUp className="ml-2 h-5 w-5 text-[var(--destaque)]" />}
                                </button>
                            </div>

                            <div className="space-y-4 mb-6"> 
                                {filteredResults.length > 0 && hasSearched && (
                                    <>
                                        {filteredResults.map((item) => (
                                            <div 
                                                key={item.id} 
                                                className={`flex flex-col sm:flex-row rounded-lg shadow-md bg-white border-l-8 border-[var(--destaque)] hover:shadow-lg transition duration-300`}
                                            >
                                                
                                                <div className="p-3 flex-1 bg-white rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none">
                                                    <p className={`${COR_DESTAQUE_ADMIN} font-bold text-lg mb-0.5`}>
                                                        {item.fullname}
                                                    </p>
                                                    <p className="text-sm text-gray-700">
                                                        <span className="font-semibold">Tipo:</span> {tiposDeUsuario.find(t => t.value === item.typeuser)?.label || item.typeuser}
                                                    </p>
                                                    <p className="text-sm text-gray-700">
                                                        <span className="font-semibold">Telefone:</span> {item.phone || 'N/A'}
                                                    </p>
                                                    
                                                    {item.typeuser === 'instrutores' && item.registration && (
                                                        <p className="text-sm text-gray-700 font-bold mt-1">
                                                            Registro: {item.registration}
                                                        </p>
                                                    )}
                                                    
                                                    {item.typeuser === 'alunos' && item.cpf && (
                                                        <p className="text-sm text-gray-700">
                                                            <span className="font-semibold">CPF:</span> {item.cpf}
                                                        </p>
                                                    )}
                                                    
                                                    {item.admissionDate && item.typeuser !== 'alunos' && (
                                                        <p className="text-sm text-gray-700 font-bold mt-1">
                                                            Admissão: {formatDate(item.admissionDate)}
                                                        </p>
                                                    )}
                                                    </div>
                                                    
                                                    <div 
                                                        className="p-3 flex flex-col justify-center bg-gray-300 text-gray-800 w-full sm:w-auto flex-shrink-0 
                                                        rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none sm:max-w-xs"
                                                    >
                                                        <p className="text-sm text-gray-800">
                                                            <span className="font-semibold">Status:</span> 
                                                            <span className={item.isActive ? 'text-green-600 font-bold' : 'text-red-600 font-bold' }>
                                                                {item.isActive ? 'Ativo' : 'Inativo'}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                    </>
                                )}
                            </div>
                        </div>
                    </div> 
                </section>
            </main>
            
            {showLoadingModal && <LoadingModal message={loadingMessage} />}
            
        </div>
    );
}

export default function AdminUsuariosPage() {
    return <PesquisaGeralContent />;
}