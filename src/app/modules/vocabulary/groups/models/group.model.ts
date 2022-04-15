import { FontAwesomeIcons } from '../../../../core/enums/font-awesome.enum';
import { GroupAction } from '../../../../core/enums/group.enum';
import { MenuItem } from '../../../../core/models/general.model';

export const groupMenuItems: MenuItem<GroupAction>[] = [
  new MenuItem('Create group', GroupAction.NEW_GROUP, FontAwesomeIcons.Create),
  new MenuItem('Edit group', GroupAction.EDIT_GROUP, FontAwesomeIcons.Edit),
  new MenuItem('Add words to group', GroupAction.ADD_WORDS_TO_GROUP, FontAwesomeIcons.Add),
  new MenuItem('Delete group', GroupAction.DELETE_GROUP, FontAwesomeIcons.Delete),
  // new MenuItem('Add my words', GroupAction.ADD_MY_WORDS, FontAwesomeIcons.Add),
];

export interface GroupMenuItem extends MenuItem<GroupAction> {
  action: GroupAction;
}
