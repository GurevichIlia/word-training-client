import { createAction, props } from '@ngrx/store';
import { GeneralWord } from 'src/app/modules/general-words/types/general-words.interfaces';
import { Word } from 'src/app/shared/interfaces';

export enum GeneralWordsActionsType {
  FetchGeneralWords = '[Words] Fetch general words',
  FetchGeneralWordsSuccess = '[Words] Fetch general words success',
  FetchGeneralWordsError = '[Words] Fetch general words error',

  DeleteGeneralWord = '[Words] Delete general word',
  DeleteGeneralWordSuccess = '[Words] Delete general word success',
  DeleteGeneralWordError = '[Words] Delete general word error'
}


export const fetchGeneralWordsAction = createAction(GeneralWordsActionsType.FetchGeneralWords);
export const fetchGeneralWordsSuccessAction = createAction(GeneralWordsActionsType.FetchGeneralWordsSuccess,
  props<{ words: GeneralWord[] }>());
export const fetchGeneralWordsErrorAction = createAction(GeneralWordsActionsType.FetchGeneralWordsError, props<{ error: string }>());

export const deleteGeneralWordAction = createAction(GeneralWordsActionsType.DeleteGeneralWord, props<{ word: GeneralWord }>());
export const deleteGeneralWordSuccessAction = createAction(GeneralWordsActionsType.DeleteGeneralWordSuccess,
  props<{ words: GeneralWord[], userWords: Word[] }>());
export const deleteGeneralWordErrorAction = createAction(GeneralWordsActionsType.DeleteGeneralWordError, props<{ error: string }>());
