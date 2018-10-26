import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallNotesComponent } from './call-notes.component';
import {FormsModule} from "@angular/forms";
import {NewCallNotesComponent} from "../new-call-notes/new-call-notes.component";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";

describe('CallNotesComponent', () => {
  let component: CallNotesComponent;
  let fixture: ComponentFixture<CallNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ CallNotesComponent, NewCallNotesComponent, CoinDateTransformPipe, WaitingBackendComponent ]
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
