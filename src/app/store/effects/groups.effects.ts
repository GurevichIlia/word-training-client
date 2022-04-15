import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { GroupsService, NavigationService } from 'src/app/core';
import { LanguageInterface } from 'src/app/modules/languages/types/languages.interfaces';
import { IAssignWordsResponse, ISaveGroupResponse } from 'src/app/modules/vocabulary/groups/types/groups-state.interface';
import { WordGroup } from 'src/app/shared/interfaces';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { AppStateInterface } from 'src/app/store/reducers';
import { currentLanguageSelector } from '../selectors/languages.selectors';
import { selectedGroupSelector } from '../selectors/vocabulary.selectors';
import { AssignWordsService } from './../../modules/vocabulary/assign-words.service';
import {
  addGroupToUserGroupsErrorAction, addGroupToUserGroupsSuccessAction,
  assignWordsToGroupErrorAction,
  assignWordsToGroupSuccessAction, deleteUserGroupErrorAction, deleteUserGroupSuccessAction, fetchGroupsErrorAction,
  fetchGroupsSuccessAction,





  saveEditedGroupErrorAction, saveEditedGroupSuccessAction,



  selectVocabularyGroupAction,



  VocabularyActionsType
} from './../actions/vocabulary.actions';
import { closeAssigningBottomSheetAction } from './../actions/vocabulary.actions';


@Injectable()
export class GroupsEffects {

  // loadWords$ = createEffect(() => this.actions$.pipe(
  //   ofType(WordsActionsType.LoadWords),
  //   mergeMap(() => this.wordsService.getAllUserWords$()
  //     .pipe(
  //       map(words => new WordsLoadedSuccessAction(words)),
  //       catchError(() => EMPTY)
  //     ))
  constructor(
    private actions$: Actions,
    private groupsService: GroupsService,
    private assignWordsService: AssignWordsService,
    private notificationsService: NotificationsService,
    private store$: Store<AppStateInterface>,
    private navigationService: NavigationService
  ) { }

  loadGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VocabularyActionsType.FetchGroups),
      switchMap(_ => {
        return this.store$.pipe(
          select(currentLanguageSelector),
          take(1),
          switchMap((language: LanguageInterface) =>
            this.groupsService.getWordsGroups$(language)
              .pipe(
                map((groups: WordGroup[]) => {
                  return fetchGroupsSuccessAction({ groups });
                }),
                catchError((err: any) => of(fetchGroupsErrorAction({ error: err })))
              ))
        )
      })
    ));

  addGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VocabularyActionsType.AddGroupToUserGroups),
      switchMap(({ name }: { name: string }) =>
        this.store$.pipe(
          select(currentLanguageSelector),
          take(1),
          switchMap((language: LanguageInterface) =>
            this.groupsService.saveGroup(name)
              .pipe(
                map(({ groups, group }: ISaveGroupResponse) => {
                  return addGroupToUserGroupsSuccessAction({ groups, group });
                }),
                catchError((err) => {
                  return of(addGroupToUserGroupsErrorAction({ error: err.error.message }))
                })
              ))
        )

      ),
    )
  )

  addGroupSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(VocabularyActionsType.AddGroupToUserGroupsSuccess),
    tap(({ group }: { group: WordGroup }) => {
      if (!group) return
      // Set new added group as default group after adding
      this.store$.dispatch(selectVocabularyGroupAction({ group }))
    })
  ),
    { dispatch: false }
  )

  deleteGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VocabularyActionsType.DeleteUserGroup),
      switchMap(_ =>
        this.store$.pipe(
          select(selectedGroupSelector),
          take(1),
          switchMap((selectedGroup: WordGroup) => {
            return this.groupsService.deleteWordGroup(selectedGroup)
              .pipe(
                map((groups: WordGroup[]) => {
                  return deleteUserGroupSuccessAction({ groups });
                }),
                catchError((err) => {
                  return of(deleteUserGroupErrorAction({ error: err.error.message }))
                })
              )
          }

          )
        )
      )
    )
  )

  deleteGroupSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(VocabularyActionsType.DeleteUserGroupsuccess),
    tap(({ groups }: { groups: WordGroup }) => {
      if (!groups) return
      const ALL_WORDS = 0;
      // Set "All words" as default group after deleting
      this.store$.dispatch(selectVocabularyGroupAction({ group: groups[ALL_WORDS] }))
    })
  ),
    { dispatch: false }
  )

  saveEditedGroup$ = createEffect(
    () => this.actions$.pipe(
      ofType(VocabularyActionsType.SaveEditedGroup),
      switchMap(({ name }: { name: string }) =>
        this.store$.pipe(
          select(selectedGroupSelector),
          take(1),
          switchMap((selectedGroup: WordGroup) => {
            return this.groupsService.saveGroup(name, selectedGroup)
              .pipe(
                map(({ groups, group }: ISaveGroupResponse) => {
                  return saveEditedGroupSuccessAction({ groups, group });
                }),
                catchError((err) => {
                  return of(saveEditedGroupErrorAction({ error: err.error.message }))
                })
              )
          }))))
  )

  saveEditedGroupSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(VocabularyActionsType.SaveEditedGroupsuccess),
    tap(({ group }: { group: WordGroup }) => {
      if (!group) return
      // Set new added group as default group after adding
      this.store$.dispatch(selectVocabularyGroupAction({ group }))
    })
  ),
    { dispatch: false }
  )

  assignWordsToGroups$ = createEffect(() => this.actions$.pipe(
    ofType(VocabularyActionsType.AssignWordsToGroup),
    switchMap(({ selectedWordsIds }: { selectedWordsIds: string[] }) =>
      this.store$.pipe(
        select(selectedGroupSelector),
        take(1),
        switchMap((selectedGroup: WordGroup) => {
          return this.assignWordsService.assignWords(selectedGroup._id, selectedWordsIds)
            .pipe(
              map((res: IAssignWordsResponse) => {
                return assignWordsToGroupSuccessAction({ groups: res.groups, message: res.message, words: res.wordsAfterAssign })
              }),
              catchError((err) => {
                return of(assignWordsToGroupErrorAction({ error: err.message }))
              })
            )
        }))
    ))
  )

  assignWordsToGroupSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(VocabularyActionsType.AssignWordsToGroupSuccess),
    tap(({ message }: { message: string }) => {
      if (!message) return
      // this.navigationService.navigateTo(AppRoutes.Vocabulary)
      this.store$.dispatch(closeAssigningBottomSheetAction())
      this.notificationsService.success(message)
    })
  ),
    { dispatch: false }
  )
}
