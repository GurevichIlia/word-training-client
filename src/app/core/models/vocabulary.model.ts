import { FontAwesomeIcons } from '../enums/font-awesome.enum';
import { WordAction } from '../enums/word.enum';
import { MenuItem } from './general.model';

export const LEVEL_LIST = [
  { color: 'whitesmoke', level: 0 },
  { color: '#6c7bec', level: 5 },
  { color: '#81db64db', level: 4 },
  { color: '#f4e25f', level: 3 },
  { color: '#ff7f24bf', level: 2 },
  { color: '#e81a1ac2', level: 1 },
]

export const wordMenuItems = [
  new MenuItem('Edit', WordAction.EDIT_WORD, FontAwesomeIcons.Edit),
  new MenuItem('Translate', WordAction.TRANSLATE_WORD, FontAwesomeIcons.Translate),
  new MenuItem('Share for all', WordAction.SHARE_FOR_ALL, FontAwesomeIcons.Share),
  new MenuItem('Delete from group', WordAction.DELETE_FROM_GROUP, FontAwesomeIcons.Delete),
  new MenuItem('Delete', WordAction.DELETE_WORD, FontAwesomeIcons.Delete),
];
