import { Component, OnInit } from '@angular/core';
import {CollectorProductivityRecord} from "../../models/collector-productivity-record";
import {DataService} from "../../services/data.service";
import {UserFeedbackService} from "../../services/user-feedback.service";



export class CollectorsProductivityReportCriteria {
  from: Date;
  to: Date;
}

@Component({
  selector: 'collectors-productivity-report',
  templateUrl: './collectors-productivity-report.component.html',
  styleUrls: ['./collectors-productivity-report.component.css']
})
export class CollectorsProductivityReportComponent implements OnInit {
  productivityRecords: CollectorProductivityRecord[] = null;
  searching = false;

  constructor(private _dataService: DataService, private _userFeedbackService:UserFeedbackService) { }

  ngOnInit() {
  }


  searchData(criteria: CollectorsProductivityReportCriteria) {
    this.searching = true;
    this._dataService.getCollectorsProductivity(criteria.from)
      .then(data => {this.productivityRecords = data; this.searching = false;})
      .catch(err => {
        this._userFeedbackService.handleError("Error getting report data", err);
        this.searching = false;
      });
    console.log(this.searching);
  }


}
