import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPhoneModalComponent } from './customer-phone-modal.component';
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {FormsModule} from "@angular/forms";
import {TelephonePipe} from "../../pipes/telephone.pipe";
import {TickCrossComponent} from "../tick-cross/tick-cross.component";
import {CustomerPhoneDetailComponent} from "../customer-phone-detail/customer-phone-detail.component";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {ConfirmationModalComponent} from "../confirmation-modal/confirmation-modal.component";
import {DataService} from "../../services/data.service";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {BackendCommsService} from "../../services/backend-comms.service";
import {fakeBackendProvider} from "../../services/mocks/fake-backend-factory";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {ToastrModule} from "ngx-toastr";
import {GlobalStateService} from "../../services/global-state.service";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

describe('CustomerPhoneModalComponent', () => {
  let component: CustomerPhoneModalComponent;
  let fixture: ComponentFixture<CustomerPhoneModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, HttpClientTestingModule, ToastrModule.forRoot(), NgbModule.forRoot()],
      declarations: [ CustomerPhoneModalComponent, CoinDateTransformPipe, TelephonePipe, TickCrossComponent, CustomerPhoneDetailComponent, WaitingBackendComponent, ConfirmationModalComponent],
      providers: [{ provide: DataService, useValue: dataServiceMock}, { provide: BackendCommsService, useValue: fakeBackendProvider }, CiscoCommsService, UserFeedbackService, { provide: GlobalStateService, useValue: globalStateServiceMock }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPhoneModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
