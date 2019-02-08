import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsTableComponent } from './accounts-table.component';
import {CoinCurrencyPipe} from "../../pipes/coin-currency.pipe";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {RouterTestingModule} from "@angular/router/testing";
import {NewProcessCaseComponent} from "../new-process-case/new-process-case";
import {FormsModule} from "@angular/forms";
import {NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgbModalStack} from "@ng-bootstrap/ng-bootstrap/modal/modal-stack";
import {GlobalStateService} from "../../services/global-state.service";
import {DataService} from "../../services/data.service";
import {BackendCommsService} from "../../services/backend-comms.service";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {APP_BASE_HREF, DatePipe, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {BooleanToStringOrderPipe, BooleanToStringDuePipe} from "../../pipes/boolean-to-string-order.pipe";
import {ConsentPipeCorrectConversion} from "../../pipes/consent.pipe";
import {TemporalStateServiceService} from "../../services/temporal-state-service.service";
import {TelephonePipe} from "../../pipes/telephone.pipe";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";

describe('AccountsTableComponent', () => {
  let component: AccountsTableComponent;
  let fixture: ComponentFixture<AccountsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ RouterTestingModule, FormsModule, NgbModule, HttpClientModule, HttpClientTestingModule, ToastrModule.forRoot() ],
      declarations: [ AccountsTableComponent, CoinCurrencyPipe, WaitingBackendComponent, NewProcessCaseComponent ],
      providers: [ NgbModal, NgbModalStack, GlobalStateService, DataService, BackendCommsService, UserFeedbackService, DatePipe,
                   BooleanToStringPipe, CiscoCommsService, BooleanToStringOrderPipe, ConsentPipeCorrectConversion, BooleanToStringDuePipe,
                   TemporalStateServiceService, Location, { provide: LocationStrategy, useClass: PathLocationStrategy }, { provide: APP_BASE_HREF, useValue: '/my/app'},
                   TelephonePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
