import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CursosGuard implements CanActivateChild {
// Muito utilizado para verificar permissao de usuario, se ele pode acessar determinada rota
    	canActivateChild(
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
        ): Observable<boolean>|boolean {

            console.log('guarda de rota filha');

            return true;
        }

}
