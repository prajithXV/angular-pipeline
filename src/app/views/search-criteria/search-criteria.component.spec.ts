import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCriteriaComponent } from './search-criteria.component';
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {FilterCodeToNamePipe} from "../../pipes/filter-code-to-name.pipe";
import {DataService} from "../../services/data.service";
import {BackendCommsService} from "../../services/backend-comms.service";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {DatePipe} from "@angular/common";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {TelephonePipe} from "../../pipes/telephone.pipe";
import {ConsentPipeCorrectConversion} from "../../pipes/consent.pipe";
import {BooleanToStringDuePipe, BooleanToStringOrderPipe} from "../../pipes/boolean-to-string-order.pipe";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";

describe('SearchCriteriaComponent', () => {
  let component: SearchCriteriaComponent;
  let fixture: ComponentFixture<SearchCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule, HttpClientModule, HttpClientTestingModule, ToastrModule.forRoot() ],
      declarations: [ SearchCriteriaComponent, WaitingBackendComponent, FilterCodeToNamePipe ],
      providers: [ DataService, BackendCommsService, UserFeedbackService, DatePipe, BooleanToStringPipe,
                   TelephonePipe, ConsentPipeCorrectConversion, BooleanToStringOrderPipe, BooleanToStringDuePipe, CiscoCommsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
