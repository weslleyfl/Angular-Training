import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/shared/servicos/hero.service';

import { CursoService } from '../curso-service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  
  public listaHerois: Array<string>;
  public cursosService: CursoService;
  public hero: string;

  constructor(private _heroService: HeroService) {
    this.listaHerois = [];
    this.cursosService = new CursoService(); // auto acoplamento
  }

  ngOnInit(): void {
    // this.listaHerois = this._heroService.getHeroes();
    this.getHeroes();

    this._heroService.emitirHeroCriado.subscribe((curso) => console.log(curso));
    HeroService.criouNovoHeroi.subscribe((curso) => (this.hero = curso));
  }

  getHeroes(): void {
    this.listaHerois = this._heroService.getHeroes();
    // this.listaHerois = this.cursosService.getCursos();
    // this.listaHerois.push(...this._heroService.getHeroes());
  }

  onAddHero(valor: string): void {
    this._heroService.addHero(valor);
  }
}
