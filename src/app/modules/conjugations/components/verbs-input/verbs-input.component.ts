import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConjugationsFacade } from '../../conjugations.facade';

@Component({
  selector: 'app-verbs-input',
  templateUrl: './verbs-input.component.html',
  styleUrls: ['./verbs-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerbsInputComponent {
  verbsInput = new UntypedFormControl('');
  isLoading$: Observable<boolean> = this.conjugationsFacade.isLoading$

  @Output()
  send = new EventEmitter<string>()

  constructor(
    private conjugationsFacade: ConjugationsFacade
  ) { }

  onSendVerbs(): void {

    if (this.verbsInput.value) {
      this.send.emit(this.verbsInput.value)
    }

  }

}
