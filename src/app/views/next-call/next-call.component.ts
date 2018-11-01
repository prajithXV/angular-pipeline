import {
  Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChild,
  ViewChildren
} from '@angular/core';
import {DataService} from "../../services/data.service";
import {GlobalStateService} from "../../services/global-state.service";
import {Router} from "@angular/router";
import {Campaign, pausedStatus} from "../../models/campaign";
import {PublicUrls} from "../../routing-constants";
import {UFSeverity} from "../../services/ufseverity";
import {UFNotification, UserFeedbackService} from "../../services/user-feedback.service";
import {PopoverDirective} from "ngx-bootstrap";
import {HotkeysSubscriber} from "../../general/hotkeys-subscriber";
import {SearchCampaignCriteriaParams} from "../../models/search-campaign-criteria-params";
import {Code} from "../../models/code";
import {ROLE_STANDARD_CODES} from "../../models/role";
import {CampaignListInfo, TemporalStateServiceService} from "../../services/temporal-state-service.service";
import {NgbTabset} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'next-call',
  templateUrl: './next-call.component.html',
  host: {'(window:keydown)': 'hotkeys($event)'},
  styleUrls: ['./next-call.component.css']
})
export class NextCallComponent implements OnInit, OnDestroy {
  @Input() searchingCampaignListAccounts: boolean = false;
  @Input() currentServiceParams: CampaignListInfo;
  @Output() onViewCL = new EventEmitter<SearchCampaignCriteriaParams>();
  @ViewChild('tab') private _tsCampaignList: NgbTabset;
  campaignCriteria: SearchCampaignCriteriaParams = new SearchCampaignCriteriaParams();

  @Input() campaigns :Campaign[] = [];
  @Input() campaignCode :string = null;
  waitingResponse = false;

  @Input() statuses: Code[] = null;
  private isViewClButtonClicked: boolean = false;
  private isShowArrow: boolean = false;


  @ViewChildren(PopoverDirective) private _popovers: QueryList<PopoverDirective>;
  private _hkSubscription: HotkeysSubscriber = new HotkeysSubscriber();

  constructor(
    private _dataService: DataService,
    private _globalStateService: GlobalStateService,
    private _route: Router,
    private _userFeedbackService: UserFeedbackService,
    private _temporalStateService: TemporalStateServiceService
  ) { }



  ngOnChanges(changes){
    if(changes.currentServiceParams && this.currentServiceParams && this.currentServiceParams.currentParams!=null){
      this.setParams();
    }
  }


  get pausedStatus(){
    return pausedStatus;
  }


  ngOnInit() {
    //status
    // this._dataService.getCampaignListRecordStatusCodes().then(codes => this.statuses = codes);
    // // Load campaigns
    // this._dataService.getAgentCampaigns(this._globalStateService.loggedAgent)
    //   .then(cps => {
    //     this.campaigns = cps;
    //     if (cps.length > 0) {
    //       // if there is a code stored and is received, set it
    //       let gcc = this._globalStateService.currentCampaignCode;
    //       if (gcc && cps.find(cp => cp.code == gcc)) {
    //         this.campaignCode = gcc;
    //       } else {
    //         // In other case, use the first campaign received
    //         let index = cps.findIndex(cp=>cp.statusCode != pausedStatus);
    //             this.campaignCode = cps[index].code;
    //
    //       }
    //     }
    //   })
    //   .catch(error => this._userFeedbackService.handleError("Error retrieving campaigns", error));
    this._hkSubscription.startSubscription(this._globalStateService, () => this._popovers);

  }

  //put the current params saved on the service
  setParams(){
    this.isViewClButtonClicked = true;
    this.campaignCriteria = this.currentServiceParams.currentParams.clone();
    this._globalStateService.currentCampaignCode = this.currentServiceParams.currentParams.campaignCd;
    this.isShowArrow = true;
  }

  ngOnDestroy() {
    this._hkSubscription.endSubscritption();
  }


  showForm(value: boolean){
    this.isViewClButtonClicked = value;
  }

  // filterCodeToName(array: Array<any>,filterCode: string): string{
  //  return FilterFunctions.getName(array, filterCode);
  // }

  private viewCL() {
    this.campaignCriteria.campaignCd = this.campaignCode;
    this.currentServiceParams.currentParams = this.campaignCriteria.clone();
    this.isViewClButtonClicked = true;
    this.isShowArrow = true;
    this.onViewCL.emit(this.campaignCriteria);
  }

  private nextCall() {
    // Set the currenta campaign code
    this._globalStateService.currentCampaignCode = this.campaignCode;
    this.waitingResponse = true;
    // Ask for the next account
    this._dataService
      .getNextAccount(this._globalStateService.loggedAgent, this.campaignCode)
      .then(account => {
        // Redirect to the page
        this._route.navigate([PublicUrls.account.url, account.accountId, account.accountType, account.campaignRecordId]);
      })
      .catch(error => {
        console.log("error");
        this.waitingResponse = false;
        this._userFeedbackService.handleNotification(new UFNotification(0, "Error obtaining next call", UFSeverity.warn, error));
      });

    // this._dataService.subscribeCiscoEvents(this._globalStateService.loggedAgent);
  }

  private canShowViewCL() {
    return this._globalStateService.loggedAgentHasRoleCode(ROLE_STANDARD_CODES.CAMPAIGN_LIST_CONTENT_VIEWER);
  }

  private buttonDisabled() {
    return !this.campaigns || this.campaigns.length == 0 || this.waitingResponse || !this.campaignCode;
  }


  //don't need emit --> local changes
  private reset() {
    this.campaignCriteria.campaignCd = "";
    this.campaignCriteria.customerName = "";
    this.campaignCriteria.accountId = "";
    this.campaignCriteria.cifId = "";
    this.campaignCriteria.statusCd = "";
    this.campaignCriteria.statusCd = null;

  }

  hotkeys(event){
    if (this.campaignCode && event.keyCode == 113 /*F2*/) {
      this.nextCall();
    }
  }

}
