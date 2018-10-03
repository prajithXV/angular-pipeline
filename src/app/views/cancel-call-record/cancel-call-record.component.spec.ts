import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { CancelCallRecordComponent } from './cancel-call-record.component';
import {FormsModule} from "@angular/forms";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";

describe('CancelCallRecordComponent', () => {
  let component: CancelCallRecordComponent;
  let fixture: ComponentFixture<CancelCallRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ CancelCallRecordComponent, WaitingBackendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelCallRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });




});
