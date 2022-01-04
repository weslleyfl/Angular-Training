import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngif',
  templateUrl: './diretiva-ngif.component.html',
  styleUrls: ['./diretiva-ngif.component.scss']
})
export class DiretivaNgifComponent implements OnInit {

  public aba: string = "home";

  public lista: Array<string> = [
    "Java",
    "C#",
    "Outros"
  ];

  public meuFavorito:boolean = false;

  public tamanho: number = 10;

  constructor() { }

  ngOnInit(): void {
  }

  public onClick():void {
    this.meuFavorito = !this.meuFavorito;
  }

}
