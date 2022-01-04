import { Injectable, EventEmitter } from '@angular/core';

// Injectable This marks the class as one that participates in the dependency injection system
@Injectable({
  providedIn: 'root',
})
export class HeroService {

  emitirHeroCriado = new EventEmitter<string>();
  static criouNovoHeroi = new EventEmitter<string>();

  private HEROES: Array<string> = [
    'Weslley',
    'SuperMan',
    'Mulher Maravilha',
    'Homem Aranha',
  ];

  constructor() {}

  public getHeroes(): Array<string> {
    return this.HEROES;
  }

  public addHero(hero: string): void {
     this.HEROES.push(hero);
     this.emitirHeroCriado.emit(hero);
     HeroService.criouNovoHeroi.emit(hero);
  }
}
