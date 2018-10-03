import {
  AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output,
  ViewChild
} from '@angular/core';
import {CollectorsProductivityReportCriteria} from "../collectors-productivity-report/collectors-productivity-report.component";
import {CoinDateInputComponent} from "../coin-date-input/coin-date-input.component";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import * as moment from 'moment';
import {Moment} from "moment";

const DaysToMillisFactor = 1000 * 60 * 60 * 24;

@Component({
  selector: 'collectors-productivity-criteria',
  templateUrl: './collectors-productivity-criteria.component.html',
  styleUrls: ['./collectors-productivity-criteria.component.css']
})
export class CollectorsProductivityCriteriaComponent implements OnInit, AfterViewInit {
  @Input() showEndDate: boolean = true;
  @Input() searching: boolean = false;
  @Output() onSubmit = new EventEmitter<CollectorsProductivityReportCriteria>();

  @ViewChild('fromDate') private _fromDt: DatepickerComponent;
  @ViewChild('toDate') private _toDt: DatepickerComponent;

  constructor(private _cdr: ChangeDetectorRef) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // let dt = new Date();
    // this._fromDt.setDate(dt);
    // if (this.showEndDate) {
    //   this._toDt.setDate(dt);
    // }
    // // Needed due to an issue with Angular 4
    this._cdr.detectChanges();
  }




  hasDateErrors(): boolean {

    if (this.showEndDate && this._fromDt) {

      return this._fromDt.hasErrors() || this._toDt.hasErrors()
    }
    else if (!this.showEndDate) {
      return this._fromDt.hasErrors()
    }
  }


  canSubmit(): boolean {
    if (!this._fromDt) {
      return false;
    }
    if (this.showEndDate && !this._toDt) {
      return false;
    }
    return !this.hasDateErrors()

  }


  getFromDate(): Moment {
    if (this._fromDt != null || this._toDt != null) {
      return this._fromDt.getDateAsMoment();
    }
  }


  getToDate(): Moment{

    if (this._toDt !=null) {
      return this._toDt.getDateAsMoment();
    }
  }


  submit() {
    // Use next day for to date
    this.onSubmit.emit({
      from: this._fromDt.getDate(),
      to: this.showEndDate ? new Date(this._toDt.getDate().getTime() + DaysToMillisFactor) : undefined

    });
  }
}
