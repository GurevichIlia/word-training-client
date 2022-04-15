import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbAccordionModule, NbActionsModule, NbButtonModule, NbCardModule,
  NbCheckboxModule, NbContextMenuModule, NbIconModule, NbInputModule,
  NbLayoutModule, NbListModule, NbMenuModule,
  NbProgressBarModule, NbSelectModule, NbSpinnerModule,
  NbThemeModule, NbUserModule
} from '@nebular/theme';
import { TuiButtonModule, TuiNotificationModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiFieldErrorModule, TuiInputModule } from '@taiga-ui/kit';
import { ModalUiModule } from 'src/app/shared/components/modal-ui/modal-ui.module';
import { AskQuestionComponent } from './modals/ask-question/ask-question.component';









@NgModule({
  declarations: [
    AskQuestionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NbLayoutModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbEvaIconsModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbActionsModule,
    NbCheckboxModule,
    NbSpinnerModule,
    NbContextMenuModule,
    NbUserModule,
    MatCardModule,
    MatMenuModule,
    MatSelectModule,
    NbAccordionModule,
    NbProgressBarModule,
    MatSnackBarModule,
    MatTabsModule,
    MatBadgeModule,
    MatDialogModule,
    MatExpansionModule,
    ModalUiModule,

    TuiFieldErrorModule,
    TuiInputModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NbThemeModule,
    NbLayoutModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbEvaIconsModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbActionsModule,
    NbCheckboxModule,
    NbSpinnerModule,
    NbContextMenuModule,
    NbUserModule,
    NbMenuModule,
    NbAccordionModule,

    NbProgressBarModule,


    MatSnackBarModule,
    MatTabsModule,
    MatBadgeModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule,
    MatSelectModule,
    MatExpansionModule,

    TuiFieldErrorModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiNotificationModule,
    TuiButtonModule
  ],
  entryComponents: [AskQuestionComponent]
})
export class SharedModule { }
