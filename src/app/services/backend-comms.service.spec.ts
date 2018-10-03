import { TestBed, inject } from '@angular/core/testing';

import { BackendCommsService } from './backend-comms.service';
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "./user-feedback.service";
import {ToastOptions, ToastsManager} from "ng2-toastr";
import {DatePipe} from "@angular/common";
import {BooleanToStringPipe} from "../pipes/boolean-to-string.pipe";
import {BooleanToStringOrderPipe, BooleanToStringDuePipe} from "../pipes/boolean-to-string-order.pipe";
import {ConsentPipeCorrectConversion} from "../pipes/consent.pipe";
import {TelephonePipe} from "../pipes/telephone.pipe";

describe('BackendCommsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [ BackendCommsService, UserFeedbackService, ToastsManager,  ToastOptions, DatePipe, BooleanToStringPipe,
                   BooleanToStringOrderPipe, ConsentPipeCorrectConversion, BooleanToStringDuePipe, TelephonePipe ]
    });
  });

  it('should be created', inject([BackendCommsService], (service: BackendCommsService) => {
    expect(service).toBeTruthy();
  }));
});
