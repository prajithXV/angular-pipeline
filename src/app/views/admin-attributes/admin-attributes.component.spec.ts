import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { AdminAttributesComponent } from './admin-attributes.component';
import {TicklerAttributeTableComponent} from "../tickler-attribute-table/tickler-attribute-table.component";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {NewTicklerAttributeComponent} from "../new-tickler-attribute/new-tickler-attribute.component";
import {AttributeTypeToStringPipe} from "../../pipes/attribute-type-to-string.pipe";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {FormsModule} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {DatePipe} from "@angular/common";
import {SemaphoreComponent} from "../semaphore/semaphore.component";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {By} from "@angular/platform-browser";
import {GlobalStateService} from "../../services/global-state.service";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {
  ComponentLoaderFactory, PopoverConfig, PopoverDirective, PopoverModule,
  PositioningService
} from "ngx-bootstrap";

describe('AdminAttributesComponent', () => {
  let component: AdminAttributesComponent;
  let fixture: ComponentFixture<AdminAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ FormsModule, HttpModule, PopoverModule ],
      declarations: [ AdminAttributesComponent, TicklerAttributeTableComponent, WaitingBackendComponent, NewTicklerAttributeComponent, AttributeTypeToStringPipe,
                      SemaphoreComponent, CoinDateTransformPipe ],
      providers: [ { provide:DataService, useValue: dataServiceMock }, {provide: GlobalStateService, useValue: globalStateServiceMock},
                   { provide: UserFeedbackService, useValue: userFeedbackMock }, BooleanToStringPipe, DatePipe, PopoverConfig, PopoverDirective, ComponentLoaderFactory,
                   PositioningService
                 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  let spy;

  function callFunctions(resolvePromise: boolean){
    fixture.detectChanges();
    component.ngOnInit();
    if(resolvePromise){
      tick();
    }
    fixture.detectChanges();
  }

  function checkMessage(isResolvedPromise: boolean, text: string){
    let div = fixture.debugElement.query(By.css("div.search"));
    let p = fixture.debugElement.query(By.css("p"));

    if(!isResolvedPromise){
      expect(div.nativeElement.innerText).toEqual(text);

    }else{
      expect(p.nativeElement.innerText).toEqual(text);
    }
  }

  function injectSpy(inject, method, value){
    let i = fixture.debugElement.injector.get(inject);
    return spy = spyOn(i, method).and.returnValue(Promise.resolve(value));
  }


  function checkTicklerAttributes(id, code, name, attributeDescription, type, isArray, activeFlag, createdBy, createdDate, modifiedBy, modifiedDate){

    let t = component.ticklerAttributes.find(t=>t.id == id);

    expect(t.id).toEqual(id);
    expect(t.code).toEqual(code);
    expect(t.name).toEqual(name);
    expect(t.attributeDescription).toEqual(attributeDescription);
    expect(t.type).toEqual(type);
    expect(t.isArray).toEqual(isArray);
    expect(t.activeFlag).toEqual(activeFlag);
    expect(t.createdBy).toEqual(createdBy);
    expect(t.createdDate).toEqual(createdDate);
    expect(t.modifiedBy).toEqual(modifiedBy);
    expect(t.modifiedDate).toEqual(modifiedDate);

  }

  function checkHtmlFormValues(inputArray: Array<object>, selectObject: Array<object>, tArea: string){
    let input = fixture.debugElement.queryAll(By.css("div.box-shadow input")).map(p=>p.properties);
    let select = fixture.debugElement.queryAll(By.css("div.box-shadow select")).map(p=>p.properties);
    let textArea = fixture.debugElement.query(By.css("div.box-shadow textarea")).properties;

    tick();
    fixture.detectChanges();

    expect(input).toEqual(inputArray);
    expect(select).toEqual(selectObject);
    expect(textArea['value']).toEqual(tArea)

  }

  function onClickEdit(index){
    let tr = fixture.debugElement.queryAll(By.css("tbody tr")).map(e=>e.nativeElement);
    let td = tr.map(i=>i.querySelector("i.edit"));
    let i = td.find((i,ind)=>ind == index);
    i.click();
    fixture.detectChanges();
  }

 function onHover(index:number){
   let event = new Event('mouseenter');

   let tr = fixture.debugElement.queryAll(By.css("div.table-responsive tr")).map(e=>e.nativeElement);
   let cell = tr.filter((elem, ind)=> ind == index)[0].cells[4];
   cell.dispatchEvent(event);

   tick();
   fixture.detectChanges();

 }

  function onNew(){
    let button = fixture.debugElement.query(By.css("button")).nativeElement;
    button.click();
    fixture.detectChanges();
  }

  function checkDataLength(spyObject: any, ticklerAttributeLength: number, typesLength: number, spyLength: number ){

    expect(component.typeCodes.length).toEqual(typesLength);
    expect(component.ticklerAttributes.length).toEqual(ticklerAttributeLength);
    expect(spyObject.length).toEqual(spyLength);
  }


  function checkPopover(data: Array<string>){
    let popoverData = fixture.debugElement.queryAll(By.css('div.col-lg-12.col-md-12.col-sm-12.col-xs-12')).map((e=>e.nativeElement))
      .filter(e=>!e.attributes.class.value.includes("ibox-title")).map(e => e.innerText);

    expect(popoverData).toEqual(data);
  }

  it('not resolve the promise', fakeAsync(() => {

    callFunctions(false);
    checkMessage(false,"Searching...");

  }));


  it('resolve the promise with empty processes', fakeAsync(() => {

    injectSpy(DataService, "getTicklerAttributes", dataServiceMock.ticklerAttribute2);
    callFunctions(true);
    checkMessage(true, "No data found.");
    checkDataLength(spy.calls.first().object.ticklerAttribute2, 0,5,0);

  }));


  it('resolve the promise with tickler attributes', fakeAsync(() => {

    injectSpy(DataService, "getTicklerAttributes", dataServiceMock.ticklerAttribute);
    callFunctions(true);

    checkDataLength(spy.calls.first().object.ticklerAttribute, 3,5,3);

    checkTicklerAttributes(1,"TEST1","Test1","desc1",0,true,true,"Guts","2018-11-29T11:22:34.57","Griffith","2018-11-30T11:22:34.57");
    checkTicklerAttributes(2,"TEST2","Test2","desc2",1,false,true,"Griffith","2018-11-01T11:22:34.57","Guts","2018-11-02T11:22:34.57");
    checkTicklerAttributes(3,"TEST3","Test3","desc3",4,true,true,"Hak","2018-11-02T11:22:34.57","Yona","2018-11-03T11:22:34.57");

  }));


  it('resolve the promise and click on edit button when is not LOV', fakeAsync(() => {

    let inputArray = [ {value: "TEST2", disabled: true},
                       {value: "Test2"},
                       {checked: true, value: "Y"},
                       {checked: false, value: "Y"}
                     ];

    let selectObject = [{selectedIndex: -1, value: "1: 1", disabled: true}];

    let textArea = "desc2";


    injectSpy(DataService, "getTicklerAttributes", dataServiceMock.ticklerAttribute);
    callFunctions(true);

    onClickEdit(1);

    checkDataLength(spy.calls.first().object.ticklerAttribute, 3,5,3);

    checkHtmlFormValues(inputArray, selectObject, textArea);
    checkTicklerAttributes(2,"TEST2","Test2","desc2",1,false,true,"Griffith","2018-11-01T11:22:34.57","Guts","2018-11-02T11:22:34.57");

  }));


  it('resolve the promise and click on edit button when is LOV', fakeAsync(() => {


    let inputArray = [ {value: "TEST3", disabled: true},
                       {value: "Test3"},
                       {checked: true, value: "Y"},
                       {checked: true, value: "Y"}
                     ];

    let selectObject = [{selectedIndex: -1, value: "4: 4", disabled: true}, {selectedIndex: -1, value: "0: LOV_CODE3", disabled: true}];

    let textArea = "desc3";

    injectSpy(DataService, "getTicklerAttributes", dataServiceMock.ticklerAttribute);
    injectSpy(DataService, "getLovTypes", dataServiceMock.lovTypes);
    callFunctions(true);

    onClickEdit(2);

    checkDataLength(spy.calls.first().object.ticklerAttribute, 3,5,3);

    checkHtmlFormValues(inputArray, selectObject, textArea);
    checkTicklerAttributes(3,"TEST3","Test3","desc3",4,true,true,"Hak","2018-11-02T11:22:34.57","Yona","2018-11-03T11:22:34.57");

  }));


  it('resolve the promise and click on new button when type is not LOV', fakeAsync(() => {


    let inputArray = [ {value: ""},
                       {value: ""},
                       {checked: true, value: "Y"},
                       {checked: false, value: "Y"}
                     ];

    let selectObject = [{selectedIndex: -1, value: "0: 0"}];

    let textArea = "";

    injectSpy(DataService, "getTicklerAttributes", dataServiceMock.ticklerAttribute);
    callFunctions(true);

    onNew();

    checkDataLength(spy.calls.first().object.ticklerAttribute, 3,5,3);
    checkHtmlFormValues(inputArray, selectObject, textArea);

  }));


  it('hover on LOV cell', fakeAsync(() => {

    injectSpy(DataService, "getTicklerAttributes", dataServiceMock.ticklerAttribute);
    callFunctions(true);
    onHover(3);

    checkPopover(['Code: LOV_CODE3', 'Name: lov3', 'Description: lov3 desc']);

  }));


  it('hover on not LOV cell', fakeAsync(() => {

    injectSpy(DataService, "getTicklerAttributes", dataServiceMock.ticklerAttribute);
    callFunctions(true);
    onHover(1);

    checkPopover([]);

  }));



});
