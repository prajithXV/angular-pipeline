import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallNotesComponent } from './call-notes.component';

describe('CallNotesComponent', () => {
  let component: CallNotesComponent;
  let fixture: ComponentFixture<CallNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
