import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordModalComponent } from './word-modal.component';

describe('WordModalComponent', () => {
  let component: WordModalComponent;
  let fixture: ComponentFixture<WordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
