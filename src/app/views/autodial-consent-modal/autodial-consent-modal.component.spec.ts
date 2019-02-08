import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutodialConsentModalComponent } from './autodial-consent-modal.component';
import {TelephonePipe} from "../../pipes/telephone.pipe";
import {FormsModule} from "@angular/forms";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DataService} from "../../services/data.service";
import {BackendCommsService} from "../../services/backend-comms.service";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {ToastrModule} from "ngx-toastr";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {GlobalStateService} from "../../services/global-state.service";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";

describe('AutodialConsentModalComponent', () => {
  let component: AutodialConsentModalComponent;
  let fixture: ComponentFixture<AutodialConsentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NgbModule.forRoot(), HttpClientModule, HttpClientTestingModule, ToastrModule.forRoot() ],
      declarations: [ AutodialConsentModalComponent, TelephonePipe, WaitingBackendComponent ],
      providers: [ { provide: DataService, useValue: dataServiceMock }, BackendCommsService, UserFeedbackService, {provide: GlobalStateService, useValue: globalStateServiceMock } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutodialConsentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
