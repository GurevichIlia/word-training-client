import { NbButtonModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatorComponent } from './translator.component';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    TranslatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NbButtonModule
  ], exports: [
    TranslatorComponent
  ]
})
export class TranslatorModule { }
