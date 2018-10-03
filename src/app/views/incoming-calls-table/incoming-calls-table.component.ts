import {Component, Input, OnInit} from '@angular/core';
import {IncomingCalls} from "../../models/incomingCalls";

@Component({
  selector: 'incoming-calls-table',
  templateUrl: './incoming-calls-table.component.html',
  styleUrls: ['./incoming-calls-table.component.css']
})
export class IncomingCallsTableComponent implements OnInit {

  @Input() visibleTable:boolean;
  @Input() searchingData:boolean;
  @Input() incomingCalls: IncomingCalls[];
  constructor() { }

  ngOnInit() {
  }

}
