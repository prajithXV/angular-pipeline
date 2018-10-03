import {
  AfterViewInit,
  ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {CoinNumberInputComponent} from "../coin-number-input/coin-number-input.component";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {Attribute, AttributeType} from "../../models/attribute";
import {Code} from "../../models/code";

@Component({
  selector: 'campaign-attribute-edition',
  templateUrl: './campaign-attribute-edition.component.html',
  styleUrls: ['./campaign-attribute-edition.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CampaignAttributeEditionComponent implements OnInit, AfterViewInit {
  @Input() attribute: Attribute;
  @Input() values: string[];
  @Input() isInManageProcess: boolean = false;
  @Input() isMandatory: boolean = false;
  @Input() listOfValues: Code[];
  @Output() onAddValue = new EventEmitter<string>();
  @Output() onRemoveValue = new EventEmitter<string>();
  @Output() onMandatoryValues = new EventEmitter<string>();

  @ViewChild('numberInput') numberInput: CoinNumberInputComponent;
  @ViewChild('dateInput') dateInput: DatepickerComponent;

  private valInput: string = "";
  private listOfValueSelected: Code = null;
  private AttTypes = AttributeType;

  constructor(private _cdr: ChangeDetectorRef) { }

  ngOnInit() {

  }

  ngOnChanges(changes) {
    if (changes.listOfValues && this.listOfValues && this.listOfValues.length > 0 && this.listOfValueSelected == null) {
      this.listOfValueSelected = null;
    }
  }

  ngAfterViewInit() {
    // Needed due to an issue with Angular 4
    this._cdr.detectChanges();
  }

  private addValue() {
    this.onAddValue.emit(this.valInput);
    this.valInput = "";
  }

  ListOfValueSelected(listOfValue: Code){
    this.hasDescription(listOfValue);
  }

  hasDescription(listOfValue: Code){
   if(listOfValue!=null&&(listOfValue.description != null || listOfValue.description != "")){
     return true;
   }else{
     return false;
   }
  }


  private addLovValue(){
    this.onAddValue.emit(this.listOfValueSelected.code);
    this.listOfValueSelected = null;
  }

  private removeValue(v: string) {
    console.log("Remove " + v);
    this.onRemoveValue.emit(v);
  }

  private numberHasErrors() {
    return !this.numberInput || this.numberInput.hasErrors();
  }

  private numberCanAddValue() {

    return this.numberInput && !this.numberInput.isEmpty() && !this.numberInput.hasErrors();
  }

  private numberIsEmpty() {
    return this.numberInput && this.numberInput.isEmpty();
  }

  private addNumberValue() {
    this.onAddValue.emit(this.numberInput.numStr);
    this.numberInput.clear();
  }

  private dateHasErrors() {
    return !this.dateInput || this.dateInput.hasErrors();
  }

  private dateCanAddValue() {
    return this.dateInput && !this.dateInput.isEmpty() && !this.dateInput.hasErrors();

  }

  private dateIsEmpty() {
    return this.dateInput && this.dateInput.isEmpty();
  }

  private addDateValue() {
    this.onAddValue.emit(this.dateInput.getInputDate());
    this.dateInput.clear();
  }



}
