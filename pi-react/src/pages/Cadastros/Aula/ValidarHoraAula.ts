import type { 
    // Instrutor, 
    Unidade } from "../../../types/InstrutorUnidade"

export default function ValidarHoraAula({unidade, data}:{
    unidade: Unidade | null;
    data: string;
}){
    console.log("UNIDADE VALIDAR HORA AULA: ",unidade);
    console.log("DATA VALIDAR HORA AULA: ",data);
}