import { VerbTime } from 'src/app/modules/conjugations/models/conjugations.interface';
import { Word, WordGroup } from 'src/app/shared/interfaces';

type WordId = string

export interface IWordTrainingState {
  selectedGroup: WordGroup | null
  words: Word[] | null
  isStarted: boolean,
  nextWord: Word | null,
  previousWordsInCache: Word[],
  allLearnedCardsQuantity: number,
  uniqueLearnedWords: Map<WordId, Word>;
  newWordsLearnedInTrain: Map<WordId, Word>
  isVerbs: boolean,
  hebrewVerbTime: VerbTime
}
