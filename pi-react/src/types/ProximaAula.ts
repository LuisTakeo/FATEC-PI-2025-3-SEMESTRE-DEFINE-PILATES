
export interface ProximaAulaApi {
    id: number;
    horario: string; 
    tipo: string; 
    unidade: {
        id: number;
        name: string;
        endereco: string;
    };
    instructor: {
        id: number;
        nome: string;
    };
    data: string;
}

export interface ApiResponse {
    status: string;
    message: string;
    data: ProximaAulaApi | null; 
}