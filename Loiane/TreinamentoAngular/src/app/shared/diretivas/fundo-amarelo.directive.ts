import { Directive, ElementRef, Renderer2, RendererStyleFlags2, OnInit } from '@angular/core';

@Directive({
  selector: '[fundoAmarelo]'
})
export class FundoAmareloDirective implements OnInit {
  // private _elementRef: ElementRef
  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef
    ) {

    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      'yellow'
    );

   }
  ngOnInit(): void {
      this.renderer2.addClass(this.elementRef.nativeElement, 'myClass')
  }

}
