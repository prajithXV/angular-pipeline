import {AttributeType} from "./attribute";

export class LovType {
  private _id: number;
  private _lovCode: string;
  private _lovName: string;
  private _lovDescription: string;
  private _isActive: boolean;
  private _type: AttributeType;
  private _isDynamic: boolean;
  private _createdBy: string;
  private _createdDate: string;
  private _modifiedBy: string;
  private _modifiedDate: string;

  constructor(id?:number, lovCode?: string, lovName?: string, lovDescription?: string, isActive?: boolean, type?: AttributeType, isDynamic?: boolean, createdBy?: string,
              createdDate?: string, modifiedBy?: string, modifiedDate?: string){
    this.id = id;
    this.lovCode = lovCode;
    this.lovName = lovName;
    this.lovDescription = lovDescription;
    this.isActive = isActive;
    this.type = type;
    this.isDynamic = isDynamic;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.modifiedBy = modifiedBy;
    this.modifiedDate = modifiedDate;
  }

  get id(): number{
    return this._id;
  }

  set id(value: number){
    this._id = value;
  }

  get lovCode(): string{
    return this._lovCode;
  }

  set lovCode(value: string){
    this._lovCode = value;
  }

  get lovName(): string{
    return this._lovName;
  }

  set lovName(value: string){
    this._lovName = value;
  }

  get lovDescription(): string{
    return this._lovDescription;
  }

  set lovDescription(value: string){
    this._lovDescription = value;
  }

  get isActive(): boolean{
    return this._isActive;
  }

  set isActive(value: boolean){
    this._isActive = value;
  }

  get type(): AttributeType{
    return this._type;
  }

  set type(value: AttributeType){
    this._type = value;
  }

  get isDynamic(): boolean{
    return this._isDynamic;
  }

  set isDynamic(value: boolean){
    this._isDynamic = value;
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

  get modifiedBy(): string{
    return this._modifiedBy;
  }

  set modifiedBy(value: string){
    this._modifiedBy = value;
  }

  get modifiedDate(): string{
    return this._modifiedDate;
  }

  set modifiedDate(value: string){
    this._modifiedDate = value;
  }

}
