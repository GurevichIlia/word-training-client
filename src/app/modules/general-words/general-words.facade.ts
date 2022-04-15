import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { addWordToUserWordsAction } from 'src/app/store/actions/vocabulary.actions';
import { AppStateInterface } from 'src/app/store/reducers';
import { generalWordsSelector } from 'src/app/store/selectors/general-words.selector';
import { deleteGeneralWordAction, fetchGeneralWordsAction } from './../../store/actions/general-words.actions';
import { isLoadingSelector } from './../../store/selectors/general-words.selector';
import { currentUserSelector } from './../authorization/store/selectors/auth.selectors';
import { GeneralWord } from './types/general-words.interfaces';



@Injectable({
  providedIn: 'root'
})

export class GeneralWordsFacade {
  constructor(
    private store$: Store<AppStateInterface>
  ) {

  }


  get generalWords$(): Observable<GeneralWord[]> {
    return this.store$.pipe(select(generalWordsSelector), filter(words => words !== null))

  }

  fetchGeneralWords() {
    this.store$.dispatch(fetchGeneralWordsAction());

  }

  get userId$(): Observable<string> {
    return this.store$.pipe(select(currentUserSelector), map(user => user._id))
  }

  get isLoading$(): Observable<boolean> {
    return this.store$.pipe(select(isLoadingSelector))
  }

  addWordToMyWords(word: GeneralWord) {
    this.store$.dispatch(addWordToUserWordsAction({ word }))

  }

  deleteWordFromGeneralList(word: GeneralWord) {
    this.store$.dispatch(deleteGeneralWordAction({ word }))
  }

}
