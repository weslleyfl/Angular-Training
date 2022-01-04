import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretivas-customizadas',
  templateUrl: './diretivas-customizadas.component.html',
  styleUrls: ['./diretivas-customizadas.component.scss'],
})
export class DiretivasCustomizadasComponent implements OnInit {
  
  public meuFavorito: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public onClick(): void {
    this.meuFavorito = !this.meuFavorito;
  }
}
