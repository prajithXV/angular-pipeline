export class CustomerConsent {
  private _id: number;
  private _customerId: string;
  private _phoneNumber: string;
  private _hasConsent: boolean;
  private _note: string;
  private _createdBy: string;
  private _createdDate: string;

  constructor(id?: number, customerId?:string, phoneNumber?: string, hasConsent?: boolean, note?:string, createdBy?: string, createdDate?: string){
    this.id = id;
    this.customerId = customerId;
    this.hasConsent = hasConsent;
    this.phoneNumber = phoneNumber;
    this.note = note;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
  }

  get id(): number{
    return this._id;
  }

  set id(value: number){
    this._id = value;
  }

  get customerId(): string{
    return this._customerId;
  }

  get phoneNumber():string{
    return this._phoneNumber;
  }

  set phoneNumber(value: string){
    this._phoneNumber = value;
  }

  set customerId(value: string){
    this._customerId = value;
  }

  get hasConsent(): boolean{
    return this._hasConsent;
  }

  set hasConsent(value: boolean){
    this._hasConsent = value;
  }

  get note(): string{
    return this._note;
  }

  set note(value: string){
    this._note = value;
  }

  get createdBy(): string{
    return this._createdBy;
  }

  set createdBy(value: string){
    this._createdBy = value;
  }

  get createdDate(): string{
    return this._createdDate;
  }

  set createdDate(value: string){
    this._createdDate = value;
  }

}
