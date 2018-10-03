import {Component, Input, OnInit} from '@angular/core';
import {IncomingCalls} from "../../models/incomingCalls";

@Component({
  selector: 'incoming-calls-data',
  templateUrl: './incoming-calls-data.component.html',
  styleUrls: ['./incoming-calls-data.component.css']
})
export class IncomingCallsDataComponent implements OnInit {

  @Input() incomingCalls: IncomingCalls[];
  @Input() searchingData: boolean;
  @Input() visibleTable: boolean;
  constructor() { }

  ngOnInit() {
  }

}
