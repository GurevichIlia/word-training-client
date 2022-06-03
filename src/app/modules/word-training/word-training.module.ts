import { TuiButtonModule } from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StopWordsTrainGuard } from './../../shared/guards/stop-words-train.guard';
import { NbCardModule, NbButtonModule, NbToggleModule, NbRadioModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { GroupStatisticsModule } from './../../shared/components/group-statistics/group-statistics.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WordCounterModule } from 'src/app/shared/components/word-counter/word-counter.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GroupListModule } from './../../shared/components/group-list/group-list.module';
import { SelectGroupComponent } from './select-group/select-group.component';
import { TrainComponent } from './train/train.component';
import { WordCardComponent } from './train/word-card/word-card.component';
import { WordTrainingComponent } from './word-training.component';
import { WordTrainingFacade } from './word-training.facade';
import { WordTrainingService } from './word-training.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { CardBodyComponent } from './train/card-body/card-body.component';
import { WordCardBodyComponent } from './train/word-card-body/word-card-body.component';
import { VerbCardBodyComponent } from './train/verb-card-body/verb-card-body.component';
import { VerbTableRowComponent } from './train/verb-table-row/verb-table-row.component';
import { ToggleModule } from 'src/app/shared/components/toggle/toggle.module';
import { VerbTableRowModule } from './train/verb-table-row/verb-table-row.module';



const wordtrainingRoutes: Routes = [
  {
    path: '', component: WordTrainingComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'select-group' },
      { path: 'select-group', component: SelectGroupComponent, },
      { path: 'training', component: TrainComponent, canDeactivate: [StopWordsTrainGuard] },
      {
        path: 'train-result', loadChildren: () => import('./train-result/train-result.module').then(m => m.TrainResultModule),
      },
    ],

  }
];

@NgModule({
  declarations: [
    WordTrainingComponent,
    TrainComponent,
    SelectGroupComponent,
    WordCardComponent,
    CardBodyComponent,
    WordCardBodyComponent,
    VerbCardBodyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(wordtrainingRoutes),
    ReactiveFormsModule,
    GroupListModule,
    WordCounterModule,
    GroupStatisticsModule,

    DirectivesModule,

    NbCardModule,
    NbButtonModule,
    ToggleModule,
    VerbTableRowModule,
    NbRadioModule,

    TuiButtonModule

  ],
  providers: [
    WordTrainingFacade,
    WordTrainingService,
    UtilsService
  ]
})
export class WordTrainingModule { }
