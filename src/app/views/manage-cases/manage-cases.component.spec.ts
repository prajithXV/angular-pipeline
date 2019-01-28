import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ManageCasesComponent } from './manage-cases.component';
import {IboxtoolsComponent} from "../../components/common/iboxtools/iboxtools.component";
import {SearchCaseCriteriaComponent} from "../search-case-criteria/search-case-criteria.component";
import {TicklerCasesTableComponent} from "../tickler-cases-table/tickler-cases-table.component";
import {ProcessCaseTicklerTableComponent} from "../process-case-tickler-table/process-case-tickler-table.component";
import {FormsModule} from "@angular/forms";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {PaginatorComponent} from "../paginator/paginator.component";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {NewTicklerCaseComponent} from "../new-tickler-case/new-tickler-case.component";
import {DataService} from "../../services/data.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {APP_BASE_HREF, DatePipe, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {CampaignAttributeEditionComponent} from "../campaign-attribute-edition/campaign-attribute-edition.component";
import {CoinNumberInputComponent} from "../coin-number-input/coin-number-input.component";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {CoinNumberInputErrorsComponent} from "../coin-number-input-errors/coin-number-input-errors.component";
import {OwlDateTimeModule} from "ng-pick-datetime";
import {SearchTicklerCaseParams} from "../../models/search-tickler-case-params";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";
import {ProcessCase} from "../../models/process-case";
import {GlobalStateService} from "../../services/global-state.service";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {Router} from "@angular/router";
import {HeaderSorterComponent} from "../header-sorter/header-sorter.component";
import {TemporalStateServiceService} from "../../services/temporal-state-service.service";
import {FilterCodeToNamePipe} from "../../pipes/filter-code-to-name.pipe";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ConfirmationModalComponent} from "../confirmation-modal/confirmation-modal.component";
import {NgbActiveModal, NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";

describe('ManageCasesComponent', () => {
  let component: ManageCasesComponent;
  let fixture: ComponentFixture<ManageCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule, FormsModule,  OwlDateTimeModule, RouterTestingModule, NgbModule.forRoot() ],
      declarations: [ ManageCasesComponent, IboxtoolsComponent, SearchCaseCriteriaComponent, TicklerCasesTableComponent, ProcessCaseTicklerTableComponent,
                      WaitingBackendComponent, PaginatorComponent, CoinDateTransformPipe, NewTicklerCaseComponent, CampaignAttributeEditionComponent, CoinNumberInputComponent, DatepickerComponent,
                      CoinNumberInputErrorsComponent, HeaderSorterComponent, FilterCodeToNamePipe, ConfirmationModalComponent ],
      providers: [ { provide: DataService, useValue: dataServiceMock}, {provide: UserFeedbackService, useValue: userFeedbackMock}, { provide: GlobalStateService, useValue: globalStateServiceMock }, DatePipe, BooleanToStringPipe,
                     TemporalStateServiceService, Location, { provide: LocationStrategy, useClass: PathLocationStrategy }, { provide: APP_BASE_HREF, useValue: '/my/app'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  let processCase;

  function spy(injector: any, method: string, value: any){
    let i = fixture.debugElement.injector.get(injector);

      return spyOn(i, method).and.returnValue(Promise.resolve(value));
  }

  function newParams(id?: number, processCode?: string, statusCode?: string, cifId?: string, accountId?: string, assignedUser?: string, followUpCode?: string){
   let params = new SearchTicklerCaseParams();
    params.Id = id;
    params.ProcessCd = processCode;
    params.StatusCd = statusCode;
    params.CifId = cifId;
    params.AccountId = accountId;
    params.AssignedUser = assignedUser;
    params.FollowUpDueCd = followUpCode;
    return params;

  }

  function newProcessCase(id: number, accountId: string, cifId: string, caseDescription: string, processCode: string, statusCode: string,
                          followUpDueDate: string, createBy: string, createdDate: string){

    processCase = new ProcessCase(id, accountId, cifId, caseDescription, processCode, statusCode, followUpDueDate, createBy, createdDate);

  }

  function getNewProcessCase(){
    return processCase;
  }


  function callComponentFunctions(params, hasCaseTicklers, resolvePromise){
    //functions calls
    component.ngOnInit();
    component.onSearchProcessCases(params);
    if(hasCaseTicklers){
      component.loadCaseTicklers(getNewProcessCase());
    }

    if(resolvePromise){
      tick(); //then
    }
    fixture.detectChanges();
  }

  function goButtonsIndex(){
    let td = fixture.debugElement.queryAll(By.css("tickler-cases-table tbody tr td")).map(e=>e.nativeElement);

    let buttonsIndex = [];
    for(let i in td){

      if(td[i].querySelector("button")!= null){
        buttonsIndex.push(parseInt(i));
      }
    }
    return buttonsIndex;
  }

  function goButtonsTd(){
    return fixture.debugElement.queryAll(By.css("tickler-cases-table tbody tr td")).map(e=>e.nativeElement);
  }


  function onClickToggleArrow(){
    let td = fixture.debugElement.query(By.css("process-case-tickler-table tbody button")).nativeElement;
    td.click();
    fixture.detectChanges();
  }


  function onClickGoButton(){
    let g = goButtonsTd();
    let index = goButtonsIndex();
    index.map(i=> g[i].querySelector("button").click());

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }

  function onClickSortOrder(){
    let th = fixture.debugElement.query(By.css("table.processCases th.cursor")).nativeElement;
    th.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }

  function checkRouter(spy, url, id1, id2?){
    let s = spy.calls.all().map((s,i)=>{
      return{
        value: s.args,
        index: i,
      };
    });

    let s2 = s.find(v=>v.index == 0);

    expect(s2["value"][0][0]).toEqual(url);

    if(s2){
      expect(s2["value"][0][1]).toEqual(id1);
    }else{
      expect(s2["value"][0][1]).toEqual(id2);
    }

  }

  function checkProcessCases(index?: number, id?: number, accountId?: string, cifId?: string, caseDescription?: string, processCode?: string,
                             statusCode?: string, createdBy?: string, createdDate?: string, followUpDueDate?: string, assignedUser?: string){

    if(index!=null){
      expect(component.processCases[index].id).toEqual(id);
      expect(component.processCases[index].accountId).toEqual(accountId);
      expect(component.processCases[index].cifId).toEqual(cifId);
      expect(component.processCases[index].caseDescription).toEqual(caseDescription);
      expect(component.processCases[index].processCode).toEqual(processCode);
      expect(component.processCases[index].statusCode).toEqual(statusCode);
      expect(component.processCases[index].createdBy).toEqual(createdBy);
      expect(component.processCases[index].createdDate).toEqual(createdDate);
      expect(component.processCases[index].followUpDueDate).toEqual(followUpDueDate);
      expect(component.processCases[index].assignedUser).toEqual(assignedUser);
    }else{
      expect(component.processCases).toEqual(null);
    }

  }


  function checkProcessCaseTicklers(index: number, id: number, ticklerTypeCode: string, caseId: number, ticklerDescription: string, createdBy: string,
                                    createdDate: string){

    expect(component.processCaseTicklers[index].id).toEqual(id);
    expect(component.processCaseTicklers[index].ticklerTypeCode).toEqual(ticklerTypeCode);
    expect(component.processCaseTicklers[index].caseId).toEqual(caseId);
    expect(component.processCaseTicklers[index].ticklerDescription).toEqual(ticklerDescription);
    expect(component.processCaseTicklers[index].createdBy).toEqual(createdBy);
    expect(component.processCaseTicklers[index].createdDate).toEqual(createdDate);

  }

  function checkMessage(text: string){
    let div = fixture.debugElement.query(By.css("div.search"));
    let p = fixture.debugElement.query(By.css("p"));
    let pDiv = fixture.debugElement.query(By.css("process-case-tickler-table div"));

    if(div){
      expect(div.nativeElement.innerText).toEqual(text);
    }else if(p){
      expect(p.nativeElement.innerText).toEqual(text);
    }else{
      //expected message to can show the second component
      expect(pDiv.nativeElement.innerText).toEqual(text);
    }

  }

  function checkCurrentServiceParams(id: number, accountId: string, assignedUser: string, cifId: string, followUpCode: string, processCode: string, statusCode: string){
    expect(component.serviceParams.currentParams.Id).toEqual(id);
    expect(component.serviceParams.currentParams.AccountId).toEqual(accountId);
    expect(component.serviceParams.currentParams.AssignedUser).toEqual(assignedUser);
    expect(component.serviceParams.currentParams.ProcessCd).toEqual(processCode);
    expect(component.serviceParams.currentParams.StatusCd).toEqual(statusCode);
  }

  function checkCurrentPagination(currPage: number, pageSize: number ){
    expect(component.serviceParams.currentPagination.currPage).toEqual(currPage);
    expect(component.serviceParams.currentPagination.pageSize).toEqual(pageSize);
  }

  function checkCurrentSortOrder(isDesc: boolean, sortType: string){
    expect(component.serviceParams.currentSortOrder.isDesc).toEqual(isDesc);
    expect(component.serviceParams.currentSortOrder.sortType).toEqual(sortType);
  }

  function checkOrderClicked(isDesc: boolean, sortType: string){
    expect(component.sOrder.isDesc).toEqual(isDesc);
    expect(component.sOrder.sortType).toEqual(sortType);
  }


  function checkToggleBox(title: string){
    let toggleBox = fixture.debugElement.query(By.css("div.box-shadow")).nativeElement;
    let t = fixture.debugElement.query(By.css("div.box-shadow h3")).nativeElement;

    expect(toggleBox).toBeTruthy();
    expect(t.innerText).toEqual(title);


  }


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('not resolve the promise', fakeAsync(() => {

    let params = newParams();

    checkProcessCases();

    fixture.detectChanges();

    spy(DataService, "getCases", []);

    callComponentFunctions(params, false, false);

    checkProcessCases();

    checkMessage("Searching...");


  }));


  it('resolve the promise with empty process cases', fakeAsync(() => {

    let params = newParams(1,"SPOC", "NEW", "123", "122", "Isabeau", "DUE");

    //not process cases
    checkProcessCases();

    fixture.detectChanges();

    spy(DataService, "getCases", []);

    //call to the functions
    callComponentFunctions(params, false, true);

    //not process cases
    expect(component.processCases.length).toEqual(0);

    checkMessage("No data found.")


  }));


  it('resolve the promise with process cases', fakeAsync(() => {

    let params = newParams(1,"SPOC", "NEW", "123", "122", "Isabeau", "DUE");

    //no process cases
    checkProcessCases();

    fixture.detectChanges();

    //spies on getCases and resolve the promise with data
    spy(DataService, "getCases", dataServiceMock.processCases);

    callComponentFunctions(params, false, true);

    checkProcessCases(0, 1,"122", "123", "desc", "SPOC", "NEW", "Guts",
      "2018-11-27T11:22:34.57", "2018-11-29T11:22:34.57", "Isabeau");

    checkProcessCases(1, 2,"123", "124", "desc2", "SPAC", "NEW", "Griffith",
      "2018-11-28T11:22:34.57", "2018-11-30T11:22:34.57", "Navarre");

    checkMessage("Select a process case.");


  }));


  it('resolve the promise and click on "Go" button', fakeAsync(() => {

    let params = newParams(1,"SPOC", "NEW", "123", "122", "Isabeau", "DUE");

    //no process cases
    checkProcessCases();

    fixture.detectChanges();

    spy(DataService, "getCases", dataServiceMock.processCases);
    let spy2 = spy(Router, "navigate", true);

    callComponentFunctions(params, false, true);

    onClickGoButton();

    checkRouter(spy2, "/process/case",1, 2);

  }));


  it('resolve the promise and click on "Go" button: check service params', fakeAsync(() => {

    //param values
    let params = newParams(1,"SPOC", "NEW", "123", "122", "Isabeau", "DUE");

    checkProcessCases();

    fixture.detectChanges();

    spy(DataService, "getCases", dataServiceMock.currentProcessCase);
    let spy2 = spy(Router, "navigate", true);

    callComponentFunctions(params, false, true);

    onClickGoButton();

    checkCurrentServiceParams(1, "122", "Isabeau", "123", "DUE", "SPOC", "NEW");
    checkCurrentPagination(0, 10);
    checkCurrentSortOrder(null, null);

    //Go button 1 --> id: 1
    checkRouter(spy2, "/process/case", 1);

  }));

  it('resolve the promise and click on "sort order" button (3 times): check service params', fakeAsync(() => {

    //param values
    let params = newParams(1,"SPOC", "NEW", "123", "122", "Isabeau", "DUE");

    //check when init
    checkProcessCases();

    fixture.detectChanges();

    //spies
    spy(DataService, "getCases", dataServiceMock.currentProcessCase);
    let spy2 = spy(Router, "navigate", true);

    //function calls
    callComponentFunctions(params, false, true);

    //click on order arrow
    onClickSortOrder();

    //click on Go button
    onClickGoButton();

    //check order clicked and order saved on the service
    checkOrderClicked(true, "followUpDueDate");
    checkCurrentSortOrder(true, "followUpDueDate");

    //click on order arrow
    onClickSortOrder();

    //check order clicked and order saved on the service
    checkCurrentSortOrder(false, "followUpDueDate");
    checkOrderClicked(false, "followUpDueDate");

    //click on order arrow
    onClickSortOrder();

    //check order clicked and order saved on the service
    checkCurrentSortOrder(null, "followUpDueDate");
    checkOrderClicked(null, "followUpDueDate");

    //check the other service params
    checkCurrentServiceParams(1, "122", "Isabeau", "123", "DUE", "SPOC", "NEW");
    checkCurrentPagination(0, 10);

    //Go button 1 --> id: 1; check router
    checkRouter(spy2, "/process/case", 1);

  }));



  it('resolve the promise and click on a process case', fakeAsync(() => {

    let params = newParams(1,"SPOC", "NEW", "123", "122", "Isabeau", "DUE");

    checkProcessCases();

    fixture.detectChanges();

    //spies
    spy(DataService, "getCases", dataServiceMock.processCases);
    spy(DataService, "getProcessCaseTicklers", dataServiceMock.processCaseTicklers);

    callComponentFunctions(params, true, true);

    //sorted by date
    checkProcessCaseTicklers(1,1, "CUSTOMER1", 1, "desc1", "Hak", "2018-11-29T11:22:34.57");
    checkProcessCaseTicklers(0,2, "CUSTOMER2", 2, "desc2", "Yona", "2018-11-30T11:22:34.57");

  }));


  it('resolve the promise and click on view attribute details', fakeAsync(() => {

    //params
    let params = newParams(1,"SPOC", "NEW", "123", "122", "Isabeau", "DUE");

    //no process cases
    checkProcessCases();

    fixture.detectChanges();

    //spies
    spy(DataService, "getCases", dataServiceMock.processCases);
    spy(DataService, "getProcessCaseTicklers", dataServiceMock.processCaseTicklers);

    //functiton calls
    callComponentFunctions(params, true, true);

    //click on toggle arrow
    onClickToggleArrow();

    //check if the box is toggle
    checkToggleBox("Attributes");


  }));

});
