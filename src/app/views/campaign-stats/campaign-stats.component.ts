import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {CampaignStatsToken} from "../../models/campaign-stats-token";
import {Campaign} from "../../models/campaign";
import {Code} from "../../models/code";

@Component({
  selector: 'campaign-stats',
  templateUrl: './campaign-stats.component.html',
  styleUrls: ['./campaign-stats.component.css']
})
export class CampaignStatsComponent implements OnInit {
  tokens: CampaignStatsToken[] = null;
  statuses: Code[] = null;
  campaigns: Campaign[] = null;

  constructor(private _dataService: DataService) {

  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.tokens = null;
    this.campaigns = null;
    this._dataService.getGlobalCampaigns().then(cps => this.campaigns = cps);
    this._dataService.getCampaignStats().then(stats => this.tokens = stats);
    this._dataService.getCampaignListRecordStatusCodes().then(codes => this.statuses = codes);
  }

  private getCount(cpCode: string, stCode: string) {
    let token = this.tokens.find(t => t.campaignCode == cpCode && t.statusCode == stCode);
    return token ? token.count : '-';
  }

  // TODO: Precalc and store in the component the totals by status, campaign and grand total
  private getTotalByStatus(stCode: string) {
    return this.tokens
      .filter(t => t.statusCode == stCode)
      .map(t => t.count)
      .reduce((pv, cv) => pv + cv, 0);
  }

  private getTotalByCampaign(cpCode: string) {
    return this.tokens
      .filter(t => t.campaignCode == cpCode)
      .map(t => t.count)
      .reduce((pv, cv) => pv + cv, 0);
  }

  private getGrandTotal() {
    return this.tokens
      .map(t => t.count)
      .reduce((pv, cv) => pv + cv, 0);

  }
}
