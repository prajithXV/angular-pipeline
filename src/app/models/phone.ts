const landLineType = "P";

export enum PhoneType {
  Home,
  Business,
  CellularHome,
  Unknown
}

export enum LineType {
  LandLine,
  Cellular,
  Unknown
}

export class Phone {
  private _number: string;
  private _type: PhoneType;
  private _lineType: LineType;
  private _typeDescription: string;
  // This is the code retrieved from JackHenry
  private _phoneLineTypeCode: string;
  private _callsMadeToday: number;

  constructor(number?: string, type?: PhoneType, lineType?: LineType, typeDescription?: string, phoneLineTypeCode?: string, callsMadeToday?: number){
    this.number = number;
    this.type = type;
    this.lineType = lineType;
    this.typeDescription = typeDescription;
    this.phoneLineTypeCode = phoneLineTypeCode;
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
    // return true;
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
}
