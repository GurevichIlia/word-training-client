import { WordCounterComponent } from './../word-counter/word-counter.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [WordCounterComponent],
  declarations: [WordCounterComponent],
  providers: []
})
export class WordCounterModule { }
