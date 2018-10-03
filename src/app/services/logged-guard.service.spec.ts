import { TestBed, inject } from '@angular/core/testing';

import {AdminMagerGuard, AdminMagerSupervisorGuard, LoggedGuard, NotLoggedGuard} from './logged-guard.service';
import {GlobalStateService} from "./global-state.service";
import {DataService} from "./data.service";
import {BackendCommsService} from "./backend-comms.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "./user-feedback.service";
import {ToastOptions, ToastsManager} from "ng2-toastr";
import {DatePipe} from "@angular/common";
import {CiscoCommsService} from "./cisco-comms.service";
import {RouterTestingModule} from "@angular/router/testing";
import {BooleanToStringPipe} from "../pipes/boolean-to-string.pipe";
import {globalStateServiceMock} from "../../test-utils/globalStateServiceMock";
import {routerMock} from "../../test-utils/routerMock";
import {Router} from "@angular/router";
import {Agent} from "../models/agent";

describe('LoggedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      providers: [ LoggedGuard, NotLoggedGuard, AdminMagerGuard, AdminMagerSupervisorGuard, DataService, BackendCommsService, UserFeedbackService, ToastsManager, ToastOptions, DatePipe, CiscoCommsService, BooleanToStringPipe,
        {provide: Router, useValue: routerMock}, {provide: GlobalStateService, useValue: globalStateServiceMock}],

    });
  });

  it('should be created', inject([LoggedGuard], (service: LoggedGuard) => {
    expect(service).toBeTruthy();
  }));


  it('user is logged', inject([LoggedGuard, GlobalStateService], (service: LoggedGuard, globalStateMock) => {

    //change value
    globalStateMock.loggedAgent = new Agent('account');

    //call function
    let isLogged = service.canActivate(null);

    //expects logged user
    expect(isLogged).toEqual(true);

  }));


  it('user is not logged', inject([NotLoggedGuard, GlobalStateService], (service: NotLoggedGuard, globalStateMock) => {

    //change value
    globalStateMock.loggedAgent = null;

    //call function
    let isNotLogged = service.canActivate(null);

    //not user logged
    expect(isNotLogged).toEqual(true);

  }));


  it('user is logged and not admin', inject([AdminMagerGuard, GlobalStateService], (service: AdminMagerGuard, globalStateMock) => {

    //change value
    globalStateMock.loggedAgent = new Agent('account','user',false);

    //call function
    let isAdmin = service.canActivate(null);

    //not admin
    expect(isAdmin).toEqual(false);

  }));


  it('user is logged and not admin', inject([AdminMagerGuard, GlobalStateService], (service: AdminMagerGuard, globalStateMock) => {

    //change value
    globalStateMock.loggedAgent = new Agent('account','user',true,true,false);

    //call function
    let isAdminNotManager = service.canActivate(null);

    //admin - not manager
    expect(isAdminNotManager).toEqual(true);

  }));


  it('user is logged, is manager and not admin', inject([AdminMagerGuard, GlobalStateService], (service: AdminMagerGuard, globalStateMock) => {


    //change value
    globalStateMock.loggedAgent = new Agent('account','user',false,true,true);

    //call function
    let isManagerNotAdmin = service.canActivate(null);

    //manager - not admin
    expect(isManagerNotAdmin).toEqual(true);

  }));


  it('user is logged, is not manager and not admin', inject([AdminMagerGuard, GlobalStateService], (service: AdminMagerGuard, globalStateMock) => {

    //change value
    globalStateMock.loggedAgent = new Agent('account','user',false,true,false);

    //call function
    let isManagerAdmin = service.canActivate(null);

    //not manager- not admin
    expect(isManagerAdmin).toEqual(false);


  }));

  it('user is logged, is manager and is admin', inject([AdminMagerGuard, GlobalStateService], (service: AdminMagerGuard, globalStateMock) => {

    //change value
    globalStateMock.loggedAgent = new Agent('account','user',false,true,true);

    //call function
    let isAdminManager = service.canActivate(null);

    //is admin - is manager
    expect(isAdminManager).toEqual(true);

  }));

  it('user is logged, is admin, not manager and not supervisor', inject([AdminMagerSupervisorGuard, GlobalStateService], (service: AdminMagerSupervisorGuard, globalStateMock) => {

    //change value
    globalStateMock.loggedAgent = new Agent('account','user',true,true,false, false);

    //call function
    let isAdminNotManagerNotSupervisor = service.canActivate(null);

    //admin - not manager - not supervisor
    expect(isAdminNotManagerNotSupervisor).toEqual(true);

  }));

  it('user is logged, is not admin, is manager and not supervisor', inject([AdminMagerSupervisorGuard, GlobalStateService], (service: AdminMagerSupervisorGuard, globalStateMock) => {

    //change value
    globalStateMock.loggedAgent = new Agent('account','user',false,true,true,false);

    //call function
    let NotAdminManagerNotSupervisor = service.canActivate(null);

    //not admin - not manager - not supervisor
    expect(NotAdminManagerNotSupervisor).toEqual(true);

  }));

  it('user is logged, is not admin, is not manager and is supervisor', inject([AdminMagerSupervisorGuard, GlobalStateService], (service: AdminMagerSupervisorGuard, globalStateMock) => {

    //change value
    globalStateMock.loggedAgent = new Agent('account','user',false,true,false,true);

    //call function
    let NotAdminNotManagerSupervisor = service.canActivate(null);

    //not admin - not manager- is supervisor
    expect(NotAdminNotManagerSupervisor).toEqual(true);

  }));


  it('user is logged, is admin, is manager and is supervisor', inject([AdminMagerSupervisorGuard, GlobalStateService], (service: AdminMagerSupervisorGuard, globalStateMock) => {

    //change value
    globalStateMock.loggedAgent = new Agent('account','user',false,true,true, true);

    //call function
    let isAdminManagerSupervisor = service.canActivate(null);

    //is admin - manager - supervisor
    expect(isAdminManagerSupervisor).toEqual(true);

  }));


  it('user is logged, is not admin, not manager and not supervisor', inject([AdminMagerSupervisorGuard, GlobalStateService], (service: AdminMagerSupervisorGuard, globalStateMock) => {

    //change value
    globalStateMock.loggedAgent = new Agent('account','user',false,true,false,false);

    //call function
    let isAdminManagerSupervisor = service.canActivate(null);

    //not admin - not manager - not supervisor
    expect(isAdminManagerSupervisor).toEqual(false);


  }));


});
