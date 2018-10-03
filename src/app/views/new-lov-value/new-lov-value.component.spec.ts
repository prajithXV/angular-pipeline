import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { NewLovValueComponent } from './new-lov-value.component';
import {ValueEditionComponent} from "../value-edition/value-edition.component";
import {FormsModule} from "@angular/forms";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
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
import {GlobalStateService} from "../../services/global-state.service";
import {RouterTestingModule} from "@angular/router/testing";
import {LovValue} from "../../models/lov-values";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";

describe('NewLovValueComponent', () => {
  let component: NewLovValueComponent;
  let fixture: ComponentFixture<NewLovValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, OwlDateTimeModule, OwlMomentDateTimeModule, BrowserAnimationsModule, HttpModule, RouterTestingModule ],
      declarations: [ NewLovValueComponent, ValueEditionComponent, WaitingBackendComponent, CoinNumberInputComponent, DatepickerComponent, CoinNumberInputErrorsComponent ],
      providers: [ {provide: DataService, useValue: dataServiceMock}, {provide: UserFeedbackService, useValue: userFeedbackMock}, ToastsManager, ToastOptions, DatePipe, BooleanToStringPipe, TelephonePipe, ConsentPipeCorrectConversion,
                   BooleanToStringOrderPipe, BooleanToStringDuePipe, {provide: GlobalStateService, useValue: globalStateServiceMock} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLovValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  let spy: any;
  let model = new LovValue();

  function setModelValues(valueText: string, valueName: string, isActive: boolean, valueDescription: string){
    model.valueCode = valueText;
    model.valueName = valueName;
    model.isActive = isActive;
    model.valueDescription = valueDescription;
    fixture.detectChanges();
  }

  function getModelValues(){
    return model;
  }

  function callsToFunctions(model: LovValue){
    component.addLovValue(model);
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

  it('new lov value - success', fakeAsync(() => {

    setModelValues('string', 'value name', true, 'desc');
    injectSpy(DataService,'addLovValue', 200, true);
    let spy2 = injectSpy(UserFeedbackService,'handleSuccess', 200, true);

    callsToFunctions(getModelValues());

    checkNotification(spy2, 'LOV value added');

  }));

  it('new lov value - error', fakeAsync(() => {

    setModelValues('string', 'value name', true, 'desc');
    injectSpy(DataService,'addLovValue', 400, false);
    let spy2 = injectSpy(UserFeedbackService,'handleError', 200, true);

    callsToFunctions(getModelValues());

    checkNotification(spy2, 'Error adding new LOV value');

  }));


});
