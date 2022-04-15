import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VerbTableRowComponent } from './verb-table-row.component';

describe('VerbTableRowComponent', () => {
  let component: VerbTableRowComponent;
  let fixture: ComponentFixture<VerbTableRowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
