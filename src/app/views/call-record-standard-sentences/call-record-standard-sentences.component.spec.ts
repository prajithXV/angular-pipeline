import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallRecordStandardSentencesComponent } from './call-record-standard-sentences.component';
import {AngularDraggableModule} from "angular2-draggable";
import {FormsModule} from "@angular/forms";

describe('CallRecordStandardSentencesComponent', () => {
  let component: CallRecordStandardSentencesComponent;
  let fixture: ComponentFixture<CallRecordStandardSentencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AngularDraggableModule, FormsModule ],
      declarations: [ CallRecordStandardSentencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallRecordStandardSentencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
