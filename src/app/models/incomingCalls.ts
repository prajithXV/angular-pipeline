export class IncomingCalls {
  private _hour;
  private _total;

  constructor(hour?: number, total?: number){
    this.hour = hour;
    this.total = total;
  }

  get hour():number{
    return this._hour;
  }

  set hour(value:number){
   this._hour = value;
  }

  get total():number{
    return this._total;
  }

  set total(value:number){
    this._total = value;
  }

}
