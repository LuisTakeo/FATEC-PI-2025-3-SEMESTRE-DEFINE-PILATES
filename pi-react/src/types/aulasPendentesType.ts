
export interface aulasPendentesType {
  id: number;
  horario: string;
  tipo: string;
  unidade: {
    id: number;
    name: string;
    location: string;
  };
  instructor: {
    id: number;
    nome: string;
  };
  data: string; 
  inscritos: number;
  vagas_disponiveis: number;
}
