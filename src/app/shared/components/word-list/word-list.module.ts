import { ComponentsModule } from './../components.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WordModule } from '../word/word.module';

import { WordListComponent } from './word-list.component';
import { UtilsService } from '../../services/utils.service';

@NgModule({
  imports: [
    CommonModule,
    WordModule,
    InfiniteScrollModule,
    ComponentsModule
  ],
  exports: [
    WordListComponent
  ],
  declarations: [WordListComponent],
  providers: [UtilsService],
})
export class WordListModule { }
