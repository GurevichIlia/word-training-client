import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersistanceService } from './../../shared/services/persistance.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private persistanceService: PersistanceService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.url.includes('translate')) {
      const newRequest = req.clone({
        setHeaders: {
          Authorization: this.persistanceService.get('words-token') ? this.persistanceService.get('words-token') : '',
        }
      });
      return next.handle(newRequest);
    }

    return next.handle(req);

  }
}
