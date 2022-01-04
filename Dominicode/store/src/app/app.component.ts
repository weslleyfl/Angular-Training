import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'store';
  valor: number = 5;
  deletarCiclo: boolean = false;

  name(): void {
    this.title = 'ola reporter';
  }

  public mudarValor(): void {
    this.valor++;
  }

  public deletar(): void {
    this.deletarCiclo = true;
  }
}
