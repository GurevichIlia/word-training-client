import { AfterContentInit, AfterViewChecked, Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHeightByHighest]'
})
export class HeightByHighestDirective implements AfterContentInit, AfterViewChecked {
  @Input() elementClassName: string;
  constructor(
    private e: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {



  }

  ngAfterViewChecked(): void {

    const elements = this.e.nativeElement.getElementsByClassName(this.elementClassName)
    if (!elements) return
    const children = Array.from(elements)
    const itemsHeights = children
      .map(e => e.getBoundingClientRect().height)

    const highest = itemsHeights.reduce((acc, curr) => {
      acc = curr > acc ? curr : acc
      return acc
    })

    children.forEach(e => this.renderer.setStyle(e, 'height', `${highest}px`))




  }
  ngAfterContentInit() {

  }
}
