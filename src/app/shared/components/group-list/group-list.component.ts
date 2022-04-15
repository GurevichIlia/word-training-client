import { WordGroup } from 'src/app/shared/interfaces';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupListComponent {
  groupControl = new FormControl('');
  @Input() groups: WordGroup[];
  @Input() size: 'tiny' | 'small' | 'medium'| 'large' | 'giant' = 'small';
  @Input() set selectedGroup(group: WordGroup) {
    if (group) {
      this.groupControl.patchValue(group._id);
    }
  }

  @Output() selectGroup = new EventEmitter<WordGroup>();

  onSelectGroup(group: WordGroup) {

    this.selectGroup.emit(group);
  }


}
