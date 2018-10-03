import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LovValuesTableComponent } from './lov-values-table.component';
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {NewLovValueComponent} from "../new-lov-value/new-lov-value.component";
import {SemaphoreComponent} from "../semaphore/semaphore.component";
import {ValueEditionComponent} from "../value-edition/value-edition.component";
import {FormsModule} from "@angular/forms";
import {CoinNumberInputComponent} from "../coin-number-input/coin-number-input.component";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {CoinNumberInputErrorsComponent} from "../coin-number-input-errors/coin-number-input-errors.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {OwlDateTimeModule} from "ng-pick-datetime";
import {OwlMomentDateTimeModule} from "ng-pick-datetime-moment";
import {DataService} from "../../services/data.service";
import {BackendCommsService} from "../../services/backend-comms.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {ToastOptions, ToastsManager} from "ng2-toastr";
import {DatePipe} from "@angular/common";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {TelephonePipe} from "../../pipes/telephone.pipe";
import {ConsentPipe, ConsentPipeCorrectConversion} from "../../pipes/consent.pipe";
import {BooleanToStringDuePipe, BooleanToStringOrderPipe} from "../../pipes/boolean-to-string-order.pipe";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {GlobalStateService} from "../../services/global-state.service";
import {RouterTestingModule} from "@angular/router/testing";

describe('LovValuesTableComponent', () => {
  let component: LovValuesTableComponent;
  let fixture: ComponentFixture<LovValuesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, OwlDateTimeModule, OwlMomentDateTimeModule, BrowserAnimationsModule, HttpModule, RouterTestingModule ],
      declarations: [ LovValuesTableComponent, WaitingBackendComponent, NewLovValueComponent, SemaphoreComponent, ValueEditionComponent, CoinNumberInputComponent,
                      DatepickerComponent, CoinNumberInputErrorsComponent ],
      providers: [ DataService, BackendCommsService, UserFeedbackService, ToastsManager, ToastOptions, DatePipe, BooleanToStringPipe, TelephonePipe, ConsentPipe,
                   ConsentPipeCorrectConversion, BooleanToStringOrderPipe, BooleanToStringDuePipe, CiscoCommsService, GlobalStateService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LovValuesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
