import { Conjugation, PresentConjugation } from 'src/app/modules/conjugations/models/conjugations.interface';

export type ConjugationTemplate = {
  pronoun: keyof (Conjugation & PresentConjugation);
  hebPronoun: string;
  value: string;
} & ConjugationStyle

export interface ConjugationStyle {
  cellEnd?: number;
  cellStart?: number;
  borderRight?: string;
  borderLeft?: string
}

const border: string = '1px solid #f5893de0'

export const CONJUGATION_TEMPLATE_MODEL: ConjugationTemplate[] = [
  {
    pronoun: 'i',
    hebPronoun: 'אני',
    value: '',
    cellStart: 1,
    cellEnd: 3,
  },
  {
    pronoun: 'you_male',
    hebPronoun: 'אַתה',
    value: '',
    borderLeft: border
  },
  {
    pronoun: 'you_female',
    hebPronoun: 'את',
    value: '',
    borderRight: border
  },
  {
    pronoun: 'he',
    hebPronoun: 'הוא',
    value: '',
    borderLeft: border
  },
  {
    pronoun: 'she',
    hebPronoun: 'היא',
    value: '',
    borderRight: border
  },
  {
    pronoun: 'we',
    hebPronoun: 'אנחנו',
    value: '',
    cellStart: 1,
    cellEnd: 3,
  },
  {
    pronoun: 'you_plural',
    hebPronoun: 'אתם / אתן',
    value: '',
    borderLeft: border
  },
  {
    pronoun: 'they',
    hebPronoun: 'הם / הן',
    value: '',
    borderRight: border
  }
]

export const CONJUGATION_TEMPLATE_PRESENT_TIME_MODEL: ConjugationTemplate[] = [
  {
    pronoun: 'singularMan',
    hebPronoun: 'אני/אתה/הוא',
    value: ''
  },
  {
    pronoun: 'singularFem',
    hebPronoun: 'אני/את/היא',
    value: ''
  },
  {
    pronoun: 'pluralMan',
    hebPronoun: 'אנחנו/אתם/הן',
    value: ''
  },
  {
    pronoun: 'pluralFem',
    hebPronoun: 'נחנו/אתן/הן',
    value: ''
  }
]

// export interface ConjugationWithTime {
//   time: string
//   conjugation: ConjugationTemplate[]
// }

// export interface VerbWithConjugations {
//   verb: string,
//   conjugations: ConjugationWithTime[]
// }

// export interface Conjugation {
//   verb: string
//   time: VerbTime
//   i: string | null;
//   you_male: string | null;
//   you_female: string | null
//   he: string | null
//   she: string | null
//   we: string | null
//   you_plural: string | null
//   they: string | null

// }

// export type VerbTime = 'past' | 'present' | 'future'
