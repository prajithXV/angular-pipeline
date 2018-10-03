export class SortOrder {
  private _isDesc: boolean;
  private _sortType: string;

  constructor(isDesc?:boolean, sortType?: string){
    this.isDesc = isDesc;
    this.sortType = sortType;
  }

  get isDesc(){
    return this._isDesc;
  }

  set isDesc(value: boolean){
    this._isDesc = value;
  }

  get sortType(){
    return this._sortType;
  }

  set sortType(value: string){
    this._sortType = value;
  }

}
