export class CancelCampaignCallRecordReason {
  private _id;
  private _code;
  private _name;
  private _description;


  constructor(id?: number, code?: string, name?: string,description?: string){
    this.id = id;
    this.code = code;
    this.name = name;
    this.description = description;
  }

  get id():number{
      return this._id;
  }

  set id(value:number){
    this._id = value;
  }

  get code():string{
    return this._code;
  }


  set code(value:string){
    this._code = value;
  }

  get name():string{
    return this._name;
  }

  set name(value:string){
    this._name = value;
  }

  get description():string{
    return this._description;
  }

  set description(value:string){
    this._description = value;
  }

}
