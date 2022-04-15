import { ConvertToPercentPipe } from './convert-to-percent.pipe';
import { ReverseArrayPipe } from './reverse-array.pipe';
import { NgModule } from '@angular/core';
import { WordsFilterPipe } from './words-filter.pipe';
import { WordMenuPipe } from './word-menu.pipe';
import { VerbConjugationPipe } from './verb-conjugation.pipe';
import { ConjugationTemplatePipe } from './conjugation-template.pipe';
import { VerbTimePipe } from './verb-time.pipe';



@NgModule({
  imports: [],
  exports: [
    ReverseArrayPipe,
    ConvertToPercentPipe,
    WordsFilterPipe,
    WordMenuPipe,
    ConjugationTemplatePipe,
    VerbTimePipe
  ],
  declarations: [
    ReverseArrayPipe,
    ConvertToPercentPipe,
    WordsFilterPipe,
    WordMenuPipe,
    VerbConjugationPipe,
    ConjugationTemplatePipe,
    VerbTimePipe
  ],
  providers: [],
})
export class PipesModule { }
