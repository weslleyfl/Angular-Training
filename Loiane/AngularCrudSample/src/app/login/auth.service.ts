import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from './usuario';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  constructor(private router: Router) {}

  public fazerLogin(usuario: Usuario) {
    if (usuario.nome === 'usuario@teste.com' && usuario.senha === '1') {
      this.usuarioAutenticado = true;
      this.mostrarMenuEmitter.emit(true);
      this.router.navigate(['/']);
    } else {
      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
    }
  }

  public usuarioEstaAutenticado(): boolean {
    return this.usuarioAutenticado;
  }

  // faz o mesmo papel do fazerLogin()
  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(() => this.usuarioAutenticado = true)
    );
  }

  logout(): void {
    this.usuarioAutenticado = false;
  }
}
