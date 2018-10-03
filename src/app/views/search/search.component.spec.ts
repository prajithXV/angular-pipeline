import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { SearchComponent } from './search.component';
import {IboxtoolsComponent} from "../../components/common/iboxtools/iboxtools.component";
import {NextCallComponent} from "../next-call/next-call.component";
import {SearchCriteriaComponent} from "../search-criteria/search-criteria.component";
import {CampaignListAccountsTableComponent} from "../campaign-list-accounts-table/campaign-list-accounts-table.component";
import {CustomerSummaryComponent} from "../customer-summary/customer-summary.component";
import {AccountsTableComponent} from "../accounts-table/accounts-table.component";
import {FormsModule} from "@angular/forms";
import {ComponentLoaderFactory, PopoverConfig, PopoverModule, PositioningService} from "ngx-bootstrap";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {NgbModal, NgbModule, NgbTabsetConfig} from "@ng-bootstrap/ng-bootstrap";
import {PaginatorComponent} from "../paginator/paginator.component";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {AddressPipe} from "../../pipes/address.pipe";
import {CoinCurrencyPipe} from "../../pipes/coin-currency.pipe";
import {DataService} from "../../services/data.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {APP_BASE_HREF, DatePipe, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {GlobalStateService} from "../../services/global-state.service";
import {RouterTestingModule} from "@angular/router/testing";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {SearchCampaignCriteriaParams} from "../../models/search-campaign-criteria-params";
import {By} from "@angular/platform-browser";
import {SearchAccountCriteriaParams} from "../../models/search-account-criteria-params";
import {Customer} from "../../models/customer";
import {Person} from "../../models/person";
import {Router} from "@angular/router";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {DebugElement, NO_ERRORS_SCHEMA} from "@angular/core";
import {NgbModalStack} from "@ng-bootstrap/ng-bootstrap/modal/modal-stack";
import {TemporalStateServiceService} from "../../services/temporal-state-service.service";
import {Pagination} from "../../models/pagination";
import {FilterCodeToNamePipe} from "../../pipes/filter-code-to-name.pipe";
import {Code} from "../../models/code";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, PopoverModule, NgbModule, HttpModule, RouterTestingModule ],
      declarations: [ SearchComponent, IboxtoolsComponent, NextCallComponent, SearchCriteriaComponent, CampaignListAccountsTableComponent, CustomerSummaryComponent, AccountsTableComponent,
                      WaitingBackendComponent, PaginatorComponent, CoinDateTransformPipe, AddressPipe, CoinCurrencyPipe, FilterCodeToNamePipe ],
      providers: [ { provide: DataService, useValue: dataServiceMock },
                  // {provide: Router, useValue: routerMock },
                  { provide: GlobalStateService, useValue: globalStateServiceMock},{ provide: UserFeedbackService, useValue: userFeedbackMock },
                    DatePipe, PopoverConfig, ComponentLoaderFactory, PositioningService, NgbTabsetConfig, NgbModal, NgbModalStack,
                    TemporalStateServiceService, Location, { provide: LocationStrategy, useClass: PathLocationStrategy }, { provide: APP_BASE_HREF, useValue: '/my/app'}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  let _params;
  let _spy;

  function viewClCallFunctions(params: SearchCampaignCriteriaParams, resolvePromise: boolean){
    component.onViewCampaignListAccounts(params);
    //then
    if(resolvePromise){
      tick();
    }
    //update
    fixture.detectChanges();
  }

  function searchCriteriaFunctions(params: SearchAccountCriteriaParams, customer: Customer, resolvePromise?:boolean){
    component.search(params);
    component.searchAccountsForCustomer(customer);
    if(resolvePromise){
      tick();
    }

    fixture.detectChanges();
  }

  function getSpy(){
    return _spy;
  }


  function newParams(params: any){
    return _params = new params();
  }

  function newPagination(currPage: number, pageSize: number){
    return new Pagination(currPage, pageSize);
  }

  function setViewClParamsDetail(accountId: string, customerName: string, statusCode: string, cifId: string, campaignCode: string){
    _params.accountId = accountId;
    _params.customerName = customerName;
    _params.statusCd = statusCode;
    _params.cifId = cifId;
    _params.campaignCd = campaignCode;

    fixture.detectChanges();
  }

  function setSearchCriteriaParamsDetail(params: SearchAccountCriteriaParams, accountId: string, taxId: string, email: string, phoneNumber: string, accountType: string){
    params.accountId = accountId;
    params.taxId = taxId;
    params.email = email;
    params.phoneNumber = phoneNumber;
    params.accountType = accountType;

    fixture.detectChanges();
  }

  function setCustomerParamsDetail(cust: Customer, id: string, cifno: string, taxId: string, ssn: string, completeName: string){
    cust.id = id;
    cust.cifNo = cifno;
    cust.taxId = taxId;
    cust.socialSecurityNumber = ssn;
    cust.mainContact = new Person(completeName);

    fixture.detectChanges();
  }

  function setVisibleTable(isVisible: boolean, isViewCl: boolean){
    if(isViewCl){
      component.isCAccountsVisible = isVisible;
    }else{
      component.isCustVisible = isVisible;
    }

    fixture.detectChanges();
  }



  function onClickGoButton(isViewCl: boolean){
    let td:any;

    if(isViewCl) {
      td = fixture.debugElement.query(By.css('table.clAccounts tbody tr')).children.map(e => e.nativeElement);

    }else{
      td = fixture.debugElement.query(By.css('div.accounts tbody')).children.map(e => e.nativeElement);
    }

    td.map((td)=>{
      let button = td.querySelector("button");

      if(button !=null){
        button.click();
        fixture.detectChanges();
      }
    });

  }

  function checkRouter(array: Array<any>, isAll?:boolean, index?:number){
    if(isAll){
      expect(_spy.calls.all()[index].args[0]).toEqual(array);
    }else{
      expect(_spy.calls.first().args[0]).toEqual(array);
    }

  }

  function checkCampaignServiceParams(params: SearchCampaignCriteriaParams, pagination: Pagination){
    expect(component.currentCampaignParams.currentParams).toEqual(params);
    expect(component.currentCampaignParams.currentPagination).toEqual(pagination);
  }


  function checkAccountServiceParams(params: SearchAccountCriteriaParams){
    expect(component.currentAccountParams.currentParams).toEqual(params);
  }

  function checkMessage(isViewCl: boolean, isPromisedResolved: boolean , text: string, text2?: string){
    let p = fixture.debugElement.query(By.css('campaign-list-accounts-table p'));
    let div = fixture.debugElement.query(By.css("campaign-list-accounts-table div.search"));
    let cDiv = fixture.debugElement.query(By.css("div.customer div.ibox-content div"));
    let aDiv = fixture.debugElement.query(By.css("div.accounts div.ibox-content div"));

    if(isViewCl && isPromisedResolved){
      expect(p.nativeElement.innerText).toEqual(text);

    }else if(isViewCl && !isPromisedResolved){
      expect(div.nativeElement.innerText).toEqual(text);

    }else if(!isViewCl && isPromisedResolved){

    }else{
      expect(cDiv.nativeElement.innerText).toEqual(text);
      if(text2){
        expect(aDiv.nativeElement.innerText).toEqual(text2);
      }
      // expect(aDiv.nativeElement.innerText).toEqual(text);

    }
  }


  function checkViewClTableFields(array: Array<string>){
    let td = fixture.debugElement.query(By.css("table.clAccounts tbody tr")).children.map(e => e.nativeElement);
    let fields = td.map(e=>e.innerText);

    expect(fields).toEqual(array);
  }

  function checkViewClFilters(array: Array<string>){
    let h5 = fixture.debugElement.query(By.css("div.filterListAccounts h5")).children.map(e=>e.nativeElement);
    let filters = h5.map(i=>i.innerText);
    expect(filters).toEqual(array);

    }


  function checkSearchCriteriaFilters(array: Array<string>){
    let h5 = fixture.debugElement.query(By.css("div.customer h5")).children.map(e=>e.nativeElement);
    let filters = h5.map(i=>i.innerText);
    expect(filters).toEqual(array);

  }

    function checkSearchCriteriaTableFields(array: Array<any>, index){
      let td = fixture.debugElement.queryAll(By.css("customer-summary table tbody tr")).map(e => e.children.map(e=>e.nativeElement).map(i=>i.innerText))[index];
      // let fields = td.map(e=>e.innerText);

      expect(td).toEqual(array);
    }


  function checkSearchCriteriaAccountTableFields(array: Array<any>){
    let td = fixture.debugElement.query(By.css("div.accounts div.ibox-content tbody tr")).children.map(e => e.nativeElement);
    let fields = td.map(e=>e.innerText);

    expect(fields).toBeTruthy(array);
  }

  function injectorSpy(injec: any, method: string, value: any){
    let r = fixture.debugElement.injector.get(injec);
   return _spy = spyOn(r, method).and.returnValue(Promise.resolve(value));
  }

  function checkViewClSpyObject(index: number, accountId: string, accountType: string, callPriority: number, campaignCode: string, campaignName: string,
                                campaignFId: string, campaignRecordId: number, colStatusCode: string, customerName: string, eaPcFlag: string, ficoScore: string,
                                interestDue: string, lastCalledBy: string, lastCalledDate: string, lastPayDate: string, lastPromiseDate: string, lastWorkDate: string,
                                nextCalledBy: string, nextCalledUser: string, nextWorkDate: string, officerName: string, pastDueDays: string, statusCode: string)
  {
    expect(_spy.calls.first().object.campaignListAccounts[index].accountId).toEqual(accountId);
    expect(_spy.calls.first().object.campaignListAccounts[index].accountType).toEqual(accountType);
    expect(_spy.calls.first().object.campaignListAccounts[index].callPriority).toEqual(callPriority);
    expect(_spy.calls.first().object.campaignListAccounts[index].campaignCode).toEqual(campaignCode);
    expect(_spy.calls.first().object.campaignListAccounts[index].campaignName).toEqual(campaignName);
    expect(_spy.calls.first().object.campaignListAccounts[index].campaignFId).toEqual(campaignFId);
    expect(_spy.calls.first().object.campaignListAccounts[index].campaignRecordId).toEqual(campaignRecordId);
    expect(_spy.calls.first().object.campaignListAccounts[index].colStatusCode).toEqual(colStatusCode);
    expect(_spy.calls.first().object.campaignListAccounts[index].customerName).toEqual(customerName);
    expect(_spy.calls.first().object.campaignListAccounts[index].eaPcFlag).toEqual(eaPcFlag);
    expect(_spy.calls.first().object.campaignListAccounts[index].ficoScore).toEqual(ficoScore);
    expect(_spy.calls.first().object.campaignListAccounts[index].interestDue).toEqual(interestDue);
    expect(_spy.calls.first().object.campaignListAccounts[index].lastCalledBy).toEqual(lastCalledBy);
    expect(_spy.calls.first().object.campaignListAccounts[index].lastCalledDate).toEqual(lastCalledDate);
    expect(_spy.calls.first().object.campaignListAccounts[index].lastPayDate).toEqual(lastPayDate);
    expect(_spy.calls.first().object.campaignListAccounts[index].lastPromiseDate).toEqual(lastPromiseDate);
    expect(_spy.calls.first().object.campaignListAccounts[index].lastWorkDate).toEqual(lastWorkDate);
    expect(_spy.calls.first().object.campaignListAccounts[index].nextCalledBy).toEqual(nextCalledBy);
    expect(_spy.calls.first().object.campaignListAccounts[index].nextCalledUser).toEqual(nextCalledUser);
    expect(_spy.calls.first().object.campaignListAccounts[index].nextWorkDate).toEqual(nextWorkDate);
    expect(_spy.calls.first().object.campaignListAccounts[index].officerName).toEqual(officerName);
    expect(_spy.calls.first().object.campaignListAccounts[index].pastDueDays).toEqual(pastDueDays);
    expect(_spy.calls.first().object.campaignListAccounts[index].statusCode).toEqual(statusCode);
  }

  function checkSearchCriteriaSpyLength(spyCalls, spyCallsObject, length){
    expect(spyCalls).toBeTruthy();
    expect(spyCallsObject.length).toBe(length);
  }

  function checkSearchCriteriaCustomerSpy(spy, index: number, id: string, taxId: string, completeName: string, streetAddress1: string){
    expect(spy[index].id).toEqual(id);
    expect(spy[index].taxId).toEqual(taxId);
    expect(spy[index].mainContact.completeName).toEqual(completeName);
    expect(spy[index].mainAddress.streetAddress1).toEqual(streetAddress1);
  }

  function checkSearchCriteriaAccountSpy(spy, index: number, campaignRercordId: string, accountId: string, accountType: string, amount: number,
                                         productDescription: string, relationDescription: string, stateDescription: string ){

    expect(spy.calls.first().object.account2[index].campaignRecordId).toEqual(campaignRercordId);
    expect(spy.calls.first().object.account2[index].accountId).toEqual(accountId);
    expect(spy.calls.first().object.account2[index].accountType).toEqual(accountType);
    expect(spy.calls.first().object.account2[index].amount).toEqual(amount);
    expect(spy.calls.first().object.account2[index].productDescription).toEqual(productDescription);
    expect(spy.calls.first().object.account2[index].relationDescription).toEqual(relationDescription);
    expect(spy.calls.first().object.account2[index].stateDescription).toEqual(stateDescription);
  }

  it('view cl not resolve promise', fakeAsync(() => {

    let params  = newParams(SearchCampaignCriteriaParams);
    viewClCallFunctions(params, false);
    checkMessage(true, false,"Searching...");


  }));

  it('view cl resolve promise', fakeAsync(() => {

    setVisibleTable(true, true);
    component.nextCallCampaigns = dataServiceMock.campaign;
    component.nextCallStatuses = [new Code('P', 'pending')];

    //instances of searchCampaignCriteriaParams to do a filter
    let params = newParams(SearchCampaignCriteriaParams);
    setViewClParamsDetail("6900551729", "Edward", "P", "WAA1486", "DIRECT");

    //inject in the DataService
    injectorSpy(DataService, 'getCampaignListAccounts', dataServiceMock.campaignListAccounts);

    viewClCallFunctions(params, true);

    checkViewClSpyObject(0,"6900551729", "L", 3,"DIRECT", "Direct", "WAA1486", 1076630,
      "P", "Edward", null, "589", "5.32", "Hayden", "2007-12-20T04:40:10.95", "10/27/2017",
      "07/07/2007", "08/08/2007", "Harrison", null, "09/09/2007", "Keanu",
      "77","NEW");

    /*
    * search in the table clAccounts the children of tbody (td)
    * expected:
    *
    * <tbody>
    *     <tr>
    *         <td>WAA1486</td>
    *         <td>6900551729</td>
    *         <td>Edward</td>
    *         <td>Hayden</td>
    *         <td>12/20/2007 04:40 AM</td>
    *         <td>10/27/2017</td>
    *         <td>07/20/2007</td>
    *         <td>77</td>
    *         <td>P</td>
    *         <td>GO</td>
    *     </tr>
    *
    * </tbody>
    *
    *
    * */

    checkViewClTableFields(["WAA1486", "6900551729", "Edward", "Hayden", "12/20/2007 04:40 AM", "10/27/2017","07/20/2007", "77", "P", "Go", ""]);

    /*
    * search in the div the class filterListAccounts the h5 text
    * expects that the filter it has been correct write
    * expect: Campaign: DIRECT Account Id: 6900551729 CIFNO: WAA1486 Status: P Customer Name: Edward
    *
    * */

    checkViewClFilters(["Campaign: Direct", "Account: 6900551729", "CIFNO: WAA1486", "Status: pending", "Customer name: Edward"]);

  }));


  it('view cl resolve promise and click Go button', fakeAsync(() => {

    setVisibleTable(true, true);

    //instances of searchCampaignCriteriaParams to do a filter
    let params = newParams(SearchCampaignCriteriaParams);
    setViewClParamsDetail("6900551729", "Edward", "P", "WAA1486", "DIRECT");

    injectorSpy(DataService, 'getCampaignListAccounts', dataServiceMock.campaignListAccounts);
    injectorSpy(Router, 'navigate', true);

    viewClCallFunctions(params, true);

    onClickGoButton(true);

    checkRouter(["app/account", "6900551729", "L", 1076630]);

  }));
  //
  it('view cl resolve promise and click Go button: check service params', fakeAsync(() => {

    setVisibleTable(true, true);

    //instances of searchCampaignCriteriaParams to do a filter
    let params = newParams(SearchCampaignCriteriaParams);
    let pagination = newPagination(0,15);

    setViewClParamsDetail("6900551729", "Edward", "P", "WAA1486", "DIRECT");

    injectorSpy(DataService, 'getCampaignListAccounts', dataServiceMock.campaignListAccounts);
    injectorSpy(Router, 'navigate', true);

    viewClCallFunctions(params, true);

    onClickGoButton(true);

    checkRouter(["app/account", "6900551729", "L", 1076630]);
    checkCampaignServiceParams(params, pagination);

  }));
  //

  it('view cl resolve promise with 0 campaign list accounts', fakeAsync(() => {

    setVisibleTable(true, true);

    //instances of searchCampaignCriteriaParams to do a filter
    let params = newParams(SearchCampaignCriteriaParams);

    setViewClParamsDetail("", "", "", "", "");
    injectorSpy(DataService, "getCampaignListAccounts", dataServiceMock.campaignListAccounts2);

    viewClCallFunctions(params, true);
    checkMessage(true, true, "No campaign list accounts found");

  }));

  it('search not resolve promise', fakeAsync(() => {

    let params = newParams(SearchAccountCriteriaParams);
    let customer = newParams(Customer);

    setSearchCriteriaParamsDetail(params,"", "", "", "", null);
    searchCriteriaFunctions(params,  customer, false);
    setVisibleTable(true, false);
    checkMessage(false, false, "Searching..." );

  }));
  //

  it('search resolve promise with 0 customer and 0 accounts', fakeAsync(() => {

    //instances of SearchAccountCriteriaParams to filter
    let params = newParams(SearchAccountCriteriaParams);
    let customer = newParams(Customer);

    setSearchCriteriaParamsDetail(params,"", "", "", "", null);

    let spy = injectorSpy(DataService, "customerSearch", dataServiceMock.customer3);
    let spy2 = injectorSpy(DataService, "getCustomerAccounts", dataServiceMock.account3);


    searchCriteriaFunctions(params,  customer, true);

    setVisibleTable(true, false);

    checkSearchCriteriaSpyLength(spy.calls, spy.calls.first().object.customer3, 0);
    // checkSearchCriteriaSpyLength(spy2.calls, spy2.calls.first().object.account3, 0);

    checkMessage(false, true, "No customers found",);

  }));



  it('search resolve promise with 1 customer', fakeAsync(() => {

    let params = newParams(SearchAccountCriteriaParams);
    let customer = newParams(Customer);

    setSearchCriteriaParamsDetail(params,"AAD9461", "", "", "", 'L');


    let spy = injectorSpy(DataService, "customerSearch", dataServiceMock.customer);
    let spy2 = injectorSpy(DataService, "getCustomerAccounts", dataServiceMock.account2);


    searchCriteriaFunctions(params,  customer, true);

    setVisibleTable(true, false);

    checkSearchCriteriaSpyLength(spy.calls, spy.calls.first().object.customer, 1);
    checkSearchCriteriaSpyLength(spy.calls, spy.calls.first().object.account2, 3);

    checkSearchCriteriaCustomerSpy(spy.calls.first().object.customer,0, "AAD9461", "436909217", "Michael F.", "Los Angeles");

    checkSearchCriteriaAccountSpy(spy2, 0, "DIRECT", "707","A",113.07,"Vendor",
      "Primary","Active");

    checkSearchCriteriaAccountSpy(spy2, 1,"INDIRECT","708","D",114.07,"Commercial Loan",
      "Joint","Active");

    checkSearchCriteriaAccountSpy(spy2, 2,"DIRECT","703","L",113.07,"Certificate of Deposit",
      "Primary","Active");


    /*
    *
    * expected data:
    *
    * <tr>
    *    <td></td> (space format table)
    *    <td>AAD9461</td>
    *    <td>436909217</td>
    *    <td>Michael F.</td>
    *    <td>Los Angeles</td>
    * </tr>
    *
    *
    * */

    checkSearchCriteriaTableFields(["", "AAD9461", "436909217", "Michael F.", "Los Angeles"], 0);

    /*
    *
    * expected table data:
    *
    * <tr>
    *     <td>707</td>
    *     <td>A</td>
    *     <td>$113.07</td>
    *     <td>Active</td>
    *     <td>Primary</td>
    *     <td>01</td>
    *     <td>Vendor</td>
    *     <td>Go</td> //the button
    * </tr>
    *
    * <tr>
    *   <td></td>
    *       .
    *       .
    *       .
    * </tr>
    *
    * <tr>
    *    <td></td>
    *        .
    *        .
    *        .
    * </tr>
    *
    *
    * */

    checkSearchCriteriaAccountTableFields( ["703", "L", "$113.07", "Active", "Primary", "07", "Certificate of Deposit", "Go", ""]);

  }));
  //

  it('search resolve promise with 2 customer', fakeAsync(() => {

    let params = newParams(SearchAccountCriteriaParams);
    let customer = newParams(Customer);

    setSearchCriteriaParamsDetail(params,"AAD9461", "", "", "", null);


    let spy = injectorSpy(DataService, "customerSearch", dataServiceMock.customer2);
    let spy2 = injectorSpy(DataService, "getCustomerAccounts", dataServiceMock.account2);


    searchCriteriaFunctions(params,  customer, true);

    setVisibleTable(true, false);

    checkSearchCriteriaSpyLength(spy.calls, spy.calls.first().object.customer2, 2);

    checkSearchCriteriaCustomerSpy(spy.calls.first().object.customer2,0, "AAD9461", "436909217", "Michael F.", "Los Angeles");
    checkSearchCriteriaCustomerSpy(spy2.calls.first().object.customer2 ,1, "AAD9462", "436909218", "Robert D.", "USA");


    /*
    *
    * expected data:
    *
    * <tr>
    *    <td></td> (space format table)
    *    <td>AAD9461</td>
    *    <td>436909217</td>
    *    <td>Michael F.</td>
    *    <td>Los Angeles</td>
    * </tr>
    *
    * * <tr>
    *    <td></td> (space format table)
    *    <td>AAD9462</td>
    *    <td>436909218</td>
    *    <td>Robert D.</td>
    *    <td>USA</td>
    * </tr>
    *
    *
    * */


    checkSearchCriteriaTableFields(["", "AAD9461", "436909217", "Michael F.", "Los Angeles"], 0);
    checkSearchCriteriaTableFields([ "", "AAD9462", "436909218", "Robert D.", "USA"], 1);


    checkMessage(false, true, null, "Select a customer above to view the accounts.")

  }));





  it('search resolve promise with 2 customer and click on customer', fakeAsync(() => {


    let params = newParams(SearchAccountCriteriaParams);
    let customer = newParams(Customer);


    setSearchCriteriaParamsDetail(params,"AAD9461", "436909217", "michaelf@gmail.com", "933787878", 'D');
    setCustomerParamsDetail(customer,"AAD9461", "", "", "", "Michael F.");

    let spy = injectorSpy(DataService, "customerSearch", dataServiceMock.customer2);
    let spy2 = injectorSpy(DataService, "getCustomerAccounts", dataServiceMock.account2);

    searchCriteriaFunctions(params,  customer, true);
    setVisibleTable(true, false);


    checkSearchCriteriaSpyLength(spy, spy.calls.first().object.customer2, 2);
    checkSearchCriteriaSpyLength(spy2, spy2.calls.first().object.account2, 3);

    checkSearchCriteriaCustomerSpy(spy.calls.first().object.customer2,0, "AAD9461", "436909217", "Michael F.", "Los Angeles");
    checkSearchCriteriaCustomerSpy(spy2.calls.first().object.customer2 ,1, "AAD9462", "436909218", "Robert D.", "USA");

    checkSearchCriteriaAccountSpy(spy2, 0, "DIRECT", "707","A",113.07,"Vendor",
      "Primary","Active");

    checkSearchCriteriaAccountSpy(spy2, 1,"INDIRECT","708","D",114.07,"Commercial Loan",
      "Joint","Active");

    checkSearchCriteriaAccountSpy(spy2, 2,"DIRECT","703","L",113.07,"Certificate of Deposit",
      "Primary","Active");

    checkSearchCriteriaFilters([ 'SSN: 436909217', 'Email address: michaelf@gmail.com', 'Account type: ', 'Account number: AAD9461', 'Phone number: 933787878' ]);

    checkSearchCriteriaTableFields(["", "AAD9461", "436909217", "Michael F.", "Los Angeles"], 0);
    checkSearchCriteriaTableFields([ "", "AAD9462", "436909218", "Robert D.", "USA"], 1);

    checkSearchCriteriaAccountTableFields(["708","D","$114.07","Active", "Joint",'02',"Commercial Loan","Go"]);


  }));


  it('search resolve the promise with 1 customer 3 accounts and click Go button', fakeAsync(() => {


    let params = newParams(SearchAccountCriteriaParams);
    let customer = newParams(Customer);


    setSearchCriteriaParamsDetail(params,"AAD9461", "436909217", "michaelf@gmail.com", "933787878", null);
    setCustomerParamsDetail(customer,"AAD9461", "", "", "", "Michael F.");

    injectorSpy(DataService, "customerSearch", dataServiceMock.customer);
    injectorSpy(DataService, "getCustomerAccounts", dataServiceMock.account2);
    injectorSpy(Router, "navigate", true);

    searchCriteriaFunctions(params,  customer, true);

    setVisibleTable(true, false);


    onClickGoButton(false);

    checkRouter(["app/account","708","D","0"], true, 0);
    checkRouter(["app/account","703","L","0"], true, 1);


  }));


  it('search resolve the promise with 1 customer 1 accounts, click Go button and check service params', fakeAsync(() => {


    let params = newParams(SearchAccountCriteriaParams);
    let customer = newParams(Customer);


    setSearchCriteriaParamsDetail(params,"AAD9461", "436909217", "michaelf@gmail.com", "933787878", 'L');
    setCustomerParamsDetail(customer,"AAD9461", "", "", "", "Michael F.");

    injectorSpy(DataService, "customerSearch", dataServiceMock.customer);
    injectorSpy(DataService, "getCustomerAccounts", dataServiceMock.account2);
    injectorSpy(Router, "navigate", true);

    searchCriteriaFunctions(params,  customer, true);
    setVisibleTable(true, false);


    onClickGoButton(false);

    checkRouter(["app/account","703","L","0"], true, 0);

    checkAccountServiceParams(params);

  }));

});
