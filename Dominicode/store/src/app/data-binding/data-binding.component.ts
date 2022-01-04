import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css'],
})
export class DataBindingComponent implements OnInit {

  valorAtual: string = "";
  valorSalvo: string = "";
  isMouseOver: boolean = false;

  // Acessando o DOM elemento Input via atributo do componente
  @ViewChild('campoValor') campoValor!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  public botaoClicado(): void {
    //alert('clicou aqui');
    console.log(this.campoValor.nativeElement.value++);

  }

  public onKeyUp(evento:KeyboardEvent):void {
    console.log(evento);
    console.log((<HTMLInputElement>evento.target).value);
    this.valorAtual = (<HTMLInputElement>evento.target).value;
  }

  salvarValor(valor:any):void {
    this.valorSalvo = valor;
  }

  onMouseOverOut():void {
    this.isMouseOver = !this.isMouseOver;
  }
}
