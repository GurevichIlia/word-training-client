import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface IModalData {
  title: string,
}

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AskQuestionComponent {
  constructor(
    private dialogRef: MatDialogRef<AskQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IModalData,
    private modalService: ModalService

  ) {

  }

  get title(): string {
    if (this.data) {
      return this.data.title
    }
  }
  get isLoading$(): Observable<boolean> {

    return this.modalService.isLoading$

  }
  get errorMessage$(): Observable<string> {

    return this.modalService.errorMessage$

  }
  get isCloseModal$(): Observable<void> {
    return this.modalService.isCloseModal$.pipe(tap(_ => this.dialogRef.close()))
  }

  save(): void {
    this.modalService.sendAnswer({ action: 'success' })
  }

  cancel(): void {
    this.modalService.sendAnswer({ action: 'cancel' })
  }


  close(answer: boolean) {
    this.dialogRef;

  }


}
