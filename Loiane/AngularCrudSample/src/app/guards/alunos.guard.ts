import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlunosGuard implements CanActivateChild {
  constructor() {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    
    //console.log(route);
    //console.log(state);

    console.log('AlunosGuard: Guarda de rota filha');

    if (state.url.includes('editar')) {
      //alert('Usuário sem acesso');
      //return Observable.of(false);
    }

    return true;
  }
}
