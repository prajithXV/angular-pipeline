import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormsModule} from "@angular/forms";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {RouterTestingModule} from "@angular/router/testing";
import {GlobalStateService} from "../../services/global-state.service";
import {DataService} from "../../services/data.service";
import {BackendCommsService} from "../../services/backend-comms.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {ToastOptions, ToastsManager} from "ng2-toastr";
import {DatePipe} from "@angular/common";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {BooleanToStringDuePipe, BooleanToStringOrderPipe} from "../../pipes/boolean-to-string-order.pipe";
import {ConsentPipeCorrectConversion} from "../../pipes/consent.pipe";
import {TelephonePipe} from "../../pipes/telephone.pipe";
import {By} from "@angular/platform-browser";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {Router} from "@angular/router";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule, HttpModule ],
      declarations: [ LoginComponent, WaitingBackendComponent ],
      providers: [ {provide: GlobalStateService, useValue: globalStateServiceMock}, {provide: DataService, useValue: dataServiceMock}, BackendCommsService,
                   {provide: UserFeedbackService, useValue: userFeedbackMock}, ToastsManager, ToastOptions, DatePipe, CiscoCommsService,
                   BooleanToStringPipe, BooleanToStringOrderPipe, BooleanToStringDuePipe, ConsentPipeCorrectConversion, TelephonePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  let spy: any;

  function setLoginValues(user: string, password: string){
    component.user = user;
    component.pwd = password;
  }

  function callsToFunctions(hasLogged: boolean){
    component.ngOnInit();
    if(hasLogged){
      component.login();
    }
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

  function checkButtonDisabled(isDisabled:boolean){
    let buttonState = fixture.debugElement.query(By.css('button')).nativeElement.disabled;
    expect(buttonState).toEqual(isDisabled);
  }


  function checkDataServiceSpy(spy: any, userData: Array<string>){
    expect(spy.args).toEqual(userData);
  }

  function checkRouterSpy(spy: any, url: string){
    expect(spy.args[0][0]).toEqual(url);
  }

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('login with user and not password', fakeAsync(() => {

    setLoginValues('username', '');
    callsToFunctions(false);
    checkButtonDisabled(true);

    })
  );

  it('login with not user and password', fakeAsync(() => {

      setLoginValues('', 'password');
      callsToFunctions(false);
      checkButtonDisabled(true);

    })
  );


  it('login with not user and not password', fakeAsync(() => {

      setLoginValues('', '');
      callsToFunctions(false);
      checkButtonDisabled(true);

    })
  );

  it('login with user and password: not click on "Login" button', fakeAsync(() => {

      setLoginValues('username', 'password');
      callsToFunctions(false);
      checkButtonDisabled(false);

    })
  );

  it('login with user and password: click on "Login" button', fakeAsync(() => {

    setLoginValues('username', 'password');
    let spy = injectSpy(GlobalStateService, 'login', globalStateServiceMock.loggedAgent, true);
    let spy2 = injectSpy(Router, 'navigate', true, true);
    callsToFunctions(true);
    checkButtonDisabled(true);
    checkDataServiceSpy(spy.calls.first(), ['username', 'password', '215194', '215194']);
    checkRouterSpy(spy2.calls.first(), 'app/main');

    })
  );

});
