import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GroupListComponent } from './group-list.component';
import { NbSelectModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    NbSelectModule
  ],
  exports: [
    GroupListComponent
  ],
  declarations: [GroupListComponent],
  providers: [],
})
export class GroupListModule { }
