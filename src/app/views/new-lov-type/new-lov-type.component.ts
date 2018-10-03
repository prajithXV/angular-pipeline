import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LovType} from "../../models/lov-types";
import {Code} from "../../models/code";
import {LovTypeModel} from "../../models/lov-type-model";
import {DataService} from "../../services/data.service";
import {GlobalStateService} from "../../services/global-state.service";
import {UserFeedbackService} from "../../services/user-feedback.service";

@Component({
  selector: 'new-lov-type',
  templateUrl: './new-lov-type.component.html',
  styleUrls: ['./new-lov-type.component.css']
})
export class NewLovTypeComponent implements OnInit {
  @Input() lovTypeCodes: Code[] = null;
  @Input() isCreating: boolean = false;
  @Input() manageLovTypeText: string = "Add";
  @Input() currentLovType: LovType = null;
  @Input() hasToAddLovType: boolean = false;
  @Output() onAddLovType = new EventEmitter<LovTypeModel>();
  @Output() onUpdateLovType = new EventEmitter<LovTypeModel>();
  @Output() onCancelLovType = new EventEmitter<boolean>();

  private model: LovTypeModel = new LovTypeModel();
  private waitingToAdd: boolean = false;
  private waitingToUpdate: boolean = false;



  constructor(private _dataService: DataService, private _globalStateService: GlobalStateService,
              private _userFeedbackService: UserFeedbackService) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.currentLovType && this.currentLovType) {
      this.setValuesToModel();

    } else {
      this.model.isActive = true;
      this.model.type = this.lovTypeCodes[0].code;
    }
  }

  setValuesToModel() {
    if (!this.hasToAddLovType) {
      this.model.lovCode = this.currentLovType.lovCode;
      this.model.lovName = this.currentLovType.lovName;
      this.model.lovDescription = this.currentLovType.lovDescription;
      this.model.isActive = this.currentLovType.isActive;
      this.model.type = this.currentLovType.type.toString();
    }
  }


  //if hasToAdd is true calls to add function; else to update
  manageLovTypes(model: LovTypeModel) {
    if (this.hasToAddLovType) {
      this.addLovType(model);
    } else {
      this.updateLovType(model);
    }
  }

  addLovType(model: LovTypeModel){
    this.waitingToAdd = true;
    this._dataService.addLovType(model, this._globalStateService.loggedAgent).then(()=>{
      this.waitingToAdd = false;
      this.onAddLovType.emit(model);
      this._userFeedbackService.handleSuccess("LOV type added");
    }).catch(err=>{
      this.waitingToAdd = false;
      this._userFeedbackService.handleError("Error adding new LOV Type", err);
    })
  }


  updateLovType(model: LovTypeModel){
    this.waitingToUpdate = true;
    this._dataService.updateLovType(this.currentLovType, model, this._globalStateService.loggedAgent).then(()=>{
      this.onUpdateLovType.emit(model);
      this.waitingToUpdate = false;
      this._userFeedbackService.handleSuccess("LOV type updated");
    }).catch(err=>{
      this.waitingToUpdate = false;
      this._userFeedbackService.handleError("Error updating LOV Type", err);
    })
  }


  get hasFormErrors():boolean {
    return !this.model.lovCode || !this.model.lovName;
  }

  get isWaiting(): boolean{
    return this.waitingToUpdate || this.waitingToAdd;
  }

  cancel(){
    this.onCancelLovType.emit();
  }

}
