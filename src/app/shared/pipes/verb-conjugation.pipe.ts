import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verbConjugation'
})
export class VerbConjugationPipe implements PipeTransform {

  transform(verb, time, pronoun): any {
    return verb.conjugations[time][pronoun];
  }

}
