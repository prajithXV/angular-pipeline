import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {
  CollectorsProductivityReportComponent,
  CollectorsProductivityReportCriteria
} from './collectors-productivity-report.component';
import {CollectorsProductivityCriteriaComponent} from "../collectors-productivity-criteria/collectors-productivity-criteria.component";
import {CollectorsProductivityDataComponent} from "../collectors-productivity-data/collectors-productivity-data.component";
import {CoinDateInputComponent} from "../coin-date-input/coin-date-input.component";
import {CoinFixedNumber, CoinPercentagePipe} from "../../pipes/coin-percentage-pipe.pipe";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {FormsModule} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {DatePipe} from "@angular/common";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {GlobalStateService} from "../../services/global-state.service";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {OwlDateTimeModule} from "ng-pick-datetime";
import {OwlMomentDateTimeModule} from "ng-pick-datetime-moment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {By} from "@angular/platform-browser";

describe('CollectorsProductivityReportComponent', () => {
  let component: CollectorsProductivityReportComponent;
  let fixture: ComponentFixture<CollectorsProductivityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule, OwlDateTimeModule, OwlMomentDateTimeModule, BrowserAnimationsModule],
      declarations: [CollectorsProductivityReportComponent, CollectorsProductivityCriteriaComponent, CollectorsProductivityDataComponent, CoinDateInputComponent,
        CoinFixedNumber, CoinPercentagePipe, WaitingBackendComponent, DatepickerComponent],
      providers: [{provide: DataService, useValue: dataServiceMock},
        {provide: GlobalStateService, useValue: globalStateServiceMock},
        {
          provide: UserFeedbackService,
          useValue: userFeedbackMock
        }, DatePipe, CiscoCommsService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorsProductivityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  let criteria: CollectorsProductivityReportCriteria;


  function checkSearchingData(isSearching: boolean) {
    expect(component.searching).toEqual(isSearching);

  }

  function checkFeedbackMessage(message: string) {
    let div = fixture.debugElement.query(By.css("collectors-productivity-data div")).nativeElement;
    expect(div.innerText).toEqual(message);
  }


  function injectSpy(inject: any, method: string, value: any) {
    let i = fixture.debugElement.injector.get(inject);
    return spyOn(i, method).and.returnValue(Promise.resolve(value));
  }

  function onClickViewReport() {
    fixture.debugElement.nativeElement.querySelector('.collectorButton').click();
    fixture.detectChanges();
  }

  function setCriteriaValues() {
    //instances of criteria
    criteria = new CollectorsProductivityReportCriteria();

    //criteria have Date: from and to
    criteria.from = new Date();
    criteria.to = new Date();

  }

  function callsToFunctions() {
    fixture.detectChanges();
    component.searchData(criteria);
    tick();
    fixture.detectChanges();
  }


  function checkSpy(spy: any) {

    expect(spy.calls.first().object.productivityRecords).toBeTruthy();

    expect(spy.calls.first().object.productivityRecords[0].userCode).toEqual(component.productivityRecords[0].userCode);
    expect(spy.calls.first().object.productivityRecords[0].outboundCalls).toEqual(component.productivityRecords[0].outboundCalls);
    expect(spy.calls.first().object.productivityRecords[0].hoursWorked).toEqual(component.productivityRecords[0].hoursWorked);
    expect(spy.calls.first().object.productivityRecords[0].averageCallsPerHour).toEqual(component.productivityRecords[0].averageCallsPerHour);
    expect(spy.calls.first().object.productivityRecords[0].contact).toEqual(component.productivityRecords[0].contact);
    expect(spy.calls.first().object.productivityRecords[0].promises).toEqual(component.productivityRecords[0].promises);
    expect(spy.calls.first().object.productivityRecords[0].paymentReceived).toEqual(component.productivityRecords[0].paymentReceived);
    expect(spy.calls.first().object.productivityRecords[0].incomingCalls).toEqual(component.productivityRecords[0].incomingCalls);
    expect(spy.calls.first().object.productivityRecords[0].contactPercentage).toEqual(component.productivityRecords[0].contactPercentage);
    expect(spy.calls.first().object.productivityRecords[0].promiseToContactPercentage).toEqual(component.productivityRecords[0].promiseToContactPercentage);
    expect(spy.calls.first().object.productivityRecords[0].totalCalls).toEqual(component.productivityRecords[0].totalCalls);
  }

  function checkData(userCode?: string, outboundCalls?: number, hoursWorked?: string, averageCallsPerHour?: number, contact?: number, promises?: number,
                     paymentReceived?: number, incomingCalls?: number, contactPercentage?: number, promiseToContactPercentage?: number, totalCalls?: number) {

    if (userCode != null) {
      expect(component.productivityRecords[0].userCode).toEqual(userCode);
      expect(component.productivityRecords[0].outboundCalls).toEqual(outboundCalls);
      expect(component.productivityRecords[0].hoursWorked).toEqual(hoursWorked);
      expect(component.productivityRecords[0].averageCallsPerHour).toEqual(averageCallsPerHour);
      expect(component.productivityRecords[0].contact).toEqual(contact);
      expect(component.productivityRecords[0].promises).toEqual(promises);
      expect(component.productivityRecords[0].paymentReceived).toEqual(paymentReceived);
      expect(component.productivityRecords[0].incomingCalls).toEqual(incomingCalls);
      expect(component.productivityRecords[0].contactPercentage).toEqual(contactPercentage);
      expect(component.productivityRecords[0].promiseToContactPercentage).toEqual(promiseToContactPercentage);
      expect(component.productivityRecords[0].totalCalls).toEqual(totalCalls);

    } else {
      expect(component.productivityRecords).toEqual(null);
    }

  }


  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('Productivity Records Search Data promise not resolve', fakeAsync(() => {

    //expects searching = false when init
    checkSearchingData(false);

    //expects productivityRecords[] = null when init
    checkData();

    setCriteriaValues();

    //click button
    onClickViewReport();

    //inside searchData function: expects searching = true
    checkSearchingData(true);
    checkFeedbackMessage("Retrieving report data...");

    //expects that de productivityRecords[] = null, not resolve promise
    checkData();

  }));


  it('Productivity Records Search Data resolve promise', fakeAsync(() => {

    //expects searching = false when init
    checkSearchingData(false);

    //expects productivityRecords[] = null when init
    checkData();
    //create instances of criteria
    setCriteriaValues();

    //inject DataService to can spy it
    let spy = injectSpy(DataService, "getCollectorsProductivity", dataServiceMock.productivityRecords);

    callsToFunctions();

    checkSpy(spy);
    checkData("ajaillet", 1, "00:00", 6, 1, 5, 8, 4, 9, 5, 10);

    //expects searching = false
    checkSearchingData(false);

  }));


});

/*
* searching es false
* records null
*
* cridar al search data
*
* searching es true
* s'ha cridat dataservice
* records null
*
* provocar que es resolgui la promesa (tick)
*
* searching es false
* records contenene el que ha enviat el dataservice
 */
