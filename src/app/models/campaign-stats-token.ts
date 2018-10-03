export class CampaignStatsToken {
  private _campaignCode: string;
  // TODO: enum
  private _statusCode: string;
  private _count: number;


  constructor(campaignCode?: string, statusCode?:string, count?:number){
    this.campaignCode = campaignCode;
    this.statusCode = statusCode;
    this.count = count;
  }

  get campaignCode(): string {
    return this._campaignCode;
  }

  set campaignCode(value: string) {
    this._campaignCode = value;
  }

  get statusCode(): string {
    return this._statusCode;
  }

  set statusCode(value: string) {
    this._statusCode = value;
  }

  get count(): number {
    return this._count;
  }

  set count(value: number) {
    this._count = value;
  }
}
