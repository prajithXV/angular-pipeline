import {Pipe, PipeTransform} from '@angular/core';
import {AgentState, AgentStateCode, AgentStateReasonCode} from "../models/agent";

@Pipe({
  name: 'agentState'
})
export class AgentStatePipe implements PipeTransform {

  transform(state: AgentState): any {
    if (state == null) {
      return '#unknown state#';
    }

    let ret = "";
    switch (state.state) {
      case AgentStateCode.unknown:
        ret = "Unknown";
        break;
      case AgentStateCode.logout:
        ret = "Logout";
        break;
      case AgentStateCode.ready:
        ret = "Ready";
        break;
      case AgentStateCode.not_ready:
        ret = "Not ready";
        break;
      case AgentStateCode.work:
        ret = "Work";
        break;
      case AgentStateCode.work_ready:
        ret = "Work ready";
        break;
      case AgentStateCode.hold:
        ret = "Hold";
        break;
      case AgentStateCode.talking:
        ret = "Talking";
        break;
      case AgentStateCode.reserved:
        ret = "Reserved";
        break;
      default:
        ret = state.originalState;
    }

    if (!state.reason) {
      if (state.originalReason && state.originalReason != "") {
        ret += " - " + state.originalReason;
      }
    } else {
      switch (+state.reason) {
        case AgentStateReasonCode.unknown:
          ret += " - Unknown";
          break;
        case AgentStateReasonCode.not_ready:
          ret += " - Not ready";
          break;
        case AgentStateReasonCode.lunch:
          ret += " - Lunch";
          break;
        case AgentStateReasonCode.meeting:
          ret += " - Meeting";
          break;
        case AgentStateReasonCode.break_:
          ret += " - Break";
          break;
        case AgentStateReasonCode.administrative:
          ret += " - Administrative";
          break;
      }
    }

    return ret;
  }

}
