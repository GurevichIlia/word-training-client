import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbsInputComponent } from './verbs-input.component';

describe('VerbsInputComponent', () => {
  let component: VerbsInputComponent;
  let fixture: ComponentFixture<VerbsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerbsInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
