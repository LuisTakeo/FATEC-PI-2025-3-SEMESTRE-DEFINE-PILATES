export interface ConfirmacaoAulaResponse {
  status: string;
  message: string;
  data: {
    id_student: number;
    id_aula: number;
    action: string;
    new_status: string;
  };
}