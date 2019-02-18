import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessCaseTicklerTableComponent } from './process-case-tickler-table.component';
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {NewTicklerCaseComponent} from "../new-tickler-case/new-tickler-case.component";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {FormsModule} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {BackendCommsService} from "../../services/backend-comms.service";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {DatePipe} from "@angular/common";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {GlobalStateService} from "../../services/global-state.service";
import {RouterTestingModule} from "@angular/router/testing";
import {CampaignAttributeEditionComponent} from "../campaign-attribute-edition/campaign-attribute-edition.component";
import {CoinNumberInputComponent} from "../coin-number-input/coin-number-input.component";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {CoinNumberInputErrorsComponent} from "../coin-number-input-errors/coin-number-input-errors.component";
import {OwlDateTimeModule} from "ng-pick-datetime";
import {OwlMomentDateTimeModule} from "ng-pick-datetime-moment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BooleanToStringDuePipe, BooleanToStringOrderPipe} from "../../pipes/boolean-to-string-order.pipe";
import {ConsentPipeCorrectConversion} from "../../pipes/consent.pipe";
import {TelephonePipe} from "../../pipes/telephone.pipe";
import {ConfirmationModalComponent} from "../confirmation-modal/confirmation-modal.component";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {ComponentLoaderFactory, PopoverConfig, PopoverModule, PositioningService} from "ngx-bootstrap";

describe('ProcessCaseTicklerTableComponent', () => {
  let component: ProcessCaseTicklerTableComponent;
  let fixture: ComponentFixture<ProcessCaseTicklerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientModule, HttpClientTestingModule, RouterTestingModule,  OwlDateTimeModule, OwlMomentDateTimeModule, BrowserAnimationsModule, ToastrModule.forRoot(), PopoverModule ],
      declarations: [ ProcessCaseTicklerTableComponent, WaitingBackendComponent, NewTicklerCaseComponent, CoinDateTransformPipe, CampaignAttributeEditionComponent, CoinNumberInputComponent, DatepickerComponent,
                      CoinNumberInputErrorsComponent, ConfirmationModalComponent ],
      providers: [ DataService, BackendCommsService, UserFeedbackService, DatePipe, BooleanToStringPipe, CiscoCommsService, ComponentLoaderFactory, PopoverConfig, PositioningService,
                   GlobalStateService, BooleanToStringOrderPipe, BooleanToStringDuePipe, ConsentPipeCorrectConversion, TelephonePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessCaseTicklerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
