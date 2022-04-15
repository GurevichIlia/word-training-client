import { LanguageInterface, SetLearningLanguageResponseInterface } from 'src/app/modules/languages/types/languages.interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export let BASE_URL;


BASE_URL = '';



@Injectable({
  providedIn: 'root'
})
export class ApiLanguagesService {

  constructor(private http: HttpClient) { }

  getAllLanguages(): Observable<LanguageInterface[]> {
    return this.http.get<LanguageInterface[]>(`${BASE_URL}/api/languages/getAllLanguages`);
  }

  getCurrentLanguage$(): Observable<LanguageInterface> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<{ currentLang: LanguageInterface }>(`${BASE_URL}/api/languages/getCurrentLanguage`)
      .pipe(map(({ currentLang }) => currentLang), shareReplay());
  }

  getUserLanguages(): Observable<LanguageInterface[]> {
    return this.http.get<LanguageInterface[]>(`${BASE_URL}/api/languages/getUserLanguages`);
  }

  addLanguage(language: LanguageInterface): Observable<LanguageInterface> {
    return this.http.post<LanguageInterface>(`${BASE_URL}/api/languages/createLanguage`, language);
  }

  addUserLanguages(languages: LanguageInterface[]): Observable<LanguageInterface[]> {
    return this.http.post<LanguageInterface[]>(`${BASE_URL}/api/languages/addUserLanguages`, { userLanguages: languages });
  }

  editLanguage(language: LanguageInterface): Observable<LanguageInterface> {
    return this.http.patch<LanguageInterface>(`${BASE_URL}/api/languages/editLanguage`, language);
  }

  deleteLanguage(languageId: string): Observable<LanguageInterface[]> {
    return this.http.delete<LanguageInterface[]>(`${BASE_URL}/api/languages/deleteLanguage/${languageId}`);
  }

  setCurrentLanguageOnServer(languageId: string): Observable<LanguageInterface> {
    return this.http.post<SetLearningLanguageResponseInterface>(`${BASE_URL}/api/languages/setCurrentLanguage`,
      { currentLanguage: languageId })
      .pipe(
        map(res => res.currentLanguage)
      );

  }

  deleteUserLanguage(languageId: string) {
    return this.http.post<LanguageInterface>(`${BASE_URL}/api/languages/deleteUserLanguage`, { languageId });

  }
}
