import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AgentState} from "../../models/agent";
import {Call, CallState, CallType} from "../../models/call";
import {DataService} from "../../services/data.service";
import {GlobalStateService} from "../../services/global-state.service";
import {Phone} from "../../models/phone";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'xmpp-debugger',
  templateUrl: './xmppdebugger.component.html',
  styleUrls: ['./xmppdebugger.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class XmppdebuggerComponent implements OnInit, OnDestroy {
  private connected = false;
  private states: Observable<AgentState> = null;
  private calls: Observable<Call> = null;
  private debugs: Observable<string> = null;
  messages: { msg: string, xml: string, time: Date }[] = [];

  constructor(private _dataService: DataService, private _globalStateService: GlobalStateService) { }

  ngOnInit() {
    this.connect();
  }

  ngOnDestroy() {
    this.connected = false;
  }

  resetMsgs() {
    this.messages = [];
  }

  private replaceAll(str, stringToReplace, replaceWith) {
    var result = str, index = 1;
    while (index > 0) {
      result = result.replace(stringToReplace, replaceWith);
      index = result.indexOf(stringToReplace);
    }
    return result;
  }

  private isConnected() {
    return this.connected;
  }

  private connect() {
    let fs = this._dataService.getFinesseStreams();
    this.states = fs.states;
    this.calls = fs.calls;
    this.debugs = fs.debug;
    this.debugs.takeWhile(() => this.connected).subscribe(msg => {
      let str = this.replaceAll(this.replaceAll(msg, ">", "KKKK"), "KKKK", "> ");
      this.messages.unshift({msg: null, xml: str, time: new Date()})
    }, error => console.log("Error on debugs"));
    this.states.takeWhile(() => this.connected).subscribe(state => {
      this.messages.unshift({msg: `State change: ${state.originalState} - ${state.originalReason}`, xml: null, time: new Date()});
    }, error => console.log("Error on states"));
    this.calls.takeWhile(() => this.connected).subscribe(call => {
      this.messages.unshift({msg: `Call ${call.ciscoId}: State ${CallState[call.state]}, Type ${CallType[call.type]}, From ${call.from}, To ${call.to}`, xml: null, time: new Date()});
    }, error => console.log("Error on calls"));
    this.connected = true;
  }

  private disconnect() {
    this.connected = false;
    this.states = null;
    this.calls = null;
    this.debugs = null;
  }


  makeCall() {
    let ph: Phone = new Phone();
    ph.number = environment.ciscoTargetNumber;
    this._globalStateService.callTo(ph);
    console.log("Calling");
  }
}
