import {
  ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild
} from '@angular/core';
import {SearchCallsPerHourCriteriaParams} from "../../models/search-calls-per-hour-criteria-params";
import {DataService} from "../../services/data.service";
import {CallsPersHour} from "../../models/callsPersHour";
import {Campaign} from "../../models/campaign";
import {DatepickerComponent} from "../datepicker/datepicker.component";



@Component({
  selector: 'calls-per-hour-criteria',
  templateUrl: './calls-per-hour-criteria.component.html',
  styleUrls: ['./calls-per-hour-criteria.component.css']
})



export class CallsPerHourCriteriaComponent implements OnInit {
  @Output() onViewReport = new EventEmitter<SearchCallsPerHourCriteriaParams>();
  @Input() visibleTable: boolean;
  @Input() campaigns: Campaign[] = null;
  @Input() callsPerHour: CallsPersHour[];
  @Input() showCampaign: boolean = true;
  @Input() searchingCallsPerHourData: boolean = true;
  @ViewChild('startDate') private _fromDt: DatepickerComponent;
  private campaignCode: string = null; //html ngmodel --> campaign name
  private reportCriteria: SearchCallsPerHourCriteriaParams = new SearchCallsPerHourCriteriaParams();

  constructor(private _dataService: DataService, private _cdr: ChangeDetectorRef) {}

  ngOnInit() {
    //load the campaigns on the select (search criteria)
    for (let i in this.campaigns) {
      this.campaigns[i].name = this.campaignCode;
    }
  }


  // ngAfterViewInit() {
    // let dt = new Date();
    // this._fromDt.setDate(dt);
    // Needed due to an issue with Angular 4
    // this._cdr.detectChanges();
  // }


  //emit the view report button with the filters
  viewReport() {
    if(this.showCampaign === false){
      this.reportCriteria.CampaignCd = null;
    }else{
      this.reportCriteria.CampaignCd = this.campaignCode;

    }
    this.reportCriteria.StartDate = this._fromDt.getDate();
    this.onViewReport.emit(this.reportCriteria);
    console.log(this.reportCriteria);

  }

  //the button is disabled if the user not have selected a date
  private hasDateErrors(){
    return this._fromDt.hasErrors();
  }



}
