export class TicklerProcess {

  private _id;
  private _processCode;
  private _processName;
  private _createdBy;
  private _createdDate;


  constructor(id?:number, processCode?:string, processName?:string, createdBy?:string, createdDate?:string ){
    this.id = id;
    this.processCode = processCode;
    this.processName = processName;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
  }

  get id():number{
    return this._id;
  }

  set id(value:number){
    this._id = value;
  }

  get processCode():string{
    return this._processCode;
  }

  set processCode(value:string){
    this._processCode = value;
  }

  get processName():string{
    return this._processName;
  }

  set processName(value:string){
    this._processName = value;
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

}
