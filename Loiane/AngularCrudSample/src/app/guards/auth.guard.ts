import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanActivateChild, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad { // CanActivate é o que fala que é um guard router

  // Muito utilizado para login
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    console.log('Verifica usuario autenticado no AuthGuard - Pai navegador');

    const url: string = state.url;
    return this.checarLogin(url);

    // if (this.authService.usuarioEstaAutenticado()) {
    //     return true;
    // }

    // this.router.navigate(['/login']);
    // return false;
  }

  checarLogin(url: string): boolean | UrlTree {

    if (this.authService.usuarioEstaAutenticado()) {
      return true;
    }
    // Armazene a tentativa de URL para o redirecionamento
    this.authService.redirectUrl = url;

    // Redirecionar para a página de login
    return this.router.parseUrl('/login');
    // this.router.navigate(['/login']);
    // return false;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

      return this.canActivate(childRoute, state);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

      console.log('CanLoad Verificando se usuario pode carregar o modulo de curso');
      console.log(route.path);

      const url: string = segments[0].path;
      return this.checarLogin(url);
  }


}


