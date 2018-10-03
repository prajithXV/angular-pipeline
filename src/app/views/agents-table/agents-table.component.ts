import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Agent} from "../../models/agent";
import {Campaign} from "../../models/campaign";
import {ToggleCampaignEvent} from "../manage-users/manage-users.component";

@Component({
  selector: 'agents-table',
  templateUrl: './agents-table.component.html',
  styleUrls: ['./agents-table.component.css']
})
export class AgentsTableComponent implements OnInit {

  @Input() agents: Agent[] = null;
  @Input() campaigns: Campaign[] = null;
  @Input() searching: boolean = false;
  @Input() errorSearching: boolean = false;
  @Input() showCampaigns: boolean = true;
  @Input() showSelector: boolean = false;
  @Input() currentAgent: Agent = null;
  @Output() onToggleCampaign = new EventEmitter<ToggleCampaignEvent>();
  @Output() onAgentSelected = new EventEmitter<Agent>();

  emptyCampaigns: Campaign[] = [];

  constructor() { }

  ngOnInit() {
  }

  toggleCampaign(agent: Agent, campaign: Campaign) {
    this.onToggleCampaign.emit({agent: agent, campaign: campaign});
  }

  getAgentCampaign(agent: Agent, campaign: Campaign) {
    return agent.getCampaign(campaign);
  }

  get shownCampaigns() {
    return this.showCampaigns ? this.campaigns : this.emptyCampaigns;
  }

  selectAgent(agent: Agent) {
    if (this.showSelector) {
      this.onAgentSelected.emit(agent);
    }
  }
}
