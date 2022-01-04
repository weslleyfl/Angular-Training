// import { Component, OnInit } from '@angular/core';
import {
  Component,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  Input
} from '@angular/core';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.css']
})
export class CicloComponent implements
OnChanges,
OnInit,
DoCheck,
AfterContentInit,
AfterContentChecked,
AfterViewInit,
AfterViewChecked,
OnDestroy {

  @Input() valorInicial: number = 10;

  constructor() {
    this.imprime('construtor');
   }

  ngOnChanges():void {
    this.imprime('ngOnChanges');
  }

  ngOnInit(): void {
    this.imprime('inicio OnInit');
  }

  ngDoCheck():void {
    this.imprime('ngDoCheck');
  }

  ngAfterContentInit():void {
    this.imprime('ngAfterContentInit');
  }

  ngAfterContentChecked():void {
    this.imprime('ngAfterContentChecked');
  }

  ngAfterViewInit():void {
    this.imprime('ngAfterViewInit');
  }

  ngAfterViewChecked():void {
    this.imprime('ngAfterViewChecked');
  }

  ngOnDestroy():void {
    this.imprime('ngOnDestroy');
  }

  private imprime(hook: string): void {
    console.log(hook);
  }

}
