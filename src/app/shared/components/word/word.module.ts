import { RtlDirectionDirective } from './../../directives/rtl-directive/rtl-directive.directive';
import { RtlDirectiveModule } from './../../directives/rtl-directive/rtl-directive.module';
import { TuiSvgModule } from '@taiga-ui/core';
import { ConvertToPercentPipe } from './../../pipes/convert-to-percent.pipe';
import { NbCheckboxModule, NbProgressBarModule } from '@nebular/theme';
import { MenuModule } from './../menu/menu.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WordComponent } from './word.component';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../directives/directives.module';
import { TuiProgressModule } from '@taiga-ui/kit';

@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    NbCheckboxModule,
    NbProgressBarModule,
    PipesModule,
    DirectivesModule,
    TuiProgressModule,
    TuiSvgModule
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
