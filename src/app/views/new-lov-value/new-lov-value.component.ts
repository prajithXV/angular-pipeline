import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {LovValue} from "../../models/lov-values";
import {LovType} from "../../models/lov-types";
import {LovTypeModel} from "../../models/lov-type-model";
import {Code} from "../../models/code";
import {DataService} from "../../services/data.service";
import {GlobalStateService} from "../../services/global-state.service";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {Attribute, AttributeType} from "../../models/attribute";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {ValueEditionComponent} from "../value-edition/value-edition.component";

@Component({
  selector: 'new-lov-value',
  templateUrl: './new-lov-value.component.html',
  styleUrls: ['./new-lov-value.component.css']
})
export class NewLovValueComponent implements OnInit, AfterViewInit {

  @Input() manageLovValueText: string = "Add";
  @Input() currentLovValue: LovValue = null;
  @Input() currentLovType: LovType = null;
  @Input() hasToAddLovValue: boolean = false;
  @Output() onAddLovValue = new EventEmitter<LovValue>();
  @Output() onUpdateLovValue = new EventEmitter<LovValue>();
  @Output() onCancelLovValue = new EventEmitter<boolean>();

  @ViewChild('codeEdition') codeEdition: ValueEditionComponent;

  private model: LovValue = new LovValue();
  private waitingToAdd: boolean = false;
  private waitingToUpdate: boolean = false;

  constructor(private _dataService: DataService, private _globalStateService: GlobalStateService,private _userFeedbackService: UserFeedbackService, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._cdr.detectChanges();
  }

  ngOnChanges(changes) {
    if (changes.currentLovValue && this.currentLovValue) {
      this.setValuesToModel();
    }else{
      this.model.isActive = true;
    }
  }

  setValuesToModel() {
    if (!this.hasToAddLovValue) {
      this.model.valueCode = this.currentLovValue.valueCode;
      this.model.valueName = this.currentLovValue.valueName;
      this.model.valueDescription = this.currentLovValue.valueDescription;
      this.model.isActive = this.currentLovValue.isActive;
    }
  }


  //if hasToAdd is true calls to add function; else to update
  manageLovValues(lovValue: LovValue) {
    this.model.valueCode = this.codeEdition.getValue();
    if (this.hasToAddLovValue) {
      this.addLovValue(lovValue);
    } else {
      this.updateLovValue(lovValue);
    }
  }

  addLovValue(lovValue: LovValue){
    this.waitingToAdd = true;
    this._dataService.addLovValue(this.currentLovType, lovValue, this._globalStateService.loggedAgent).then(()=>{
      this.waitingToAdd = false;
      this.onAddLovValue.emit(lovValue);
      this._userFeedbackService.handleSuccess("LOV value added");
    }).catch(err=>{
      this.waitingToAdd = false;
      this._userFeedbackService.handleError("Error adding new LOV value", err);
    })
  }


  updateLovValue(lovValue: LovValue){
    this.waitingToUpdate = true;
    this._dataService.updateLovValue(this.currentLovValue, lovValue, this._globalStateService.loggedAgent).then(()=>{
      this.onUpdateLovValue.emit(lovValue);
      this.waitingToUpdate = false;
      this._userFeedbackService.handleSuccess("LOV value updated");
    }).catch(err=>{
      this.waitingToUpdate = false;
      this._userFeedbackService.handleError("Error updating LOV value", err);
    })
  }


  get hasFormErrors():boolean {
    return !this.model.valueName || this.codeEdition.hasErrors();
  }

  get isWaiting(): boolean{
    return this.waitingToUpdate || this.waitingToAdd;
  }

  cancel(){
    this.onCancelLovValue.emit();
  }

}
