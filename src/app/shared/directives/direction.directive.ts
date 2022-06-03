import { Directive } from '@angular/core';

export interface DirectionConfig {
  styles?: { [key: string]: string }
}

@Directive({
  selector: '[appDirection]'
})
export class DirectionDirective {



  constructor() { }

}
