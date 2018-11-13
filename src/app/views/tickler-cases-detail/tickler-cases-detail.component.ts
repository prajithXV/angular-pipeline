import {Component, Input, OnInit} from '@angular/core';
import {ProcessCase} from "../../models/process-case";
import {TicklerProcess} from "../../models/tickler-processes";
import {Agent} from "../../models/agent";

@Component({
  selector: 'tickler-cases-detail',
  templateUrl: './tickler-cases-detail.component.html',
  styleUrls: ['./tickler-cases-detail.component.css']
})
export class TicklerCasesDetailComponent implements OnInit {

  @Input() currentProcessCase: ProcessCase = null;
  @Input() currentAgent: Agent = null;
  @Input() currentAgentCreatedBy: Agent = null;
  @Input() process: TicklerProcess = null;
  @Input() account: Account = null;
  @Input() searchingProcessCase: boolean = false;
  @Input() searchingAccountDep: boolean = false;
  @Input() searchingAccountInfo: boolean = false;
  @Input() searchingAccountAdditionalInfo: boolean = false;
  @Input() searchingAccountLoanInfo: boolean = false;
  @Input() searchingUsers: boolean = false;
  @Input() searchingProcesses: boolean = false;
  @Input() searchingCustomers: boolean = false;


  constructor() { }

  ngOnInit() {
  }

}
