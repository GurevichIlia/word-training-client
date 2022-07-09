import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuItem, SupportedLanguage, TranslationConfig, TranslationService, WordAction } from 'src/app/core';
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
import { selectedGroupSelector, selectWordMenu, selectWordsForVocabulary, vocabularyLoaderSelector } from 'src/app/store/selectors/vocabulary.selectors';
import { GeneralWord } from '../general-words/types/general-words.interfaces';
import { WordsService } from './../../core/services/words.service';
import { CopyToClipboardService } from './../../shared/services/copy-to-clipboard.service';
import { fetchGroupsAction } from './../../store/actions/vocabulary.actions';
import { selectGroupsForVocabulary, isShowOnlyVerbsInVocabularySelector } from './../../store/selectors/vocabulary.selectors';





@Injectable({ providedIn: 'root' })
export class VocabularyFacade {
  isShowVerbsToggle$: Observable<boolean> = this.store$.pipe(select(currentLanguageSelector), map(lang => lang.name === 'Hebrew'))

  public readonly words$ = this.store$.select(selectWordsForVocabulary)

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

  public readonly groups$: Observable<WordGroup[]> = this.store$.pipe(select(selectGroupsForVocabulary));

  public readonly selectedGroup$: Observable<WordGroup> = this.store$.pipe(select(selectedGroupSelector))

  public readonly vocabularyLoader$: Observable<boolean> = this.store$.pipe(select(vocabularyLoaderSelector))

  public readonly wordMenuItems$: Observable<MenuItem<WordAction>[]> = this.store$.select(selectWordMenu)

  public readonly isShowVerbs$: Observable<boolean> = this.store$.pipe(select(isShowOnlyVerbsInVocabularySelector))


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


  // getUserWordsFiltredByGroup(
  //   searchValue: string,
  // ): Observable<Word[]> {

  //   return this.words$.pipe(map(words => this.wordsService.filterBySearcValue(searchValue, words)))

  // }

  public filterBySearchValue(searchValue: string, words: (Word | GeneralWord)[]): Word[] {
    return this.wordsService.filterBySearcValue(searchValue, words);
  }


  addNewWord(wordForm: UntypedFormGroup) {
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

  updateWord(wordForm: UntypedFormGroup) {

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

  showVerbsToggle(): void {
    this.store$.dispatch(showVerbsInVocabularyToggleAction())
  }

  public copyToClipboard(source: string): void {
    this.copyToClipboardService.copy(source);
  }

}
