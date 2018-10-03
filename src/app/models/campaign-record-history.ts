export class CampaignRecordHistory {
  private _accountId;
  private _campaignListId;
  private _campaignName;
  private _createdDate;
  private _statusCode;
  private _cancelCode;
  private _modifiedDate;
  private _cancelName;
  private _cancelDescription;


  constructor(accountId?: string, campaignListId?: number, campaignName?: string, createdDate?:string, statusCode?: string, cancelCode?:string, modifiedDate?:string, cancelName?: string,
              cancelDescription?: string){

    this.accountId = accountId;
    this.campaignListId = campaignListId;
    this.campaignName = campaignName;
    this.createdDate = createdDate;
    this.statusCode = statusCode;
    this.cancelCode = cancelCode;
    this.modifiedDate = modifiedDate;
    this.cancelName = cancelName;
    this.cancelDescription = cancelDescription;


  }


  get accountId(): string{
    return this._accountId;
  }

  set accountId(value:string){
    this._accountId = value;
  }

  get campaignListId():number{
    return this._campaignListId;
  }

  set campaignListId(value:number){
    this._campaignListId = value;
  }

  get campaignName():string{
    return this._campaignName;
  }


  set campaignName(value:string){
    this._campaignName = value;
  }


  get createdDate():string{
    return this._createdDate;
  }


  set createdDate(value:string){
    this._createdDate = value;
  }


  get statusCode():string{
    return this._statusCode;
  }

  set statusCode(value:string){
    this._statusCode = value;
  }


  get cancelCode():string{
    return this._cancelCode;
  }


  set cancelCode(value:string){
    this._cancelCode = value;
  }

  get modifiedDate():string{
    return this._modifiedDate;
  }


  set modifiedDate(value:string){
    this._modifiedDate = value;
  }


  get cancelName():string{
    return this._cancelName;
  }


  set cancelName(value:string){
    this._cancelName = value;
  }


  get cancelDescription():string{
    return this._cancelDescription;
  }


  set cancelDescription(value:string){
    this._cancelDescription = value;
  }









}
