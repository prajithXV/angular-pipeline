export enum PhoneType {
  Home = "Home Phone",
  Business = "Business Phone",
  CellularHome = "Home Cell Phone"
}

export enum LineType {
  LandLine = "P",
  Cellular = "C"
}

export class Phone {
  private _number: string;
  private _type: PhoneType;
  private _lineType: LineType;
  private _typeDescription: string;
  private _phoneLineTypeCode: string;
  private _callsMadeToday: number;
  private _deleted: boolean;

  constructor(number?: string, type?: PhoneType, lineType?: LineType, typeDescription?: string, phoneLineTypeCode?: string, callsMadeToday?: number){
    this.number = number;
    this.type = type ? type : null;
    this.lineType = lineType ? lineType : null;
    this.typeDescription = typeDescription;
    this.phoneLineTypeCode = phoneLineTypeCode;

    this._deleted = false;
  }

  get number(): string {
    return this._number;
  }

  set number(value: string) {
    this._number = value;
  }

  get type(): PhoneType {
    return this._type;
  }

  set type(value: PhoneType) {
    this._type = value;
  }

  get lineType(): LineType {
    return this._lineType;
  }

  set lineType(value: LineType) {
    this._lineType = value;
  }

  isLandline(): boolean {
    return this.lineType == LineType.LandLine;
  }

  get typeDescription(): string {
    return this._typeDescription;
  }

  set typeDescription(value: string) {
    this._typeDescription = value;
  }

  get phoneLineTypeCode(): string {
    return this._phoneLineTypeCode;
  }

  set phoneLineTypeCode(value: string) {
    this._phoneLineTypeCode = value;
  }

  get callsMadeToday(): number{
    return this._callsMadeToday;
  }

  set callsMadeToday(value: number){
    this._callsMadeToday = value;
  }

  get isDeleted() {
    return this._deleted;
  }

  set isDeleted(value: boolean) {
    this._deleted = value;
  }

  deletePhone() {
    this._deleted = true;
  }

  isDirty(phone: Phone) {
    return (this.number != phone.number || this.lineType != phone.lineType || this.type != phone.type || this.isDeleted);
  }

  clone(): Phone {
    return new Phone(this.number, this.type, this.lineType, this.typeDescription, this.phoneLineTypeCode, this.callsMadeToday);
  }
}
