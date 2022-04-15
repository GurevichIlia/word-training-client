import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';

import { ModalUiComponent } from './modal-ui.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,

  ],
  exports: [
    ModalUiComponent
  ],
  declarations: [
    ModalUiComponent,

  ],
  providers: [],
})
export class ModalUiModule { }
