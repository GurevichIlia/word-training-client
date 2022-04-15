import { MenuItem } from 'src/app/core';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Action } from 'src/app/core/models/general.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
  @Input() menuItems: MenuItem[];
  @Input() fontSize: string = '18px';
  @Output() action = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }


  onAction(action: string) {
    this.action.emit(action);
  }
}
