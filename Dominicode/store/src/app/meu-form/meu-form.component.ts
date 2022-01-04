import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meu-form',
  templateUrl: './meu-form.component.html',
  styleUrls: ['./meu-form.component.css']
})
export class MeuFormComponent implements OnInit {

  nome: string = "";

  pessoa: any = {
    nome: "weslley",
    idade: 42
  }


  constructor() { }

  ngOnInit(): void {
  }

}
