import {Campaign} from "./campaign";
import {Role} from "./role";

export enum AgentStateCode {
  unknown = 0,
  logout = 1,
  ready = 2,
  not_ready = 3,
  work = 4,
  work_ready = 5,
  hold = 6,
  talking = 7,
  reserved = 8,
  login = 9
}

export enum AgentStateReasonCode {
  // These values are CISCO codes. Do not change them
  unknown = 0,
  not_ready = 45,
  lunch = 48,
  meeting = 49,
  break_= 47,
  administrative = 50
}

export class AgentState {
  private _state: AgentStateCode = null;
  private _reason: AgentStateReasonCode = null;
  private _originalState: string;
  private _originalReason: string;

  constructor(state?: AgentStateCode, reason?: AgentStateReasonCode) {
    this.state = state;
    this.reason = reason;
  }

  get state(): AgentStateCode {
    return this._state;
  }

  set state(value: AgentStateCode) {
    this._state = value;
  }

  get reason(): AgentStateReasonCode {
    return this._reason;
  }

  set reason(value: AgentStateReasonCode) {
    this._reason = value;
  }

  get originalState(): string {
    return this._originalState;
  }

  set originalState(value: string) {
    this._originalState = value;
  }

  get originalReason(): string {
    return this._originalReason;
  }

  set originalReason(value: string) {
    this._originalReason = value;
  }
}

export class Agent {
  private _account: string;
  private _firstName: string;
  private _lastName: string;
  private _lastLogin: string;
  private _isUser: boolean;
  private _isManager: boolean;
  private _isSupervisor: boolean;
  private _isAdmin: boolean;

  private _state: AgentState = null;
  private _ciscoUser: string = null;
  private _ciscoExtension: string = null;
  private _ciscoAuthenticationToken: string = null;

  private _campaigns: Campaign [] = null;
  private _roleCodes: string[] = null;

  constructor(account?:string, firstName?:string, isAdmin?:boolean, isUser?:boolean, isManager?:boolean, isSupervisor?:boolean, lastLogin?:string,
              lastName?:string) {
    this.account = account;
    this.state = new AgentState();
    this.firstName = firstName;
    this.isAdmin = isAdmin;
    this.isUser = isUser;
    this.isManager = isManager;
    this.isSupervisor = isSupervisor;
    this.lastLogin = lastLogin;
    this.lastName = lastName
  }

  get account(): string {return this._account;}
  set account(account: string) {this._account = account;}

  get state(): AgentState {return this._state;}
  set state(value: AgentState) {this._state = value;}

  get ciscoUser(): string {return this._ciscoUser;}
  set ciscoUser(value: string) {this._ciscoUser = value;}

  get ciscoExtension(): string {return this._ciscoExtension;}
  set ciscoExtension(value: string) {this._ciscoExtension = value;}

  get ciscoAuthenticationToken() {return this._ciscoAuthenticationToken;}
  setCiscoCredentials(usr: string, pwd: string) {
    this._ciscoAuthenticationToken = btoa(usr + ":" + pwd);
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get lastLogin(): string {
    return this._lastLogin;
  }

  set lastLogin(value: string) {
    this._lastLogin = value;
  }

  get isUser(): boolean {
    return this._isUser;
  }

  set isUser(value: boolean) {
    this._isUser = value;
  }

  get isManager(): boolean {
    return this._isManager;
  }

  set isManager(value: boolean) {
    this._isManager = value;
  }

  get isSupervisor(): boolean {
    return this._isSupervisor;
  }

  set isSupervisor(value: boolean) {
    this._isSupervisor = value;
  }

  get isAdmin(): boolean {
    return this._isAdmin;
  }

  set isAdmin(value: boolean) {
    this._isAdmin = value;
  }

  get completeName() {
    let ret = this.firstName ? this.firstName : "";
    if (this.lastName) {
      if (this.firstName) {
        ret += " ";
      }
      ret += this.lastName;
    }
    return ret;
  }

  resetCampaigns() {
    this._campaigns = [];
  }

  addCampaign(cp: Campaign): Campaign {
    if (!this.campaigns) {
      this.resetCampaigns();
    }
    let mycp = this.getCampaign(cp);
    if (mycp == null) {
      mycp = new Campaign(cp.code, cp.name, this.account, cp.hasPendingOperation);
      this._campaigns.push(mycp);
    }
    return mycp;
  }

  removeCampaign(cp: Campaign) {
    if (!this.campaigns) {
      return false;
    }
    let ind = this.campaignIndex(cp);
    if (ind > -1) {
      this._campaigns.splice(ind, 1);
    }
  }

  hasCampaign(cp: Campaign): boolean {
    if (!this._campaigns) {
      return null;
    }
    return this.campaignIndex(cp) > -1;
  }

  get campaigns(): Campaign[] {
    return this._campaigns;
  }

  getCampaign(cp: Campaign): Campaign {
    if (!this.campaigns) {
      return null;
    }
    let ind = this.campaignIndex(cp);
    return ind == -1 ? null : this._campaigns[ind];
  }

  get roleCodes() {
    return this._roleCodes;
  }

  resetRoleCodes() {
    this._roleCodes = [];
  }

  addRoleCode(code: string) {
    if (!this.roleCodes) {
      this.resetRoleCodes();
    }
    if (!this.hasRoleCode(code)) {
      this._roleCodes.push(code);
    }
  }

  removeRoleCode(code: string) {
    if (!this.roleCodes) {
      return;
    }
    let ind = this._roleCodes.indexOf(code);
    this._roleCodes.splice(ind, 1);
  }

  hasRoleCode(code: string) {
    if (!this._roleCodes) {
      return null;
    }
    return this.roleIndex(code) > -1;
  }

  hasRole(role: Role) {
    return this.hasRoleCode(role.code);
  }

  private roleIndex(code: string) {
    return this.roleCodes.indexOf(code);
  }

  private campaignIndex(cp: Campaign): number {
    for (let i in this.campaigns) {
      if (this.campaigns[i].code == cp.code) {
        return +i;
      }
    }
    return -1;
  }
}
