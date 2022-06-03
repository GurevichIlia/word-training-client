import { Component, OnDestroy, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, mapTo, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Action, MenuItem } from 'src/app/core';
import { Languages } from 'src/app/core/enums/languages.enum';
import { GroupStatistics } from 'src/app/shared/components/group-statistics/group-statistics.component';
import { Word } from 'src/app/shared/interfaces';
import {
  addWordsFromCsvAction,
  deleteUserWordAction,


  setWordAsFavoriteAction
} from 'src/app/store/actions/vocabulary.actions';
import { errorSelector } from 'src/app/store/selectors/general.selector';
import { currentLanguageSelector } from 'src/app/store/selectors/languages.selectors';
import { csvLoaderSelector, isCloseCsvHandlerSelector, isCloseModalSelector, isResetCsvHandlerSelector, modalLoaderSelector } from 'src/app/store/selectors/vocabulary.selectors';
import { WordAction } from '../../core/enums/word.enum';
import { BackendErrorInterface } from './../../core/models/general.model';
import { SupportedLanguage } from './../../core/services/translation.service';
import { TranslatorComponent } from './../../shared/components/translator/translator.component';
import { WordModalComponent } from './../../shared/components/word-modal/word-modal.component';
import { WordGroup } from './../../shared/interfaces';
import { shareWordToGeneralWordsAction } from './../../store/actions/vocabulary.actions';
import { AppStateInterface } from './../../store/reducers';
import { isOpenWordsToAssignSelector } from './../../store/selectors/vocabulary.selectors';
import { AssignWordListComponent } from './assign-word-list/assign-word-list.component';
import { VocabularyFacade } from './vocabulary.facade';




@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss']
})
export class VocabularyComponent implements OnInit, OnDestroy {
  @ViewChild('modalUiWrapper') wordModalRef: TemplateRef<any>;
  @ViewChild('wordFormTemplate') wordModalTemplate: TemplateRef<any>;

  public readonly wordForm = this.fb.group({
    word: ['', Validators.required],
    translation: ['', Validators.required],
    isVerb: [false],
    _id: [''],
    isFavorite: [false]
  });

  selectedGroup$: Observable<WordGroup> = this.vocabularyFacade.selectedGroup$.pipe(tap(e => console.log('Selected', e)));
  groups$: Observable<WordGroup[]> = this.vocabularyFacade.groups$.pipe(tap(e => console.log('GROUPS', e)));
  searchValueControl = new UntypedFormControl('');
  subscription$ = new Subject();
  titleForModal: string;
  modalRef: MatDialogRef<any>;



  selectedWordsForAssignGroups$ = new BehaviorSubject<string[]>([]);


  isShowUploader = false;

  // public readonly userWordsFiltredByGroupAndSearchValue$: Observable<Word[]> = this.searchValueControl.valueChanges.pipe(
  //   startWith(''),
  //   debounceTime(300),
  //   distinctUntilChanged(),
  //   switchMap((value: string) => this.vocabularyFacade.getUserWordsFiltredByGroup(value)),
  // )

  public readonly userWordsFilteredByGroupAndSearchValue$: Observable<Word[]> = this.vocabularyFacade.words$

  public readonly groupStatistics$: Observable<GroupStatistics> = this.vocabularyFacade.getGroupStatistics(this.userWordsFilteredByGroupAndSearchValue$);


  public readonly wordMenuItems$: Observable<MenuItem<WordAction>[]> = this.vocabularyFacade.wordMenuItems$;;
  public readonly vocabularyLoader$: Observable<boolean> = this.vocabularyFacade.vocabularyLoader$
  public readonly errorMessage$: Observable<string | BackendErrorInterface> = this.store$.pipe(select(errorSelector))
  public readonly modalLoader$: Observable<boolean> = this.store$.pipe(select(modalLoaderSelector))
  private modalContext: TemplateRef<any>
  public readonly supportedLanguagesForTranslation$: Observable<SupportedLanguage[]> = this.vocabularyFacade.supportedLanguagesForTranslation$
  public readonly isShowOnlyVerbs$: Observable<boolean> = this.vocabularyFacade.isShowVerbs$
  public readonly isShowVerbsToggle$: Observable<boolean> = this.vocabularyFacade.isShowVerbsToggle$
  public readonly csvLoading$ = this.store$.pipe(select(csvLoaderSelector));
  public readonly isResetCsvHandlerState$ = this.store$.pipe(select(isResetCsvHandlerSelector))

  public readonly showRtl$: Observable<boolean> = this.store$.select(currentLanguageSelector).pipe(
    filter(language => language?.name === Languages.Hebrew),
    mapTo(true)
  )

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private vocabularyFacade: VocabularyFacade,
    // private dialog: MatDialog,
    private store$: Store<AppStateInterface>,
    private _bottomSheet: MatBottomSheet,
    private dialog: MatDialog

  ) { }

  ngOnInit() {
    this.initializeListeners()
    this.showInstallAppSuggestion();
    this.detectDevice();
  }

  fetchData() {
    this.vocabularyFacade.fetchWordsAndGroups();
  }

  get wordControl(): UntypedFormControl {
    return this.wordForm.get('word') as UntypedFormControl;
  }

  get translationControl(): UntypedFormControl {
    return this.wordForm.get('translation') as UntypedFormControl;
  }

  initializeListeners() {
    this.store$.pipe(
      select(isCloseModalSelector),
      tap(isCloseModal => isCloseModal ? this.closeWordModal() : null),
      takeUntil(this.subscription$))
      .subscribe()

    this.store$.pipe(
      select(isOpenWordsToAssignSelector),
      tap(isOpen => isOpen ? this.openAssignWordsList() : null),
      takeUntil(this.subscription$))
      .subscribe()

    this.store$.pipe(
      select(isCloseCsvHandlerSelector),
      tap(isClose => isClose ? this.isShowUploader = false : null),
      takeUntil(this.subscription$))
      .subscribe()
  }


  toTrainWords() {
    this.router.navigate(['word-training']);
  }

  addNewWord() {
    this.vocabularyFacade.addNewWord(this.wordForm)
  }

  updateWord() {
    this.vocabularyFacade.updateWord(this.wordForm)
  }

  openAssignWordsList() {
    this._bottomSheet.open(AssignWordListComponent, { panelClass: ['p-0', 'mat-bottom-sheet'], disableClose: true });
  }

  openTranslation() {
    this._bottomSheet.open(TranslatorComponent, { panelClass: ['p-0', 'mat-bottom-sheet'], disableClose: true });
  }

  openEditModal(word: Word) {
    this.wordForm.patchValue({
      word: word.word,
      translation: word.translation,
      isVerb: word.isVerb,
      _id: word._id,
      isFavorite: word.isFavorite
    });
    this.openModal('Edit word', this.wordModalRef);
  }


  setAsFavorite(word: Word) {
    if (word) {
      this.store$.dispatch(setWordAsFavoriteAction({ word }))
    }

  }

  getActionFromChildren(event: Action<Word>) {
    switch (event.action) {
      case WordAction.SHARE_FOR_ALL: this.shareWordsForAll([event.payload]);
        break
      case WordAction.TO_FAVORITE: this.setAsFavorite(event.payload);
        break
      case WordAction.DELETE_WORD: this.vocabularyFacade.deleteWord(event.payload);
        break;
      case WordAction.DELETE_FROM_GROUP: this.vocabularyFacade.deleteWordFromGroup(event.payload);
        break;
      case WordAction.EDIT_WORD: this.openEditModal(event.payload);
        break;
      case WordAction.TRANSLATE_WORD: this.openGoogleTranslator(event.payload.word)
        break;
      default:
        break;
    }
  }

  private openGoogleTranslator(text: string, language?: string): void {
    window.open(`https://translate.google.com/?text=${text}`)
  }


  deleteWord() {
    const word: Word = this.wordForm.value

    this.store$.dispatch(deleteUserWordAction({ word }))
  }

  openModal(title: string, template: TemplateRef<any> | Type<any>, item?: string) {
    this.titleForModal = title;
    this.modalRef = this.dialog.open(template, { disableClose: true });
  }

  closeWordModal() {
    if (this.modalRef) {
      this.modalRef.close();
      this.modalContext = null
      this.wordForm.reset();
    }
  }

  shareWordsForAll(words: Word[]) {
    this.store$.dispatch(shareWordToGeneralWordsAction({ words }))

  }

  showInstallAppSuggestion() {
    const beforeinstallprompt$ = fromEvent(window, 'beforeinstallprompt');

    beforeinstallprompt$.pipe(
        delay(4000),
        takeUntil(this.subscription$)
      )
      .subscribe(e => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        // Update UI notify the user they can install the PWA
        if (this.vocabularyFacade.appIsInstalling()) {
          return;
        }

        this.vocabularyFacade.showInstallPromotion(e);
      });
  }

  public copyToClipboard(source: string): void {
    this.vocabularyFacade.copyToClipboard(source)
  }

  detectDevice() {
    this.vocabularyFacade.detectDevice();
  }

  showUploader() {
    this.isShowUploader = !this.isShowUploader;
  }

  addWordsFromCsv(file: File): void {
    this.store$.dispatch(addWordsFromCsvAction({ file }))
  }

  unsubscribe() {
    this.subscription$.next();
    this.subscription$.complete();
  }

  onShowOnlyVerbs(): void {
    this.vocabularyFacade.showVerbsToggle()
  }

  onSelectGroup(group: WordGroup) {
    console.log('selection ', group)
    this.vocabularyFacade.selectGroup(group)
    // this.store$.dispatch(setSelectedGroupAction({ group }))
    // this.vocabularyService.setSelectedGroup(group);
  }

  ngOnDestroy(): void {
    this.unsubscribe();
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.

  }
}
