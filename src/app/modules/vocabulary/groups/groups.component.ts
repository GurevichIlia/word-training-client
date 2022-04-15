import { GroupsApiService } from 'src/app/modules/vocabulary/groups/services/groups-api.service';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Action, BackendErrorInterface } from 'src/app/core';
import { WordGroup } from 'src/app/shared/interfaces';
import { saveEditedGroupAction } from 'src/app/store/actions/vocabulary.actions';
import { AppStateInterface } from 'src/app/store/reducers';
import { modalLoaderSelector, isCloseModalSelector } from 'src/app/store/selectors/vocabulary.selectors';
import { GroupAction } from '../../../core/enums/group.enum';
import { VocabularyFacade } from '../vocabulary.facade';
import { NotificationsService } from './../../../shared/services/notifications.service';
import { addGroupToUserGroupsAction, deleteUserGroupAction } from './../../../store/actions/vocabulary.actions';
import { openAssigningBottomSheetAction } from './../../../store/actions/vocabulary.actions';
import { GroupMenuItem, groupMenuItems } from './models/group.model';
import { GroupsService } from './services/groups.service';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsComponent implements OnInit, OnDestroy {
  @ViewChild('groupModal') groupModal: TemplateRef<any>;
  @ViewChild('deleteGroupModal') deleteGroupModal: TemplateRef<any>;
  groups$: Observable<WordGroup[]>;
  selectedGroup: WordGroup;
  groupName = new FormControl('', Validators.required);
  modalLoader$: Observable<boolean>;
  subscription$ = new Subject();
  modalRef: MatDialogRef<TemplateRef<any>>;
  modalTitle = '';
  menuItems$: Observable<GroupMenuItem[]>
  errorMessage$: Observable<string | BackendErrorInterface>
  constructor(
    private notification: NotificationsService,
    private groupsService: GroupsService,
    private dialog: MatDialog,
    private store$: Store<AppStateInterface>,
    private vocabularyFacade: VocabularyFacade,
  ) {

  }

  openBottomSheet(): void {
    this.store$.dispatch(openAssigningBottomSheetAction())
  }


  ngOnInit() {
    this.initializeValues()
    this.initializeListeners()
  }

  initializeValues() {
    this.groups$ =  this.vocabularyFacade.groups$

    this.menuItems$ = this.vocabularyFacade.selectedGroup$.pipe(
      tap(selectedGroup => this.selectedGroup = selectedGroup),
      map(selectedGroup => this.groupsService.createMenu(selectedGroup, groupMenuItems as GroupMenuItem[])),
    )

    this.modalLoader$ = this.store$.pipe(select(modalLoaderSelector));
  }

  initializeListeners() {
    this.store$.pipe(
      select(isCloseModalSelector),
      tap(isCloseModal => isCloseModal ? this.closeModal() : null),
      takeUntil(this.subscription$))
      .subscribe()
  }

  closeModal() {
    if (this.modalRef) {
      this.groupName.patchValue('');
      this.modalRef.close()
    }
  }

  saveGroup({ isUpdate }: { isUpdate?: boolean }) {
    if (!this.groupName.valid) {
      return this.notification.warning('', 'Please fill in required fields');
    }

    const groupName: string = this.groupName.value

    if (isUpdate) {
      this.store$.dispatch(saveEditedGroupAction({ name: groupName }))
    } else {
      this.store$.dispatch(addGroupToUserGroupsAction({ name: groupName }))

    }
  }

  deleteGroup() {
    this.store$.dispatch(deleteUserGroupAction())
    // this.groupsService.deleteWordGroup(group)
    //   .pipe(
    //     takeUntil(this.subscription$))
    //   .subscribe(res => {
    //     this.vocabularyService.updateWordsAndGroups();
    //     this.store$.dispatch(setSelectedGroupAction({ group: new WordGroup(ALL_WORDS_GROUP) }))
    //     // this.getGroups();
    //     console.log('RES AFTER DELETE GROUP', res);
    //   })
  }

  openGroupModal(title: 'New group' | 'Edit group') {

    if (title === 'Edit group') {
      this.groupName.patchValue(this.selectedGroup.name);
    }

    this.openModal(title, this.groupModal)

  }

  openDeleteModal() {

    this.openModal('Would you like to delete this group?', this.deleteGroupModal);


    // this.openModal(`Would you like to remove this word?`, this.deleteWordTemplate)
  }

  openModal(title: string, template: TemplateRef<any> | Type<any>, item?: string) {
    this.modalTitle = title;
    this.modalRef = this.dialog.open(template, { disableClose: true });

  }

  getAction(event: Action<WordGroup>) {
    switch (event.action) {
      case GroupAction.NEW_GROUP: this.openGroupModal('New group')

        break;
      case GroupAction.DELETE_GROUP: this.openDeleteModal()

        break;
      case GroupAction.ADD_WORDS_TO_GROUP: this.showWordsForAssign()

        break;
      case GroupAction.EDIT_GROUP: this.openGroupModal('Edit group')

        break;

      // case GroupAction.ADD_MY_WORDS: this.addMyWords()

      //   break;

    }
  }

  showWordsForAssign() {
    // tslint:disable-next-line: max-line-length
    // this.dialog.open(AssignWordListComponent);
    this.openBottomSheet()
    // this.navigation.navigateTo(AppRoutes.AddWordsToGroup)
  }

  onSelectGroup(group: WordGroup) {
    this.vocabularyFacade.selectGroup(group)
    // this.store$.dispatch(setSelectedGroupAction({ group }))
    // this.vocabularyService.setSelectedGroup(group);
  }

  // addMyWords() {
  //   this.groupApi.addMyWords()
  //     .subscribe(res => console.log('MY WORDS', res))
  // }

  ngOnDestroy() {
    this.subscription$.next()
    this.subscription$.complete()
  }
}
