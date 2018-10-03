import {Component, Input, OnInit} from '@angular/core';
import {CallsPersHour} from "../../models/callsPersHour";
import {Campaign} from "../../models/campaign";
import {CoinDatePipe} from "../../pipes/coin-date.pipe";
import {SortByPipe} from "../../pipes/alphabetical-sort-name";

@Component({
  selector: 'calls-per-hour-table',
  templateUrl: './calls-per-hour-table.component.html',
  styleUrls: ['./calls-per-hour-table.component.css']
})
export class CallsPerHourTableComponent implements OnInit {
  @Input() table: Array<{ name: string, campaign: CallsPersHour }> = [];
  @Input() searchingData: boolean;
  @Input() visibleTable: boolean;
  @Input() hasTotal: boolean;


  constructor() {
  }

  ngOnInit() {

  }

}
