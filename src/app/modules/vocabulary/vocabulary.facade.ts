import { CopyToClipboardService } from './../../shared/services/copy-to-clipboard.service';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of, EMPTY } from 'rxjs';
import { filter, map, mergeMap, shareReplay, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { DefaultGroupId, MenuItem, SupportedLanguage, TranslationConfig, TranslationService, WordAction, wordMenuItems } from 'src/app/core';
import { InstallAppService } from 'src/app/core/install-app/install-app.service';
import { InstallHelperFunctionsService } from 'src/app/core/install-app/install-helper-functions.service';
import { GroupStatisticsService } from 'src/app/shared/components/group-statistics/group-statistics.service';
import { Word, WordGroup } from 'src/app/shared/interfaces';
import { AskQuestionComponent } from 'src/app/shared/modals/ask-question/ask-question.component';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import {
  addWordToUserWordsAction,

  deleteUserWordAction,
  deleteUserWordFromGroupAction,
  fetchWordsAction, saveEditedWordAction,
  selectVocabularyGroupAction,
  showVerbsInVocabularyToggleAction
} from 'src/app/store/actions/vocabulary.actions';
import { AppStateInterface } from 'src/app/store/reducers';
import { currentLanguageSelector } from 'src/app/store/selectors/languages.selectors';
import { allWordsSelector, selectedGroupSelector, vocabularyLoaderSelector } from 'src/app/store/selectors/vocabulary.selectors';
import { GeneralWord } from '../general-words/types/general-words.interfaces';
import { WordsService } from './../../core/services/words.service';
import { fetchGroupsAction } from './../../store/actions/vocabulary.actions';
import { groupsSelector, isShowOnlyVerbsInVocabularySelector } from './../../store/selectors/vocabulary.selectors';





@Injectable({ providedIn: 'root' })
export class VocabularyFacade {
  isShowVerbsToggle$: Observable<boolean> = this.store$.pipe(select(currentLanguageSelector), map(lang => lang.name === 'Hebrew'))
  words$ = this.store$.pipe(select(isShowOnlyVerbsInVocabularySelector),
    switchMap(isVerbs => {
      return this.wordsService.verbsFilter(
        this.store$.pipe(select(allWordsSelector)),
        isVerbs
      )
    }),
    switchMap(words =>
      this.selectedGroup$.pipe(
        map(selectedGroup =>
          this.wordsService.filterWordsByGroup(selectedGroup, words))
      )
    )
  )
  constructor(
    private dialogService: NbDialogService,
    private installApp: InstallAppService,
    private installAppHelper: InstallHelperFunctionsService,
    private wordsService: WordsService,
    private groupStatisticsService: GroupStatisticsService,
    private store$: Store<AppStateInterface>,
    private notification: NotificationsService,
    private translation: TranslationService,
    private copyToClipboardService: CopyToClipboardService


  ) { }

  getGroupStatistics(words$: Observable<Word[]>) {
    return this.groupStatisticsService.getGroupStatistics(words$)
  }

  get groups$(): Observable<WordGroup[]> {
    return this.isShowVerbs$.pipe(switchMap(isShowOnlyVerbs => {

      if (isShowOnlyVerbs) {
        return this.store$.pipe(select(groupsSelector), map(groups => groups.filter(group => group.isVerbsGroup || group._id === '1' || group._id === '2')))
      }

      return this.store$.pipe(select(groupsSelector))
    })
    )
  }

  // get words$(): Observable<Word[]> {
  //   // return this.store$.pipe(
  //   //   select(allWordsSelector),
  //   // )
  //   return this.store$.pipe(select(isShowOnlyVerbsInVocabularySelector), switchMap(isVerbs => {

  //     return this.wordsService.verbsFilter(
  //       this.store$.pipe(select(allWordsSelector), tap(w => console.log('WORDS', w))),
  //       isVerbs
  //     )
  //   }))
  // }

  get selectedGroup$(): Observable<WordGroup> {
    return this.store$.pipe(select(selectedGroupSelector))
  }

  get vocabularyLoader$(): Observable<boolean> {
    return this.store$.pipe(select(vocabularyLoaderSelector))

  }

  get wordMenuItems$(): Observable<MenuItem<WordAction>[]> {
    return this.selectedGroup$.pipe(
      filter(group => group !== null),
      map(group => {
        if (group._id === DefaultGroupId.ALL_WORDS || group._id === DefaultGroupId.FAVORITES) {
          return wordMenuItems.filter(item => item.action !== WordAction.DELETE_FROM_GROUP)
        }

        return wordMenuItems
      }))
  }

  get supportedLanguagesForTranslation$(): Observable<SupportedLanguage[]> {
    return this.translation.supportedLanguages$
  }

  fetchWordsAndGroups(): void {
    this.store$.dispatch(fetchWordsAction())
    this.store$.dispatch(fetchGroupsAction())
  }

  selectGroup(group: WordGroup): void {
    this.store$.dispatch(selectVocabularyGroupAction({ group }))
  }


  getUserWordsFiltredByGroup(
    searchValue: string,
  ): Observable<Word[]> {

    return this.words$.pipe(map(words => this.wordsService.filterBySearcValue(searchValue, words)))

  }

  filterBySearcValue(searchValue: string, words: (Word | GeneralWord)[]): Word[] {
    return this.wordsService.filterBySearcValue(searchValue, words);
  }


  addNewWord(wordForm: FormGroup) {
    if (wordForm.valid) {

      const word: Word = wordForm.value

      this.store$.dispatch(addWordToUserWordsAction({ word }))

    } else {
      this.notification.warning('', 'Please fill in required fields');
    }


    // const updatedWord = { ...word, assignedGroups: [ALL_WORDS_GROUP._id, selectedGroupId] };
    // return this.generalFacade.getCurrentLearningLanguage$()
    //   .pipe(
    //     switchMap(language =>
    //       this.apiWords.addWord(updatedWord, language)
    //     ));
  }

  updateWord(wordForm: FormGroup) {

    if (wordForm.valid) {

      const editedWord: Word = wordForm.value

      this.store$.dispatch(saveEditedWordAction({ word: editedWord }))

    } else {
      this.notification.warning('', 'Please fill in required fields');
    }

    // const words = this.generalState.getUserWords().map(existWord => existWord._id === word._id ? { ...existWord, ...word } : existWord);

    // this.generalState.setUserWords(words);
  }

  deleteWordFromGroup(word: Word): void {
    this.store$.dispatch(deleteUserWordFromGroupAction({ word }))
  }

  deleteWord(word: Word): void {
    this.store$.dispatch(deleteUserWordAction({ word }))

  }

  askQuestion(text: string) {
    const answer$ = this.dialogService.open(AskQuestionComponent, { context: { title: text }, hasBackdrop: true });
    return answer$;
  }

  removeWordsAlreadyExistInThisGroup(words$: Observable<Word[]>, groupId: string) {
    if (words$ && groupId) {
      return words$.pipe(
        map(words => words.filter(word => !word.assignedGroups.includes(groupId))),
      )
    } else {
      return of([]);
    }

  }

  showInstallPromotion(e?: Event) {
    this.installAppHelper.showInstallPromotion(e);
  }

  appIsInstalling() {
    return this.installApp.appIsInstalling();
  }

  detectDevice() {
    return this.installAppHelper.detectDevice();
  }

  translateText(config: TranslationConfig): Observable<string[]> {
    return this.translation.getTranslation(config)
      .pipe(
        map(res => res.text),
      )
  }

  get isShowVerbs$(): Observable<boolean> {
    return this.store$.pipe(select(isShowOnlyVerbsInVocabularySelector))
  }

  showVerbsToggle(): void {
    this.store$.dispatch(showVerbsInVocabularyToggleAction())
  }

  public copyToClipboard(source: string): void {
    this.copyToClipboardService.copy(source);
  }

}
