import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignListAccountsTableComponent } from './campaign-list-accounts-table.component';
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {PaginatorComponent} from "../paginator/paginator.component";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {RouterTestingModule} from "@angular/router/testing";
import {NewProcessCaseComponent} from "../new-process-case/new-process-case";
import {FormsModule} from "@angular/forms";
import {NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgbModalStack} from "@ng-bootstrap/ng-bootstrap/modal/modal-stack";
import {DataService} from "../../services/data.service";
import {BackendCommsService} from "../../services/backend-comms.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {ToastOptions, ToastsManager} from "ng2-toastr";
import {APP_BASE_HREF, DatePipe, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {GlobalStateService} from "../../services/global-state.service";
import {BooleanToStringDuePipe, BooleanToStringOrderPipe} from "../../pipes/boolean-to-string-order.pipe";
import {ConsentPipeCorrectConversion} from "../../pipes/consent.pipe";
import {TemporalStateServiceService} from "../../services/temporal-state-service.service";
import {TelephonePipe} from "../../pipes/telephone.pipe";

describe('CampaignListAccountsTableComponent', () => {
  let component: CampaignListAccountsTableComponent;
  let fixture: ComponentFixture<CampaignListAccountsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ RouterTestingModule, FormsModule, NgbModule, HttpModule ],
      declarations: [ CampaignListAccountsTableComponent, WaitingBackendComponent, PaginatorComponent, CoinDateTransformPipe, NewProcessCaseComponent ],
      providers: [ NgbModal, NgbModalStack, DataService, BackendCommsService, UserFeedbackService, ToastsManager, ToastOptions, DatePipe, BooleanToStringPipe,
                   CiscoCommsService, GlobalStateService, BooleanToStringOrderPipe, BooleanToStringDuePipe, ConsentPipeCorrectConversion, TemporalStateServiceService,
                   Location, { provide: LocationStrategy, useClass: PathLocationStrategy },
                  { provide: APP_BASE_HREF, useValue: '/my/app'}, TelephonePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignListAccountsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
