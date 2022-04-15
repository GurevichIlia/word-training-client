import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { GroupStatistics } from 'src/app/shared/components/group-statistics/group-statistics.component';
import { Word, WordGroup } from 'src/app/shared/interfaces';
import { CounterState } from '../train/train.component';
import { WordTrainingFacade } from '../word-training.facade';

@Component({
  selector: 'app-train-result',
  templateUrl: './train-result.component.html',
  styleUrls: ['./train-result.component.scss']
})
export class TrainResultComponent implements OnInit, OnDestroy {
  subscription$ = new Subject();

  trainedGroup$: Observable<WordGroup>
  trainingResult$: Observable<Word[]>
  counterState$: Observable<CounterState>
  statistics$: Observable<GroupStatistics>;
  constructor(
    private wordTrainingFacade: WordTrainingFacade,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializeValues()

  }

  initializeValues() {
    this.trainedGroup$ = this.wordTrainingFacade.selectedGroup$;
    this.trainingResult$ = this.wordTrainingFacade.trainingResult$;
    this.counterState$ = this.wordTrainingFacade.counterState$;
    this.statistics$ = this.wordTrainingFacade.trainResultStatistics$;
  }

  changeGroupForTraining() {
    this.wordTrainingFacade.changeGroupForTraining();
  }

  trainAgain() {
    this.wordTrainingFacade.repeatTraining();

  }

  goToVocabulary() {
    this.router.navigate(['vocabulary']);
  }

  ngOnDestroy() {
    // this.wordTrainingFacade.resetWordTrainingState()
    this.subscription$.next();
    this.subscription$.complete();
  }
}
