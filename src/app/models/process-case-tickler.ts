import {CampaignListAttribute} from "./campaign-list-attribute";

export class ProcessCaseTickler {

  private _id;
  private _caseId;
  private _ticklerName;
  private _ticklerTypeCode;
  private _ticklerDescription;
  private _createdBy;
  private _createdDate;
  private _attributes: CampaignListAttribute[] = null;

  constructor(id?:number, caseId?:number, ticklerName?: string,ticklerTypeCode?:string, ticklerDescription?:string, createdBy?:string, createdDate?:string,  attributes?: CampaignListAttribute[]){
    this.id = id;
    this.caseId = caseId;
    this.ticklerName = ticklerName;
    this.ticklerTypeCode = ticklerTypeCode;
    this.ticklerDescription = ticklerDescription;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.attributes = attributes;
  }

  get id():number{
    return this._id;
  }

  set id(value:number){
    this._id = value;
  }

  get caseId():number{
    return this._caseId;
  }

  set caseId(value:number){
    this._caseId = value;
  }

  get ticklerName(): string{
    return this._ticklerName;
  }

  set ticklerName(value: string){
    this._ticklerName = value;
  }

  get ticklerTypeCode():string{
    return this._ticklerTypeCode;
  }

  set ticklerTypeCode(value:string){
    this._ticklerTypeCode = value;
  }

  get ticklerDescription():string{
    return this._ticklerDescription;
  }

  set ticklerDescription(value:string){
    this._ticklerDescription = value;
  }

  get createdBy():string{
    return this._createdBy;
  }

  set createdBy(value:string){
    this._createdBy = value;
  }

  get createdDate():string{
    return this._createdDate;
  }

  set createdDate(value:string){
    this._createdDate = value;
  }

  get attributes(): CampaignListAttribute[] {
    return this._attributes;
  }

  set attributes(value:CampaignListAttribute[]){
    this._attributes = value;
  }

  addAttribute(catt: CampaignListAttribute) {
    if (this._attributes == null) {
      this._attributes = [];
    }
    this._attributes.push(catt);
  }

  resetAttributes() {
    this._attributes = [];
  }





}
