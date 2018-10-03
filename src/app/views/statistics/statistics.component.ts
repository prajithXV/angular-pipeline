import {Component, OnInit, ViewChild} from '@angular/core';
import {CampaignStatsComponent} from "../campaign-stats/campaign-stats.component";

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  @ViewChild(CampaignStatsComponent) private _cpStats: CampaignStatsComponent;

  constructor() { }

  ngOnInit() {
  }

  refreshCampaignStats() {
    this._cpStats.loadData();
  }
}
