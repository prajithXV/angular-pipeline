import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallManagementComponent } from './call-management.component';
import {DataService} from "../../services/data.service";
import {BackendCommsService} from "../../services/backend-comms.service";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {DatePipe} from "@angular/common";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {GlobalStateService} from "../../services/global-state.service";
import {RouterTestingModule} from "@angular/router/testing";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {BooleanToStringDuePipe, BooleanToStringOrderPipe} from "../../pipes/boolean-to-string-order.pipe";
import {ConsentPipeCorrectConversion} from "../../pipes/consent.pipe";
import {TelephonePipe} from "../../pipes/telephone.pipe";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";

describe('CallManagementComponent', () => {
  let component: CallManagementComponent;
  let fixture: ComponentFixture<CallManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ HttpClientModule, HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot() ],
      declarations: [ CallManagementComponent ],
      providers: [ DataService, BackendCommsService, UserFeedbackService, DatePipe,
                  CiscoCommsService,GlobalStateService, BooleanToStringPipe, BooleanToStringOrderPipe, ConsentPipeCorrectConversion, BooleanToStringDuePipe,
                  TelephonePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
