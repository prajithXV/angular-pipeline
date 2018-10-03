export class CustomerNote {
  private _customerId: string;
  private _accountId: string;
  private _accountType: string;
  private _message: string;
  private _startDate: string;
  private _endDate: string;
  private _msgCategory: string;
  private _msgType: string;


  constructor(customerId?: string, accountId?: string, accountType?: string, message?: string, startDate?: string, endDate?: string, msgCategory?: string,
              msgType?: string){

    this.customerId = customerId;
    this.accountId = accountId;
    this.accountType = accountType;
    this.message = message;
    this.startDate = startDate;
    this.endDate = endDate;
    this.msgCategory = msgCategory;
    this.msgType = msgType;
  }

  get customerId(): string {
    return this._customerId;
  }

  set customerId(value: string) {
    this._customerId = value;
  }

  get accountId(): string {
    return this._accountId;
  }

  set accountId(value: string) {
    this._accountId = value;
  }

  get accountType(): string {
    return this._accountType;
  }

  set accountType(value: string) {
    this._accountType = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get startDate(): string {
    return this._startDate;
  }

  set startDate(value: string) {
    this._startDate = value;
  }

  get endDate(): string {
    return this._endDate;
  }

  set endDate(value: string) {
    this._endDate = value;
  }

  get msgCategory(): string {
    return this._msgCategory;
  }

  set msgCategory(value: string) {
    this._msgCategory = value;
  }

  get msgType(): string {
    return this._msgType;
  }

  set msgType(value: string) {
    this._msgType = value;
  }
}
