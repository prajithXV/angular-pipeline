export enum AttributeType {
  string = 0,
  number = 1,
  date = 2,
  datetime = 3,
  lov = 4,
  unknown = 5
}

export class Attribute {
  private _id: number;
  private _code: string;
  private _name: string;
  private _type: AttributeType;
  private _isArray: boolean;

  constructor(id?:number, code?:string, name?:string, type?:AttributeType, isArray?:boolean){
    this.id = id;
    this.code = code;
    this.name = name;
    this.type = type;
    this.isArray = isArray;

  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get type(): AttributeType {
    return this._type;
  }

  set type(value: AttributeType) {
    this._type = value;
  }

  get typeString(): string {
    switch (this.type) {
      case AttributeType.string: return "string";
      case AttributeType.number: return "number";
      case AttributeType.date: return "date";
      case AttributeType.datetime: return "date and time";
      case AttributeType.lov: return "list of values";
    }
    return "unknown";
  }

  get isArray(): boolean {
    return this._isArray;
  }

  set isArray(value: boolean) {
    this._isArray = value;
  }
}
