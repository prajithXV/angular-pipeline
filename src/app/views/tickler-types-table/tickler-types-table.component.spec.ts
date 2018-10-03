import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { TicklerTypesTableComponent } from './tickler-types-table.component';
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {NewTicklerTypeComponent} from "../new-tickler-type/new-tickler-type.component";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {FormsModule} from "@angular/forms";
import {SemaphoreComponent} from "../semaphore/semaphore.component";
import {NewTicklerAttributeMapComponent} from "../new-tickler-attribute-map/new-tickler-attribute-map.component";
import {NewTicklerTypeMapComponent} from "../new-tickler-type-map/new-tickler-type-map.component";
import {AttributeTypeToStringPipe} from "../../pipes/attribute-type-to-string.pipe";
import {TickCrossComponent} from "../tick-cross/tick-cross.component";
import {DataService} from "../../services/data.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {DatePipe} from "@angular/common";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgbModalStack} from "@ng-bootstrap/ng-bootstrap/modal/modal-stack";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {TicklerType} from "../../models/tickler-types";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {TicklerProcess} from "../../models/tickler-processes";

describe('TicklerTypesTableComponent', () => {
  let component: TicklerTypesTableComponent;
  let fixture: ComponentFixture<TicklerTypesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, NgbModule ],
      declarations: [ TicklerTypesTableComponent, WaitingBackendComponent, NewTicklerTypeComponent, CoinDateTransformPipe, SemaphoreComponent, NewTicklerAttributeMapComponent, NewTicklerTypeMapComponent,
                      AttributeTypeToStringPipe, TickCrossComponent ],
      providers: [ { provide: DataService, useValue: dataServiceMock }, {provide: UserFeedbackService, useValue: userFeedbackMock }, DatePipe, BooleanToStringPipe, NgbModalStack ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicklerTypesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('remove tickler type', fakeAsync(() => {

    let ticklerType = new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
      true,false,false,2,"Shin", "2018-11-29T11:22:34.57");

    component.ticklerTypes = dataServiceMock.ticklerType;
    component.currentProcess = new TicklerProcess();


    let d = fixture.debugElement.injector.get(DataService);
    let u = fixture.debugElement.injector.get(UserFeedbackService);

    let spy = spyOn(d, "removeTicklerType").and.returnValue(Promise.resolve(200));
    let spy2 = spyOn(u, "handleSuccess").and.returnValue(Promise.resolve(200));

    fixture.detectChanges();

    component.removeTicklerType(ticklerType);

    tick();

    fixture.detectChanges();

    //tickler type argument on the function
    expect(spy.calls.first().args[0]).toBeTruthy();

    //success delete
    expect(spy2.calls.first().args[0]).toEqual("Tickler type removed");

  }));

});
