import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LovValue} from "../../models/lov-values";
import {LovType} from "../../models/lov-types";
import {DataService} from "../../services/data.service";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {GlobalStateService} from "../../services/global-state.service";
import {LovTypeModel} from "../../models/lov-type-model";

@Component({
  selector: 'lov-values-table',
  templateUrl: './lov-values-table.component.html',
  styleUrls: ['./lov-values-table.component.css']
})
export class LovValuesTableComponent implements OnInit{

  @Input() currentLovType: LovType = null;
  private lovValues: LovValue[] = null;
  private searchingLovValues: boolean = false;
  @Output() onCancelLovValues = new EventEmitter<boolean>();
  @Output() onAddLovValues = new EventEmitter<boolean>();
  @Output() onCancelUpdateLovValues = new EventEmitter<boolean>();
  @Output() onLoadLovValues = new EventEmitter<boolean>();

  private lovValueVisibles = {};
  @Input() isCreatingLovValues: boolean = false;



  constructor(private _dataService: DataService, private _userFeedbackService: UserFeedbackService, private _globalStateService: GlobalStateService) { }

  ngOnInit() {
  }


  ngOnChanges(changes){
    if(changes.currentLovType && this.currentLovType){
      this.loadLovValues(this.currentLovType);
      // this.isCreatingLovValues= false;
    }
  }


  //show or hide the list or the panel
  showLovValues(value: boolean) {
    this.onCancelLovValues.emit(value);
    // this.isCreating = value;
  }

  newLovValue() {
    // this.isCreating = false;
    this.lovValueVisibles = {};
    this.refreshLovValues();
    this.onAddLovValues.emit(false);
  }


  onCancelUpdate(lovValue: LovValue) {
    this.editLovValue(lovValue);
  }

  onUpdate() {
    this.lovValueVisibles = {};
    this.refreshLovValues();
  }


  private editLovValue(lovValue: LovValue) {
    this.lovValueVisibles["id" + lovValue.id] = !this.lovValueVisibles["id" + lovValue.id];
  }

  private isLovValueVisible(lovValue: LovValue) {
    return this.lovValueVisibles["id" + lovValue.id];
  }


  loadLovValues(lovType: LovType) {
    this.searchingLovValues = true;
    this.currentLovType = lovType;
    this.lovValues = [];

    this._dataService.getLovValues(lovType.lovCode).then(res => {
      this.lovValues = res;
      this.searchingLovValues = false;
      this.onLoadLovValues.emit(false);

    }).catch(err => {
      this.searchingLovValues = false;
      console.log("Error retrieving LOV values");
      console.log(err);
    })
  }

  get searchingValues(){
    return this.searchingLovValues;
  }

  refreshLovValues(){
    this.loadLovValues(this.currentLovType);
  }



}
