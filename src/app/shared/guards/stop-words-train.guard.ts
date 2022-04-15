import { NavigationService } from 'src/app/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrainComponent } from 'src/app/modules/word-training/train/train.component';
import { AppStateInterface } from 'src/app/store/reducers';
import { isTrainStartedSelector } from './../../store/selectors/word-training.selector';

@Injectable({
  providedIn: 'root'
})
export class StopWordsTrainGuard implements CanDeactivate<TrainComponent> {
  constructor(
    private store$: Store<AppStateInterface>,
    private navigationService: NavigationService

  ) { }

  canDeactivate(
    component: TrainComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?:
      RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {


    return this.store$.pipe(select(isTrainStartedSelector), map(isStarted => {
      currentRoute
      nextState
      if (isStarted) {
        if (confirm('Do you want to stop training?')) {
          // this.navigationService.navigateTo(nextState.url)
          return true;
        }

        return false;
      }

      return true
    }))


  }


}
