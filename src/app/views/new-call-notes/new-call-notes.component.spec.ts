import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCallNotesComponent } from './new-call-notes.component';
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {FormsModule} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {GlobalStateService} from "../../services/global-state.service";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {APP_BASE_HREF, DatePipe, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {TemporalStateServiceService} from "../../services/temporal-state-service.service";

describe('NewCallNotesComponent', () => {
  let component: NewCallNotesComponent;
  let fixture: ComponentFixture<NewCallNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ NewCallNotesComponent, WaitingBackendComponent ],
      providers: [ { provide: DataService, useValue: dataServiceMock}, { provide: GlobalStateService, useValue: globalStateServiceMock },
        {provide: UserFeedbackService, useValue: userFeedbackMock}]
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
