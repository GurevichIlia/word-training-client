import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppRoutes } from 'src/app/core/routes/routes';
import { AppStateInterface } from 'src/app/store/reducers';
import { isLoggedInSelector } from '../../modules/authorization/store/selectors/auth.selectors';
import { NavigationService } from './../../core/services/navigation.service';

enum AuthRoute {
  LOGIN = '/login',
  REGISTER = '/registration'
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private navigation: NavigationService,
    private store$: Store<AppStateInterface>
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //   return this.afAuth.authState.pipe(
    //     take(1),
    //     map(user => {
    //       return !!user;
    //     }),
    //     tap(loggedIn => {
    //       if (!loggedIn) {
    //         console.log('access denied');
    //         this.router.navigate(['/login']);
    //       }
    //     })
    //   );

    // }

    return this.store$.pipe(
      select(isLoggedInSelector),
      filter(isLoggedIn => isLoggedIn !== null),
      map((isLoggedIn: boolean) => {
        const routeToActivate = state.url;
        const isAuthRoute = routeToActivate.includes(AuthRoute.LOGIN || AuthRoute.REGISTER)
        if (isAuthRoute && isLoggedIn) {
          this.navigation.navigateTo(AppRoutes.Vocabulary)
          return false
        } else if (isAuthRoute && !isLoggedIn) {
          return true
        } else if (!isAuthRoute && isLoggedIn) {
          return true
        } else if (!isAuthRoute && !isLoggedIn) {
          this.navigation.navigateTo(AppRoutes.Login);
          return false;
        }
      })
    )
  }
}


