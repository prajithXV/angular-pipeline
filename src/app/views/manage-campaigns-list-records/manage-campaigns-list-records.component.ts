import {Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {CampaignListRecord} from "../../models/campaign-list-record";
import {CampaignList} from "../../models/campaign-list";
import {Pagination} from "../../models/pagination";
import {DataService} from "../../services/data.service";
import {Code} from "../../models/code";
import {SortOrder} from "../../models/sort-order";


@Component({
  selector: 'manage-campaign-list-records',
  templateUrl: './manage-campaigns-list-records.component.html',
  styleUrls: ['./manage-campaigns-list-records.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManageCampaignListRecordsComponent implements OnInit, OnChanges {
  @Input() list: CampaignList = null;

  private records: CampaignListRecord[];
  private searching: boolean = false;
  private statuses: Code[] = null;

  private pagination: Pagination = new Pagination(0, 15);
  private selectedStatus: Code = null;
  private visibles = {};
  private searchingRecordHistory: string[] = [];
  private sort: SortOrder = new SortOrder();
  private sortDirection: number;


  constructor(private _dataService: DataService) {
  }

  ngOnInit() {

    this._dataService.getCampaignListRecordStatusCodes().then(codes => this.statuses = codes);

  }

  // sortTable(sortType){
  //   this.sort.sortType = sortType;
  //   this.sort.isDesc = !this.sort.isDesc;
  //   this.sortDirection = this.sort.isDesc ? 1 : -1;
  //   this.pagination.currPage = 0;
  //   this.loadCampaignListRecords();
  // }

  ngOnChanges(changes) {
    if (changes.list) {
      if (this.list) {
        this.pagination.currPage = 0;
        this.visibles = {};
        // this.sort.sortType = null;
        // this.sort.isDesc = null;
        this.loadCampaignListRecords();
      } else {
        this.records = null;
      }
    }
  }

  private loadCampaignListRecords() {
    this.records = null;
    this.searching = true;
    // console.log(this.sort);
    this._dataService.getCampaignListRecords(this.list, this.selectedStatus, this.pagination)
      .then(cp => {
        this.records = cp;
        this.searching = false;
      })
      // TODO errors
      .catch(e => console.log(e))
  }

  private incPage(increment = 1) {
    this.pagination.currPage += increment;
    this.visibles = {};
    this.loadCampaignListRecords();
  }

  private statusChange() {
    this.visibles = {};
    this.pagination.currPage = 0;
    this.loadCampaignListRecords();

  }

  //refresh campaign list records
  refreshRecords(){
    this.loadCampaignListRecords();
  }

  //click in arrow
  private toggleDetail(cpr: CampaignListRecord) {
    // If no records history loaded, load them
    if (!cpr.campaignRecordHistory) {
      this.searchingRecordHistory.push(cpr.accountId);
      this._dataService.loadCampaignRecordHistory(cpr).then(rh => {

        let index = this.searchingRecordHistory.indexOf(cpr.accountId);
        this.searchingRecordHistory.splice(index, 1);

        }
      ).catch(e => console.log(e));
    }
    this.visibles["id" + cpr.accountId] = !this.visibles["id" + cpr.accountId];
  }


  //table visible
  private isDetailVisible(cpr: CampaignListRecord) {
    return this.visibles["id" + cpr.accountId];
  }


  private searchCampaigns(cpr: CampaignListRecord): boolean {
    return this.searchingRecordHistory.indexOf(cpr.accountId) > -1;
  }


}
