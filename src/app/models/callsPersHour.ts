export class CallsPersHour {
  private _campaignCode;
  private _hour;
  private _average;
  private _total;
  private _agentsCount;

  constructor(campaignCode?: string, hour?: number,average?: number,total?:number,agentsCount?:number){
    this.campaignCode = campaignCode;
    this.hour = hour;
    this.average = average;
    this.total = total;
    this.agentsCount = agentsCount;
  }
  get campaignCode():string{
      return this._campaignCode;
  }

  set campaignCode(value:string){
    this._campaignCode = value;
  }

  get hour():number{
    return this._hour;
  }


  set hour(value:number){
    this._hour = value;
  }

  get average():number{
    return this._average;
  }

  set average(value:number){
    this._average = value;
  }

  get total():number{
    return this._total;
  }

  set total(value:number){
    this._total = value;
  }

  get agentsCount():number{
    return this._agentsCount;
  }

  set agentsCount(value:number){
    this._agentsCount = value;
  }


}
