import {Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Campaign} from "../../models/campaign";
import {DataService} from "../../services/data.service";
import {Pagination} from "../../models/pagination";
import {CampaignList} from "../../models/campaign-list";
import {CampaignListRecord} from "../../models/campaign-list-record";
import {CampaignListOrderByType} from "../../models/cl-order-by-type";

@Component({
  selector: 'manage-campaigns-page',
  templateUrl: './manage-campaigns-page.component.html',
  styleUrls: ['./manage-campaigns-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManageCampaignsPageComponent implements OnInit {
  private campaigns: Campaign[] = null;
  private searchCampaigns: boolean = false;


  private currentCampaign: Campaign = null;
  private currentList: CampaignList = null;
  private currentHoverList: CampaignList = null;

  @Output() onRefresh = new EventEmitter<any>();
  //to can use refresh records function
  @ViewChild('records') private _records;


  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.loadCampaigns();

  }

  private loadCampaigns() {
    this.searchCampaigns = true;
    this._dataService.getGlobalCampaigns()
      .then(cp => {
        this.campaigns = cp;
        this.searchCampaigns = false;
      })
      // TODO errors
      .catch(e => console.log(e))
  }




  private onSelectCampaign(cp: Campaign) {
    this.currentCampaign = cp;
    this.currentList = null;
  }

  private onSelectList(cpl: CampaignList) {
    this.currentList = cpl;
  }

  private onHoverList(cpl: CampaignList) {
    this.currentHoverList = cpl;
  }

  //refresh records
  refreshCampaignListRecords(){
    this._records.refreshRecords();
  }

}
