export class TicklerType {

  private _id: number;
  private _ticklerCode: string;
  private _ticklerName: string;
  private _ticklerDescription: string;
  private _activeFlag: boolean;
  private _processId: number;
  private _followUpDays: number;
  private _actionRequiredFlag: boolean;
  private _isCore: boolean;
  private _isBase: boolean;
  private _isCloseable: boolean = false;
  private _orderByCode: number;
  private _createdBy: string;
  private _createdDate: string;
  private _modifiedBy: string;
  private _modifiedDate: string;

  constructor(id?: number, ticklerCode?:string, ticklerName?:string, ticklerDescription?:string, activeFlag?:boolean, processId?:number,
              followUpDays?: number, actionRequiredFlag?:boolean, isCore?:boolean, isBase?: boolean, isCloseable?:boolean, orderByCode?: number ,createdBy?:string, createdDate?:string, modifiedBy?:string, modifiedDate?:string){
    this.id = id;
    this.ticklerCode = ticklerCode;
    this.ticklerName = ticklerName;
    this.ticklerDescription = ticklerDescription;
    this.activeFlag = activeFlag;
    this.isBase = isBase;
    this.isCore = isCore;
    this.orderByCode = orderByCode;
    this.isCloseable = isCloseable;
    this.processId = processId;
    this.followUpDays = followUpDays;
    this.actionRequiredFlag = actionRequiredFlag;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.modifiedBy = modifiedBy;
    this.modifiedDate = modifiedDate;
  }

  get id():number{
    return this._id;
  }

  set id(value:number){
    this._id = value;
  }

  get ticklerCode():string{
    return this._ticklerCode;
  }

  set ticklerCode(value:string){
    this._ticklerCode = value;
  }


  get ticklerName():string{
   return this._ticklerName;
  }


  set ticklerName(value:string){
    this._ticklerName = value;
  }

  get ticklerDescription():string{
    return this._ticklerDescription;
  }

  set ticklerDescription(value:string){
    this._ticklerDescription = value;
  }

  get activeFlag(): boolean{
    return this._activeFlag;
  }

  set activeFlag(value: boolean){
    this._activeFlag = value;
  }

  get processId():number{
    return this._processId;
  }

  set processId(value: number){
    this._processId = value;
  }

  get followUpDays(): number{
    return this._followUpDays;
  }

  set followUpDays(value: number){
    this._followUpDays = value;
  }

  get actionRequiredFlag(): boolean{
    return this._actionRequiredFlag;
  }

  set actionRequiredFlag(value: boolean){
    this._actionRequiredFlag = value;
  }

  get isCore():boolean{
    return this._isCore;
  }

  set isCore(value: boolean){
    this._isCore = value;
  }

  get isBase(): boolean{
    return this._isBase;
  }

  set isBase(value: boolean){
    this._isBase = value;
  }

  get isCloseable():boolean{
    return this._isCloseable;
  }

  set isCloseable(value: boolean){
    this._isCloseable = value;
  }


  get orderByCode(){
    return this._orderByCode;
  }

  set orderByCode(value: number){
    this._orderByCode = value;
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
