import { CommonModule } from '@angular/common';
import { InstallSuggestionComponent } from './install-suggestion/install-suggestion.component';
import { NgModule } from '@angular/core';
import { NbIconModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    NbIconModule
  ],
  exports: [],
  declarations: [
    InstallSuggestionComponent
  ],
  providers: [],
})
export class InstallOnHomeScreen { }

