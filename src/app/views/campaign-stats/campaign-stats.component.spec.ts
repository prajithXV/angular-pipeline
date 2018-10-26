import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CampaignStatsComponent} from './campaign-stats.component';
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {DataService} from "../../services/data.service";

import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {ToastOptions, ToastsManager} from "ng2-toastr";
import {DatePipe} from "@angular/common";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {GlobalStateService} from "../../services/global-state.service";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {By} from "@angular/platform-browser";
import {CampaignStatsToken} from "../../models/campaign-stats-token";
import {Code} from "../../models/code";
import {Campaign} from "../../models/campaign";


describe('CampaignStatsComponent', () => {
  let component: CampaignStatsComponent;
  let fixture: ComponentFixture<CampaignStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ HttpModule ],
      declarations: [ CampaignStatsComponent, WaitingBackendComponent ],
      providers: [ {provide: DataService, useValue: dataServiceMock},
        {provide: GlobalStateService, useValue: globalStateServiceMock},
        {
          provide: UserFeedbackService,
          useValue: userFeedbackMock}, ToastsManager, ToastOptions, DatePipe, CiscoCommsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  let spy: any;

  function callsToFunctions(isPromiseResolved: boolean){
    fixture.detectChanges();
    component.loadData();

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


  function checkData(campaignStatsToken: CampaignStatsToken[], statuses: Code[], campaigns: Campaign[] ){
    expect(component.tokens).toEqual(campaignStatsToken);
    expect(component.statuses).toEqual(statuses);
    expect(component.campaigns).toEqual(campaigns);
  }

  function checkMessage(feedbackMessage: string){
    let w = fixture.debugElement.query(By.css('div')).nativeElement;
    expect(w.innerText).toEqual(feedbackMessage);
  }

  function checkSpyData(spy: any, index: number, campaign: string, status: string, total: number){
    expect(spy[index].campaignCode).toEqual(campaign);
    expect(spy[index].statusCode).toEqual(status);
    expect(spy[index].count).toEqual(total);
  }

  function checkCodesData(spy: any, index: number, code: string, name: string){
    expect(spy[index].code).toEqual(code);
    expect(spy[index].name).toEqual(name);
  }

  function checkDataObjects(spy: any, component: any){
    expect(spy).toEqual(component);
  }


  function checkHtmlData(cell: string, index?: number){
    let cellText = fixture.debugElement.queryAll(By.css( 'tbody tr')).map(e=>e.nativeElement.innerText.trim())[index];
    expect(cellText).toEqual(cell.trim());
  }

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('loadData not resolve promise', () => {
    /*expects:

    *   CampaignStatsToken[] = null
    *   statuses: Code[] = null
    *   campaigns: Campaign[] = null
    *
    * */

    checkData(null, null, null);
    callsToFunctions(false);
    //the component is still null
    checkData(null, null, null);

    //expects that !statuses || !tokens || !campaigns then we see the text 'Loading statistics...'
    checkMessage("Loading statistics...");

  });




  it('loadData resolve promise', fakeAsync(() => {

    /*expects:

    *   CampaignStatsToken[] = null
    *   statuses: Code[] = null
    *   campaigns: Campaign[] = null
    *
    * */
    checkData(null, null, null);

    //inject in DataService
    let spy = injectSpy(DataService, 'getGlobalCampaigns', dataServiceMock.campaign, true);
    let spy2 = injectSpy(DataService, 'getCampaignStats', dataServiceMock.CampaignStatsToken, true);
    let spy3 = injectSpy(DataService, 'getCampaignListRecordStatusCodes', dataServiceMock.codes, true);

    callsToFunctions(true);

    //expects the 3 spy to be truth
    expect(spy).toBeTruthy();
    expect(spy2).toBeTruthy();
    expect(spy3).toBeTruthy();

    //expects that the spy 1: CampaingStatsToken have the correct data and is not null
    checkSpyData(spy.calls.first().object.CampaignStatsToken, 0, "DEMO_CAMPAIGN", "CANCELED", 10);
    checkSpyData(spy.calls.first().object.CampaignStatsToken, 1, "DIRECT", "NEW", 11);
    checkSpyData(spy.calls.first().object.CampaignStatsToken, 2, "INDIRECT", "LOCKED", 5);
    checkSpyData(spy.calls.first().object.CampaignStatsToken, 3, "REAL_STATE", "DONE", 7);
    checkSpyData(spy.calls.first().object.CampaignStatsToken, 4, "DIRECT", "DONE", 8);
    checkSpyData(spy.calls.first().object.CampaignStatsToken, 5, "DEMO_CAMPAIGN", "NEW", 20);
    checkSpyData(spy.calls.first().object.CampaignStatsToken, 6, "REAL_STATE", "LOCKED", 30);
    checkSpyData(spy.calls.first().object.CampaignStatsToken, 7, "INDIRECT", "NEW", 30);
    checkSpyData(spy.calls.first().object.CampaignStatsToken, 8, "INDIRECT", "DONE", 0);
    checkSpyData(spy.calls.first().object.CampaignStatsToken, 9, "REAL_STATE", "NEW", 15);

    //expects that the spy 2: Campaign has the correct data and is not null
    checkCodesData(spy2.calls.first().object.campaign, 0, "DEMO_CAMPAIGN", "Demo Campaign");
    checkCodesData(spy2.calls.first().object.campaign, 1, "DIRECT", "Direct");
    checkCodesData(spy2.calls.first().object.campaign, 2, "INDIRECT", "Indirect");
    checkCodesData(spy2.calls.first().object.campaign, 3, "REAL_STATE", "Real State");

    //expects that the spy 3: code has the correct data and is not null
    checkCodesData(spy3.calls.first().object.codes, 0, "NEW", "New");
    checkCodesData(spy3.calls.first().object.codes, 1, "LOCKED", "Locked");
    checkCodesData(spy3.calls.first().object.codes, 2, "DONE", "Done");
    checkCodesData(spy3.calls.first().object.codes, 3, "CANCELED", "Canceled");


    //expects that the data that there are in the DataService are equal to the component data
    //and component data is not null yet

   checkDataObjects(spy.calls.first().object.CampaignStatsToken, component.tokens);
   checkDataObjects(spy.calls.first().object.campaign, component.campaigns);
   checkDataObjects(spy.calls.first().object.codes, component.statuses);

  }));


  it('loadData HTML table resolve promise ', fakeAsync(() => {

    //spy DataService functions to resolve the promises
    injectSpy(DataService, 'getGlobalCampaigns', dataServiceMock.campaign, true);
    injectSpy(DataService, 'getCampaignStats', dataServiceMock.CampaignStatsToken, true);
    injectSpy(DataService, 'getCampaignListRecordStatusCodes', dataServiceMock.codes, true);

    callsToFunctions(true);

    /*
    *
    * table expected:
    *
    * <thead>
      <tr>
        <th></th>
        <th>New</th>
        <th>Locked</th>
        <th>Done</th>
        <th>Canceled</th>
        <th>TOTAL</th>
      </tr>
    *
    *
    * </thead>
      <tbody>
      <tr>
        <th>Demo Campaign</th>
        <td>20</td>
        <td>-</td>
        <td>-</td>
        <td>10</td>
        <td>30</td>
      </tr>

      <tr>
        <th>Direct</th>
        <td>11</td>
        <td>-</td>
        <td>8</td>
        <td>-</td>
        <td>19</td>
      </tr>

      <tr>
        <th>Indirect</th>
        <td>30</td>
        <td>5</td>
        <td>0</td>
        <td>-</td>
        <td>52</td>
      </tr>

      <tr>
        <th>Real State</th>
        <td>15</td>
        <td>30</td>
        <td>7</td>
        <td>-</td>
        <td>52</td>
      </tr>

      <tr>
        <th>TOTAL</th>
        <td>76</td>
        <td>35</td>
        <td>15</td>
        <td>10</td>
        <td>136</td>
      </tr>

      </tbody>
    *
    *
    *
    *
    *
    *
    *
    *
    *
    * */

    checkHtmlData("Demo Campaign\t20\t-\t-\t10\t30",  0);
    checkHtmlData("Direct\t11\t-\t8\t-\t19",  1);
    checkHtmlData("Indirect\t30\t5\t0\t-\t35",  2);
    checkHtmlData("Real State\t15\t30\t7\t-\t52",  3);
    checkHtmlData("TOTAL\t76\t35\t15\t10\t136",  4);

  }));


});
