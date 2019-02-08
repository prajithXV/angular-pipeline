import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { NewLovTypeComponent } from './new-lov-type.component';
import {FormsModule} from "@angular/forms";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {DataService} from "../../services/data.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {DatePipe} from "@angular/common";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {TelephonePipe} from "../../pipes/telephone.pipe";
import {ConsentPipeCorrectConversion} from "../../pipes/consent.pipe";
import {BooleanToStringDuePipe, BooleanToStringOrderPipe} from "../../pipes/boolean-to-string-order.pipe";
import {GlobalStateService} from "../../services/global-state.service";
import {RouterTestingModule} from "@angular/router/testing";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {LovTypeModel} from "../../models/lov-type-model";
import {Code} from "../../models/code";

describe('NewLovTypeComponent', () => {
  let component: NewLovTypeComponent;
  let fixture: ComponentFixture<NewLovTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule ],
      declarations: [ NewLovTypeComponent, WaitingBackendComponent ],
      providers: [ {provide: DataService, useValue: dataServiceMock}, {provide: UserFeedbackService, useValue: userFeedbackMock}, DatePipe, BooleanToStringPipe, TelephonePipe,
                   ConsentPipeCorrectConversion, BooleanToStringOrderPipe, BooleanToStringDuePipe, {provide: GlobalStateService, useValue: globalStateServiceMock} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLovTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  let spy: any;
  let model = new LovTypeModel();

  function setValues(lovTypeCodes: Code[]){
    component.lovTypeCodes = lovTypeCodes;
    fixture.detectChanges();
  }

 function setModelValues(modelActive: boolean, modelType: string, modelDescription: string, modelLovCode: string, modelLovName: string){

    model.isActive = modelActive;
    model.type = modelType;
    model.lovDescription = modelDescription;
    model.lovCode = modelLovCode;
    model.lovName = modelLovName;
  }

  function getModelValues(){
    return model;
  }

  function callsToFunctions(model: LovTypeModel){
    component.addLovType(model);
    tick();
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

  function checkNotification(spy:any, message: string){
    expect(spy.calls.first().args[0]).toEqual(message);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('New lov type - Success', fakeAsync(() => {

   setValues(dataServiceMock.lovTypesCodes);
   setModelValues(true , '0', 'desc1', 'LovCode', 'LovName');


    injectSpy(DataService,'addLovType', 200, true);
    let spy2 = injectSpy(UserFeedbackService,'handleSuccess', 200, true);
    callsToFunctions(getModelValues());

    checkNotification(spy2, 'LOV type added');

  }));

  it('New lov type - Error', fakeAsync(() => {

    setValues(dataServiceMock.lovTypesCodes);
    setModelValues(true , '0', 'desc1', 'LovCode', 'LovName');


    injectSpy(DataService,'addLovType', 400, false);
    let spy2 = injectSpy(UserFeedbackService,'handleError', 200, true);
    callsToFunctions(getModelValues());

    checkNotification(spy2, 'Error adding new LOV Type');

  }));

});
