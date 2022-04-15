import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatorContainer } from './translator.container';

describe('TranslatorContainer', () => {
  let component: TranslatorContainer;
  let fixture: ComponentFixture<TranslatorContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslatorContainer]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
