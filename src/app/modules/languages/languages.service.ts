import { Languages } from './../../core/enums/languages.enum';
import { ApiService } from './../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AddLanguageToUserLanguagesResponseInterface,
  DeleteUserLanguageResponseInterface,
  LanguageInterface,
  SetCurrentLanguageResponseInterface
} from './types/languages.interfaces';


@Injectable(
  { providedIn: 'root' }
)
export class LanguagesService {
  // shareReplay(1));
  constructor(
    private http: ApiService,
  ) { }

  getAllLanguages(): Observable<LanguageInterface[]> {
    return this.http.get<LanguageInterface[]>(`/api/languages/getAllLanguages`)
  }



  getUserLanguages(): Observable<LanguageInterface[]> {
    return this.http.get<LanguageInterface[]>(`/api/languages/getUserLanguages`);
  }

  // addLanguage(language: Language): Observable<Language> {
  //   return this.http.post<Language>(`/api/languages/createLanguage`, language);
  // }

  addUserLanguages(languages: LanguageInterface[]): Observable<AddLanguageToUserLanguagesResponseInterface> {
    return this.http.post<AddLanguageToUserLanguagesResponseInterface>(`/api/languages/addUserLanguages`, { userLanguages: languages })
      .pipe(map(res => res));
  }

  // editLanguage(language: Language): Observable<Language> {
  //   return this.http.patch<Language>(`/api/languages/editLanguage`, language);
  // }

  // deleteLanguage(languageId: string): Observable<LanguageInterface[]> {
  //   return this.http.delete<LanguageInterface[]>(`/api/languages/deleteLanguage/${languageId}`);
  // }

  setCurrentLanguageOnServer(languageId: string) {
    return this.http.post<SetCurrentLanguageResponseInterface>(`/api/languages/setCurrentLanguage`, { currentLanguage: languageId });

  }

  deleteUserLanguage(languageId: string): Observable<DeleteUserLanguageResponseInterface> {
    if (confirm('Would you like to delete this langauge?')) {

      if (!languageId) return EMPTY;

      return this.http.post<DeleteUserLanguageResponseInterface>(`/api/languages/deleteUserLanguage`, { languageId })
        .pipe(map(res => res));

      // return this.getCurrentLearningLanguage$()
      //   .pipe(
      //     switchMap(currentLanguage => {
      //       if (currentLanguage && currentLanguage._id === languageId) {
      //         // this.setCurrentLanguageOnServer(null);
      //         return this.http.post<Language>(`/api/languages/deleteUserLanguage`, { languageId });

      //       }
      //     })
      //   )

    }

    return EMPTY
  }

  // setCurrentLearningLanguage(language: Language) {
  //   this.generalFacade.setCurrentLanguage(language);
  // }

  addToCandidates(candidates: LanguageInterface[], language: LanguageInterface) {

    const alreadyAddedLanguge = candidates.find(existLanguage => existLanguage._id === language._id);

    if (alreadyAddedLanguge) {
      candidates = candidates.filter(existLanguage => existLanguage._id !== language._id)
    } else {
      candidates.push(language);
    }
    return candidates;
  }

  addCountryFlagToLanguage(languages: LanguageInterface[]): LanguageInterface[] {
    const languagesWithFlags = languages.map(language => {
      const lang = { ...language };
      switch (language.name) {
        case Languages.Hebrew:
          lang.flag = '../../assets/icons/Flags/iconfinder_flag-israel_748123.png'
          break;
        case Languages.English:
          lang.flag = '../../assets/icons/Flags/iconfinder_flag-united-kingdom_748024.png'
          break;
        case Languages.Spanish:
          lang.flag = '../../assets/icons/Flags/iconfinder_flag-spain_748120.png'
          break;
        case Languages.German:
          lang.flag = '../../assets/icons/Flags/iconfinder_flag-germany_748067.png'
          break;
        case Languages.Dutch:
          lang.flag = '../../assets/icons/Flags/iconfinder_flag-the-netherlands_748017.png'
          break;
        case Languages.French:
          lang.flag = '../../assets/icons/Flags/iconfinder_flag-france_748130.png'
          break;
        case Languages.Japanese:
          lang.flag = '../../assets/icons/Flags/748116_flag_japan_icon.png'
          break;
      }
      return lang;
    })
    return languagesWithFlags;

  }

  // tslint:disable-next-line: max-line-length
  markLanguageAsAddedToUserLanguages(allLanguages: LanguageInterface[], userLanguages: LanguageInterface[]): LanguageInterface[] {
    const languages = allLanguages.map(lang => ({ ...lang }))


    for (const userLanguage of userLanguages) {

      const matchedLanguageIndex = languages.findIndex(language => userLanguage._id === language._id)
      languages[matchedLanguageIndex].addedToUser = true;

    }

    return languages
  }

}
