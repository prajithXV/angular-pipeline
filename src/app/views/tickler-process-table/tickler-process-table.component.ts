import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TicklerProcess} from "../../models/tickler-processes";

@Component({
  selector: 'tickler-process-table',
  templateUrl: './tickler-process-table.component.html',
  styleUrls: ['./tickler-process-table.component.css']
})
export class TicklerProcessTableComponent implements OnInit {

  @Input() ticklerProcesses: TicklerProcess[] = null;
  @Input() currentProcess: TicklerProcess = null;
  @Input() searchingProcesses: boolean = false;
  @Output() onLoadTicklerTypes = new EventEmitter<TicklerProcess>();

  constructor() {
  }

  ngOnInit() {
  }

  //emits to the parent the tickler process selected to can get the correspondent data
  searchTypes(ticklerProcess: TicklerProcess) {
    if (this.currentProcess == null || this.currentProcess.id != ticklerProcess.id) {
      this.onLoadTicklerTypes.emit(ticklerProcess);
    }
  }

}
