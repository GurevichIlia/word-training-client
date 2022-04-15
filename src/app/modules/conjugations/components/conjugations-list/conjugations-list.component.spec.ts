import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConjugationsListComponent } from './conjugations-list.component';

describe('ConjugationsListComponent', () => {
  let component: ConjugationsListComponent;
  let fixture: ComponentFixture<ConjugationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConjugationsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConjugationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
