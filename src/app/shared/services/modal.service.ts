import { ComponentType } from '@angular/cdk/portal';
import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

export interface IModalAnswer {
  action: 'success' | 'cancel';
  payload?: any
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private _isCloseModal$ = new Subject<void>()
  private _dataFromModal$ = new Subject<IModalAnswer>()
  private _isLoading$ = new BehaviorSubject<boolean>(false)
  private _errorMessage$ = new BehaviorSubject<string>('')
  constructor(private dialog: MatDialog) {

  }

  get isCloseModal$(): Observable<void> {
    return this._isCloseModal$.asObservable()
  }

  get dataFromModal$(): Observable<IModalAnswer> {
    return this._dataFromModal$.asObservable()
  }

  get isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable()
  }

  get errorMessage$(): Observable<string> {
    return this._errorMessage$.asObservable()
  }

  set isLoading(value: boolean) {
    this._isLoading$.next(value)
  }

  set errorMessage(message: string) {
    this._errorMessage$.next(message)
  }

  openModal(componentOrTemplateRef: ComponentType<unknown> | TemplateRef<unknown>, config?: MatDialogConfig) {
    this.dialog.open(componentOrTemplateRef, config)
  }

  closeModal(): void {
    this.clearState()
    this._isCloseModal$.next()
  }

  sendAnswer(answer: IModalAnswer) {
    this.clearState()
    this._dataFromModal$.next(answer)
  }

  private clearState() {
    this.isLoading = false
    this.errorMessage = ''
  }
}
