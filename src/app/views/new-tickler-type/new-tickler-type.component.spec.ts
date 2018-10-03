import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { NewTicklerTypeComponent } from './new-tickler-type.component';
import {FormsModule} from "@angular/forms";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {DataService} from "../../services/data.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {DatePipe} from "@angular/common";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {GlobalStateService} from "../../services/global-state.service";
import {RouterTestingModule} from "@angular/router/testing";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {TicklerType} from "../../models/tickler-types";
import {TicklerTypeModel} from "../../models/tickler-type-model";
import {TicklerProcess} from "../../models/tickler-processes";

describe('NewTicklerTypeComponent', () => {
  let component: NewTicklerTypeComponent;
  let fixture: ComponentFixture<NewTicklerTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule ],
      declarations: [ NewTicklerTypeComponent, WaitingBackendComponent ],
      providers: [ { provide: DataService, useValue: dataServiceMock }, { provide: UserFeedbackService, useValue: userFeedbackMock }, DatePipe, BooleanToStringPipe,
                   { provide: GlobalStateService, useValue: globalStateServiceMock } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTicklerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('update a tickler type', fakeAsync(() => {

    component.currentTicklerType =
      new TicklerType(1, "CUSTOMER1", "Customer1", "current description", true,
        7,5, false,true,false,true,2, "Hak", "", "", "");

    let model = new TicklerTypeModel();
    model.ticklerCode = "CUSTOMER2";
    model.ticklerName = "Customer2";
    model.ticklerDescription = "updated description";
    model.activeFlag = false;
    model.isCore = false;
    model.isBase = false;
    model.isCloseable = false;
    model.actionRequired = true;
    model.orderByCode = 2;
    model.followUpDays = 7;

    let r = fixture.debugElement.injector.get(DataService);
    let u = fixture.debugElement.injector.get(UserFeedbackService);

    let spy = spyOn(r, "updateTicklerType").and.returnValue(Promise.resolve(200));
    let spy2 = spyOn(u, "handleSuccess").and.returnValue(Promise.resolve(200));

    fixture.detectChanges();

    component.update(model);

    tick();

    fixture.detectChanges();

    //tickler type
    expect(spy.calls.first().args[0]).toBeTruthy();

    //model
    expect(spy.calls.first().args[1]).toBeTruthy();

    //logged agent
    expect(spy.calls.first().args[2]).toBeTruthy();

    //success updated
    expect(spy2.calls.first().args[0]).toEqual("Tickler type updated");

  }));


  it('error updating a tickler type', fakeAsync(() => {

    component.currentTicklerType =
      new TicklerType(1, "CUSTOMER1", "Customer1", "current description", true,
        7,5, false,true,false,true,2, "Hak", "", "", "");

    let model = new TicklerTypeModel();
    model.ticklerCode = "CUSTOMER2";
    model.ticklerName = "Customer2";
    model.ticklerDescription = "updated description";
    model.activeFlag = false;
    model.isCore = false;
    model.isBase = false;
    model.isCloseable = false;
    model.actionRequired = true;
    model.orderByCode = 2;
    model.followUpDays = 7;

    let r = fixture.debugElement.injector.get(DataService);
    let u = fixture.debugElement.injector.get(UserFeedbackService);

    let spy = spyOn(r, "updateTicklerType").and.returnValue(Promise.reject(200));
    let spy2 = spyOn(u, "handleError").and.returnValue(Promise.resolve(200));

    fixture.detectChanges();

    component.update(model);

    tick();

    fixture.detectChanges();

    //tickler type
    expect(spy.calls.first().args[0]).toBeTruthy();

    //model
    expect(spy.calls.first().args[1]).toBeTruthy();

    //logged agent
    expect(spy.calls.first().args[2]).toBeTruthy();

    //success updated
    expect(spy2.calls.first().args[0]).toEqual("Error updating tickler type");

  }));



  it('add a tickler type', fakeAsync(() => {

    component.currentProcess = new TicklerProcess(1, "");

    let model = new TicklerTypeModel();
    model.ticklerCode = "CUSTOMER1";
    model.ticklerName = "Customer1";
    model.ticklerDescription = "new  description";
    model.activeFlag = false;
    model.isCore = false;
    model.isBase = false;
    model.isCloseable = false;
    model.actionRequired = true;
    model.orderByCode = 2;
    model.followUpDays = 7;

    let r = fixture.debugElement.injector.get(DataService);
    let u = fixture.debugElement.injector.get(UserFeedbackService);

    let spy = spyOn(r, "newTicklerType").and.returnValue(Promise.resolve(200));
    let spy2 = spyOn(u, "handleSuccess").and.returnValue(Promise.resolve(200));

    fixture.detectChanges();

    component.add(model);

    tick();

    fixture.detectChanges();

    //tickler type
    expect(spy.calls.first().args[0]).toBeTruthy();

    //model
    expect(spy.calls.first().args[1]).toBeTruthy();

    //logged agent
    expect(spy.calls.first().args[2]).toBeTruthy();

    //success added
    expect(spy2.calls.first().args[0]).toEqual("Tickler type added");

  }));



  it('error adding a tickler type', fakeAsync(() => {

    component.currentProcess = new TicklerProcess(1, "");

    let model = new TicklerTypeModel();
    model.ticklerCode = "CUSTOMER1";
    model.ticklerName = "Customer1";
    model.ticklerDescription = "new  description";
    model.activeFlag = false;
    model.isCore = false;
    model.isBase = false;
    model.isCloseable = false;
    model.actionRequired = true;
    model.orderByCode = 2;
    model.followUpDays = 7;

    let r = fixture.debugElement.injector.get(DataService);
    let u = fixture.debugElement.injector.get(UserFeedbackService);

    let spy = spyOn(r, "newTicklerType").and.returnValue(Promise.reject(200));
    let spy2 = spyOn(u, "handleError").and.returnValue(Promise.resolve(200));

    fixture.detectChanges();

    component.add(model);

    tick();

    fixture.detectChanges();

    //tickler type
    expect(spy.calls.first().args[0]).toBeTruthy();

    //model
    expect(spy.calls.first().args[1]).toBeTruthy();

    //logged agent
    expect(spy.calls.first().args[2]).toBeTruthy();

    //success added
    expect(spy2.calls.first().args[0]).toEqual("Error adding new tickler type");

  }));


});
