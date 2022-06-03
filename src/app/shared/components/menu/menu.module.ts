import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { NgModule } from '@angular/core';

import { MenuComponent } from './menu.component';
import { TuiHostedDropdownModule, TuiSvgModule, TuiDataListModule } from '@taiga-ui/core';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,

    TuiSvgModule,
    TuiHostedDropdownModule,
    TuiDataListModule
  ],
  exports: [
    MenuComponent
  ],
  declarations: [MenuComponent],
  providers: [],
})
export class MenuModule { }
