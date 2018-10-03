import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ContactPercentageReportComponent } from './contact-percentage-report.component';
import {CallsPerHourCriteriaComponent} from "../calls-per-hour-criteria/calls-per-hour-criteria.component";
import {ContactPercentageDataComponent} from "../contact-percentage-data/contact-percentage-data.component";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {FormsModule} from "@angular/forms";
import {CoinDateInputComponent} from "../coin-date-input/coin-date-input.component";
import {ComponentLoaderFactory, PopoverConfig, PopoverModule, PositioningService} from "ngx-bootstrap";
import {ContactPercentageNewGraphicComponent} from "../contact-percentage-new-graphic/contact-percentage-new-graphic.component";
import {NgbModule, NgbTabsetConfig} from "@ng-bootstrap/ng-bootstrap";
import {ContactPercentageTableComponent} from "../contact-percentage-table/contact-percentage-table.component";
import {ChartsModule} from "ng2-charts";
import {DataService} from "../../services/data.service";
import {BackendCommsService} from "../../services/backend-comms.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {ToastOptions, ToastsManager} from "ng2-toastr";
import {DatePipe} from "@angular/common";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {OwlDateTimeModule} from "ng-pick-datetime";
import {OwlMomentDateTimeModule} from "ng-pick-datetime-moment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {SearchContactPercentageCriteriaParams} from "../../models/search-contact-percentage-criteria-params";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {By} from "@angular/platform-browser";

describe('ContactPercentageReportComponent', () => {
  let component: ContactPercentageReportComponent;
  let fixture: ComponentFixture<ContactPercentageReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, PopoverModule, NgbModule, ChartsModule, HttpModule, OwlDateTimeModule, OwlMomentDateTimeModule, BrowserAnimationsModule ],
      declarations: [ ContactPercentageReportComponent, CallsPerHourCriteriaComponent, ContactPercentageDataComponent, WaitingBackendComponent, CoinDateInputComponent,
                      ContactPercentageNewGraphicComponent, ContactPercentageTableComponent, DatepickerComponent ],
      providers: [ {provide: DataService, useValue: dataServiceMock}, {provide: UserFeedbackService, useValue: userFeedbackMock}, DatePipe, NgbTabsetConfig, PopoverConfig, ComponentLoaderFactory, PositioningService,
                   BooleanToStringPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPercentageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('not clicked', () => {

    //text when not click on the button 'View Report'
    let div = fixture.debugElement.query(By.css("div.col-lg-9")).children;
    let text = div[0].query(By.css("div.ibox-content")).children.map(e=> e.nativeElement);

    expect(text[1].innerText).toEqual('Select a campaign and a date and press "View report"');

  });



  it('not resolve the promise', fakeAsync(() => {

    //filter params
    let params = new SearchContactPercentageCriteriaParams();
    params.CampaignCd = "DIRECT";
    params.StartDate = new Date();

    //detect changes
    fixture.detectChanges();

    //call functions
    component.ngOnInit();
    component.onViewContactData(params);

   // not resolve
   // tick();

    //upadte
    fixture.detectChanges();

    //stills loading
    let div = fixture.debugElement.query(By.css("div.col-lg-9")).children;
    let text = div[0].query(By.css("div.ibox-content")).children.map(e=> e.nativeElement);

    expect(text[1].innerText).toEqual('Getting contact percentage...');

  }));



  it('resolve the promise with empty contact percentage', fakeAsync(() => {

    //filter params
    let params = new SearchContactPercentageCriteriaParams();
    params.CampaignCd = "DIRECT";
    params.StartDate = new Date();

    //inject on DataService
    let d = fixture.debugElement.injector.get(DataService);

    //spy on DataService
    let spy = spyOn(d, 'getContactPercentage').and.returnValue(Promise.resolve(dataServiceMock.contactPercentage2));
    let spy2 = spyOn(d, 'getGlobalCampaigns').and.returnValue(Promise.resolve(dataServiceMock.campaign));

    //detect changes
    fixture.detectChanges();

    //call functions
    component.ngOnInit();
    component.onViewContactData(params);

    //then
    tick();

    //update
    fixture.detectChanges();

    //expected length
    expect(spy.calls.first().object.contactPercentage2.length).toEqual(0);
    expect(spy.calls.first().object.campaign.length).toEqual(4);

    //message expected whent empty contact percentage
    let div = fixture.debugElement.query(By.css("div.col-lg-9")).children;
    let text = div[0].query(By.css("div.ibox-content")).children.map(e=> e.nativeElement);

    expect(text[1].innerText).toEqual('No contact percentage found');

    //campaigns expected
    expect(spy2.calls.first().object.campaign[0].name).toEqual("Demo Campaign");
    expect(spy2.calls.first().object.campaign[1].name).toEqual("Direct");
    expect(spy2.calls.first().object.campaign[2].name).toEqual("Indirect");
    expect(spy2.calls.first().object.campaign[3].name).toEqual("Real State");


  }));


  it('resolve the promise with 1 contact percentage', fakeAsync(() => {

    //filter params
    let params = new SearchContactPercentageCriteriaParams();
    params.CampaignCd = "DIRECT";
    params.StartDate = new Date();

    //inject on DataService
    let d = fixture.debugElement.injector.get(DataService);

    //spy on DataService
    let spy = spyOn(d, 'getContactPercentage').and.returnValue(Promise.resolve(dataServiceMock.contactPercentage));
    let spy2 = spyOn(d, 'getGlobalCampaigns').and.returnValue(Promise.resolve(dataServiceMock.campaign));

    //detect changes
    fixture.detectChanges();

    //call functions
    component.ngOnInit();
    component.onViewContactData(params);

    //then
    tick();

    //update
    fixture.detectChanges();

    //check that the DataService data are correct
    expect(spy.calls.first().object.contactPercentage[0].campaignCode).toEqual('DIRECT');
    expect(spy.calls.first().object.contactPercentage[0].ContactPercentage).toEqual(20);
    expect(spy.calls.first().object.contactPercentage[0].hour).toEqual(13);

    //campaigns expected
    expect(spy2.calls.first().object.campaign[0].name).toEqual("Demo Campaign");
    expect(spy2.calls.first().object.campaign[1].name).toEqual("Direct");
    expect(spy2.calls.first().object.campaign[2].name).toEqual("Indirect");
    expect(spy2.calls.first().object.campaign[3].name).toEqual("Real State");

  }));


  it('resolve the promise with 2 contact percentage', fakeAsync(() => {

    //filter params
    let params = new SearchContactPercentageCriteriaParams();
    params.CampaignCd = "DIRECT";
    params.StartDate = new Date();

    //inject on DataService
    let d = fixture.debugElement.injector.get(DataService);

    //spy on DatService
    let spy = spyOn(d, 'getContactPercentage').and.returnValue(Promise.resolve(dataServiceMock.contactPercentage3));
    let spy2 = spyOn(d, 'getGlobalCampaigns').and.returnValue(Promise.resolve(dataServiceMock.campaign));

    //detect changes
    fixture.detectChanges();

    //call function
    component.ngOnInit();
    component.onViewContactData(params);

    //then
    tick();

    //update
    fixture.detectChanges();

    //check that the DataService data are correct
    expect(spy.calls.first().object.contactPercentage3[0].campaignCode).toEqual('DIRECT');
    expect(spy.calls.first().object.contactPercentage3[0].ContactPercentage).toEqual(20);
    expect(spy.calls.first().object.contactPercentage3[0].hour).toEqual(13);

    expect(spy.calls.first().object.contactPercentage3[1].campaignCode).toEqual('INDIRECT');
    expect(spy.calls.first().object.contactPercentage3[1].ContactPercentage).toEqual(35);
    expect(spy.calls.first().object.contactPercentage3[1].hour).toEqual(10);

    //campaigns expected
    expect(spy2.calls.first().object.campaign[0].name).toEqual("Demo Campaign");
    expect(spy2.calls.first().object.campaign[1].name).toEqual("Direct");
    expect(spy2.calls.first().object.campaign[2].name).toEqual("Indirect");
    expect(spy2.calls.first().object.campaign[3].name).toEqual("Real State");

  }));

  it('resolve the promise with 2 same contact percentage', fakeAsync(() => {

    //filter params
    let params = new SearchContactPercentageCriteriaParams();
    params.CampaignCd = "DIRECT";
    params.StartDate = new Date();

    //inject on DataService
    let d = fixture.debugElement.injector.get(DataService);

    //spy on DataService
    let spy = spyOn(d, 'getContactPercentage').and.returnValue(Promise.resolve(dataServiceMock.contactPercentage4));
    let spy2 = spyOn(d, 'getGlobalCampaigns').and.returnValue(Promise.resolve(dataServiceMock.campaign));

    //detect changes
    fixture.detectChanges();

    //call functions
    component.ngOnInit();
    component.onViewContactData(params);

    //then
    tick();

    //update
    fixture.detectChanges();

    //check that the DataService data are correct
    expect(spy.calls.first().object.contactPercentage4[0].campaignCode).toEqual('INDIRECT');
    expect(spy.calls.first().object.contactPercentage4[0].ContactPercentage).toEqual(40);
    expect(spy.calls.first().object.contactPercentage4[0].hour).toEqual(13);

    expect(spy.calls.first().object.contactPercentage4[1].campaignCode).toEqual('INDIRECT');
    expect(spy.calls.first().object.contactPercentage4[1].ContactPercentage).toEqual(20);
    expect(spy.calls.first().object.contactPercentage4[1].hour).toEqual(10);

    //campaigns expected
    expect(spy2.calls.first().object.campaign[0].name).toEqual("Demo Campaign");
    expect(spy2.calls.first().object.campaign[1].name).toEqual("Direct");
    expect(spy2.calls.first().object.campaign[2].name).toEqual("Indirect");
    expect(spy2.calls.first().object.campaign[3].name).toEqual("Real State");

  }));

});
