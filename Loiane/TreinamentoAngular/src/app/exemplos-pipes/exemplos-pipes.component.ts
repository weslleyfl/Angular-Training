import { Component, OnInit } from '@angular/core';
import { interval  } from 'rxjs';
import { map } from 'rxjs/operators';
import { Livro } from './livro';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.scss']
})
export class ExemplosPipesComponent implements OnInit {

  livro: Livro;
  filtro: string = "";
  livros: string[] = ["Java", "Angular"];

  // Programaçao com Promessa
  valorAsync = new Promise((resolve, reject) => {
     setTimeout(() => {
        resolve('Valor assincrono')
     }, 2000);
  });

  // Programacao reativa com Observable
  valorAsync2 = interval(5000).pipe(
    map(valor => 'Valor assincrono 2')
   );

  constructor() {
    this.livro = {} as Livro;
    this.addLivros();
   }

  ngOnInit(): void {

  }

  addLivros() {
    this.livro.titulo = 'Learning JavaScript Data Structures and Algorithms';
    this.livro.rating = 4.54778;
    this.livro.numeroPaginas = 566;
    this.livro.preco = 56.78,
    this.livro.dataLancamento = new Date(2021,8,19);
    this.livro.url = 'http://teste.com.br';
  }

  adicionarCurso(valor: string): void {
    this.livros.push(valor);
  }

  obterCursos() : string[] {

    if(this.livros.length === 0 || this.filtro === undefined || this.filtro.trim() === '') {
      return this.livros;
    }

    return this.livros.filter((v) => {
      if(v.toLowerCase().indexOf(this.filtro) >= 0) {
        return true;
      }
      return false;
    });


  }

}
