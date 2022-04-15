import { WordListModule } from './../../../shared/components/word-list/word-list.module';

import { TrainResultComponent } from './train-result.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { GroupStatisticsModule } from 'src/app/shared/components/group-statistics/group-statistics.module';
import { WordCounterModule } from 'src/app/shared/components/word-counter/word-counter.module';
import { NbCardModule, NbListModule, NbProgressBarModule, NbButtonModule } from '@nebular/theme';

const resultRoutes: Routes = [
  { path: '', component: TrainResultComponent }
]

@NgModule({
  declarations: [
    TrainResultComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(resultRoutes),
    GroupStatisticsModule,
    WordListModule,
    PipesModule,
    WordCounterModule,
    NbCardModule,
    NbListModule,
    NbProgressBarModule,
    NbButtonModule

  ],
})
export class TrainResultModule { }
