import { AppStateInterface } from './../../store/reducers';
import { Store, select } from '@ngrx/store';
import { InjectionToken, Provider } from '@angular/core';
import { LanguageInterface } from 'src/app/modules/languages/types/languages.interfaces';
import { currentLanguageSelector } from 'src/app/store/selectors/languages.selectors';
import { Observable } from 'rxjs';

export const LEARNING_LANGUAGE: InjectionToken<Observable<LanguageInterface>> = new InjectionToken<Observable<LanguageInterface>>('current learning language token')

export const LEARNING_LANGUAGE_PROVIDER: Provider = {
  provide: LEARNING_LANGUAGE,
  deps: [Store],
  useFactory: (store$: Store<AppStateInterface>) => store$.pipe(select(currentLanguageSelector))
}
