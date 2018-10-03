import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Agent} from "../app/models/agent";
import {Phone} from "../app/models/phone";

// let lgAgent = new Agent();
export let globalStateServiceMock = {
  // agent: new Agent(),
  currentCampaignCode: "DIRECT",
  roles: "CL_CONTENT_VIEWER",
  showHotkeyPopovers: true,
  loggedAgent: new Agent("account1", "user1",false,true,false, false),
  // get loggedAgent() {
  //   return this.agent;
  // },
  // set loggedAgent(ag: Agent) {
  //   this.agent = ag;
  // },
  hotkeyObservable: new BehaviorSubject<boolean>(true),


  loggedAgentHasRoleCode: function(): boolean{
    return true;
  },

  callTo: function(){

  },
  login(): Promise<Agent> {
    return new Promise<Agent>(s=>s(this.loggedAgent));
  }

};
