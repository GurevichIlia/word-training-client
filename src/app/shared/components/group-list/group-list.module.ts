import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NbSelectModule } from '@nebular/theme';
import { TuiDataListModule, TuiLoaderModule, TuiTextfieldControllerModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';
import { GroupListComponent } from './group-list.component';


@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    NbSelectModule,

    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiTextfieldControllerModule,
    TuiLoaderModule,
    TuiSvgModule
  ],
  exports: [
    GroupListComponent
  ],
  declarations: [GroupListComponent],
  providers: [],
})
export class GroupListModule { }
