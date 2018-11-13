export class MemoNote {
  private _id: number;
  private _cifId: string;
  private _firstName: string;
  private _lastName: string;
  private _comName: string;
  private _accountId: string;
  private _accountType: string;
  private _note: string;
  private _createdBy: string;
  private _createdByFirstName: string;
  private _createdByLastName: string;
  private _createdDate: string;

  constructor(id?: number, cifId?: string, firstName?: string, lastName?: string, accountId?: string, accountType?: string, note?: string, createdBy?: string, createdByFirstName?: string, createdByLastName?: string, createdDate?: string, comName?: string) {
    this._id = id;
    this._cifId = cifId;
    this._firstName = firstName;
    this._lastName = lastName;
    this._accountId = accountId;
    this._accountType = accountType;
    this._note = note;
    this._createdBy = createdBy;
    this._createdByFirstName = createdByFirstName;
    this._createdByLastName = createdByLastName;
    this._createdDate = createdDate;
    this._comName = comName;
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

  get comName(): string {
    return this._comName;
  }

  set comName(value: string) {
    this._comName = value;
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

  get createdByFirstName(): string {
    return this._createdByFirstName;
  }

  set createdByFirstName(value: string) {
    this._createdByFirstName = value;
  }

  get createdByLastName(): string {
    return this._createdByLastName;
  }

  set createdByLastName(value: string) {
    this._createdByLastName = value;
  }

  get createdDate(): string {
    return this._createdDate;
  }

  set createdDate(value: string) {
    this._createdDate = value;
  }


  get completeCreatedByName() {
    let ret = this.createdByFirstName ? this.createdByFirstName : "";
    if (this.createdByLastName) {
      if (this.createdByFirstName) {
        ret += " ";
      }
      ret += this.createdByLastName;
    }
    return ret;
  }

  get completeCustomerName() {
    let ret = this.firstName ? this.firstName : "";
    if (this.lastName) {
      if (this.lastName) {
        ret += " ";
      }
      ret += this.lastName;
    }
    return ret.length ? ret : this.comName;
  }


}
