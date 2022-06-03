import { RtlDirectiveModule } from './../../shared/directives/rtl-directive/rtl-directive.module';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { TranslatorModule } from './../../shared/components/translator/translator.module';
import { VocabularyResolver } from './../../core/resolvers/vocabulary.resolver';
import { VocabularyFacade } from './vocabulary.facade';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbCheckboxModule, NbFormFieldModule } from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { MenuModule } from 'src/app/shared/components/menu/menu.module';
import { ModalUiModule } from 'src/app/shared/components/modal-ui/modal-ui.module';
import { SearchModule } from 'src/app/shared/components/search/search.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { GroupStatisticsModule } from './../../shared/components/group-statistics/group-statistics.module';
import { WordListModule } from './../../shared/components/word-list/word-list.module';
import { AssignWordListComponent } from './assign-word-list/assign-word-list.component';
import { CsvManagerComponent } from './csv-manager/csv-manager.component';
import { GroupsModule } from './groups/groups.module';
import { vocabularyReducer, VOCABULARY_REDUCER_NODE } from '../../store/reducers/vocabulary.reducers';
import { VocabularyComponent } from './vocabulary.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ModalService } from 'src/app/shared/services/modal.service';
import { StatusMessageComponent } from './status-message/status-message.component';
import { ToggleModule } from 'src/app/shared/components/toggle/toggle.module';
import { CsvManagerModule } from './csv-manager/csv-manager.module';
import { GroupListModule } from 'src/app/shared/components/group-list/group-list.module';



const vocabularyRoutes: Routes = [
  {
    path: '', component: VocabularyComponent, resolve: { isDataFetched: VocabularyResolver },
    //  children: [
    //   { path: '', },
    //   { path: 'add-words-to-group', component: AssignWordListComponent }
    // ]
  },

];


@NgModule({
  declarations: [
    VocabularyComponent,
    AssignWordListComponent,
    StatusMessageComponent,

  ],
  imports: [
    CommonModule,

    LoaderModule,
    SearchModule,
    GroupStatisticsModule,
    GroupsModule,
    ModalUiModule,
    WordListModule,
    MenuModule,
    PipesModule,
    GroupListModule,

    NbInputModule,
    NbCheckboxModule,
    NbCardModule,
    NbFormFieldModule,
    NbButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatBottomSheetModule,
    RouterModule.forChild(vocabularyRoutes),
    StoreModule.forFeature(VOCABULARY_REDUCER_NODE, vocabularyReducer),
    EffectsModule.forFeature([]),

    TranslatorModule,
    ToggleModule,
    CsvManagerModule,

    TuiButtonModule,
    TuiSvgModule,

    RtlDirectiveModule

  ],
  providers: [
    VocabularyFacade,
    VocabularyResolver
  ]
})
export class VocabularyModule { }
