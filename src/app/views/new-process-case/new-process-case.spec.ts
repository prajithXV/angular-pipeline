import {async, ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {NewProcessCaseComponent} from "./new-process-case";
import {FormsModule} from "@angular/forms";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {DataService} from "../../services/data.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {DatePipe} from "@angular/common";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {BooleanToStringOrderPipe} from "../../pipes/boolean-to-string-order.pipe";
import {GlobalStateService} from "../../services/global-state.service";
import {RouterTestingModule} from "@angular/router/testing";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {ProcessCaseModel} from "../../models/process-case-model";
import {TicklerProcess} from "../../models/tickler-processes";
import {Customer} from "../../models/customer";

describe('NewProcessCaseComponent', () => {
  let component: NewProcessCaseComponent;
  let fixture: ComponentFixture<NewProcessCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule ],
      declarations: [ NewProcessCaseComponent, WaitingBackendComponent ],
      providers: [ { provide: DataService, useValue: dataServiceMock }, { provide: UserFeedbackService, useValue: userFeedbackMock }, DatePipe, BooleanToStringPipe,
                   BooleanToStringOrderPipe, {provide: GlobalStateService, useValue: globalStateServiceMock } ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProcessCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  let model = new ProcessCaseModel();
  let spy: any;

  function setValues(processes: TicklerProcess[], account: any, customer: Customer){
    component.processes = processes;
    component.account = account;
    component.customer = customer;
    fixture.detectChanges();
  }

  function setModelValues(processCode: TicklerProcess, caseDescription: string){
    model.processCode = processCode;
    model.caseDescription = caseDescription;
    fixture.detectChanges();
  }

  function injectSpy(inject, method, value, isResolved: boolean){
    let i = fixture.debugElement.injector.get(inject);
    if(isResolved){
      return spy = spyOn(i, method).and.returnValue(Promise.resolve(value));
    }else{
      return spy = spyOn(i,method).and.returnValue(Promise.reject(value));
    }
  }

  function getModel(){
    return model;
  }

  function callsToFunctions(processes:TicklerProcess[], model: ProcessCaseModel){
    component.ngOnChanges({changes: processes});
    component.createProcessCase(model, true);
    tick();
    fixture.detectChanges();
  }

  function checkDataService(spy: any){
    expect(spy.calls.first().args[0]).toBeTruthy();
    expect(spy.calls.first().args[1]).toBeTruthy();
    expect(spy.calls.first().args[2]).toBeTruthy();
    expect(spy.calls.first().args[3]).toBeTruthy();
  }

  function checkNotification(spy:any, message: string){
    expect(spy.calls.first().args[0]).toEqual(message);
  }


  it('create a case - success', fakeAsync(() => {

    //data input
    setValues(dataServiceMock.processes, dataServiceMock.account2[0], dataServiceMock.customer[0]);
    setModelValues(dataServiceMock.processes[0], "test description");

    //spies
    let spyOnDataService =  injectSpy(DataService,'createCaseTickler', 200, true);
    let spyOnUserFeedBackService =  injectSpy(UserFeedbackService,'handleSuccess', true, true);

    callsToFunctions(component.processes, getModel());

    checkDataService(spyOnDataService);
    checkNotification(spyOnUserFeedBackService, 'Process case created');

  }));

  it('create a case - error', fakeAsync(() => {

    //data input
    setValues(dataServiceMock.processes, dataServiceMock.account2[0], dataServiceMock.customer[0]);
    setModelValues(dataServiceMock.processes[0], "test description");

    //spies
    let spyOnDataService =  injectSpy(DataService,'createCaseTickler', 400, false);
    let spyOnUserFeedBackService =  injectSpy(UserFeedbackService,'handleError', true, true);

    callsToFunctions(component.processes, getModel());

    checkDataService(spyOnDataService);
    checkNotification(spyOnUserFeedBackService, 'Error creating process case');

  }));


});
