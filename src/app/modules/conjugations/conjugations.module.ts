import { ModalUiModule } from './../../shared/components/modal-ui/modal-ui.module';
import { GroupListModule } from './../../shared/components/group-list/group-list.module';
import { VerbTableRowModule } from './../word-training/train/verb-table-row/verb-table-row.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAccordionModule, NbCardModule, NbCheckboxModule, NbInputModule, NbToggleModule, NbListModule } from '@nebular/theme';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { CsvManagerModule } from '../vocabulary/csv-manager/csv-manager.module';
import { CsvVerbsInputComponent } from './components/csv-verbs-input/csv-verbs-input.component';
import { VerbsInputComponent } from './components/verbs-input/verbs-input.component';
import { ConjugationsRoutingModule } from './conjugations-routing.module';
import { ConjugationsComponent } from './conjugations.component';
import { ConjugationsListComponent } from './components/conjugations-list/conjugations-list.component';
import { ConjugationCardComponent } from './components/conjugation-card/conjugation-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
    ConjugationsComponent,
    VerbsInputComponent,
    CsvVerbsInputComponent,
    ConjugationsListComponent,
    ConjugationCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ConjugationsRoutingModule,
    VerbTableRowModule,
    CsvManagerModule,
    NbCardModule,
    NbInputModule,
    NbCheckboxModule,
    NbToggleModule,
    NbAccordionModule,
    NbListModule,
    PipesModule,
    GroupListModule,
    ModalUiModule,
    InfiniteScrollModule,
  ],


})
export class ConjugationsModule { }
