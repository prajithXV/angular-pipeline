import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MemoNote} from "../../models/memo-note";
import {DataService} from "../../services/data.service";
import {Account} from "../../models/account";
import {GlobalStateService} from "../../services/global-state.service";
import {UserFeedbackService} from "../../services/user-feedback.service";

@Component({
  selector: 'new-call-notes',
  templateUrl: './new-call-notes.component.html',
  styleUrls: ['./new-call-notes.component.css']
})
export class NewCallNotesComponent implements OnInit {

  @Input() account: Account = null;
  @Output() onAdd = new EventEmitter<MemoNote>();
  @Output() onCancel = new EventEmitter<boolean>();
  @ViewChild('initFocus') private _initFocusElem: ElementRef;
  private waitingToAdd: boolean = false;
  model = new MemoNote();

  constructor(private _dataService: DataService, private _globalStateService: GlobalStateService,
              private _userFeedbackService: UserFeedbackService) {
  }

  ngOnInit() {
    this.setFocus();
  }

  setFocus() {
    this._initFocusElem.nativeElement.focus();
  }

  addCallNote(model: MemoNote) {
    this.waitingToAdd = true;
    this._dataService.newCallNote(this.account, model, this._globalStateService.loggedAgent)
      .then(() => {
        this.waitingToAdd = false;
        this.onAdd.emit();
        this._userFeedbackService.handleSuccess("Call note added");
      }).catch(err => {
      this.waitingToAdd = false;
      this._userFeedbackService.handleError("Error adding call note", err);
    })
  }

  cancel() {
    this.onCancel.emit(false);
  }

  get isWaiting() {
    return this.waitingToAdd;
  }

}
