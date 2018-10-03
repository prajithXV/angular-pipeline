import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullSearchComponent } from './full-search.component';
import {NextCallComponent} from "../next-call/next-call.component";
import {SearchCriteriaComponent} from "../search-criteria/search-criteria.component";
import {NgbTabsetConfig, NgbTabsetModule} from "@ng-bootstrap/ng-bootstrap";
import {SearchCaseCriteriaComponent} from "../search-case-criteria/search-case-criteria.component";
import {FormsModule} from "@angular/forms";
import {ComponentLoaderFactory, PopoverConfig, PopoverModule, PositioningService} from "ngx-bootstrap";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {GlobalStateService} from "../../services/global-state.service";
import {DataService} from "../../services/data.service";
import {BackendCommsService} from "../../services/backend-comms.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {ToastOptions, ToastsManager} from "ng2-toastr";
import {DatePipe} from "@angular/common";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {TelephonePipe} from "../../pipes/telephone.pipe";
import {ConsentPipeCorrectConversion} from "../../pipes/consent.pipe";
import {BooleanToStringDuePipe, BooleanToStringOrderPipe} from "../../pipes/boolean-to-string-order.pipe";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {RouterTestingModule} from "@angular/router/testing";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {TemporalStateServiceService} from "../../services/temporal-state-service.service";
import {FilterCodeToNamePipe} from "../../pipes/filter-code-to-name.pipe";

describe('FullSearchComponent', () => {
  let component: FullSearchComponent;
  let fixture: ComponentFixture<FullSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbTabsetModule, FormsModule, PopoverModule, HttpModule, RouterTestingModule, NgbTabsetModule ],
      declarations: [ FullSearchComponent, NextCallComponent, SearchCriteriaComponent, SearchCaseCriteriaComponent, WaitingBackendComponent, FilterCodeToNamePipe ],
      providers: [ {provide: GlobalStateService, useValue: globalStateServiceMock }, { provide: DataService, useValue: dataServiceMock }, BackendCommsService, UserFeedbackService, ToastsManager, ToastOptions, DatePipe, BooleanToStringPipe,
                   TelephonePipe , ConsentPipeCorrectConversion, BooleanToStringOrderPipe, BooleanToStringDuePipe, CiscoCommsService, NgbTabsetConfig, TemporalStateServiceService, PopoverConfig, ComponentLoaderFactory, PositioningService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
