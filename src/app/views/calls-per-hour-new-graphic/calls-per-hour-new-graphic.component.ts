import {Component, Input, OnInit} from '@angular/core';
import {GraphicFunctions} from "../../general/graphic-functions";
import {CallsPersHour} from "../../models/callsPersHour";
import {Campaign} from "../../models/campaign";

@Component({
  selector: 'calls-per-hour-new-graphic',
  templateUrl: './calls-per-hour-new-graphic.component.html',
  styleUrls: ['./calls-per-hour-new-graphic.component.css']
})
export class CallsPerHourNewGraphicComponent implements OnInit {
  @Input() searchingData: boolean;
  @Input() visibleTable: boolean;
  @Input() callsPerHour: CallsPersHour[];
  @Input() campaigns: Campaign[];


  options = {
    legend: {
      display: true,
    },
    elements: {
      line: {
        tension: 0,
      }
    },
    responsive: true
  };


  chartData: Array<{ label: string, data: Array<any> }> = [];

  lineColors = [
    {
      backgroundColor: 'rgba(35,147,239,0)',
      borderColor: 'rgba(35,147,239,0.75)',
      pointBackgroundColor: 'rgba(35,147,239,1)',
      pointBorderColor: 'rgba(35,147,239)',
    },
    {
      backgroundColor: 'rgba(69,67,74,0)',
      borderColor: 'rgba(69,67,74,0.75)',
      pointBackgroundColor: 'rgba(69,67,74,1)',
      pointBorderColor: 'rgba(69,67,74)',
    },

    {
      backgroundColor: 'rgba(92,255,120,0)',
      borderColor: 'rgba(92,255,120,0.75)',
      pointBackgroundColor: 'rgba(92,255,120,1)',
      pointBorderColor: 'rgba(92,255,120)',
    },
    {
      backgroundColor: 'rgba(255,164,78,0)',
      borderColor: 'rgba(255,164,78,0.75)',
      pointBackgroundColor: 'rgba(255,164,78,1)',
      pointBorderColor: 'rgba(255,164,78)',
    },
    {
      backgroundColor: 'rgba(139,101,237,0)',
      borderColor: 'rgba(139,101,237,0.5)',
      pointBackgroundColor: 'rgba(139,101,237)',
      pointBorderColor: 'rgba(139,101,237)',
    }
  ];


  labels = [ '0 AM','1 AM','2 AM','3 AM','4 AM','5 AM','6 AM','7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM',
    '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'];
  labelsArray = [];

  constructor() {
  }

  ngOnInit() {
  }


  ngOnChanges(changes) {
    if (changes.callsPerHour) {
      if (this.callsPerHour) {
        this.getCorrectLabels();
        this.getCallsPerHourNewGraphic();
      }
    }
  }

  private getCallsPerHourNewGraphic() {
    this.chartData = [];
    for (let record of this.callsPerHour) {
      let c = record.campaignCode;

      // If the campaign is not found, use the code from the record
      let cpg: Campaign = this.campaigns.find(cmp => cmp.code == c);

      // //new object to put good the name
      let tableData = {
        name: cpg ? cpg.name : c,
        campaign: record
      };

      // this.sort = this._sortName.transform(this.campaigns, tableData.campaign.campaignCode);
      //   console.log(this.sort);
      /*Second Part:
      * Search series in the options (graphic options from highcharts)
      * - if has the same campaignName
      *   it has found and push 'Total' to correspondent hour position
      *
      * - it calls getDate function to transform the hour, it need to be the same to the categories graphic options
      *
      *
      * */
      let index = null;
      for (let j in this.chartData) {
        if (this.chartData[j].label === tableData.name) {
          index = j;
          break;
        }
      }
      if (index !== null) {
        //mirar hora
        this.chartData[index].data[this.getIndexForRecord(record)] = record.total;
      }
      /*- If not:
      *   push it to the array options (graphic options) with its campaign name plus
      *   an array with '0' if there not an hour --> it puts in the last place with its correspondent hour position
      *
      * */
      else {
        this.chartData.push({
          label: tableData.name,
          data: GraphicFunctions.generateNull(this.labelsArray),
        });

        this.chartData[this.chartData.length - 1].data[this.getIndexForRecord(record)] = record.total;
      }
    }

  }


  private getCorrectLabels() {
    this.labelsArray = [];

    let minMaxHour = this.getMinMaxHour();
    for (let i = minMaxHour.min; i <= minMaxHour.max; ++i) {
      this.labelsArray.push(this.labels[i]);
    }
  }

  private getMinMaxHour() {
    let hours = {
      min: 8,
      max: 17
    };
    for (let record of this.callsPerHour) {
      if (record.hour < hours.min) {
        hours.min = record.hour;
      }
      if (record.hour > hours.max) {
        hours.max = record.hour;
      }
    }
    return hours;
  }



  private getIndexForRecord(record: CallsPersHour) {
    return this.labelsArray.indexOf(GraphicFunctions.getDate(record.hour));
  }

}


