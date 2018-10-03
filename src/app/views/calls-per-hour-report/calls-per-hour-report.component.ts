import {Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {DataService} from "../../services/data.service";
import {CallsPersHour} from "../../models/callsPersHour";
import {SearchCallsPerHourCriteriaParams} from "../../models/search-calls-per-hour-criteria-params";
import {Campaign} from "../../models/campaign";


@Component({
  selector: 'calls-per-hour-report',
  templateUrl: './calls-per-hour-report.component.html',
  styleUrls: ['./calls-per-hour-report.component.css']
})
export class CallsPerHourReportComponent implements OnInit {

  private table: Array<{ name: string, campaign: CallsPersHour }> = [];
  private callsPerHour: CallsPersHour[];
  private clCurrentParams: SearchCallsPerHourCriteriaParams = null;
  private searchingCallsPerHourData: boolean = false;
  private isTableVisible = false;
  private campaigns: Campaign[];


  constructor(private _dataService: DataService) {
  }

  ngOnInit() {
    //load the campaigns
    this._dataService.getGlobalCampaigns().then(cps => {
      this.campaigns = cps;
    })


  }


  //View Report button
  /* First Part:
  * - it needs the filter params that we have pass in the emit
  * - we need a bool to know if we will show the waiting backend (loading icon)
  * - call to dataservice and we create an array to change the campaignName (only we have the code)
  * */
  onViewCallsData(params: SearchCallsPerHourCriteriaParams = null) {
    if (params) {
      this.clCurrentParams = params.clone();
    }
    this.searchingCallsPerHourData = true;
    this.callsPerHour = [];
    this.table = [];
    this._dataService.getCallsPersHour(this.clCurrentParams).then(res => {
      this.callsPerHour = res;

      for (let record of res) {
        let c = record.campaignCode;

        // If the campaign is not found, use the code from the record
        let cpg: Campaign = this.campaigns.find(cmp => cmp.code == c);

        // Create new object: it has the name in the good format (not repeat names), and all the object
        let tableData = {
          name: cpg ? cpg.name : c,
          campaign: record
        };
        //push it with the good format on the object to write on the html table
        this.table.push(tableData);
      }

      // sort by hour if the hours are different, if not sort by name
      this.table.sort(function (a, b) {
        if (a.campaign.hour != b.campaign.hour) {
          return a.campaign.hour - b.campaign.hour;
        }
        return a.name > b.name ? 1 : -1;
      });

      /*waiting backend = false and the table is visible*/
      this.searchingCallsPerHourData = false;
      this.isTableVisible = true;

    }).catch(err => {
      // TODO: manage error
      console.log("Error retrieveing campaign list accounts");
      console.log(err);
    });
  }
}
