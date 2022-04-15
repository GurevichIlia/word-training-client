import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

// const BASE_URL = MyAppConfig.serviceConfig.serviceApiUrl;
// const BASE_PARAM = 'urlAddr'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get<T>(path: string, options = {}): Observable<T> {


    return this.http.get<T>(`${path}`, options)
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }

  post<T>(path: string, body: Object = {}, options = {}): Observable<T> {

    return this.http.post<T>(
      `${path}`,
      body, options
    ).pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${path}`
    ).pipe(catchError(this.formatErrors));
  }
}
