import {CampaignRecordHistory} from "../models/campaign-record-history";


export class CampaignListRecord {
  private _campaignCode: string;
  private _campaignNumber: string;
  private _accountId: string;
  private _callPriority: string;
  private _statusCode: string;
  private _lastCalledBy: string;
  private _lastCalledDate: string;
  private _nextCallDate: string;
  private _nextCallUser: string;
  private _recordHistory: CampaignRecordHistory[];
  private _orderByCode: string;

  constructor(campaignCode?: string, campaignNumber?: string, accountId?: string, callPriority?: string, statusCode?: string, lastCalledBy?: string,
              lastCalledDate?: string, nextCalledDate?: string, nextCallUser?: string, orderByCode?: string ){
    this.campaignCode = campaignCode;
    this.campaignNumber = campaignNumber;
    this.accountId = accountId;
    this.callPriority = callPriority;
    this.statusCode = statusCode;
    this.lastCalledBy = lastCalledBy;
    this.lastCalledDate = lastCalledDate;
    this.nextCallDate = nextCalledDate;
    this.nextCallUser = nextCallUser;
    this.orderByCode = orderByCode;
  }

  get campaignCode(): string {
    return this._campaignCode;
  }

  set campaignCode(value: string) {
    this._campaignCode = value;
  }

  get campaignNumber(): string {
    return this._campaignNumber;
  }

  set campaignNumber(value: string) {
    this._campaignNumber = value;
  }

  get accountId(): string {
    return this._accountId;
  }

  set accountId(value: string) {
    this._accountId = value;
  }

  get callPriority(): string {
    return this._callPriority;
  }

  set callPriority(value: string) {
    this._callPriority = value;
  }

  get statusCode(): string {
    return this._statusCode;
  }

  set statusCode(value: string) {
    this._statusCode = value;
  }

  get lastCalledBy(): string {
    return this._lastCalledBy;
  }

  set lastCalledBy(value: string) {
    this._lastCalledBy = value;
  }

  get lastCalledDate(): string {
    return this._lastCalledDate;
  }

  set lastCalledDate(value: string) {
    this._lastCalledDate = value;
  }

  get nextCallDate(): string {
    return this._nextCallDate;
  }

  set nextCallDate(value: string) {
    this._nextCallDate = value;
  }

  get nextCallUser(): string {
    return this._nextCallUser;
  }

  set nextCallUser(value: string) {
    this._nextCallUser = value;
  }


  get campaignRecordHistory(): CampaignRecordHistory[]{
    return this._recordHistory;
  }


  addCampaignRecordHistory(crh: CampaignRecordHistory){
    if(!this._recordHistory){
      this.resetCampaignRecordHistory();
    }
    this._recordHistory.push(crh);
  }


  resetCampaignRecordHistory(){
    this._recordHistory = [];
  }

  get orderByCode():string{
    return this._orderByCode;
  }

  set orderByCode(value: string){
    this._orderByCode = value;
  }

}
