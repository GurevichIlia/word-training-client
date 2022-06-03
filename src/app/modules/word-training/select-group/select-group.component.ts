import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { GroupStatistics } from 'src/app/shared/components/group-statistics/group-statistics.component';
import { Word, WordGroup } from 'src/app/shared/interfaces';
import { VerbTimeEnum } from '../../conjugations/models/conjugations.interface';
import { WordTrainingFacade } from '../word-training.facade';

@Component({
  selector: 'app-select-group',
  templateUrl: './select-group.component.html',
  styleUrls: ['./select-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectGroupComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject()
  isAllowedStart$: Observable<boolean>;
  groups$: Observable<WordGroup[]>
  selectedTrainingGroup$: Observable<WordGroup>
  groupStatistics$: Observable<GroupStatistics>;
  words: Word[] = []
  isShowOnlyVerbs$: Observable<boolean>
  verbTimeControl = new UntypedFormControl(VerbTimeEnum.Future)
  constructor(
    private wordTrainingFacade: WordTrainingFacade
  ) { }

  ngOnInit() {
    this.initialValues()
  }

  initialValues(): void {

    this.groups$ = this.wordTrainingFacade.groups$
    this.selectedTrainingGroup$ = this.wordTrainingFacade.selectedGroup$
    this.isAllowedStart$ = this.wordTrainingFacade.isAllowedStart$
    this.groupStatistics$ = this.wordTrainingFacade.groupStatistics$
    this.isShowOnlyVerbs$ = this.wordTrainingFacade.isShowVerbs$

    this.wordTrainingFacade.allWords$.pipe(
      tap(words => this.words = words),
      takeUntil(this.unsubscribe$)
    ).subscribe()
  }

  selectGroup(group: WordGroup): void {
    this.wordTrainingFacade.selectGroup(group);
  }

  startTrain(): void {
    this.wordTrainingFacade.startTrain(this.words, this.verbTimeControl.value)
  }

  onShowOnlyVerbs(): void {
    this.wordTrainingFacade.showVerbsToggle()
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete()
  }
}
