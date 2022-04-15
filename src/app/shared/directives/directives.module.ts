import { SlideWordDirective } from './slide-word.directive';
import { NgModule } from '@angular/core';
import { HeightByHighestDirective } from './height-by-highest.directive';


@NgModule({
  imports: [],
  exports: [SlideWordDirective, HeightByHighestDirective],
  declarations: [SlideWordDirective, HeightByHighestDirective],
  providers: [],
})
export class DirectivesModule { }
