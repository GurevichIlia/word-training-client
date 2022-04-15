import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject, throwError } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { GeneralWord } from 'src/app/modules/general-words/types/general-words.interfaces';
import { LanguageInterface } from 'src/app/modules/languages/types/languages.interfaces';
import { WordTraining } from 'src/app/modules/word-training/classes/WordTraining';
import { Word, WordGroup } from 'src/app/shared/interfaces';
import { AskQuestionComponent } from 'src/app/shared/modals/ask-question/ask-question.component';
import { ApiWordsService } from 'src/app/shared/services/api/api-words.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { replaceNekudot } from '../utils/replace-nikudot';
import { IModalData } from './../../shared/modals/ask-question/ask-question.component';
import { NotificationsService } from './../../shared/services/notifications.service';
import { DefaultGroupId } from './../enums/group.enum';
import { AddUserWordResponseInterface, DeleteUserWordResponseInterface, EditUserWordResponseInterface } from './../models/words.interface';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  private updateUsersWordList$ = new Subject<void>();
  constructor(
    private apiWords: ApiWordsService,
    private notification: NotificationsService,
    private modalService: ModalService

  ) { }


  getAllUserWords$(language: LanguageInterface): Observable<Word[]> {
    return this.apiWords.getWordsFromServerForUser(language._id)
      .pipe(
        // map(words => this.convertToArray(words)),
        map(res => res.words),
      );

  }

  // getAllUserWords$(language: LanguageInterface): Observable<Word[]> {
  //   return combineLatest([
  //     this.apiWords.getWordsFromServerForUser(language._id).pipe(map(res => res.words)),
  //     this.apiVerbs.fetchVerbs().pipe(map(res => res.verbs || []))
  //   ]).pipe(
  //     map(([words, verbs]: [Word[], Verb[]]) => {
  //       return words.concat(verbs)
  //     })
  //   )

  // }

  addNewWord(word: Partial<Word>, language: LanguageInterface, selectedGroupId?: string): Observable<AddUserWordResponseInterface> {
    const updatedWord = { ...word, assignedGroups: [DefaultGroupId.ALL_WORDS, selectedGroupId] };

    return this.apiWords.addWord(updatedWord, language)
      .pipe(
        // map(res => this.convertToArray(res.words)),
        map(res => res),
        // map(words => words.reverse()),
        catchError(err => {
          return throwError(err)
        }),
      )
  }

  deleteWord(word: Word): Observable<DeleteUserWordResponseInterface> {
    const data: IModalData = {
      title: `Would you like to delete ${word.word}?`
    }
    const modalRef = this.modalService.openModal(AskQuestionComponent, { data })

    return this.modalService.dataFromModal$
      .pipe(
        switchMap(answer => {
          if (answer.action === 'success') {
            this.modalService.isLoading = true
            return this.apiWords.deleteWordFromServer(word._id)
              .pipe(
                // map(res =>
                //   // this.convertToArray(res.words)
                // ),
                finalize(() => this.modalService.closeModal()),
                map(res => res),

                catchError(err => {
                  this.modalService.errorMessage = err.message
                  return throwError(err)
                }),
              )
          } else {
            this.modalService.closeModal()
            return EMPTY
          }
        })
      )
  }

  editWord(word: Word): Observable<Word[]> {
    return this.apiWords.editWord(word)
      .pipe(
        // map(res =>
        //   // this.convertToArray(res.words)
        // ),
        map(res => res.words),

        catchError(err => {
          return throwError(err)
        }),
      )
  }

  deleteWordFromGroup(word: Word, groupId: string): Observable<EditUserWordResponseInterface> {

    const filtredWord = {
      ...word,
      assignedGroups: word.assignedGroups.filter(existiongGroupId => existiongGroupId.toString() !== groupId.toString())
    }

    const data: IModalData = {
      title: `Would you like to delete ${word.word}?`
    }
    const modalRef = this.modalService.openModal(AskQuestionComponent, { data })

    return this.modalService.dataFromModal$
      .pipe(
        switchMap(answer => {
          if (answer.action === 'success') {
            this.modalService.isLoading = true
            return this.apiWords.editWord(filtredWord)
              .pipe(
                // map(res =>
                //   // this.convertToArray(res.words)
                // ),
                finalize(() => this.modalService.closeModal()),
                map(res => res),

                catchError(err => {
                  this.modalService.errorMessage = err.message
                  return throwError(err)
                }),
              )
          } else {
            this.modalService.closeModal()
            return EMPTY
          }
        })
      )


  }

  private convertToArray<T, K extends keyof T>(obj: T): T[K][] {
    const keys = Object.keys(obj)

    const arr: T[K][] = []

    if (keys.length > 0) {
      keys.forEach(key => arr.push(obj[key]))

    }

    return arr
  }

  filterWordsByGroup(selectedGroup: WordGroup, words: Word[]): Word[] {
    if (!selectedGroup) return
    if (selectedGroup._id === DefaultGroupId.ALL_WORDS) {

      return words;

    } else if (selectedGroup._id === DefaultGroupId.FAVORITES) {

      return this.filterWordsByFavorite(words);

    } else {

      return words.filter(word => word.assignedGroups.includes(selectedGroup._id))

    }


  }

  filterBySearcValue(searchValue: string, words: (Word | GeneralWord)[]) {
    if (searchValue) {

      return words.filter(word =>
        replaceNekudot(word.word?.toLowerCase()).includes(replaceNekudot(searchValue.toLowerCase())) ||
        word.translation?.toLowerCase().includes(searchValue.toLowerCase())
      );

    } else {

      return words;

    }

  }

  private filterWordsByFavorite(allWords: Word[]) {
    return allWords.filter(word => word.isFavorite)
  }

  addNewWordsFromCSV({ file, selectedGroupId }: { file: File, selectedGroupId?: string }) {
    const formData = new FormData();
    formData.append('csvFile', file, 'csvFile');

    // return this.generalState.getCurrentLearningLanguage$()
    //   .pipe(
    //     switchMap(language => {
    const assignedGroups = JSON.stringify([DefaultGroupId.ALL_WORDS, selectedGroupId]);
    return this.apiWords.addWordsFromCSV(formData, assignedGroups).pipe(
      catchError(err => {
        this.notification.error('Something went wrong, file was not uploaded');

        return throwError(err);
      })
    )
    // }),

  }

  shareWordsToGeneralList(words: Word[]) {
    return this.apiWords.addWordsToGeneralList(words)
      .pipe(
        catchError(err => {
          return throwError(err)
        }),
      )
  }

  updateUsersWordList(): void {
    this.updateUsersWordList$.next();
  }

  verbsFilter(words$: Observable<Word[]>, isShowOnlyVerbs: boolean): Observable<Word[]> {
    if (isShowOnlyVerbs) {
      return words$.pipe(map(words => {
        return words?.filter(word => word.isVerb)
      }))
    }

    return words$

  }
}
