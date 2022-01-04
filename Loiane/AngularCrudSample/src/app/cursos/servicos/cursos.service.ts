import { Injectable } from '@angular/core';
import { CursosModule } from '../cursos.module';

@Injectable()
export class CursosService {
  constructor() {}

  public getCursos(): any[] {
    return [
      { id: 1, nome: 'Angular 10' },
      { id: 2, nome: 'C# 9' },
    ];
  }

  public getCurso(id: number): any {
    let cursos = this.getCursos();
    for (const curso of cursos) {
      if (curso.id == id) {
        return curso;
      }
    }
    return null;
  }
}
