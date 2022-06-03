import { tap, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Directive, Inject, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { SHOW_RTL_TOKEN } from './show-rtl.token';
import { TuiDestroyService } from '@taiga-ui/cdk';

@Directive({
  selector: '[rtlDirection]',
  providers: [TuiDestroyService]
})
export class RtlDirectionDirective implements AfterViewInit {

  constructor(
    @Inject(ElementRef) private el: ElementRef,
    @Inject(SHOW_RTL_TOKEN) private isShowRTL$: Observable<boolean>,
    @Inject(Renderer2) private renderer: Renderer2,
    @Inject(TuiDestroyService) private destroy$: TuiDestroyService
  ) { }

  ngAfterViewInit(): void {
    this.isShowRTL$.pipe(
      tap(isRtl => {
        if (isRtl) {
          this.renderer.setStyle(this.el.nativeElement, 'direction', 'rtl');
          return
        }
        this.renderer.setStyle(this.el.nativeElement, 'direction', 'ltr')
      }),
      takeUntil(this.destroy$)
    ).subscribe()

  }




}
