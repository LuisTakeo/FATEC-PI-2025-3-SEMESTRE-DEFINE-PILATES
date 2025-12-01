interface Unidade {
  id: number;
  name: string;
}

interface Instructor {
  id: number;
  nome: string;
}

interface AlunoMatriculado {
  id_student: number;
  nome: string;
}

export interface Aula {
  id: number;
  horario: string;
  tipo: string;
  unidade: Unidade;
  instructor: Instructor;
  data: string;
  alunos?: AlunoMatriculado[];
}

