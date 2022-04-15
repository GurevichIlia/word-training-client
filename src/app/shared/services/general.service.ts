import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class GeneralService {


  constructor(

  ) {

  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
