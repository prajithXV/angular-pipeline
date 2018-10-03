import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Campaign} from "../../models/campaign";

@Component({
  selector: 'manage-campaigns',
  templateUrl: './manage-campaigns.component.html',
  styleUrls: ['./manage-campaigns.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManageCampaignsComponent implements OnInit {
  @Input() campaigns: Campaign[];
  @Input() searching: boolean = false;
  @Input() currentCampaign: Campaign = null;
  @Output() onCampaignSelection = new EventEmitter<Campaign>();

  constructor() { }

  ngOnInit() {
  }

  private selectCampaign(c: Campaign) {
    this.onCampaignSelection.emit(c);
  }
}
