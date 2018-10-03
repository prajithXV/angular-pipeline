import {
  async, ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed,
  tick
} from '@angular/core/testing';

import { ManageAccountComponent } from './manage-account.component';
import {NgbModule, NgbTabsetConfig} from "@ng-bootstrap/ng-bootstrap";
import {ComponentLoaderFactory, PopoverConfig, PopoverModule, PositioningService} from "ngx-bootstrap";
import {CustomerNotesComponent} from "../customer-notes/customer-notes.component";
import {TabCounterComponent} from "../tab-counter/tab-counter.component";
import {CustomerCallRecordsComponent} from "../customer-call-records/customer-call-records.component";
import {NewCallRecordComponent} from "../new-call-record/new-call-record.component";
import {IboxtoolsComponent} from "../../components/common/iboxtools/iboxtools.component";
import {CustomersTableComponent} from "../customers-table/customers-table.component";
import {AccountsTableComponent} from "../accounts-table/accounts-table.component";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {AccountHistoryComponent} from "../account-history/account-history.component";
import {AccountAdditionalInfoComponent} from "../account-additional-info/account-additional-info.component";
import {AccountForeclosureComponent} from "../account-foreclosure/account-foreclosure.component";
import {AccountBakruptcyComponent} from "../account-bakruptcy/account-bakruptcy.component";
import {AccountLossMitigationComponent} from "../account-loss-mitigation/account-loss-mitigation.component";
import {AccountLoanComponent} from "../account-loan/account-loan.component";
import {AccountCollectionComponent} from "../account-collection/account-collection.component";
import {CustomerDetailComponent} from "../customer-detail/customer-detail.component";
import {CoinCurrencyPipe} from "../../pipes/coin-currency.pipe";
import {FormsModule} from "@angular/forms";
import {CoinNumberInputComponent} from "../coin-number-input/coin-number-input.component";
import {CoinDateInputComponent} from "../coin-date-input/coin-date-input.component";
import {CoinNumberInputErrorsComponent} from "../coin-number-input-errors/coin-number-input-errors.component";
import {RouterTestingModule} from "@angular/router/testing";
import {DataService} from "../../services/data.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {APP_BASE_HREF, DatePipe, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {GlobalStateService} from "../../services/global-state.service";
import {NgbModalStack} from "@ng-bootstrap/ng-bootstrap/modal/modal-stack";
import {NotificationTabComponent} from "../notification-tab/notification-tab.component";
import {CallRecordStandardSentencesComponent} from "../call-record-standard-sentences/call-record-standard-sentences.component";
import {TelephonePipe, TelephoneTypePipe} from "../../pipes/telephone.pipe";
import {AngularDraggableModule} from "angular2-draggable";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {CancelCallRecordComponent} from "../cancel-call-record/cancel-call-record.component";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {OwlDateTimeModule} from "ng-pick-datetime";
import {OwlMomentDateTimeModule} from "ng-pick-datetime-moment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {NewProcessCaseComponent} from "../new-process-case/new-process-case";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {CustomerConsentComponent} from "../customer-consent/customer-consent.component";
import {ConsentPipe} from "../../pipes/consent.pipe";
import {BooleanToStringOrderPipe} from "../../pipes/boolean-to-string-order.pipe";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {By} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {TemporalStateServiceService} from "../../services/temporal-state-service.service";
import {TicklerCasesTableComponent} from "../tickler-cases-table/tickler-cases-table.component";
import {ProcessCaseTicklerTableComponent} from "../process-case-tickler-table/process-case-tickler-table.component";
import {PaginatorComponent} from "../paginator/paginator.component";
import {HeaderSorterComponent} from "../header-sorter/header-sorter.component";
import {NewTicklerCaseComponent} from "../new-tickler-case/new-tickler-case.component";
import {CampaignAttributeEditionComponent} from "../campaign-attribute-edition/campaign-attribute-edition.component";
import {CampaignListAttribute} from "../../models/campaign-list-attribute";


describe('ManageAccountComponent', () => {
  let component: ManageAccountComponent;
  let fixture: ComponentFixture<ManageAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule, PopoverModule, FormsModule, RouterTestingModule, HttpModule, AngularDraggableModule, OwlDateTimeModule, OwlMomentDateTimeModule, BrowserAnimationsModule ],

      declarations: [ ManageAccountComponent, CustomerNotesComponent, TabCounterComponent, CustomerCallRecordsComponent, NewCallRecordComponent, IboxtoolsComponent,
                      CustomersTableComponent, AccountsTableComponent, WaitingBackendComponent, AccountHistoryComponent, AccountAdditionalInfoComponent,
                      AccountAdditionalInfoComponent, AccountForeclosureComponent, AccountBakruptcyComponent, AccountLossMitigationComponent, AccountLoanComponent,
                      AccountCollectionComponent, CustomerDetailComponent, CoinDateTransformPipe, CoinCurrencyPipe, CoinNumberInputComponent, CoinDateInputComponent, CoinNumberInputErrorsComponent,
                      NotificationTabComponent, CallRecordStandardSentencesComponent, TelephonePipe, CancelCallRecordComponent, DatepickerComponent, TelephoneTypePipe, NewProcessCaseComponent,
                      CustomerConsentComponent, ConsentPipe, TicklerCasesTableComponent, ProcessCaseTicklerTableComponent, PaginatorComponent, HeaderSorterComponent, NewTicklerCaseComponent,
                      CampaignAttributeEditionComponent ],

      providers: [ {provide: DataService, useValue: dataServiceMock }, { provide: UserFeedbackService, useValue: userFeedbackMock }, DatePipe, { provide: GlobalStateService, useValue: globalStateServiceMock }, NgbModalStack,
                   NgbTabsetConfig, PopoverConfig, ComponentLoaderFactory, PositioningService, BooleanToStringPipe, BooleanToStringOrderPipe,
                   TemporalStateServiceService, Location, { provide: LocationStrategy, useClass: PathLocationStrategy }, { provide: APP_BASE_HREF, useValue: '/my/app'},]
    })
    .compileComponents();
  }));

  let spy: any;

  function callsToFunctions(isPromiseResolved: boolean, tickms?: number){
    fixture.detectChanges();

    component.ngOnInit();
    if(isPromiseResolved){
      if(tickms!=null){
        tick(tickms)
      }else{
        tick();
      }
    }
    fixture.detectChanges();
  }


  function refresh(){
    tick(1500);
    fixture.detectChanges();
  }

  function onMouseenter(iIcon: string){
    let i = fixture.debugElement.queryAll(By.css("i." + iIcon)).map(e=>e.nativeElement);
    let event = new Event('mouseenter');

    i[0].dispatchEvent(event);

    tick(1500);

    fixture.detectChanges();
  }

  function onClick(isIcon: boolean, iIcon?: string, button?: string, element?:string){
    if(isIcon){
     let icon = fixture.debugElement.queryAll(By.css("i." + iIcon)).map(e=>e.nativeElement);
     if(icon.length!=0){
         icon[0].click();
     }
    }else{
      fixture.debugElement.queryAll(By.css(element)).map(e=>e.nativeElement).filter(e=>e.innerText.includes(button) && e.firstElementChild!=null ||
        e.innerText.includes(button) && e.attributes.length!=0)[0].click();
    }
    fixture.detectChanges();
    tick(1500);
    fixture.detectChanges();

  }

  function onClickTable(tableName: string, index: number){
   fixture.debugElement.queryAll(By.css(tableName + ' tr')).map(e=>e.nativeElement).filter(e=>e.firstElementChild.localName != 'th')[index].click();
   fixture.detectChanges();
   tick();
   fixture.detectChanges();
  }

  function onClickPhone(){
    fixture.debugElement.queryAll(By.css("customers-table dd")).map(e=>e.nativeElement)[4].click();
    fixture.detectChanges();

    tick(1500);

    fixture.detectChanges();
  }

  function injectSpy(inject, method, value, isObservable: boolean){
    let i = fixture.debugElement.injector.get(inject);

    if(isObservable){
      return spy = spyOn(i, method).and.returnValue(Observable.of(value));
    }else{
      return spy = spyOn(i, method).and.returnValue(Promise.resolve(value));
    }
  }


  function checkFeedbackMessage(customerDetailsMessage: string, relatedInfoMessage: string, customerRecordMessage: string, previousContactsMessage: string){

    let customerDetailsDiv = fixture.debugElement.query(By.css("div.ibox-content")).nativeElement.innerText;
    let relatedInfoDiv = fixture.debugElement.query(By.css("accounts-table div")).nativeElement.innerText;
    let customerRecordDiv = fixture.debugElement.query(By.css("customer-call-records div")).nativeElement.innerText;
    let previousContactsDiv = fixture.debugElement.query(By.css("div.pull-right")).nativeElement.innerText;

    expect(customerDetailsDiv).toEqual(customerDetailsMessage);
    expect(relatedInfoDiv).toEqual(relatedInfoMessage);
    expect(customerRecordDiv).toEqual(customerRecordMessage);
    expect(previousContactsDiv).toEqual(previousContactsMessage);

  }

  function checkBasicData(cName: string, cLastName: string, cCompleteName: string, address: string, pNumber: string, lineType: number, typeDescription: string, type: number,
                          hasConsent: boolean, cifno: string, ssn: string, language: string, dPastDue: number, pAmountDue: number, pPastDue: number, paymentAmount: number,
                          lPromiseDate: string, otherCharges: number, lateCharges: number, escrowBalance: number, paymentsDue: number, interestDue: number, lWorkDate: string,
                          loanTerm: string, loanDate: string, loanRate: string, lBalance: number, lcurrentPayOff: number, addInfoEaPcFlag: string){

    expect(component.account.customer.mainContact.firstName).toEqual(cName);
    expect(component.account.customer.mainContact.lastName).toEqual(cLastName);
    expect(component.account.customer.mainContact.completeName).toEqual(cCompleteName);
    expect(component.account.customer.mainAddress.streetAddress1).toEqual(address);
    expect(component.account.customer.phones[0].number).toEqual(pNumber);
    expect(component.account.customer.phones[0].lineType).toEqual(lineType);
    expect(component.account.customer.phones[0].typeDescription).toEqual(typeDescription);
    expect(component.account.customer.phones[0].type).toEqual(type);
    expect(component.account.customer.hasConsent).toEqual(hasConsent);
    expect(component.account.customer.cifNo).toEqual(cifno);
    expect(component.account.customer.socialSecurityNumber).toEqual(ssn);

    expect(component.account.collection.languageCode).toEqual(language);
    expect(component.account.collection.daysPastDue).toEqual(dPastDue);
    expect(component.account.collection.principalAmountDue).toEqual(pAmountDue);
    expect(component.account.collection.principalPastDue).toEqual(pPastDue);
    expect(component.account.collection.paymentAmount).toEqual(paymentAmount);
    expect(component.account.collection.lastPromiseDate).toEqual(lPromiseDate);
    expect(component.account.collection.otherCharges).toEqual(otherCharges);
    expect(component.account.collection.lateCharges).toEqual(lateCharges);
    expect(component.account.collection.escrowBalance).toEqual(escrowBalance);
    expect(component.account.collection.paymentsDue).toEqual(paymentsDue);
    // expect(component.account.collection.paymentDate).toEqual("2018-12-13T11:34:26.937");
    expect(component.account.collection.interestDue).toEqual(interestDue);
    expect(component.account.collection.lastWorkDate).toEqual(lWorkDate);

    expect(component.account.loan.loanTerm).toEqual(loanTerm);
    expect(component.account.loan.loanDate).toEqual(loanDate);
    expect(component.account.loan.rate).toEqual(loanRate);
    expect(component.account.loan.currentBalance).toEqual(lBalance);
    expect(component.account.loan.currentPayOff).toEqual(lcurrentPayOff);

    expect(component.account.additionalInfo.eaPcFlag).toEqual(addInfoEaPcFlag);
  }


  function checkCollectionData(paymentAmount: number, pastDueAmount: number, interestDue: number, otherCharges: number, escrowBalance: number, dueDate: string, lastWorkDate: string,
                               paymentsDue: number, collectionStatusCode: string, numberOfExtensionsYTD: number, numberOfExtensionsLTD: number, chargeOffAmount: number, interestRateChangeDate: string,
                               paymentDate: string, nextPaymentDate: string, principalAmountDue: number, lateCharges: number, daysPastDue: number, promiseDate: string, lastPromiseDate: string, loanStatus: string,
                               dateOfLastExtension: string, nonAccrualDate: string, pastDue10LTD: string, pastDue30LTD: string, pastDue60LTD: string, pastDue90LTD: string, memoPostProPay: Array<string>, isMemoPostProPay: boolean){

    expect(component.account.collection.paymentAmount).toEqual(paymentAmount);
    expect(component.account.collection.pastDueAmount).toEqual(pastDueAmount);
    expect(component.account.collection.interestDue).toEqual(interestDue);
    expect(component.account.collection.otherCharges).toEqual(otherCharges);
    expect(component.account.collection.escrowBalance).toEqual(escrowBalance);
    expect(component.account.collection.dueDate).toEqual(dueDate);
    expect(component.account.collection.lastWorkDate).toEqual(lastWorkDate);
    expect(component.account.collection.paymentsDue).toEqual(paymentsDue);
    expect(component.account.collection.collectionStatusCode).toEqual(collectionStatusCode);
    expect(component.account.collection.numberOfExtensionsYTD).toEqual(numberOfExtensionsYTD);
    expect(component.account.collection.numberOfExtensionsLTD).toEqual(numberOfExtensionsLTD);
    expect(component.account.collection.chargeOffAmount).toEqual(chargeOffAmount);
    expect(component.account.collection.interestRateChangeDate).toEqual(interestRateChangeDate);
    expect(component.account.collection.paymentDate).toEqual(paymentDate);
    expect(component.account.collection.nextPaymentDate).toEqual(nextPaymentDate);
    expect(component.account.collection.principalAmountDue).toEqual(principalAmountDue);
    expect(component.account.collection.lateCharges).toEqual(lateCharges);
    expect(component.account.collection.daysPastDue).toEqual(daysPastDue);
    expect(component.account.collection.promiseDate).toEqual(promiseDate);
    expect(component.account.collection.lastPromiseDate).toEqual(lastPromiseDate);
    expect(component.account.collection.loanStatus).toEqual(loanStatus);
    expect(component.account.collection.dateOfLastExtension).toEqual(dateOfLastExtension);
    expect(component.account.collection.nonAccrualDate).toEqual(nonAccrualDate);
    expect(component.account.collection.pastDue10LTD).toEqual(pastDue10LTD);
    expect(component.account.collection.pastDue30LTD).toEqual(pastDue30LTD);
    expect(component.account.collection.pastDue60LTD).toEqual(pastDue60LTD);
    expect(component.account.collection.pastDue90LTD).toEqual(pastDue90LTD);
    expect(component.account.collection.memoPostProPay).toEqual(memoPostProPay);
    // expect(component.account.collection.delinquencyReason).toEqual(""); // revisar

    expect(component.isMemoPostProPay()).toEqual(isMemoPostProPay);
  }


  function checkLoanData(collateralInformation: string, loanType: string, currentPayOff: number, loanTerm: string, ltv: string, lienPosition: number, officer: string,
                         currentBalance: number, loanDate: string, rate: string, appraisedAmount: number, updatedAppraisal: string){

    expect(component.account.loan.collateralInformation).toEqual(collateralInformation);
    expect(component.account.loan.loanType).toEqual(loanType);
    expect(component.account.loan.currentPayOff).toEqual(currentPayOff);
    expect(component.account.loan.loanTerm).toEqual(loanTerm);
    expect(component.account.loan.ltv).toEqual(ltv);
    expect(component.account.loan.lienPosition).toEqual(lienPosition);
    expect(component.account.loan.officer).toEqual(officer);
    expect(component.account.loan.currentBalance).toEqual(currentBalance);
    expect(component.account.loan.loanDate).toEqual(loanDate);
    expect(component.account.loan.rate).toEqual(rate);
    expect(component.account.loan.appraisedAmount).toEqual(appraisedAmount);
    expect(component.account.loan.updatedAppraisal).toEqual(updatedAppraisal);
  }

  function checkLossMitigationData(foreclosureFlag: string, ticklers: string, actionCodes: string, restructuredDebtFlag: string, foreclosureDate: string, ticklerDates: string,
                                    actionStatus: string, restructuredDate: string ){

    expect(component.account.lossMitigation.foreclosureFlag).toEqual(foreclosureFlag);
    expect(component.account.lossMitigation.ticklers).toEqual(ticklers);
    expect(component.account.lossMitigation.actionCodes).toEqual(actionCodes);
    expect(component.account.lossMitigation.restructuredDebtFlag).toEqual(restructuredDebtFlag);
    expect(component.account.lossMitigation.foreclosureDate).toEqual(foreclosureDate);
    expect(component.account.lossMitigation.ticklerDates).toEqual(ticklerDates);
    expect(component.account.lossMitigation.actionStatus).toEqual(actionStatus);
    expect(component.account.lossMitigation.restructuredDate).toEqual(restructuredDate);
  }

  function checkBankruptcyData(bankruptcyType: string, bankAttorneyInfo: string, dateFiled: string, caseNumber: number, dischargeDismissalDate: string, ticklerDates: string,
                               actionStatus: string, borrowerAttorneyInfo: string, trusteeInfo: string, dateNoticeReceived: string, dischargeDismissalFlag: string, ticklers: string,
                               actionCodes, bankruptcyStopCodes: string){

    expect(component.account.bankruptcy.bankruptcyType).toEqual(bankruptcyType);
    expect(component.account.bankruptcy.bankAttorneyInfo).toEqual(bankAttorneyInfo);
    expect(component.account.bankruptcy.dateFiled).toEqual(dateFiled);
    expect(component.account.bankruptcy.caseNumber).toEqual(caseNumber);
    expect(component.account.bankruptcy.dischargeDismissalDate).toEqual(dischargeDismissalDate);
    expect(component.account.bankruptcy.ticklerDates).toEqual(ticklerDates);
    expect(component.account.bankruptcy.actionStatus).toEqual(actionStatus);
    expect(component.account.bankruptcy.borrowerAttorneyInfo).toEqual(borrowerAttorneyInfo);
    expect(component.account.bankruptcy.trusteeInfo).toEqual(trusteeInfo);
    expect(component.account.bankruptcy.dateNoticeReceived).toEqual(dateNoticeReceived);
    expect(component.account.bankruptcy.dischargeDismissalFlag).toEqual(dischargeDismissalFlag);
    expect(component.account.bankruptcy.ticklers).toEqual(ticklers);
    expect(component.account.bankruptcy.actionCodes).toEqual(actionCodes);
    expect(component.account.bankruptcy.bankruptcyStopCodes).toEqual(bankruptcyStopCodes);
  }

  function checkForeclosureData(borrowerAttorneyInfo: string, dateFiled: string, caseNumber: number, ticklers: string, actionCodes: string, bankAttorneyInfo: string,
                                dateNoticeReceived: string, litigationCode: string, ticklerDates: string, actionStatus: string ){

    expect(component.account.foreclosure.borrowerAttorneyInfo).toEqual(borrowerAttorneyInfo);
    expect(component.account.foreclosure.dateFiled).toEqual(dateFiled);
    expect(component.account.foreclosure.caseNumber).toEqual(caseNumber);
    expect(component.account.foreclosure.ticklers).toEqual(ticklers);
    expect(component.account.foreclosure.actionCodes).toEqual(actionCodes);
    expect(component.account.foreclosure.bankAttorneyInfo).toEqual(bankAttorneyInfo);
    expect(component.account.foreclosure.dateNoticeReceived).toEqual(dateNoticeReceived);
    expect(component.account.foreclosure.litigationCode).toEqual(litigationCode);
    expect(component.account.foreclosure.ticklerDates).toEqual(ticklerDates);
    expect(component.account.foreclosure.actionStatus).toEqual(actionStatus);
  }


  function checkAdditionalData(riskRating: number, vantage3Score: number, ficoScore: number, bankruptcyScore: number, riskRatingDate: string, ficoScoreDate: string,
                               bankruptcyScoreDate: string){

    expect(component.account.additionalInfo.riskRating).toEqual(riskRating);
    expect(component.account.additionalInfo.vantage3Score).toEqual(vantage3Score);
    expect(component.account.additionalInfo.ficoScore).toEqual(ficoScore);
    expect(component.account.additionalInfo.bankruptcyScore).toEqual(bankruptcyScore);
    expect(component.account.additionalInfo.riskRatingDate).toEqual(riskRatingDate);
    expect(component.account.additionalInfo.ficoScoreDate).toEqual(ficoScoreDate);
    expect(component.account.additionalInfo.bankruptcyScoreDate).toEqual(bankruptcyScoreDate);
  }

  function checkHistoryData(postDate: string, effectDate: string, pmtDueDate: string, amount: number, trnCodeCode: string, trnCodeDescription: string, trnType: string,
                            affCode: string){

    expect(component.account.history[0].postDate).toEqual(postDate);
    expect(component.account.history[0].effectDate).toEqual(effectDate);
    expect(component.account.history[0].pmtDueDate).toEqual(pmtDueDate);
    expect(component.account.history[0].amount).toEqual(amount);
    expect(component.account.history[0].trnCodeCode).toEqual(trnCodeCode);
    expect(component.account.history[0].trnCodeDescription).toEqual(trnCodeDescription);
    expect(component.account.history[0].trnType).toEqual(trnType);
    expect(component.account.history[0].affCode).toEqual(affCode);
  }

  function checkRelatedAccountsData(accountId: string, accountType: string, amount: number, stateDescription: string, relationDescription: string, productCode: string,
                                    productDescription: string){

    expect(component.account.customer.accounts[0].accountId).toEqual(accountId);
    expect(component.account.customer.accounts[0].accountType).toEqual(accountType);
    expect(component.account.customer.accounts[0].amount).toEqual(amount);
    expect(component.account.customer.accounts[0].stateDescription).toEqual(stateDescription);
    expect(component.account.customer.accounts[0].relationDescription).toEqual(relationDescription);
    expect(component.account.customer.accounts[0].productCode).toEqual(productCode);
    expect(component.account.customer.accounts[0].productDescription).toEqual(productDescription);
  }

  function checkCoborrowersData(completeName: string, firstName: string, lastName: string, streetAddress1: string, city: string, stateCode: string){

    expect(component.account.customer.coBorrowers[0].mainContact.completeName).toEqual(completeName);
    expect(component.account.customer.coBorrowers[0].mainContact.firstName).toEqual(firstName);
    expect(component.account.customer.coBorrowers[0].mainContact.lastName).toEqual(lastName);
    expect(component.account.customer.coBorrowers[0].mainAddress.streetAddress1).toEqual(streetAddress1);
    expect(component.account.customer.coBorrowers[0].mainAddress.city).toEqual(city);
    expect(component.account.customer.coBorrowers[0].mainAddress.stateCode).toEqual(stateCode);
  }

  function checkRouter(spy: any, routerData: Array<any>){
    expect(spy.calls.first().args[0]).toEqual(routerData);
  }


  function checkPopover(isOpen: boolean){
    let popover = fixture.debugElement.queryAll(By.css("customer-consent")).map(e=>e.nativeElement);
    fixture.detectChanges();

    if(isOpen){
      expect(popover.length).toEqual(1);
    }else{
      expect(popover.length).toEqual(0);
    }
  }

  function checkNewCallRecordBox(isOpen: boolean){
    expect(component.newCalliBox.isOpen).toEqual(isOpen);
  }

  function checkTodayContacts(todayContacts: number, hasRedClass: boolean){
    let todayContactsSpan = fixture.debugElement.query(By.css("span.pull-right.todayContacts"));

    expect(component.account.customer.todayContacts).toEqual(todayContacts);
    expect(todayContactsSpan.classes.red).toEqual(hasRedClass);
  }

  function checkCallLater(isFirstCall: boolean, index: number){
    let callLater = fixture.debugElement.queryAll(By.css("customer-call-records div.feed-element")).map(e=>e.nativeElement);

    if(isFirstCall){
      expect(callLater[index].classList).toContain("firstCall");
    }else{
      expect(callLater[index].classList).not.toContain("firstCall");

      }
    }

    function checkCallRecords(lastName: string, firstName: string, createdBy: string, createdDate: string, result: string, action: string, contacted: string,
                              promisedDate: string, promisedAmount: number, nextWorkDate: string, callNote: string, index: number ){

      expect(component.account.customer.callRecords[index].lastName).toEqual(lastName);
      expect(component.account.customer.callRecords[index].firstName).toEqual(firstName);
      expect(component.account.customer.callRecords[index].createdBy).toEqual(createdBy);
      expect(component.account.customer.callRecords[index].createdDate).toEqual(createdDate);
      expect(component.account.customer.callRecords[index].result).toEqual(result);
      expect(component.account.customer.callRecords[index].action).toEqual(action);
      expect(component.account.customer.callRecords[index].contacted).toEqual(contacted);
      expect(component.account.customer.callRecords[index].promisedDate).toEqual(promisedDate);
      expect(component.account.customer.callRecords[index].promisedAmount).toEqual(promisedAmount);
      expect(component.account.customer.callRecords[index].nextWorkDate).toEqual(nextWorkDate);
      expect(component.account.customer.callRecords[index].callNote).toEqual(callNote);
    }

    function checkNotes(customerId: string, accountId: string, accountType: string, startDate: string, endDate: string, msgType: string, msgCategory: string,
                        message: string, index: number){

      expect(component.account.customer.notes[index].customerId).toEqual(customerId);
      expect(component.account.customer.notes[index].accountId).toEqual(accountId);
      expect(component.account.customer.notes[index].accountType).toEqual(accountType);
      expect(component.account.customer.notes[index].startDate).toEqual(startDate);
      expect(component.account.customer.notes[index].endDate).toEqual(endDate);
      expect(component.account.customer.notes[index].msgType).toEqual(msgType);
      expect(component.account.customer.notes[index].msgCategory).toEqual(msgCategory);
      expect(component.account.customer.notes[index].message).toEqual(message);
    }


    function checkAlerts(customerId: string, accountId: string, accountType: string, startDate: string, endDate: string, msgType: string, msgCategory: string, message: string){
      expect(component.account.customer.alerts[0].customerId).toEqual(customerId);
      expect(component.account.customer.alerts[0].accountId).toEqual(accountId);
      expect(component.account.customer.alerts[0].accountType).toEqual(accountType);
      expect(component.account.customer.alerts[0].startDate).toEqual(startDate);
      expect(component.account.customer.alerts[0].endDate).toEqual(endDate);
      expect(component.account.customer.alerts[0].msgType).toEqual(msgType);
      expect(component.account.customer.alerts[0].msgCategory).toEqual(msgCategory);
      expect(component.account.customer.alerts[0].message).toEqual(message);
    }

    function checkProcessCases(id: number, accountId: string, assignedUser: string, caseDescription: string, cifId: string, createdBy: string,
                               createdDate: string, followUpDueDate: string, processCode: string, statusCode: string){

      let tCase = component.processCases.find(i=>i.id == id);

      expect(tCase.id).toEqual(id);
      expect(tCase.accountId).toEqual(accountId);
      expect(tCase.assignedUser).toEqual(assignedUser);
      expect(tCase.caseDescription).toEqual(caseDescription);
      expect(tCase.cifId).toEqual(cifId);
      expect(tCase.createdBy).toEqual(createdBy);
      expect(tCase.createdDate).toEqual(createdDate);
      expect(tCase.followUpDueDate).toEqual(followUpDueDate);
      expect(tCase.processCode).toEqual(processCode);
      expect(tCase.statusCode).toEqual(statusCode);
    }


    function checkTicklers(value?:any, id?: number, caseId?: number, ticklerTypeCode?: string, ticklerDescription?: string, createdBy?: string, createdDate?: string,
                           attributes?: Array<any>){

      if(id!=null){
        let tickler = component.processCaseTicklers.find(i=>i.id == id);

        expect(tickler.id).toEqual(id);
        expect(tickler.caseId).toEqual(caseId);
        expect(tickler.ticklerTypeCode).toEqual(ticklerTypeCode);
        expect(tickler.ticklerDescription).toEqual(ticklerDescription);
        expect(tickler.createdBy).toEqual(createdBy);
        expect(tickler.createdDate).toEqual(createdDate);
        expect(tickler.attributes).toEqual(attributes);
      }else{
        expect(component.processCaseTicklers).toEqual(value);
      }
    }


  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('not resolve the promise', fakeAsync(() => {

    callsToFunctions(false);
    checkFeedbackMessage("Searching for account...", "Searching...", "Searching...", "Searching...")

  }));


  it('resolve the promise with data: Basic tab', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    callsToFunctions(true, 1500);
    checkBasicData("Nick","Furia","Nick Furia","SHIELD","777777777",0,"Business Phone",1,true,
                  "777","555555","#lCode",60,777,8888,777777,"#last prom date",6,5,
                  10,7,9999,"#last work date","#loan term","2/1/2001 12:00:00 AM","#loan rate",75,
                  45,"true");

  }));


  it('resolve the promise with data: Basic tab and hover on autodial consent', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    injectSpy(DataService, 'getCustomerConsents', dataServiceMock.customerConsents, false);

    checkPopover(false);

    callsToFunctions(true, 1500);
    refresh();
    onMouseenter('fa.fa-info-circle');
    checkPopover(true);


  }));


  it('resolve the promise with data: Basic tab and click on consent phone', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    callsToFunctions(true);

    checkNewCallRecordBox(false);

    onClick(true,'fa.fa-phone');

    refresh();

    checkNewCallRecordBox(true);

  }));

  it('resolve the promise with data: Basic tab and click on not consent phone', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account5, true);
    callsToFunctions(true);

    checkNewCallRecordBox(false);

    onClick(true,'fa.fa-phone');

    refresh();

    checkNewCallRecordBox(false);


  }));



  it('resolve the promise with data: Collection tab and memo word', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    callsToFunctions(true);

    onClick(false, null, 'Collection', 'span');

    checkCollectionData(777777,5555,9999,6,10,"#due date","#last work date",7,
                        "#collection status",555,77,5,"#interest rate change date",
                        "12/12/2005 12:00:00 AM","12/12/2006 12:00:00 AM",777,5,60,"#prom date",
                        "#last prom date","#loan status","#date ole","#non ad","#past due 10",
                        "#past due 30","#past due 60","#past due 90",["MemoPostProPay", "memo", "cust", "custi"],true);
  }));



  it('resolve the promise with data: Collection tab and not memo word', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account5, true);
    callsToFunctions(true);

    onClick(false, null, 'Collection', 'span');

    checkCollectionData(777777,5555,9999,6,10,"#due date","#last work date",7,
      "#collection status",555,77,5,"#interest rate change date",
      "12/12/2005 12:00:00 AM","12/12/2006 12:00:00 AM",777,5,60,"#prom date",
      "#last prom date","#loan status","#date ole","#non ad","#past due 10",
      "#past due 30","#past due 60","#past due 90",["cust", "custi"],false);

  }));


  it('resolve the promise with data: Loan tab', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    callsToFunctions(true);

    onClick(false, null, 'Loan', 'span');
    checkLoanData("cInfo","#loan type",45,'#loan term','#ltv',7,"Hak",75,"2/1/2001 12:00:00 AM",
                  "#loan rate",55,"#updated appr");
  }));

  it('resolve the promise with data: Loss Mitigation tab', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    callsToFunctions(true);

    onClick(false, null, 'Loss mitigation', 'span');
    checkLossMitigationData("Y","#ticklers","#aCodes","#restructured df","2/1/2018 12:00:00 AM",
                            "#tickler dates","#action status","#re date");
  }));


  it('resolve the promise with data: Bankruptcy tab', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    callsToFunctions(true);

    onClick(false, null, 'Bankruptcy', 'span');

    checkBankruptcyData("L","#bank ai","#datef",5,"#discharge dd","#tickler dates","#aStatus",
                        "#borrower ai","#trust info","#date nr","false","#ticklers","#aCodes","#bank sc");
  }));



  it('resolve the promise with data: Foreclosure tab', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    callsToFunctions(true, 1500);

    onClick(false, null, 'Foreclosure', 'span');

    checkForeclosureData("#borrower ai","#date field",5,"#ticklers","#aCodes","#bank ai",
                          "#date nr","#litigation codes","tickler dates","#aStatus");
  }));


  it('resolve the promise with data: Additional tab', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    callsToFunctions(true, 1500);

    onClick(false, null, 'Additional', 'span');

    checkAdditionalData(50,17,10,45,"#risk rd","#fico sd","#bsd");

  }));


  it('resolve the promise with data: History tab', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    callsToFunctions(true, 1500);

    onClick(false, null, 'History', 'span');

    checkHistoryData("#post date","#effect date","#pmt dd",77,"#trnCodeCode","#trnCodeDesc","#trnType","#affCode");

  }));


  it('resolve the promise with data: Related accounts tab', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    callsToFunctions(true, 1500);

    checkRelatedAccountsData("787878","L",75,"Active","Primary","01","Vendor");

  }));

  it('resolve the promise with data: Related accounts tab and click on "Go" button ', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    let spyOnRouter = injectSpy(Router, 'navigate', true, false);

    callsToFunctions(true, 1500);


    onClick(false, null, 'Go', 'button');

    checkRouter(spyOnRouter, ["app/account","787878","L","0"]);

  }));


  it('resolve the promise with data: Co-borrowers tab', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    callsToFunctions(true, 1500);

    onClick(false, null, 'Co-borrowers', 'span');

    checkCoborrowersData("Lady Falcon","Lady","Falcon","Enchanted castle","Fanellia","7878");

  }));


  it('resolve the promise with data: Co-borrowers tab and click on telephone with Landline', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    callsToFunctions(true, 1500);

    onClick(false, null, 'Co-borrowers', 'span');

    checkNewCallRecordBox(false);

    onClickPhone();

    checkNewCallRecordBox(true);

  }));


  it('resolve the promise with data: Co-borrowers tab and click on telephone with not Landline', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account5, true);
    callsToFunctions(true, 1500);

    onClick(false, null, 'Co-borrowers', 'span');

    checkNewCallRecordBox(false);

    onClickPhone();

    checkNewCallRecordBox(false);

  }));

  it('resolve the promise with data: Cases tab', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    callsToFunctions(true, 1500);

    onClick(false, null, 'Cases', 'span');

    checkProcessCases(1, '122', 'Isabeau', 'desc', '123', 'Guts', '2018-11-27T11:22:34.57',
                      '2018-11-29T11:22:34.57', 'SPOC', 'NEW');

    checkProcessCases(2, '123', 'Navarre', 'desc2', '124', 'Griffith', '2018-11-28T11:22:34.57',
      '2018-11-30T11:22:34.57', 'SPAC', 'NEW');

    checkTicklers(null, null);

  }));


  it('resolve the promise with data: Cases tab click on case', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    injectSpy(DataService, 'getProcessCaseTicklers', dataServiceMock.processCaseTicklers, false);
    callsToFunctions(true, 1500);

    onClick(false, null, 'Cases', 'span');

    checkProcessCases(1, '122', 'Isabeau', 'desc', '123', 'Guts', '2018-11-27T11:22:34.57',
      '2018-11-29T11:22:34.57', 'SPOC', 'NEW');

    checkProcessCases(2, '123', 'Navarre', 'desc2', '124', 'Griffith', '2018-11-28T11:22:34.57',
      '2018-11-30T11:22:34.57', 'SPAC', 'NEW');

    onClickTable('tickler-cases-table' , 1);

    checkTicklers(null, 1, 1, "CUSTOMER1", "desc1", "Hak", "2018-11-29T11:22:34.57",  [new CampaignListAttribute("CODE1", ["val1"])]);
    checkTicklers(null, 2, 2,"CUSTOMER2", "desc2", "Yona", "2018-11-30T11:22:34.57", [new CampaignListAttribute("CODE2", ["val2"])]);

  }));


  it('resolve the promise with data: Cases tab click on Go', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    injectSpy(DataService, 'getProcessCaseTicklers', dataServiceMock.processCaseTicklers, false);
    let spyOnRouter = injectSpy(Router, 'navigate', true, false);

    callsToFunctions(true, 1500);

    onClick(false, null, 'Cases', 'span');

    checkProcessCases(1, '122', 'Isabeau', 'desc', '123', 'Guts', '2018-11-27T11:22:34.57',
      '2018-11-29T11:22:34.57', 'SPOC', 'NEW');

    checkProcessCases(2, '123', 'Navarre', 'desc2', '124', 'Griffith', '2018-11-28T11:22:34.57',
      '2018-11-30T11:22:34.57', 'SPAC', 'NEW');

    onClickTable('tickler-cases-table' , 1);

    checkTicklers(null, 1, 1, "CUSTOMER1", "desc1", "Hak", "2018-11-29T11:22:34.57",  [new CampaignListAttribute("CODE1", ["val1"])]);
    checkTicklers(null, 2, 2,"CUSTOMER2", "desc2", "Yona", "2018-11-30T11:22:34.57", [new CampaignListAttribute("CODE2", ["val2"])]);

    onClick(false, null, 'Go', 'button');

    checkRouter(spyOnRouter, ["/process/case", 1]);

  }));



  it('resolve the promise and click on New Call Record dropdown', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    callsToFunctions(true, 1500);

    checkNewCallRecordBox(false);

    onClick(true, 'fa.fa-chevron-down');

    checkNewCallRecordBox(true);

  }));


  it('resolve the promise with today contacts < 6', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    callsToFunctions(true, 1500);

    checkTodayContacts(2, false);

  }));


  it('resolve the promise with today contacts >= 6', fakeAsync(() => {


    dataServiceMock.account4.customer.todayContacts = 6;

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    callsToFunctions(true, 1500);
    checkTodayContacts(6, true);

  }));

  it('resolve the promise: Calls tab with Call later on the first position', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    callsToFunctions(true, 1500);

    checkCallLater(true, 0);
    checkCallLater(false, 1);
    checkCallLater(false, 2);

    checkCallRecords("R","Keanu","Griffith","#created date1","Call later","#action1","Navarre",
                      "#promise date1",700,"#next wd1","No promises1", 0);

    checkCallRecords("D","Robert","Guts","#created date2","Call later","#action2","Isabeau",
                      "#promise date2",800,"#next wd2","No promises2", 1);

    checkCallRecords("E","Chris","Eren","#created date3","Answered/No Message","#action3","Falkor",
                      "#promise date3",900,"#next wd3","No promises3", 2);

  }));


  it('resolve the promise: Calls tab with not Call later on the first position', fakeAsync(() => {

    dataServiceMock.account4.customer.callRecords[0].result = "Answered/No Message";

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    callsToFunctions(true, 1500);

    checkCallLater(false, 0);
    checkCallLater(false, 1);
    checkCallLater(false, 2);

    checkCallRecords("R","Keanu","Griffith","#created date1","Answered/No Message","#action1","Navarre",
      "#promise date1",700,"#next wd1","No promises1", 0);

    checkCallRecords("D","Robert","Guts","#created date2","Call later","#action2","Isabeau",
      "#promise date2",800,"#next wd2","No promises2", 1);

    checkCallRecords("E","Chris","Eren","#created date3","Answered/No Message","#action3","Falkor",
      "#promise date3",900,"#next wd3","No promises3", 2);

  }));

  it('resolve the promise: Notes tab', fakeAsync(() => {

    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    callsToFunctions(true, 1500);
    onClick(false, null, 'Notes', 'span');

    checkNotes("1","1","L","9/21/2017 12:00:00 AM","9/22/2017 12:00:00 AM","#msg type1",
                "#msg categ1","#message1", 0);

    checkNotes("2","2","P","9/20/2017 12:00:00 AM","9/21/2017 12:00:00 AM","#msg type2",
              "#msg categ2","#message2", 1);

  }));



  it('resolve the promise: Alerts tab', fakeAsync(() => {


    injectSpy(DataService, 'getCompleteInfoForAccount', dataServiceMock.account4, true);
    callsToFunctions(true, 1500);

    onClick(false, null, 'Alerts', 'span');

    checkAlerts("1","1","L","9/20/2017 12:00:00 AM","9/21/2017 12:00:00 AM","#msg type",
                "#msg categ","#msg");

  }));


});
