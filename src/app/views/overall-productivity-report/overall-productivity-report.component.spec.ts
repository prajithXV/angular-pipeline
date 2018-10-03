import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { OverallProductivityReportComponent } from './overall-productivity-report.component';
import {CollectorsProductivityCriteriaComponent} from "../collectors-productivity-criteria/collectors-productivity-criteria.component";
import {OverallProductivityDataComponent} from "../overall-productivity-data/overall-productivity-data.component";
import {CoinDateInputComponent} from "../coin-date-input/coin-date-input.component";
import {CoinPercentagePipe} from "../../pipes/coin-percentage-pipe.pipe";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {FormsModule} from "@angular/forms";
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
import {CollectorsProductivityReportCriteria} from "../collectors-productivity-report/collectors-productivity-report.component";
import {By} from "@angular/platform-browser";

describe('OverallProductivityReportComponent', () => {
  let component: OverallProductivityReportComponent;
  let fixture: ComponentFixture<OverallProductivityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, OwlDateTimeModule, OwlMomentDateTimeModule, BrowserAnimationsModule ],
      declarations: [ OverallProductivityReportComponent, CollectorsProductivityCriteriaComponent, OverallProductivityDataComponent, CoinDateInputComponent, CoinPercentagePipe, WaitingBackendComponent,
                      DatepickerComponent ],
      providers: [{provide: DataService, useValue: dataServiceMock}, {provide: UserFeedbackService, useValue: userFeedbackMock}, DatePipe, BooleanToStringPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallProductivityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('not resolve the promise', fakeAsync(() => {

    //filter params
    let params  = new CollectorsProductivityReportCriteria();
    params.from = new Date();
    params.to = new Date();


    //detect the changes
    fixture.detectChanges();

    //calls the function with the filter params
    component.searchData(params);

    //then not resolve
    // tick();

    //update
    fixture.detectChanges();

    //not resolve promise --> stills searching
    let div = fixture.debugElement.query(By.css("overall-productivity-data div")).nativeElement.innerText;

    expect(div).toEqual('Retrieving report data...');
    expect(component.productivityRecords).toEqual(null);

  }));



  it('resolve the promise with empty overall productivity record', fakeAsync(() => {

    //filter params
    let params  = new CollectorsProductivityReportCriteria();
    params.from = new Date();
    params.to = new Date();

    //inject into DataService
    let d = fixture.debugElement.injector.get(DataService);

    //sy on DataService
    let spy = spyOn(d, 'getOverallProductivity').and.returnValue(Promise.resolve(dataServiceMock.overallProductivityRecord2));

    //detect the changes
    fixture.detectChanges();

    //calls to the function with the params
    component.searchData(params);

    //then
    tick();

    //update
    fixture.detectChanges();

    //when there are not records
    let div = fixture.debugElement.query(By.css("overall-productivity-data div")).nativeElement.innerText;

    expect(div).toEqual('Select a date range and press "View report"');
    expect(spy.calls.first().object.overallProductivityRecord2).toEqual(null);
    expect(component.productivityRecords).toEqual(null);


  }));


  it('resolve the promise with 1 overall productivity record', fakeAsync(() => {

    //filter params
    let params  = new CollectorsProductivityReportCriteria();
    params.from = new Date();
    params.to = new Date();

    //inject into DataService
    let d = fixture.debugElement.injector.get(DataService);

    //spy on DataService
    let spy = spyOn(d, 'getOverallProductivity').and.returnValue(Promise.resolve(dataServiceMock.overallProductivityRecord));

    //detect the changes
    fixture.detectChanges();

    //calls to the function with the filter
    component.searchData(params);

    //then
    tick();


    //update
    fixture.detectChanges();

    //spy length expected
    expect(spy.calls.first().object.overallProductivityRecord.length).toEqual(1);

    //check that the DataService data are correct
    expect(spy.calls.first().object.overallProductivityRecord[0].campaignName).toEqual('Direct');
    expect(spy.calls.first().object.overallProductivityRecord[0].total).toEqual(7);
    expect(spy.calls.first().object.overallProductivityRecord[0].contact).toEqual(10);
    expect(spy.calls.first().object.overallProductivityRecord[0].paymentReceived).toEqual(70);
    expect(spy.calls.first().object.overallProductivityRecord[0].promises).toEqual(50);
    expect(spy.calls.first().object.overallProductivityRecord[0].contactPercentage).toEqual(20);
    expect(spy.calls.first().object.overallProductivityRecord[0].promiseToContactPercentage).toEqual(30);

    //check that the component has the same data
    expect(component.productivityRecords[0].campaignName).toEqual('Direct');
    expect(component.productivityRecords[0].total).toEqual(7);
    expect(component.productivityRecords[0].contact).toEqual(10);
    expect(component.productivityRecords[0].paymentReceived).toEqual(70);
    expect(component.productivityRecords[0].promises).toEqual(50);
    expect(component.productivityRecords[0].contactPercentage).toEqual(20);
    expect(component.productivityRecords[0].promiseToContactPercentage).toEqual(30);


  }));


  it('resolve the promise with 2 overall productivity record', fakeAsync(() => {

    //filter params
    let params  = new CollectorsProductivityReportCriteria();
    params.from = new Date();
    params.to = new Date();

    //inject into the DataService
    let d = fixture.debugElement.injector.get(DataService);

    //spy on DataService
    let spy = spyOn(d, 'getOverallProductivity').and.returnValue(Promise.resolve(dataServiceMock.overallProductivityRecord3));

    //detect the changes
    fixture.detectChanges();

    //calls to the function with the filter
    component.searchData(params);

    //then
    tick();

    //update
    fixture.detectChanges();

    //spy length expected
    expect(spy.calls.first().object.overallProductivityRecord3.length).toEqual(2);

    //check that the DataService data are correct
    expect(spy.calls.first().object.overallProductivityRecord3[0].campaignName).toEqual('Direct');
    expect(spy.calls.first().object.overallProductivityRecord3[0].total).toEqual(7);
    expect(spy.calls.first().object.overallProductivityRecord3[0].contact).toEqual(10);
    expect(spy.calls.first().object.overallProductivityRecord3[0].paymentReceived).toEqual(70);
    expect(spy.calls.first().object.overallProductivityRecord3[0].promises).toEqual(50);
    expect(spy.calls.first().object.overallProductivityRecord3[0].contactPercentage).toEqual(20);
    expect(spy.calls.first().object.overallProductivityRecord3[0].promiseToContactPercentage).toEqual(30);

    expect(spy.calls.first().object.overallProductivityRecord3[1].campaignName).toEqual('Indirect');
    expect(spy.calls.first().object.overallProductivityRecord3[1].total).toEqual(8);
    expect(spy.calls.first().object.overallProductivityRecord3[1].contact).toEqual(12);
    expect(spy.calls.first().object.overallProductivityRecord3[1].paymentReceived).toEqual(77);
    expect(spy.calls.first().object.overallProductivityRecord3[1].promises).toEqual(55);
    expect(spy.calls.first().object.overallProductivityRecord3[1].contactPercentage).toEqual(25);
    expect(spy.calls.first().object.overallProductivityRecord3[1].promiseToContactPercentage).toEqual(35);


    //check that the component has the same data
    expect(component.productivityRecords[0].campaignName).toEqual('Direct');
    expect(component.productivityRecords[0].total).toEqual(7);
    expect(component.productivityRecords[0].contact).toEqual(10);
    expect(component.productivityRecords[0].paymentReceived).toEqual(70);
    expect(component.productivityRecords[0].promises).toEqual(50);
    expect(component.productivityRecords[0].contactPercentage).toEqual(20);
    expect(component.productivityRecords[0].promiseToContactPercentage).toEqual(30);

    expect(component.productivityRecords[1].campaignName).toEqual('Indirect');
    expect(component.productivityRecords[1].total).toEqual(8);
    expect(component.productivityRecords[1].contact).toEqual(12);
    expect(component.productivityRecords[1].paymentReceived).toEqual(77);
    expect(component.productivityRecords[1].promises).toEqual(55);
    expect(component.productivityRecords[1].contactPercentage).toEqual(25);
    expect(component.productivityRecords[1].promiseToContactPercentage).toEqual(35);

  }));


  it('resolve the promise with 3 overall productivity record', fakeAsync(() => {

    //filter params
    let params  = new CollectorsProductivityReportCriteria();
    params.from = new Date();
    params.to = new Date();

    //inject into the DataService
    let d = fixture.debugElement.injector.get(DataService);

    //spy on DataService
    let spy = spyOn(d, 'getOverallProductivity').and.returnValue(Promise.resolve(dataServiceMock.overallProductivityRecord4));

    //detect the changes
    fixture.detectChanges();

    //calls to the function with the filter
    component.searchData(params);

    //then
    tick();

    //update
    fixture.detectChanges();

    //spy length expected
    expect(spy.calls.first().object.overallProductivityRecord4.length).toEqual(3);

    //check that the DataService data are correct
    expect(spy.calls.first().object.overallProductivityRecord4[0].campaignName).toEqual('Direct');
    expect(spy.calls.first().object.overallProductivityRecord4[0].total).toEqual(7);
    expect(spy.calls.first().object.overallProductivityRecord4[0].contact).toEqual(10);
    expect(spy.calls.first().object.overallProductivityRecord4[0].paymentReceived).toEqual(70);
    expect(spy.calls.first().object.overallProductivityRecord4[0].promises).toEqual(50);
    expect(spy.calls.first().object.overallProductivityRecord4[0].contactPercentage).toEqual(20);
    expect(spy.calls.first().object.overallProductivityRecord4[0].promiseToContactPercentage).toEqual(30);

    expect(spy.calls.first().object.overallProductivityRecord4[1].campaignName).toEqual('Indirect');
    expect(spy.calls.first().object.overallProductivityRecord4[1].total).toEqual(8);
    expect(spy.calls.first().object.overallProductivityRecord4[1].contact).toEqual(12);
    expect(spy.calls.first().object.overallProductivityRecord4[1].paymentReceived).toEqual(77);
    expect(spy.calls.first().object.overallProductivityRecord4[1].promises).toEqual(55);
    expect(spy.calls.first().object.overallProductivityRecord4[1].contactPercentage).toEqual(25);
    expect(spy.calls.first().object.overallProductivityRecord4[1].promiseToContactPercentage).toEqual(35);

    expect(spy.calls.first().object.overallProductivityRecord4[2].campaignName).toEqual('Real Estate');
    expect(spy.calls.first().object.overallProductivityRecord4[2].total).toEqual(10);
    expect(spy.calls.first().object.overallProductivityRecord4[2].contact).toEqual(14);
    expect(spy.calls.first().object.overallProductivityRecord4[2].paymentReceived).toEqual(78);
    expect(spy.calls.first().object.overallProductivityRecord4[2].promises).toEqual(60);
    expect(spy.calls.first().object.overallProductivityRecord4[2].contactPercentage).toEqual(30);
    expect(spy.calls.first().object.overallProductivityRecord4[2].promiseToContactPercentage).toEqual(40);



    expect(component.productivityRecords[0].campaignName).toEqual('Direct');
    expect(component.productivityRecords[0].total).toEqual(7);
    expect(component.productivityRecords[0].contact).toEqual(10);
    expect(component.productivityRecords[0].paymentReceived).toEqual(70);
    expect(component.productivityRecords[0].promises).toEqual(50);
    expect(component.productivityRecords[0].contactPercentage).toEqual(20);
    expect(component.productivityRecords[0].promiseToContactPercentage).toEqual(30);

    expect(component.productivityRecords[1].campaignName).toEqual('Indirect');
    expect(component.productivityRecords[1].total).toEqual(8);
    expect(component.productivityRecords[1].contact).toEqual(12);
    expect(component.productivityRecords[1].paymentReceived).toEqual(77);
    expect(component.productivityRecords[1].promises).toEqual(55);
    expect(component.productivityRecords[1].contactPercentage).toEqual(25);
    expect(component.productivityRecords[1].promiseToContactPercentage).toEqual(35);

    expect(component.productivityRecords[2].campaignName).toEqual('Real Estate');
    expect(component.productivityRecords[2].total).toEqual(10);
    expect(component.productivityRecords[2].contact).toEqual(14);
    expect(component.productivityRecords[2].paymentReceived).toEqual(78);
    expect(component.productivityRecords[2].promises).toEqual(60);
    expect(component.productivityRecords[2].contactPercentage).toEqual(30);
    expect(component.productivityRecords[2].promiseToContactPercentage).toEqual(40);


  }));


});
