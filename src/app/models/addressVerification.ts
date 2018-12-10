import {Address, setString} from "./address";

export enum VerificationStatus {
  Verified = "VERIFIED",
  Modify = "MODIFY"
}

export class AddressVerification {
  private _oldAddress: Address;
  private _newAddress: Address;
  private _note: string;
  private _status: VerificationStatus;
  private _createdBy: string;
  private _createdDate: Date;

  constructor(oldAddress?: Address, newAddress?: Address, note?: string, status?: VerificationStatus, createdDate?: Date) {
    if (oldAddress) this._oldAddress = oldAddress;
    if (newAddress) this._newAddress = newAddress;
    this._note = setString(note);
    if (status) this._status = status;
    if (createdDate) this._createdDate = createdDate;
  }

  get oldAddress(): Address {
    return this._oldAddress;
  }

  set oldAddress(value: Address) {
    this._oldAddress = value;
  }

  get newAddress(): Address {
    return this._newAddress;
  }

  set newAddress(value: Address) {
    this._newAddress = value;
  }

  get note(): string {
    return this._note;
  }

  set note(value: string) {
    this._note = setString(value);
  }

  get status(): VerificationStatus {
    return this._status;
  }

  set status(value: VerificationStatus) {
    this._status = value;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  set createdBy(value: string) {
    this._createdBy = value;
  }

  get createdDate(): Date {
    return this._createdDate;
  }

  set createdDate(value: Date) {
    this._createdDate = value;
  }
}
