import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Agent} from "../../models/agent";
import {Campaign} from "app/models/campaign";
import {ToggleCampaignEvent} from "../manage-users/manage-users.component";

@Component({
  selector: 'agent-campaigns',
  templateUrl: './agent-campaigns.component.html',
  styleUrls: ['./agent-campaigns.component.css']
})
export class AgentCampaignsComponent implements OnInit {
  @Input() agent: Agent;
  @Input() campaigns: Campaign[];
  @Output() onToggleCampaign = new EventEmitter<ToggleCampaignEvent>();

  constructor() { }

  ngOnInit() {
  }

  toggleCampaign(campaign: Campaign) {
    this.onToggleCampaign.emit({agent: this.agent, campaign: campaign});
  }

}
