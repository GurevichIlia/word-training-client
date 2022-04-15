import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NbInputModule } from '@nebular/theme';
import { SearchComponent } from './search.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbInputModule
  ],
  exports: [SearchComponent],
  declarations: [SearchComponent],
  providers: [],
})
export class SearchModule { }
