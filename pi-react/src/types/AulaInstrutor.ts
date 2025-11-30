export interface Aluno {
  id_student: number;
  nome: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Aula_Nome {
  id_aula: number;
  tipo_aula: string;
  studio: string;
  data: string;
  horario: string;
  observacao: string | null;
  alunos: Aluno[];
}

export interface AulaInstrutor {
  status: 'success' | 'error';
  message: string;
  data: Aula_Nome[];
}
