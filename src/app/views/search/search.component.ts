import {Customer} from "../../models/customer";
import {Account} from "../../models/account";
import {
  AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild
} from '@angular/core';
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/switchMap';
import {DataService} from "../../services/data.service";
import {UFNotification, UserFeedbackService} from "../../services/user-feedback.service";
import {UFSeverity} from "../../services/ufseverity";
import {SearchAccountCriteriaParams} from "../../models/search-account-criteria-params";
import {CampaignListAccount} from "../../models/campign-list-accounts";
import {SearchCampaignCriteriaParams} from "../../models/search-campaign-criteria-params";
import {Pagination} from "../../models/pagination";
import {TicklerProcess} from "../../models/tickler-processes";
import {PublicUrls, UrlComponents} from "../../routing-constants";
import {GlobalStateService} from "../../services/global-state.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NgbTabset} from "@ng-bootstrap/ng-bootstrap";

import {
  AccountListInfo, CampaignListInfo, CasesListInfo,
  TemporalStateServiceService
} from "../../services/temporal-state-service.service";
import {ROLE_STANDARD_CODES} from "../../models/role";
import {Code} from "../../models/code";
import {Campaign} from "../../models/campaign";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['../homeview.component.css', './search.component.css']
})
// export class SearchComponent implements OnInit, AfterViewInit {
export class SearchComponent implements OnInit {
  routes = PublicUrls;
  tokens = UrlComponents;

  private customers: Customer[] = null;
  private currentCustomer: Customer = null;
  private currentAccounts: Account[] = null;
  currentAccountsWhenFilter = this.currentAccounts;
  private filterAccounts = null;

  //
  // private sentences = this.text;
  // private filterSentences = null;
  // private sentencesWhenFilter = this.sentences;

  private campaignListAccounts: CampaignListAccount[] = null;
  private customerNotFound: boolean = false;  // Customer searched but not found
  private searchingCustomer: boolean = false;
  private searchingAccounts: boolean = false;


  private searchingCampaignListAccounts: boolean = false;
  private currentCampaignListAccounts: CampaignListAccount = null;

  private clAccountsPagination: Pagination = new Pagination(0, 15);
  private clCurrentParams: SearchCampaignCriteriaParams = null;

  private isClAccountsVisible: boolean = false;
  private isCustommerVisible: boolean = false;

  private searchFilter: SearchAccountCriteriaParams = null;
  private searchFilterWhenChange: SearchAccountCriteriaParams = null;
  private _customerStream = new Subject<SearchAccountCriteriaParams>();
  private _accountsStream = new Subject<Customer>();


  @Input() currentServiceParams: CampaignListInfo = new CampaignListInfo();
  @Input() currentAccountServiceParams: AccountListInfo = new AccountListInfo();
  @Input() processes: TicklerProcess[] = null;
  @Input() currentTab: string;
  @Input() nextCallCampaigns: Campaign[] = null;
  @Input() nextCallStatuses: Code[] = null;
  @Input() accountTypes: Code[] = null;

  constructor(private _dataService: DataService,
              private _userFeedbackService: UserFeedbackService, private _globalStateService: GlobalStateService,
              private _router: Router, private _route: ActivatedRoute, private _temporalStateService: TemporalStateServiceService) {
  }


  ngOnInit() {
    //load data
    this.subscribeCustomer();
    this.subscribeAccounts();

  }


  /*
  *
  * return the data of the temporal service
  *
  * */
  get currentCampaignParams(): CampaignListInfo {
    return this._temporalStateService.campaignListInfo;
  }

  get currentAccountParams(): AccountListInfo {
    return this._temporalStateService.accountListInfo;
  }




  search(params: SearchAccountCriteriaParams) {
    this.customers = null;
    this.currentCustomer = null;
    this.currentAccounts = null;
    this.currentAccountsWhenFilter = [];
    this.customerNotFound = false;
    this.searchingCustomer = true;
    this._customerStream.next(params);

    this.searchFilter = params.clone();
  }

  searchAccountsForCustomer(cust: Customer) {
    this.currentAccounts = null;
    this.currentAccountsWhenFilter = null;
    this.searchingAccounts = true;
    this.currentCustomer = cust;
    this._accountsStream.next(cust);
  }


  private subscribeCustomer() {
    this._customerStream
      .switchMap(params => {
        return this._dataService
          .customerSearch(params);
      })
      .subscribe(
        custs => {
          this.searchingCustomer = false;
          if (custs.length > 0) {
            this.customers = custs;
            this.customerNotFound = false;
          } else {
            this.customers = [];
            this.customerNotFound = true;
            this._accountsStream.next(null);
          }
          // Search accounts only if 1 customer found
          if (this.customers.length == 1) {
            this.searchAccountsForCustomer(this.customers[0]);
          }
        },
        error => {
          // Notify the user and cancel search
          this._userFeedbackService.handleNotification(
            new UFNotification(0, "Error getting customer", UFSeverity.error, error)
          );
          this.customers = null;
          this.currentAccounts = null;
          // this.currentAccountsWhenFilter = null;
          this.customerNotFound = false;
          this.searchingCustomer = false;
          this.searchingAccounts = false;
          // We need new subscriptions
          this.subscribeCustomer();
        });

  }

  private subscribeAccounts() {
    this._accountsStream
      .switchMap(customer => {
        // If null received, no customer found
        if (!customer) {
          return new Promise<Account[]>(resolve => resolve([]));
        }
        // this.searchFilterWhenChange = this.searchFilter;
        if(this.searchFilter.accountId!="" || this.currentAccountParams){
          return this._dataService
            .getCustomerAccounts(customer, this.searchFilter.accountType);

        } else{
          if(this.customers.length > 1) this.searchFilter.accountType = null;
          return this._dataService
            .getCustomerAccounts(customer, null);
        }


      })
      .subscribe(
        accounts => {
          this.searchingAccounts = false;
          this.currentAccounts = accounts;
          this.accountsTypeFilter();
          // this.currentAccountServiceParams.currentParams.accountType = null;




        },
        error => {
          // Notify the user and cancel search
          this._userFeedbackService.handleNotification(
            new UFNotification(0, "Error getting accounts", UFSeverity.error, error)
          );
          this.currentAccounts = null;
          this.currentAccountsWhenFilter = null;
          this.searchingAccounts = false;
          // We need new subscriptions
          this.subscribeAccounts();

        })
  }



  // private filter() {
  accountsTypeFilter() {
    this.currentAccountsWhenFilter = [];
    if(this.searchFilter.accountType === null){
      for (let i in this.currentAccounts) {
        if (this.currentAccounts[i].accountType == 'L' || this.currentAccounts[i].accountType == "D") {
          this.currentAccountsWhenFilter.push(this.currentAccounts[i]);
        }
      }
    }else{
        for (let i in this.currentAccounts) {
          if (this.searchFilter.accountType === this.currentAccounts[i].accountType) {
            this.currentAccountsWhenFilter.push(this.currentAccounts[i]);
          }
        }
    }
  }


  /*emit from de child --> click on view Cl
  *
  * if there are criteria params clone and keep it
  * */
  onViewCampaignListAccounts(params: SearchCampaignCriteriaParams = null, pagination?: Pagination) {
    if (params) {
      this.clCurrentParams = params.clone();
      this.clAccountsPagination.currPage = pagination ? pagination.currPage : 0;
    }

    this.searchingCampaignListAccounts = true;
    this.isClAccountsVisible = true;
    this.currentCampaignListAccounts = null;

    this._dataService.getCampaignListAccounts(this.clCurrentParams, this.clAccountsPagination).then(res => {
      this.campaignListAccounts = res;
      this.searchingCampaignListAccounts = false;

    }).catch(err => {
      // TODO: manage error
      console.log("Error retrieveing campaign list accounts");
      console.log(err);
      this.searchingCampaignListAccounts = false;

    });
  }

  onClickViewCL(params: SearchCampaignCriteriaParams = null) {
    this.isCustommerVisible = false;
    this.searchFilter = null;

    this.onViewCampaignListAccounts(params);
  }

  onClickSearch(params: SearchAccountCriteriaParams = null) {
    this.isClAccountsVisible = false;
    this.isCustommerVisible = true;
    this.clCurrentParams = null;
    if (params.accountId == null || params.accountId == "") params.accountType = null;
    this.search(params);
  }

  private incPage(increment = 1) {
    this.clAccountsPagination.currPage += increment;
    this.onViewCampaignListAccounts();
  }


  get isCAccountsVisible(): boolean {
    return this.isClAccountsVisible;
  }


  set isCAccountsVisible(value: boolean) {
    this.isClAccountsVisible = value;
  }


  get isCustVisible() {
    return this.isCustommerVisible;
  }

  set isCustVisible(value: boolean) {
    this.isCustommerVisible = value;
  }


  get accountFilter(): SearchAccountCriteriaParams {
    return this.searchFilter;
  }

  set accountFilter(value: SearchAccountCriteriaParams) {
    this.searchFilter = value;
  }

  get campaignFilter(): SearchCampaignCriteriaParams {
    return this.clCurrentParams;
  }

  set campaignFilter(value: SearchCampaignCriteriaParams) {
    this.clCurrentParams = value;
  }

}
