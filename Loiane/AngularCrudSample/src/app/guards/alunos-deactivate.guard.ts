import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IformCandeactivate } from './iform-candeactivate';

@Injectable() // removir o root e declarei o serviço dentro do modulo de aluno, para ficar so neste scopo
export class AlunosDeactivateGuard implements CanDeactivate<IformCandeactivate> {

  constructor() { }

  canDeactivate(
    component: IformCandeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

      console.log('guarda de desativação');

      //component.podeDesativar();
      //return component.podeMudarRota ? component.podeMudarRota() : true;
      return component.podeDesativar ? component.podeDesativar() : true;
      //return true;
  }
}
