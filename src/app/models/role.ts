export let ROLE_STANDARD_CODES = {
  CAMPAIGN_LIST_CONTENT_VIEWER: "CL_CONTENT_VIEWER",
  CREATE_TICKLER_CASE: "CREATE_TICKLER_CASE",
  TICKLER_AGENT: "TICKLER_AGENT",
  TICKLER_VIEW: "TICKLER_VIEW"
};

export class Role {
  private _id: number;
  private _code: string;
  private _name: string;
  private _description: string;
  private _createdBy: string;
  private _createdDate: string;


  constructor(id?:number, code?:string, name?:string, description?:string, createdBy?:string, createdDate?:string){
    this.id = id;
    this.code = code;
    this.name = name;
    this.description = description;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
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

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
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
}
