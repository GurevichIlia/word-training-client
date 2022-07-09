import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConjugationCellComponent } from 'src/app/shared/components/conjugation-cell/conjugation-cell.component';
import { ConjugationCardComponent } from './conjugation-card.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';



@NgModule({
  declarations: [
    ConjugationCardComponent,
    ConjugationCellComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
  ],
  exports: [
    ConjugationCardComponent,
    ConjugationCellComponent,
  ]
})
export class ConjugationCardModule { }
