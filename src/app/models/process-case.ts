
export class ProcessCase {
  private _id: number;
  private _accountId: string;
  private _cifId: string;
  private _caseDescription: string;
  private _processCode: string;
  private _statusCode: string;
  private _followUpDueDate: string;
  private _createdBy: string;
  private _createdDate: string;
  private _assignedUser: string;
  private _assignedGroup: string;
  private _contactFirstName: string;
  private _contactLastName: string;
  private _lastTicklerName: string; //calculated field (tickler types)


  constructor(id?:number, accountId?:string, ciId?:string, caseDescription?:string, processCode?:string, statusCode?:string, followUpDueDate?:string,
              createdBy?:string, createdDate?:string, assignedUser?:string, assignedGroup?:string, lastTicklerName?: string){

    this.id = id;
    this.accountId = accountId;
    this.cifId = ciId;
    this.caseDescription = caseDescription;
    this.processCode = processCode;
    this.statusCode = statusCode;
    this.followUpDueDate = followUpDueDate;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.assignedUser = assignedUser;
    this.assignedGroup = assignedGroup;
    this.lastTicklerName = lastTicklerName;


  }

  get id():number{
    return this._id;
  }

  set id(value:number){
    this._id = value;
  }

  get accountId():string{
    return this._accountId;
  }

  set accountId(value:string){
    this._accountId = value;
  }


  get cifId():string{
    return this._cifId;
  }


  set cifId(value:string){
    this._cifId = value;
  }

  get caseDescription():string{
    return this._caseDescription;
  }

  set caseDescription(value:string){
    this._caseDescription = value;
  }

  get processCode():string {
    return this._processCode;
  }

  set processCode(value:string){
    this._processCode = value;
  }


  get statusCode():string{
    return this._statusCode;
  }

  set statusCode(value:string){
    this._statusCode = value;
  }


  get followUpDueDate():string{
    return this._followUpDueDate;
  }

  set followUpDueDate(value:string){
    this._followUpDueDate = value;
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

  get assignedUser():string{
    return this._assignedUser;
  }

  set assignedUser(value:string){
    this._assignedUser = value;
  }

  get assignedGroup():string{
    return this._assignedGroup;
  }

  set assignedGroup(value: string){
    this._assignedGroup = value;
  }

  get contactFirstName(): string {
    return this._contactFirstName;
  }

  set contactFirstName(value: string) {
    this._contactFirstName = value;
  }

  get contactLastName(): string {
    return this._contactLastName;
  }

  set contactLastName(value: string) {
    this._contactLastName = value;
  }

  get contactName() {
    return `${this.contactFirstName} ${this.contactLastName}`;
  }

  get lastTicklerName(): string{
    return this._lastTicklerName;
  }

  set lastTicklerName(value: string){
    this._lastTicklerName = value;
  }
}
