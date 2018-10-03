import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {AttributeType} from "../../models/attribute";
import {CoinNumberInputComponent} from "../coin-number-input/coin-number-input.component";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import * as moment from "moment";

@Component({
  selector: 'value-edition',
  templateUrl: './value-edition.component.html',
  styleUrls: ['./value-edition.component.css']
})
export class ValueEditionComponent implements OnInit, AfterViewInit {
  @Input() type: AttributeType;
  @Input() value: string;
  @Input() disabled: boolean = false;

  @ViewChild('numberInput') numberInput: CoinNumberInputComponent;
  @ViewChild('dateInput') dateInput: DatepickerComponent;

  private stringValue: string = "";
  private AttTypes = AttributeType;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.ngOnChanges({value: this.value});
  }

  ngOnChanges(changes){
    if(changes.value && this.value){
      switch(this.type) {
        case AttributeType.string: this.stringValue = this.value; break;
        case AttributeType.number: if (this.numberInput) this.numberInput.setNumber(parseInt(this.value)); break;
        case AttributeType.date:
        case AttributeType.datetime: if (this.dateInput) this.dateInput.setDate(moment(this.value)); break;
      }
    }
  }

  getValue(): string {
    if (this.hasErrors()) {
      return null;
    }
    switch(this.type) {
      case AttributeType.string: return this.stringValue;
      case AttributeType.number: const v = this.numberInput.getNumber(); return v === null || v === undefined ? null : v.toString();
      case AttributeType.date:
      case AttributeType.datetime: return this.dateInput.getInputDate();
    }
  }

  hasErrors() {
    switch(this.type) {
      case AttributeType.string: return !this.stringValue || this.stringValue.length == 0;
      case AttributeType.number: return !this.numberInput || this.numberInput.hasErrors();
      case AttributeType.date:
      case AttributeType.datetime: return !this.dateInput || this.dateInput.hasErrors();
    }
  }
}
