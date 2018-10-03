import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProcessCase} from "../../models/process-case";
import {Pagination} from "../../models/pagination";
import {PublicUrls} from "../../routing-constants";
import {Router} from "@angular/router";
import {SortOrder} from "../../models/sort-order";
import {
  CasesListInfo, CasesListInfoByAccount,
  TemporalStateServiceService
} from "../../services/temporal-state-service.service";
import {SearchTicklerCaseParams} from "../../models/search-tickler-case-params";
import {Account} from "../../models/account";
import {ROLE_STANDARD_CODES} from "../../models/role";
import {GlobalStateService} from "../../services/global-state.service";
import {DataService} from "../../services/data.service";
import {TicklerType} from "../../models/tickler-types";
import {TicklerProcess} from "../../models/tickler-processes";
import {ProcessCaseTickler} from "../../models/process-case-tickler";

@Component({
  selector: 'tickler-cases-table',
  templateUrl: './tickler-cases-table.component.html',
  styleUrls: ['./tickler-cases-table.component.css']
})
export class TicklerCasesTableComponent implements OnInit {

  @Input() ticklerProcessCases: ProcessCase[];
  @Input() processCase: ProcessCase;
  @Input() searchingProcessCases: boolean = false;
  @Output() onPageChange = new EventEmitter<number>();
  @Output() onSearchCases = new EventEmitter<ProcessCase>();
  @Output() onSearch = new EventEmitter<SortOrder>();
  @Input() pagination: Pagination;
  @Input() sort: SortOrder;
  @Input() currentCasesServiceParams: CasesListInfo = new CasesListInfo();
  @Input() currentParams: SearchTicklerCaseParams;
  @Input() isInRelatedInfo: boolean = false;
  @Input() account: Account = null;

  ticklerTypes: TicklerType[];

  private count: number = 0;

  constructor(private _router: Router, private _temporalStateService: TemporalStateServiceService, private _globalStateService: GlobalStateService,
              private _dataService: DataService) {

  }

  ngOnInit() {

  }


  ngOnChanges(changes) {
    if (changes.currentCasesServiceParams && this.currentCasesServiceParams && this.currentCasesServiceParams.currentPagination) {
      this.setPaginationParams();

    }
    if (changes.currentCasesServiceParams && this.currentCasesServiceParams && this.currentCasesServiceParams.currentSortOrder &&
      this.currentCasesServiceParams.currentSortOrder.isDesc != null) {
      this.setSortOrderParams();
    }
    if (changes.ticklerProcessCases && this.ticklerProcessCases) {
      this.loadLastTicklerNames();
    }
  }

  //loads the last tickler names for all the process cases
  private loadLastTicklerNames() {
    let pagination =  new Pagination(0,1);

    this.ticklerProcessCases.forEach(tpc => {
      this._dataService.getProcessCaseTicklers(tpc, pagination).then(caseTicklersRes => {
          tpc.lastTicklerName = caseTicklersRes[0] ? caseTicklersRes[0].ticklerName : null;

      }).catch(err=>{
        console.log(err);
        console.log("Error retrieving case ticklers");
      })
    })
  }

  //save the current pagination
  setPaginationParams() {
    this.pagination.currPage = this.currentCasesServiceParams.currentPagination.currPage;
  }


  //save the current sort order --> init the counter since the current state of isDesc
  setSortOrderParams() {
    this.sort.isDesc = this.currentCasesServiceParams.currentSortOrder.isDesc;
    this.sort.sortType = this.currentCasesServiceParams.currentSortOrder.sortType;

    if (this.currentCasesServiceParams.currentSortOrder.isDesc == true) {
      this.count = 1;
    } else if (this.currentCasesServiceParams.currentSortOrder.isDesc == false) {
      this.count = 2;
    }
  }


  //init the counter to 0 if is desc is null (2 arrows)
  initSortTable() {
    if (this.sort.isDesc == null) {
      this.count = 0;
    }
  }


  /*
  *
  * - init the sort
  * - when click on the sort arrows:
  *   sortType: filter row
  *   isDesc: change to true/false
  *
  * - init the pagination to 0
  *
  * - count:
  *     0: 2 arrows
  *     1: descending arrow
  *     2: ascending arrow
  *
  *   when the count is 2 init the counter to 0 (2 arrows)
  *
  *
  * */
  sortTable(sortType) {
    this.initSortTable();
    this.sort.sortType = sortType;
    this.sort.isDesc = !this.sort.isDesc;
    this.pagination.currPage = 0;

    if (this.count == 2) {
      this.sort.isDesc = null;
      this.count = 0;
      this.onSearch.emit(this.sort);

    } else {
      this.count += 1;
      this.onSearch.emit(this.sort);

    }
  }


  //emits to the parent a the processCases selected to can load the correspondent data
  searchProcessCaseTickler(processCase: ProcessCase) {
    if (this.processCase == null || this.processCase.id != processCase.id) {
      this.onSearchCases.emit(processCase);
    }
  }

  //pagination
  private incPage(increment = 1) {
    this.onPageChange.emit(increment);
  }


  /*
  * GO button: redirect to manage case page
  * saves the current params of criteria, pagination and sort order on the temporal service
  *
  * */
  goToManageCase(processCase: ProcessCase) {

    if (!this.isInRelatedInfo) {
      this._temporalStateService.casesListInfo = new CasesListInfo();

      this._temporalStateService.casesListInfo.currentParams = this.currentParams;
      this._temporalStateService.casesListInfo.currentPagination = this.pagination;
      this._temporalStateService.casesListInfo.currentSortOrder = this.sort;

    }
    else {
      this._temporalStateService.casesListInfoByAccount = new CasesListInfoByAccount();
      this._temporalStateService.casesListInfoByAccount.currentId = this.account.accountId;
      this._temporalStateService.casesListInfoByAccount.currentType = this.account.accountType;
      this._temporalStateService.casesListInfoByAccount.currentCampaignRecordId = this.account.campaignRecordId;
    }

    this._router.navigate([PublicUrls.process_case.url, processCase.id]);

  }

  get canShowGoButton() {
    return this._globalStateService.loggedAgentHasRoleCode(ROLE_STANDARD_CODES.TICKLER_AGENT);
  }

}
