import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCaseCriteriaComponent } from './search-case-criteria.component';
import {FormsModule} from "@angular/forms";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {DataService} from "../../services/data.service";
import {BackendCommsService} from "../../services/backend-comms.service";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {DatePipe} from "@angular/common";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {BooleanToStringDuePipe, BooleanToStringOrderPipe} from "../../pipes/boolean-to-string-order.pipe";
import {ConsentPipeCorrectConversion} from "../../pipes/consent.pipe";
import {TelephonePipe} from "../../pipes/telephone.pipe";
import {FilterCodeToNamePipe} from "../../pipes/filter-code-to-name.pipe";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";

describe('SearchCaseCriteriaComponent', () => {
  let component: SearchCaseCriteriaComponent;
  let fixture: ComponentFixture<SearchCaseCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientModule, HttpClientTestingModule, ToastrModule.forRoot() ],
      declarations: [ SearchCaseCriteriaComponent, WaitingBackendComponent, FilterCodeToNamePipe ],
      providers: [ DataService, BackendCommsService, UserFeedbackService, DatePipe, BooleanToStringPipe,
                   CiscoCommsService, BooleanToStringOrderPipe, BooleanToStringDuePipe, ConsentPipeCorrectConversion, TelephonePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCaseCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
