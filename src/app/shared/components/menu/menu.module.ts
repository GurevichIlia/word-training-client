import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { NgModule } from '@angular/core';

import { MenuComponent } from './menu.component';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
  ],
  exports: [
    MenuComponent
  ],
  declarations: [MenuComponent],
  providers: [],
})
export class MenuModule { }
