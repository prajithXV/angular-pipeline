import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ManageUsersComponent, ToggleCampaignEvent, ToggleRoleEvent} from './manage-users.component';
import {AgentsTableComponent} from "../agents-table/agents-table.component";
import {AgentCampaignsComponent} from "../agent-campaigns/agent-campaigns.component";
import {AgentRolesComponent} from "../agent-roles/agent-roles.component";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {TickCrossComponent} from "../tick-cross/tick-cross.component";
import {SemaphoreComponent} from "../semaphore/semaphore.component";
import {DataService} from "../../services/data.service";
import {BackendCommsService} from "../../services/backend-comms.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {ToastOptions, ToastsManager} from "ng2-toastr";
import {DatePipe} from "@angular/common";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {GlobalStateService} from "../../services/global-state.service";
import {RouterTestingModule} from "@angular/router/testing";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {By} from "@angular/platform-browser";



describe('ManageUsersComponent', () => {
  let component: ManageUsersComponent;
  let fixture: ComponentFixture<ManageUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      declarations: [ ManageUsersComponent, AgentsTableComponent, AgentCampaignsComponent, AgentRolesComponent, CoinDateTransformPipe, WaitingBackendComponent, TickCrossComponent, SemaphoreComponent ],
      providers: [ {provide: DataService, useValue: dataServiceMock}, BackendCommsService, {provide:UserFeedbackService, useValue: userFeedbackMock}, ToastsManager, ToastOptions, DatePipe, CiscoCommsService, {provide:GlobalStateService, useValue: globalStateServiceMock}, BooleanToStringPipe ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });



  it('empty data', fakeAsync(() => {

    //inject in the DataService
    let d = fixture.debugElement.injector.get(DataService);
    let spyOnCampaigns = spyOn(d, 'getGlobalCampaigns').and.returnValue(Promise.resolve(dataServiceMock.campaign2));
    let spyOnRoles = spyOn(d, 'getRoles').and.returnValue(Promise.resolve(dataServiceMock.role2));
    let spyOnAgents = spyOn(d, 'getAgents').and.returnValue(Promise.resolve(dataServiceMock.agent2));

    fixture.detectChanges();

    component.ngOnInit();

    //wait for async url
    tick();

    //update view with url
    fixture.detectChanges();

    let b = fixture.debugElement.query(By.css('div.ibox-content')).children.map(e => e.nativeElement);
    expect(b[0].children[0].innerText).toEqual("No users found.");

  }));



  it('not empty data', fakeAsync(() => {

    //inject in the DataService
    let d = fixture.debugElement.injector.get(DataService);
    let spyOnCampaigns = spyOn(d, 'getGlobalCampaigns').and.returnValue(Promise.resolve(dataServiceMock.campaign));
    let spyOnRoles = spyOn(d, 'getRoles').and.returnValue(Promise.resolve(dataServiceMock.roles));
    let spyOnAgents = spyOn(d, 'getAgents').and.returnValue(Promise.resolve(dataServiceMock.agent));

    fixture.detectChanges();

    component.ngOnInit();

    //wait for async url
    tick();

    //update view with url
    fixture.detectChanges();

    expect(spyOnCampaigns.calls).toBeTruthy();
    expect(spyOnRoles.calls).toBeTruthy();
    expect(spyOnAgents.calls).toBeTruthy();

    /*
    * spy con campaign
    * */
    expect(spyOnCampaigns.calls.first().object.campaign[0].userCode).toEqual('user1');
    expect(spyOnCampaigns.calls.first().object.campaign[0].code).toEqual('DEMO_CAMPAIGN');
    expect(spyOnCampaigns.calls.first().object.campaign[0].name).toEqual('Demo Campaign');

    expect(spyOnCampaigns.calls.first().object.campaign[1].userCode).toEqual('user2');
    expect(spyOnCampaigns.calls.first().object.campaign[1].code).toEqual('DIRECT');
    expect(spyOnCampaigns.calls.first().object.campaign[1].name).toEqual('Direct');

    expect(spyOnCampaigns.calls.first().object.campaign[2].userCode).toEqual('user3');
    expect(spyOnCampaigns.calls.first().object.campaign[2].code).toEqual('INDIRECT');
    expect(spyOnCampaigns.calls.first().object.campaign[2].name).toEqual('Indirect');



    expect(spyOnCampaigns.calls.first().object.campaign[3].userCode).toEqual('user4');
    expect(spyOnCampaigns.calls.first().object.campaign[3].code).toEqual('REAL_STATE');
    expect(spyOnCampaigns.calls.first().object.campaign[3].name).toEqual('Real State');

    /*
    * spy con roles
    * */
    expect(spyOnRoles.calls.first().object.roles[0].id).toEqual(1);
    expect(spyOnRoles.calls.first().object.roles[0].code).toEqual('CODE1');
    expect(spyOnRoles.calls.first().object.roles[0].name).toEqual('Code1');

    expect(spyOnRoles.calls.first().object.roles[1].id).toEqual(2);
    expect(spyOnRoles.calls.first().object.roles[1].code).toEqual('CODE2');
    expect(spyOnRoles.calls.first().object.roles[1].name).toEqual('Code2');


    /*
    * spy on agents
    * */
    expect(spyOnAgents.calls.first().object.agent[0].account).toEqual('account1');
    expect(spyOnAgents.calls.first().object.agent[0].completeName).toEqual('Keanu R');
    expect(spyOnAgents.calls.first().object.agent[0].lastLogin).toEqual('2018-12-13T11:34:26.937');

    expect(spyOnAgents.calls.first().object.agent[1].account).toEqual('account2');
    expect(spyOnAgents.calls.first().object.agent[1].completeName).toEqual('Michael F');
    expect(spyOnAgents.calls.first().object.agent[1].lastLogin).toEqual('2018-11-13T13:34:26.937');


    expect(spyOnAgents.calls.first().object.agent[0].campaigns.length).toEqual(4);
    // expect(spyOnAgents.calls.first().object.agent[1].campaigns.length).toEqual(4); REVISAR



  }));


  it('agent selected', fakeAsync(() => {


    let d = fixture.debugElement.injector.get(DataService);
    let spyOnCampaigns = spyOn(d, 'getGlobalCampaigns').and.returnValue(Promise.resolve(dataServiceMock.campaign));
    let spyOnRoles = spyOn(d, 'getRoles').and.returnValue(Promise.resolve(dataServiceMock.roles));
    let spyOnAgents = spyOn(d, 'getAgents').and.returnValue(Promise.resolve(dataServiceMock.agent));


    fixture.detectChanges();

    //init
    component.ngOnInit();

    //click on agent table: 1st agent
    component.selectAgent(dataServiceMock.agent[0]);
    //wait for async
    tick();

    //update view with url
    fixture.detectChanges();

    //not pending operations
    expect(component.pendingOperations.length).toEqual(0);



  }));


  it('agent selected and toggle tole', fakeAsync(() => {


    let d = fixture.debugElement.injector.get(DataService);
    let spyOnCampaigns = spyOn(d, 'getGlobalCampaigns').and.returnValue(Promise.resolve(dataServiceMock.campaign));
    let spyOnRoles = spyOn(d, 'getRoles').and.returnValue(Promise.resolve(dataServiceMock.roles));
    let spyOnAgents = spyOn(d, 'getAgents').and.returnValue(Promise.resolve(dataServiceMock.agent));


    fixture.detectChanges();

    //init
    component.ngOnInit();

    //click on agent table: 1st agent
    component.selectAgent(dataServiceMock.agent[0]);

    component.toggleRole({agent: dataServiceMock.agent[0], role: dataServiceMock.roles[0]});

    //wait for async
    tick();

    //update view with url
    fixture.detectChanges();

    //assign role
    expect(component.currentAgent.roleCodes[0]).toEqual("CODE1");

    //when finish not pending operations
    expect(component.pendingOperations.length).toEqual(0);




  }));


  it('agent selected, toggle campaign and toggle role', fakeAsync(() => {

    let d = fixture.debugElement.injector.get(DataService);
    let spyOnCampaigns = spyOn(d, 'getGlobalCampaigns').and.returnValue(Promise.resolve(dataServiceMock.campaign));
    let spyOnRoles = spyOn(d, 'getRoles').and.returnValue(Promise.resolve(dataServiceMock.roles));
    let spyOnAgents = spyOn(d, 'getAgents').and.returnValue(Promise.resolve(dataServiceMock.agent));


    fixture.detectChanges();

    //init
    component.ngOnInit();

    //click on agent table: 1st agent
    component.selectAgent(dataServiceMock.agent[0]);

    //click on campaign stick
    component.toggleCampaign({agent: dataServiceMock.agent[0], campaign: dataServiceMock.campaign[0]});


    //click on role stick
    component.toggleRole({agent: dataServiceMock.agent[0], role: dataServiceMock.roles[0]});


    //when not resolve the promise has pending operation
    expect(dataServiceMock.agent[0].getCampaign(dataServiceMock.campaign[0]).hasPendingOperation).toEqual(true);

    //wait for async
    tick();


    //update
    fixture.detectChanges();

    //remove campaign: REVISAR
    // expect(dataServiceMock.agent[0].getCampaign(dataServiceMock.campaign[0]).hasPendingOperation).toEqual(false);

    //not pending operations
    expect(component.pendingOperations.length).toEqual(0);


  }));


});
