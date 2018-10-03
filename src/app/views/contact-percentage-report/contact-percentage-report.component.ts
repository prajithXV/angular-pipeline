import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Campaign} from "../../models/campaign";
import {DataService} from "../../services/data.service";
import {ContactPercentage} from "../../models/contact-percentage";
import {SearchContactPercentageCriteriaParams} from "../../models/search-contact-percentage-criteria-params";
import {CoinDateInputComponent} from "../coin-date-input/coin-date-input.component";

@Component({
  selector: 'contact-percentage-report',
  templateUrl: './contact-percentage-report.component.html',
  styleUrls: ['./contact-percentage-report.component.css']
})
export class ContactPercentageReportComponent implements OnInit {
  private table: Array<{ name: string, campaign: ContactPercentage }> = [];
  private contactPercentage: ContactPercentage[];
  private clCurrentParams: SearchContactPercentageCriteriaParams = null;
  private searchingCallsPerHourData: boolean = false;
  private isTableVisible = false;
  private campaigns: Campaign[];
  private campaignName: string = null;
  @ViewChild('fromDate') private _fromDt: CoinDateInputComponent;

  private Options = {
    title: {text: 'Total Calls Per Campaign by Hour'},
    series: [],
    xAxis: [{
      categories: ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'],
      crosshair: true,
    }],
    yAxis: [{
      title: {text: 'Total'}
    }]
  };

  constructor(private _dataService: DataService) {
  }

  ngOnInit() {

    this._dataService.getGlobalCampaigns().then(cps => {
      this.campaigns = cps;
    });
  }


  //View Report button
  /* First Part:
  * - it needs the filter params that we have pass in the emit
  * - we need a bool to know if we will show the waiting backend (loading icon)
  * - call to dataservice and we create an array to change the campaignName (only we have the code)
  * */
  onViewContactData(params: SearchContactPercentageCriteriaParams = null) {
    if (params) {
      this.clCurrentParams = params.clone()
    }
    this.searchingCallsPerHourData = true;
    this.contactPercentage = [];
    this.table = [];
    this._dataService.getContactPercentage(this.clCurrentParams).then(res => {

      //need it to pass to contactPercentage graphic
      this.contactPercentage = res;

      //need it to the contact percentage table
      for (let record of res) {
        let c = record.campaignCode;

        // If the campaign is not found, use the code from the record
        let cpg: Campaign = this.campaigns.find(cmp => cmp.code == c);

        // //new object to put good the name
        let tableData = {
          name: cpg ? cpg.name : c,
          campaign: record
        };

        this.table.push(tableData);
      }

      //sort and create an order to the table
      this.table.sort(function (a, b) {
        if (a.campaign.hour != b.campaign.hour) {
          return a.campaign.hour - b.campaign.hour;
        }
        return a.name > b.name ? 1 : -1;
      });

      /*waiting backend = false and the table is visible
      *
      * */
      this.searchingCallsPerHourData = false;
      this.isTableVisible = true;
    })

  }

}
