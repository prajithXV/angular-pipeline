import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { LovManagementComponent } from './lov-management.component';
import {LovTypesTableComponent} from "../lov-types-table/lov-types-table.component";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {NewLovTypeComponent} from "../new-lov-type/new-lov-type.component";
import {AttributeTypeToStringPipe} from "../../pipes/attribute-type-to-string.pipe";
import {SemaphoreComponent} from "../semaphore/semaphore.component";
import {LovValuesTableComponent} from "../lov-values-table/lov-values-table.component";
import {FormsModule} from "@angular/forms";
import {NewLovValueComponent} from "../new-lov-value/new-lov-value.component";
import {ValueEditionComponent} from "../value-edition/value-edition.component";
import {CoinNumberInputComponent} from "../coin-number-input/coin-number-input.component";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {CoinNumberInputErrorsComponent} from "../coin-number-input-errors/coin-number-input-errors.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {OwlDateTimeModule} from "ng-pick-datetime";
import {OwlMomentDateTimeModule} from "ng-pick-datetime-moment";
import {DataService} from "../../services/data.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {ToastOptions, ToastsManager} from "ng2-toastr";
import {DatePipe} from "@angular/common";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {TelephonePipe} from "../../pipes/telephone.pipe";
import {ConsentPipeCorrectConversion} from "../../pipes/consent.pipe";
import {BooleanToStringDuePipe, BooleanToStringOrderPipe} from "../../pipes/boolean-to-string-order.pipe";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {GlobalStateService} from "../../services/global-state.service";
import {RouterTestingModule} from "@angular/router/testing";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {By} from "@angular/platform-browser";
import {AttributeType} from "../../models/attribute";
import {LovTypeToStringPipe} from "../../pipes/lov-type-to-string.pipe";

describe('LovManagementComponent', () => {
  let component: LovManagementComponent;
  let fixture: ComponentFixture<LovManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, OwlDateTimeModule, OwlMomentDateTimeModule, BrowserAnimationsModule, HttpModule, RouterTestingModule ],
      declarations: [ LovManagementComponent, LovTypesTableComponent, WaitingBackendComponent, NewLovTypeComponent, AttributeTypeToStringPipe,
                      SemaphoreComponent, LovValuesTableComponent, NewLovValueComponent, ValueEditionComponent, CoinNumberInputComponent, DatepickerComponent, CoinNumberInputComponent,
                      CoinNumberInputErrorsComponent, LovTypeToStringPipe ],
      providers: [ {provide: DataService, useValue: dataServiceMock}, {provide: UserFeedbackService, useValue: userFeedbackMock}, ToastsManager, ToastOptions, DatePipe, BooleanToStringPipe, TelephonePipe, ConsentPipeCorrectConversion,
                   BooleanToStringOrderPipe, BooleanToStringDuePipe, CiscoCommsService, {provide: GlobalStateService, useValue: globalStateServiceMock} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LovManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  let spy: any;

  function getInputs(table: string) {
    return fixture.debugElement.queryAll(By.css(table + ' input')).map(e=>e.nativeElement).filter(elem=>elem.value!='Y')
      .map(i=>i.value);
  }

  function getCheckBoxes(table: string) {
    return fixture.debugElement.queryAll(By.css(table +' input')).map(e=>e.nativeElement).filter(elem=>elem.value =='Y')
      .map(i=>i.checked);
  }

  function getSelect(table: string){
    let selectCombo = fixture.debugElement.query(By.css(table + ' select'));
    if(selectCombo!=null){
      return selectCombo.nativeElement.attributes['ng-reflect-model'].value;
    }else{
      return selectCombo;
    }
  }

  function getTextArea(table: string){
    return  fixture.debugElement.query(By.css(table + ' textarea')).nativeElement.value;
  }

  function getInputByName(name: string) {
    return fixture.debugElement.query(By.css('input[name=' + name + ']')).nativeElement;
  }

  function callsToFunctions(isPromiseResolved: boolean){
    fixture.detectChanges();
    component.ngOnInit();
    if(isPromiseResolved){
      tick();
    }
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

  function onClickEdit(index, isPromiseResolved: boolean){
    let tr = fixture.debugElement.queryAll(By.css("tbody tr")).map(e=>e.nativeElement);
    let td = tr.map(i=>i.querySelector("i.edit"));
    let i = td.find((i,ind)=>ind == index);
    i.click();
    fixture.detectChanges();
    if(isPromiseResolved){
      tick();
      fixture.detectChanges();
    }
  }


  function writeOnInput(inputName:string, inputText: string){
    getInputByName(inputName).value = inputText;
    fixture.detectChanges();
  }

  function onClick(table: string, button:string){
      fixture.debugElement.queryAll(By.css(table + ' button')).map(e=>e.nativeElement)
      .filter(elem=>elem.innerText == button)[0].click();

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    }

  function checkLovTypes(value?: any, id?: number, lovCode?:string, lovName?: string, lovDescription?: string, lovType?: number, isActive?: boolean, isDynamic?:boolean,
                         createdBy?: string, createdDate?: string, modifiedBy?: string, modifiedDate?: string){

    if(id!=null){
      let lt = component.lovTypes.find(i=>i.id == id);

      expect(lt.id).toEqual(id);
      expect(lt.lovCode).toEqual(lovCode);
      expect(lt.lovName).toEqual(lovName);
      expect(lt.lovDescription).toEqual(lovDescription);
      expect(lt.isActive).toEqual(isActive);
      expect(lt.isDynamic).toEqual(isDynamic);
      expect(lt.createdBy).toEqual(createdBy);
      expect(lt.createdDate).toEqual(createdDate);
      expect(lt.modifiedBy).toEqual(modifiedBy);
      expect(lt.modifiedDate).toEqual(modifiedDate);
    } else {
      expect(component.lovTypes).toEqual(value);
    }
  }

  function checkLovValues(spy: any, args: Array<string>, id?:number, lovId?: number, valueCode?: string, valueName?: string,
                          valueDescription?: string, isActive?:boolean ){

    expect(spy.calls.first().args).toEqual(args);

    if(id!=null){
      let values = spy.calls.first().object.lovValues.find(i=>i.id == id);

      expect(values.id).toEqual(id);
      expect(values.lovId).toEqual(lovId);
      expect(values.valueCode).toEqual(valueCode);
      expect(values.valueName).toEqual(valueName);
      expect(values.valueDescription).toEqual(valueDescription);
      expect(values.isActive).toEqual(isActive);
    }
  }

  function checkMessage(isResolvedPromise: boolean, text: string, table:string){
    let div = fixture.debugElement.query(By.css("div.search"));
    let p = fixture.debugElement.query(By.css(table + " p"));

    if(!isResolvedPromise){
      expect(div.nativeElement.innerText).toEqual(text);

    }else{
      expect(p.nativeElement.innerText).toEqual(text);
    }
  }

  function checkNotification(spy:any, message: string){
    expect(spy.calls.first().args[0]).toEqual(message);
  }

  function checkButtonDisabled(table: string, button:string, isButtonDisabled: any){
    let isDisabled = fixture.debugElement.queryAll(By.css(table + ' button')).map(e=>e.nativeElement)
      .filter(elem=>elem.innerText == button)[0].disabled;

    expect(isDisabled).toEqual(isButtonDisabled);
  }

 function checkForm(table: string,inputArray: Array<string>, select: string, checkBoxArray: Array<boolean>, textArea: string) {
    expect(getInputs(table)).toEqual(inputArray);
    expect(getSelect(table)).toEqual(select);
    expect(getCheckBoxes(table)).toEqual(checkBoxArray);
    expect(getTextArea(table)).toEqual(textArea);
  }


  function checkValueEditionType(type: string){
    let componentInput = fixture.debugElement.query(By.css('value-edition input'));
    let componentNumber = fixture.debugElement.query(By.css('value-edition coin-number-input input'));
    let componentDateTime = fixture.debugElement.query(By.css('value-edition date-picker'));

    if(type == "String"){
      expect(componentInput).not.toBeNull();
    }else if(type == "Number"){
      expect(componentNumber).not.toBeNull();
    }else{
      expect(componentDateTime).not.toBeNull();
      }
    }

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('not resolve the promise', fakeAsync(() => {

    injectSpy(DataService, 'getLovTypes', dataServiceMock.lovTypes, true);
    injectSpy(DataService, 'getLovTypeCodes', dataServiceMock.lovTypesCodes, true);

    callsToFunctions(false);
    checkLovTypes(null);
    checkMessage(false, 'Searching...', 'lov-types-table');

  }));

  it('resolve the promise with empty lovTypes', fakeAsync(() => {

    injectSpy(DataService, 'getLovTypes', [],true);
    injectSpy(DataService, 'getLovTypeCodes', [],true);

    callsToFunctions(true);
    checkLovTypes([]);
    checkMessage(true, 'No data found.', 'lov-types-table');

  }));


  it('resolve the promise with lovTypes', fakeAsync(() => {

    injectSpy(DataService, 'getLovTypes', dataServiceMock.lovTypes,true);
    injectSpy(DataService, 'getLovTypeCodes', dataServiceMock.lovTypesCodes,true);

    callsToFunctions(true);
    checkLovTypes(null,1, "LOV_CODE3",  "lov3", "lov3 desc",  AttributeType.string, true,false, "Hak", "2018-11-30T11:22:34.57", "Yona", "2018-12-30T11:22:34.57");
    checkLovTypes(null,2, "LOV_CODE1",  "lov1", "lov1 desc",  AttributeType.number, false,true, "Guts", "2018-11-30T11:22:34.57", "Griffith", "2018-12-30T11:22:34.57");
    checkLovTypes(null,3, "LOV_CODE2",  "lov2", "lov2 desc",  AttributeType.datetime, true,false, "Shin", "2018-11-30T11:22:34.57", "Yona", "2018-12-30T11:22:34.57");

  }));

  it('resolve the promise with lovTypes and empty lovValues', fakeAsync(() => {

    injectSpy(DataService, 'getLovTypes', dataServiceMock.lovTypes,true);
    injectSpy(DataService, 'getLovTypeCodes', dataServiceMock.lovTypesCodes,true);

    callsToFunctions(true);
    checkLovTypes(null,1, "LOV_CODE3",  "lov3", "lov3 desc",  AttributeType.string, true,false, "Hak", "2018-11-30T11:22:34.57", "Yona", "2018-12-30T11:22:34.57");
    checkLovTypes(null,2, "LOV_CODE1",  "lov1", "lov1 desc",  AttributeType.number, false,true, "Guts", "2018-11-30T11:22:34.57", "Griffith", "2018-12-30T11:22:34.57");
    checkLovTypes(null,3, "LOV_CODE2",  "lov2", "lov2 desc",  AttributeType.datetime, true,false, "Shin", "2018-11-30T11:22:34.57", "Yona", "2018-12-30T11:22:34.57");

    onClickEdit(0, false);
    checkMessage(false, 'Searching...', 'lov-values-table');


  }));

  it('resolve the promise with lovTypes with empty lovValues', fakeAsync(() => {

    injectSpy(DataService, 'getLovTypes', dataServiceMock.lovTypes,true);
    injectSpy(DataService, 'getLovTypeCodes', dataServiceMock.lovTypesCodes,true);
    injectSpy(DataService, 'getLovValues', [],true);

    callsToFunctions(true);
    checkLovTypes(null,1, "LOV_CODE3",  "lov3", "lov3 desc",  AttributeType.string, true,false, "Hak", "2018-11-30T11:22:34.57", "Yona", "2018-12-30T11:22:34.57");
    checkLovTypes(null,2, "LOV_CODE1",  "lov1", "lov1 desc",  AttributeType.number, false,true, "Guts", "2018-11-30T11:22:34.57", "Griffith", "2018-12-30T11:22:34.57");
    checkLovTypes(null,3, "LOV_CODE2",  "lov2", "lov2 desc",  AttributeType.datetime, true,false, "Shin", "2018-11-30T11:22:34.57", "Yona", "2018-12-30T11:22:34.57");

    onClickEdit(0, true);
    checkMessage(true, 'No data found.', 'lov-values-table');

  }));

  it('resolve the promise with lovTypes with lovValues', fakeAsync(() => {

    injectSpy(DataService, 'getLovTypes', dataServiceMock.lovTypes,true);
    injectSpy(DataService, 'getLovTypeCodes', dataServiceMock.lovTypesCodes,true);
    let spy3 = injectSpy(DataService, 'getLovValues', dataServiceMock.lovValues,true);

    callsToFunctions(true);
    checkLovTypes(null,1, "LOV_CODE3",  "lov3", "lov3 desc",  AttributeType.string, true,false, "Hak", "2018-11-30T11:22:34.57", "Yona", "2018-12-30T11:22:34.57");
    checkLovTypes(null,2, "LOV_CODE1",  "lov1", "lov1 desc",  AttributeType.number, false,true, "Guts", "2018-11-30T11:22:34.57", "Griffith", "2018-12-30T11:22:34.57");
    checkLovTypes(null,3, "LOV_CODE2",  "lov2", "lov2 desc",  AttributeType.datetime, true,false, "Shin", "2018-11-30T11:22:34.57", "Yona", "2018-12-30T11:22:34.57");

    onClickEdit(0, true);

    checkLovValues(spy3, ['LOV_CODE3'], 1, 1, 'V7', 'value 7', 'test1', true);
    checkLovValues(spy3, ['LOV_CODE3'],  2, 2, '7', '7 name', 'test2', false);
    checkLovValues(spy3, ['LOV_CODE3'],  3, 3, '11/25/1970 3:22 AM', 'date', 'test3', false);

  }));

  it('resolve the promise with data - edit and not dynamic', fakeAsync(() => {

    injectSpy(DataService, 'getLovTypes', dataServiceMock.lovTypes,true);
    injectSpy(DataService, 'getLovTypeCodes', dataServiceMock.lovTypesCodes,true);
    let spy3 = injectSpy(DataService, 'getLovValues', dataServiceMock.lovValues,true);

    callsToFunctions(true);
    checkLovTypes(null,1, "LOV_CODE3",  "lov3", "lov3 desc",  AttributeType.string, true,false, "Hak", "2018-11-30T11:22:34.57", "Yona", "2018-12-30T11:22:34.57");
    checkLovTypes(null,2, "LOV_CODE1",  "lov1", "lov1 desc",  AttributeType.number, false,true, "Guts", "2018-11-30T11:22:34.57", "Griffith", "2018-12-30T11:22:34.57");
    checkLovTypes(null,3, "LOV_CODE2",  "lov2", "lov2 desc",  AttributeType.datetime, true,false, "Shin", "2018-11-30T11:22:34.57", "Yona", "2018-12-30T11:22:34.57");

    onClickEdit(0, true);

    checkLovValues(spy3, ['LOV_CODE3'], 1, 1, 'V7', 'value 7', 'test1', true);
    checkLovValues(spy3, ['LOV_CODE3'],  2, 2, '7', '7 name', 'test2', false);
    checkLovValues(spy3, ['LOV_CODE3'],  3, 3, '11/25/1970 3:22 AM', 'date', 'test3', false);

    checkForm('new-lov-type',['LOV_CODE3', 'lov3'], '0', [true], 'lov3 desc');

    checkButtonDisabled('lov-types-table', 'New', false);
  }));

  it('resolve the promise with data - edit and dynamic', fakeAsync(() => {

    injectSpy(DataService, 'getLovTypes', dataServiceMock.lovTypes,true);
    injectSpy(DataService, 'getLovTypeCodes', dataServiceMock.lovTypesCodes,true);
    let spy3 = injectSpy(DataService, 'getLovValues', dataServiceMock.lovValues,true);

    callsToFunctions(true);
    checkLovTypes(null,1, "LOV_CODE3",  "lov3", "lov3 desc",  AttributeType.string, true,false, "Hak", "2018-11-30T11:22:34.57", "Yona", "2018-12-30T11:22:34.57");
    checkLovTypes(null,2, "LOV_CODE1",  "lov1", "lov1 desc",  AttributeType.number, false,true, "Guts", "2018-11-30T11:22:34.57", "Griffith", "2018-12-30T11:22:34.57");
    checkLovTypes(null,3, "LOV_CODE2",  "lov2", "lov2 desc",  AttributeType.datetime, true,false, "Shin", "2018-11-30T11:22:34.57", "Yona", "2018-12-30T11:22:34.57");

    onClickEdit(1, true);

    checkLovValues(spy3, ['LOV_CODE1'], 1, 1, 'V7', 'value 7', 'test1', true);
    checkLovValues(spy3, ['LOV_CODE1'],  2, 2, '7', '7 name', 'test2', false);
    checkLovValues(spy3, ['LOV_CODE1'],  3, 3, '11/25/1970 3:22 AM', 'date', 'test3', false);

    checkForm('new-lov-type',['LOV_CODE1', 'lov1'], '1', [false], 'lov1 desc');

    checkButtonDisabled('lov-types-table', 'New', true);

  }));

  it('resolve the promise with data - edit (SAVE - success)', fakeAsync(() => {

    injectSpy(DataService, 'getLovTypes', dataServiceMock.lovTypes,true);
    injectSpy(DataService, 'getLovTypeCodes', dataServiceMock.lovTypesCodes,true);
    let spy3 = injectSpy(DataService, 'getLovValues', dataServiceMock.lovValues,true);

    callsToFunctions(true);
    checkLovTypes(null,1, "LOV_CODE3",  "lov3", "lov3 desc",  AttributeType.string, true,false, "Hak", "2018-11-30T11:22:34.57", "Yona", "2018-12-30T11:22:34.57");
    checkLovTypes(null,2, "LOV_CODE1",  "lov1", "lov1 desc",  AttributeType.number, false,true, "Guts", "2018-11-30T11:22:34.57", "Griffith", "2018-12-30T11:22:34.57");
    checkLovTypes(null,3, "LOV_CODE2",  "lov2", "lov2 desc",  AttributeType.datetime, true,false, "Shin", "2018-11-30T11:22:34.57", "Yona", "2018-12-30T11:22:34.57");

    onClickEdit(0, true);

    checkLovValues(spy3, ['LOV_CODE3'], 1, 1, 'V7', 'value 7', 'test1', true);
    checkLovValues(spy3, ['LOV_CODE3'],  2, 2, '7', '7 name', 'test2', false);
    checkLovValues(spy3, ['LOV_CODE3'],  3, 3, '11/25/1970 3:22 AM', 'date', 'test3', false);

    checkForm('new-lov-type',['LOV_CODE3', 'lov3'], '0', [true], 'lov3 desc');

    checkButtonDisabled('lov-types-table', 'New', false);

    injectSpy(DataService, 'updateLovType', 200,true);
    let spy5 =  injectSpy(UserFeedbackService, 'handleSuccess', 200,true);

    onClick('lov-types-table', 'Save');

    checkNotification(spy5,"LOV type updated");

  }));

  it('resolve the promise with data - edit (SAVE - error)', fakeAsync(() => {

    injectSpy(DataService, 'getLovTypes', dataServiceMock.lovTypes,true);
    injectSpy(DataService, 'getLovTypeCodes', dataServiceMock.lovTypesCodes,true);
    let spy3 = injectSpy(DataService, 'getLovValues', dataServiceMock.lovValues,true);



    callsToFunctions(true);
    checkLovTypes(null,1, "LOV_CODE3",  "lov3", "lov3 desc",  AttributeType.string, true,false, "Hak", "2018-11-30T11:22:34.57", "Yona", "2018-12-30T11:22:34.57");
    checkLovTypes(null,2, "LOV_CODE1",  "lov1", "lov1 desc",  AttributeType.number, false,true, "Guts", "2018-11-30T11:22:34.57", "Griffith", "2018-12-30T11:22:34.57");
    checkLovTypes(null,3, "LOV_CODE2",  "lov2", "lov2 desc",  AttributeType.datetime, true,false, "Shin", "2018-11-30T11:22:34.57", "Yona", "2018-12-30T11:22:34.57");

    onClickEdit(0, true);

    checkLovValues(spy3, ['LOV_CODE3'], 1, 1, 'V7', 'value 7', 'test1', true);
    checkLovValues(spy3, ['LOV_CODE3'],  2, 2, '7', '7 name', 'test2', false);
    checkLovValues(spy3, ['LOV_CODE3'],  3, 3, '11/25/1970 3:22 AM', 'date', 'test3', false);

    checkForm('new-lov-type',['LOV_CODE3', 'lov3'], '0', [true], 'lov3 desc');

    checkButtonDisabled('lov-types-table', 'New', false);

    injectSpy(DataService, 'updateLovType', 400, false);
    let spy5 = injectSpy(UserFeedbackService, 'handleError', 200, true);

    onClick('lov-types-table', 'Save');

    checkNotification(spy5,"Error updating LOV Type");

  }));

  it('resolve the promise with data - edit (edit lov value - String)', fakeAsync(() => {

    injectSpy(DataService, 'getLovTypes', dataServiceMock.lovTypes,true);
    injectSpy(DataService, 'getLovTypeCodes', dataServiceMock.lovTypesCodes,true);
    injectSpy(DataService, 'getLovValues', dataServiceMock.lovValues,true);

    callsToFunctions(true);

    onClickEdit(0, true);

    checkForm('new-lov-type',['LOV_CODE3', 'lov3'], '0', [true], 'lov3 desc');

    checkButtonDisabled('lov-types-table', 'New', false);

    onClickEdit(1, true);

    checkForm('new-lov-value', ['V7', 'value 7'], null, [true], 'test1');

    checkValueEditionType('String');

  }));

  it('resolve the promise with data - edit (edit lov value - Number)', fakeAsync(() => {

    injectSpy(DataService, 'getLovTypes', dataServiceMock.lovTypes,true);
    injectSpy(DataService, 'getLovTypeCodes', dataServiceMock.lovTypesCodes,true);
    injectSpy(DataService, 'getLovValues', dataServiceMock.lovValues,true);

    callsToFunctions(true);

    onClickEdit(1, true);

    checkForm('new-lov-type',['LOV_CODE1', 'lov1'], '1', [false], 'lov1 desc');

    checkButtonDisabled('lov-types-table', 'New', true);

    dataServiceMock.lovTypes[1].isDynamic = false;
    fixture.detectChanges();


    onClickEdit(5, true);

    checkForm('new-lov-value', ['7', '7 name'], null, [false], 'test2');

    checkValueEditionType('Number');

  }));

  it('resolve the promise with data - edit (edit lov value - DateTime)', fakeAsync(() => {

    injectSpy(DataService, 'getLovTypes', dataServiceMock.lovTypes,true);
    injectSpy(DataService, 'getLovTypeCodes', dataServiceMock.lovTypesCodes,true);
    injectSpy(DataService, 'getLovValues', dataServiceMock.lovValues,true);

    callsToFunctions(true);

    onClickEdit(2, true);

    checkForm('new-lov-type',['LOV_CODE2', 'lov2'], '3', [true], 'lov2 desc');

    checkButtonDisabled('lov-types-table', 'New', false);

    onClickEdit(7, true);

    checkForm('new-lov-value', ['11/25/1970', 'date'], null, [false], 'test3');

    checkValueEditionType('Datetime');

  }));


  it('resolve the promise with data - edit (edit lov value - SAVE - success)', fakeAsync(() => {

    injectSpy(DataService, 'getLovTypes', dataServiceMock.lovTypes,true);
    injectSpy(DataService, 'getLovTypeCodes', dataServiceMock.lovTypesCodes,true);
    injectSpy(DataService, 'getLovValues', dataServiceMock.lovValues,true);

    callsToFunctions(true);

    onClickEdit(0, true);

    checkForm('new-lov-type',['LOV_CODE3', 'lov3'], '0', [true], 'lov3 desc');

    checkButtonDisabled('lov-types-table', 'New', false);

    onClickEdit(1, true);

    checkForm('new-lov-value', ['V7', 'value 7'], null, [true], 'test1');

    checkValueEditionType('String');

    injectSpy(DataService, 'updateLovValue', 200, true);
    let spy5 = injectSpy(UserFeedbackService, 'handleSuccess', 200, true);

    onClick('new-lov-value', 'Save');

    checkNotification(spy5, 'LOV value updated');

  }));


  it('resolve the promise with data - edit (edit lov value - SAVE - error)', fakeAsync(() => {

    injectSpy(DataService, 'getLovTypes', dataServiceMock.lovTypes,true);
    injectSpy(DataService, 'getLovTypeCodes', dataServiceMock.lovTypesCodes,true);
    injectSpy(DataService, 'getLovValues', dataServiceMock.lovValues,true);

    callsToFunctions(true);

    onClickEdit(0, true);

    checkForm('new-lov-type',['LOV_CODE3', 'lov3'], '0', [true], 'lov3 desc');

    checkButtonDisabled('lov-types-table', 'New', false);

    onClickEdit(1, true);

    checkForm('new-lov-value', ['V7', 'value 7'], null, [true], 'test1');

    checkValueEditionType('String');

    injectSpy(DataService, 'updateLovValue', 400, false);
    let spy5 = injectSpy(UserFeedbackService, 'handleError', 200, true);

    onClick('new-lov-value', 'Save');

    checkNotification(spy5, 'Error updating LOV value');

  }));


});
