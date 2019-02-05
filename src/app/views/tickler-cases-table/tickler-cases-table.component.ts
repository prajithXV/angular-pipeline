import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProcessCase} from "../../models/process-case";
import {Pagination} from "../../models/pagination";
import {PublicUrls} from "../../routing-constants";
import {Router} from "@angular/router";
import {SortOrder} from "../../models/sort-order";
import {
  CasesListInfo,
  TemporalStateServiceService
} from "../../services/temporal-state-service.service";
import {SearchTicklerCaseParams} from "../../models/search-tickler-case-params";
import {Account} from "../../models/account";
import {DataService} from "../../services/data.service";
import {TicklerType} from "../../models/tickler-types";
import {CoinConstants} from "../../services/coin-constants";

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
  @Input() canShowGoButton: boolean = false;

  ticklerTypes: TicklerType[];

  private count: number = 0;

  constructor(private _router: Router, private _temporalStateService: TemporalStateServiceService,
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

  isOverflown(procCase) {
    return procCase != null && procCase.caseDescription != null && procCase.caseDescription.length > 15;
  }

  goToAccount(pc: ProcessCase) {
    this._temporalStateService.casesListInfo = new CasesListInfo();

    this._temporalStateService.casesListInfo.currentParams = this.currentParams;
    this._temporalStateService.casesListInfo.currentPagination = this.pagination;
    this._temporalStateService.casesListInfo.currentSortOrder = this.sort;

    this._router.navigate([PublicUrls.account.url, pc.accountId, pc.accountType, CoinConstants.NoCampaignRecordId]);
  }
}
