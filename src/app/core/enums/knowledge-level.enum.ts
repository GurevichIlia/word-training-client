export enum KnowledgeLevelEnum {
  NewWord,
  Bad,
  Better,
  Medium,
  Good,
  Excellent,
}

export enum KnowledgeLevelClassEnum {
  NewWord = 'new-word',
  Bad = 'bad',
  Better = 'better',
  Medium = 'medium',
  Good = 'good',
  Excellent = 'excellent',
}

export const createLevelColorConfig = (config: LevelColorConfig): LevelColorConfig => {

  return {
    color: 'white',
    border: config.background,
    ...config
  }
}

export enum KnowledgeLevelColorEnum {
  NewWord = 'whitesmoke',
  Bad = '#e81a1ac2',
  Better = '#ff7f24bf',
  Medium = '#f4e25f',
  Good = '#81db64db',
  Excellent = '#6c7bec',
}

export const KnowledgeLevelColorMap = new Map<KnowledgeLevelEnum, LevelColorConfig>([
  [KnowledgeLevelEnum.NewWord, createLevelColorConfig({ background: KnowledgeLevelColorEnum.NewWord, color: 'rgb(22, 17, 17)' })],
  [KnowledgeLevelEnum.Bad, createLevelColorConfig({ background: KnowledgeLevelColorEnum.Bad })],
  [KnowledgeLevelEnum.Better, createLevelColorConfig({ background: KnowledgeLevelColorEnum.Better })],
  [KnowledgeLevelEnum.Medium, createLevelColorConfig({ background: KnowledgeLevelColorEnum.Medium })],
  [KnowledgeLevelEnum.Good, createLevelColorConfig({ background: KnowledgeLevelColorEnum.Good })],
  [KnowledgeLevelEnum.Excellent, createLevelColorConfig({ background: KnowledgeLevelColorEnum.Excellent })],
])



// .bad {
//   background - color: #e81a1ac2!important;
//   border - color: #e81a1ac2!important;
//   color: white!important;
// }

// .better {
//   background - color: #ff7f24bf!important;
//   border - color: #ff7f24bf!important;
//   color: white!important;
// }

// .medium {
//   background - color: #f4e25f!important;
//   border - color: #f4e25f!important;
//   color: white!important;
// }

// .good {
//   background - color: #81db64db!important;
//   border - color: #81db64db!important;
//   color: white!important;
// }

// .excellent {
//   background - color: #6c7bec!important;
//   border - color: #6c7bec!important;
//   color: white!important;
// }

// .new- word {
//   background - color: whitesmoke!important;
//   border - color: whitesmoke!important;
//   color: rgb(22, 17, 17)!important;
// }

export const wordCardColors = Object.values(KnowledgeLevelColorEnum).filter(color => color !== KnowledgeLevelColorEnum.NewWord)

export interface LevelColorConfig {
  background: string;
  border?: string;
  color?: string;
}

