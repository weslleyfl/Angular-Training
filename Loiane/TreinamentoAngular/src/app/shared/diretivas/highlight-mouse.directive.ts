import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[highlightMouse]',
})
export class HighlightMouseDirective {

  @HostBinding('style.backgroundColor') backgroundColor: string;

  private backgroundColor_P: string;

  @HostBinding('style.backgroundColor') get getColor() {
    // aqui voce pode colocar codigo extra
    return this.backgroundColor_P;
  }

  constructor(private _elementRef: ElementRef, private _render: Renderer2) {}

  @HostListener('mouseenter') onMouseOver() {
    // this._render.setStyle(
    //   this._elementRef.nativeElement,
    //   'background-color',
    //   'red'
    // );
    this.backgroundColor_P = 'yellow';
  }

  @HostListener('mouseleave') onMouseLeave() {
    // this._render.setStyle(
    //   this._elementRef.nativeElement,
    //   'background-color',
    //   'white'
    // );
    this.backgroundColor_P = 'white';
  }
}
