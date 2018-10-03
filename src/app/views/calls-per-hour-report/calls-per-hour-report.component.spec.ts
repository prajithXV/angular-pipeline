import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { CallsPerHourReportComponent } from './calls-per-hour-report.component';
import {CallsPerHourCriteriaComponent} from "../calls-per-hour-criteria/calls-per-hour-criteria.component";
import {CallsPerHourDataComponent} from "../calls-per-hour-data/calls-per-hour-data.component";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {CallsPerHourAverageDataComponent} from "../calls-per-hour-average-data/calls-per-hour-average-data.component";
import {FormsModule} from "@angular/forms";
import {CoinDateInputComponent} from "../coin-date-input/coin-date-input.component";
import {ComponentLoaderFactory, PopoverConfig, PopoverModule, PositioningService} from "ngx-bootstrap";
import {CallsPerHourNewGraphicComponent} from "../calls-per-hour-new-graphic/calls-per-hour-new-graphic.component";
import {NgbModule, NgbTabsetConfig} from "@ng-bootstrap/ng-bootstrap";
import {CallsPerHourTableComponent} from "../calls-per-hour-table/calls-per-hour-table.component";
import {CallsPerHourAverageNewGraphicComponent} from "../calls-per-hour-average-new-graphic/calls-per-hour-average-new-graphic.component";
import {ChartsModule} from "ng2-charts";
import {DataService} from "../../services/data.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {DatePipe} from "@angular/common";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {OwlDateTimeModule} from "ng-pick-datetime";
import {OwlMomentDateTimeModule} from "ng-pick-datetime-moment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {SearchCallsPerHourCriteriaParams} from "../../models/search-calls-per-hour-criteria-params";
import {By} from "@angular/platform-browser";

describe('CallsPerHourReportComponent', () => {
  let component: CallsPerHourReportComponent;
  let fixture: ComponentFixture<CallsPerHourReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, PopoverModule, NgbModule, ChartsModule, HttpModule, OwlDateTimeModule, OwlMomentDateTimeModule, BrowserAnimationsModule ],
      declarations: [ CallsPerHourReportComponent, CallsPerHourCriteriaComponent, CallsPerHourDataComponent, WaitingBackendComponent, CallsPerHourAverageDataComponent,
                      CoinDateInputComponent, CallsPerHourNewGraphicComponent, CallsPerHourTableComponent, CallsPerHourAverageNewGraphicComponent, DatepickerComponent ],
      providers: [ {provide: DataService, useValue: dataServiceMock}, {provide: UserFeedbackService, useValue: userFeedbackMock},DatePipe, NgbTabsetConfig, PopoverConfig, ComponentLoaderFactory, PositioningService,
                   BooleanToStringPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallsPerHourReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  let _params: any;

  function newParams(params: any){
    return _params = new params();
  }

  function setParams(startDate: Date, campaignCode: string){
    _params.StartDate = startDate;
    _params.CampaignCd = campaignCode;

    fixture.detectChanges();
  }

  function callsToFunctions(isPromiseResolved: boolean, params: SearchCallsPerHourCriteriaParams){
    fixture.detectChanges();

    component.ngOnInit();
    component.onViewCallsData(params);
    if(isPromiseResolved){
      tick();
    }
    //update
    fixture.detectChanges();
  }

  function injectSpy(inject: any, method: string, value: any){
    let i = fixture.debugElement.injector.get(inject);
    return spyOn(i, method).and.returnValue(Promise.resolve(value));
  }

  function checkCampaignNameSpy(spy: any, array: Array<string>){
    let name = spy.calls.first().object.campaign.map(n=>n.name);
    expect(name).toEqual(array);
  }

  function checkCallsPerHourSpy(spy: any, campaignCode: string, hour: number, average: number, total: number, agentsCount: number, id?:number ){
    let c = spy.find(c=>c.campaignCode == campaignCode);
    if(c&& id==null || id!= 1){
      expect(c.campaignCode).toEqual(campaignCode);
      expect(c.hour).toEqual(hour);
      expect(c.average).toEqual(average);
      expect(c.total).toEqual(total);
      expect(c.agentsCount).toEqual(agentsCount);
    }else{
      expect(spy[1].campaignCode).toEqual(campaignCode);
      expect(spy[1].hour).toEqual(hour);
      expect(spy[1].average).toEqual(average);
      expect(spy[1].total).toEqual(total);
      expect(spy[1].agentsCount).toEqual(agentsCount);
    }

  }

  function checkCampaignSpyLength(spy: any, length: number){
    expect(spy.length).toEqual(length);
  }

  function checkCallsPerHourSpyLength(spy: any, length: number){
    expect(spy.length).toEqual(length);
  }


  function checkFeedbackMessage(array: Array<string>){
    let arrayText = fixture.debugElement.queryAll(By.css("div.col-lg-9 div.ibox-content")).map(c=>c.children.map(e=>e.nativeElement)
      .filter(i=>!i.querySelector('div')).map(i=>i.innerText)[0]);

    expect(arrayText).toEqual(array);

  }

  it('not clicked', () => {

    //text when not click on the button 'View Report'
    checkFeedbackMessage(['Select a campaign and a date and press "View report"', 'Select a campaign and a date and press "View report"']);

  });


  it('not resolve the promise', fakeAsync(() => {

    //filter params
    let params = newParams(SearchCallsPerHourCriteriaParams);
    setParams(new Date(), "DIRECT");

    //call functions
    callsToFunctions(false, params);

    //search the div that contains the text --> stills searching when not resolve the promise
    checkFeedbackMessage(['Getting Calls per hour...', 'Getting Calls per hour...']);

  }));


  it('resolve the promise with empty calls per hour', fakeAsync(() => {

    //filter params
    let params = newParams(SearchCallsPerHourCriteriaParams);
    setParams(new Date(), "DIRECT");

    //inject on DataService
    let spy = injectSpy(DataService,'getCallsPersHour', dataServiceMock.callsPersHour2);
    let spy2 = injectSpy(DataService,'getGlobalCampaigns', dataServiceMock.campaign);

    callsToFunctions(true, params);

    //empty calls per hour, four campaigns loaded
    checkCallsPerHourSpyLength(spy.calls.first().object.callsPersHour2, 0);
    checkCampaignSpyLength(spy2.calls.first().object.campaign, 4);
    checkCampaignNameSpy(spy2,["Demo Campaign", "Direct", "Indirect", "Real State"]);

    //search the div that has the text --> with empty calls per hour; not calls per hour found
    checkFeedbackMessage(['No calls per hour found', 'No calls per hour found']);

  }));



  it('resolve the promise with 1 calls per hour', fakeAsync(() => {

    //filter params
    let params = newParams(SearchCallsPerHourCriteriaParams);
    setParams(new Date(), params);

    //sy on DataService
    let spy = injectSpy(DataService,'getCallsPersHour', dataServiceMock.callsPersHour);
    let spy2 = injectSpy(DataService,'getGlobalCampaigns', dataServiceMock.campaign);

    callsToFunctions(true, params);

    //check that the DataService data are correct
    checkCallsPerHourSpy(spy.calls.first().object.callsPersHour , 'DIRECT',13,10,20,5);

    //there are data
    checkCallsPerHourSpyLength(spy.calls.first().object.callsPersHour, 1);
    checkCampaignSpyLength(spy2.calls.first().object.campaign, 4);

    //campaigns expected
    checkCampaignNameSpy(spy2,["Demo Campaign", "Direct", "Indirect", "Real State"]);

  }));


  it('resolve the promise with 2 calls per hour', fakeAsync(() => {

    //filter params
    let params = newParams(SearchCallsPerHourCriteriaParams);
    setParams(new Date(), "DIRECT");

    //sy on DataService
    let spy = injectSpy(DataService,'getCallsPersHour', dataServiceMock.callsPersHour3);
    let spy2 = injectSpy(DataService,'getGlobalCampaigns', dataServiceMock.campaign);

    callsToFunctions(true, params);

    //check that the DataService data are correct
    checkCallsPerHourSpy(spy.calls.first().object.callsPersHour3 , 'DIRECT', 13, 10, 20, 5);
    checkCallsPerHourSpy(spy.calls.first().object.callsPersHour3 , 'INDIRECT', 11, 15, 22, 7);

    //expected length
    checkCallsPerHourSpyLength(spy.calls.first().object.callsPersHour3, 2);
    checkCampaignSpyLength(spy2.calls.first().object.campaign, 4);

    //there are campaigns loaded
    checkCampaignNameSpy(spy2,["Demo Campaign", "Direct", "Indirect", "Real State"]);

  }));


  it('resolve the promise with 2 same calls per hour campaign', fakeAsync(() => {

    //filter params
    let params = newParams(SearchCallsPerHourCriteriaParams);
    setParams(new Date(), "DIRECT");

    //sy on DataService
    let spy = injectSpy(DataService,'getCallsPersHour', dataServiceMock.callsPersHour4);
    let spy2 = injectSpy(DataService,'getGlobalCampaigns', dataServiceMock.campaign);

    //detect changes
    callsToFunctions(true, params);

    //check that the DataService data are correct
    checkCallsPerHourSpy(spy.calls.first().object.callsPersHour4 , 'DIRECT',13,10,20,5);
    checkCallsPerHourSpy(spy.calls.first().object.callsPersHour4 , 'DIRECT',11,15,22,7, 1);

    //expected length
    checkCallsPerHourSpyLength(spy.calls.first().object.callsPersHour4, 2);
    checkCampaignSpyLength(spy2.calls.first().object.campaign, 4);

    //there are campaigns loaded
    checkCampaignNameSpy(spy2,["Demo Campaign", "Direct", "Indirect", "Real State"]);

  }));

});
