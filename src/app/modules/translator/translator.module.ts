import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslatorRoutingModule } from './translator-routing.module';
import { TranslatorContainer } from './translator.container';
import { TranslatorModule as TranslatorEditorModule } from 'src/app/shared/components/translator/translator.module';


@NgModule({
  declarations: [
    TranslatorContainer
  ],
  imports: [
    CommonModule,
    TranslatorRoutingModule,
    TranslatorEditorModule
  ]
})
export class TranslatorModule { }
