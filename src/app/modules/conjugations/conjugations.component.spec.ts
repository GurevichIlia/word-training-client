import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConjugationsComponent } from './conjugations.component';

describe('ConjugationsComponent', () => {
  let component: ConjugationsComponent;
  let fixture: ComponentFixture<ConjugationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConjugationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConjugationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
