import {setString} from "./address";
import {VerificationStatus} from "./addressVerification";
import {Phone} from "./phone";

export class PhoneListVerification {
  private _phones: Phone[];
  private _newPhones: Phone[];
  private _note: string;
  private _status: VerificationStatus;
  private _createdBy: string;
  private _createdDate: Date;

  constructor(phones?: Phone[], newPhones?: Phone[], note?: string, status?: VerificationStatus, createdDate?: Date) {
    // Initializing the variables to empty array
    this._phones = [];
    this._newPhones = [];

    if (phones != null) {
      phones.forEach(p => {
        this._phones.push(p);
      });
    }
    if (newPhones != null) {
      newPhones.forEach(np => {
        this._newPhones.push(np);
      });
    }
    this._note = setString(note);
    if (status) this._status = status;
    if (createdDate) this._createdDate = createdDate;
  }

  get phones() {
    return this._phones;
  }

  set phones(phones: Phone[]) {
    this._phones = phones;
  }

  addPhone(phone: Phone) {
    // Adding it if is not repeated
    if (this._phones.indexOf(phone) === -1) {
      this._phones.push(phone);
    }
  }

  removePhone(phone: Phone) {
    let index = this._phones.indexOf(phone);
    if (index > -1) {
      this._phones.splice(index, 1);
    }
  }

  get newPhones() {
    return this._newPhones;
  }

  set newPhones(newPhones: Phone[]) {
    this._newPhones = newPhones;
  }

  addNewPhone(newPhone: Phone) {
    // Adding it if is not repeated
    if (this._newPhones.indexOf(newPhone) === -1) {
      this._newPhones.push(newPhone);
    }
  }

  removeNewPhone(newPhone: Phone) {
    let index = this._newPhones.indexOf(newPhone);
    if (index > -1) {
      this._newPhones.splice(index, 1);
    }
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
