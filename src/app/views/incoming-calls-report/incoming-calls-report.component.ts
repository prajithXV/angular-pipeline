import {Component, OnInit, ViewChild} from '@angular/core';
import {IncomingCalls} from "../../models/incomingCalls";
import {SearchCallsIncomingCallsCriteriaParams} from "../../models/search-incoming-calls-criteria-params";
import {CoinDateInputComponent} from "../coin-date-input/coin-date-input.component";
import {DataService} from "../../services/data.service";
import {CallsPersHour} from "../../models/callsPersHour";

@Component({
  selector: 'incoming-calls-report',
  templateUrl: './incoming-calls-report.component.html',
  styleUrls: ['./incoming-calls-report.component.css']
})
export class IncomingCallsReportComponent implements OnInit {
  private searchingCallsPerHourData:boolean = false;
  private isTableVisible:boolean;
  private incomingCalls: IncomingCalls[];

  private clCurrentParams: SearchCallsIncomingCallsCriteriaParams = null;
  @ViewChild('fromDate') private _fromDt: CoinDateInputComponent;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
  }


  //View Report button
  /* First Part:
  * - it needs the filter params that we have pass in the emit
  * - we need a bool to know if we will show the waiting backend (loading icon)
  * - call to dataservice and we create an array to change the campaignName (only we have the code)
  * */
  onViewIncomingCalls(params: SearchCallsIncomingCallsCriteriaParams = null){
    if(params){
      this.clCurrentParams = params.clone();
    }
    this.incomingCalls = [];
    this.searchingCallsPerHourData = true;
    this._dataService.getIncomingCalls(this.clCurrentParams).then(res =>{
      this.incomingCalls = res;

      //sort by hour
      if(this.incomingCalls != null){
        this.incomingCalls.sort(function (a, b) {
          return a.hour - b.hour;
        });
      }


      this.searchingCallsPerHourData = false;
      this.isTableVisible = true;

    }).catch(err => {
      // TODO: manage error
      console.log("Error retrieveing campaign list accounts");
      console.log(err);
    });

  }
}


