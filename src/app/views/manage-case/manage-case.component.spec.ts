import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ManageCaseComponent } from './manage-case.component';
import {TicklerCasesDetailComponent} from "../tickler-cases-detail/tickler-cases-detail.component";
import {ProcessCaseTicklerTableComponent} from "../process-case-tickler-table/process-case-tickler-table.component";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {NewTicklerCaseComponent} from "../new-tickler-case/new-tickler-case.component";
import {FormsModule} from "@angular/forms";
import {CampaignAttributeEditionComponent} from "../campaign-attribute-edition/campaign-attribute-edition.component";
import {CoinNumberInputComponent} from "../coin-number-input/coin-number-input.component";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {CoinNumberInputErrorsComponent} from "../coin-number-input-errors/coin-number-input-errors.component";
import {OwlMomentDateTimeModule} from "ng-pick-datetime-moment";
import {OwlDateTimeModule} from "ng-pick-datetime";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DataService} from "../../services/data.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {APP_BASE_HREF, DatePipe, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {RouterTestingModule} from "@angular/router/testing";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {By} from "@angular/platform-browser";
import {CoinCurrencyPipe} from "../../pipes/coin-currency.pipe";
import {ProcessCaseTickler} from "../../models/process-case-tickler";
import {ProcessCase} from "../../models/process-case";
import {Observable} from "rxjs/Observable";
import {TemporalStateServiceService} from "../../services/temporal-state-service.service";
import {TabCounterComponent} from "../tab-counter/tab-counter.component";
import {IboxtoolsComponent} from "../../components/common/iboxtools/iboxtools.component";
import {CustomerCallRecordsComponent} from "../customer-call-records/customer-call-records.component";

describe('ManageCaseComponent', () => {
  let component: ManageCaseComponent;
  let fixture: ComponentFixture<ManageCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, OwlDateTimeModule, OwlMomentDateTimeModule, BrowserAnimationsModule, HttpModule, RouterTestingModule ],
      declarations: [ ManageCaseComponent, TicklerCasesDetailComponent, ProcessCaseTicklerTableComponent, CoinDateTransformPipe, WaitingBackendComponent, NewTicklerCaseComponent,
                      CampaignAttributeEditionComponent, CoinNumberInputComponent, DatepickerComponent, CoinNumberInputErrorsComponent, CoinCurrencyPipe, TabCounterComponent,
                      IboxtoolsComponent, CustomerCallRecordsComponent ],
      providers: [ { provide: DataService, useValue: dataServiceMock }, { provide: UserFeedbackService, useValue: userFeedbackMock }, DatePipe, BooleanToStringPipe,
                   TemporalStateServiceService, Location, { provide: LocationStrategy, useClass: PathLocationStrategy }, { provide: APP_BASE_HREF, useValue: '/my/app'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //spy
  let spy;

  //set currentProcessCase value
  function setCurrentProcessCase(processCase: ProcessCase){
    component.currentProcessCase = processCase;
  }

  //function calls
  function componentFunctionCalls(isPromiseResolved:boolean){
    if(isPromiseResolved){
      fixture.detectChanges();
      component.ngOnInit();
      tick();
      fixture.detectChanges();
    }else{
      fixture.detectChanges();
      component.ngOnInit();
      fixture.detectChanges();
    }
  }


  //query By css the message
  function queryMessage(){
    return fixture.debugElement.queryAll(By.css("tickler-cases-detail div")).map(e=>e.nativeElement);
  }

  //check message
  function checkMessage(message:string){
   let div = queryMessage().find(i=>i.innerText == message);

   expect(div.innerText).toEqual(message);
  }

  //set spies values
  function setSpies(injector, method, value, isObservable){
    let d = fixture.debugElement.injector.get(injector);
    if(isObservable){
      spy = spyOn(d, method).and.returnValue(
        Observable.of(value)
      );

    }else{
      spy = spyOn(d, method).and.returnValue(Promise.resolve(value));
    }
  }


  //return the spy
  function getSpyCalls(){
    return spy;
  }


  //check spy
  function checkSpy(currentProcessCaseData, ProcessCaseTicklersLength){
    expect(getSpyCalls().calls.first().args[0]).toEqual(currentProcessCaseData);
    expect(component.processCaseTicklers.length).toEqual(ProcessCaseTicklersLength);
  }

  //check data
  function checkData(currentProcessCase: ProcessCase, processCaseTicklers: ProcessCaseTickler, account: Account){

    expect(component.currentProcessCase).toEqual(currentProcessCase);
    // expect(component.processCaseTicklers).toEqual(processCaseTicklers);
    // expect(component.account).toEqual(account);
  }


  //check specific data
  function checkCurrentProcessCase(id: number, accountId, cifId, caseDescription, processCode, statusCode, createdDate, followUpDate, CreatedBy){
    expect(component.currentProcessCase.id).toEqual(id);
    expect(component.currentProcessCase.accountId).toEqual(accountId);
    expect(component.currentProcessCase.cifId).toEqual(cifId);
    expect(component.currentProcessCase.caseDescription).toEqual(caseDescription);
    expect(component.currentProcessCase.processCode).toEqual(processCode);
    expect(component.currentProcessCase.statusCode).toEqual(statusCode);
    expect(component.currentProcessCase.createdDate).toEqual(createdDate);
    expect(component.currentProcessCase.followUpDueDate).toEqual(followUpDate);
    expect(component.currentProcessCase.createdBy).toEqual(CreatedBy);
  }

  //check specific data
  function checkProcessCaseTicklers(id, caseId, ticklerDescription, ticklerTypeCode, attributesCode, attributesValues,
                                    attributesPlainValues, createdDate, createdBy){

   let c =  component.processCaseTicklers.find(c=>c.id == id);

    expect(c.id).toEqual(id);
    expect(c.caseId).toEqual(caseId);
    expect(c.ticklerDescription).toEqual(ticklerDescription);
    expect(c.ticklerTypeCode).toEqual(ticklerTypeCode);
    expect(c.attributes[0].code).toEqual(attributesCode);
    expect(c.attributes[0].values).toEqual(attributesValues);
    expect(c.attributes[0].plainValues).toEqual(attributesPlainValues);
    expect(c.createdDate).toEqual(createdDate);
    expect(c.createdBy).toEqual(createdBy);

  }

  //check specific data
  function checkAccount(collateralInfo: string, dueDate: string, ficoScore: number, lPaymentDate: string, loanType: string, nExtension: number,
                        openDate: string, pDueDays: number, preExtensionDate: string, pBalance: number){


    expect(component.account.loan.collateralInformation).toEqual(collateralInfo);
    expect(component.account.collection.dueDate).toEqual(dueDate);
    expect(component.account.additionalInfo.ficoScore).toEqual(ficoScore);
    expect(component.account.collection.paymentDate).toEqual(lPaymentDate);
    expect(component.account.loan.loanType).toEqual(loanType);
    expect(component.account.collection.numberOfExtensionsLTD).toEqual(nExtension);
    expect(component.account.loan.loanDate).toEqual(openDate);
    expect(component.account.collection.daysPastDue).toEqual(pDueDays);
    expect(component.account.collection.dateOfLastExtension).toEqual(preExtensionDate);
    expect(component.account.loan.currentBalance).toEqual(pBalance);

  }

  //check specific data
  function checkAgent(account: string, firstName: string, lastName: string, isAssignedUser){
    if(isAssignedUser) {
      expect(component.currentAgent.account).toEqual(component.currentProcessCase.assignedUser);
      expect(component.currentAgent.account).toEqual(account);
      expect(component.currentAgent.firstName).toEqual(firstName);
      expect(component.currentAgent.lastName).toEqual(lastName);
    }else{
      expect(component.currentAgentCreatedBy.account).toEqual(component.currentProcessCase.createdBy);
      expect(component.currentAgentCreatedBy.account).toEqual(account);
      expect(component.currentAgentCreatedBy.firstName).toEqual(firstName);
      expect(component.currentAgentCreatedBy.lastName).toEqual(lastName);
    }

  }

  //check length
  function checkProcessCaseTicklersLength(length:number){
    expect(component.processCaseTicklers.length).toEqual(length);
  }


  it('not resolve the promise', fakeAsync(() => {

    setCurrentProcessCase(null);
    componentFunctionCalls(false);
    checkMessage("Searching...");
    checkData(null,null, null);

  }));

  it('resolve the promise with empty process case', fakeAsync(() => {

    setCurrentProcessCase(null);
    setSpies(DataService, "getCaseById", [], false);
    componentFunctionCalls(true);
    checkMessage("No data found.");
    checkData(undefined,null, null);

  }));

  it('resolve the promise with empty process case ticklers', fakeAsync(() => {

    setCurrentProcessCase(dataServiceMock.currentProcessCase[0]);
    setSpies(DataService, "getProcessCaseTicklers", [], false);
    componentFunctionCalls(true);
    checkSpy(component.currentProcessCase, 0);
    checkCurrentProcessCase(1,"122","123", "desc", "SPOC", "NEW",
      "2018-11-27T11:22:34.57", "2018-11-29T11:22:34.57","Guts");

    checkProcessCaseTicklersLength(0);


  }));

  it('resolve the promise with process case ticklers', fakeAsync(() => {

    //process case selected
    setCurrentProcessCase(dataServiceMock.currentProcessCase[0]);
    setSpies(DataService, "getProcessCaseTicklers", dataServiceMock.processCaseTicklers, false);
    componentFunctionCalls(true);

    checkSpy(component.currentProcessCase, 2);
    checkCurrentProcessCase(1,"122","123", "desc", "SPOC", "NEW",
      "2018-11-27T11:22:34.57", "2018-11-29T11:22:34.57","Guts");

    checkProcessCaseTicklers(2, 2, "desc2", "CUSTOMER2" , "CODE2",
      ["val2"], "val2", "2018-11-30T11:22:34.57" , "Yona");

    checkProcessCaseTicklers(1, 1, "desc1", "CUSTOMER1" , "CODE1",
      ["val1"], "val1", "2018-11-29T11:22:34.57" , "Hak");

    checkProcessCaseTicklersLength(2)


  }));


  it('resolve the promise with account data and agents', fakeAsync(() => {

    setCurrentProcessCase(dataServiceMock.currentProcessCase[0]);
    setSpies(DataService, "getCompleteInfoForAccount", dataServiceMock.account4, true);
    setSpies(DataService, "getProcessCaseTicklers", dataServiceMock.processCaseTicklers, false);
    setSpies(DataService, "getAgents", dataServiceMock.agent3, false);
    componentFunctionCalls(true);
    checkAccount("cInfo", "#due date", 10, "12/12/2005 12:00:00 AM", "#loan type", 77 ,
      "2/1/2001 12:00:00 AM", 60, "#date ole", 75);

    checkAgent("Isabeau", "Isabeau", "d'Anjou", true);
    checkAgent("Guts", "Guts", "black sword", false);


  }));

});
