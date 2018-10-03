
import {CampaignAttribute} from "./campaign-attribute";

export const pausedStatus = "PAUSED";
export const inProgressStatus = "IN PROGRESS";

export class Campaign {
  private _id: number;
  private _userCode: string;
  private _code: string;
  private _name: string;
  private _pending: boolean;
  private _attributes: CampaignAttribute[] = null;
  private _statusCode: string;

  constructor(code?: string, name?:string, user?:string, pending?:boolean, attributes?:CampaignAttribute[], statusCode?:string) {
    this.userCode = user;
    this.code = code;
    this.name = name;
    this.hasPendingOperation = (pending == true);
    this.attributes = attributes;
    this.statusCode = statusCode;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get userCode(): string {
    return this._userCode;
  }

  set userCode(value: string) {
    this._userCode = value;
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

  get hasPendingOperation() {
    return this._pending;
  }

  set hasPendingOperation(value: boolean) {
    this._pending = value;
  }

  get attributes(): CampaignAttribute[] {
    return this._attributes;
  }

  set attributes(value:CampaignAttribute[]){
    this._attributes = value;
  }

  set statusCode(value: string){
    this._statusCode = value;
  }

  get statusCode(): string{
    return this._statusCode;
  }

  addAttribute(catt: CampaignAttribute) {
    if (this._attributes == null) {
      this._attributes = [];
    }
    this._attributes.push(catt);
  }

  resetAttributes() {
    this._attributes = [];
  }

  get plainAttributes(): string {
    if (this._attributes == null) {
      return "";
    }
    return this._attributes.reduce(((prev, att) => prev ? prev + ", " + att.name : att.name), null as string);
  }
}
