import { Injectable } from '@angular/core';
import {CiscoCommsService} from "../cisco-comms.service";
import {AgentState} from "../../models/agent";
import {Http} from "@angular/http";
import {
  cisco_incoming_alerting, cisco_incoming_dropped, cisco_incoming_speaking, cisco_incoming_wrapping,
  cisco_outgoing_calling, cisco_outgoing_dropped,
  cisco_outgoing_initiating, cisco_outgoing_speaking, cisco_outgoing_wrappingup,
  cisco_set_not_ready, cisco_set_ready, cisco_set_reserved,
  cisco_set_talking, cisco_set_work, cisco_set_work_ready
} from "./cisco-packets";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MockCiscoCommsService extends CiscoCommsService{
  private _currentStatus: AgentState = null;

  constructor(_http: HttpClient) {super(_http);}

  // getStatus(): Promise<number> {
  //   return new Promise<number>(succ =>
  //     setTimeout(() => succ(this._currentStatus), 500));
  // }

  // setStatus(status: AgentState): Promise<AgentState> {
  //   return new Promise<AgentState>(succ => setTimeout(() => {this._currentStatus = status; succ(status);}, 2000));
  // }

  // mockImmediateSetStatus(status: number): void {
  //   this._currentStatus = status;
  // }

  sendStateNotReady() {
    this.processEvent(cisco_set_not_ready);
  }

  sendStateReady() {
    this.processEvent(cisco_set_ready);
  }

  sendStateWorkReady() {
    this.processEvent(cisco_set_work_ready);
  }

  sendIncomingAlerting() {
    this.processEvent(cisco_set_reserved);
    this.processEvent(cisco_incoming_alerting);
  }

  sendIncomingSpeaking() {
    this.processEvent(cisco_set_talking);
    this.processEvent(cisco_incoming_speaking);
  }

  sendIncomingHangup() {
    this.processEvent(cisco_set_work_ready);
    this.processEvent(cisco_incoming_wrapping);
    setTimeout(() => {
      this.processEvent(cisco_set_ready);
      this.processEvent(cisco_incoming_dropped);
    }, 30000);
  }

  sendOutgoingInitiating() {
    this.processEvent(cisco_set_not_ready);
    this.processEvent(cisco_set_talking);
    this.processEvent(cisco_outgoing_initiating);
  }

  sendOutgoingCalling() {
    this.processEvent(cisco_outgoing_calling);
  }

  sendOutgoingDropped() {
    this.processEvent(cisco_outgoing_dropped);
    this.processEvent(cisco_set_not_ready);
  }


  sendOutgoingSpeaking() {
    this.processEvent(cisco_outgoing_speaking);
  }

  sendOutgoingHangup() {
    console.log("Set work");
    this.processEvent(cisco_set_work);
    console.log("wrapping");
    this.processEvent(cisco_outgoing_wrappingup);
    console.log("end");
    setTimeout(() => {
      this.processEvent(cisco_outgoing_dropped);
      this.processEvent(cisco_set_not_ready);
    }, 30000);

  }
}
