import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { NbCardModule, NbCheckboxModule, NbInputModule, NbProgressBarModule, NbSpinnerModule } from '@nebular/theme';
import { WordSkeletonComponent } from './word-skeleton/word-skeleton.component';




@NgModule({
  declarations: [



  WordSkeletonComponent,



],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatExpansionModule,
    NbCardModule,
    NbSpinnerModule,
    NbProgressBarModule,
    NbCheckboxModule,
    NbInputModule,


  ],
  exports: [
    WordSkeletonComponent


  ],
})
export class ComponentsModule { }
