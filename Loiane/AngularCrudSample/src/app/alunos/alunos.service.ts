import { Injectable } from '@angular/core';
import { AlunosModule } from './alunos.module';
import { Aluno } from './aluno';

@Injectable()
export class AlunosService {

  private alunos: Aluno[] = [
    {id: 1, nome: 'Aluno 01', email: 'aluno01@email.com'},
    {id: 2, nome: 'Aluno 02', email: 'aluno02@email.com'},
    {id: 3, nome: 'Aluno 03', email: 'aluno03@email.com'}
  ];

  constructor() { }

  public getAlunos(): Aluno[] {
    return this.alunos;
  }

  public getAluno(id: number): Aluno {
     for (const aluno of this.alunos) {
        if(aluno.id == id ){
          return aluno;
        }
     }
     return null;
  }

}
