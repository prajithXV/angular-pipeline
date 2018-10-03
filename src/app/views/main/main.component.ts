import {
  AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output,
  ViewChild
} from '@angular/core';
import {SearchComponent} from "../search/search.component";
import {ManageCasesComponent} from "../manage-cases/manage-cases.component";
import {
  AccountListInfo, CampaignListInfo, CasesListInfo,
  TemporalStateServiceService
} from "../../services/temporal-state-service.service";
import {FullSearchComponent} from "../full-search/full-search.component";
import {TicklerProcess} from "../../models/tickler-processes";
import {DataService} from "../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {SearchCampaignCriteriaParams} from "../../models/search-campaign-criteria-params";
import {SearchAccountCriteriaParams} from "../../models/search-account-criteria-params";
import {SearchTicklerCaseParams} from "../../models/search-tickler-case-params";
import {NgbTabset} from "@ng-bootstrap/ng-bootstrap";
import {Code} from "../../models/code";
import {Campaign, pausedStatus} from "../../models/campaign";
import {HotkeysSubscriber} from "../../general/hotkeys-subscriber";
import {GlobalStateService} from "../../services/global-state.service";
import {UserFeedbackService} from "../../services/user-feedback.service";


export const campaignTab = "campaignProcessing";
export const accountTab = "accountSearch";
export const ticklerTab = "ticklerProcesses";



@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {

  private currentServiceParams: CampaignListInfo = new CampaignListInfo();
  private currentCasesServiceParams: CasesListInfo = new CasesListInfo();
  private currentAccountServiceParams: AccountListInfo = new AccountListInfo();
  private currentTab: string = null;
  campaigns: Campaign[] = null;
  statuses: Code[] = null;
  accountTypes: Code[] = null;
  processStatuses: Code[] = null;
  followUpDues: Code[] = null;

  private campaignCode: string;

  private _hkSubscription: HotkeysSubscriber = new HotkeysSubscriber();

  processes: TicklerProcess[] = null;

  @ViewChild('search') private _tSearch: SearchComponent;
  @ViewChild('manageCases') private _tManage: ManageCasesComponent;
  @ViewChild('fullSearch') private _tFullSearch: FullSearchComponent;



  constructor(private _dataService: DataService, private _temporalStateService: TemporalStateServiceService, private _cdr: ChangeDetectorRef,
              private route: ActivatedRoute, private _globalStateService: GlobalStateService, private _userFeedbackService: UserFeedbackService) { }

  ngOnInit() {
    this.loadCurrentCampaignParams();
    this.loadCurrentCasesParams();
    this.loadProcess();
    this.loadCampaigns();
    this.loadStatuses();
    this.loadAccountTypes();
    this.loadFollowUpDueCodes();
    this.loadProcessStatusCodes();


  }

  ngAfterViewInit(){

    this.route.params.subscribe(params => {
      let count = +params['phoneNumber'];
      if(count >= 0){
        this._tSearch.isCustVisible = true;
        this._tManage.isProcessCaseVisible = false;
        this._tSearch.isCAccountsVisible = false;
        this._tManage.processCaseParams = null;
        this._tSearch.campaignFilter = null;
        this.currentServiceParams.currentParams = null;
        this.currentCasesServiceParams.currentParams = null;

      }
        this.loadCurrentAccountParams();
        this.setTab();
        this._cdr.detectChanges();

    });

  }


  loadCampaigns(){
    // Load campaigns
    this._dataService.getAgentCampaigns(this._globalStateService.loggedAgent)
      .then(cps => {
        this.campaigns = cps;
        if (cps.length > 0) {
          // if there is a code stored and is received, set it
          let gcc = this._globalStateService.currentCampaignCode;
          if (gcc && cps.find(cp => cp.code == gcc)) {
            this.campaignCode = gcc;
          } else {
            // In other case, use the first campaign received
            let index = cps.findIndex(cp=>cp.statusCode != pausedStatus);
            this.campaignCode = cps[index].code;

          }
        }
      })
      .catch(error => this._userFeedbackService.handleError("Error retrieving campaigns", error));
    // this._hkSubscription.startSubscription(this._globalStateService, () => this._popovers);
  }


  loadStatuses(){
    this._dataService.getCampaignListRecordStatusCodes().then(codes => this.statuses = codes);
  }

  loadProcessStatusCodes(){
    this._dataService.getTicklerStatusCodes().then(codes => this.processStatuses = codes);
  }

  loadFollowUpDueCodes(){
    this._dataService.getFollowUpDueCodes().then(codes => this.followUpDues = codes);
  }

  loadAccountTypes(){
    this._dataService.getAccountTypes().then(res=>{
      this.accountTypes = res;
    }).catch(err=>{
      console.log("Error retrieving account types", err);
    })
  }
  //Get tickler processes
  loadProcess(){
    this._dataService.getProcesses()
      .then((processes) => {
        this.processes = processes;
      }).catch((e) => {
      console.log(e);
    });
  }


  //if there are saved params on the temporal service load the data with this information: Campaign view cl
  loadCurrentCampaignParams(){
    if(this._temporalStateService.isCampaignListInfo){
      this.currentServiceParams = this._temporalStateService.campaignListInfo;
      if(this.currentServiceParams){
        this._tSearch.onViewCampaignListAccounts(this.currentServiceParams.currentParams, this.currentServiceParams.currentPagination);

      }
      this._temporalStateService.campaignListInfo = null;
    }

  }

  //if there are saved params on the temporal service load the data with this information: Search
  loadCurrentAccountParams(){
    if(this._temporalStateService.isAccountListInfo){
      this.currentAccountServiceParams = this._temporalStateService.accountListInfo;
      if(this.currentAccountServiceParams){
        this._tSearch.search(this.currentAccountServiceParams.currentParams);
        this._tSearch.searchAccountsForCustomer(this.currentAccountServiceParams.currentCustomer);

      }
      this._temporalStateService.accountListInfo = null;
    }
  }


  /*load params since the temporal service
 *
 * if there are info on temporal service load the info with them
 *
 * */
  loadCurrentCasesParams(){
    if(this._temporalStateService.isCasesListInfo){
      this.currentCasesServiceParams = this._temporalStateService.casesListInfo;
      if(this.currentCasesServiceParams) {
        this._tManage.onSearchProcessCases(this.currentCasesServiceParams.currentParams, this.currentCasesServiceParams.currentPagination, this.currentCasesServiceParams.currentSortOrder);
      }
      this._temporalStateService.casesListInfo = null;
    }
  }


  //when tab change
  showData(event){
    if(event!=null&&(event.activeId == campaignTab && event.nextId == accountTab)){
      if(this._tSearch.accountFilter!=null){
        this._tSearch.isCustVisible = true;
      }
      else {
        this.currentAccountServiceParams.currentParams = null;
      }
    }

    if(event!=null&&(event.activeId == accountTab && event.nextId == campaignTab)) {
      if (this._tSearch.campaignFilter != null) {
        this._tSearch.isCAccountsVisible = true;

      }
      else {
        this.currentServiceParams.currentParams = null;
      }
    }
    if(event!=null&&(event.activeId == ticklerTab && event.nextId == campaignTab)){
      if(this._tSearch.campaignFilter !=null){
        this._tSearch.isCAccountsVisible = true;
      }else{
        this.currentServiceParams.currentParams = null;
      }
    }

    if(event!=null&&(event.activeId == ticklerTab && event.nextId == accountTab)){
      if(this._tSearch.accountFilter !=null){
        this._tSearch.isCustVisible = true;
      }else{
        this.currentAccountServiceParams.currentParams = null;
      }
    }

    if(event!=null&&(event.activeId == accountTab && event.nextId == ticklerTab)){
      if(this._tManage.processCaseParams !=null){
        this._tManage.isProcessCaseVisible = true;
      }else{
        this.currentCasesServiceParams.currentParams = null;
      }
    }

    if(event!=null&&(event.activeId == campaignTab && event.nextId == ticklerTab)){
      if(this._tManage.processCaseParams !=null){
        this._tManage.isProcessCaseVisible = true;
      }else{
        this.currentCasesServiceParams.currentParams = null;
      }
    }
  }


  onClickViewCl(event){
    this._tManage.isProcessCaseVisible = false;
    this._tManage.processCaseParams = null;
    this._tSearch.onClickViewCL(event);
    // this.nCampaigns;
    // this.nStatuses;
  }

  onTabChange(event){
    this.showData(event);
    this.currentTab = event.nextId;
  }

  onClickSearch(event){
    this._tManage.isProcessCaseVisible = false;
    this._tManage.processCaseParams = null;
    this._tSearch.onClickSearch(event);
  }


  onClickProcessesCases(event){
    this._tManage.isProcessCaseVisible = true;
    this._tSearch.isCustVisible = false;
    this._tSearch.isCAccountsVisible = false;
    this._tSearch.campaignFilter = null;
    this._tSearch.accountFilter = null;
    this._tManage.onSearchProcessCases(event);
  }

  //set tab
  setTab(){
    if(this.currentServiceParams.currentParams){
      this._tFullSearch.currentTab.select(campaignTab);

    }else if(this.currentAccountServiceParams.currentParams){
      this._tFullSearch.currentTab.select(accountTab);
    }
    else if(this.currentCasesServiceParams.currentParams){
      this._tFullSearch.currentTab.select(ticklerTab);
    }
  }

  //
  // get nCampaigns(){
  //   console.log(this.nextCallCampaigns);
  //   return this.nextCallCampaigns = this._tFullSearch.campaigns;
  // }
  //
  // get nStatuses(){
  //   return this.nextCallStatuses = this._tFullSearch.statuses;
  // }

  get campaignServiceParams(): SearchCampaignCriteriaParams{
    return this.currentServiceParams.currentParams;
  }

  set campaignServiceParams(value: SearchCampaignCriteriaParams){
    this.currentServiceParams.currentParams = value;
  }

  get accountServiceParams(): SearchAccountCriteriaParams{
    return this.currentAccountServiceParams.currentParams;
  }

  set accountServiceParams(value: SearchAccountCriteriaParams){
    this.currentAccountServiceParams.currentParams = value;
  }

  get ticklerServiceParams(): SearchTicklerCaseParams {
    return this.currentCasesServiceParams.currentParams;
  }

  set ticklerServiceParams(value: SearchTicklerCaseParams){
    this.currentCasesServiceParams.currentParams = value;
  }

}



