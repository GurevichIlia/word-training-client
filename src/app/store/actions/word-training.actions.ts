import { BackendErrorInterface } from './../../core/models/general.model';
import { createAction, props } from '@ngrx/store';
import { Word, WordGroup } from 'src/app/shared/interfaces';
import { VerbTime } from 'src/app/modules/conjugations/models/conjugations.interface';

export enum WordTrainingActionsType {
  StartTrain = '[Word training] Start training',
  SelectGroup = '[Word training] Select group',
  NextWord = '[Word training] Next word',
  PreviousWord = '[Word training] Previous word',
  StopTraining = '[Word training] Stop training',
  StopTrainingSuccess = '[Word training] Stop training success',
  StopTrainingCancel = '[Word training] Stop training cancel',
  RepeatTraining = '[Word training] Repeat training',
  ChangeGroup = '[Word training] Change group for training',

  AddToFavorite = '[Word training] Add word to favorite',

  SaveTrainingProgress = '[Word training] Save training progress',
  SaveTrainingProgressSuccess = '[Word training] Save training progress success',
  SaveTrainingProgressError = '[Word training] Save training progress error',

  ResetWordTrainingState = '[Word training] Reset word training state',

  ShowVerbsToggle = '[Word training] Show verbs for training toggle'
}
export const selectGroupAction = createAction(WordTrainingActionsType.SelectGroup, props<{ group: WordGroup }>());
export const startTrainAction = createAction(WordTrainingActionsType.StartTrain, props<{ words: Word[], hebrewVerbTime: VerbTime }>());
export const nextWordAction = createAction(WordTrainingActionsType.NextWord, props<{ word: Word, levelKnowledge: number }>());
export const previousWordAction = createAction(WordTrainingActionsType.PreviousWord);
export const stopTrainingAction = createAction(WordTrainingActionsType.StopTraining);
export const stopTrainingSuccessAction = createAction(WordTrainingActionsType.StopTrainingSuccess);
export const stopTrainingCancelAction = createAction(WordTrainingActionsType.StopTrainingCancel);

export const saveTrainingProgressAction = createAction(WordTrainingActionsType.SaveTrainingProgress);
export const saveTrainingProgressSuccessAction = createAction(WordTrainingActionsType.SaveTrainingProgressSuccess,
  props<{ words: Word[], groups: WordGroup[] }>());
export const saveTrainingProgressErrorAction = createAction(WordTrainingActionsType.SaveTrainingProgressError,
  props<{ error: BackendErrorInterface }>());

export const resetWordTrainingStateAction = createAction(WordTrainingActionsType.ResetWordTrainingState);

export const repeatTrainingAction = createAction(WordTrainingActionsType.RepeatTraining);
export const changeGroupAction = createAction(WordTrainingActionsType.ChangeGroup);

export const addWordToFavoriteAction = createAction(WordTrainingActionsType.AddToFavorite, props<{ word: Word }>());

export const showVerbsToggleAction = createAction(WordTrainingActionsType.ShowVerbsToggle);


