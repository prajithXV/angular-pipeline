import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCallNotesComponent } from './new-call-notes.component';

describe('NewCallNotesComponent', () => {
  let component: NewCallNotesComponent;
  let fixture: ComponentFixture<NewCallNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCallNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCallNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
