import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TicklerAttributeModel} from "../../models/tickler-attribute-model";
import {TicklerAttribute} from "../../models/tickler-attribute";
import {DataService} from "../../services/data.service";
import {GlobalStateService} from "../../services/global-state.service";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {Code} from "../../models/code";
import {LovType} from "../../models/lov-types";


@Component({
  selector: 'new-tickler-attribute',
  templateUrl: './new-tickler-attribute.component.html',
  styleUrls: ['./new-tickler-attribute.component.css']
})
export class NewTicklerAttributeComponent implements OnInit {

  @Input() currentTicklerAttribute: TicklerAttribute = null;
  @Input() isCreating: boolean = false;
  @Input() typeCodes: Code[] = null;
  @Input() manageTicklerAttributeText: string = "add";
  @Input() hasToAddTicklerAttribute: boolean = false;
  @Input() ticklerAttributes: TicklerAttribute[] = null;
  @Output() onAddTicklerAttribute = new EventEmitter<TicklerAttributeModel>();
  @Output() onUpdateTicklerAttribute = new EventEmitter<TicklerAttributeModel>();
  @Output() onCancelTicklerAttribute = new EventEmitter<boolean>();
  private model: TicklerAttributeModel = new TicklerAttributeModel();
  private waitingToAdd: boolean = false;
  private waitingToUpdate: boolean = false;
  @Input() lovTypes: LovType[] = null;

  constructor(private _dataService: DataService, private _globalStateService: GlobalStateService,
              private _userFeedbackService: UserFeedbackService) {
  }

  ngOnInit() {

  }

  ngOnChanges(changes) {
    if (changes.currentTicklerAttribute) {
      this.setValuesToModel();

    } else {
      this.model.activeFlag = true;
      this.model.dataType = this.typeCodes[0].code;
    }
  }



  setValuesToModel() {
    if (!this.hasToAddTicklerAttribute) {
      this.model.attributeCode = this.currentTicklerAttribute.code;
      this.model.attributeName = this.currentTicklerAttribute.name;
      this.model.attributeDescription = this.currentTicklerAttribute.attributeDescription;
      this.model.activeFlag = this.currentTicklerAttribute.activeFlag;
      this.model.arrayFlag = this.currentTicklerAttribute.isArray;
      this.model.dataType = this.currentTicklerAttribute.type.toString();
      this.model.lovCode = this.currentTicklerAttribute.lovCode;
    }

  }

  //if hasToAdd is true calls to add function; else to update
  manageTicklerAttributes(model: TicklerAttributeModel) {
    if (this.hasToAddTicklerAttribute) {
      this.addTicklerAttribute(model);
    } else {
      this.updateTicklerAttribute(model);
    }
  }

  //when change the type combo
  typeSelected(model:TicklerAttributeModel){
    this.isListOfValue(model);
    this.lovTypes = this.lovTypes.filter(lt=>lt.isActive);
    this.model.lovCode = this.lovTypes.length > 0 ? this.lovTypes[0].lovCode : null;
  }

  //return true or false if dataType is LOV or not --> shows another combo if is true
  isListOfValue(model:TicklerAttributeModel):boolean{
    if(model != null){
      return model.dataType == '4';
    }
    return false;
  }


  get hasFormErrors():boolean {
    return (!this.model.lovCode && this.isListOfValue(this.model))|| !this.model.attributeCode || !this.model.attributeName;
  }

  get isWaiting(): boolean{
    return this.waitingToUpdate || this.waitingToAdd;
  }

  //add tickler attribute
  addTicklerAttribute(model: TicklerAttributeModel) {
    this.waitingToAdd = true;
    this._dataService.newTicklerAttribute(model, this._globalStateService.loggedAgent).then(() => {
      this.waitingToAdd = false;
      this.onAddTicklerAttribute.emit(model);
      this._userFeedbackService.handleSuccess("Tickler attribute added");
    }).catch(err => {
      this.waitingToAdd = false;
      this._userFeedbackService.handleError("Error adding new tickler attribute", err);
    })
  }

  //update tickler attribute
  updateTicklerAttribute(model: TicklerAttributeModel) {
    this.waitingToUpdate = true;
    this._dataService.updateTicklerAttribute(this.currentTicklerAttribute, model, this._globalStateService.loggedAgent).then(() => {
      this.waitingToUpdate = false;
      this.onUpdateTicklerAttribute.emit(model);
      this._userFeedbackService.handleSuccess("Tickler attribute updated");
    }).catch(err => {
      this.waitingToUpdate = false;
      this._userFeedbackService.handleError("Error updating tickler attribute", err);
    })
  }

  //cancel button
  cancel() {
    this.onCancelTicklerAttribute.emit(false)
  }

}
