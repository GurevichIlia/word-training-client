import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbToggleModule } from '@nebular/theme';

import { ToggleComponent } from './toggle.component';

@NgModule({
  imports: [
    CommonModule,
    NbToggleModule],
  exports: [ToggleComponent],
  declarations: [ToggleComponent],
  providers: [],
})
export class ToggleModule { }
