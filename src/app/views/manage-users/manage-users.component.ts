import {Component, OnInit} from '@angular/core';
import {Agent} from "../../models/agent";
import {DataService} from "../../services/data.service";
import {UFNotification, UserFeedbackService} from "../../services/user-feedback.service";
import {UFSeverity} from "../../services/ufseverity";
import {Campaign} from "../../models/campaign";
import {GlobalStateService} from "../../services/global-state.service";
import {Role} from "../../models/role";

export interface ToggleCampaignEvent {
  agent: Agent;
  campaign: Campaign;
}

export interface ToggleRoleEvent {
  agent: Agent;
  role: Role;
}

@Component({
  selector: 'manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  agents: Agent[] = null;
  currentAgent: Agent = null;
  private _errorSearching = false;
  campaigns: Campaign[] = null;
  roles: Role[] = null;

  pendingOperations: string[] = [];

  myArray = [
    {
      account: null,
      pendingRoles: null,
    }
  ];

  constructor(private _dataService: DataService,
              private _userFeedbackService: UserFeedbackService,
              private _globalStateService: GlobalStateService) {
  }

  ngOnInit() {
    // Load agents and campaigns
    this._dataService.getGlobalCampaigns().then(cps => this.campaigns = cps);
    this._dataService.getRoles().then(rls => this.roles = rls);
    this._dataService.getAgents().then(ag => {
      this.agents = ag;
      this.currentAgent = ag[0];
      if (this.currentAgent) {
        this.loadCampaignsForAgent(this.currentAgent);
      }
    }).catch(err => {
      this._userFeedbackService.handleError("Error getting users", err);
      this._errorSearching = true;
    })
  }

  isSearching(): boolean {
    return !this.agents || !this.campaigns;
  }

  isError(): boolean {
    return this._errorSearching;
  }

  toggleCampaign(event: ToggleCampaignEvent) {
    let cp = event.agent.getCampaign(event.campaign);
    if (cp) {
      cp.hasPendingOperation = true;
      console.log(cp);
      this._dataService.assignAgentToCampaign(event.agent, cp, false, this._globalStateService.loggedAgent).then(() => {
        event.agent.removeCampaign(cp);
        console.log(event.agent)
      }).catch(error => this._userFeedbackService.handleError(
        `Error removing user ${event.agent.account} from campaign ${cp.name}`,
        error)
      );
    } else {
      // Create the campaign
      cp = new Campaign(event.campaign.code, event.campaign.name, event.agent.account, true);
      cp = event.agent.addCampaign(cp);
      this._dataService.assignAgentToCampaign(event.agent, cp, true, this._globalStateService.loggedAgent).then(() => {
        cp.hasPendingOperation = false;
      }).catch(error => {
          this._userFeedbackService.handleError(`Error adding user ${event.agent.account} to campaign ${cp.name}`, error);
          event.agent.removeCampaign(cp);
        }
      );
    }
  }

  toggleRole(event: ToggleRoleEvent) {
    let assignRole = !event.agent.hasRole(event.role);
    let code = event.role.code;

    //pendingOperations --> wait
    this.pendingOperations.push(code);

    let index = null;
    this._dataService.assignAgentToRole(event.agent, event.role, assignRole, this._globalStateService.loggedAgent).then(() => {
      //assing role
      if (assignRole) {
        event.agent.addRoleCode(code);
      } else {
        event.agent.removeRoleCode(code);
      }

      //delete pending operations
      let found =false;
      for (let i = 0; this.myArray.length > i; i++) {
        if (this.myArray[i].account === event.agent.account) {
          found = true;
          index = this.myArray[i].pendingRoles.indexOf(code);
          this.myArray[i].pendingRoles.splice(index, 1);
          break;
        }
      }

      if (!found) {
        let newOb = {
          account: event.agent.account,
          pendingRoles: []
        };
        this.myArray.push(newOb);
        this.pendingOperations = newOb.pendingRoles;
      }


    }).catch(err =>
    {

      let msg = null;
      if (assignRole) {
        msg = `Error adding the role ${event.role.name} to ${event.agent.account} to role `;
      } else {
        msg = `Error removing the role ${event.role.name} to ${event.agent.account} to role `;
      }
      this._userFeedbackService.handleError(msg, err);
      this.pendingOperations.splice(index, 1);
    });
  }

  private loadCampaignsForAgent(ag : Agent) {
    // If I already loaded campaigns, ignore the call
    if (ag.campaigns) {
      return;
    }
    this._dataService.getAgentCampaigns(ag).then(cps => {
      if (cps.length == 0) {
        ag.resetCampaigns();
      } else {
        for (let c of cps) {
          ag.addCampaign(c);
        }
      }
    }).catch(error => {
      this._userFeedbackService.handleError(`Error getting campaigns for ${ag.account}`, error);
    });
  }

  selectAgent(agent: Agent) {
    this.loadCampaignsForAgent(agent);
    this.currentAgent = agent;
    let index = 0;
    //not repeat account in the array --> search and assign pending operations
    let found: boolean = false;
    for (let i = 0; this.myArray.length > i; i++) {
      if (this.myArray[i].account === agent.account) {
        found = true;
        index = i;
        break;
      }
    }

    if (!found) {
      let newOb = {
        account: agent.account,
        pendingRoles: []
      };
      this.myArray.push(newOb);
      this.pendingOperations = newOb.pendingRoles;
    } else {
      this.pendingOperations = this.myArray[index].pendingRoles;
    }
  }
}
