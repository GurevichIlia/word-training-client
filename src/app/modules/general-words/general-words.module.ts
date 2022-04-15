import { PipesModule } from './../../shared/pipes/pipes.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { WordListModule } from './../../shared/components/word-list/word-list.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralWordsRoutingModule } from './general-words-routing.module';
import { GeneralWordsComponent } from './general-words.component';
import { SearchModule } from 'src/app/shared/components/search/search.module';


@NgModule({
  declarations: [GeneralWordsComponent],
  imports: [
    CommonModule,
    SharedModule,
    GeneralWordsRoutingModule,
    WordListModule,
    LoaderModule,
    SearchModule,
    PipesModule
  ]
})
export class GeneralWordsModule { }
