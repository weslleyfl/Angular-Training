import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent implements OnInit {

  public nomePortal: string = '';
  public cursos: string[] = [
    'Java',
    'TypeScript',
    'C#'
  ];


  constructor() {
    this.nomePortal = 'http://weslleylopes.com';
  }

  ngOnInit(): void {}

  public adicionarCurso(valor: string) {
    this.cursos.push(valor);
  }

}
