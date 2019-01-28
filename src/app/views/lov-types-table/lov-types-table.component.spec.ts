import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LovTypesTableComponent } from './lov-types-table.component';
import {LovValuesTableComponent} from "../lov-values-table/lov-values-table.component";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {NewLovTypeComponent} from "../new-lov-type/new-lov-type.component";
import {AttributeTypeToStringPipe} from "../../pipes/attribute-type-to-string.pipe";
import {SemaphoreComponent} from "../semaphore/semaphore.component";
import {NewLovValueComponent} from "../new-lov-value/new-lov-value.component";
import {FormsModule} from "@angular/forms";
import {ValueEditionComponent} from "../value-edition/value-edition.component";
import {CoinNumberInputErrorsComponent} from "../coin-number-input-errors/coin-number-input-errors.component";
import {CoinNumberInputComponent} from "../coin-number-input/coin-number-input.component";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {OwlDateTimeModule} from "ng-pick-datetime";
import {OwlMomentDateTimeModule} from "ng-pick-datetime-moment";
import {DataService} from "../../services/data.service";
import {BackendCommsService} from "../../services/backend-comms.service";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {DatePipe} from "@angular/common";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {TelephonePipe} from "../../pipes/telephone.pipe";
import {ConsentPipeCorrectConversion} from "../../pipes/consent.pipe";
import {BooleanToStringDuePipe, BooleanToStringOrderPipe} from "../../pipes/boolean-to-string-order.pipe";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {GlobalStateService} from "../../services/global-state.service";
import {RouterTestingModule} from "@angular/router/testing";
import {LovTypeToStringPipe} from "../../pipes/lov-type-to-string.pipe";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";

describe('LovTypesTableComponent', () => {
  let component: LovTypesTableComponent;
  let fixture: ComponentFixture<LovTypesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, OwlDateTimeModule, OwlMomentDateTimeModule, BrowserAnimationsModule, HttpClientModule, HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot() ],
      declarations: [ LovTypesTableComponent, LovValuesTableComponent, WaitingBackendComponent, NewLovTypeComponent, AttributeTypeToStringPipe, SemaphoreComponent,
                      NewLovValueComponent, ValueEditionComponent, CoinNumberInputComponent, DatepickerComponent, CoinNumberInputErrorsComponent, LovTypeToStringPipe ],
      providers: [ DataService, BackendCommsService, UserFeedbackService, DatePipe, BooleanToStringPipe, TelephonePipe, ConsentPipeCorrectConversion, BooleanToStringOrderPipe,
                   BooleanToStringDuePipe, CiscoCommsService, GlobalStateService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LovTypesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
