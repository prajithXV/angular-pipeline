import {Phone} from "./phone";

export enum CallType {
  Outbound = 0,
  Inbound = 1
}

export enum CallState {
  Initiating = 0,
  Alerting = 1,
  Speaking = 2,
  Wrapping_up = 3,
  Calling = 4,
  Dropped = 5,
  Unknown = 6
}

export class Call {
  private _ciscoId: string;
  private _from: string;
  private _to: string;
  private _type: CallType;
  private _state: CallState = CallState.Unknown;
  private _talkStart: Date = null;
  private _talkEnd: Date = null;
  private _phoneType: string; // TODO: How is it managed?

  get ciscoId(): string {
    return this._ciscoId;
  }

  set ciscoId(value: string) {
    this._ciscoId = value;
  }

  get from(): string {
    return this._from;
  }

  set from(value: string) {
    this._from = value;
  }

  get to(): string {
    return this._to;
  }

  set to(value: string) {
    this._to = value;
  }

  get type(): CallType {
    return this._type;
  }

  set type(value: CallType) {
    this._type = value;
  }

  get state(): CallState {
    return this._state;
  }

  set state(value: CallState) {
    this._state = value;
  }

  get myNumber() {
    return this.type == CallType.Inbound ? this.to : this.from;
  }

  get counterpartNumber() {
    return this.type == CallType.Inbound ? this.from : this.to;
  }

  get talkStart(): Date {
    return this._talkStart;
  }

  set talkStart(value: Date) {
    this._talkStart = value;
  }

  get talkEnd(): Date {
    return this._talkEnd;
  }

  set talkEnd(value: Date) {
    this._talkEnd = value;
  }

  get phoneType(): string {
    return this._phoneType;
  }

  set phoneType(value: string) {
    this._phoneType = value;
  }

  clone(): Call {
    let ret: Call = new Call();
    ret.ciscoId = this.ciscoId;
    ret.from = this.from;
    ret.to = this.to;
    ret.type = this.type;
    ret.state = this.state;
    ret.talkStart = this.talkStart;
    ret.talkEnd = this.talkEnd;
    ret.phoneType = this.phoneType;
    return ret;
  }
}
