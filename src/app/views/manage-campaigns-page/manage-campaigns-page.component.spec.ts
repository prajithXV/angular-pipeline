import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ManageCampaignsPageComponent } from './manage-campaigns-page.component';
import {IboxtoolsComponent} from "../../components/common/iboxtools/iboxtools.component";
import {ManageCampaignsComponent} from "../manage-campaigns/manage-campaigns.component";
import {ManageCampaignListsComponent} from "../manage-campaign-lists/manage-campaign-lists.component";
import {ManageCampaignListRecordsComponent} from "../manage-campaigns-list-records/manage-campaigns-list-records.component";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {FormsModule} from "@angular/forms";
import {PaginatorComponent} from "../paginator/paginator.component";
import {CampaignAttributeEditionComponent} from "../campaign-attribute-edition/campaign-attribute-edition.component";
import {CoinNumberInputComponent} from "../coin-number-input/coin-number-input.component";
import {CoinDateInputComponent} from "../coin-date-input/coin-date-input.component";
import {CoinNumberInputErrorsComponent} from "../coin-number-input-errors/coin-number-input-errors.component";
import {DataService} from "../../services/data.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {DatePipe} from "@angular/common";
import {GlobalStateService} from "../../services/global-state.service";
import {RouterTestingModule} from "@angular/router/testing";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {OwlDateTimeModule} from "ng-pick-datetime";
import {OwlMomentDateTimeModule} from "ng-pick-datetime-moment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {HeaderSorterComponent} from "../header-sorter/header-sorter.component";
import {OrderByPipe} from "../../pipes/order-by.pipe";
import {OrderByTypesComponent} from "../order-by-types/order-by-types.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgbModalStack} from "@ng-bootstrap/ng-bootstrap/modal/modal-stack";
import {By} from "@angular/platform-browser";

describe('ManageCampaignsPageComponent', () => {
  let component: ManageCampaignsPageComponent;
  let fixture: ComponentFixture<ManageCampaignsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule, OwlDateTimeModule, OwlMomentDateTimeModule, BrowserAnimationsModule, NgbModule ],
      declarations: [ ManageCampaignsPageComponent, IboxtoolsComponent, ManageCampaignsComponent, ManageCampaignListsComponent, ManageCampaignListRecordsComponent, WaitingBackendComponent,
                      PaginatorComponent, CampaignAttributeEditionComponent, CoinDateTransformPipe, CoinNumberInputComponent, CoinDateInputComponent, CoinNumberInputErrorsComponent,
                      DatepickerComponent, HeaderSorterComponent, OrderByPipe, OrderByTypesComponent ],

      providers: [ { provide: DataService, useValue: dataServiceMock }, { provide: UserFeedbackService, useValue: userFeedbackMock },
                     DatePipe, { provide: GlobalStateService, useValue: globalStateServiceMock }, CoinDateTransformPipe,
                     BooleanToStringPipe, NgbModalStack ]
    })
    .compileComponents();
  }));

  let spy: any;


  function callsToFunctions(isPromiseResolved: boolean){
    fixture.detectChanges();
    component.ngOnInit();

    if(isPromiseResolved){
       tick();
    }
    fixture.detectChanges();
  }

  function onClickTable(tableName: string){
    fixture.debugElement.query(By.css(tableName + " tbody tr")).nativeElement.click();

    fixture.detectChanges();

    tick();

    fixture.detectChanges();

  }

  function injectSpy(inject, method, value){
    let i = fixture.debugElement.injector.get(inject);
    return spy = spyOn(i, method).and.returnValue(Promise.resolve(value));
  }

  function checkFeedbackMessage(tableName: string, message: string){
    let p = fixture.debugElement.query(By.css(tableName + " p")).nativeElement;
    expect(p.innerText).toEqual(message);
  }

  function checkCampaignSpy(spy:any, index: number, code: string, name: string){
    expect(spy.calls.first().object.campaign[index].code).toEqual(code);
    expect(spy.calls.first().object.campaign[index].name).toEqual(name);
  }

  function checkCampaignListSpy(spy: any, id: number, createdBy: string, statusCode: string, orderedBy: string){

    let campaignList = spy.calls.first().object.campaignList.find(i=>i.id == id);

    expect(campaignList.id).toEqual(id);
    expect(campaignList.createdBy).toEqual(createdBy);
    expect(campaignList.statusCode).toEqual(statusCode);
    expect(campaignList.orderedBy).toEqual(orderedBy);
  }

  function checkCampaignListRecordsSpy(spy: any, index: number, campaignCode: string, statusCode: string, accountId: string, callPriority: string, lastCalledBy: string,
                                       nextCallUser: string, lastCalledDate: string, nextCallDate: string, orderByCode: string){

    expect(spy.calls.first().object.campaignListRecords[index].campaignCode).toEqual(campaignCode);
    expect(spy.calls.first().object.campaignListRecords[index].statusCode).toEqual(statusCode);
    expect(spy.calls.first().object.campaignListRecords[index].accountId).toEqual(accountId);
    expect(spy.calls.first().object.campaignListRecords[index].callPriority).toEqual(callPriority);
    expect(spy.calls.first().object.campaignListRecords[index].lastCalledBy).toEqual(lastCalledBy);
    expect(spy.calls.first().object.campaignListRecords[index].nextCallUser).toEqual(nextCallUser);
    expect(spy.calls.first().object.campaignListRecords[index].lastCalledDate).toEqual(lastCalledDate);
    expect(spy.calls.first().object.campaignListRecords[index].nextCallDate).toEqual(nextCallDate);
    expect(spy.calls.first().object.campaignListRecords[index].orderByCode).toEqual(orderByCode);
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCampaignsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('not resolve the promise', fakeAsync(() => {


    injectSpy(DataService, 'getGlobalCampaigns', dataServiceMock.campaign);

    callsToFunctions(false);

    checkFeedbackMessage('manage-campaigns', 'Getting campaigns...');

  }));


  it('resolve the promise with empty campaigns', fakeAsync(() => {

    injectSpy(DataService, 'getGlobalCampaigns', []);

    callsToFunctions(true);

    checkFeedbackMessage('manage-campaigns', 'No campaigns found');

  }));


  it('resolve the promise with campaigns', fakeAsync(() => {

    let spy = injectSpy(DataService, 'getGlobalCampaigns', dataServiceMock.campaign);
    callsToFunctions(true);

    checkCampaignSpy(spy, 0, "DEMO_CAMPAIGN", "Demo Campaign");
    checkCampaignSpy(spy, 1,"DIRECT","Direct");
    checkCampaignSpy(spy, 2,"INDIRECT","Indirect");
    checkCampaignSpy(spy, 3,"REAL_STATE", "Real State");

  }));


  it('resolve the promise and click on a campaign', fakeAsync(() => {

    injectSpy(DataService, 'getGlobalCampaigns', dataServiceMock.campaign);
    let spy2 = injectSpy(DataService, 'getCampaignLists', dataServiceMock.campaignList);
    injectSpy(DataService, 'getClOrderByTypes', dataServiceMock.campaignListOrderByType);

    callsToFunctions(true);

    onClickTable('manage-campaigns');

    checkCampaignListSpy(spy2,1,"Arslan","NEW","Timezone");
    checkCampaignListSpy(spy2,2,"Daryun","NEW","Id");
    checkCampaignListSpy(spy2,3,"Parm","NEW","Timezone");

  }));


  it('resolve the promise and click on a campaign and a campaign lists', fakeAsync(() => {


    injectSpy(DataService, 'getGlobalCampaigns', dataServiceMock.campaign);
    injectSpy(DataService, 'getCampaignLists', dataServiceMock.campaignList);
    injectSpy(DataService, 'getClOrderByTypes', dataServiceMock.campaignListOrderByType);
    let spy4 = injectSpy(DataService, 'getCampaignListRecords', dataServiceMock.campaignListRecords);

    callsToFunctions(true);

    onClickTable('manage-campaigns');
    onClickTable('manage-campaign-lists');


    checkCampaignListRecordsSpy(spy4, 0,"DIRECT","DONE","5555555","callp","Hak","Yona",
                                "2018-11-29T11:22:34.57","2018-11-30T11:22:34.57","TIMEZONE");

    checkCampaignListRecordsSpy(spy4, 1, "INDIRECT","NEW","6555555","callp2","Hak","Yona",
                        "2018-11-29T11:22:34.57","2018-11-30T11:22:34.57","TIMEZONE");

    checkCampaignListRecordsSpy(spy4, 2,"DIRECT","DONE","7555555","callp3","Hak","Yona",
                                "2018-11-29T11:22:34.57","2018-11-30T11:22:34.57","TIMEZONE");

  }));

});
