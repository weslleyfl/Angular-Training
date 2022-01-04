import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cursos-detalhe',
  templateUrl: './cursos-detalhe.component.html',
  styleUrls: ['./cursos-detalhe.component.css']
})
export class CursosDetalheComponent implements OnInit {

  @Input() nomeCurso: string = "";
  // The @Output() decorator in a child component or directive lets data flow from
  // the child to the parent.
  @Output() novoCursoEvento = new EventEmitter<string>();

  public novoCursoDetalhe: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  public adicionarNovoCursoDetalhe(valor: string) {
    this.novoCursoEvento.emit(valor);
    this.novoCursoDetalhe = "";
  }

  public adicionarNovoCurso() {
    this.novoCursoEvento.emit(this.novoCursoDetalhe);
    this.novoCursoDetalhe = "";
  }

}
