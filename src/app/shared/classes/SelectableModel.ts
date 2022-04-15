import { Observable, BehaviorSubject } from 'rxjs';
export interface Selectable {
  isSelected: boolean
}


export class SelectableModel<T> {
  private data: Map<string, T> = new Map<string, T>();;
  private _selected = new Map<string, T>();
  private _selected$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  public readonly selected$: Observable<T[]>;
  public readonly selected: T[];

  constructor(elements: T[], id: keyof T) {
    elements.forEach(el => {
      this.data.set(this.getElementKey(el), el)
    })
  }

  private getElementKey(el: T): string {
    const mapKey = JSON.stringify(el)
    return mapKey
  }

  selectToggle(el: T): void {

  }

  isSelected(): boolean {
    throw new Error('Method not implemented.');
  }
  isAllSelected(): boolean {
    throw new Error('Method not implemented.');
  }
  clearAll(): void {
    throw new Error('Method not implemented.');
  }

}