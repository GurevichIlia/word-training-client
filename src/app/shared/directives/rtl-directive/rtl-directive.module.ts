import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RtlDirectionDirective } from './rtl-directive.directive';



@NgModule({
  declarations: [
    RtlDirectionDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [RtlDirectionDirective]
})
export class RtlDirectiveModule { }
