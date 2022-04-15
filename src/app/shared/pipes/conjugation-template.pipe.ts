import { VerbTime } from './../../modules/conjugations/models/conjugations.interface';
import { Pipe, PipeTransform } from '@angular/core';
import { ConjugationTemplate, CONJUGATION_TEMPLATE_MODEL, CONJUGATION_TEMPLATE_PRESENT_TIME_MODEL } from 'src/app/core/models/verbs.model';
import { Conjugation } from 'src/app/modules/conjugations/models/conjugations.interface';

@Pipe({
  name: 'conjugationTemplate'
})
export class ConjugationTemplatePipe implements PipeTransform {

  transform(conjugation: Conjugation, time: VerbTime): ConjugationTemplate[] {

    if (!conjugation) {
      return null
    }

    const templateModel = time === 'present' ? CONJUGATION_TEMPLATE_PRESENT_TIME_MODEL : CONJUGATION_TEMPLATE_MODEL

    const templates = templateModel.map(model => ({ ...model, value: conjugation[model.pronoun] }))

    return templates
  }

}
