import { Directive, ElementRef, Host, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSlideWord]'
})
export class SlideWordDirective {

  constructor(
    private e: ElementRef<HTMLDivElement>,
    private renderer: Renderer2
  ) { }
  @Host()

  @HostListener('swipeleft') slideLeft = () => {

    const isIncludes = this.e.nativeElement.classList.contains('slideRight')

    if (isIncludes) {
      this.renderer.removeClass(this.e.nativeElement, 'slideRight')
      console.log('WORD SWIPED Left', this.e.nativeElement.classList)

      return
    }

    this.renderer.addClass(this.e.nativeElement, 'slideLeft')
    console.log('WORD SWIPED Left')
  }

  @HostListener('swiperight') slideRight = () => {
    const isIncludes = this.e.nativeElement.classList.contains('slideLeft')
    if (isIncludes) {
      this.renderer.removeClass(this.e.nativeElement, 'slideLeft')
      console.log('WORD SWIPED right', this.e.nativeElement.classList)

      return
    }

    this.renderer.addClass(this.e.nativeElement, 'slideRight')
    console.log('WORD SWIPED Right')
  }

}
