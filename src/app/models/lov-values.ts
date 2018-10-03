export class LovValue {
  private _id: number;
  private _lovId: number;
  private _valueCode: string;
  private _valueName: string;
  private _valueDescription: string;
  private _isActive: boolean;
  private _createdBy: string;
  private _createdDate: string;
  private _modifiedBy: string;
  private _modifiedDate: string;

  constructor(id?: number, lovId?: number, valueCode?: string, valueName?: string, valueDescription?: string, isActive?: boolean, createdBy?: string,
              createdDate?: string, modifiedBy?: string, modifiedDate?: string){

    this.id = id;
    this.lovId = lovId;
    this.valueCode = valueCode;
    this.valueName = valueName;
    this.valueDescription = valueDescription;
    this.isActive = isActive;
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

  get lovId(): number{
    return this._lovId;
  }

  set lovId(value: number){
    this._lovId = value;
  }

  get valueCode(): string{
    return this._valueCode;
  }

  set valueCode(value: string){
    this._valueCode = value;
  }

  get valueName(): string{
    return this._valueName;
  }

  set valueName(value: string){
    this._valueName = value;
  }

  get valueDescription(): string{
    return this._valueDescription;
  }

  set valueDescription(value: string){
    this._valueDescription = value;
  }

  get isActive(): boolean{
    return this._isActive;
  }

  set isActive(value: boolean){
    this._isActive = value;
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
