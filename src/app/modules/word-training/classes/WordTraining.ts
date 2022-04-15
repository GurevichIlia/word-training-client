import { UtilsService } from 'src/app/shared/services/utils.service';
import { Verb, Word, WordGroup } from 'src/app/shared/interfaces';
import { IWordTrainingState } from 'src/app/core/models/word-training.interfaces';

export class WordTraining {


  static getWordsForTraining(words: Word[], state: IWordTrainingState): Word[] {

    if (state.isVerbs === true) {

      return words.filter(word => WordTraining.isVerb(word))
    }


    return WordTraining.filterWordsByGroup(words, state.selectedGroup)
  }

  static getAlreadyLearnedWords(words: Word[]): Map<string, Word> {

    const alreadyLearnedWords = new Map<string, Word>()
    words.forEach(word => word.levelKnowledge > 0 ? alreadyLearnedWords.set(word._id, word) : null)

    return alreadyLearnedWords
  }

  private static getRandomIndex = (maxNum: number): number => {
    return Math.floor(Math.random() * maxNum)
  }

  static filterWordsByGroup = (words: Word[], selectedGroup: WordGroup): Word[] => {
    const utilsService = new UtilsService()

    const filtredWords = utilsService.filter(words, selectedGroup)

    words.filter(word => word.assignedGroups.includes(selectedGroup._id))

    return filtredWords
  }

  static getWordForLearning = (words: Word[], previousWordsInCache: Word[]): Word => {
    if (!words) throw new Error('No words in method "getWordForLearning"')

    words = WordTraining.removeThreeLastLearnedWords(words, previousWordsInCache);

    const neverLearnedYetWords: Word[] = [] // level knowledge 0
    const learnedBadWords: Word[] = [] // level knowledge 1,2
    const otherWords: Word[] = [] // level knowledge 3,4,5

    words.forEach(word => {
      if (word.levelKnowledge === 0) {
        neverLearnedYetWords.push(word)
      }

      if (word.levelKnowledge === 1 || word.levelKnowledge === 2) {
        learnedBadWords.push(word)
      }

      if (word.levelKnowledge === 3 || word.levelKnowledge === 4 || word.levelKnowledge === 5) {
        otherWords.push(word)
      }
    })

    if (neverLearnedYetWords.length > 0) {
      const randomOrderedWords = WordTraining.getRandomOrder(neverLearnedYetWords)
      return randomOrderedWords[WordTraining.getRandomIndex(neverLearnedYetWords.length)]

    }
    if (learnedBadWords.length > 0) {
      const randomOrderedWords = WordTraining.getRandomOrder(learnedBadWords)

      return randomOrderedWords[WordTraining.getRandomIndex(learnedBadWords.length)]

    }

    if (otherWords.length > 0) {
      const randomOrderedWords = WordTraining.getRandomOrder(otherWords)

      return randomOrderedWords[WordTraining.getRandomIndex(otherWords.length)]
    }

    return words[WordTraining.getRandomIndex(words.length)]
  }



  private static getRandomOrder = (words: Word[]): Word[] => {
    for (let i = words.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * words.length);
      const temp = words[i];
      words[i] = words[j]
      words[j] = temp;
    }
    return words;
  }



  private static removeThreeLastLearnedWords = (words: Word[], previousWordsInCache: Word[]): Word[] => {
    const length = previousWordsInCache.length;

    if (length > 0) {
      let threeLastWords: Word[] = []
      let threeLastWordsIds: string[] = []
      let filtredWords: Word[] = []
      if (length > 3) {
        threeLastWords = previousWordsInCache.slice(-3)
        threeLastWordsIds = threeLastWords.map(word => word._id)
        filtredWords = words.filter(word => !threeLastWordsIds.includes(word._id))
        return filtredWords
      }

      threeLastWordsIds = previousWordsInCache.map(word => word._id)
      filtredWords = words.filter(word => !threeLastWordsIds.includes(word._id))
      return filtredWords
    }

    return words
  }


  static isVerb(word: Word): boolean {

    const verbMarker: keyof Verb = 'conjugations'

    const isVerb = (verbMarker in word) ? true : false

    return isVerb
  }
}
