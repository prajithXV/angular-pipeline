import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {SearchTicklerCaseParams} from "../../models/search-tickler-case-params";
import {Pagination} from "../../models/pagination";
import {DataService} from "../../services/data.service";
import {ProcessCase} from "../../models/process-case";
import {ProcessCaseTickler} from "../../models/process-case-tickler";
import {TicklerProcess} from "../../models/tickler-processes";

import {TicklerType} from "../../models/tickler-types";
import {SortOrder} from "../../models/sort-order";
import {CasesListInfo, TemporalStateServiceService} from "../../services/temporal-state-service.service";
import {PublicUrls} from "../../routing-constants";
import {NgbTabset} from "@ng-bootstrap/ng-bootstrap";
import {Code} from "../../models/code";



export const selectTicklerProcessesTab = "ticklerProcesses2";

@Component({
  selector: 'manage-cases',
  templateUrl: './manage-cases.component.html',
  styleUrls: ['./manage-cases.component.css']
})
export class ManageCasesComponent implements OnInit {
  routes = PublicUrls;

  private pagination: Pagination = new Pagination(0, 10);
  private pctPagination: Pagination = new Pagination(0, 10);
  private sortOrder: SortOrder = new SortOrder(null ,null);
  private currentParams: SearchTicklerCaseParams = null;

  @Input() currentCasesServiceParams: CasesListInfo = new CasesListInfo();


  private searchingProcessCases: boolean = false;
  private searchingCaseTicklers: boolean = false;
  @Input() isTicklerVisible: boolean = false;
  private filterProcesses: TicklerProcess = null;
  private isRefreshed: boolean = false;
  processCaseTicklers: ProcessCaseTickler[] = null;
  processCases: ProcessCase[] = null;
  currentProcessCase: ProcessCase = null;
  @Input() processes: TicklerProcess[] = null;
  ticklerTypes: TicklerType[] = null;

  @Input() currentTab: string;
  @Input() isCreating: boolean = false;
  @Input() statuses: Code[] = null;
  @Input() followUpDues: Code[] = null;



  @ViewChild("tab") private _tab: NgbTabset;

  constructor(private _dataService: DataService, private _temporalStateService: TemporalStateServiceService, private _cdr: ChangeDetectorRef,) {



  }


  ngOnInit() {

  }


  //return all the params
  get serviceParams(): CasesListInfo{
    return this._temporalStateService.casesListInfo;
  }


  //load case ticklers --> receives a processCase as a parameter (current id selected)
  loadCaseTicklers(processCase: ProcessCase) {
    this.searchingCaseTicklers = true;
    this.isCreating = false;
    this.isTicklerVisible = true;
    this.processCaseTicklers = [];
    if (this.currentProcessCase != null && this.currentProcessCase.id != processCase.id) {
      this.pctPagination.currPage = 0;
    }
    this.currentProcessCase = processCase;
    //gets Process cases
    this._dataService.getProcessCaseTicklers(processCase, this.pctPagination).then(res => {
      this.processCaseTicklers = res;
      this.searchingCaseTicklers = false;

     // sort by the most recent date
     this.processCaseTicklers.sort((d1,d2)=> new Date(d2.createdDate).getTime() - new Date(d1.createdDate).getTime());

      //gets tickler types
      this.filterProcesses = this.processes.find(p=> p.processCode === this.currentProcessCase.processCode);

        this._dataService.getTicklerTypes(this.filterProcesses).then(res => {
          this.ticklerTypes = res;
        }).catch(err =>{
          this.searchingCaseTicklers = false;
          console.log("Error retrieving tickler types");
          console.log(err);
        })

    }).catch(err => {
      this.searchingCaseTicklers = false;
      console.log("Error retrieving case ticklers");
      console.log(err)
    })
  }

  //filter as a parameter and load cases
  onSearchProcessCases(params: SearchTicklerCaseParams = null, pagination?: Pagination, sortOrder?: SortOrder) {
    if (params) {
      this.currentParams = params.clone();
      this.pagination.currPage = pagination ? pagination.currPage : 0;
      this.sortOrder.isDesc = sortOrder ? sortOrder.isDesc : null;
      this.sortOrder.sortType = sortOrder ? sortOrder.sortType : null;
    }
    if(!this.isRefreshed){
      this.currentProcessCase = null;
    }
    this.processCaseTicklers = [];
    this.searchingProcessCases = true;
    this.isTicklerVisible = true;
    this._dataService.getCases(this.currentParams, this.sortOrder, this.pagination).then(res => {
      this.processCases = res;

      this.searchingProcessCases = false;
      this.isRefreshed = false;


    }).catch(err => {
      this.searchingProcessCases = false;
      console.log("Error retrieving process cases");
      console.log(err);
    })

  }


  //tickler case refresh
  refreshCaseTicklers(){
    this.isRefreshed = true;
    this.isCreating = false;
    this.pctPagination.currPage = 0;
    this.onSearchProcessCases(this.currentParams);
    this.loadCaseTicklers(this.currentProcessCase);
  }

  //pagination
  private incPage(increment = 1) {
    this.pagination.currPage += increment;
    this.onSearchProcessCases();
  }

  private incPCTPage(increment = 1) {
    this.pctPagination.currPage += increment;
    this.loadCaseTicklers(this.currentProcessCase);
  }

  onNewTickler() {
    this.isCreating = true;
  }

  onCancel(){
    this.isCreating = false;
  }

  refreshOrder(order){
    this.sortOrder = order;
    this.onSearchProcessCases();
  }

  get sOrder(): SortOrder{
    return this.sortOrder;
  }

  set sOrder(value: SortOrder){
    this.sortOrder = value;
  }

  get isProcessCaseVisible(): boolean{
    return this.isTicklerVisible;
  }

  set isProcessCaseVisible(value: boolean){
    this.isTicklerVisible = value;
  }


  get processCaseParams():SearchTicklerCaseParams{
    return this.currentParams;
  }

  set processCaseParams(value: SearchTicklerCaseParams){
    this.currentParams = value;
  }

}
