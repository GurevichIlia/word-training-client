import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NbInputModule } from '@nebular/theme';
import { GroupListModule } from 'src/app/shared/components/group-list/group-list.module';
import { MenuModule } from 'src/app/shared/components/menu/menu.module';
import { ModalUiModule } from 'src/app/shared/components/modal-ui/modal-ui.module';
import { GroupsComponent } from './groups.component';
import { GroupsApiService } from './services/groups-api.service';


@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    GroupListModule,
    ModalUiModule,
    ReactiveFormsModule,
    NbInputModule,

    MatFormFieldModule
  ],
  exports: [
    GroupsComponent
  ],
  declarations: [
    GroupsComponent
  ],
  providers: [
    GroupsApiService,
  ],
})
export class GroupsModule { }
