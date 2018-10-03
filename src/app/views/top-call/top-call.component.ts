import { Component, OnInit } from '@angular/core';
import {Call, CallState, CallType} from "../../models/call";
import {GlobalStateService} from "../../services/global-state.service";
import {Router} from "@angular/router";
import {PublicUrls} from "../../routing-constants";
import {AccountListInfo, TemporalStateServiceService} from "../../services/temporal-state-service.service";
import {SearchAccountCriteriaParams} from "../../models/search-account-criteria-params";

@Component({
  selector: 'top-call',
  templateUrl: './top-call.component.html',
  styleUrls: ['./top-call.component.css']
})
export class TopCallComponent implements OnInit {

  private count: number = 0;


  constructor(private _globalStateService: GlobalStateService,
              private _router: Router, private _temporalStateService: TemporalStateServiceService) { }




  get currentCall():Call {
    return this._globalStateService.currentCall
  }

  get currentCounter(): number{
    return this._temporalStateService.currentCounter;
  }

  set currentCounter(value: number){
    this._temporalStateService.currentCounter = value;
  }

  ngOnInit() {
  }

  isOutboundCall(): boolean {
    return this.currentCall && this.currentCall.type == CallType.Outbound;
  }

  isAlerting(): boolean {
    return this.currentCall && this.currentCall.state == CallState.Alerting;
  }

  isSpeaking(): boolean {
    return this.currentCall && this.currentCall.state == CallState.Speaking;
  }

  isWrapUp(): boolean {
    return this.currentCall && this.currentCall.state == CallState.Wrapping_up;
  }

  isCalling(): boolean {
    return this.currentCall && this.currentCall.state == CallState.Calling;
  }

  hangUp() {
    this._globalStateService.hangUp();
  }

  pickUp() {
    this._globalStateService.pickUp();
  }

  goSearch() {
    this._temporalStateService.accountListInfo = new AccountListInfo();
    this._temporalStateService.accountListInfo.currentParams = new SearchAccountCriteriaParams();
    this._temporalStateService.accountListInfo.currentParams.phoneNumber = this.currentCall.from;
    this._router.navigate([PublicUrls.main.url, this.currentCounter]);
    this.currentCounter++;
  }

}
