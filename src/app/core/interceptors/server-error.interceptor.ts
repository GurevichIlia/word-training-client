import { NavigationService } from './../services/navigation.service';
import { AppStateInterface } from 'src/app/store/reducers';
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpHandler,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { logoutAction } from 'src/app/modules/authorization/store/actions/auth.actions';





@Injectable({
  providedIn: 'root'
})
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(
    private store$: Store<AppStateInterface>
  ) {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log('SERVER ERROR INTERECEPTOR', error);
          this.store$.dispatch(logoutAction())
          return throwError(error);
           // this.authService.logOut();
          // this.modal.open(ModalSessionexpiredComponent, { width: '450px' });
          return throwError(error);
        } else if (error.status === 500) {
          // this.authService.logOut();
          console.log(error);
          return throwError(error);
        } else {
          console.log(error);
          return throwError(error);
        }
      }))

  }
}
