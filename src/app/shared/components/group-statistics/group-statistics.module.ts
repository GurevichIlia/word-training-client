import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GroupStatisticsComponent } from './group-statistics.component';
import { PipesModule } from '../../pipes/pipes.module';
import { GroupStatisticsService } from './group-statistics.service';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    PipesModule
  ],
  exports: [GroupStatisticsComponent],
  declarations: [GroupStatisticsComponent],
  providers: [GroupStatisticsService],
})
export class GroupStatisticsModule { }
