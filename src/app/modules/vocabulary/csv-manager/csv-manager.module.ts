import { MatExpansionModule } from '@angular/material/expansion';
import { LoaderModule } from './../../../shared/components/loader/loader.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CsvManagerComponent } from './csv-manager.component';

@NgModule({
  imports: [
    CommonModule,
    LoaderModule,
    MatExpansionModule
  ],
  exports: [
    CsvManagerComponent
  ],
  declarations: [
    CsvManagerComponent
  ],
  providers: [],
})
export class CsvManagerModule { }
