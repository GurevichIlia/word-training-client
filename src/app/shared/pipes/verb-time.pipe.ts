import { VerbTime } from './../../modules/conjugations/models/conjugations.interface';
import { Pipe, PipeTransform } from '@angular/core';


const hebrewTime = {
  past: 'עבר',
  future: 'עתיד',
  present: 'הווה'

}

@Pipe({
  name: 'verbTime'
})
export class VerbTimePipe implements PipeTransform {

  transform(time: VerbTime, lang?: string): unknown {
    return hebrewTime[time];
  }

}
