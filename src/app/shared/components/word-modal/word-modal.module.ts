import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { WordModalComponent } from './word-modal.component';



@NgModule({
  declarations: [WordModalComponent],
  imports: [
    CommonModule,
    TuiInputModule,
    ReactiveFormsModule,
    FormsModule,
    TuiTextfieldControllerModule,
  ],
  exports: [WordModalComponent]
})
export class WordModalModule { }
