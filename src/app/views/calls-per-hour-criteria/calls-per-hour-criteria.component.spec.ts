import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallsPerHourCriteriaComponent } from './calls-per-hour-criteria.component';
import {FormsModule} from "@angular/forms";
import {CoinDateInputComponent} from "../coin-date-input/coin-date-input.component";
import {DataService} from "../../services/data.service";
import {BackendCommsService} from "../../services/backend-comms.service";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {DatePipe} from "@angular/common";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {OwlDateTimeModule} from "ng-pick-datetime";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {OwlMomentDateTimeModule} from "ng-pick-datetime-moment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BooleanToStringDuePipe, BooleanToStringOrderPipe} from "../../pipes/boolean-to-string-order.pipe";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {ConsentPipeCorrectConversion} from "../../pipes/consent.pipe";
import {TelephonePipe} from "../../pipes/telephone.pipe";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";


describe('CallsPerHourCriteriaComponent', () => {
  let component: CallsPerHourCriteriaComponent;
  let fixture: ComponentFixture<CallsPerHourCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, OwlDateTimeModule, OwlMomentDateTimeModule, BrowserAnimationsModule, HttpClientModule, HttpClientTestingModule, ToastrModule.forRoot()],
      declarations: [ CallsPerHourCriteriaComponent, CoinDateInputComponent, DatepickerComponent, WaitingBackendComponent ],
      providers: [ DataService, BackendCommsService, UserFeedbackService, DatePipe, CiscoCommsService,
                   BooleanToStringPipe, BooleanToStringOrderPipe, ConsentPipeCorrectConversion, BooleanToStringDuePipe, TelephonePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallsPerHourCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
