export interface UserToken {
  access_token: string;
  pessoa_tipo: number;
  nome: string;
  matricula: number;
  email: string;
  fk_turma_idturma?: number;
}
