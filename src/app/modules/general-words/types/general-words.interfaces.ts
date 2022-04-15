import { Word } from 'src/app/shared/interfaces';

export interface GeneralWord extends Word {
  user: string;
}

export interface IDeleteGeneralWordResponse {
  word: GeneralWord,
  userWords: Word[],
  message: string,
  generalWords: GeneralWord[]
}
