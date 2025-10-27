export interface Filtros {
  unidade?: "Unidade 1" | "Unidade 2" | "Unidade 3" | null;
  instrutor?: string;
  data?: Date;
  horario?: {
    inicio: string;
    fim: string;
  };
}
