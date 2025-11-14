import type {Instrutor} from "./InstrutorUnidade"

export interface AulaCadastrada{
    id?: number;
    horario: string;
    unidade: string;
    instrutor: Instrutor;
    data: string;
}
