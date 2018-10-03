import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SearchCampaignCriteriaParams} from "../../models/search-campaign-criteria-params";
import {AccountListInfo, CampaignListInfo, CasesListInfo} from "../../services/temporal-state-service.service";
import {NgbTabChangeEvent} from "@ng-bootstrap/ng-bootstrap/tabset/tabset";
import {NgbTabset} from "@ng-bootstrap/ng-bootstrap";
import {SearchAccountCriteriaParams} from "../../models/search-account-criteria-params";
import {NextCallComponent} from "../next-call/next-call.component";
import {TicklerProcess} from "../../models/tickler-processes";
import {ROLE_STANDARD_CODES} from "../../models/role";
import {GlobalStateService} from "../../services/global-state.service";
import {Code} from "../../models/code";
import {Campaign} from "../../models/campaign";

@Component({
  selector: 'full-search',
  templateUrl: './full-search.component.html',
  styleUrls: ['./full-search.component.css']
})
export class FullSearchComponent implements OnInit {

  @Output() onViewCL = new EventEmitter<SearchCampaignCriteriaParams>();
  @Output() onTab = new EventEmitter<NgbTabChangeEvent>();
  @Output() onSearch = new EventEmitter<SearchAccountCriteriaParams>();
  @Output() onSearchProcess = new EventEmitter<any>();

  @Input() currentServiceParams: CampaignListInfo = new CampaignListInfo();
  @Input() currentCasesServiceParams: CasesListInfo = new CasesListInfo();
  @Input() currentAccountServiceParams: AccountListInfo = new AccountListInfo();
  @Input() processes: TicklerProcess[] = null;
  @Input() campaignCode: string = '';
  @Input() campaigns: Campaign[] = null;
  @Input() statuses: Code[] = null;
  @Input() processStatuses: Code[] = null;
  @Input() followUpDues: Code[] = null;

  @ViewChild("tab") private _tab: NgbTabset;
  @ViewChild("nextCall") private _nextCall: NextCallComponent;


  constructor(private _globalStateService: GlobalStateService) { }

  ngOnInit() {

  }

  onClickViewCl(event){
    this.onViewCL.emit(event);
  }


  onTabChange(event){
    this.onTab.emit(event);
  }

  onClickSearch(event){
    this.onSearch.emit(event);
  }


  onClickSearchProcessCases(event){
    this.onSearchProcess.emit(event);
  }

  get currentTab(): NgbTabset{
    return this._tab;
  }

  // get campaigns(){
  //   return this._nextCall.nextCallCampaigns;
  // }
  //
  // get statuses(){
  //   return this._nextCall.nextCallStatus;
  // }

  private canShowTicklerProcesses() {
    return this._globalStateService.loggedAgentHasRoleCode(ROLE_STANDARD_CODES.TICKLER_AGENT);
  }


}
