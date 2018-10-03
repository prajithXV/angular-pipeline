export class CampaignListAccount{
  private _campaignCode: string;
  private _campaignName: string;
  private _campaignRecordId: number;
  private _accountId: string;
  private _accountType: string;
  private _campaignFId: string;
  private _colStatusCode: string;
  private _ficoScore: string;
  private _interestDue: string;
  private _lastPayDate: string;
  private _lastPromiseDate: string;
  private _lastWorkDate: string;
  private _nextWorkDate: string;
  private _officerName: string;
  private _pastDueDays: string;
  private _callPriority: number;
  private _statusCode: string;
  private _lastCalledBy: string;
  private _lastCalledDate: string;
  private _eaPcFlag: string;
  private _nextCalledBy: string;
  private _nextCalledUser: string;
  private _customerName: string;

  constructor(campaignCode?: string, campaignName?: string, campaignRecordId?: number, accountId?: string, accountType?: string,
              campaignFId?: string, colStatusCode?: string, ficoScore?: string, interestDue?: string, lastPromiseDate?: string,
              lastWorkDate?: string, nextWorkDate?: string, officerName?: string, pastDueDays?: string, callPriority?: number,
              statusCode?: string, lastCalledBy?: string, lastCalledDate?: string, eaPcFlag?: string, nextCalledBy?: string,
              nextCalledUser?: string, customerName?: string, lastPayDate?:string){

    this.campaignCode = campaignCode;
    this.campaignName = campaignName;
    this.campaignRecordId = campaignRecordId;
    this.accountType = accountType;
    this.campaignFId = campaignFId;
    this.colStatusCode = colStatusCode;
    this.ficoScore = ficoScore;
    this.interestDue = interestDue;
    this.lastPromiseDate = lastPromiseDate;
    this.lastWorkDate = lastWorkDate;
    this.nextWorkDate = nextWorkDate;
    this.officerName = officerName;
    this.pastDueDays = pastDueDays;
    this.callPriority = callPriority;
    this.statusCode = statusCode;
    this.lastCalledBy = lastCalledBy;
    this.lastCalledDate = lastCalledDate;
    this.eaPcFlag = eaPcFlag;
    this.nextCalledBy = nextCalledBy;
    this.nextCalledUser = nextCalledUser;
    this.customerName = customerName;
    this.accountId = accountId;
    this.lastPayDate = lastPayDate;
  }



  get campaignCode():string{
    return this._campaignCode;
  }

  set campaignCode(value: string){
    this._campaignCode = value;
  }

  get campaignName():string{
    return this._campaignName;
  }

  set campaignName(value: string){
    this._campaignName = value;
  }


  get campaignRecordId():number{
    return this._campaignRecordId;
  }

  set campaignRecordId(value: number){
    this._campaignRecordId = value;
  }

  get accountId():string{
    return this._accountId;
  }

  set accountId(value:string){
    this._accountId = value;
  }

  get accountType():string{
    return this._accountType;
  }

  set accountType(value:string){
    this._accountType = value;
  }

  get campaignFId():string{
    return this._campaignFId;
  }


  set campaignFId(value:string){
    this._campaignFId = value;
  }


  get colStatusCode():string{
    return this._colStatusCode;
  }


  set colStatusCode(value:string){
    this._colStatusCode = value;
  }

  get ficoScore():string{
    return this._ficoScore;
  }


  set ficoScore(value:string){
    this._ficoScore = value;
  }


  get interestDue():string{
    return this._interestDue;
  }


  set interestDue(value:string){
    this._interestDue = value;
  }

  get lastPayDate():string{
    return this._lastPayDate;
  }


  set lastPayDate(value:string){
    this._lastPayDate = value;
  }

  get lastPromiseDate():string{
    return this._lastPromiseDate;
  }


  set lastPromiseDate(value:string){
    this._lastPromiseDate = value;
  }

  get lastWorkDate():string{
    return this._lastWorkDate;
  }


  set lastWorkDate(value:string){
    this._lastWorkDate = value;
  }


  get nextWorkDate():string{
    return this._nextWorkDate;
  }


  set nextWorkDate(value:string){
    this._nextWorkDate = value;
  }

  get officerName():string{
    return this._officerName;
  }


  set officerName(value:string){
    this._officerName = value;
  }

  get pastDueDays():string{
    return this._pastDueDays;
  }


  set pastDueDays(value:string){
    this._pastDueDays = value;
  }

  get callPriority():number{
    return this._callPriority;
  }


  set callPriority(value:number){
    this._callPriority = value;
  }


  get statusCode():string{
    return this._statusCode;
  }


  set statusCode(value:string){
    this._statusCode = value;
  }

  get lastCalledBy():string{
    return this._lastCalledBy;
  }


  set lastCalledBy(value:string){
    this._lastCalledBy = value;
  }

  get lastCalledDate():string{
    return this._lastCalledDate;
  }


  set lastCalledDate(value:string){
    this._lastCalledDate = value;
  }

  get eaPcFlag():string{
    return this._eaPcFlag;
  }

  set eaPcFlag(value: string){
    this._eaPcFlag = value;
  }

  get nextCalledBy():string{
    return this._nextCalledBy;
  }

  set nextCalledBy(value:string){
    this._nextCalledBy = value;
  }

  get nextCalledUser():string{
    return this._nextCalledUser;
  }

  set nextCalledUser(value:string){
    this._nextCalledUser = value;
  }


  get customerName():string{
    return this._customerName;
  }

  set customerName(value:string){
    this._customerName = value;
  }

}
