import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';

import {NextCallComponent} from './next-call.component';
import {FormsModule} from "@angular/forms";
import {
  ComponentLoaderFactory, PopoverConfig, PopoverModule,
  PositioningService
} from "ngx-bootstrap";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {NgbModule, NgbTabsetConfig} from "@ng-bootstrap/ng-bootstrap";
import {DataService} from "../../services/data.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {GlobalStateService} from "../../services/global-state.service";
import {RouterTestingModule} from "@angular/router/testing";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {Campaign} from "../../models/campaign";
import {By} from "@angular/platform-browser";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {Router} from '@angular/router';
import {routerMock} from "../../../test-utils/routerMock";
import {TemporalStateServiceService} from "../../services/temporal-state-service.service";
import {FilterCodeToNamePipe} from "../../pipes/filter-code-to-name.pipe";


describe('NextCallComponent', () => {
  let component: NextCallComponent;
  let fixture: ComponentFixture<NextCallComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, PopoverModule, NgbModule, HttpModule, RouterTestingModule],
      declarations: [NextCallComponent, WaitingBackendComponent, FilterCodeToNamePipe],
      providers: [
        {provide: DataService, useValue: dataServiceMock},
        {provide: Router, useValue: routerMock},
        {provide: GlobalStateService, useValue: globalStateServiceMock},
        {
          provide: UserFeedbackService,
          useValue: userFeedbackMock
        }, PopoverConfig, ComponentLoaderFactory, PositioningService, NgbTabsetConfig, TemporalStateServiceService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  let spy;
  let cArray = [{value: "DEMO_CAMPAIGN", disabled: true},
                {value: "DIRECT", disabled: false},
                {value: "INDIRECT", disabled: true},
                {value: "REAL_STATE", disabled: false}
               ];
  let cPausedArray = [{value: "DEMO_CAMPAIGN", disabled: true},
                      {value: "DIRECT", disabled: true},
                      {value: "INDIRECT", disabled: true},
                      {value: "REAL_STATE", disabled: true}
                     ];

  function newCampaign(code?: string, name?: string, user?: string, pending?: boolean) {
    return new Campaign(code, name, user, pending);
  }

  function setValues(code?: string, name?: string, user?: string, pending?: boolean, isWaiting?: boolean) {
    let campaign = newCampaign(code, name, user, pending);
    let campaignCode = campaign.code;

    component.campaigns = [campaign];
    component.campaignCode = campaignCode;
    component.waitingResponse = isWaiting;

    fixture.detectChanges();
  }

  function injectorSpy(inject, method, value) {

    let r = fixture.debugElement.injector.get(inject);
    return spy = spyOn(r, method).and.returnValue(Promise.resolve(value));
  }


  function onClickNextCallButton() {

    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', 0);

    fixture.detectChanges();
    //wait for async url
    tick();
    //update view with url
    fixture.detectChanges();
  }

  function checkCampaignsLength(length: number) {
    expect(component.campaigns.length).toEqual(length);
  }

  function checkData(campaigns, code, isWaiting) {
    expect(campaigns).toBeTruthy();
    if (!code) {
      expect(code).toBeFalsy();
    } else {
      expect(code).toBeTruthy();
    }
    expect(component.waitingResponse).toEqual(isWaiting);
  }


  function checkRouter(spy, array: Array<string>) {
    expect(spy.calls.first().args[0]).toEqual(array);
    expect(spy).toBeTruthy();
    expect(spy.calls).toBeTruthy();
  }

   function checkDataService(array: Array<Campaign>){
    expect(component.campaigns).toEqual(array);
  }

  function checkHtmlCampaigns(array: Array<object>){
    let select = fixture.debugElement.query(By.css("select")).children.map(p=>p.properties);
    expect(select).toEqual(array);
  }

  function refresh(){
    fixture.detectChanges();
    // component.ngOnInit();
    tick();
    fixture.detectChanges();
  }


  it('Empty campaigns', () => {

      checkCampaignsLength(0);
      setValues(null, null, null, null, false);
      checkData([], component.campaignCode, false);
      checkHtmlCampaigns([{value: null, disabled: false}]);

    }
  );


  it('With campaigns', fakeAsync(() => {

      checkCampaignsLength(0);

      let spyRouter = injectorSpy(Router, 'navigate', true);
      injectorSpy(DataService, 'getAgentCampaigns', dataServiceMock.campaign3);
      component.campaigns = dataServiceMock.campaign3;

      refresh();

      onClickNextCallButton();
      checkData(component.campaigns, component.campaignCode, true);

      /*expect the arguments of the url (navigate) with the form:
          *
          *  url = `/app/account/${ac.accountId}/${ac.accountType}/${ac.campaignRecordId}`;
          *
          * */
      checkRouter(spyRouter, ["app/account", "accountId", "accountType", "campaignRecordId"]);
      checkDataService(dataServiceMock.campaign3);
      checkHtmlCampaigns(cArray);



    })
  );


  it('all campaigns paused', fakeAsync(() => {

      checkCampaignsLength(0);

      let spyRouter = injectorSpy(Router, 'navigate', true);
      injectorSpy(DataService, 'getAgentCampaigns', dataServiceMock.campaign4);
      component.campaigns = dataServiceMock.campaign4;

      refresh();

      onClickNextCallButton();
      checkData(component.campaigns, component.campaignCode, true);

      /*expect the arguments of the url (navigate) with the form:
          *
          *  url = `/app/account/${ac.accountId}/${ac.accountType}/${ac.campaignRecordId}`;
          *
          * */
      checkRouter(spyRouter, ["app/account", "accountId", "accountType", "campaignRecordId"]);
      checkDataService(dataServiceMock.campaign4);
      checkHtmlCampaigns(cPausedArray);



    })
  );



});
