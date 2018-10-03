export class ContactPercentage {
  private _campaignCode: string;
  private _contactPcercentage:number;
  private _hour:number;

  constructor(campaignCode?: string, contactPercentage?: number, hour?: number){
    this.campaignCode = campaignCode;
    this.ContactPercentage = contactPercentage;
    this.hour = hour;
  }

  get campaignCode():string{
    return this._campaignCode;
  }

  set campaignCode(value: string){
    this._campaignCode = value;
  }


  get ContactPercentage():number{
    return this._contactPcercentage;
  }

  set ContactPercentage(value:number){
   this._contactPcercentage = value;
  }

  get hour():number{
    return this._hour;
  }

  set hour(value:number){
    this._hour = value;
  }

}
