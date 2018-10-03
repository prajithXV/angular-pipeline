import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { NewTicklerAttributeMapComponent } from './new-tickler-attribute-map.component';
import {FormsModule} from "@angular/forms";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {AttributeTypeToStringPipe} from "../../pipes/attribute-type-to-string.pipe";
import {DataService} from "../../services/data.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {DatePipe} from "@angular/common";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {GlobalStateService} from "../../services/global-state.service";
import {RouterTestingModule} from "@angular/router/testing";
import {TickCrossComponent} from "../tick-cross/tick-cross.component";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {TicklerType} from "../../models/tickler-types";
import {By} from "@angular/platform-browser";

describe('NewTicklerAttributeMapComponent', () => {
  let component: NewTicklerAttributeMapComponent;
  let fixture: ComponentFixture<NewTicklerAttributeMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ FormsModule, HttpModule, RouterTestingModule ],
      declarations: [ NewTicklerAttributeMapComponent, WaitingBackendComponent, AttributeTypeToStringPipe, TickCrossComponent ],
      providers: [ { provide: DataService, useValue: dataServiceMock}, {provide: UserFeedbackService, useValue: userFeedbackMock}, DatePipe, BooleanToStringPipe,
        {provide: GlobalStateService, useValue: globalStateServiceMock} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTicklerAttributeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('not resolve the promise and search data', fakeAsync(() => {

    component.ticklerAttributes = dataServiceMock.ticklerAttribute;
    component.currentTicklerType =  new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
      true,false,false,2,"Shin", "2018-11-29T11:22:34.57");


    //spies
    let r = fixture.debugElement.injector.get(DataService);

    let spy = spyOn(r, "getTicklerAttributesMap").and.returnValue(Promise.resolve(dataServiceMock.ticklerAttributeMap));



    fixture.detectChanges();

    component.ngOnChanges({changes: component.currentTicklerType});
    component.loadTicklerAttributesMap();

    // tick();

    fixture.detectChanges();

    let div = fixture.debugElement.query(By.css("div")).nativeElement;
    expect(div.innerText).toEqual("getting tickler attributes map...");

  }));



  it('resolve the promise with empty combo and empty attribute maps', fakeAsync(() => {

    component.ticklerAttributes = dataServiceMock.ticklerAttribute2;
    component.currentTicklerType =  new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
      true,false,false,2,"Shin", "2018-11-29T11:22:34.57");


    //spies
    let r = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(r, "getTicklerAttributesMap").and.returnValue(Promise.resolve([]));

    fixture.detectChanges();

    component.ngOnChanges({changes: component.currentTicklerType});
    component.loadTicklerAttributesMap();

    tick();

    fixture.detectChanges();

    let div = fixture.debugElement.queryAll(By.css("div"));

    //no data expected
    expect(div[5].nativeElement.innerText).toEqual("No data found.");
    expect(component.pendentTicklers.length).toEqual(0);
    expect(component.ticklerAttributeMaps.length).toEqual(0);

  }));

  it('resolve the promise with empty attribute maps and not empty combo', fakeAsync(() => {

    component.ticklerAttributes = dataServiceMock.ticklerAttribute4;

    component.currentTicklerType =  new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
      true,false,false,2,"Shin", "2018-11-29T11:22:34.57");

    //spies
    let r = fixture.debugElement.injector.get(DataService);

    //attribute maps
    let spy = spyOn(r, "getTicklerAttributesMap").and.returnValue(Promise.resolve([]));

    fixture.detectChanges();

    component.ngOnChanges({changes: component.currentTicklerType});
    component.loadTicklerAttributesMap();

    tick();

    fixture.detectChanges();


    let div = fixture.debugElement.queryAll(By.css("div"));

    //attribute maps
    expect(div[5].nativeElement.innerText).toEqual("No data found.");
    expect(component.ticklerAttributeMaps.length).toEqual(0);

    //combo
    expect(component.pendentTicklers.length).toEqual(3);

  }));

  it('resolve the promise with data', fakeAsync(() => {

    fixture.detectChanges();
    component.ticklerAttributes = dataServiceMock.ticklerAttribute4;
    component.currentTicklerType =  new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
      true,false,false,2,"Shin", "2018-11-29T11:22:34.57");


    //spies
    let r = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(r, "getTicklerAttributesMap").and.returnValue(Promise.resolve(dataServiceMock.ticklerAttributeMap));

    fixture.detectChanges();

    component.ngOnChanges({changes: component.currentTicklerType});
    component.loadTicklerAttributesMap();

    tick();

    fixture.detectChanges();

    //combo
    expect(component.ticklerAttributeMaps.length).toEqual(2);
    expect(component.pendentTicklers[0].id).toEqual(3);
    expect(component.pendentTicklers[0].code).toEqual("TEST3");
    expect(component.pendentTicklers[0].name).toEqual("Test3");
    expect(component.pendentTicklers[0].type).toEqual(1);
    expect(component.pendentTicklers[0].isArray).toEqual(false);
    expect(component.pendentTicklers[0].mandatoryFlag).toEqual(true);
    expect(component.pendentTicklers[0].createdBy).toEqual("Griffith");
    expect(component.pendentTicklers[0].createdDate).toEqual("2018-11-01T11:22:34.57");
    expect(component.pendentTicklers[0].modifiedDate).toEqual("2018-11-02T11:22:34.57");
    expect(component.pendentTicklers[0].modifiedBy).toEqual("Guts");

    //current attributes != combo to show
    expect(component.ticklerAttributeMaps[0].id).toEqual(1);
    expect(component.ticklerAttributeMaps[0].attributeTypeId).toEqual(1);
    expect(component.ticklerAttributeMaps[0].ticklerTypeId).toEqual(1);
    expect(component.ticklerAttributeMaps[0].code).toEqual("TEST1");
    expect(component.ticklerAttributeMaps[0].name).toEqual("Test1");
    expect(component.ticklerAttributeMaps[0].ticklerCode).toEqual("CUSTOMER1");
    expect(component.ticklerAttributeMaps[0].ticklerName).toEqual("Customer1");
    expect(component.ticklerAttributeMaps[0].type).toEqual(0);
    expect(component.ticklerAttributeMaps[0].mandatoryFlag).toEqual(true);
    expect(component.ticklerAttributeMaps[0].isArray).toEqual(true);
    expect(component.ticklerAttributeMaps[0].createdBy).toEqual("Hak");
    expect(component.ticklerAttributeMaps[0].createdDate).toEqual("2018-11-30T11:22:34.57");


    expect(component.ticklerAttributeMaps[1].id).toEqual(2);
    expect(component.ticklerAttributeMaps[1].attributeTypeId).toEqual(2);
    expect(component.ticklerAttributeMaps[1].ticklerTypeId).toEqual(2);
    expect(component.ticklerAttributeMaps[1].code).toEqual("TEST2");
    expect(component.ticklerAttributeMaps[1].name).toEqual("Test2");
    expect(component.ticklerAttributeMaps[1].ticklerCode).toEqual("CUSTOMER2");
    expect(component.ticklerAttributeMaps[1].ticklerName).toEqual("Customer2");
    expect(component.ticklerAttributeMaps[1].type).toEqual(1);
    expect(component.ticklerAttributeMaps[1].mandatoryFlag).toEqual(false);
    expect(component.ticklerAttributeMaps[1].isArray).toEqual(true);
    expect(component.ticklerAttributeMaps[1].createdBy).toEqual("Hak");
    expect(component.ticklerAttributeMaps[1].createdDate).toEqual("2018-11-30T11:22:34.57");

  }));


  it('add tickler attribute map', fakeAsync(() => {

    component.ticklerAttributes = dataServiceMock.ticklerAttribute4;
    component.currentTicklerType =  new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
      true,false,false,2,"Shin", "2018-11-29T11:22:34.57");


    //spies
    let r = fixture.debugElement.injector.get(DataService);
    let u = fixture.debugElement.injector.get(UserFeedbackService);

    let spy = spyOn(r, "getTicklerAttributesMap").and.returnValue(Promise.resolve(dataServiceMock.ticklerAttributeMap));
    let spy2 = spyOn(r, "addTicklerAttributeMap").and.returnValue(Promise.resolve(200));
    let spy3 = spyOn(u, "handleSuccess").and.returnValue(Promise.resolve(200));

    fixture.detectChanges();

    component.ngOnChanges({changes: component.currentTicklerType});
    component.loadTicklerAttributesMap();


    let i = fixture.debugElement.queryAll(By.css("i")).map(e=>e.nativeElement);

    tick();

    fixture.detectChanges();

    //click on add button
    let addButton = i[0];
    addButton.click();

    tick();

    fixture.detectChanges();

    //currentTicklerType
    expect(spy2.calls.first().args[0].ticklerCode).toEqual("CUSTOMER1");

    //ticklerAttribute selected (combo)
    expect(spy2.calls.first().args[1].code).toEqual("TEST3");

    //logged agent
    expect(spy2.calls.first().args[2].account).toEqual("account1");

    //success message
    expect(spy3.calls.first().args[0]).toEqual("Tickler attribute map added");

  }));


  it('remove tickler attribute map', fakeAsync(() => {

    fixture.detectChanges();
    component.ticklerAttributes = dataServiceMock.ticklerAttribute4;
    component.currentTicklerType =  new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
      true,false,false,2,"Shin", "2018-11-29T11:22:34.57");


    //spies
    let r = fixture.debugElement.injector.get(DataService);
    let u = fixture.debugElement.injector.get(UserFeedbackService);

    let spy = spyOn(r, "getTicklerAttributesMap").and.returnValue(Promise.resolve(dataServiceMock.ticklerAttributeMap));
    let spy2 = spyOn(r, "deleteTicklerAttributeMap").and.returnValue(Promise.resolve(200));
    let spy3 = spyOn(u, "handleSuccess").and.returnValue(Promise.resolve(200));

    fixture.detectChanges();

    //function calls
    component.ngOnChanges({changes: component.currentTicklerType});
    component.loadTicklerAttributesMap();

    tick();

    fixture.detectChanges();


    let i = fixture.debugElement.queryAll(By.css("i")).map(e=>e.nativeElement);

    //remove button
    let removeButton = i[2];
    removeButton.click();

    tick();

    fixture.detectChanges();

    //current attribute map: Test1(name) - String(type) - true(mandatory)
    expect(spy2.calls.first().args[0].code).toEqual("TEST1");
    expect(spy2.calls.first().args[0].name).toEqual("Test1");

    //success message
    expect(spy3.calls.first().args[0]).toEqual("Tickler attribute map deleted");

  }));

  it('update tickler attribute map (mandatory flag)', fakeAsync(() => {

    fixture.detectChanges();
    component.ticklerAttributes = dataServiceMock.ticklerAttribute4;
    component.currentTicklerType =  new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
      true,false,false,2,"Shin", "2018-11-29T11:22:34.57");


    //spies
    let r = fixture.debugElement.injector.get(DataService);
    let u = fixture.debugElement.injector.get(UserFeedbackService);

    let spy = spyOn(r, "getTicklerAttributesMap").and.returnValue(Promise.resolve(dataServiceMock.ticklerAttributeMap));
    let spy2 = spyOn(r, "updateTicklerAttributeMap").and.returnValue(Promise.resolve(200));
    let spy3 = spyOn(u, "handleSuccess").and.returnValue(Promise.resolve(200));

    fixture.detectChanges();

    //function calls
    component.ngOnChanges({changes: component.currentTicklerType});
    component.loadTicklerAttributesMap();

    tick();

    fixture.detectChanges();

    //current attribute map: Test1(name) - String(type) - true(mandatory)
    expect(component.ticklerAttributeMaps[0].mandatoryFlag).toEqual(true);


    let i = fixture.debugElement.queryAll(By.css("i")).map(e=>e.nativeElement);

    //click on optional field (mandatory)
    let mandatoryButton = i[1];
    mandatoryButton.click();

    tick();

    fixture.detectChanges();

    //when updated: mandatory flag changes this value
    expect(component.ticklerAttributeMaps[0].mandatoryFlag).toEqual(false);

    //current attribute map: Test1(name) - String(type) - false(mandatory)
    expect(spy2.calls.first().args[0].code).toEqual("TEST1");
    expect(spy2.calls.first().args[0].name).toEqual("Test1");

    //logged agent
    expect(spy2.calls.first().args[1].account).toEqual("account1");

    //success message
    expect(spy3.calls.first().args[0]).toEqual("Tickler attribute map updated");

  }));

});
