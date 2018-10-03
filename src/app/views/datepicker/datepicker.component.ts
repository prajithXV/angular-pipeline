import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as moment from "moment";
import {Moment} from "moment";

const m = require('moment');
const calendarType = 'calendar';
const placeholderType = 'MM/DD/YYYY';
m.suppressDeprecationWarnings = true;

@Component({
  selector: 'date-picker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {


  // @Input() min = null;
  @Input() min = moment(new Date(1900, 0, 1));
  @Input() max = moment(new Date(2051, 0, 0));
  @Input() pickerType: string = calendarType;
  @Input() showErrors: boolean = true;
  @Input() mandatory: boolean = false;
  @Input() upCalendar: boolean = false;
  @Input() placeHolderDate: string = placeholderType;
  @Input() name: string = "";
  @Input() continuosEvaluation: boolean = false;
  @Input() allowPast: boolean = true;
  @Input() formatType: string;
  @Input() disabled: boolean = false;


  @Input() selectedMoment = moment(new Date());

  private isMinInvalid: boolean = false;
  private isMaxInvalid: boolean = false;
  private isInvalidFormat: boolean = false;
  private isInvalidHourFormat: boolean = false;
  private mandatoryError = false;
  private pastError: boolean = false;

  @ViewChild('dateTime') private dateInput;


  constructor(private _cdr: ChangeDetectorRef) {
  }

  ngOnInit() {

  }


  //need to subscribe min and max variables when changes
  ngOnChanges(changes) {
    if (changes.min || changes.max || changes.mandatory || changes.selectedMoment || changes.allowPast) {
      if (this.mandatory || this.selectedMoment || this.allowPast) {
        //calls to refreshDateErrors (force)
        this.refreshDateErrors();

      }

    }
  }





  /*
  *
  * if not allow past we have to initialized the date
  * min: today's date
  *
  * this function is called after open the datepicker
  *
  * */

  initMinWhenNotAllowPast(){
    if(!this.allowPast){
      this.min = moment();
      this.min.hours(0);
      this.min.seconds(0);
      this.min.milliseconds(0);
      this.min.minutes(0);
    }
  }

  /*
  *
  * Check errors function
  *
  * */

  refreshDateErrors() {

    this.clearErrors();

    //mandatory error
    this.mandatoryError = this.mandatory && this.isEmpty();

    // If there is no error, but is empty, don't check the rest
    if (this.mandatoryError || this.isEmpty()) {

      return;
    }

    /*
    *
    *
    * First: check the format
    *
    * - if there are a date input
    *   - check the two formats that we accept and its types to can show the correspondent error
    *
    * - else is not valid
    *
    * */

    if (this.dateInput.nativeElement.value) {
      if(this.pickerType ==="calendar"){
        if (moment(this.dateInput.nativeElement.value, ["MM/DD/YYYY"], true).isValid()) {
          this.isInvalidFormat = false;
        }

        else {
          this.isInvalidFormat = true;
        }
      }else if(this.pickerType ==="both"){
        if (moment(this.dateInput.nativeElement.value, ["MM/DD/YYYY HH:mm"], true).isValid()) {
          this.isInvalidHourFormat = false;
        }

        else {
          this.isInvalidHourFormat = true;
        }
      }

    }

    /*
    *
    *
    *
    * undefined min and max --> initialize
    *
    *
    *
    * */

    if (this.min == null && this.allowPast) {
      this.min = moment(new Date(1900, 0, 1));
      this.isMinInvalid = false;
    }


    if (this.max == null) {
      this.max = moment(new Date(2051, 0, 0));
      this.isMaxInvalid = false;

    }

    /*
    *
    * Past not allowed (past error)
    * - min: today's date
    * - set hours, minutes, etc to 0 to compare easily dates
    *
    * if: selectedMoment is not null
    *     and
    *     the min value is greater than selectedMoment and the length is 10 (we have finished to write the date)
    *     and
    *     the type of datepicker is 'calendar' (only the date)
    *     and this date is valid (has the correct format)
    *     or is not today (to can select the today's day)
    *     pastError is true
    *
    *  if: the same condition but with the type 'both' (with hours) and the length is 16 (we have finished to write the date)
    *      pastError is true
    *
    * else: no pastError
    *
    * */

    if (!this.allowPast) {

      this.min = moment();
      this.min.hours(0);
      this.min.seconds(0);
      this.min.milliseconds(0);
      this.min.minutes(0);

      if (this.selectedMoment !== null && (this.selectedMoment.valueOf() < this.min.valueOf()) && this.dateInput.nativeElement.value.length === 10 && this.pickerType === 'calendar'
        && moment(this.dateInput.nativeElement.value, "MM/DD/YYYY", true).isValid() || !new Date()) {

        this.pastError = true;
      }
      else if(this.selectedMoment !== null && (this.selectedMoment.valueOf() < this.min.valueOf()) && this.dateInput.nativeElement.value.length === 16 && this.pickerType === 'both'
        && moment(this.dateInput.nativeElement.value, "MM/DD/YYYY", true).isValid() || !new Date()){
        this.pastError = true;
      }

      else {
        this.pastError = false;
      }
    }


    /*
   *
   * Past is allowed
   * - min: 01/01/1900
   *
   *
   * if: selectedMoment is not null
    *     and
    *     the min value is greater than selectedMoment and the length is 10 (we have finished to write the date)
    *     and
    *     the type of datepicker is 'calendar' (only the date)
    *     and this date is valid (has the correct format)
    *     or is not today (to can select the today's day)
    *     isMinInvalid is true
    *
    *  if: the same condition but with the type 'both' (with hours) and the length is 16 (we have finished to write the date)
    *      isMinInvalid is true
   *
   * else: not min error
   *
   * */


    if (this.allowPast) {
      if (this.selectedMoment !== null && (this.selectedMoment.valueOf() < this.min.valueOf() && this.dateInput.nativeElement.value.length === 10 && this.pickerType === 'calendar' && moment(this.dateInput.nativeElement.value, "MM/DD/YYYY", true).isValid() || !new Date())){
        this.isMinInvalid = true;


      }

      else if(this.selectedMoment !== null && (this.selectedMoment.valueOf() < this.min.valueOf() && this.dateInput.nativeElement.value.length === 16 && this.pickerType === 'both' && moment(this.dateInput.nativeElement.value, "MM/DD/YYYY HH:mm", true).isValid()|| !new Date())){
        this.isMinInvalid = true;
      }

      else {
        this.isMinInvalid = false;

      }
    }


    /*
    * Max error
    * if: selectedMoment is not null and the max value is smaller than selectedMoment and the length is 10 (we have finish to write the date)
    *     or not is today
    *     max error = true
    *
    * else: not error
    *
    * */

    if (this.selectedMoment !== null && (this.selectedMoment.valueOf() > this.max.valueOf() && this.dateInput.nativeElement.value.length === 10 && moment(this.dateInput.nativeElement.value, "MM/DD/YYYY", true).isValid() || !new Date()))
    {
      this.isMaxInvalid = true;
    }

    else if(this.selectedMoment !== null && (this.selectedMoment.valueOf() > this.max.valueOf() && this.dateInput.nativeElement.value.length === 16 && moment(this.dateInput.nativeElement.value, "MM/DD/YYYY HH:mm", true).isValid() || !new Date())){
      this.isMaxInvalid = true;
    }
    else {
      this.isMaxInvalid = false;

    }

  }

  valueChange(e) {
    if (this.continuosEvaluation) {
      this.refreshDateErrors();
    }

  }

  //add days functions
  addDays(days: number) {
    //date is the actual date as moment object
    let date = this.getDateAsMoment();

    //current date is 'date' if is null we create a date as a moment object (today's day)
    let currDate = date ? date : moment();

    // targ: we add to the current date the 'days' that we pass on the new call record in day unit
    let targ = moment(currDate).add(days, 'day');

    //the selected moment is the the sum
    this.selectedMoment = targ;

    //refresh if has errors the date
    this.refreshDateErrors();

  }

  clear() {
    this.clearErrors();
    this.dateInput.nativeElement.value = "";
    this.selectedMoment = null;


  }

  private clearErrors() {
    this.isInvalidFormat = false;
    this.mandatoryError = false;
    this.isMinInvalid = false;
    this.isMaxInvalid = false;
    this.pastError = false;
    this.isInvalidHourFormat = false;

  }

  //empty function
  isEmpty(): boolean {
    return this.dateInput.nativeElement.value === "" && this.selectedMoment === null;
  }

  //validate the min pipe
  setMinDate(min): Date {
    if (min != null && this.min.isValid()) {
      this.min = min;
      return new Date(min);
    }

  }

  //validate the max pipe
  setMaxDate(max): Date {
    if (max != null && this.max.isValid()) {
      this.max = max;
      return new Date(max);
    }
  }


  //we have to know if have errors
  hasErrors(): boolean {
    return this.mandatoryError || this.isInvalidFormat || this.isMinInvalid || this.isMaxInvalid || this.pastError || this.isInvalidHourFormat;

  }

  //return the date
  getDate(): Date {
    if (this.selectedMoment !== null) {
      return this.selectedMoment.toDate();
    } else {
      return this.selectedMoment = null;
    }
  }


  //return the string element in the input
  getInputDate(): string {
    return this.dateInput.nativeElement.value;
  }


  set inputDate(value:string){
    this.dateInput.nativeElement.value = value;
  }

  //return the date as a moment object
  getDateAsMoment(): Moment {

    return this.selectedMoment;
  }

  setDate(dt: Moment) {
    this.selectedMoment = dt;
    this.refreshDateErrors();
  }




  /*
  *
  * Getter errors and setter errors
  *
  * */

  get isMinError(): boolean {
    return this.isMinInvalid;
  }

  set isMinError(value:boolean){
    this.isMinInvalid = value;
  }

  set isMaxError(value:boolean){
    this.isMaxInvalid = value;
  }


  get isMaxError(): boolean {
    return this.isMaxInvalid;
  }

  set isMandatoryError(value:boolean){
    this.mandatoryError = value;
  }

  get isMandatoryError(): boolean {
    return this.mandatoryError;

  }

  set isInvalidFormatError(value:boolean){
    this.isInvalidFormat = value;
  }

  get isInvalidFormatError() {
    return this.isInvalidFormat;
  }

  set isInvalidHourFormatError(value:boolean){
    this.isInvalidHourFormat = value;
  }

  get isInvalidHourFormatError():boolean{
    return this.isInvalidHourFormat;
  }

  set isPastError(value:boolean){
    this.pastError = value;
  }
  get isPastError() {
    return this.pastError;
  }


}
