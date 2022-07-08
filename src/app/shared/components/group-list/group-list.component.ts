import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { TuiStringHandler } from '@taiga-ui/cdk/types/handler';
import { tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { tap } from 'rxjs/operators';
import { WordGroup } from 'src/app/shared/interfaces';

const STRINGIFY_GROUP: TuiStringHandler<WordGroup> = (group: WordGroup) =>
  `${group.name ?? ''} - ${group.wordQuantity ?? ''}`;

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
  providers: [tuiItemsHandlersProvider({ stringify: STRINGIFY_GROUP })],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupListComponent {
  public readonly groupControl = new UntypedFormControl('');

  @Input()
  groups: WordGroup[];

  @Input()
  size: 'tiny' | 'small' | 'medium' | 'large' | 'giant' = 'small';

  @Input()
  set selectedGroup(group: WordGroup) {
    if (group) {
      this.groupControl.patchValue(group, { emitEvent: false });
    }
  }

  @Input()
  loading: boolean = false

  @Output()
  selectGroup = this.groupControl.valueChanges

}
