import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConjugationCardsComponent } from './conjugation-cards.component';

describe('ConjugationCardsComponent', () => {
  let component: ConjugationCardsComponent;
  let fixture: ComponentFixture<ConjugationCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConjugationCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConjugationCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
