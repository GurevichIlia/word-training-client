import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { KnowledgeLevelColorMap } from 'src/app/core/enums/knowledge-level.enum';

@Directive({
  selector: '[knowledgeLevel]'
})
export class KnowledgeLevelDirective {

  @Input('knowledgeLevel') set knowledgeLevel(knowledgeLevel: number) {
    if (!this.el) {
      return
    }

    const styles = KnowledgeLevelColorMap.get(knowledgeLevel)

    Object.keys(styles).forEach(style => {
      this.renderer.setStyle(this.el.nativeElement, style, styles[style])
    })

  }

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2
  ) { }

}


