import {Component, Input, OnInit} from '@angular/core';
import {CallsPersHour} from "../../models/callsPersHour";
import {Campaign} from "../../models/campaign";

@Component({
  selector: 'calls-per-hour-average-data',
  templateUrl: './calls-per-hour-average-data.component.html',
  styleUrls: ['./calls-per-hour-average-data.component.css']
})
export class CallsPerHourAverageDataComponent implements OnInit {
  @Input() table: Array<{ name: string, campaign: CallsPersHour }> = [];
  @Input() searchingData: boolean;
  @Input() options: Object;
  @Input() visibleTable: boolean;
  @Input() campaigns: Campaign[];
  @Input() callsPerHour: CallsPersHour[];


  constructor() {
  }

  ngOnInit() {
  }

}
