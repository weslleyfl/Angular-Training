export class CursoService {
  private cursos : string[];

  constructor() {}

  public getCursos(): string[] {
    this.cursos = ["Vampira", "mulherDoida", "Vamos que Vamos"];
    return this.cursos;
  }
}
