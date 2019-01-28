import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEmailModalComponent } from './customer-email-modal.component';
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {FormsModule} from "@angular/forms";
import {CustomerEmailDetailComponent} from "../customer-email-detail/customer-email-detail.component";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {ConfirmationModalComponent} from "../confirmation-modal/confirmation-modal.component";
import {DataService} from "../../services/data.service";
import {BackendCommsService} from "../../services/backend-comms.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {ToastrModule} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {fakeBackendProvider} from "../../services/mocks/fake-backend-factory";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {GlobalStateService} from "../../services/global-state.service";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

describe('CustomerEmailModalComponent', () => {
  let component: CustomerEmailModalComponent;
  let fixture: ComponentFixture<CustomerEmailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, HttpClientTestingModule, ToastrModule.forRoot(), NgbModule.forRoot()],
      declarations: [ CustomerEmailModalComponent, CoinDateTransformPipe, CustomerEmailDetailComponent, WaitingBackendComponent, ConfirmationModalComponent],
      providers: [DataService, { provide:BackendCommsService, useValue: fakeBackendProvider}, UserFeedbackService, DatePipe, CiscoCommsService, { provide:GlobalStateService, useValue: globalStateServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEmailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
