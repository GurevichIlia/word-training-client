import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { getCurrentUserAction } from './modules/authorization/store/actions/auth.actions';
import { CurrentUserInterface } from './shared/interfaces';
import { getLearningLanguageAction } from './store/actions/languages.actions';
import { AppStateInterface } from './store/reducers';
import { globalLoaderSelector } from './store/selectors/general.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'word-training';
  isShowFooterMenu$: Observable<boolean>;
  currentUser$: Observable<CurrentUserInterface>
  subscription$ = new Subject();

  constructor(
    private router: Router,
    private store$: Store<AppStateInterface>
  ) {
    // this.currentUser$ = this.store$.pipe(select(currentUserSelector))
    // this.isShowFooterMenu$ = this.authService.isAuthenticated$();
    this.store$.dispatch(getCurrentUserAction())
    // this.store$.dispatch(getLearningLanguageAction())

  }

  ngOnInit() {
    const beforeinstallprompt$ = fromEvent(window, 'beforeinstallprompt');
    beforeinstallprompt$
      .pipe(
        takeUntil(this.subscription$)
      )
      .subscribe(e => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        // Update UI notify the user they can install the PWA
      });

  }


  ngOnDestroy() {
    this.subscription$.next()
    this.subscription$.complete()
  }
}
