import { Conjugation, PresentConjugation } from 'src/app/modules/conjugations/models/conjugations.interface';

export interface ConjugationTemplate {
  pronoun: keyof (Conjugation & PresentConjugation)
  hebPronoun: string
  value: string
}

export const CONJUGATION_TEMPLATE_MODEL: ConjugationTemplate[] = [
  {
    pronoun: 'i',
    hebPronoun: 'אני',
    value: ''
  },
  {
    pronoun: 'you_male',
    hebPronoun: 'אַתה',
    value: ''
  },
  {
    pronoun: 'you_female',
    hebPronoun: 'את',
    value: ''
  },
  {
    pronoun: 'he',
    hebPronoun: 'הוא',
    value: ''
  },
  {
    pronoun: 'she',
    hebPronoun: 'היא',
    value: ''
  },
  {
    pronoun: 'we',
    hebPronoun: 'אנחנו',
    value: ''
  },

  {
    pronoun: 'you_plural',
    hebPronoun: 'אתם / אתן',
    value: ''
  },
  {
    pronoun: 'they',
    hebPronoun: 'הם / הן',
    value: ''
  }
]

export const CONJUGATION_TEMPLATE_PRESENT_TIME_MODEL: ConjugationTemplate[] = [
  {
    pronoun: 'singularMan',
    hebPronoun: 'זבר',
    value: ''
  },
  {
    pronoun: 'singularFem',
    hebPronoun: 'נקבה',
    value: ''
  },
  {
    pronoun: 'pluralMan',
    hebPronoun: 'רבים',
    value: ''
  },
  {
    pronoun: 'pluralFem',
    hebPronoun: 'רבות',
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
