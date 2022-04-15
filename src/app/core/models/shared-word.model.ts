import { WordAction } from '../enums/word.enum';
import { FontAwesomeIcons } from '../enums/font-awesome.enum';
import { MenuItem } from './general.model';

export const sharedWordMenuItem: MenuItem<WordAction>[] = [
  new MenuItem('Add to my words', WordAction.ADD_TO_MY_WORDS, FontAwesomeIcons.Add),
  new MenuItem('Delete from shared', WordAction.DELETE_FROM_SHARE_LIST, FontAwesomeIcons.Delete),

]
