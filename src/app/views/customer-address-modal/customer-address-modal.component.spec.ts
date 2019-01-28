import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddressModalComponent } from './customer-address-modal.component';
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {FormsModule} from "@angular/forms";
import {CustomerAddressDetailComponent} from "../customer-address-detail/customer-address-detail.component";
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

describe('CustomerAddressModalComponent', () => {
  let component: CustomerAddressModalComponent;
  let fixture: ComponentFixture<CustomerAddressModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, HttpClientTestingModule, ToastrModule.forRoot(), NgbModule.forRoot()],
      declarations: [ CustomerAddressModalComponent, CoinDateTransformPipe, CustomerAddressDetailComponent, WaitingBackendComponent,
        ConfirmationModalComponent ],
      providers: [ DataService, { provide: BackendCommsService, useValue: fakeBackendProvider }, UserFeedbackService, DatePipe, CiscoCommsService, { provide: GlobalStateService, useValue: globalStateServiceMock } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAddressModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
