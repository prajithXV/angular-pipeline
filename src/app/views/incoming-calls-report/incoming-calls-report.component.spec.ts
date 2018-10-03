import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { IncomingCallsReportComponent } from './incoming-calls-report.component';
import {CallsPerHourCriteriaComponent} from "../calls-per-hour-criteria/calls-per-hour-criteria.component";
import {IncomingCallsDataComponent} from "../incoming-calls-data/incoming-calls-data.component";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {FormsModule} from "@angular/forms";
import {CoinDateInputComponent} from "../coin-date-input/coin-date-input.component";
import {ComponentLoaderFactory, PopoverConfig, PopoverModule, PositioningService} from "ngx-bootstrap";
import {IncomingCallsNewGraphicComponent} from "../incoming-calls-new-graphic/incoming-calls-new-graphic.component";
import {NgbModule, NgbTabsetConfig} from "@ng-bootstrap/ng-bootstrap";
import {IncomingCallsTableComponent} from "../incoming-calls-table/incoming-calls-table.component";
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
import {SearchCallsIncomingCallsCriteriaParams} from "../../models/search-incoming-calls-criteria-params";
import {By} from "@angular/platform-browser";

describe('IncomingCallsReportComponent', () => {
  let component: IncomingCallsReportComponent;
  let fixture: ComponentFixture<IncomingCallsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, PopoverModule, NgbModule, ChartsModule, HttpModule, OwlDateTimeModule, OwlMomentDateTimeModule, BrowserAnimationsModule ],
      declarations: [ IncomingCallsReportComponent, CallsPerHourCriteriaComponent, IncomingCallsDataComponent, WaitingBackendComponent, CoinDateInputComponent, IncomingCallsNewGraphicComponent,
                      IncomingCallsTableComponent, DatepickerComponent ],
      providers: [ {provide: DataService, useValue: dataServiceMock}, {provide: UserFeedbackService, useValue: userFeedbackMock}, DatePipe, NgbTabsetConfig, PopoverConfig, ComponentLoaderFactory, PositioningService,
                   BooleanToStringPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingCallsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  let _params: any;


  function newParams(params: any){
    return _params = new params();
  }

  function setParams(startDate: Date){
    _params.StartDate = startDate;

    fixture.detectChanges();
  }

  function callsToFunctions(isPromiseResolved: boolean, params: SearchCallsIncomingCallsCriteriaParams){
    fixture.detectChanges();
    component.onViewIncomingCalls(params);

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

  function checkFeedbackMessage(text: string){
    fixture.debugElement.queryAll(By.css("div.col-lg-9 div.ibox-content")).map(c=>c.children.map(e=>e.nativeElement).
    find(i=>!i.querySelector('div'))).forEach(i=>{
      expect(i.innerText).toEqual(text);
    });
  }

  function checkIncomingCallsSpyData(spy: any, hour: number, total: number, index) {
    expect(spy[index].hour).toEqual(hour);
    expect(spy[index].total).toEqual(total);
  }

  function checkIncomingCallsSpyLength(spy:any, length: number){
    expect(spy.length).toEqual(length);

  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('not clicked', () => {

    checkFeedbackMessage('Select a date and press "View report"');

  });


  it('not resolve the promise', fakeAsync(() => {

    //filter params
    let params = newParams(SearchCallsIncomingCallsCriteriaParams);
    setParams(new Date());

    callsToFunctions(false, params);

    //stills loading and not stop
    checkFeedbackMessage('Getting incoming calls...');

  }));



  it('resolve the promise with empty incoming calls', fakeAsync(() => {

    //filter params
    let params = newParams(SearchCallsIncomingCallsCriteriaParams);
    setParams(new Date());

    //spy on DataService
    let spy = injectSpy(DataService,'getIncomingCalls', dataServiceMock.incomingCalls2);

    callsToFunctions(true, params);

    //expected length
    checkIncomingCallsSpyLength(spy.calls.first().object.incomingCalls2, 0);

    //when incoming calls are empty, not found message
    checkFeedbackMessage('No incoming calls found');

  }));


  it('resolve the promise with 1 incoming calls', fakeAsync(() => {

    //filter params
    let params = newParams(SearchCallsIncomingCallsCriteriaParams);
    setParams(new Date());

    //spy on DataService
    let spy = injectSpy(DataService,'getIncomingCalls', dataServiceMock.incomingCalls);

    callsToFunctions(true, params);

    //expected length
    checkIncomingCallsSpyLength(spy.calls.first().object.incomingCalls, 1);

    //check that de DataService data are correct
    checkIncomingCallsSpyData(spy.calls.first().object.incomingCalls, 13, 7, 0);

  }));


  it('resolve the promise with 2 incoming calls', fakeAsync(() => {

    //filter params
    let params = newParams(SearchCallsIncomingCallsCriteriaParams);
    setParams(new Date());

    //spy on the DataService
    let spy = injectSpy(DataService,'getIncomingCalls', dataServiceMock.incomingCalls3);

    callsToFunctions(true, params);

    //expected length
    checkIncomingCallsSpyLength(spy.calls.first().object.incomingCalls3, 2);

    //check that the DataService data are correct
    checkIncomingCallsSpyData(spy.calls.first().object.incomingCalls3,13, 7, 0);
    checkIncomingCallsSpyData(spy.calls.first().object.incomingCalls3,8, 20, 1);

  }));



});
