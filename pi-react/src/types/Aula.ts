

export interface Aula {
  id: number;
  unidade: string;
  instrutor: string;
  alunos: string[];
  data: string | number | Date | any
  horario: { inicio: string; fim: string };
}
