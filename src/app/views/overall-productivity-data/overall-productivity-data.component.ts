import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {OverallProductivityRecord} from "../../models/overall-productivity-record";

@Component({
  selector: 'overall-productivity-data',
  templateUrl: './overall-productivity-data.component.html',
  styleUrls: ['./overall-productivity-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OverallProductivityDataComponent implements OnInit {
  @Input() records: OverallProductivityRecord[];
  @Input() searching: boolean = false;

  private fldTotal = (rec: OverallProductivityRecord) => rec.total;
  private fldContact = (rec: OverallProductivityRecord) => rec.contact;
  private fldPaymentReceived = (rec: OverallProductivityRecord) => rec.paymentReceived;
  private fldPromises = (rec: OverallProductivityRecord) => rec.promises;
  private fldContactPercentage = (rec: OverallProductivityRecord) => rec.contactPercentage;
  private promiseToContactPercentage = (rec: OverallProductivityRecord) => rec.promiseToContactPercentage;

  constructor() { }

  ngOnInit() {
  }

  private sum(func: (rec: OverallProductivityRecord) => number): number {
    if (!this.records.length || this.records.length == 0) {
      return 0;
    }
    return this.records.reduce(((prev, r) => isNaN(func(r)) ? 0 : prev + func(r)), 0);
  }

  private avg(func: (rec: OverallProductivityRecord) => number): number {
    if (!this.records.length || this.records.length == 0) {
      return 0;
    }
    return this.sum(func) / this.records.length;
  }
}
