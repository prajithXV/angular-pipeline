import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'coin-number-input',
  templateUrl: './coin-number-input.component.html',
  styleUrls: ['./coin-number-input.component.css']
})
export class CoinNumberInputComponent implements OnInit {
  @Input() name: string;
  @Input() mandatory: boolean;
  @Input() placeholder: string;
  @Input() continuosEvaluation: boolean = false;
  @Input() showErrors: boolean = true;
  @Input() disabled: boolean = false;


  numStr: string = "";
  mandatoryError = false;
  formatError = false;

  constructor() {
  }

  ngOnInit() {
  }

  hasErrors() {
    return this.mandatoryError || this.formatError;
  }

  refreshErrors() {
    this.clearErrors();

    // Mandatory
    this.mandatoryError = this.mandatory && this.isEmpty();
    // If there is no error, but is empty, don't check the rest
    if (this.mandatoryError || this.isEmpty()) {
      return;
    }

    // Format
    // For now 2 decimals max
    let regexp = /^\d+(\.\d{1,2})?$/;
    let match = regexp.test(this.numStr);
    if (!match) {
      this.formatError = true;
    }
    // let dt = this.getNumber();
    // if (!dt) {
    //   this.formatError = true;
    // }
  }

  getNumber(): number {
    // Return null if is empty
    if (this.isEmpty()) {
      return null;
    }
    // Return null if can't be parsed
    let num;
    try {
      num = +this.numStr;
      if (isNaN(num)) {
        return null;
      }
    } catch (e) {
      return null;
    }
    // Return the number
    return num;
  }

  setNumber(val: number) {
    this.numStr = val.toString();
    this.refreshErrors();
  }

  addToValue(val: number) {
    let v = this.getNumber();
    this.numStr = v ? (v + val).toString() : val.toString();
    this.refreshErrors();
  }

  valueChange(newValue) {
    this.numStr = newValue;
    if (this.continuosEvaluation) {
      this.refreshErrors();
    }
  }

  isEmpty(): boolean {
    return this.numStr.trim().length == 0;
  }

  clear() {
    this.clearErrors();
    this.numStr = "";
  }

  private clearErrors() {
    this.mandatoryError = false;
    this.formatError = false;
  }


  get isMandatoryError(): boolean{
    return this.mandatoryError;
  }

  set isMandatoryError(value: boolean){
    this.mandatoryError = value;
  }

  set isFormatError(value: boolean){
    this.formatError = value;
  }

  get isFormatError(): boolean{
    return this.formatError;
  }
}
