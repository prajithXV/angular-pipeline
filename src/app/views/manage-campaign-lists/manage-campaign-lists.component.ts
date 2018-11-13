import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {CampaignList} from "../../models/campaign-list";
import {Campaign, inProgressStatus, pausedStatus} from "../../models/campaign";
import {Pagination} from "../../models/pagination";
import {DataService} from "../../services/data.service";
import {CampaignListCodeNew, Code} from "../../models/code";
import {CampaignAttribute} from "../../models/campaign-attribute";
import {GlobalStateService} from "../../services/global-state.service";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {CampaignListAttribute} from "../../models/campaign-list-attribute";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {AttributeType} from "../../models/attribute";
import {CampaignListOrderByType} from "../../models/cl-order-by-type";
import {SortOrder} from "../../models/sort-order";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

export class CLOrder {
  code: string;
  ascending: boolean;
}

@Component({
  selector: 'manage-campaign-lists',
  templateUrl: './manage-campaign-lists.component.html',
  styleUrls: ['./manage-campaign-lists.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManageCampaignListsComponent implements OnInit, OnChanges {
  @Input() campaign: Campaign;
  @Input() currentList: CampaignList = null;
  @Input() currentHoverList: CampaignList = null;

  @Output() onListSelection = new EventEmitter<CampaignList>();
  @Output() onHoverSelection = new EventEmitter<CampaignList>();
  @Output() onRefreshCampaignListRecords = new EventEmitter<CampaignList>();


  @Output() onPage = new EventEmitter<number>();

  private lists: CampaignList[] = null;
  private searching: boolean = false;
  private searchingClOrderByTypes: boolean = false;

  private statuses: Code[] = null;
  private CodeNew = CampaignListCodeNew;

  private pagination: Pagination = new Pagination(0, 5);
  private selectedStatus: Code = null;
  campaignListOrderByTypes: CampaignListOrderByType[] = null;

  private visibles = {};

  private _attributeValues = {};

  private isCreating = false;

  private waitForCreate = false;
  private waitForLaunch = false;
  private closeResult: string = "";

  private currentOrder: CLOrder = null;

  constructor(private _dataService: DataService,
              private _globalStateService: GlobalStateService,
              private _userFeedbackService: UserFeedbackService,
              private _datePipe: CoinDateTransformPipe,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this._dataService.getCampaignListStatusCodes().then(codes => this.statuses = codes);

  }

  get pausedStatus():string{
    return pausedStatus;
  }

  get inProgressStatus(): string{
    return inProgressStatus;
  }

  canEditStatus(cpl: CampaignList): boolean{
    return cpl.statusCode == this.inProgressStatus || cpl.statusCode == this.pausedStatus;
  }

  ngOnChanges(changes) {
    if (changes.campaign) {
      if (this.campaign) {
        this.pagination.currPage = 0;
        this.loadCampaignLists();
      } else {
        this.lists = null;
      }
      this.isCreating = false;
    }
  }

  loadClOrderByTypes(campaignType: string){
    this.campaignListOrderByTypes = [];
    this.searchingClOrderByTypes = true;
    this._dataService.getClOrderByTypes(campaignType).then(res=>{
      if (res.length > 0) {
        this.currentOrder.code = res[0].code;
      }
      this.campaignListOrderByTypes = res;
      this.searchingClOrderByTypes = false;
    }).catch(err=>{
      console.log("Error retrieving campaign list order by types");
      console.log(err);
      this.searchingClOrderByTypes = false;
    })
  }

  private loadCampaignLists() {
    this.lists = null;
    this.searching = true;
    this.visibles = {};
    this._dataService.getCampaignLists(this.campaign, this.selectedStatus, this.pagination)
      .then(cp => {
        this.lists = cp;
        this.searching = false;
      })
      // TODO errors
      .catch(e => console.log(e))
  }

  private incPage(increment = 1) {
    this.pagination.currPage += increment;
    this.loadCampaignLists();
  }

  private selectList(c: CampaignList) {
    this.onListSelection.emit(c);
  }

  private hoverList(c: CampaignList) {
    this.onHoverSelection.emit(c);
  }

  private statusChange() {
    this.loadCampaignLists();
    // Unselect the current campaign
    this.pagination.currPage = 0;
    this.onListSelection.emit(null);
  }

  openOrderModal(cpl: CampaignList, content) {
    // Set new Order
    this.currentOrder = {code: "", ascending: true};
    // Open modal
    this.openModal(content);
    // Load order codes in parallel
    this.loadClOrderByTypes(cpl.campaignType);
  }

  openModal(content){
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  saveOrder(campaignList: CampaignList){
    this._dataService.addOrderBy(campaignList, this._globalStateService.loggedAgent, this.currentOrder.code, this.currentOrder.ascending).then(()=>{
      this._userFeedbackService.handleSuccess("New order added");
      this.loadCampaignLists();
      this.onRefreshCampaignListRecords.emit(campaignList);

    }).catch(err=>{
      this._userFeedbackService.handleError("Error adding new order");
      console.log(err);
    })
  }

  updateStatus(campaignList: CampaignList, newStatus: string){
    campaignList.statusCode = newStatus;
    this._dataService.updateCLStatus(campaignList, this._globalStateService.loggedAgent).then(()=>{
      this._userFeedbackService.handleSuccess("status updated");
      this.loadCampaignLists();
    }).catch(err=>{
      this._userFeedbackService.handleError("Error updating status");
      console.log(err);
    })
  }


  private toggleDetail(cpl: CampaignList) {
    // If no stats loaded, load them
    if (!cpl.statistics) {
      this._dataService.loadCampaignListStatistics(cpl).then(st => {
        }
      );
    }
    this.visibles["id" + cpl.id] = !this.visibles["id" + cpl.id];
  }

  private isDetailVisible(cpl: CampaignList) {
    return this.visibles["id" + cpl.id];
  }

  private newList() {
    this.isCreating = true;
    this._attributeValues = {};
  }

  private cancelNew() {
    this.isCreating = false;
    this._attributeValues = {};
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  private createCampaign() {
    this.waitForCreate = true;
    let atts: { code: string, values: any[], isArray: boolean }[] = [];
    for (let at in this._attributeValues) {
      // If no attributes, don't send
      if (this._attributeValues[at].length == 0) {
        continue;
      }
      // If no corresponding campaign attribute, don't send
      let catt: CampaignAttribute = this.getCorrespondingCampaignAttributeByCode(at);
      if (catt == null) {
        continue;
      }
      atts.push({code: at, values: this._attributeValues[at], isArray: catt.isArray});
    }
    this._dataService.createCampaignList(
      this.campaign,
      this._globalStateService.loggedAgent,
      // TODO: Upload id for the moment hardcoded
      1,
      atts)
      .then(cod => {
        console.log("Campaign created: " + cod);
        this.loadCampaignLists();
        this.cancelNew();
        this._userFeedbackService.handleSuccess("Campaign created");
        this.waitForCreate = false;
      })
      .catch(e => {
        var msg = null;
        try {
          msg = e.json().Message;
        } catch (err) {
        }
        this._userFeedbackService.handleError(`Error creating the campaign${msg ? ': ' + msg : ''}`);
        this.waitForCreate = false;
      });
  }

  private getAttributeValues(ca: CampaignAttribute): string[] {
    return this.getAttributeValuesByCode(ca.code);
  }

  private getAttributeValuesByCode(cd: string): string[] {
    let atv = this._attributeValues[cd];
    if (atv == undefined) {
      atv = [];
      this._attributeValues[cd] = atv;
    }
    return atv;
  }

  private addAttribute(ca: CampaignAttribute, val: string) {
    this.addAttributeByCode(ca.code, val, ca.isArray);
  }

  private addAttributeByCode(cd: string, val: string, appendValue = true) {
    if (!appendValue) {
      this.getAttributeValuesByCode(cd).length = 0;
    }
    this.getAttributeValuesByCode(cd).push(val);
  }

  private removeAttribute(ca: CampaignAttribute, val: string) {
    this._attributeValues[ca.code] = this._attributeValues[ca.code].filter(v => v != val);
  }

  private launch(cpl: CampaignList) {
    this.waitForLaunch = true;
    this._dataService.launchCampaignList(cpl, this._globalStateService.loggedAgent)
      .then(res => {
        this.loadCampaignLists();
        console.log("Campaign launched: " + res);
        this._userFeedbackService.handleSuccess("Campaign launched");
        this.waitForLaunch = false;
      })
      .catch(e => {
        var msg = null;
        try {
          msg = e.json().Message;
        } catch (e) {
        }
        this._userFeedbackService.handleError(`Error launching the campaign${msg ? ': ' + msg : ''}`);
        this.waitForLaunch = false;
      });
  }

  private getCorrespondingCampaignAttributeByCode(code: string): CampaignAttribute {
    return this.campaign.attributes.find(cat => cat.code == code);
  }

  private getCorrespondingCampaignAttribute(clattr: CampaignListAttribute): CampaignAttribute {
    return this.getCorrespondingCampaignAttributeByCode(clattr.code);
  }

  private clone(cpl: CampaignList) {
    this.newList();
    // Clone attribute values
    for (let at of cpl.attributes) {
      // If the campaign has not the attribute, don't add
      let atr: CampaignAttribute = this.getCorrespondingCampaignAttribute(at);
      if (!atr) {
        continue;
      }
      // Add values
      for (let val of at.values) {
        if (val) {
          this.addAttributeByCode(at.code, this.getStringValue(atr.type, val));
        }
      }
    }
  }

  private attributeDisplayName(at: CampaignListAttribute): string {
    let catr = this.campaign.attributes.find(atr => atr.code == at.code);
    return catr ? catr.name : `[${at.code}]`;
  }

  private getStringValues(at: CampaignListAttribute): string {
    let cattr = this.getCorrespondingCampaignAttribute(at);
    let type: AttributeType = cattr ? cattr.type : AttributeType.string;
    return at.values.reduce(
      (prev, curr) => {
        let now = this.getStringValue(type, curr);
        return prev ? prev + ", " + now : now;
      },
      null);
  }

  private getStringValue(type: AttributeType, value: any): string {
    switch (type) {
      case AttributeType.date:
        return this._datePipe.transform(value, "STD_DATE");
      case AttributeType.datetime:
        return this._datePipe.transform(value);
    }
    return value;
  }
}
