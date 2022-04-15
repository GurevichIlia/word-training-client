import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-csv-manager',
  templateUrl: './csv-manager.component.html',
  styleUrls: ['./csv-manager.component.scss'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class CsvManagerComponent implements OnInit {
  @ViewChild('instruction') insctructionModal: TemplateRef<any>;
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  _expanded: boolean;
  @Input() set expanded(isExpanded: boolean) {
    this._expanded = isExpanded
    if (isExpanded === false) {
      this.resetState();
    }
  };

  @Input()
  get isResetCsvState(): boolean {
    return this._isResetCsvState
  };
  set isResetCsvState(isResetCsvState: boolean) {

    if (isResetCsvState) {
      this.resetState()
    }

  }

  @Input()
  get isLoading(): boolean {
    return this._isLoading
  }
  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading
  }

  file = new EventEmitter<File>();
  // isLoading$: Observable<boolean>;
  private _isResetCsvState: boolean
  private _isLoading: boolean
  // isCloseCsvHandler$: Observable<boolean>
  // isResetCsvHandlerState$: Observable<boolean>
  // words$: Observable<Word[]>;
  selectedFile: File;

  @Output()
  upload = new EventEmitter<File>();

  constructor(
    private dialog: NbDialogService,
    // private store$: Store<AppStateInterface>
  ) { }

  ngOnInit() {
    // this.isLoading$ = this.store$.pipe(select(csvLoaderSelector));

    // this.isCloseCsvHandler$ = this.store$.pipe(
    //   select(isCloseCsvHandlerSelector),
    // )

    // this.isResetCsvHandlerState$ = this.store$.pipe(
    //   select(isResetCsvHandlerSelector),
    //   tap((isReset: boolean) => isReset ? this.resetState() : null)
    // )
  }

  onUpload(file: File) {
    this.upload.emit(file)
  }

  showFile(file: File) {
    if (!file) return
    this.selectedFile = file;
  }

  showInstruction() {
    this.dialog.open(this.insctructionModal)
  }

  resetState() {
    this.selectedFile = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';

    }
  }
}
