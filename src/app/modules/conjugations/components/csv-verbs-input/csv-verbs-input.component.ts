import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ConjugationsFacade } from '../../conjugations.facade';

@Component({
  selector: 'app-csv-verbs-input',
  templateUrl: './csv-verbs-input.component.html',
  styleUrls: ['./csv-verbs-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CsvVerbsInputComponent {
  readonly csvLoading$: Observable<boolean> = this.conjugationsFacade.isLoading$;
  readonly isResetCsvHandlerState$: Observable<boolean> = this.conjugationsFacade.isResetVerbsInputs$;
  @Output() readonly send = new EventEmitter<File>()
  constructor(
    private conjugationsFacade: ConjugationsFacade
  ) { }

  getConjugationsFromCsv(file: File): void {
    this.send.emit(file)
  }

}
