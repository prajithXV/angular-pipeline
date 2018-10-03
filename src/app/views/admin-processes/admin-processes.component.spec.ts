import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { AdminProcessesComponent } from './admin-processes.component';
import {TicklerProcessTableComponent} from "../tickler-process-table/tickler-process-table.component";
import {TicklerTypesTableComponent} from "../tickler-types-table/tickler-types-table.component";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {NewTicklerTypeComponent} from "../new-tickler-type/new-tickler-type.component";
import {FormsModule} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {DatePipe} from "@angular/common";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {By} from "@angular/platform-browser";
import {TicklerProcess} from "../../models/tickler-processes";
import {GlobalStateService} from "../../services/global-state.service";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {NewTicklerAttributeMapComponent} from "../new-tickler-attribute-map/new-tickler-attribute-map.component";
import {NewTicklerTypeMapComponent} from "../new-tickler-type-map/new-tickler-type-map.component";
import {AttributeTypeToStringPipe} from "../../pipes/attribute-type-to-string.pipe";
import {NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgbModalStack} from "@ng-bootstrap/ng-bootstrap/modal/modal-stack";
import {SemaphoreComponent} from "../semaphore/semaphore.component";
import {TickCrossComponent} from "../tick-cross/tick-cross.component";
import {TicklerType} from "../../models/tickler-types";

describe('AdminProcessesComponent', () => {
  let component: AdminProcessesComponent;
  let fixture: ComponentFixture<AdminProcessesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, NgbModule ],
      declarations: [ AdminProcessesComponent, TicklerProcessTableComponent, TicklerTypesTableComponent, WaitingBackendComponent, CoinDateTransformPipe,
                      NewTicklerTypeComponent, NewTicklerAttributeMapComponent, NewTicklerTypeMapComponent, AttributeTypeToStringPipe, SemaphoreComponent, TickCrossComponent ],
      providers: [ { provide: DataService, useValue: dataServiceMock }, { provide: UserFeedbackService, useValue: userFeedbackMock }, { provide: GlobalStateService, useValue: globalStateServiceMock },
                    DatePipe, BooleanToStringPipe, NgbModal, NgbModalStack ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function callsToFunctions(isPromiseResolved: boolean, hasToLoadTypes: boolean){
    fixture.detectChanges();
    component.ngOnInit();
    if(hasToLoadTypes){
      component.loadTicklerTypes(new TicklerProcess(1, "SPOC", "SPOC Name", "Hak"));
    }

    if(isPromiseResolved){
      tick();
    }
    fixture.detectChanges();
  }

  function injectSpy(inject:any, method: string, value: any){
    let i = fixture.debugElement.injector.get(inject);
    return spyOn(i, method).and.returnValue(Promise.resolve(value));
  }


  function onClickNew(){
    fixture.debugElement.query(By.css("div.ticklerTypes button")).nativeElement.click();
    fixture.detectChanges();
  }

  function onClickEdit(){
    fixture.debugElement.query(By.css("tickler-types-table tbody")).children.map(e=>e.nativeElement)[0].querySelector('i.edit').click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }

  function checkFeedbackMessage(isPromiseResolved: boolean, hasEmptyProcesses: boolean, processClicked: boolean, hasEmptyTypes: boolean, feedbackMessage: string){
    if(!isPromiseResolved){
      let div = fixture.debugElement.query(By.css("div.search")).nativeElement;
      expect(div.innerText).toEqual(feedbackMessage);
    }

    if(hasEmptyProcesses && isPromiseResolved){
      let p = fixture.debugElement.query(By.css("p")).nativeElement;
      expect(p.innerText).toEqual(feedbackMessage);
    }

    if(!hasEmptyProcesses && !processClicked && isPromiseResolved){
      let div = fixture.debugElement.query(By.css("div.ticklerTypes div.ibox-content div")).nativeElement;
      expect(div.innerText).toEqual(feedbackMessage);
    }

    if(hasEmptyTypes && processClicked && isPromiseResolved){
      let p = fixture.debugElement.query(By.css("tickler-types-table p")).nativeElement;
      expect(p.innerText).toEqual(feedbackMessage);


    }
  }

  function checkSpyData(spyObject: any, length){
    expect(spyObject.length).toEqual(length);
  }

  function checkProcesses(id?: number, processCode?: string, processName?: string, createdBy?: string, createdDate?: string){
    let ticklerProcess: TicklerProcess;
    if(id){
      ticklerProcess = component.ticklerProcesses.find(i=>i.id == id);

      expect(ticklerProcess.id).toEqual(id);
      expect(ticklerProcess.processCode).toEqual(processCode);
      expect(ticklerProcess.processName).toEqual(processName);
      expect(ticklerProcess.createdBy).toEqual(createdBy);
      expect(ticklerProcess.createdDate).toEqual(createdDate);
    }

    else {
      expect(component.ticklerProcesses).toEqual(null);
    }

  }


  function checkTicklerTypes(id?: number, ticklerCode?: string, ticklerName?: string, ticklerDescription?: string, followUpDays?: number, actionRequired?: boolean,
                             createdBy?: string, createdDate?: string){

    let type: TicklerType;
      if(id){
       type = component.ticklerTypes.find(i=>i.id == id);
        expect(type.id).toEqual(id);
        expect(type.ticklerCode).toEqual(ticklerCode);
        expect(type.ticklerName).toEqual(ticklerName);
        expect(type.ticklerDescription).toEqual(ticklerDescription);
        expect(type.followUpDays).toEqual(followUpDays);
        expect(type.actionRequiredFlag).toEqual(actionRequired);
        expect(type.createdBy).toEqual(createdBy);
        expect(type.createdDate).toEqual(createdDate);
      }else{
        expect(component.ticklerTypes).toEqual(null);
      }


  }

  function checkHtmlFormValues(inputArray: Array<any>, checkBoxArray: Array<boolean>, text: string){
    let input = fixture.debugElement.queryAll(By.css("new-tickler-type div input")).map(p=>p.properties["value"]).filter(i=>i != "Y");
    let checkBox = fixture.debugElement.queryAll(By.css("new-tickler-type div input")).map(p=>p.properties["checked"]).filter(i=>i != undefined);
    let textArea = fixture.debugElement.query(By.css("new-tickler-type div textarea")).properties.value;

    expect(input).toEqual(inputArray);
    expect(checkBox).toEqual(checkBoxArray);
    expect(textArea).toEqual(text);


  }

  it('not resolve the promise', fakeAsync(() => {

    callsToFunctions(false, false);
    checkFeedbackMessage(false, false, false,false, "Searching...");
  }));



  it('resolve the promise with empty processes', fakeAsync(() => {
    let spy = injectSpy(DataService, "getProcesses", dataServiceMock.processes2);

    callsToFunctions(true, false);
    checkFeedbackMessage(true, true, false,false, "No data found.");

    expect(spy.calls.first().object.processes2.length).toEqual(0);
    expect(component.ticklerProcesses.length).toEqual(0);

  }));


  it('resolve the promise with processes', fakeAsync(() => {
    let spy = injectSpy(DataService, "getProcesses", dataServiceMock.processes);

    checkProcesses();

    callsToFunctions(true, false);

    checkProcesses(1,"SPOC","SPOC Name","Hak","2018-11-29T11:22:34.57");
    checkProcesses(2,"SPAC","SPAC Name","Yona","2018-12-29T11:22:34.57");

    checkSpyData(spy.calls.first().object.processes,2);

    checkFeedbackMessage(true, false, false,false, "Select a process.");


  }));

  it('resolve the promise, click on a process with empty tickler types', fakeAsync(() => {
    let spy = injectSpy(DataService, "getProcesses", dataServiceMock.processes);
    let spy2 = injectSpy(DataService, "getTicklerTypes", dataServiceMock.ticklerType2);

    checkProcesses();
    checkTicklerTypes();

    callsToFunctions(true, true);

    checkProcesses(1,"SPOC","SPOC Name","Hak","2018-11-29T11:22:34.57");
    checkProcesses(2,"SPAC","SPAC Name","Yona","2018-12-29T11:22:34.57");

    checkSpyData(spy.calls.first().object.processes,2);
    checkSpyData(spy2.calls.first().object.ticklerType2,0);

    checkFeedbackMessage(true, false, true,true, "No data found.");

  }));


  it('resolve the promise, click on a process with tickler types', fakeAsync(() => {

    //spies
    let spy = injectSpy(DataService, "getProcesses", dataServiceMock.processes);
    let spy2 = injectSpy(DataService, "getTicklerTypes", dataServiceMock.ticklerType);


    checkProcesses();
    checkTicklerTypes();

    callsToFunctions(true, true);

    checkProcesses(1,"SPOC","SPOC Name","Hak","2018-11-29T11:22:34.57");
    checkProcesses(2,"SPAC","SPAC Name","Yona","2018-12-29T11:22:34.57");

    checkTicklerTypes(1,"CUSTOMER1","Customer1","Tickler description",7,true,
                      "Shin","2018-11-29T11:22:34.57");

    checkTicklerTypes(2,"CUSTOMER2","Customer2","Tickler description",8,false,
      "Hak","2018-12-29T11:22:34.57");

    checkSpyData(spy.calls.first().object.processes,2);
    checkSpyData(spy2.calls.first().object.ticklerType,2);


  }));


  it('Resolve the promise and click on new button', fakeAsync(() => {


    injectSpy(DataService, "getProcesses", dataServiceMock.processes);
    injectSpy(DataService, "getTicklerTypes", dataServiceMock.ticklerType);


    callsToFunctions(true, true);

    onClickNew();

    checkHtmlFormValues(["", "", "", ""], [true, false, false, true] ,"");


  }));

  it('Resolve the promise and click on edit button', fakeAsync(() => {

    injectSpy(DataService, "getProcesses", dataServiceMock.processes);
    injectSpy(DataService, "getTicklerTypes", dataServiceMock.ticklerType);

    callsToFunctions(true, true);

    onClickEdit();

    checkHtmlFormValues(["CUSTOMER1", "Customer1", 2, 7], [true, true, false, true, false] ,"Tickler description");
    checkTicklerTypes(1,"CUSTOMER1","Customer1","Tickler description",7,true,"Shin","2018-11-29T11:22:34.57");

  }));




});

