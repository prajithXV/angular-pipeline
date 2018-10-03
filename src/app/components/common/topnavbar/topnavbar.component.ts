import {Component, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {smoothlyMenu} from '../../../app.helpers';
import {GlobalStateService} from "../../../services/global-state.service";
import {Agent, AgentState, AgentStateCode, AgentStateReasonCode} from "../../../models/agent";
import {DataService} from "../../../services/data.service";
import {Call} from "../../../models/call";
import {TemporalStateServiceService
} from "../../../services/temporal-state-service.service";
import {PublicUrls} from "../../../routing-constants";
import { Location } from '@angular/common';

declare var jQuery: any;


@Component({
  selector: 'topnavbar',
  host: {'(window:keydown)': 'hotkeys($event)'},
  templateUrl: 'topnavbar.component.html'
})
export class TopNavbarComponent {
  search: string;
  agentState = AgentState;
  statusMenuOpened = false;
  changingState = false;
  showingSenteces = false;

  @ViewChild('modalSentences') private _sentecesModal: TemplateRef<any>;
  readySt: AgentState = new AgentState(AgentStateCode.ready);
  notReadySt: AgentState = new AgentState(AgentStateCode.not_ready, AgentStateReasonCode.not_ready);
  lunchSt: AgentState = new AgentState(AgentStateCode.not_ready, AgentStateReasonCode.lunch);
  meetingSt: AgentState = new AgentState(AgentStateCode.not_ready, AgentStateReasonCode.meeting);
  breakSt: AgentState = new AgentState(AgentStateCode.not_ready, AgentStateReasonCode.break_);
  administrativeSt: AgentState = new AgentState(AgentStateCode.not_ready, AgentStateReasonCode.administrative);
  states = [this.readySt, this.notReadySt, this.lunchSt, this.meetingSt, this.breakSt, this.administrativeSt];

  constructor(
    private _router: Router,
    private _globalStateService: GlobalStateService,
    private _dataService: DataService,
    // private _modalService: BsModalService,
    private _temporalStateService: TemporalStateServiceService,
  ) { }

  logout() {
    this._globalStateService.logout();
  }

  get currentCall() :Call {
    return this._globalStateService.currentCall;
  }


  get hasCurrentParams(): boolean{
    return this._temporalStateService.hasListInfo;
  }


  redirectToList(){
      if(this._temporalStateService.casesListInfoByAccount){
        this._router.navigate([this._temporalStateService.redirectTo,
          this._temporalStateService.casesListInfoByAccount.currentId, this._temporalStateService.casesListInfoByAccount.currentType,
          this._temporalStateService.casesListInfoByAccount.currentCampaignRecordId]);

      }else{
        this._router.navigate([this._temporalStateService.redirectTo]);

      }
  }

  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }

  loggedAgent(): Agent {
    return this._globalStateService.loggedAgent;
  }

  setState(state: AgentState) {
    this.changingState = true;
    this._globalStateService.setCurrentStatus(state).then(()=>this.changingState = false);
    this.statusMenuOpened = false;
  }

  openMenuStatus() {
    this.statusMenuOpened = true;
  }

  closeMenuStatus() {
    this.statusMenuOpened = false;
  }

  // modalRef: BsModalRef;
  // showSentencesModal(/* template: TemplateRef<any> */) {
  //   this.modalRef = this._modalService.show(this._sentecesModal);
  // }

  hotkeys(event){
    if (!event.shiftKey && !event.altKey && !event.ctrlKey) {
      let preventDefault = true;
      switch(event.keyCode) {
        case 119 /*F8*/: this.showingSenteces = !this.showingSenteces; break;
        // case 119 /*F8*/: this.showSentencesModal(); break;
        default: preventDefault = false;
      }
      if (preventDefault) {
        event.preventDefault();
      }
    }
  }

  closeSentences() {
    this.showingSenteces = false;
  }
}
