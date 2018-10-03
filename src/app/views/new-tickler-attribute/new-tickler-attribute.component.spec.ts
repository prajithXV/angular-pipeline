import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { NewTicklerAttributeComponent } from './new-tickler-attribute.component';
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
import {TicklerAttribute} from "../../models/tickler-attribute";
import {TicklerAttributeModel} from "../../models/tickler-attribute-model";
import {Code} from "../../models/code";

describe('NewTicklerAttributeComponent', () => {
  let component: NewTicklerAttributeComponent;
  let fixture: ComponentFixture<NewTicklerAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule ],
      declarations: [ NewTicklerAttributeComponent, WaitingBackendComponent ],
      providers: [ {provide: DataService, useValue: dataServiceMock }, {provide: UserFeedbackService, useValue: userFeedbackMock },DatePipe, BooleanToStringPipe, { provide:GlobalStateService, useValue: globalStateServiceMock } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTicklerAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  let currentTicklerAttribute = new TicklerAttribute(1, "TEST", "test", "desc1", 0, true, true);
  let model;
  let _spy;

  function setInitData(hastToAddTicklerAttribute: boolean, typeCode: Code[]){
    component.hasToAddTicklerAttribute = hastToAddTicklerAttribute;
    component.currentTicklerAttribute = currentTicklerAttribute;
    component.typeCodes = typeCode;
    model = new TicklerAttributeModel();
    fixture.detectChanges();
  }


  function setModel(attributeName: string, attributeDescription: string, dataType: string, isActive: boolean, isMandatory: boolean, isArray: boolean, attributeCode: string){
    model.attributeName = attributeName;
    model.attributeDescription = attributeDescription;
    model.dataType = dataType;
    model.activeFlag = isActive;
    model.mandatoryFlag = isMandatory;
    model.arrayFlag = isArray;
    model.attributeCode = attributeCode;
    fixture.detectChanges();

  }

  function checkModel(isArray: boolean, isMandatory: boolean, isActive: boolean, dataType: string, attributeDescription: string, attributeName: string){
    expect(model.arrayFlag).toEqual(isArray);
    expect(model.mandatoryFlag).toEqual(isMandatory);
    expect(model.activeFlag).toEqual(isActive);
    expect(model.dataType).toEqual(dataType);
    expect(model.attributeDescription).toEqual(attributeDescription);
    expect(model.attributeName).toEqual(attributeName);
  }

  function callsToFunctions(isUpdating: boolean, isAdding: boolean){
    component.ngOnChanges({changes: component.currentTicklerAttribute});
    component.setValuesToModel();

    if(isUpdating){
      component.updateTicklerAttribute(model);
    }else if(isAdding){
      component.addTicklerAttribute(model);
    }else{
      component.isListOfValue(model);
    }

    tick();
    fixture.detectChanges();

  }

  function injectorSpy(injec: any, method: string, value: any, isResolve: boolean){
    let r = fixture.debugElement.injector.get(injec);
    if(isResolve){
      return _spy = spyOn(r, method).and.returnValue(Promise.resolve(value));
    }else{
      return _spy = spyOn(r, method).and.returnValue(Promise.reject(value));

    }
  }

  function checkSpy(spy, text: string){
    expect(spy.calls.first().args[0]).toEqual(text);

  }

  function checkLovData(isListOfValue: boolean){
    expect(component.isListOfValue(model)).toEqual(isListOfValue);
  }


  it('updated success', fakeAsync(() => {

    setInitData(false, dataServiceMock.attributeCodes);
    checkModel(false, false, false, "", "", "");

    injectorSpy(DataService, "updateTicklerAttribute", 200, true);
    let spy2 =  injectorSpy(UserFeedbackService, "handleSuccess", 200, true);

    setModel("Guts", "desc1", "string", true, true, true, "TEST");
    callsToFunctions(true, false);
    checkSpy(spy2, "Tickler attribute updated");

  }));


  it('error updating', fakeAsync(() => {

    setInitData(false, dataServiceMock.attributeCodes);
    checkModel(false, false, false, "", "", "");

    injectorSpy(DataService, "updateTicklerAttribute", 200, false);
    let spy2 = injectorSpy(UserFeedbackService, "handleError", 200, true);

    setModel("Guts", "desc1", "string", true, true, true, "TEST");
    callsToFunctions(true, false);
    checkSpy(spy2, "Error updating tickler attribute");

  }));


  it('added success', fakeAsync(() => {


    setInitData(false, dataServiceMock.attributeCodes);
    checkModel(false, false, false, "", "", "");

    injectorSpy(DataService, "newTicklerAttribute", 200, true);
    let spy2 = injectorSpy(UserFeedbackService, "handleSuccess", 200, true);

    setModel("Guts", "desc1", "string", true, true, true, "TEST");
    callsToFunctions(false, true);
    checkSpy(spy2, "Tickler attribute added");

  }));


  it('error adding', fakeAsync(() => {

    setInitData(false, dataServiceMock.attributeCodes);
    checkModel(false, false, false, "", "", "");

    injectorSpy(DataService, "newTicklerAttribute", 200, false);
    let spy2 = injectorSpy(UserFeedbackService, "handleError", 200, true);

    setModel("Guts", "desc1", "string", true, true, true, "TEST");
    callsToFunctions(false, true);
    checkSpy(spy2, "Error adding new tickler attribute");

  }));


  it('LOV combo selected', fakeAsync(() => {

    setInitData(false, dataServiceMock.attributeCodes);
    checkModel(false, false, false, "", "", "");
    checkLovData(false);

    setModel("Guts", "desc1", "4", true, true, true, "TEST");
    callsToFunctions(false, false);
    checkLovData(true);

  }));


});
