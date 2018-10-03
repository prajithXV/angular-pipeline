import {Component, Input, OnInit} from '@angular/core';
import {CallsPersHour} from "../../models/callsPersHour";
import {Campaign} from "../../models/campaign";

@Component({
  selector: 'calls-per-hour-data',
  templateUrl: './calls-per-hour-data.component.html',
  styleUrls: ['./calls-per-hour-data.component.css']
})
export class CallsPerHourDataComponent implements OnInit {
  @Input() callsPerHour: CallsPersHour[];
  @Input() table: Array<{ name: string, campaign: CallsPersHour }> = [];
  @Input() searchingData: boolean;
  @Input() options: Object;
  @Input() visibleTable: boolean;
  @Input() campaigns: Campaign[];


  constructor() {


  }

  ngOnInit() {

  }


}
