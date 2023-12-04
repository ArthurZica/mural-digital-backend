export interface UserFromJwt {
  matricula: number;
  email: string;
  nome: string;
  pessoa_tipo: number;
  fk_turma_idturma?: number;
}
