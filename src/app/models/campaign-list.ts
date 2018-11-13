import {CampaignListAttribute} from "./campaign-list-attribute";
import {CampaignStatsToken} from "./campaign-stats-token";
import {CampaignRecordHistory} from "./campaign-record-history";
import {CampaignListOrderByType} from "./cl-order-by-type";
import {SortOrder} from "./sort-order";

export class CampaignList {
  private _id: number;
  private _campaignCode: string;
  private _campaignName: string;
  private _campaignType: string;
  private _campaignId: number;
  private _createdDate: string;
  private _createdBy: string;
  private _modifiedDate: string;
  private _modifiedBy: string;
  private _statusCode: string;
  private _attributes: CampaignListAttribute[];
  private _stats: CampaignStatsToken[];
  private _orderedBy: string;


  constructor(id?: number, campaignCode?: string, campaignName?: string, campaignId?: number, createDate?: string,
              createdBy?: string, modifiedDate?: string, modifiedBy?: string, statusCode?: string,
              attributes?: CampaignListAttribute[], stats?: CampaignStatsToken[], orderedBy?: string, sortOrder?: SortOrder){
    this.id = id;
    this.campaignCode = campaignCode;
    this.campaignName = campaignName;
    this.campaignId = campaignId;
    this.createdDate = createDate;
    this.createdBy = createdBy;
    this.modifiedDate = modifiedDate;
    this.modifiedBy = modifiedBy;
    this.statusCode = statusCode;
    this.statistics = stats;
    this.attributes = attributes;
    this.orderedBy = orderedBy;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get campaignCode(): string {
    return this._campaignCode;
  }

  set campaignCode(value: string) {
    this._campaignCode = value;
  }

  get campaignName(): string {
    return this._campaignName;
  }

  set campaignName(value: string) {
    this._campaignName = value;
  }

  get campaignType(): string {
    return this._campaignType;
  }

  set campaignType(value: string) {
    this._campaignType = value;
  }

  get campaignId(): number {
    return this._campaignId;
  }

  set campaignId(value: number) {
    this._campaignId = value;
  }

  get createdDate(): string {
    return this._createdDate;
  }

  set createdDate(value: string) {
    this._createdDate = value;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  set createdBy(value: string) {
    this._createdBy = value;
  }

  get modifiedDate(): string {
    return this._modifiedDate;
  }

  set modifiedDate(value: string) {
    this._modifiedDate = value;
  }

  get modifiedBy(): string {
    return this._modifiedBy;
  }

  set modifiedBy(value: string) {
    this._modifiedBy = value;
  }

  get statusCode(): string {
    return this._statusCode;
  }

  set statusCode(value: string) {
    this._statusCode = value;
  }

  get attributes(): CampaignListAttribute[] {
    return this._attributes;
  }

  set attributes(value:CampaignListAttribute[]){
    this._attributes = value;
  }

  addAttribute(cla: CampaignListAttribute) {
    if (!this._attributes) {
      this.resetAttributes();
    }
    this._attributes.push(cla);
  }

  resetAttributes() {
    this._attributes = [];
  }

  get statistics(): CampaignStatsToken[] {
    return this._stats;
  }

  set statistics(value:CampaignStatsToken[]){
    this._stats = value;
  }


  addStatisticsToken(cla: CampaignStatsToken) {
    if (!this._stats) {
      this.resetStatistics();
    }
    this._stats.push(cla);
  }

  resetStatistics() {
    this._stats = [];
  }

  get orderedBy():string{
   return this._orderedBy;
  }

  set orderedBy(value: string){
    this._orderedBy = value;
  }
}
