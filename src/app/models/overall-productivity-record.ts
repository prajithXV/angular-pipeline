export class OverallProductivityRecord {
  private _campaignName: string;
  private _total: number;
  private _contact: number;
  private _paymentReceived: number;
  private _promises: number;
  private _contactPercentage: number;
  private _promiseToContactPercentage: number;

  constructor(campaignName?:string, total?:number, contact?:number, paymentReceived?:number, promises?:number, contactPercentage?:number,
              promiseToContactPercentage?:number){

    this.campaignName = campaignName;
    this.total = total;
    this.contact = contact;
    this.paymentReceived = paymentReceived;
    this.promises = promises;
    this.contactPercentage = contactPercentage;
    this.promiseToContactPercentage = promiseToContactPercentage;

  }

  get campaignName(): string {
    return this._campaignName;
  }

  set campaignName(value: string) {
    this._campaignName = value;
  }

  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
  }

  get contact(): number {
    return this._contact;
  }

  set contact(value: number) {
    this._contact = value;
  }

  get paymentReceived(): number {
    return this._paymentReceived;
  }

  set paymentReceived(value: number) {
    this._paymentReceived = value;
  }

  get promises(): number {
    return this._promises;
  }

  set promises(value: number) {
    this._promises = value;
  }

  get contactPercentage(): number {
    return this._contactPercentage;
  }

  set contactPercentage(value: number) {
    this._contactPercentage = value;
  }

  get promiseToContactPercentage(): number {
    return this._promiseToContactPercentage;
  }

  set promiseToContactPercentage(value: number) {
    this._promiseToContactPercentage = value;
  }
}
