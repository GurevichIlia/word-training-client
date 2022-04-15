import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class WordTrainingService {
  animationState$ = new BehaviorSubject('');
  constructor(
  ) {
  }

  startAnimation(stateAnimate) {

    if (!this.animationState$.getValue()) {
      this.animationState$.next(stateAnimate)
    }
  }

  resetAnimationState() {
    this.animationState$.next('')

  }

  getAnimationState() {
    return this.animationState$.asObservable();
  }

}
