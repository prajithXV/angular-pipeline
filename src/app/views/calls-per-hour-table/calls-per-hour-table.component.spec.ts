import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallsPerHourTableComponent } from './calls-per-hour-table.component';

describe('CallsPerHourTableComponent', () => {
  let component: CallsPerHourTableComponent;
  let fixture: ComponentFixture<CallsPerHourTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallsPerHourTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallsPerHourTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
