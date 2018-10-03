import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LovType} from "../../models/lov-types";
import {DataService} from "../../services/data.service";
import {Code} from "../../models/code";
import {LovTypeModel} from "../../models/lov-type-model";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {LovValue} from "../../models/lov-values";
import {GlobalStateService} from "../../services/global-state.service";

@Component({
  selector: 'lov-types-table',
  templateUrl: './lov-types-table.component.html',
  styleUrls: ['./lov-types-table.component.css']
})
export class LovTypesTableComponent implements OnInit {

  @Input() lovTypes: LovType[] = null;
  // @Input() lovValues: LovValue[] = null;
  @Input() searchingLovTypes: boolean  = false;
  @Input() currentLovType: LovType = null;
  @Input() manageTicklerAttributeText: string = "add";
  @Input() isCreating: boolean = false;
  @Output() onLoadLovValue = new EventEmitter<LovType>();
  @Output() onAddLovType = new EventEmitter<LovTypeModel>();
  @Output() onUpdateLovType = new EventEmitter<LovTypeModel>();
  @Output() onRemoveLovType = new EventEmitter<LovType>();
  @Output() onCancelLovType = new EventEmitter<boolean>();

  lovTypeCodes: Code[] = null;
  private lovTypeVisibles = {};
  private isCreatingValues: boolean = false;

  constructor(private _dataService: DataService, private _userFeedbackService: UserFeedbackService, private _globalStateService: GlobalStateService) { }

  ngOnInit() {
    this.loadLovTypeCodes();
  }


  loadLovTypeCodes(){
    this._dataService.getLovTypeCodes().then(res=>{
      this.lovTypeCodes = res;
    }).catch(err=>{
      console.log(err);
      console.log("Error retrieving lov codes");
    })
  }


  //show or hide the list or the panel
  showLovTypes(value: boolean) {
    this.onCancelLovType.emit(value);
    // this.isCreating = value;
  }

  showLovValues(value: boolean){
    this.isCreatingValues = value;
  }

  newLovType() {
    // this.isCreating = false;
    this.lovTypeVisibles = {};
    this.onAddLovType.emit();
  }


  onCancelUpdate(lovType: LovType) {
    this.editLovType(lovType);
  }

  onUpdate() {
    this.lovTypeVisibles = {};
    this.onUpdateLovType.emit();
  }


  private editLovType(lovType: LovType) {
    this.lovTypeVisibles["id" + lovType.id] = !this.lovTypeVisibles["id" + lovType.id];
  }

  private isLovTypeVisible(lovType: LovType) {
    return this.lovTypeVisibles["id" + lovType.id];
  }

}
