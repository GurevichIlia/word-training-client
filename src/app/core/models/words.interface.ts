import { Word, WordGroup } from 'src/app/shared/interfaces';

export interface GetAllUserWordsResponseInterface {
  // [wordId: string]: Word;
  words: Word[]

}

export interface AddUserWordResponseInterface {
  message: string,
  // words: {
  //   [wordId: string]: Word;
  // }
  groups: WordGroup[]
  words: Word[]
}

export interface DeleteUserWordResponseInterface extends AddUserWordResponseInterface {
}

export interface EditUserWordResponseInterface extends AddUserWordResponseInterface {
}

export interface AddWordsFromCsvResponseInterface {
  groups: WordGroup[]
  words: Word[]
}

export interface UpdateWordsResponseInterface extends AddWordsFromCsvResponseInterface {

}

export interface IAddWordToGeneralListResponse {
  addedWord: Word | '',
  generalWords: Word[],
  userWords: Word[]
}
