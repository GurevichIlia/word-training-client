import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WordCardBodyComponent } from './word-card-body.component';

describe('WordCardBodyComponent', () => {
  let component: WordCardBodyComponent;
  let fixture: ComponentFixture<WordCardBodyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WordCardBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordCardBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
