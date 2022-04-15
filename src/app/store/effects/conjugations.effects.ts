import { NotificationsService } from './../../shared/services/notifications.service';
import { verbsWithConjugationsSelector } from './../selectors/conjugations.selectors';
import { ConjugationsFacade } from './../../modules/conjugations/conjugations.facade';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { DefaultGroupId, GroupsService } from 'src/app/core';
import { SaveVerbsResponse, VerbTime, VerbWithConjugations } from 'src/app/modules/conjugations/models/conjugations.interface';
import { ISaveGroupResponse } from 'src/app/modules/vocabulary/groups/types/groups-state.interface';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { addGroupToUserGroupsErrorAction, addGroupToUserGroupsSuccessAction, ConjugationsActionsType, fetchConjugationsErrorAction, fetchConjugationsSuccessAction, saveVerbsErrorAction, saveVerbsSuccessAction } from '../actions/conjugations.actions';
import { selectedGroupSelector } from '../selectors/conjugations.selectors';
import { ConjugationsApiService } from './../../modules/conjugations/services/conjugations-api.service';
import { fetchConjugationsFromCSVErrorAction, fetchConjugationsFromCSVSuccessAction } from './../actions/conjugations.actions';
import { updateGroupsAction, updateWordsAction } from './../actions/vocabulary.actions'

@Injectable()
export class ConjugationsEffects {

  constructor(
    private actions$: Actions,
    private utilsService: UtilsService,
    private conjugationsApiService: ConjugationsApiService,
    private conjugationFacade: ConjugationsFacade,
    private groupsService: GroupsService,
    private notificationsService: NotificationsService,
    private store$: Store
  ) { }

  getConjugations$ = createEffect(() => this.actions$.pipe(
    ofType(ConjugationsActionsType.FetchConjugations),
    switchMap(({ verbs, times }: { verbs: string, times: VerbTime[] }) => {

      return this.conjugationsApiService.getConjugationsForVerbs(
        this.utilsService.verbsForConjugationsParser(verbs),
        times
      )
        .pipe(
          map(({ verbs }) => this.utilsService.convertVerbsFromServerToCorrectFormat(verbs)),
          tap(v => console.log('VERBS', v)),
          map((verbs: VerbWithConjugations[]) => fetchConjugationsSuccessAction({ verbs })),
          catchError(err => of(fetchConjugationsErrorAction({ error: err })))
        )
    }),
    catchError(err => of(fetchConjugationsErrorAction({ error: err })))

  ))

  getConjugationsViaCSV$ = createEffect(() => this.actions$.pipe(
    ofType(ConjugationsActionsType.FetchConjugationsFromCSV),
    switchMap(({ file, times }: { file: File, times: VerbTime[] }) => {
      const formData = new FormData();
      formData.append('csvFile', file, 'csvFile');
      return this.conjugationsApiService.getConjugationsForVerbsViaCSV(formData, times)
        .pipe(
          map(({ verbs }) => this.utilsService.convertVerbsFromServerToCorrectFormat(verbs)),
          tap(v => console.log('VERBS', v)),
          map((verbs: VerbWithConjugations[]) => fetchConjugationsFromCSVSuccessAction({ verbs })),
          catchError(err => of(fetchConjugationsFromCSVErrorAction({ error: err })))
        )
    }),
    catchError(err => of(fetchConjugationsFromCSVErrorAction({ error: err })))

  ))

  addGroup$ = createEffect(() => this.actions$.pipe(
    ofType(ConjugationsActionsType.AddGroupToUserGroups),
    exhaustMap(({ name, isVerbsGroup }: { name: string, isVerbsGroup: boolean }) =>
      this.groupsService.saveGroup(name, null, isVerbsGroup)
        .pipe(
          map(({ groups, group }: ISaveGroupResponse) => {
            this.conjugationFacade.onCloseModal('add-new-group-modal')
            return addGroupToUserGroupsSuccessAction({ groups, group });
          }),
          catchError((err) => {
            return of(addGroupToUserGroupsErrorAction({ error: err.error.message }))
          })
        ))
  ))

  saveVerbs$ = createEffect(() => this.actions$.pipe(
    ofType(ConjugationsActionsType.SaveVerbs),
    withLatestFrom(
      this.store$.pipe(select(selectedGroupSelector)),
      this.store$.pipe(select(verbsWithConjugationsSelector))
    ),
    exhaustMap(([action, selectedGroup, verbs]) => {

      if (!selectedGroup) return of(saveVerbsErrorAction({ error: 'Please select group' }))
      const selectedVerbs = verbs.filter(verb => verb.selected)
      const assignedGroups = [DefaultGroupId.ALL_WORDS, selectedGroup._id]
      return this.conjugationsApiService.saveVerbs(selectedVerbs, assignedGroups)
        .pipe(
          map(({ groups, words }) => {
            this.conjugationFacade.onCloseModal('save-verbs-modal')
            const notifyMessage = verbs.length > 1 ? 'Verbs successfully saved' : 'Verb successfully saved'
            this.notificationsService.success(notifyMessage)
            return saveVerbsSuccessAction({ groups, words });
          }),
          catchError((err) => {
            return of(saveVerbsErrorAction({ error: err.error.message }))
          })
        )
    }

    )))


  updateGroups$ = createEffect(() => this.actions$.pipe(
    ofType(
      ConjugationsActionsType.AddGroupToUserGroupsSuccess,
      ConjugationsActionsType.SaveVerbsSuccess
    ),
    tap(({ groups }: ISaveGroupResponse | SaveVerbsResponse) => this.store$.dispatch(updateGroupsAction({ groups })))
  ), { dispatch: false })

  updateWords$ = createEffect(() => this.actions$.pipe(
    ofType(
      ConjugationsActionsType.SaveVerbsSuccess
    ),
    tap(({ words }: SaveVerbsResponse) => this.store$.dispatch(updateWordsAction({ words })))
  ), { dispatch: false })



}
