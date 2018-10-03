import {Attribute, AttributeType} from "./attribute";

export class TicklerAttributeMap extends Attribute {
  private _ticklerTypeId: number;
  private _attributeTypeId: number;
  private _createdBy: string;
  private _createdDate: string;
  private _ticklerCode: string;
  private _ticklerName: string;
  private _mandatoryFlag:boolean;

  constructor(id?: number, ticklerTypeId?: number, attributeTypeId?: number, creatdBy?: string, createdDate?: string, ticklerCode?: string,
              ticklerName?: string, attributeCode?: string, attributeName?: string, dataType?: AttributeType, arrayFlag?: boolean, mandatoryFlag?:boolean){

    super(id, attributeCode, attributeName, dataType, arrayFlag);
    this.id = id;
    this.ticklerTypeId = ticklerTypeId;
    this.attributeTypeId = attributeTypeId;
    this.createdBy = creatdBy;
    this.createdDate = createdDate;
    this.ticklerCode = ticklerCode;
    this.ticklerName = ticklerName;
    this.mandatoryFlag = mandatoryFlag;
  }


  get ticklerTypeId(): number{
    return this._ticklerTypeId;
  }

  set ticklerTypeId(value: number){
    this._ticklerTypeId = value;
  }

  get attributeTypeId(): number{
    return this._attributeTypeId;
  }

  set attributeTypeId(value: number){
    this._attributeTypeId = value;
  }

  get createdBy(): string{
    return this._createdBy;
  }

  set createdBy(value: string){
    this._createdBy = value;
  }

  get createdDate(): string{
    return this._createdDate;
  }

  set createdDate(value: string){
    this._createdDate = value;
  }

  get ticklerCode(): string{
    return this._ticklerCode;
  }

  set ticklerCode(value: string){
    this._ticklerCode = value;
  }

  get ticklerName(): string{
    return this._ticklerName;
  }

  set ticklerName(value: string){
    this._ticklerName = value;
  }


  get mandatoryFlag(): boolean{
    return this._mandatoryFlag;
  }

  set mandatoryFlag(value: boolean){
    this._mandatoryFlag = value;
  }


}
