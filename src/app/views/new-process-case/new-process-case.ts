import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProcessCaseModel} from "../../models/process-case-model";
import {TicklerProcess} from "../../models/tickler-processes";
import {PublicUrls} from "../../routing-constants";
import {DataService} from "../../services/data.service";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {GlobalStateService} from "../../services/global-state.service";
import {Account} from "../../models/account";
import {Customer} from "../../models/customer";

@Component({
  selector: 'new-process-case',
  templateUrl: './new-process-case.html',
  styleUrls: ['./new-process-case.css']
})
export class NewProcessCaseComponent implements OnInit {

  @Input() processes: TicklerProcess[] = null;
  @Input() account: Account = null;
  @Input() customer: Customer = null;
  @Input() saveText: String = "Save";
  @Output() caseCreated = new EventEmitter<ProcessCaseModel>();
  @Output() onCancel = new EventEmitter<number>();

  private model: ProcessCaseModel = new ProcessCaseModel();
  private waitingResponse: boolean = false;


  constructor(private _dataService: DataService, private _userFeedbackService: UserFeedbackService,
              private _globalStateService: GlobalStateService) { }

  ngOnInit() {
  }

  //if there are changes on the processes put the first process on the combo
  ngOnChanges(changes) {
    if (changes.processes && this.processes && this.processes.length > 0 && this.model.processCode == null) {
      this.model.processCode = this.processes[0];
    }
  }

  //Go back button --> return to New call record component
  goToRecordCall() {
    this.onCancel.emit();
  }

  //create a new process case --> emits to the parent
  createProcessCase(model: ProcessCaseModel) {
    this.waitingResponse = true;
    this._dataService.createCaseTickler(this.account, this.customer, this._globalStateService.loggedAgent, model)
      .then(() => {
        this._userFeedbackService.handleSuccess("Process case created");
        this.caseCreated.emit();
        this.waitingResponse = false;
      }).catch((error) => {
        this._userFeedbackService.handleError("Error creating process case", error);
        this.waitingResponse = false;
    });
  }
}
