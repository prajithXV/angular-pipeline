export class TicklerTypeMap {
  private _id; //numb
  private _ticklerFromId;
  private _ticklerFromName;
  private _ticklerToId; //numb
  private _ticklerToCode;
  private _ticklerToName;
  private _activeFlag;
  private _createdBy;
  private _createdDate;
  private _modifiedBy;
  private _modifiedDate;

  constructor(id?: number, ticklerFromId?: number, ticklerFromName?: string, ticklerToId?: number, ticklerToCode?: string, ticklerToName?: string, activeflag?: string, createdBy?: string,
              createdDate?: string, modifiedBy?: string, modifiedDate?: string){

    this.id = id;
    this.ticklerFromId = ticklerFromId;
    this.ticklerFromName = ticklerFromName;
    this.ticklerToId = ticklerToId;
    this.ticklerToCode = ticklerToCode;
    this.ticklerToName = ticklerToName;
    this.activeFlag = activeflag;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.modifiedBy = modifiedBy;
    this.modifiedDate = modifiedDate;

  }

  get id():number{
    return this._id;
  }

  set id(value: number){
    this._id = value;
  }

  get ticklerFromId():number{
    return this._ticklerFromId;
  }

  set ticklerFromId(value: number){
    this._ticklerFromId = value;
  }

  get ticklerFromName():string{
    return this._ticklerFromName;
  }

  set ticklerFromName(value: string){
    this._ticklerFromName = value;
  }

  get ticklerToId():number{
    return this._ticklerToId;
  }

  set ticklerToId(value: number){
    this._ticklerToId = value;
  }

  get ticklerToCode():string{
    return this._ticklerToCode;
  }

  set ticklerToCode(value: string){
    this._ticklerToCode = value;
  }

  get ticklerToName():string{
    return this._ticklerToName;
  }

  set ticklerToName(value: string){
    this._ticklerToName = value;
  }

  get activeFlag():string{
    return this._activeFlag;
  }

  set activeFlag(value: string){
    this._activeFlag = value;
  }

  get createdBy():string{
    return this._createdBy;
  }

  set createdBy(value: string){
    this._createdBy = value;
  }

  get createdDate():string{
    return this._createdDate;
  }

  set createdDate(value: string){
    this._createdDate = value;
  }

  get modifiedBy():string{
    return this._modifiedBy;
  }

  set modifiedBy(value: string){
    this._modifiedBy = value;
  }

  get modifiedDate():string{
    return this._modifiedDate;
  }

  set modifiedDate(value: string){
    this._modifiedDate = value;
  }

}
