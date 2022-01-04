import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Aluno } from '../aluno';
import { AlunosService } from '../alunos.service';

// https://medium.com/@evertonwalker123/como-usar-o-resolve-no-angular-b28d6fa8a93e
@Injectable()
export class AlunoDetalheResolver implements Resolve<Aluno> {

  constructor(private alunoService: AlunosService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any | Observable<any> | Promise<any> {

      console.log('AlunoDetalheResolver');

      const id = route.params['id'];
      return this.alunoService.getAluno(id);

  }

}
