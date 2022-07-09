import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbFormFieldModule, NbInputModule } from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiToggleModule } from '@taiga-ui/kit';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { MenuModule } from 'src/app/shared/components/menu/menu.module';
import { ModalUiModule } from 'src/app/shared/components/modal-ui/modal-ui.module';
import { SearchModule } from 'src/app/shared/components/search/search.module';
import { ToggleModule } from 'src/app/shared/components/toggle/toggle.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { vocabularyReducer, VOCABULARY_REDUCER_NODE } from '../../store/reducers/vocabulary.reducers';
import { VocabularyResolver } from './../../core/resolvers/vocabulary.resolver';
import { GroupStatisticsModule } from './../../shared/components/group-statistics/group-statistics.module';
import { TranslatorModule } from './../../shared/components/translator/translator.module';
import { WordListModule } from './../../shared/components/word-list/word-list.module';
import { RtlDirectiveModule } from './../../shared/directives/rtl-directive/rtl-directive.module';
import { AssignWordListComponent } from './assign-word-list/assign-word-list.component';
import { CsvManagerModule } from './csv-manager/csv-manager.module';
import { GroupsModule } from './groups/groups.module';
import { StatusMessageComponent } from './status-message/status-message.component';
import { VocabularyComponent } from './vocabulary.component';
import { VocabularyFacade } from './vocabulary.facade';



const vocabularyRoutes: Routes = [
  {
    path: '', component: VocabularyComponent, resolve: { isDataFetched: VocabularyResolver },
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
    GroupsModule,

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
    TuiToggleModule,

    RtlDirectiveModule

  ],
  providers: [
    VocabularyFacade,
    VocabularyResolver
  ]
})
export class VocabularyModule { }
