import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import {
  NbButtonModule, NbCardModule, NbCheckboxModule,
  NbIconModule, NbListModule, NbSelectModule, NbSpinnerModule
} from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { LanguagesComponent } from './languages.component';
import { LanguagesService } from './languages.service';
import { SelectLanguageComponent } from './select-language/select-language.component';


const languageRoutes: Routes = [
  { path: '', component: LanguagesComponent }
];


@NgModule({
  declarations: [
    LanguagesComponent,
    SelectLanguageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbSelectModule,
    NbSpinnerModule,
    NbListModule,
    NbIconModule,
    NbCheckboxModule,
    MatBadgeModule,
    MatTabsModule,
    NbButtonModule,

    LoaderModule,

    RouterModule.forChild(languageRoutes),
    // EffectsModule.forFeature([
    //   AddLanguageToUserEffects,
    //   AllLanguagesEffects,
    //   UserLanguagesEffects,
    //   DeleteUserLanguageEffects,
    // ])
  ],
  providers: [LanguagesService]
})
export class LanguagesModule { }
