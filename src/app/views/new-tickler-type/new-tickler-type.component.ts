import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TicklerProcess} from "../../models/tickler-processes";
import {TicklerTypeModel} from "../../models/tickler-type-model";
import {DataService} from "../../services/data.service";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {GlobalStateService} from "../../services/global-state.service";
import {TicklerType} from "../../models/tickler-types";

@Component({
  selector: 'new-tickler-type',
  templateUrl: './new-tickler-type.component.html',
  styleUrls: ['./new-tickler-type.component.css']
})
export class NewTicklerTypeComponent implements OnInit {

  @Input() currentProcess: TicklerProcess = null;
  @Input() currentTicklerType: TicklerType = null;
  @Input() hasToAddTicklerType: boolean = false;
  @Input() manageTicklerTypeText: string = "Add";
  @Output() onCancelType = new EventEmitter<boolean>();
  @Output() onAddType = new EventEmitter<boolean>();
  @Output() onUpdateTicklerType = new EventEmitter<boolean>();
  @Output() newType = new EventEmitter<TicklerTypeModel>();
  private model: TicklerTypeModel = new TicklerTypeModel();
  private waitingResponse: boolean = false;
  private waitingToUpdate: boolean = false;

  constructor(private _dataService: DataService, private _userFeedbackService: UserFeedbackService,
              private _globalStateService: GlobalStateService) {
  }

  ngOnInit() {

  }

  ngOnChanges(changes) {
    if (changes.currentTicklerType) {
      this.setValuesToModel();
    }else {
      this.model.activeFlag = true;
      this.model.isCore = true;
    }

  }

  get hasInputNumberErrors():boolean {
    return this.model.followUpDays < 0;
  }

  get hasFormErrors():boolean{
    return !this.model.ticklerName || !this.model.ticklerCode || this.hasInputNumberErrors;
  }

  get isWaiting():boolean{
    return this.waitingResponse || this.waitingToUpdate;
  }


  //when update we need to keep the values
  setValuesToModel() {
    if (!this.hasToAddTicklerType) {
      this.model.ticklerCode = this.currentTicklerType.ticklerCode;
      this.model.ticklerName = this.currentTicklerType.ticklerName;
      this.model.ticklerDescription = this.currentTicklerType.ticklerDescription;
      this.model.orderByCode = this.currentTicklerType.orderByCode;
      this.model.followUpDays = this.currentTicklerType.followUpDays;
      this.model.activeFlag = this.currentTicklerType.activeFlag;
      this.model.isCloseable = this.currentTicklerType.isCloseable;
      this.model.isCore = this.currentTicklerType.isCore;
      this.model.isBase = this.currentTicklerType.isBase;
      this.model.actionRequired = this.currentTicklerType.actionRequiredFlag;
    }
  }

  //return to the table
  cancel() {
    this.onCancelType.emit();
  }

  /*
  * add or update function
  * hasToAddTicklerType = true --> add function
  * hasToAddTicklerType = false --> update function
  *
  * */
  manageTicklerTypes(model: TicklerTypeModel) {
    if (this.hasToAddTicklerType) {
      this.add(model);
    } else {
      this.update(model);
    }
  }

  //add a new case tickler --> return to the table
  add(model: TicklerTypeModel) {
    this.waitingResponse = true;
    this._dataService.newTicklerType(this.currentProcess, model, this._globalStateService.loggedAgent).then(() => {
      this.waitingResponse = false;
      this.onAddType.emit();
      this._userFeedbackService.handleSuccess("Tickler type added");
    }).catch(err => {
      this.waitingResponse = false;
      this._userFeedbackService.handleError("Error adding new tickler type", err);
    })

  }

  //update function
  update(model: TicklerTypeModel) {
    this.waitingToUpdate = true;
    this._dataService.updateTicklerType(this.currentTicklerType, model, this._globalStateService.loggedAgent).then(() => {
      this.waitingToUpdate = false;
      this.onUpdateTicklerType.emit();
      this._userFeedbackService.handleSuccess("Tickler type updated")
    }).catch(err => {
      this.waitingToUpdate = false;
      this._userFeedbackService.handleError("Error updating tickler type", err);
    })

  }
}
