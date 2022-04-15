import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { VerbWithConjugations } from 'src/app/modules/conjugations/models/conjugations.interface';
import { WordGroup } from './../../shared/interfaces';
import { ConjugationsFacade } from './conjugations.facade';

@Component({
  selector: 'app-conjugations',
  templateUrl: './conjugations.component.html',
  styleUrls: ['./conjugations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConjugationsComponent implements OnInit {
  @ViewChild('selectGroupModalTemplateRef') selectGroupModalTemplateRef: TemplateRef<any>;
  @ViewChild('addGroupModalTemplateRef') addGroupModalTemplateRef: TemplateRef<any>;
  public readonly groupName = this.fb.control('', Validators.required);
  public isShowUploader = false;
  public readonly groups$: Observable<WordGroup[]> = this.conjugationsFacade.groups$
  public readonly selectedGroup$: Observable<WordGroup> = this.conjugationsFacade.selectedGroup$
  public readonly loading$: Observable<boolean> = this.conjugationsFacade.isLoading$
  public readonly addGroupModalLoading$: Observable<boolean> = this.conjugationsFacade.addGroupModalLoading$
  public readonly saveVerbsModalLoading$: Observable<boolean> = this.conjugationsFacade.saveVerbsModalLoading$
  public readonly verbs$: Observable<VerbWithConjugations[]> = this.conjugationsFacade.verbs$
  private readonly destroy$ = new Subject();

  constructor(
    private conjugationsFacade: ConjugationsFacade,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  public getConjugationsFromVerbsAsString(verbs: string): void {
    const time = { present: true, past: true, future: true }
    this.conjugationsFacade.getConjugationsFromVerbsAsString(verbs, time)
  }

  public getConjugationsFromCsv(file: File): void {
    const time = { present: true, past: true, future: true }
    this.conjugationsFacade.getConjugationsFromCsv(file, time)
  }

  public openAddVerbsModal(): void {
    const modalRef = this.dialog.open(this.selectGroupModalTemplateRef, { autoFocus: true })
    this.conjugationsFacade.closeModal$.pipe(
      filter(modalName => modalName === 'save-verbs-modal'),
      tap(_ => modalRef.close()),
      tap(_ => this.resetInputs()),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  public onSelectGroup(group: WordGroup) {
    this.conjugationsFacade.selectGroup(group)
  }

  public openNewGroupModal(): void {
    const dialogRef = this.dialog.open(this.addGroupModalTemplateRef)
    this.conjugationsFacade.closeModal$.pipe(
      filter(modalName => modalName === 'add-new-group-modal'),
      tap(_ => dialogRef.close()),
      tap(_ => this.resetInputs()),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  public addNewGroup(): void {
    if (this.groupName.invalid) return

    this.conjugationsFacade.addNewGroup(this.groupName.value)
  }

  public addVerbsToUserWords(): void {
    this.conjugationsFacade.addVerbsToUserWords()
  }

  public selectVerbsForSaving(): void {
    this.conjugationsFacade.selectVerbsForSaving()
  }

  public selectVerbForSaving(verb: VerbWithConjugations): void {
    this.conjugationsFacade.selectVerbForSaving(verb)
  }

  private resetInputs(): void {
    this.conjugationsFacade.resetVerbsInputs();
    this.groupName.patchValue('')
  }



}
