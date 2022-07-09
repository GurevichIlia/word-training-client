import { Word } from 'src/app/shared/interfaces';

export class WordsUtils {

  static getVerbs(words: Word[]): Word[] {
    return words.filter(word => word.isVerb)
  }

}