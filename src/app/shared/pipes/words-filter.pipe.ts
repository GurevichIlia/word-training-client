import { Pipe, PipeTransform } from '@angular/core';
import { GeneralWord } from 'src/app/modules/general-words/types/general-words.interfaces';
import { Word } from '../interfaces';
type SearchValue = string
@Pipe({
  name: 'wordsFilter'
})
export class WordsFilterPipe implements PipeTransform {

  transform(words: (Word | GeneralWord)[], ...args: [SearchValue]): any {
    const searchValue = args[0];

    return this.filterBySearchValue(searchValue, words)
  }

  filterBySearchValue(searchValue: string, words: (Word | GeneralWord)[]) {


    if (searchValue) {

      return words.filter(word => word.word.toLowerCase().includes(searchValue.toLowerCase()) ||
        word.translation.toLowerCase().includes(searchValue.toLowerCase()));

    } else {

      return words;

    }
  };


}
