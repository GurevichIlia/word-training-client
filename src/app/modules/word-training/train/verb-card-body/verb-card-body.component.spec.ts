import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VerbCardBodyComponent } from './verb-card-body.component';

describe('VerbCardBodyComponent', () => {
  let component: VerbCardBodyComponent;
  let fixture: ComponentFixture<VerbCardBodyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbCardBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbCardBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
