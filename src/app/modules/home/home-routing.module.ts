import { SelectLanguageGuard } from 'src/app/shared/guards/select-language-guard.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: '/vocabulary' },
      {
        // tslint:disable-next-line: max-line-length
        path: 'word-training', loadChildren: () => import('./../../modules/word-training/word-training.module').then(m => m.WordTrainingModule),
        canActivate: [SelectLanguageGuard]
      },
      {
        path: 'vocabulary', loadChildren: () => import('./../../modules/vocabulary/vocabulary.module').then(m => m.VocabularyModule),
        canActivate: [SelectLanguageGuard]
      },
      {
        path: 'general-words', loadChildren: () => import('../general-words/general-words.module').then(m => m.GeneralWordsModule),
        canActivate: [SelectLanguageGuard]
      },
      {
        path: 'settings', loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule),
      },
      {
        path: 'conjugations', loadChildren: () => import('../conjugations/conjugations.module').then(m => m.ConjugationsModule),
      },
      {
        path: 'translator', loadChildren: () => import('../translator/translator.module').then(m => m.TranslatorModule),
      },
      { path: '**', redirectTo: '/vocabulary' },

    ],


  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
