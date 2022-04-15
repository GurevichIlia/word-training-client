import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvVerbsInputComponent } from './csv-verbs-input.component';

describe('CsvVerbsInputComponent', () => {
  let component: CsvVerbsInputComponent;
  let fixture: ComponentFixture<CsvVerbsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvVerbsInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvVerbsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
