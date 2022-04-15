import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { select, Store } from '@ngrx/store';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, map, switchMap, tap, startWith, takeUntil } from 'rxjs/operators';
import { NavigationService } from 'src/app/core';
import { GeneralFacade } from 'src/app/general.facade';
import { Word } from 'src/app/shared/interfaces';
import { assignWordsToGroupAction, closeAssigningBottomSheetAction } from 'src/app/store/actions/vocabulary.actions';
import { AppStateInterface } from 'src/app/store/reducers';
import { WordGroup } from './../../../shared/interfaces';
import {
  allWordsSelector,
  isBottomSheetLoadingSelector,
  isCloseWordsToAssignSelector,
  selectedGroupSelector
} from './../../../store/selectors/vocabulary.selectors';
import { AssignWordsService } from './../assign-words.service';
import { VocabularyFacade } from './../vocabulary.facade';

@Component({
  selector: 'app-assign-word-list',
  templateUrl: './assign-word-list.component.html',
  styleUrls: ['./assign-word-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssignWordListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('wordList') wordList: ElementRef<HTMLDivElement>
  words$: Observable<Word[]>;
  selectedWords: string[] = [];
  subscription$ = new Subject();
  filterControl = new FormControl('');
  loading$: Observable<boolean>;
  isCloseBottomSheet$: Observable<boolean>
  goBackAnimation = false
  showMoreElements$ = new Subject()
  constructor(
    private assignService: AssignWordsService,
    private vocabularyFacade: VocabularyFacade,
    private store$: Store<AppStateInterface>,
    private _bottomSheetRef: MatBottomSheetRef<AssignWordListComponent>
  ) { }

  ngOnInit() {
    this.loading$ = this.store$.pipe(select(isBottomSheetLoadingSelector))
    this.isCloseBottomSheet$ = this.store$.pipe(
      select(isCloseWordsToAssignSelector),
      filter(isClose => isClose === true),
      tap(_ => this._bottomSheetRef.dismiss()))


    this.getWords();


  }

  ngAfterViewInit(): void {
    fromEvent(this.wordList.nativeElement, 'scroll')
      .pipe(
        filter(e => {
          return (e.target['scrollHeight'] - e.target['scrollTop']) <= e.target['clientHeight']
        }),
        tap((e => this.showMoreElements$.next(e))),
        takeUntil(this.subscription$)
      ).subscribe()



  }

  getWords() {
    this.words$ =
      this.store$.pipe(
        select(selectedGroupSelector),
        switchMap((selectedGroup: WordGroup) =>
          this.vocabularyFacade.removeWordsAlreadyExistInThisGroup(
            this.store$.pipe(select(allWordsSelector)), selectedGroup._id)),
      )
  }

  getAction({ action, payload }) {
    if (action === 'assign') {
      this.selectWordForAssign(payload);
    }
  }

  selectWordForAssign(wordsId: string) {
    this.selectedWords = this.assignService.selectWordForAssign(wordsId, this.selectedWords);

  }

  assignWords(selectedWordsIds: string[]) {
    this.store$.dispatch(assignWordsToGroupAction({ selectedWordsIds }))



  }


  onClose() {
    this.store$.dispatch(closeAssigningBottomSheetAction())    // this.goBackAnimation = true
  }

  onScroll() {
  }

  ngOnDestroy(): void {

    this.subscription$.next();
    this.subscription$.complete();

  }
}
