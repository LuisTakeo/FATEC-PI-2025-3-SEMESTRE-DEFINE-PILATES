export interface Aula {
  id: number;
  unidade: string;
  instrutor: string;
  data: string; // string do backend
  horario: { inicio: string; fim: string };
}
