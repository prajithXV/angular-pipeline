import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCampaignListRecordsComponent } from './manage-campaigns-list-records.component';
import {FormsModule} from "@angular/forms";
import {PaginatorComponent} from "../paginator/paginator.component";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {DataService} from "../../services/data.service";
import {BackendCommsService} from "../../services/backend-comms.service";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {DatePipe} from "@angular/common";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {HeaderSorterComponent} from "../header-sorter/header-sorter.component";
import {OrderByPipe} from "../../pipes/order-by.pipe";
import {BooleanToStringDuePipe, BooleanToStringOrderPipe} from "../../pipes/boolean-to-string-order.pipe";
import {ConsentPipeCorrectConversion} from "../../pipes/consent.pipe";
import {TelephonePipe} from "../../pipes/telephone.pipe";
import {IboxtoolsComponent} from "../../components/common/iboxtools/iboxtools.component";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule, ToastrService} from "ngx-toastr";

describe('ManageCampaignListRecordsComponent', () => {
  let component: ManageCampaignListRecordsComponent;
  let fixture: ComponentFixture<ManageCampaignListRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientModule, HttpClientTestingModule, ToastrModule.forRoot() ],
      declarations: [ ManageCampaignListRecordsComponent, PaginatorComponent, CoinDateTransformPipe, WaitingBackendComponent, HeaderSorterComponent,
                      OrderByPipe, IboxtoolsComponent ],
      providers: [ DataService, BackendCommsService, UserFeedbackService, DatePipe, CiscoCommsService, ToastrService,
                   BooleanToStringPipe, BooleanToStringOrderPipe, BooleanToStringDuePipe, ConsentPipeCorrectConversion, TelephonePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCampaignListRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
