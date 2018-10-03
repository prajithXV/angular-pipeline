import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StressComponent } from './stress.component';
import {XmppdebuggerComponent} from "../xmppdebugger/xmppdebugger.component";
import {FormsModule} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {BackendCommsService} from "../../services/backend-comms.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {ToastOptions, ToastsManager} from "ng2-toastr";
import {DatePipe} from "@angular/common";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {GlobalStateService} from "../../services/global-state.service";
import {RouterTestingModule} from "@angular/router/testing";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {TicklerAttributeComponent} from "../tickler-attribute/tickler-attribute.component";
import {TicklerAttributeTableComponent} from "../tickler-attribute-table/tickler-attribute-table.component";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {NewTicklerAttributeComponent} from "../new-tickler-attribute/new-tickler-attribute.component";
import {AttributeTypeToStringPipe} from "../../pipes/attribute-type-to-string.pipe";
import {SemaphoreComponent} from "../semaphore/semaphore.component";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {BooleanToStringDuePipe, BooleanToStringOrderPipe} from "../../pipes/boolean-to-string-order.pipe";
import {ConsentPipeCorrectConversion} from "../../pipes/consent.pipe";
import {TelephonePipe} from "../../pipes/telephone.pipe";
import {PopoverModule} from "ngx-bootstrap";

describe('StressComponent', () => {
  let component: StressComponent;
  let fixture: ComponentFixture<StressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule, PopoverModule ],
      declarations: [ StressComponent, XmppdebuggerComponent, TicklerAttributeComponent, TicklerAttributeTableComponent, WaitingBackendComponent, NewTicklerAttributeComponent, AttributeTypeToStringPipe,
                      SemaphoreComponent, CoinDateTransformPipe ],
      providers: [ DataService, BackendCommsService, UserFeedbackService, ToastsManager, ToastOptions, DatePipe, CiscoCommsService, GlobalStateService,
                   BooleanToStringPipe, BooleanToStringOrderPipe, BooleanToStringDuePipe, ConsentPipeCorrectConversion, TelephonePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
