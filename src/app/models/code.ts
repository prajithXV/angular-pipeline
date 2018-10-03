export const CampaignListCodeNew = "NEW";

export class Code {
  private _code: string;
  private _name: string;
  private _description: string;

  constructor (cd?: string, nm?: string, description?: string) {
    this.code = cd;
    this.name = nm;
    this.description = description;
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(){
    return this._description;
  }

  set description(value: string){
    this._description = value;
  }

}
