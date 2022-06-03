import { RtlDirectiveModule } from './rtl-directive/rtl-directive.module';
import { SlideWordDirective } from './slide-word.directive';
import { NgModule } from '@angular/core';
import { HeightByHighestDirective } from './height-by-highest.directive';
import { KnowledgeLevelDirective } from './knowledge-level.directive';
import { DirectionDirective } from './direction.directive';


@NgModule({
  imports: [],
  exports: [SlideWordDirective, HeightByHighestDirective, KnowledgeLevelDirective, RtlDirectiveModule],
  declarations: [SlideWordDirective, HeightByHighestDirective, KnowledgeLevelDirective, DirectionDirective],
  providers: [],
})
export class DirectivesModule { }
