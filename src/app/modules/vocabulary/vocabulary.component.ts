import { Component, OnDestroy, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Action, MenuItem } from 'src/app/core';
import { GroupStatistics } from 'src/app/shared/components/group-statistics/group-statistics.component';
import { Word } from 'src/app/shared/interfaces';
import {
  addWordsFromCsvAction,
  deleteUserWordAction,


  setWordAsFavoriteAction
} from 'src/app/store/actions/vocabulary.actions';
import { errorSelector } from 'src/app/store/selectors/general.selector';
import { csvLoaderSelector, isCloseCsvHandlerSelector, isCloseModalSelector, isResetCsvHandlerSelector, modalLoaderSelector } from 'src/app/store/selectors/vocabulary.selectors';
import { WordAction } from '../../core/enums/word.enum';
import { BackendErrorInterface } from './../../core/models/general.model';
import { SupportedLanguage } from './../../core/services/translation.service';
import { TranslatorComponent } from './../../shared/components/translator/translator.component';
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
  // @ViewChild('deleteWordModal') deleteWordModal: TemplateRef<any>;
  selectedGroup$: Observable<WordGroup>
  wordForm: FormGroup;
  searchValueControl = new FormControl('');
  subscription$ = new Subject();
  titleForModal: string;
  modalRef: MatDialogRef<any>;



  selectedWordsForAssignGroups$ = new BehaviorSubject<string[]>([]);

  groupStatistics$: Observable<GroupStatistics>;
  isShowUploader = false;

  userWords$: Observable<Word[]>;
  userWordsFiltredByGroupAndSearchValue$: Observable<Word[]>;
  userWordsFiltredByGroupAndSearchValue: Word[];


  groups$: Observable<WordGroup[]>;
  wordMenuItems$: Observable<MenuItem<WordAction>[]>;
  vocabularyLoader$: Observable<boolean>
  errorMessage$: Observable<string | BackendErrorInterface>
  modalLoader$: Observable<boolean>
  modalContext: TemplateRef<any>
  supportedLanguagesForTranslation$: Observable<SupportedLanguage[]>
  isShowOnlyVerbs$: Observable<boolean>
  isShowVerbsToggle$: Observable<boolean>
  csvLoading$ = this.store$.pipe(select(csvLoaderSelector));
  isResetCsvHandlerState$ = this.store$.pipe(select(isResetCsvHandlerSelector))
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private vocabularyFacade: VocabularyFacade,
    private dialog: MatDialog,
    private store$: Store<AppStateInterface>,
    private _bottomSheet: MatBottomSheet,

  ) { }

  ngOnInit() {
    // this.fetchData();
    this.initializeValues()
    this.initializeListeners()

    this.showInstallAppSuggestion();
    this.detectDevice();


    // this.translation.getTranslation()
  }

  fetchData() {
    this.vocabularyFacade.fetchWordsAndGroups();
  }

  initializeValues() {
    this.wordFormInitial();
    this.userWords$ = this.vocabularyFacade.words$
    this.vocabularyLoader$ = this.vocabularyFacade.vocabularyLoader$
    this.modalLoader$ = this.store$.pipe(select(modalLoaderSelector))
    this.selectedGroup$ = this.vocabularyFacade.selectedGroup$;
    this.errorMessage$ = this.store$.pipe(select(errorSelector))
    this.wordMenuItems$ = this.vocabularyFacade.wordMenuItems$;
    this.supportedLanguagesForTranslation$ = this.vocabularyFacade.supportedLanguagesForTranslation$

    this.userWordsFiltredByGroupAndSearchValue$ = this.searchValueControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value: string) => this.vocabularyFacade.getUserWordsFiltredByGroup(value)),
      // tap(w => console.log('WORDS IN COMP', w)),
      tap(words => this.userWordsFiltredByGroupAndSearchValue = words),
    )

    this.groupStatistics$ = this.vocabularyFacade.getGroupStatistics(this.userWordsFiltredByGroupAndSearchValue$);
    this.isShowOnlyVerbs$ = this.vocabularyFacade.isShowVerbs$
    this.isShowVerbsToggle$ = this.vocabularyFacade.isShowVerbsToggle$
  }

  get wordControl(): FormControl {
    return this.wordForm.get('word') as FormControl;
  }

  get translationControl(): FormControl {
    return this.wordForm.get('translation') as FormControl;
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


  wordFormInitial() {
    this.wordForm = this.fb.group({
      word: ['', Validators.required],
      translation: ['', Validators.required],
      isVerb: [false],
      _id: [''],
      isFavorite: [false]
    });
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

  openDeleteModal(word: Word) {
    this.wordForm.patchValue({
      word: word.word,
      translation: word.translation,
      _id: word._id,
      isFavorite: word.isFavorite
    });

    // this.openModal(`Would you like to delete ${word.word}?`, this.deleteWordModal);


    // this.openModal(`Would you like to remove this word?`, this.deleteWordTemplate)
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
      case WordAction.TRANSLATE_WORD: this.router.navigate(['/translator'], { queryParams: { text: event.payload.word } });
        break;
      default:
        break;
    }
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
    beforeinstallprompt$
      .pipe(
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

  // isBaseGroup() {
  //   return (this.getSelectedGroup()._id !== ALL_WORDS_GROUP._id && this.getSelectedGroup()._id !== FAVORITES._id) ? false : true;

  // }

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

  ngOnDestroy(): void {
    this.unsubscribe();
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.

  }
}
