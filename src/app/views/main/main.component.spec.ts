import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { MainComponent } from './main.component';
import {FullSearchComponent} from "../full-search/full-search.component";
import {SearchComponent} from "../search/search.component";
import {ManageCasesComponent} from "../manage-cases/manage-cases.component";
import {NextCallComponent} from "../next-call/next-call.component";
import {NgbModal, NgbModalModule, NgbTabsetConfig, NgbTabsetModule} from "@ng-bootstrap/ng-bootstrap";
import {SearchCriteriaComponent} from "../search-criteria/search-criteria.component";
import {SearchCaseCriteriaComponent} from "../search-case-criteria/search-case-criteria.component";
import {CampaignListAccountsTableComponent} from "../campaign-list-accounts-table/campaign-list-accounts-table.component";
import {CustomerSummaryComponent} from "../customer-summary/customer-summary.component";
import {AccountsTableComponent} from "../accounts-table/accounts-table.component";
import {TicklerCasesTableComponent} from "../tickler-cases-table/tickler-cases-table.component";
import {ProcessCaseTicklerTableComponent} from "../process-case-tickler-table/process-case-tickler-table.component";
import {FormsModule} from "@angular/forms";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {ComponentLoaderFactory, PopoverConfig, PopoverModule, PositioningService} from "ngx-bootstrap";
import {PaginatorComponent} from "../paginator/paginator.component";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {NewProcessCaseComponent} from "../new-process-case/new-process-case";
import {AddressPipe} from "../../pipes/address.pipe";
import {CoinCurrencyPipe} from "../../pipes/coin-currency.pipe";
import {HeaderSorterComponent} from "../header-sorter/header-sorter.component";
import {NewTicklerCaseComponent} from "../new-tickler-case/new-tickler-case.component";
import {CampaignAttributeEditionComponent} from "../campaign-attribute-edition/campaign-attribute-edition.component";
import {CoinNumberInputComponent} from "../coin-number-input/coin-number-input.component";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {CoinNumberInputErrorsComponent} from "../coin-number-input-errors/coin-number-input-errors.component";
import {OwlDateTimeModule} from "ng-pick-datetime";
import {DataService} from "../../services/data.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {ToastOptions, ToastsManager} from "ng2-toastr";
import {APP_BASE_HREF, DatePipe, Location, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {TelephonePipe} from "../../pipes/telephone.pipe";
import {ConsentPipeCorrectConversion} from "../../pipes/consent.pipe";
import {BooleanToStringDuePipe, BooleanToStringOrderPipe} from "../../pipes/boolean-to-string-order.pipe";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {TemporalStateServiceService} from "../../services/temporal-state-service.service";
import {RouterTestingModule} from "@angular/router/testing";
import {GlobalStateService} from "../../services/global-state.service";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {By} from "@angular/platform-browser";
import {SearchCampaignCriteriaParams} from "../../models/search-campaign-criteria-params";
import {NgbModalStack} from "@ng-bootstrap/ng-bootstrap/modal/modal-stack";
import {SearchAccountCriteriaParams} from "../../models/search-account-criteria-params";
import {SearchTicklerCaseParams} from "../../models/search-tickler-case-params";
import {Router} from "@angular/router";
import {FilterCodeToNamePipe} from "../../pipes/filter-code-to-name.pipe";

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbTabsetModule, FormsModule, PopoverModule, OwlDateTimeModule, HttpModule, RouterTestingModule, NgbModalModule ],
      declarations: [ MainComponent, FullSearchComponent, SearchComponent, ManageCasesComponent, NextCallComponent, SearchCriteriaComponent, SearchCaseCriteriaComponent,
                      CampaignListAccountsTableComponent, CustomerSummaryComponent, AccountsTableComponent, TicklerCasesTableComponent, ProcessCaseTicklerTableComponent,
                      WaitingBackendComponent, PaginatorComponent, CoinDateTransformPipe, NewProcessCaseComponent, AddressPipe, CoinCurrencyPipe, HeaderSorterComponent,
                      NewTicklerCaseComponent, CampaignAttributeEditionComponent, CoinNumberInputComponent, DatepickerComponent, CoinNumberInputErrorsComponent, FilterCodeToNamePipe ],
      providers: [ { provide:DataService, useValue: dataServiceMock }, { provide: UserFeedbackService, useValue: userFeedbackMock }, ToastsManager, ToastOptions, DatePipe, BooleanToStringPipe, TelephonePipe,
                   ConsentPipeCorrectConversion, BooleanToStringOrderPipe, BooleanToStringDuePipe, CiscoCommsService, TemporalStateServiceService,  Location,
                  { provide: LocationStrategy, useClass: PathLocationStrategy }, { provide: APP_BASE_HREF, useValue: '/my/app'}, { provide: GlobalStateService, useValue: globalStateServiceMock },
                  NgbTabsetConfig, PopoverConfig, ComponentLoaderFactory, PositioningService, NgbModal, NgbModalStack ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  let _spy;
  let cParams: SearchCampaignCriteriaParams;
  let aParams: SearchAccountCriteriaParams;
  let tParams: SearchTicklerCaseParams;

  function checkComponent(componentName: string){
    let component = fixture.debugElement.query(By.css(componentName));
    expect(component).toBeTruthy();
  }

  function onClickTab(index: number){
    let span = fixture.debugElement.queryAll(By.css("span")).map(e=>e.nativeElement);
    span[index].click();
    tick();
    fixture.detectChanges();
  }

  function onClickFilter(isFilterOne: boolean, isFilterTwo: boolean){
    if(isFilterOne){
      cParams = new SearchCampaignCriteriaParams();
      cParams.accountId = "1234";
      cParams.campaignCd = "DIRECT";
      cParams.cifId = "707";
      cParams.statusCd = "DONE";
      cParams.customerName = "Hak";
      component.onClickViewCl(cParams);
      tick();
      fixture.detectChanges();
    }else if(isFilterTwo){
      aParams = new SearchAccountCriteriaParams();
      aParams.accountId = "1237";
      aParams.taxId = "707";
      aParams.phoneNumber = "123456789";
      aParams.email = "email@gmail.com";
      aParams.accountType = "D";
      component.onClickSearch(aParams);
      tick();
      fixture.detectChanges();
    }
    else {
      tParams = new SearchTicklerCaseParams();
      component.onClickProcessesCases(tParams);
      tick();
      fixture.detectChanges();
    }
  }

  function refresh(){
    tick(1500);
    fixture.detectChanges();
  }

  function injectorSpy(injec: any, method: string, value: any){
    let r = fixture.debugElement.injector.get(injec);
    return _spy = spyOn(r, method).and.returnValue(Promise.resolve(value));
  }

  function checkRouter(array: Array<any>){
      expect(_spy.calls.first().args[0]).toEqual(array);
  }

  function checkServiceParams(params: any, isCp: boolean, isAccount: boolean){
    if(isCp){
      expect(component.campaignServiceParams).toEqual(params);
    }else if(isAccount){
      expect(component.accountServiceParams).toEqual(params);
    }
    else{
      expect(component.ticklerServiceParams).toEqual(params);
    }
  }

  function checkHtmlServiceParams(array: Array<string>){
    let li = fixture.debugElement.queryAll(By.css("div#search-params ul li")).map(e=>e.nativeElement);
    let htmlParams = li.map(i=>i.innerText);

    expect(htmlParams).toEqual(array);

  }

  function checkFilterParamsWhenCollapse(inputArray: Array<string>, selectedOption: string){
    let select;
    let input = fixture.debugElement.queryAll(By.css("input")).map(e=>e.nativeElement);
    if(selectedOption!=null){
      select = fixture.debugElement.queryAll(By.css("select")).map(e=>e.nativeElement).find(n=>n.name == "statusCd");

    }

    tick();
    fixture.detectChanges();

    let inputValue = input.map(v=>v.value);
    if(selectedOption!=null){
      let selectValue = select.value;
      expect(selectValue).toEqual(selectedOption);
    }


    expect(inputValue).toEqual(inputArray);

  }

  function onClickGoButton(tableName: string){
    let td = fixture.debugElement.query(By.css(tableName + " tbody  tr")).children.map(e=>e.nativeElement);

    td.map((td)=>{
      let button = td.querySelector("button");

      if(button !=null){
        button.click();
        fixture.detectChanges();
      }
    });
  }

  function onCollapseFilter(){
    let ul = fixture.debugElement.query(By.css("div#search-params ul")).nativeElement;
    ul.click();
    fixture.detectChanges();
  }

  function onInit(){
    component.ngOnInit();
    component.ngAfterViewInit();
  }


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('default tab', fakeAsync(() => {

    checkComponent('next-call');
    onClickFilter(true, false);
    checkComponent("campaign-list-accounts-table");

  }));


  it('click on account search tab with campaigns', fakeAsync(() => {
    checkComponent('next-call');
    onClickFilter(true, false);
    checkComponent("campaign-list-accounts-table");

    onClickTab(1);
    checkComponent('search-criteria');
    checkComponent("campaign-list-accounts-table");

  }));

  it('click on account search tab with campaigns and return to campaign processing tab', fakeAsync(() => {
    checkComponent('next-call');
    onClickFilter(true, false);
    checkComponent("campaign-list-accounts-table");

    onClickTab(1);
    checkComponent('search-criteria');
    checkComponent("campaign-list-accounts-table");


    onClickTab(0);
    refresh();
    checkComponent('next-call');
    checkComponent("campaign-list-accounts-table");

  }));


  it('click on account search tab with campaigns and return to campaign processing tab and later click on tickler processes tab', fakeAsync(() => {
    checkComponent('next-call');
    onClickFilter(true, false);
    checkComponent("campaign-list-accounts-table");

    onClickTab(1);
    checkComponent('search-criteria');
    checkComponent("campaign-list-accounts-table");


    onClickTab(0);
    refresh();
    checkComponent('next-call');
    checkComponent("campaign-list-accounts-table");

    onClickTab(2);
    checkComponent("search-case-criteria");
    checkComponent("campaign-list-accounts-table");


  }));


  it('click on account search tab', fakeAsync(() => {
    onClickTab(1);
    checkComponent('search-criteria');
    onClickFilter(false, true);
    checkComponent('customer-summary');
    checkComponent('accounts-table');

  }));

  it('click on account search tab and click on campaign processing tab', fakeAsync(() => {
    onClickTab(1);
    checkComponent('search-criteria');
    onClickFilter(false, true);
    checkComponent('customer-summary');
    checkComponent('accounts-table');

    onClickTab(0);
    refresh();
    checkComponent("next-call");
    checkComponent('customer-summary');
    checkComponent('accounts-table');

  }));


  it('click on account search, tab and click on campaign processing tab and click on tickler processes', fakeAsync(() => {
    onClickTab(1);
    checkComponent('search-criteria');
    onClickFilter(false, true);
    checkComponent('customer-summary');
    checkComponent('accounts-table');

    onClickTab(0);
    refresh();
    checkComponent("next-call");
    checkComponent('customer-summary');
    checkComponent('accounts-table');

    onClickTab(2);
    checkComponent("manage-cases");
    checkComponent('customer-summary');
    checkComponent('accounts-table');

  }));

  it('click tickler processes tab', fakeAsync(() => {

    onClickTab(2);
    checkComponent("manage-cases");

    onClickFilter(false, false);
    checkComponent("tickler-cases-table");
    checkComponent("process-case-tickler-table");

  }));

  it('click tickler processes tab and click on account search tab', fakeAsync(() => {

    onClickTab(2);
    checkComponent("search-case-criteria");

    onClickFilter(false, false);
    checkComponent("tickler-cases-table");
    checkComponent("process-case-tickler-table");

    onClickTab(1);
    checkComponent("search-criteria");
    checkComponent("tickler-cases-table");
    checkComponent("process-case-tickler-table");

  }));


  it('click tickler processes tab, click on account search tab and click on campaign processing', fakeAsync(() => {

    onClickTab(2);
    checkComponent("search-case-criteria");

    onClickFilter(false, false);
    checkComponent("tickler-cases-table");
    checkComponent("process-case-tickler-table");

    onClickTab(1);
    checkComponent("search-criteria");
    checkComponent("tickler-cases-table");
    checkComponent("process-case-tickler-table");

    onClickTab(0);
    refresh();
    checkComponent("next-call");
    checkComponent("tickler-cases-table");
    checkComponent("process-case-tickler-table");

  }));

  it('check campaign filter params when tab change ', fakeAsync(() => {

    onClickTab(1);
    onClickFilter(false, true);
    injectorSpy(Router, "navigate", true);
    onClickTab(0);
    refresh();

    onClickFilter(true, false);

    onClickGoButton("campaign-list-accounts-table");
    checkRouter(["app/account", "6900551729", "L", 1076630]);

    onInit();
    refresh();

    checkServiceParams(cParams, true, false);
    checkHtmlServiceParams(["", "Campaign: Direct", "Account: 1234", "CIFNO: 707", "Status: Done", "Customer name: Hak"]);


  }));

  it('check html campaign processing filter when collapse', fakeAsync(() => {

    onClickTab(1);
    onClickFilter(false, true);
    injectorSpy(Router, "navigate", true);
    onClickTab(0);
    refresh();

    onClickFilter(true, false);

    onClickGoButton("campaign-list-accounts-table");
    checkRouter(["app/account", "6900551729", "L", 1076630]);

    onInit();
    refresh();
    onCollapseFilter();
    checkFilterParamsWhenCollapse(["1234", "707", "Hak"], "3: DONE");


  }));


  it('check account filter params when tab change ', fakeAsync(() => {

    onClickFilter(true, false);
    injectorSpy(Router, "navigate", true);
    onClickTab(1);
    refresh();

    onClickFilter(false, true);

    onClickGoButton("accounts-table");
    checkRouter(["app/account", "708", "D", '0']);
    onClickTab(2);
    onClickTab(1);
    onInit();
    refresh();

    checkServiceParams(aParams, false, true);
    checkHtmlServiceParams([ '', 'SSN: 707', 'Email address: email@gmail.com', 'Account type: Deposit', 'Account number: 1237', 'Phone number: 123456789' ]);


  }));

  it('check html account search filter when collapse', fakeAsync(() => {

    onClickFilter(true, false);
    injectorSpy(Router, "navigate", true);
    onClickTab(1);
    refresh();

    onClickFilter(false, true);

    onClickGoButton("accounts-table");
    checkRouter(["app/account", "708", "D", '0']);
    onClickTab(2);
    onClickTab(1);
    onInit();
    refresh();
    onCollapseFilter();
    checkFilterParamsWhenCollapse(["707", "email@gmail.com", '123456789', "1237"], null);


  }));

  it('check tickler filter params when tab change ', fakeAsync(() => {

    onClickFilter(true, false);
    injectorSpy(Router, "navigate", true);
    onClickTab(2);
    refresh();

    onClickFilter(false, false);

    onClickGoButton("tickler-cases-table");
    checkRouter(["/process/case", 1, "L"]);
    onClickTab(1);
    onClickTab(2);
    onInit();
    refresh();

    checkServiceParams(tParams, false, false);
    checkHtmlServiceParams(["", "All"]);


  }));

  it('check html tickler processes filter when collapse ', fakeAsync(() => {

    onClickFilter(true, false);
    injectorSpy(Router, "navigate", true);
    onClickTab(2);
    refresh();

    onClickFilter(false, false);

    onClickGoButton("tickler-cases-table");
    checkRouter(["/process/case", 1, "L"]);
    onClickTab(1);
    onClickTab(2);
    onInit();
    refresh();
    onCollapseFilter();
    checkFilterParamsWhenCollapse(["", "", "", ""], null);


  }));



});
