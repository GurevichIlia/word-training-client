import { ConvertToPercentPipe } from './../../pipes/convert-to-percent.pipe';
import { NbCheckboxModule, NbProgressBarModule } from '@nebular/theme';
import { MenuModule } from './../menu/menu.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WordComponent } from './word.component';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    NbCheckboxModule,
    NbProgressBarModule,
    PipesModule,
    DirectivesModule

  ],
  exports: [
    WordComponent
  ],
  declarations: [
    WordComponent,

  ],
  providers: [],
})
export class WordModule { }
