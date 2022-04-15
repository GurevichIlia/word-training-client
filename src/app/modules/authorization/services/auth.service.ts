import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { LanguageInterface } from './../../languages/types/languages.interfaces';
import { ApiService } from './../../../core/services/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUserInterface } from 'src/app/shared/interfaces';
import { BASE_URL } from 'src/app/shared/services/api/api-languages.service';
import { LoginRequestInterface, RegisterRequestInterface } from 'src/app/core/models/auth.model';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/store/reducers';
import { getCurrentUserAction } from '../store/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: ApiService,
    private persistanceService: PersistanceService

  ) {

  }

  get lastEmail(): string {
    return this.persistanceService.get('word-training-email') || ''
  }

  registration(newUser: RegisterRequestInterface): Observable<CurrentUserInterface> {
    newUser.email = newUser.email.toLowerCase();
    return this.http.post<CurrentUserInterface>(`${BASE_URL}/api/auth/registration`, newUser);
  }

  login(loginData: LoginRequestInterface): Observable<{ token: string, message: string, currentLanguage: LanguageInterface }> {
    loginData.email = loginData.email.toLowerCase();
    return this.http.post<{ token: string, message: string, currentLanguage: LanguageInterface }>(`${BASE_URL}/api/auth/login`, loginData);
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    return this.http.get<CurrentUserInterface>(`${BASE_URL}/api/auth/getCurrentUser`);
  }

  isPasswordsMatch(password: string, confirmPassword: string) {
    return password === confirmPassword;
  }


}
