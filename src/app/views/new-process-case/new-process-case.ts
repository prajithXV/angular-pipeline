import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Input() showSave: boolean = false;
  @Output() onDefaultCaseCreated = new EventEmitter<ProcessCaseModel>();
  @Output() caseCreated = new EventEmitter<ProcessCaseModel>();
  @Output() onCancel = new EventEmitter<number>();

  private model: ProcessCaseModel = new ProcessCaseModel();
  private waitingResponse: boolean = false;
  private waitingDefaultSaveResponse: boolean = false;


  constructor(private _dataService: DataService, private _userFeedbackService: UserFeedbackService,
              private _globalStateService: GlobalStateService, private _cdr: ChangeDetectorRef) { }

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
  createProcessCase(model: ProcessCaseModel, isDefaultSave: boolean) {
    if (!isDefaultSave) {
      this.waitingResponse = true;
    }
    else {
      this.waitingDefaultSaveResponse = true;
    }
    this._dataService.createCaseTickler(this.account, this.customer, this._globalStateService.loggedAgent, model)
      .then(() => {
        this._userFeedbackService.handleSuccess("Process case created");
        if (!isDefaultSave) {
          this.caseCreated.emit();
        }
        else {
          this.onDefaultCaseCreated.emit(model);
        }
        this.waitingResponse = false;
        this.waitingDefaultSaveResponse = false;
      }).catch((error) => {
        this._userFeedbackService.handleError("Error creating process case", error);
        this.waitingResponse = false;
        this.waitingDefaultSaveResponse = false;
    });
  }

  resetForm() {
    this.model = this.newModel();
    this.model.clear();
  }

  private newModel(): ProcessCaseModel {
    return {
      processCode: this.processes && this.processes.length > 0 ? this.processes[0] : null,
      caseDescription: "",
      clear: () => {
        this.model = this.newModel();
        this.waitingResponse = false;
        this.waitingDefaultSaveResponse = false;
        this._cdr.detectChanges();
      }
    };
  }
}
