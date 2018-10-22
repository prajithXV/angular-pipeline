import {Customer} from "./customer";

export class MemoNote {
  private _id: number;
  private _cifId: string;
  private _accountId: string;
  private _accountType: string;
  private _note: string;
  private _createdBy: string;
  private _createdDate: string;
  private _customerName: string; //calculate

  constructor(cif?, account?, accountType?, note?, createdBy?, createdData?,customerName?) {
    this.cifId = cif;
    this.accountId = account;
    this.accountType = accountType;
    this.note = note;
    this.createdBy = createdBy;
    this.createdDate = createdData;
    this.customerName = customerName;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
  get cifId(): string {
    return this._cifId;
  }

  set cifId(value: string) {
    this._cifId = value;
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
  get note(): string {
    return this._note;
  }

  set note(value: string) {
    this._note = value;
  }
  get createdBy(): string {
    return this._createdBy;
  }

  set createdBy(value: string) {
    this._createdBy = value;
  }

  get createdDate(): string {
    return this._createdDate;
  }

  set createdDate(value: string) {
    this._createdDate = value;
  }

  get customerName(){
    return this._customerName;
  }

  set customerName(value: string){
    this._customerName = value;
  }

}
