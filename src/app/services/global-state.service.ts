import {Injectable} from '@angular/core';
import {Agent, AgentState, AgentStateCode, AgentStateReasonCode} from "../models/agent";
import {DataService} from "./data.service";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";

import "rxjs/add/observable/interval";
import {Subject} from "rxjs/Subject";
import {Call, CallState} from "../models/call";
import {Phone} from "../models/phone";
import {UFNotification, UserFeedbackService} from "./user-feedback.service";
import {UFSeverity} from "./ufseverity";
import {Router} from "@angular/router";
import {PublicUrls} from "../routing-constants";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ConfigurableConstants} from "../../environments/common-constants";

declare let coin_cisco_polling_timeout: number;
// var coin_cisco_inbound_polling = true; // change to false to disable inbound polling
// declare let coin_cisco_inbound_polling: boolean;

export enum GSSErrorCodes {
  bad_credentials = 0
}

@Injectable()
export class GlobalStateService {
  private _loggedAgent: Agent = null;
  private _currentCall: Call = null;
  private _lastCall: Call = null; // Last call received. Is the same as _currentCall or the last one if the currentCall is finished
  private _lastCallUsed: boolean = false; // Last call used to record call?
  private _endedCallId: string = null;
  // private _pollingTimeout: number;
  private _currentCampaignCode: string = null;
  private _showHotkeyPopovers: boolean = false;
  private _hotkeyPopoversObservable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._showHotkeyPopovers);

  private _states: Observable<AgentState> = null;
  private _calls: Observable<Call> = null;

  constructor(private _dataService: DataService,
              private _userFeedbackService: UserFeedbackService,
              private _router: Router) {

    // If there is a coin_cisco_polling_tiemout defined, use it
    // this._pollingTimeout = typeof coin_cisco_polling_timeout == 'undefined' ? environment.stateSubscriptionTimeout : coin_cisco_polling_timeout;
    // console.log("Timeout: " + this._pollingTimeout);
    // console.log("Inbound polling: " + this._inboundPolling);
    // Get finesse streams and suscribe
    let str = this._dataService.getFinesseStreams();
    this._states = str.states;
    this._states.subscribe(st => {
      try {
        if (this.loggedAgent) {
          this.loggedAgent.state = st;
          // Workaround for calls not ending properly:
          // If I receive some agent states, I end the call immediatly (if any)
          if (st.state == AgentStateCode.ready || st.state == AgentStateCode.work_ready) {
            if (this._lastCall) {
              if (!this._lastCall.talkEnd) {
                this._lastCall.talkEnd = new Date();
              }
              this._endedCallId = this._currentCall.ciscoId;
              this._currentCall = null;
            }
          }
        }
      } catch (e) {
        console.log("Error processing state in globalStateService");
        console.log(e);
      }
    });
    this._calls = str.calls;
    this._calls.subscribe(call => {
      try {
        // When we receive the dropped status, the call is ended
        this.updateCurrentCall(call);

      } catch (e) {
        console.log("Error processing call in globalStateService");
        console.log(e);
      }
    });
  }

  private updateCurrentCall(call: Call) {
    // Workaround: if I receive a message from the call I ended, I just ignore it
    if (call.ciscoId == this._endedCallId) {
      return;
    }
    // It's a new call
    if (!this._currentCall || this._currentCall.ciscoId != call.ciscoId) {
      this._endedCallId = null;
      this._lastCallUsed = false;
      this._currentCall = call.clone();
      if (this._currentCall.state == CallState.Speaking) {
        this._currentCall.talkStart = new Date(); // TODO: date showld be taken from call
      }
      this._lastCall = this._currentCall;
      return;
    }
    // Existing current call
    if (this._currentCall.state != CallState.Speaking && call.state == CallState.Speaking) {
      this._currentCall.talkStart = new Date(); // TODO: date showld be taken from call
    } else if (this._currentCall.state == CallState.Speaking && call.state != CallState.Speaking) {
      this._currentCall.talkEnd = new Date(); // TODO: date showld be taken from call
    }
    this._currentCall.state = call.state;
    this._currentCall.from = call.from;
    this._currentCall.to = call.to;
    if (call.state == CallState.Dropped) {
      // The current call is dropped, but I keep last call with all the data
      this._currentCall = null;
    }
  }

  private useExceptionCredentials(extension) {
    return environment.ciscoOneExtension || extension == environment.ciscoExtension;
  }

  login(login: string, pwd: string, ciscoUser: string, extension: string): Promise<Agent> {
    return this._dataService.login(login, pwd)
      .then(ag => {
        this._loggedAgent = ag;
        // Put cisco credentials header and extension
        if (extension.trim() != "") {
          ag.ciscoUser = this.useExceptionCredentials(extension) ? extension : ciscoUser;
          // ag.ciscoUser = "215194";
          ag.ciscoExtension = extension;
        }
        ag.setCiscoCredentials(
          this.useExceptionCredentials(extension) ? environment.ciscoUser : ciscoUser,
          this.useExceptionCredentials(extension) ? environment.ciscoPassword : extension
          // "215194", "215194"
        );

        // Login to cisco and suscribe to events
        this.ciscoLogin(this.useExceptionCredentials(extension) ? environment.ciscoPassword : extension);
        return ag;
      })
      .catch(err => {
        return new Promise<Agent>((res, rej) => rej(GSSErrorCodes.bad_credentials));
      });
  }

  logout() {
    // Logout from finesse
    this._dataService.logoutFinesse(this.loggedAgent);
    // Reset logged agent
    this._loggedAgent = null;
    // Redirect to login page
    this._router.navigate([PublicUrls.login.url]);
  }

  private ciscoLogin(pwd: string) {
    this._dataService.loginFinesse(this.loggedAgent, pwd)
      .then(res => {
        this._userFeedbackService.handleNotification(new UFNotification(0, "Logged in Finesse", UFSeverity.info));
        // Get agent state to refresh the ui
        this._dataService.getCurrentState(this.loggedAgent).then(st => this._loggedAgent.state = st);
      })
      // TODO: check how errors work now
      .catch(error => {
        let msg = "Error accessing CISCO API's";
        if (error.status == 401) {
          msg = "CISCO authorization failure";
        }
        this._userFeedbackService.handleNotification(new UFNotification(0, msg, UFSeverity.error, error));
      });
  }

  get loggedAgent(): Agent {
    return this._loggedAgent;
  }

  loggedAgentHasRoleCode(code: string): boolean {
    return this._loggedAgent.hasRoleCode(code);
  }

  setCurrentStatus(status: AgentState): Promise<AgentState> {
    if (!this.loggedAgent) {
      return new Promise<AgentState>(succ => succ(null));
    }
    return this._dataService.setCurrentStatus(this.loggedAgent, status).then(sts => {
      return sts;
    });
  }

  goToReady() {
    if (!this.loggedAgent) {
      return new Promise<AgentState>(succ => succ(null));
    }
    return this.setCurrentStatus(new AgentState(AgentStateCode.ready));
  }

  callTo(phone: Phone) {
    // If current state is != than Work, first we have to change state
    if (this.loggedAgent.state.state != AgentStateCode.work) {
      this._dataService.setCurrentStatus(this.loggedAgent, new AgentState(AgentStateCode.not_ready, AgentStateReasonCode.not_ready));
      setTimeout(() => this._dataService.makeCall(this._loggedAgent, phone), 500);
    } else {
      this._dataService.makeCall(this._loggedAgent, phone); //.then(res => {res});
    }
  }

  hangUp() {
    if (!this.currentCall) {
      return;
    }
    this._dataService.endCall(this.currentCall, this._loggedAgent);
  }

  pickUp() {
    if (!this.currentCall) {
      return;
    }
    this._dataService.answerCall(this.currentCall, this._loggedAgent);
  }

  get currentCall(): Call {
    return this._currentCall;
  }

  get lastCall(): Call {
    return this._lastCall;
  }

  get isLastCallUsed():boolean {
    return this._lastCallUsed;
  }

  setLastCallUsed() {
    this._lastCallUsed = true;
  }

  get currentCampaignCode(): string {
    return this._currentCampaignCode;
  }

  set currentCampaignCode(value: string) {
    this._currentCampaignCode = value;
  }

  get hotkeyObservable(): Observable<boolean> {
    return this._hotkeyPopoversObservable;
  }

  toggleHotkeyPopoversVisibility() {
    this._showHotkeyPopovers = !this._showHotkeyPopovers;
    this._hotkeyPopoversObservable.next(this._showHotkeyPopovers);
    // If transitioned to true, create a timeout to cancel
    if (this._showHotkeyPopovers) {
      setTimeout(() => {
        if (this._showHotkeyPopovers) {
          this.toggleHotkeyPopoversVisibility();
        }
      }, ConfigurableConstants.hotkeyShowTimeout);
    }
  }
}
