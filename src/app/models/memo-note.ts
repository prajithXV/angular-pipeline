export class MemoNote {
  private _id: number;
  private _cifId: string;
  private _accountId: string;
  private _accountType: string;
  private _note: string;
  private _createdBy: string;
  private _createdDate: string;
  private _customerName: string;
  private _firstName: string;
  private _lastName: string;
  constructor(id?: number, cifId?: string, accountId?: string, accountType?: string, note?: string, createdBy?: string, createdDate?: string, customerName?: string) {
    this._id = id;
    this._cifId = cifId;
    this._accountId = accountId;
    this._accountType = accountType;
    this._note = note;
    this._createdBy = createdBy;
    this._createdDate = createdDate;
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

  get customerName(): string {
    return this._customerName;
  }

  set customerName(value: string) {
    this._customerName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }
  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
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

}
