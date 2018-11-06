import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {AgentState, AgentStateCode, AgentStateReasonCode} from "../models/agent";
import {Call, CallType, CallState} from "app/models/call";
import {Parser} from "xml2js";
import {Observable} from 'rxjs/Observable';
import {Subject} from "rxjs/Subject";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

declare let jabberwerx: any;

const urls = {
  general: {
    authKey: "Authorization",
    contentKey: "Content-Type",
    contentValue: "application/xml",
    authPrefix: "Basic ",
    tsIEKey: "tsIE",
    prefix: "/finesse/api/"
  },
  user: {
    url: "User"
  },
  userDialogs: {
    url: "Dialogs"
  },
  dialog: {
    url: "Dialog"
  },
  subscription: {
    url: "/http-bind/",
    port: 7443
  }
};

const agentStatuses = [
  {cisco: "UNKNOWN", coin: AgentStateCode.unknown},
  {cisco: "LOGOUT", coin: AgentStateCode.logout},
  {cisco: "READY", coin: AgentStateCode.ready},
  {cisco: "NOT_READY", coin: AgentStateCode.not_ready},
  {cisco: "WORK", coin: AgentStateCode.work},
  {cisco: "WORK_READY", coin: AgentStateCode.work_ready},
  {cisco: "HOLD", coin: AgentStateCode.hold},
  {cisco: "TALKING", coin: AgentStateCode.talking},
  {cisco: "RESERVED", coin: AgentStateCode.reserved},
  {cisco: "LOGIN", coin: AgentStateCode.login}
];

const agentReasons = [
  {cisco: "NOT_RDY", coin: AgentStateReasonCode.not_ready},
  {cisco: "Lunch", coin: AgentStateReasonCode.lunch},
  {cisco: "Meeting", coin: AgentStateReasonCode.meeting},
  {cisco: "Break", coin: AgentStateReasonCode.break_},
  {cisco: "Administrative", coin: AgentStateReasonCode.administrative}
];

const callTypes = [
  {cisco: "OTHER_IN", coin: CallType.Inbound},
  {cisco: "OUT", coin: CallType.Outbound},
  {cisco: "AGENT_INSIDE", coin: CallType.Outbound},
  {cisco: "ACD_IN,", coin: CallType.Inbound}
];

const callStatuses = {
  alerting: "ALERTING",
  active: "ACTIVE",
  wrap_up: "WRAP_UP",
  initiated: "INITIATED",
  initiating: "INITIATING",
  dropped: "DROPPED"
};

@Injectable()
export class CiscoCommsService {
  private _stateObserver: Subject<AgentState> = new Subject<AgentState>();
  private _callObserver: Subject<Call> = new Subject<Call>();
  private _debugObserver: Subject<string> = new Subject<string>();
  private _extension: string = null;
  private _jwClient: any = null;


  constructor(private _http: HttpClient) {
    console.log("Cisco comm service created");
  }

  getState(userId: string, tokenAuth: string): Promise<AgentState> {
    // Set query params
    let options = {
      headers: CiscoCommsService.getHeaderWithAuth(tokenAuth),
      params: CiscoCommsService.getParamsWithIETimestamp()
    };

    console.log("Going to ask for state");
    // Get the data
    return this._http.get(CiscoCommsService.getUserUrl(userId), {...options, responseType: 'text'})
      .toPromise()
      .then(resp => {
        console.log("Going to ask for state THEN");
        let parser = new Parser();
        let ret = new AgentState();
        try {
          parser.parseString(resp, (err, result) => {
            ret = this.extractState(result['User']);
          });
        } catch (error) {
          console.log("Error on Cisco getDialogs message: ");
          console.log(resp);
          console.log(error);
        }
        return ret;
      })
      .catch(this.handleError);
  }

  login(
    boschUser: string,
    boschPassword: string,
    extension: string,
    token: string
  ): Promise<boolean> {
    this._extension = extension;

    return this.boschSubscribe(boschUser, boschPassword, extension, token);
  }

  logout(user: string, extension: string, token: string) {
    this._extension = null;
    this.setStatus(user, extension, new AgentState(AgentStateCode.logout), token);
    // TODO: is bosch unsuscription needed?
  }

  getDataStreams(): {states: Observable<AgentState>, calls: Observable<Call>, debug: Observable<string>} {
    return {
      calls: this._callObserver,
      states: this._stateObserver,
      debug: this._debugObserver
    };
  }

  private boschSubscribe(boschUser: string, boschPassword: string, extension:string, token: string): Promise<boolean> {
    let success = null;
    let reject = null;

    let ret = new Promise<boolean>((succ, rej) => {success = succ; reject = rej;});

    // If we are already connected, simply set the state to login
    if (this._jwClient) {
      this.sendLoginState(boschUser, extension, token, success, reject);
      return ret;
    }

    //Construct JID with username and domain.
    let jid = `${boschUser}@${environment.ciscoDomain}`;

    //Create JabbwerWerx object.
    this._jwClient = new jabberwerx.Client("coin");

    //Arguments to feed into the JabberWerx client on creation.
    let jwArgs = {
      //Defines the BOSH path. Should match the path pattern in the proxy
      //so that it knows where to forward the BOSH request to.
      httpBindingURL: "/http-bind",
      //Calls this function callback on successful BOSH connection by the
      //JabberWerx library.
      errorCallback: () => {
        // TODO: Error
        console.log("Connection error");
        reject(false);
      },
      successCallback: () => {
        console.log("Connection to finesse succeeded");
        this.sendLoginState(boschUser, extension, token, success, reject);
      }
    };

    jabberwerx._config.unsecureAllowed = true;

    //Bind invoker function to any events that is received. Only invoke
    //handler if XMPP message is in the specified structure.
    this._jwClient.event("messageReceived").bindWhen(
      "event[xmlns='http://jabber.org/protocol/pubsub#event'] items item notification",
      (data) => {
        console.log("Event received");
        let fsd = data.selected.firstChild.data;
        if (this._debugObserver) {
          // console.log(fsd);
          this._debugObserver.next(fsd);
        }
        this.processEvent(fsd);
      });
    this._jwClient.event("clientStatusChanged").bind(function (evt) {
      if (evt.data.next == jabberwerx.Client.status_connected) {
        // attempt to login the agent
        console.log("***** Connected");
      } else if (evt.data.next == jabberwerx.Client.status_disconnected) {
        console.log("***** Disconnected");
        this._jwClient = null;
      }
    });

    //Connect to BOSH connection.
    this._jwClient.connect(jid, boschPassword, jwArgs);

    return ret;
  }

  private sendLoginState(
    boschUser: string,
    extension:string,
    token: string,
    success: (value?: boolean | PromiseLike<boolean>) => void,
    reject: (reason?: any) => void
  ) {
    this.setStatus(boschUser, extension, new AgentState(AgentStateCode.login), token)
    .then(as => {
      success(true);
      console.log("Logged in finesse");
    })
    .catch(e => reject(false));
}

  protected processEvent(resp: string) {
    let parser = new Parser();

    try {
      parser.parseString(resp, (err, result) => {
        // Check if it's a user event
        if (result['Update']['data'][0]['user']){
          console.log("It's a state change");
          let as: AgentState =  this.extractState(result['Update']['data'][0]['user'][0]);
          this._stateObserver.next(as);

        // Check if it's a dialogs event
      } else if (result['Update']['data'][0]['dialogs']) {
        console.log("It's a dialogs Dialog");
        let call: Call = this.extractCall(result['Update']['data'][0]['dialogs'][0]['Dialog'][0], this._extension);
        this._callObserver.next(call);
      } else if (result['Update']['data'][0]['dialog']) {
        console.log("It's a dialog");
        let call: Call = this.extractCall(result['Update']['data'][0]['dialog'][0], this._extension);
        this._callObserver.next(call);
      } else {
          console.log("Unknown event");
        }
      });
    } catch (error) {
      console.log("Error on Cisco event: ");
      console.log(resp);
      console.log(error);
    }
  }

  private extractState(xml): AgentState {
    let ret = new AgentState();
    let state = null;
    let reason = null;
    // Get the state and reason
    state = xml['state'][0];
    // Get the reason
    if (xml['reasonCode']) {
      reason = xml['reasonCode'][0]['label'][0];
    }

    ret.originalState = state;
    ret.originalReason = reason;
    let cs = agentStatuses.find(st => st.cisco == state);
    ret.state = cs ? cs.coin : AgentStateCode.unknown;
    if (reason && reason != "") {
      let rc = agentReasons.find(r => r.cisco == reason);
      ret.reason = rc ? rc.coin : AgentStateReasonCode.unknown;
    }

    return ret;
  }

  setStatus(userId: string, extension: string, status: AgentState, tokenAuth: string): Promise<AgentState> {
    // Set query params
    let options = {
      headers: CiscoCommsService.getHeaderWithAuth(tokenAuth).set("Content-type", "application/xml")
    };
    options.headers.set(urls.general.contentKey, urls.general.contentValue);
    let body = `<User><state>${agentStatuses.find(s => s.coin == status.state).cisco}</state>`;
    if (status.reason != null) {
      body += `<reasonCodeId>${agentReasons.find(r => r.coin == status.reason).coin}</reasonCodeId>`;
    }
    if (status.state == AgentStateCode.login) {
      body += `<extension>${extension}</extension>`;
    }
    body += "</User>";
    console.log(body);

    return this._http.put(CiscoCommsService.getUserUrl(userId), body, {...options, responseType: 'text'})
      .toPromise()
      .then(resp => {
        console.log(resp);
        return status;
      })
      .catch(this.handleError);
  }

  makeCall(userId: string, from: string, to: string, tokenAuth: string): Promise<boolean> {
    // If we are in single extension, use allways the same target
    if (environment.ciscoChangeTargetNumber) {
      to = environment.ciscoTargetNumber;
    }
    // Must precede number with 91
    to = environment.ciscoDialPrefix + to;

    // Set query params
    let options = {
      headers: CiscoCommsService.getHeaderWithAuth(tokenAuth).set("Content-type", "application/xml")
    };
    options.headers.set(urls.general.contentKey, urls.general.contentValue);
    let body = "<Dialog>";
    body += "<requestedAction>MAKE_CALL</requestedAction>";
    body += `<fromAddress>${from}</fromAddress>`;
    body += `<toAddress>${to}</toAddress>`;
    body += "</Dialog>";
    console.log(body);

    return this._http.post(CiscoCommsService.getUserDialogsUrl(userId), body, {...options, responseType: 'text'})
      .toPromise()
      .then(resp => {
        console.log(resp);
        return true;
      })
      .catch(this.handleError);
  }

  endCall(fromExtension: string, callId: string, tokenAuth: string): Promise<boolean> {
    return this.actOnCall(fromExtension, callId, tokenAuth, "DROP");
  }

  answerCall(fromExtension: string, callId: string, tokenAuth: string): Promise<boolean> {
    return this.actOnCall(fromExtension, callId, tokenAuth, "ANSWER");
  }

  getCurrentCall(userId: string, extension: string, tokenAuth: string): Promise<Call> {
    // Set query params
    let options = {
      headers: CiscoCommsService.getHeaderWithAuth(tokenAuth),
      params: CiscoCommsService.getParamsWithIETimestamp()
    };

    // Get the data
    return this._http.get(CiscoCommsService.getUserDialogsUrl(userId), {...options, responseType: 'text'})
      .toPromise()
      .then(resp => {
        if (resp.toString() == "<Dialogs/>") {
          return null;
        }

        let call = new Call();
        let parser = new Parser();
        try {
          parser.parseString(resp.toString(), (err, result) => {
            call = this.extractCall(result['Dialogs']['Dialog'][0], extension);
          });
        } catch (error) {
          console.log("Error on Cisco getDialogs message: ");
          console.log(resp.toString());
          console.log(error);
        }

        console.log(call);
        return call;
      })
      .catch(this.handleError);
  }

  extractCall(result, extension): Call {
    console.log("======");
    let call: Call = new Call();
    call.ciscoId = result['id'][0];
    call.from = result['fromAddress'][0];
    if (result['toAddress']) {
      call.to = result['toAddress'][0];
    } else {
      call.to = "<<no number>>";
    }
    let type = result['mediaProperties'][0]['callType'][0];
    let ct = callTypes.find(ct => ct.cisco == type);
    console.log("Type: " + type);
    // If we don't find the type, we use Inbound
    call.type = ct ? ct.coin : CallType.Inbound;
    // Set state
    let state = result['state'];
    console.log('State: ' + state);
    if (state == callStatuses.alerting) {
      call.state = CallState.Alerting;
    } else if (state == callStatuses.initiated) {
      // Must check agent state
      let partState = this.getParticipantState(result, extension);
      call.state = partState == callStatuses.dropped ? CallState.Dropped : CallState.Calling;
    } else if (state == callStatuses.active) {
      // Must check agent state
      let partState = this.getParticipantState(result, extension);
      call.state = partState == callStatuses.wrap_up ? CallState.Wrapping_up : CallState.Speaking;
    } else if (state == callStatuses.initiating) {
      call.state = CallState.Initiating;
    } else if (state == callStatuses.dropped) {
      call.state = CallState.Dropped;
    } else {
      console.log("Unknown call state: " + state)
      call.state = CallState.Unknown;
    }
    console.log("-------");
    return call;
  }

  private getParticipantState(result, extension) {
    for (let participant of result['participants'][0]['Participant']) {
      if (participant['mediaAddress'][0].toString() == extension) {
        console.log("Participant state: " + participant['state'][0]);
        return participant['state'][0];
      }
    }
    return "";
  }

  private actOnCall(fromExtension: string, callId: string, tokenAuth: string, action: string): Promise<boolean> {
    // Set query params
    let options = {
      headers: CiscoCommsService.getHeaderWithAuth(tokenAuth).set("Content-type", "application/xml")
    };
    options.headers.set(urls.general.contentKey, urls.general.contentValue);
    let body = "<Dialog>";
    body += `<requestedAction>${action}</requestedAction>`;
    body += `<targetMediaAddress>${fromExtension}</targetMediaAddress>`;
    body += "</Dialog>";
    console.log(body);

    return this._http.put(CiscoCommsService.getDialogUrl(callId), body, {...options, responseType: 'text'})
      .toPromise()
      .then(resp => {
        console.log(resp);
        return true;
      })
      .catch(this.handleError);
  }

  private static getUserUrl(userId: string) {
    return `https://${environment.ciscoDomain}${urls.general.prefix}${urls.user.url}/${userId}`;
  }

  private static getDialogUrl(dialogId: string) {
    return `https://${environment.ciscoDomain}${urls.general.prefix}${urls.dialog.url}/${dialogId}`;
  }

  private static getUserDialogsUrl(userId: string) {
    return `${CiscoCommsService.getUserUrl(userId)}/${urls.userDialogs.url}`;
  }

  private static getHeaderWithAuth(token: string) {
    // let header = {};
    // header[urls.general.authKey] = urls.general.authPrefix + token;
    return new HttpHeaders().set(urls.general.authKey, urls.general.authPrefix + token);
  }

  private static getParamsWithIETimestamp(): HttpParams {
    let params = new HttpParams();
    return params.set(urls.general.tsIEKey, new Date().getTime().toString());

  }

  private static getSubscriptionUrl() {
    return `https://${environment.ciscoDomain}${urls.subscription.url}`;
    // return `${environment.ciscoUrl}:${urls.subscription.port}${urls.subscription.url}`;
  }

  private handleError(error: any): Promise<any> {
    console.error('A CISCO error occurred');
    console.error(error);
    throw error;
  }
}

/*
<Update>
  <data>
    <user>
      <dialogs>/finesse/api/User/215194/Dialogs</dialogs>
      <extension></extension>
      <firstName>Coin</firstName>
      <lastName>App</lastName>
      <loginId>215194</loginId>
      <loginName>coinapp</loginName>
      <mediaType>1</mediaType>
      <pendingState></pendingState>
      <reasonCodeId>-1</reasonCodeId>
      <roles>
        <role>Agent</role>
      </roles>
      <settings>
        <wrapUpOnIncoming>REQUIRED</wrapUpOnIncoming>
      </settings>
      <state>LOGOUT</state>
      <stateChangeTime>2017-12-20T19:25:13.593Z</stateChangeTime>
      <teamId>5007</teamId>
      <teamName>IBE_SAD</teamName>
      <uri>/finesse/api/User/215194</uri>
    </user>
  </data>
  <event>PUT</event>
  <requestId></requestId>
  <source>/finesse/api/User/215194</source>
</Update>
*/
