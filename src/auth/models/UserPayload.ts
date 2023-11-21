export interface UserPayload {
  matricula: number;
  email: string;
  nome: string;
  iat?: number;
  exp?: number;
  type?: number;
  pessoa_tipo: number;
}
