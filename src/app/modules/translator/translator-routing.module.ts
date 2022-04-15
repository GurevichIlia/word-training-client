import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslatorContainer } from './translator.container';

const routes: Routes = [
  { path: '', component: TranslatorContainer }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslatorRoutingModule { }
