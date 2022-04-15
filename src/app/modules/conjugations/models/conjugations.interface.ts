import { Word } from 'src/app/shared/interfaces';
import { WordGroup } from './../../../shared/interfaces';

export interface GetConjugationsResponse {
  verbs: VerbWithConjugationsFromServer[]
}

export interface VerbWithConjugationsFromServer {
  verb: string;
  past?: Conjugation;
  present?: PresentConjugation;
  future?: Conjugation;
}

export type VerbTime = 'past' | 'present' | 'future'

export enum VerbTimeEnum {
  Past = 'past',
  Present = 'present',
  Future = 'future'
}

export interface Conjugation {
  verb: string
  time: VerbTime
  i: string | null;
  you_male: string | null;
  you_female: string | null
  he: string | null
  she: string | null
  we: string | null
  you_plural: string | null
  they: string | null
}

export interface PresentConjugation {
  time: 'present'
  singularMan: string
  singularFem: string
  pluralMan: string
  pluralFem: string
}

export interface VerbWithConjugations {
  verb: string;
  selected: boolean,
  past?: Conjugation;
  present?: PresentConjugation;
  future?: Conjugation;
}

export interface VerbOptions {
  present: boolean,
  past: boolean,
  future: boolean
}

export interface SaveVerbsResponse {
  words: Word[];
  groups: WordGroup[];
}

export interface SaveVerbsRequestData extends VerbWithConjugations {
  translation?: string;

}

export type ModalName = 'add-new-group-modal' | 'save-verbs-modal'
