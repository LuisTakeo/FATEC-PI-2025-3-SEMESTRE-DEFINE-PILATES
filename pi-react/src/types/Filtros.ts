//melhorar para que seja capaz de pesquisar todos colaboradores e alunos

export interface Filtros {
  unidade?: "unidade 1" | "unidade 2" | "nidade 3" | null;
  instrutor?: string | null;
  dataInicio?: string | null;
  horaInicio?: string | null;
}
