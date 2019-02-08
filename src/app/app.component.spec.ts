import {
  RouterTestingModule
} from '@angular/router/testing';

import {
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import { provideRoutes, Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {GlobalStateService} from "./services/global-state.service";
import {DataService} from "./services/data.service";
import {BackendCommsService} from "./services/backend-comms.service";
import {UserFeedbackService} from "./services/user-feedback.service";
import {DatePipe} from "@angular/common";
import {CiscoCommsService} from "./services/cisco-comms.service";
import {BooleanToStringPipe} from "./pipes/boolean-to-string.pipe";
import {BooleanToStringOrderPipe, BooleanToStringDuePipe} from "./pipes/boolean-to-string-order.pipe";
import {ConsentPipeCorrectConversion} from "./pipes/consent.pipe";
import {TelephonePipe} from "./pipes/telephone.pipe";
import {ToastrModule} from "ngx-toastr";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ RouterTestingModule, RouterModule, HttpClientModule, HttpClientTestingModule, ToastrModule.forRoot() ],
      providers: [ GlobalStateService, DataService, BackendCommsService, UserFeedbackService, DatePipe, CiscoCommsService ,
                   BooleanToStringPipe, BooleanToStringOrderPipe, ConsentPipeCorrectConversion, BooleanToStringDuePipe, TelephonePipe ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
