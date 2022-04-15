import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToPercent'
})
export class ConvertToPercentPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case 0:
        value = 0;
        break;
      case 1:
        value = 10;
        break;
      case 2:
        value = 25;

        break;
      case 3:
        value = 50;
        break;

      case 4:
        value = 75;

        break;
      case 5:
        value = 100;
        break;


      default:
        break;
    }
    return value;
  }

}
