import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ConjugationTemplate, CONJUGATION_TEMPLATE_MODEL, CONJUGATION_TEMPLATE_PRESENT_TIME_MODEL } from 'src/app/core/models/verbs.model';
import { VerbTime } from 'src/app/modules/conjugations/models/conjugations.interface';
import { Verb } from 'src/app/shared/interfaces';



@Component({
  selector: 'app-verb-card-body',
  templateUrl: './verb-card-body.component.html',
  styleUrls: ['./verb-card-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerbCardBodyComponent implements OnChanges {

  verbTableModel: ConjugationTemplate[] = []
  _verb: Verb
  showText = false

  @Input() set verb(verb: Verb) {
    this.showText = false
    this._verb = verb
  }

  @Input() time: VerbTime

  ngOnChanges(): void {
    const verb = this._verb;
    if (verb && this.time) {
      const conjugationTemplateModel = this.time === 'present' ? CONJUGATION_TEMPLATE_PRESENT_TIME_MODEL : CONJUGATION_TEMPLATE_MODEL
      this.verbTableModel = conjugationTemplateModel.map(model => ({ ...model, value: verb.conjugations[this.time][model.pronoun] }))
    }

  }
  masterShowToggle(): void {
    this.showText = !this.showText
  }

  get conjugation() {
    if (!this.time || !this._verb) {
      return
    }

    return this._verb.conjugations[this.time]
  }
}
