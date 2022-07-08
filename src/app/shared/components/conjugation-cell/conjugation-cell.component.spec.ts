import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConjugationCellComponent } from './conjugation-cell.component';

describe('ConjugationCellComponent', () => {
  let component: ConjugationCellComponent;
  let fixture: ComponentFixture<ConjugationCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConjugationCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConjugationCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
