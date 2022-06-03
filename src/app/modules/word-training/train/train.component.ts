import { KnowledgeLevel } from './../../../shared/components/group-statistics/group-statistics.component';
import { animate, keyframes, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import { Word } from 'src/app/shared/interfaces';
import * as kf from '../../../shared/keyframes';
import { VerbTime } from '../../conjugations/models/conjugations.interface';
import { WordTrainingFacade } from './../word-training.facade';
import { KnowledgeLevelEnum } from 'src/app/core/enums/knowledge-level.enum';

export interface CounterState {
  totalLearnedCards: number,
  uniqueWordsLearned: number,
  wordsInGroup: Word[],
}

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss'],
  animations: [
    trigger('wordCardAnimator', [
      transition('* => bounceInRight', animate(500, keyframes(kf.bounceInRight))),
      transition('* => bounceOutUp', animate(500, keyframes(kf.bounceOutUp))),
      transition('* => bounceInDown', animate(500, keyframes(kf.bounceInDown))),
      transition('* => bounceInLeft', animate(500, keyframes(kf.bounceInLeft)))

    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  currentWord$: Observable<Word>
  animationState$: Observable<string>
  counterState$: Observable<CounterState>
  isShowPrevioudWordButton$: Observable<boolean>
  isVerbsTraining$: Observable<boolean>
  hebrewVerbTime$: Observable<VerbTime>

  public readonly buttons$: Observable<{ knowledgeLevel: KnowledgeLevelEnum }[]> = of([
    { knowledgeLevel: KnowledgeLevelEnum.Bad },
    { knowledgeLevel: KnowledgeLevelEnum.Better },
    { knowledgeLevel: KnowledgeLevelEnum.Medium },
    { knowledgeLevel: KnowledgeLevelEnum.Good },
    { knowledgeLevel: KnowledgeLevelEnum.Excellent },
  ])
  constructor(
    private wordTrainingFacade: WordTrainingFacade
  ) { }

  ngOnInit() {
    this.initializeValues();
  }

  initializeValues() {
    this.currentWord$ = this.wordTrainingFacade.wordForLearning$
    this.animationState$ = this.wordTrainingFacade.animationState$;
    this.isShowPrevioudWordButton$ = this.wordTrainingFacade.isShowPreviousWordButton$
    this.counterState$ = this.wordTrainingFacade.counterState$
    this.isVerbsTraining$ = this.wordTrainingFacade.isShowVerbs$.pipe(shareReplay())
    this.hebrewVerbTime$ = this.wordTrainingFacade.hebrewVerbTime$
  }

  stopTraining() {
    this.wordTrainingFacade.stopTrain();

  }

  onResetAnimationState() {
    this.wordTrainingFacade.resetAnimationState();
  }

  nextWord(word: Word, knowledgeLevel: number) {
    this.wordTrainingFacade.nextWord(word, knowledgeLevel)
  }

  previousWord() {
    this.wordTrainingFacade.previousWord()
  }

  favoriteToggle(word: Word) {
    this.wordTrainingFacade.addWordToFavorite(word)
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
