import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConjugationCardComponent } from './conjugation-card.component';

describe('ConjugationCardComponent', () => {
  let component: ConjugationCardComponent;
  let fixture: ComponentFixture<ConjugationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConjugationCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConjugationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
