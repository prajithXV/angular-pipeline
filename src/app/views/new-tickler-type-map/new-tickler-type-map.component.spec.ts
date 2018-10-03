import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { NewTicklerTypeMapComponent } from './new-tickler-type-map.component';
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
import {By} from "@angular/platform-browser";

describe('NewTicklerTypeMapComponent', () => {
  let component: NewTicklerTypeMapComponent;
  let fixture: ComponentFixture<NewTicklerTypeMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule ],
      declarations: [ NewTicklerTypeMapComponent, WaitingBackendComponent ],
      providers: [ {provide: DataService, useValue: dataServiceMock}, {provide: UserFeedbackService, useValue: userFeedbackMock}, DatePipe, BooleanToStringPipe,
                   {provide: GlobalStateService, useValue: globalStateServiceMock} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTicklerTypeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('not resolve the promise', fakeAsync(() => {

    //current tickler type (row)
    component.currentTicklerType =  new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
      true,false,false,2,"Shin", "2018-11-29T11:22:34.57");

    //tickler types
    component.ticklerTypes = dataServiceMock.ticklerType6;

    fixture.detectChanges();

    //function calls
    component.loadTicklerTypesMap();

    // tick();

    fixture.detectChanges();

    let div = fixture.debugElement.query(By.css("div")).nativeElement;

    //message expected
    expect(div.innerText).toEqual("getting tickler types map...");

    //data expected
    expect(component.pendentTicklerTypes.length).toEqual(0);
    expect(component.ticklerTypesMap).toEqual(null);
    expect(component.coreTicklerTypesMap.length).toEqual(0);
    expect(component.ticklerTypes.length).toEqual(3);

  }));

  it('resolve the promise with empty combo', fakeAsync(() => {

    //current tickler type (row)
    component.currentTicklerType =  new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
      true,false,false,2,"Shin", "2018-11-29T11:22:34.57");

    //tickler types
    component.ticklerTypes = dataServiceMock.ticklerType6;

    //spies
    let r = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(r, "getTicklerTypesMap").and.returnValue(Promise.resolve(dataServiceMock.ticklerTypeMaps2));

    fixture.detectChanges();

    //function calls
    component.loadTicklerTypesMap();

    tick();

    fixture.detectChanges();

    //data expected
    expect(component.pendentTicklerTypes.length).toEqual(0);
    expect(component.ticklerTypesMap.length).toEqual(3);
    expect(component.coreTicklerTypesMap.length).toEqual(2);
    expect(component.ticklerTypes.length).toEqual(3);

  }));

  it('resolve the promise with empty combo and 1 core tickler type map', fakeAsync(() => {

    //current tickler type (row)
    component.currentTicklerType =  new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
      true,false,false,2,"Shin", "2018-11-29T11:22:34.57");

    //tickler types
    component.ticklerTypes = dataServiceMock.ticklerType7;

    //spies
    let r = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(r, "getTicklerTypesMap").and.returnValue(Promise.resolve(dataServiceMock.ticklerTypeMaps2));

    fixture.detectChanges();

    //function calls
    component.loadTicklerTypesMap();

    tick();

    fixture.detectChanges();

    //expected data
    expect(component.pendentTicklerTypes.length).toEqual(0);
    expect(component.ticklerTypesMap.length).toEqual(3);
    expect(component.coreTicklerTypesMap.length).toEqual(1);
    expect(component.ticklerTypes.length).toEqual(3);

  }));

  it('resolve the promise with not empty combo and empty tickler type map', fakeAsync(() => {

    //current tickler type (row)
    component.currentTicklerType =  new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
      true,false,false,2,"Shin", "2018-11-29T11:22:34.57");

    //tickler types
    component.ticklerTypes = dataServiceMock.ticklerType7;

    //spies
    let r = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(r, "getTicklerTypesMap").and.returnValue(Promise.resolve([]));

    fixture.detectChanges();

    //function calls
    component.loadTicklerTypesMap();

    tick();

    fixture.detectChanges();

    //expected message (current maps)
    let span = fixture.debugElement.queryAll(By.css("span")).map(e=>e.nativeElement);

    expect(span[0].innerText).toEqual("No data found.");

    //expected data
    expect(component.pendentTicklerTypes.length).toEqual(1);
    expect(component.ticklerTypesMap.length).toEqual(0);
    expect(component.coreTicklerTypesMap.length).toEqual(0);
    expect(component.ticklerTypes.length).toEqual(3);

  }));

  it('resolve the promise with no core data', fakeAsync(() => {

    //current tickler type (row)
    component.currentTicklerType =  new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
      false,false,false,2,"Shin", "2018-11-29T11:22:34.57");

    //tickler types
    component.ticklerTypes = dataServiceMock.ticklerType5;

    //spies
    let r = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(r, "getTicklerTypesMap").and.returnValue(Promise.resolve(dataServiceMock.ticklerTypeMaps2));

    fixture.detectChanges();

    //function calls
    component.loadTicklerTypesMap();

    tick();

    fixture.detectChanges();

    let span = fixture.debugElement.queryAll(By.css("span")).map(e=>e.nativeElement);

    //expected data
    expect(component.pendentTicklerTypes.length).toEqual(1);
    expect(component.ticklerTypes.length).toEqual(4);
    expect(component.ticklerTypesMap.length).toEqual(3);

    //current ticklerTypeMaps (only show the core maps): there are data but current tickler type is not core
    expect(component.coreTicklerTypesMap.length).toEqual(2);

    //expected message when current tickler type is no core
    expect(span[0].innerText).toEqual("No data found.");

  }));

  it('resolve the promise with empty combo and empty tickler type map', fakeAsync(() => {

    //current tickler type (row)
    component.currentTicklerType =  new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
      true,false,false,2,"Shin", "2018-11-29T11:22:34.57");

    //tickler types
    component.ticklerTypes = dataServiceMock.ticklerType7;

    //spies
    let r = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(r, "getTicklerTypesMap").and.returnValue(Promise.resolve([]));

    fixture.detectChanges();

    //function calls
    component.loadTicklerTypesMap();

    tick();

    //when combo is empty
    component.pendentTicklerTypes = [];

    fixture.detectChanges();

    let span = fixture.debugElement.queryAll(By.css("span")).map(e=>e.nativeElement);

    //expected message (current maps)
    expect(span[0].innerText).toEqual("No data found.");

    //expected data
    expect(component.pendentTicklerTypes.length).toEqual(0);
    expect(component.ticklerTypesMap.length).toEqual(0);
    expect(component.coreTicklerTypesMap.length).toEqual(0);
    expect(component.ticklerTypes.length).toEqual(3);

  }));

  it('resolve the promise with core data', fakeAsync(() => {

    //current tickler type (row)
    component.currentTicklerType =  new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
      true,false,false,2,"Shin", "2018-11-29T11:22:34.57");

    //tickler types
    component.ticklerTypes = dataServiceMock.ticklerType5;

    //spies
    let r = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(r, "getTicklerTypesMap").and.returnValue(Promise.resolve(dataServiceMock.ticklerTypeMaps2));

    fixture.detectChanges();

    //function calls
    component.loadTicklerTypesMap();

    tick();

    fixture.detectChanges();

    //combo
    expect(component.pendentTicklerTypes[0].id).toEqual(4);
    expect(component.pendentTicklerTypes[0].ticklerCode).toEqual("CUSTOMER4");
    expect(component.pendentTicklerTypes[0].ticklerName).toEqual("Customer4");
    expect(component.pendentTicklerTypes[0].isCore).toEqual(true);

    //tickler types
    expect(component.ticklerTypes[0].id).toEqual(1);
    expect(component.ticklerTypes[0].ticklerCode).toEqual("CUSTOMER1");
    expect(component.ticklerTypes[0].ticklerName).toEqual("Customer1");
    expect(component.ticklerTypes[0].activeFlag).toEqual(true);
    expect(component.ticklerTypes[0].isCore).toEqual(true);


    expect(component.ticklerTypes[1].id).toEqual(2);
    expect(component.ticklerTypes[1].ticklerCode).toEqual("CUSTOMER2");
    expect(component.ticklerTypes[1].ticklerName).toEqual("Customer2");
    expect(component.ticklerTypes[1].activeFlag).toEqual(true);
    expect(component.ticklerTypes[1].isCore).toEqual(true);

    expect(component.ticklerTypes[2].id).toEqual(4);
    expect(component.ticklerTypes[2].ticklerCode).toEqual("CUSTOMER4");
    expect(component.ticklerTypes[2].ticklerName).toEqual("Customer4");
    expect(component.ticklerTypes[2].activeFlag).toEqual(true);
    expect(component.ticklerTypes[2].isCore).toEqual(true);

    expect(component.ticklerTypes[3].id).toEqual(5);
    expect(component.ticklerTypes[3].ticklerCode).toEqual("CUSTOMER5");
    expect(component.ticklerTypes[3].ticklerName).toEqual("Customer5");
    expect(component.ticklerTypes[3].activeFlag).toEqual(true);
    expect(component.ticklerTypes[3].isCore).toEqual(true);

    //ticklerTypesMap
    expect(component.ticklerTypesMap[0].id).toEqual(1);
    expect(component.ticklerTypesMap[0].ticklerFromId).toEqual(1);
    expect(component.ticklerTypesMap[0].ticklerFromName).toEqual("Customer1");
    expect(component.ticklerTypesMap[0].ticklerToCode).toEqual("CUSTOMER2");
    expect(component.ticklerTypesMap[0].ticklerToId).toEqual(2);

    expect(component.ticklerTypesMap[1].id).toEqual(2);
    expect(component.ticklerTypesMap[1].ticklerFromId).toEqual(2);
    expect(component.ticklerTypesMap[1].ticklerFromName).toEqual("Customer2");
    expect(component.ticklerTypesMap[1].ticklerToCode).toEqual("CUSTOMER3");
    expect(component.ticklerTypesMap[1].ticklerToId).toEqual(3);

    expect(component.ticklerTypesMap[2].id).toEqual(5);
    expect(component.ticklerTypesMap[2].ticklerFromId).toEqual(2);
    expect(component.ticklerTypesMap[2].ticklerFromName).toEqual("Customer2");
    expect(component.ticklerTypesMap[2].ticklerToCode).toEqual("CUSTOMER5");
    expect(component.ticklerTypesMap[2].ticklerToId).toEqual(5);

    //current ticklerTypeMaps (only show the core maps
    expect(component.coreTicklerTypesMap[0].id).toEqual(1);
    expect(component.coreTicklerTypesMap[0].ticklerFromId).toEqual(1);
    expect(component.coreTicklerTypesMap[0].ticklerFromName).toEqual("Customer1");
    expect(component.coreTicklerTypesMap[0].ticklerToId).toEqual(2);
    expect(component.coreTicklerTypesMap[0].ticklerToCode).toEqual("CUSTOMER2");
    expect(component.coreTicklerTypesMap[0].ticklerToName).toEqual("Customer2");

    expect(component.coreTicklerTypesMap[1].id).toEqual(5);
    expect(component.coreTicklerTypesMap[1].ticklerFromId).toEqual(2);
    expect(component.coreTicklerTypesMap[1].ticklerFromName).toEqual("Customer2");
    expect(component.coreTicklerTypesMap[1].ticklerToId).toEqual(5);
    expect(component.coreTicklerTypesMap[1].ticklerToCode).toEqual("CUSTOMER5");
    expect(component.coreTicklerTypesMap[1].ticklerToName).toEqual("Customer5");

  }));

  it('add tickler type map', fakeAsync(() => {

    //current tickler type (row)
    component.currentTicklerType =  new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
      true,false,false,2,"Shin", "2018-11-29T11:22:34.57");

    //tickler types
    component.ticklerTypes = dataServiceMock.ticklerType5;

    //spies
    let r = fixture.debugElement.injector.get(DataService);
    let u = fixture.debugElement.injector.get(UserFeedbackService);

    let spy = spyOn(r, "getTicklerTypesMap").and.returnValue(Promise.resolve(dataServiceMock.ticklerTypeMaps2));
    let spy2 = spyOn(r, "addTicklerTypeMap").and.returnValue(Promise.resolve(200));
    let spy3 = spyOn(u, "handleSuccess").and.returnValue(Promise.resolve(200));

    fixture.detectChanges();

    //function calls
    component.loadTicklerTypesMap();

    tick();

    fixture.detectChanges();

    let i = fixture.debugElement.queryAll(By.css("i")).map(e=>e.nativeElement);

    //click on add button
    let addButton = i[0];
    addButton.click();

    tick();

    fixture.detectChanges();

    //current tickler type: FROM
    expect(spy2.calls.first().args[0].id).toEqual(1);
    expect(spy2.calls.first().args[0].ticklerCode).toEqual("CUSTOMER1");
    expect(spy2.calls.first().args[0].ticklerName).toEqual("Customer1");
    expect(spy2.calls.first().args[0].isCore).toEqual(true);

    //tickler type selected (combo): TO
    expect(spy2.calls.first().args[1].id).toEqual(4);
    expect(spy2.calls.first().args[1].ticklerCode).toEqual("CUSTOMER4");
    expect(spy2.calls.first().args[1].ticklerName).toEqual("Customer4");
    expect(spy2.calls.first().args[1].isCore).toEqual(true);

    //logged agent
    expect(spy2.calls.first().args[2].account).toEqual("account1");

    //success message
    expect(spy3.calls.first().args[0]).toEqual("Tickler type map added");

  }));

  it('delete tickler type map', fakeAsync(() => {

    //current tickler type (row)
    component.currentTicklerType =  new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
      true,false,false,2,"Shin", "2018-11-29T11:22:34.57");

    //tickler types
    component.ticklerTypes = dataServiceMock.ticklerType5;

    //spies
    let r = fixture.debugElement.injector.get(DataService);
    let u = fixture.debugElement.injector.get(UserFeedbackService);

    let spy = spyOn(r, "getTicklerTypesMap").and.returnValue(Promise.resolve(dataServiceMock.ticklerTypeMaps2));
    let spy2 = spyOn(r, "deleteTicklerTypeMap").and.returnValue(Promise.resolve(200));
    let spy3 = spyOn(u, "handleSuccess").and.returnValue(Promise.resolve(200));

    fixture.detectChanges();

    //function calls
    component.loadTicklerTypesMap();

    tick();

    fixture.detectChanges();

    let i = fixture.debugElement.queryAll(By.css("i")).map(e=>e.nativeElement);

    //click on delete button
    let addButton = i[2];
    addButton.click();

    tick();

    fixture.detectChanges();

    //current tickler type map
    expect(spy2.calls.first().args[0].id).toEqual(5);
    expect(spy2.calls.first().args[0].ticklerFromId).toEqual(2);
    expect(spy2.calls.first().args[0].ticklerFromName).toEqual("Customer2");
    expect(spy2.calls.first().args[0].ticklerToCode).toEqual("CUSTOMER5");
    expect(spy2.calls.first().args[0].ticklerToName).toEqual("Customer5");
    expect(spy2.calls.first().args[0].ticklerToId).toEqual(5);

    //success message
    expect(spy3.calls.first().args[0]).toEqual("Tickler type map deleted");

  }));

});
