import {Attribute, AttributeType} from "./attribute";

export class TicklerAttribute extends Attribute {
  private _attributeDescription: string;
  private _activeFlag: boolean;
  private _mandatoryFlag: boolean;
  private _createdBy: string;
  private _createdDate: string;
  private _modifiedBy: string;
  private _modifiedDate: string;
  private _lovCode: string;

  constructor(id?: number, attributeCode?: string, attributeName?: string, attributeDescription?: string, dataType?: AttributeType,
              arrayFlag?: boolean, activeFlag?:boolean, mandatoryFlag?: boolean, createdBy?: string, createdDate?: string, modifiedBy?: string,
              modifiedDate?: string, lovCode?:string){

    super(id, attributeCode, attributeName, dataType, arrayFlag);
    this.attributeDescription = attributeDescription;
    this.activeFlag = activeFlag;
    this.mandatoryFlag = mandatoryFlag;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.modifiedBy = modifiedBy;
    this.modifiedDate = modifiedDate;
    this.lovCode = lovCode;
  }

  get attributeDescription(): string{
    return this._attributeDescription;
  }

  set attributeDescription(value: string){
    this._attributeDescription = value;
  }

  get activeFlag(): boolean {
    return this._activeFlag;
  }

  set activeFlag(value: boolean){
    this._activeFlag = value;
  }

  get mandatoryFlag(): boolean{
    return this._mandatoryFlag;
  }

  set mandatoryFlag(value: boolean){
    this._mandatoryFlag = value;
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


  get lovCode(): string{
    return this._lovCode;
  }

  set lovCode(value: string){
    this._lovCode = value;
  }

}












