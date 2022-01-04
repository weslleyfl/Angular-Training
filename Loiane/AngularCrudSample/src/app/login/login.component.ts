import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Usuario } from './Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public usuario: Usuario = new Usuario();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public fazerLogin(): void {
    this.authService.fazerLogin(this.usuario);

  }

}
