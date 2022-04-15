import { WordGroup } from './../../shared/interfaces';
import { addGroupToUserGroupsAction, fetchConjugationsFromCSVAction, saveVerbsAction, selectConjugationsGroupAction, selectVerbForSavingAction, selectVerbsForSavingToggleAction } from './../../store/actions/conjugations.actions';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { ModalName, VerbOptions } from 'src/app/modules/conjugations/models/conjugations.interface';
import { fetchConjugationsAction } from 'src/app/store/actions/conjugations.actions';
import { AppStateInterface } from 'src/app/store/reducers';
import { addGroupModalLoadingSelector, isLoadingSelector, saveVerbsModalLoadingSelector, verbsWithConjugationsSelector } from 'src/app/store/selectors/conjugations.selectors';
import { VerbWithConjugations, VerbTime } from './models/conjugations.interface';
import { groupsSelector, selectedGroupSelector } from 'src/app/store/selectors/vocabulary.selectors';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class ConjugationsFacade {
  private readonly closeModal = new Subject<ModalName>()
  public readonly closeModal$ = this.closeModal.asObservable()
  public readonly isLoading$: Observable<boolean> = this.store$.pipe(select(isLoadingSelector));
  public readonly verbs$: Observable<VerbWithConjugations[]> = this.store$.pipe(select(verbsWithConjugationsSelector))
  public readonly groups$: Observable<WordGroup[]> = this.store$.pipe(
    select(groupsSelector),
    map(groups => this.showOnlyVerbGroups(groups))
  )
  public readonly selectedGroup$: Observable<WordGroup> = this.store$.pipe(select(selectedGroupSelector))

  public readonly addGroupModalLoading$: Observable<boolean> = this.store$.pipe(select(addGroupModalLoadingSelector))
  public readonly saveVerbsModalLoading$: Observable<boolean> = this.store$.pipe(select(saveVerbsModalLoadingSelector))

  private readonly isResetVerbsInputs = new Subject<boolean>()
  public readonly isResetVerbsInputs$: Observable<boolean> = this.isResetVerbsInputs.asObservable();

  constructor(
    private store$: Store<AppStateInterface>
  ) { }

  getConjugationsFromCsv(file: File, verbOptions: VerbOptions): void {
    this.store$.dispatch(fetchConjugationsFromCSVAction({ file, times: this.getTIme(verbOptions) }))
  }
  /**
   *
   * @example verbs: "verb; verb2; verb3"
   */
  getConjugationsFromVerbsAsString(verbs: string, verbOptions: VerbOptions): void {
    this.store$.dispatch(fetchConjugationsAction({ verbs, times: this.getTIme(verbOptions) }))
  }

  private getTIme(verbOptions: VerbOptions): VerbTime[] {
    const verbTime: VerbTime[] = Object.entries(verbOptions)
      .filter(([_, isShow]: [VerbTime, boolean]) => isShow)
      .map(([time, _]: [VerbTime, boolean]) => time)

    return verbTime
  }

  public selectGroup(group: WordGroup): void {
    this.store$.dispatch(selectConjugationsGroupAction({ group }))
  }

  public addNewGroup(name: string): void {
    this.store$.dispatch(addGroupToUserGroupsAction({ name, isVerbsGroup: true }))
  }

  public addVerbsToUserWords(): void {
    this.store$.dispatch(saveVerbsAction())
  }

  private showOnlyVerbGroups(groups: WordGroup[]): WordGroup[] {
    return groups.filter(group => group.isVerbsGroup)
  }

  public onCloseModal(modalName: ModalName): void {
    this.closeModal.next(modalName)
  }

  public selectVerbsForSaving(): void {
    this.store$.dispatch(selectVerbsForSavingToggleAction())
  }

  public selectVerbForSaving(verb: VerbWithConjugations): void {
    this.store$.dispatch(selectVerbForSavingAction({ verb }))
  }

  public resetVerbsInputs(): void {
    this.isResetVerbsInputs.next(true)
  }

}
