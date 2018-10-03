import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";

const DatePatern = 'yyyy/MM/dd';

@Component({
  selector: 'coin-date-input',
  templateUrl: './coin-date-input.component.html',
  styleUrls: ['./coin-date-input.component.css']
})
export class CoinDateInputComponent implements OnInit {
  @Input() name: string;
  @Input() mandatory: boolean = false;
  @Input() allowPast: boolean = true;
  @Input() continuosEvaluation: boolean = false;
  @Input() showErrors: boolean = true;
  @Input() useTime: boolean = false;
  @Input("minDate") _minDate: string = null;

  private dateStr: string = "";
  private mandatoryError = false;
  private formatError = false;
  private pastError = false;
  private minDate: Date = null;

  constructor(private _datePipe: DatePipe) {
  }

  ngOnInit() {
    this.minDate = null;
    // If provided, use the param
    if (this._minDate) {
      try {
        this.minDate = new Date(Date.parse(this._minDate));
      } catch (e) {
        console.log("Unable to parse minDate: " + this._minDate + ". Using 2000/1/1");
      }
    }
    // If not provided or wrong date, use 2000/1/1
    if (!this.minDate) {
      this.minDate = new Date(2000, 0, 1);
    }
    console.log(this._minDate);
    console.log(this.minDate.toString());
  }

  hasErrors() {
    return this.mandatoryError || this.formatError || this.pastError;
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
    let dt = this.getDate();
    if (!dt || dt.getTime() < this.minDate.getTime()) {
      this.formatError = true;
      return;
    }

    // Past
    if (!this.allowPast) {
      this.pastError = dt.getTime() < new Date().getTime();
    }
  }

  valueChange(newValue) {
    this.dateStr = newValue;
    if (this.continuosEvaluation) {
      this.refreshErrors();
    }
  }

  addDays(days: number) {
    let date = this.getDate();
    let currDate = date ? date : new Date();
    let targ = new Date(currDate.getTime() + days * (60 * 60 * 24 * 1000));
    this.dateStr = this._datePipe.transform(targ, DatePatern);
    this.refreshErrors();
  }

  setDate(dt: Date) {
    this.dateStr = this._datePipe.transform(dt, DatePatern);
    this.refreshErrors();
  }

  getDate(): Date {
    // Return null if is empty
    if (this.isEmpty()) {
      return null;
    }
    // Return null if can't be parsed
    let dt;
    try {
      dt = new Date(this.dateStr);
      if (isNaN(dt.getTime())) {
        return null;
      }
      if (!this.useTime) {
        return this.checkDatePart(dt, this.dateStr) ? dt : null;
      } else {
        // Split with ' '
        let parts = this.dateStr.split(" ");
        if (parts.length < 2) {
          return null;
        }
        return this.checkDatePart(dt, parts[0]) && this.checkTimePart(dt, parts[1]) ? dt : null;
      }
    } catch (e) {
      return null;
    }
  }

  private checkDatePart(dt: Date, str: string) {
    // Check if every part is respected (IE allows months > 12, etc...)
    let parts = str.split("/");
    if (parts.length == 1) {
      parts = str.split("-");
    }
    // console.log(parts);
    if (parts.length != 3 || +parts[0] != dt.getFullYear() || +parts[1] - 1 != dt.getMonth() || +parts[2] != dt.getDate()) {
      return false;
    }
    return true;
  }

  private checkTimePart(dt: Date, str: string) {
    // Check if every part is respected (IE allows months > 12, etc...)
    let parts = str.split(":");
    var ret = false;
    if (parts.length >= 2) {
      ret = +parts[0] == dt.getHours() && +parts[1] == dt.getMinutes();
    }
    if (ret && parts.length >= 3) {
      ret = +parts[2] == dt.getSeconds();
    }
    return ret;
  }

  get dateString() {
    return this.hasErrors() ? "" : this.dateStr;
  }

  isEmpty(): boolean {
    return this.dateStr.trim().length == 0;
  }

  clear() {
    this.clearErrors();
    this.dateStr = "";
  }

  private clearErrors() {
    this.mandatoryError = false;
    this.formatError = false;
    this.pastError = false;
  }
}
