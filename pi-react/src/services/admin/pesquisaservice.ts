import { API_BASE_URL } from "../../config/api";

export interface UserResult {
    id: number;
    fullname: string; 
    typeuser: string; 
    cpf?: string; 
    phone?: string; 
    registration?: string; 
    admissionDate?: string; 
    isActive?: boolean;
    profession?: string;
    birthdate?: string;
}

// =====================
// CONSTANTES
// =====================

const ENDPOINTS = {
    STUDENTS: '/students/list',
    INSTRUCTORS: '/instructors',
    ADMIN_RECEPTIONIST: '/admin_receptionist',
} as const;

const TYPEUSER_MAPPING: { [key: string]: string } = {
    'student': 'alunos',
    'administrator': 'administradores',
    'instructor': 'instrutores',
    'receptionist': 'recepcionistas',
};

// =====================
// HELPERS
// =====================

/**
 * Determina o status ativo/inativo do usuário
 */
const determineStatus = (item: any): boolean => {
    if (typeof item.active === 'boolean') {
        return item.active;
    }
    if (typeof item.status === 'string') {
        return item.status.toLowerCase() === 'ativo' || item.status.toLowerCase() === 'active';
    }
    return true; // Default: ativo
};

/**
 * Normaliza o nome completo do usuário
 */
const normalizeFullname = (item: any): string => {
    const nomeDoItem = item.nome;
    const nomeInvalido = typeof nomeDoItem === 'string' && 
                         (nomeDoItem.trim().toLowerCase() === 'sem nome' || nomeDoItem.trim() === '');
    const nomeValidado = nomeInvalido ? undefined : nomeDoItem;
    
    return item.fullname || item.name || nomeValidado || 'Nome Desconhecido';
};

/**
 * Faz a requisição HTTP para o endpoint especificado
 */
const fetchFromEndpoint = async (endpoint: string, type: string): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'accept': 'application/json',
        }
    });
    
    if (!response.ok) {
        throw new Error(`Erro ${response.status} ao buscar ${type}.`);
    }
    
    const data = await response.json();
    const items = data.data || data;

    if (!Array.isArray(items)) {
        console.warn(`Resposta inesperada da API para ${type}. Não é um array.`, items);
        return [];
    }

    return items;
};

// =====================
// TRANSFORMADORES POR TIPO
// =====================

/**
 * Transforma dados de alunos para o formato UserResult
 * Campos utilizados: id, fullname, phone, typeuser, cpf, profession
 */
const transformStudent = (item: any): UserResult => {
    return {
        id: item.id,
        fullname: normalizeFullname(item),
        typeuser: 'alunos',
        phone: item.phone,
        cpf: item.cpf,
        profession: item.profession,
        isActive: determineStatus(item),
    };
};

/**
 * Transforma dados de instrutores para o formato UserResult
 * Campos utilizados: id, fullname, phone, typeuser, cref, crefito, birthdate, hiring
 */
const transformInstructor = (item: any): UserResult => {
    const registration = item.cref || item.crefito;
    
    return {
        id: item.id,
        fullname: normalizeFullname(item),
        typeuser: 'instrutores',
        phone: item.phone,
        registration: registration,
        birthdate: item.birthdate,
        admissionDate: item.hiring,
        isActive: determineStatus(item),
    };
};

/**
 * Transforma dados de administradores para o formato UserResult
 * Campos utilizados: id, fullname, phone, typeuser, birthdate, hiring
 */
const transformAdministrator = (item: any): UserResult => {
    return {
        id: item.id,
        fullname: normalizeFullname(item),
        typeuser: 'administradores',
        phone: item.phone,
        birthdate: item.birthdate,
        admissionDate: item.hiring,
        isActive: determineStatus(item),
    };
};

/**
 * Transforma dados de recepcionistas para o formato UserResult
 * Campos utilizados: id, fullname, phone, typeuser, birthdate, hiring
 */
const transformReceptionist = (item: any): UserResult => {
    return {
        id: item.id,
        fullname: normalizeFullname(item),
        typeuser: 'recepcionistas',
        phone: item.phone,
        birthdate: item.birthdate,
        admissionDate: item.hiring,
        isActive: determineStatus(item),
    };
};

// =====================
// FUNÇÕES DE BUSCA POR TIPO
// =====================

/**
 * Busca dados de alunos
 */
const fetchStudents = async (): Promise<UserResult[]> => {
    try {
        const items = await fetchFromEndpoint(ENDPOINTS.STUDENTS, 'alunos');
        return items.map(transformStudent);
    } catch (err) {
        console.error('Falha ao buscar dados de alunos:', err);
        return [];
    }
};

/**
 * Busca dados de instrutores
 */
const fetchInstructors = async (): Promise<UserResult[]> => {
    try {
        const items = await fetchFromEndpoint(ENDPOINTS.INSTRUCTORS, 'instrutores');
        return items.map(transformInstructor);
    } catch (err) {
        console.error('Falha ao buscar dados de instrutores:', err);
        return [];
    }
};

/**
 * Busca dados de administradores e recepcionistas
 * (mesmo endpoint, filtrados por typeuser)
 */
const fetchAdminsAndReceptionists = async (): Promise<UserResult[]> => {
    try {
        const items = await fetchFromEndpoint(ENDPOINTS.ADMIN_RECEPTIONIST, 'administradores/recepcionistas');
        
        return items.map((item: any) => {
            const apiType = item.typeuser || item.type;
            const frontendType = TYPEUSER_MAPPING[apiType?.toLowerCase()];
            
            // Determina se é admin ou recepcionista baseado no tipo retornado pela API
            if (frontendType === 'recepcionistas') {
                return transformReceptionist(item);
            }
            
            // Default: considera como administrador
            return transformAdministrator(item);
        });
    } catch (err) {
        console.error('Falha ao buscar dados de administradores/recepcionistas:', err);
        return [];
    }
};

// =====================
// FUNÇÕES PÚBLICAS
// =====================

/**
 * Busca todos os usuários (alunos, instrutores, admins e recepcionistas)
 */
export const fetchAllUsers = async (): Promise<UserResult[]> => {
    try {
        const [students, instructors, adminsAndReceptionists] = await Promise.all([
            fetchStudents(),
            fetchInstructors(),
            fetchAdminsAndReceptionists(),
        ]);
        
        return [...students, ...instructors, ...adminsAndReceptionists];
    } catch (error) {
        console.error("Erro geral na busca de todos os usuários:", error);
        throw new Error("Não foi possível carregar todos os dados de usuários.");
    }
};

/**
 * Aplica filtros de tipo de usuário e nome
 */
export const applyFilters = (situacao: string, nomeFiltro: string, results: UserResult[]): UserResult[] => {
    return results.filter(item => {
        const itemTipo = item.typeuser.toLowerCase();
        const situacaoMatch = situacao === 'todos' || situacao === '' || itemTipo === situacao;
        const nomeLower = nomeFiltro.toLowerCase();
        const nomeMatch = nomeFiltro === '' || (item.fullname?.toLowerCase().includes(nomeLower) ?? false);
        return situacaoMatch && nomeMatch;
    });
};

export const applySorting = (results: UserResult[], currentOrder: string): UserResult[] => {
    const sorted = [...results].sort((a, b) => {
        const nomeA = a.fullname?.toLowerCase() || '';
        const nomeB = b.fullname?.toLowerCase() || '';
        
        if (nomeA < nomeB) return currentOrder === 'crescente' ? -1 : 1;
        if (nomeA > nomeB) return currentOrder === 'crescente' ? 1 : -1;
        return 0;
    });
    return sorted;
};