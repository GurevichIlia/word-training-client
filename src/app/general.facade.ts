import { Injectable } from '@angular/core';
import { NavigationService } from './core/services/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralFacade {
  constructor(
    private navigationService: NavigationService,
  ) {
  }



  getLocation$() {
    // return this.generalState.getLocation$();
    return this.navigationService.getCurrentLocation$();
  }




}
