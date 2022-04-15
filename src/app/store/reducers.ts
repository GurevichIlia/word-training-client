import { ConjugationsEffects } from './effects/conjugations.effects';
import { Type } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { IWordTrainingState } from '../core/models/word-training.interfaces';
import { AuthActionsType } from '../modules/authorization/store/actions/auth.actions';
import { authReducer } from '../modules/authorization/store/reducers/auth.reducers';
import { vocabularyReducer, VocabularyStateInterface } from './reducers/vocabulary.reducers';
import { AuthStateInterface } from './../core/models/auth.model';
import { GeneralWordsEffects } from './effects/general-words.effects';
import { GroupsEffects } from './effects/groups.effects';
import { WordTrainingEffects } from './effects/word-training.effects';
import { WordsEffects } from './effects/words.effects';
import { generalReducer, GeneralStateInterface } from './reducers/general.reducer';
import { wordTrainingReducer } from './reducers/word-training.reducer';
import { languagesReducer } from '../store/reducers/languages.reducers';
import { LanguagesStateInterface } from '../modules/languages/types/languages.interfaces';
import { generalWordsReducer, IGeneralWordsState } from './reducers/general-words.reducer';
import { LanguagesEffects } from './effects/languages.effects';
import { conjugationsReducer, ConjugationsState } from './reducers/conjugations.reducer';





export interface AppStateInterface {
  auth: AuthStateInterface;
  wordTraining: IWordTrainingState;
  generalWords: IGeneralWordsState,
  languages: LanguagesStateInterface,
  vocabulary: VocabularyStateInterface,
  generalState: GeneralStateInterface,
  conjugations: ConjugationsState
}

export const reducers: ActionReducerMap<AppStateInterface> = {
  auth: authReducer,
  languages: languagesReducer,
  generalWords: generalWordsReducer,
  wordTraining: wordTrainingReducer,
  vocabulary: vocabularyReducer,
  generalState: generalReducer,
  conjugations: conjugationsReducer
};

export const metaReducers: MetaReducer<AppStateInterface>[] = !environment.production ? [] : [];


export function clearState(reducer) {
  return (state, action) => {

    if (action.type === AuthActionsType.LOGOUT) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

export const getGeneralStateEffects = (): Type<any>[] => {

  return [
    GroupsEffects,
    WordsEffects,
    LanguagesEffects,
    GeneralWordsEffects,
    WordTrainingEffects,
    ConjugationsEffects
  ]
}
// export function getInititalState() {
//   return {
//     words: uath,
//     auth: reducers.auth
//   }
// }
