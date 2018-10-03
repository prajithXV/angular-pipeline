import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {OverallProductivityRecord} from "../../models/overall-productivity-record";
import {DataService} from "../../services/data.service";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {CollectorsProductivityReportCriteria} from "../collectors-productivity-report/collectors-productivity-report.component";

@Component({
  selector: 'overall-productivity-report',
  templateUrl: './overall-productivity-report.component.html',
  styleUrls: ['./overall-productivity-report.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OverallProductivityReportComponent implements OnInit {
  productivityRecords: OverallProductivityRecord[] = null;
  searching = false;

  constructor(private _dataService: DataService, private _userFeedbackService: UserFeedbackService) { }

  ngOnInit() {
  }

  searchData(criteria: CollectorsProductivityReportCriteria) {
    this.searching = true;
    this._dataService.getOverallProductivity(criteria.from, criteria.to)
      .then(data => {this.productivityRecords = data; this.searching = false;})
      .catch(err => {
        this._userFeedbackService.handleError("Error getting report data", err);
        this.searching = false;
      });
  }
}
