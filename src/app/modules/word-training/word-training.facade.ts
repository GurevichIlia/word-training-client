import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { NavigationService } from 'src/app/core';
import { AppRoutes } from 'src/app/core/routes/routes';
import { WordsService } from 'src/app/core/services';
import { VerbTime } from 'src/app/modules/conjugations/models/conjugations.interface';
import { GroupStatistics } from 'src/app/shared/components/group-statistics/group-statistics.component';
import { GroupStatisticsService } from 'src/app/shared/components/group-statistics/group-statistics.service';
import { Word, WordGroup } from 'src/app/shared/interfaces';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { addWordToFavoriteAction, selectGroupAction, showVerbsToggleAction, startTrainAction } from 'src/app/store/actions/word-training.actions';
import { AppStateInterface } from 'src/app/store/reducers';
import { configDataSelector, hebrewVerbTimeSelector, IConfigData, isShowOnlyVerbsSelector, isShowPreviousWordButtonSelector, learningWordSelector, selectAvailableGroupsForTraining } from 'src/app/store/selectors/word-training.selector';
import {
  changeGroupAction, nextWordAction,
  previousWordAction, repeatTrainingAction, resetWordTrainingStateAction, saveTrainingProgressAction, stopTrainingAction
} from './../../store/actions/word-training.actions';
import { selectWords } from './../../store/selectors/word-training.selector';
import { CounterState } from './train/train.component';
import { WordTrainingService } from './word-training.service';
const ALL_WORDS = 0
@Injectable()
export class WordTrainingFacade {

  constructor(
    private store$: Store<AppStateInterface>,
    private groupStatisticsService: GroupStatisticsService,
    private utilsService: UtilsService,
    private navigationService: NavigationService,
    private wordTrainingService: WordTrainingService,
    private wordsService: WordsService
  ) { }

  get configData$(): Observable<IConfigData> {
    return this.store$.pipe(select(configDataSelector))

  }

  get hebrewVerbTime$(): Observable<VerbTime> {
    return this.store$.pipe(select(hebrewVerbTimeSelector))

  }

  get wordForLearning$(): Observable<Word> {
    return this.store$.pipe(select(learningWordSelector))
  }

  get isAllowedStart$(): Observable<boolean> {
    return this.store$.pipe(
      select(configDataSelector),
      map((config: IConfigData) => !config.isStarted && config.selectedGroup?.wordQuantity > 4 ? true : false)
    )

  }

  get selectedGroup$(): Observable<WordGroup> {
    return this.store$.pipe(
      select(configDataSelector),
      map((config: IConfigData) => config.selectedGroup))

  }

  public readonly groups$: Observable<WordGroup[]> = this.store$.select(selectAvailableGroupsForTraining).pipe(
    filter(groups => groups?.length > 0),
    tap(groups => this.selectGroup(groups[ALL_WORDS]))
  )

  public readonly allWords$: Observable<Word[]> = this.store$.pipe(select(selectWords))

  get wordsInGroup$(): Observable<Word[]> {
    const wordsByGroup$ = this.utilsService.filterByGroup(this.allWords$, this.selectedGroup$)
    return wordsByGroup$
  }

  get groupStatistics$(): Observable<GroupStatistics> {
    return this.groupStatisticsService.getGroupStatistics(this.wordsInGroup$)
  }

  get animationState$(): Observable<string> {
    return this.wordTrainingService.getAnimationState()

  }

  get counterState$(): Observable<CounterState> {
    return combineLatest([
      this.totalLearnedCards$,
      this.uniqueWordsLearned$.pipe(map(uniqueLearnedWords => uniqueLearnedWords.size)),
      this.wordsInGroup$
    ]).pipe(
      map(([totalLearnedCards, uniqueWordsLearned, wordsInGroup]) => ({ totalLearnedCards, uniqueWordsLearned, wordsInGroup }))
    )
  }

  get totalLearnedCards$(): Observable<number> {
    return this.store$.pipe(
      select(configDataSelector),
      map((config: IConfigData) => config.allLearnedCardsQuantity))
  }

  get uniqueWordsLearned$(): Observable<Map<string, Word>> {
    return this.store$.pipe(
      select(configDataSelector),
      map((config: IConfigData) => config.uniqueLearnedWords))
  }

  get trainingResult$(): Observable<Word[]> {

    return this.uniqueWordsLearned$.pipe(map(uniqueLearnedWords => [...uniqueLearnedWords.values()]))
    // return this.wordsInGroup$.pipe(
    //   take(1),
    //   map(words => words))

  }

  get isShowPreviousWordButton$(): Observable<boolean> {
    return this.store$.pipe(select(isShowPreviousWordButtonSelector))
  }

  get trainResultStatistics$(): Observable<GroupStatistics> {
    return this.wordsInGroup$.pipe(
      take(1),
      switchMap(words => {
        const notLearnedWordsQuantity = words.filter(word => word.levelKnowledge === 0).length

        return this.groupStatisticsService.getGroupStatistics(this.trainingResult$)
          .pipe(
            map(statistics => ({
              ...statistics, knowledgeLevel: statistics.knowledgeLevel.map(state =>
                state.level === 0 ? ({ ...state, wordQuantity: notLearnedWordsQuantity }) : state)
            }))
          )

      }))


  }

  get isStartedTrain$(): Observable<boolean> {
    return this.store$.pipe(
      select(configDataSelector),
      map((config: IConfigData) => config.isStarted)
    )
  }

  startTrain(words: Word[], hebrewVerbTime: VerbTime): void {
    this.wordTrainingService.getAnimationState()
    this.wordTrainingService.startAnimation('bounceInDown');
    this.store$.dispatch(startTrainAction({ words, hebrewVerbTime }))
    this.navigationService.navigateTo(AppRoutes.Training)
  }

  repeatTraining() {
    this.store$.dispatch(repeatTrainingAction())
    this.navigationService.navigateTo(AppRoutes.Training)
  }

  changeGroupForTraining() {
    this.store$.dispatch(changeGroupAction())
    this.navigationService.navigateTo(AppRoutes.SelectGroupForTraining)
  }

  nextWord(word: Word, levelKnowledge: number): void {
    this.wordTrainingService.startAnimation('bounceInDown');
    this.store$.dispatch(nextWordAction({ word, levelKnowledge }))

  }

  previousWord(): void {
    this.store$.dispatch(previousWordAction())

    this.wordTrainingService.startAnimation('bounceInLeft');

  }

  addWordToFavorite(word: Word): void {
    this.store$.dispatch(addWordToFavoriteAction({ word }))
  }

  stopTrain(): void {
    this.store$.dispatch(stopTrainingAction())
  }

  saveProgress(): void {
    this.store$.dispatch(saveTrainingProgressAction())
  }

  resetAnimationState(): void {
    this.wordTrainingService.resetAnimationState();
  }

  selectGroup(group: WordGroup): void {

    this.store$.dispatch(selectGroupAction({ group }))
  }

  resetWordTrainingState(): void {
    this.store$.dispatch(resetWordTrainingStateAction())
  }

  get isShowVerbs$(): Observable<boolean> {
    return this.store$.pipe(select(isShowOnlyVerbsSelector))
  }

  showVerbsToggle(): void {
    this.store$.dispatch(showVerbsToggleAction())
  }
}
