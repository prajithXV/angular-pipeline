

export const callLater = "Call later";

export class CallRecord {
  private _customerId: string;
  private _callNote: string;
  private _nextWorkDate: string;
  private _promisedAmount: number;
  private _promisedDate: string;
  private _contacted: string;
  private _action: string;
  private _result: string;
  private _createdDate: string;
  private _createdBy: string;
  private _firstName: string;
  private _lastName: string;
  private _accountNumber: string;
  private _accountType: string;


  constructor(customerId?: string, callNote?: string, nextWorkDate?: string, promisedAmount?: number, promisedDate?: string, contacted?: string,
              action?: string, result?: string, createdDate?: string, createdBy?: string, firstName?: string, lastName?: string, accountNumber?: string,
              accountType?: string){

    this.customerId = customerId;
    this.callNote = callNote;
    this.nextWorkDate = nextWorkDate;
    this.promisedAmount = promisedAmount;
    this.promisedDate = promisedDate;
    this.contacted = contacted;
    this.action = action;
    this.result = result;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.firstName = firstName;
    this.lastName = lastName;
    this.accountNumber = accountNumber;
    this.accountType = accountType;
  }

  get customerId(): string {
    return this._customerId;
  }

  set customerId(value: string) {
    this._customerId = value;
  }

  get callNote(): string {
    return this._callNote;
  }

  set callNote(value: string) {
    this._callNote = value;
  }

  get nextWorkDate(): string {
    return this._nextWorkDate;
  }

  set nextWorkDate(value: string) {
    this._nextWorkDate = value;
  }

  get promisedAmount(): number {
    return this._promisedAmount;
  }

  set promisedAmount(value: number) {
    this._promisedAmount = value;
  }

  get promisedDate(): string {
    return this._promisedDate;
  }

  set promisedDate(value: string) {
    this._promisedDate = value;
  }

  get contacted(): string {
    return this._contacted;
  }

  set contacted(value: string) {
    this._contacted = value;
  }

  get action(): string {
    return this._action;
  }

  set action(value: string) {
    this._action = value;
  }

  get result(): string {
    return this._result;
  }

  set result(value: string) {
    this._result = value;
  }

  get createdDate(): string {
    return this._createdDate;
  }

  set createdDate(value: string) {
    this._createdDate = value;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  set createdBy(value: string) {
    this._createdBy = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get completeName() {
    let ret = "";
    if (this.firstName) {
      ret += this.firstName;
    }
    if (this.firstName != "" && this.lastName != "") {
      ret += ' ';
    }
    if (this.lastName) {
      ret += this.lastName;
    }
    if (ret == "") {
      ret = this.createdBy;
    }
    return ret;
  }


  get accountNumber(){
    return this._accountNumber;
  }

  set accountNumber(value: string){
    this._accountNumber = value;
  }

  get accountType(){
    return this._accountType;
  }

  set accountType(value: string){
    this._accountType = value;
  }

}
