import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, skip, take, tap, switchMap } from 'rxjs/operators';
import { AppRoutes } from 'src/app/core/routes/routes';
import { LanguageInterface } from 'src/app/modules/languages/types/languages.interfaces';
import { AppStateInterface } from 'src/app/store/reducers';
import { NavigationService } from './../../core/services/navigation.service';
import { NotificationsService } from './../services/notifications.service';
import { currentLanguageSelector } from './../../store/selectors/languages.selectors'
import { getLearningLanguageAction } from 'src/app/store/actions/languages.actions';
@Injectable()
export class SelectLanguageGuard implements CanActivate {

  constructor(
    // private generalFacade: GeneralFacade,
    private store$: Store<AppStateInterface>,
    private navigationService: NavigationService,
    private notification: NotificationsService
  ) {


  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let canActive = false;
    return this.getCurrentLanguage$().pipe(
      map((language: LanguageInterface) => {
        if (language) {
          canActive = true;
        } else {
          this.navigationService.navigateTo(AppRoutes.Languages)
          tap(lang => lang === null ? this.notification.success('Select learning language') : null),

            canActive = false;
        }
        return canActive;
      })
    );
  }


  getCurrentLanguage$(): Observable<LanguageInterface> {
    return this.store$.pipe(
      select(currentLanguageSelector),

      tap(res => {
        if (!res) {
          this.store$.dispatch(getLearningLanguageAction())
        }
      }),
      filter(lang => lang !== undefined),
      take(1),
    )

  }
}
