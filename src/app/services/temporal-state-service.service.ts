import {Injectable, OnDestroy} from '@angular/core';
import {SearchTicklerCaseParams} from "../models/search-tickler-case-params";
import {Pagination} from "../models/pagination";
import {SortOrder} from "../models/sort-order";
import {Location} from '@angular/common';
import {ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import {PublicUrls} from "../routing-constants";
import {SearchCampaignCriteriaParams} from "../models/search-campaign-criteria-params";
import {SearchAccountCriteriaParams} from "../models/search-account-criteria-params";
import {Customer} from "../models/customer";
import {Account} from "../models/account";


export class CasesListInfo {
  _currentParams: SearchTicklerCaseParams = null;
  _currentPagination: Pagination = new Pagination(0, 10);
  _currentSortOrder: SortOrder = new SortOrder(null, null);

  constructor(currentParams?: SearchTicklerCaseParams, currentPagination?: Pagination, currentSortOrder?: SortOrder) {
    this.currentParams = currentParams;
    this.currentPagination = currentPagination;
    this.currentSortOrder = currentSortOrder;
  }


  get currentParams(): SearchTicklerCaseParams {
    return this._currentParams;
  }

  set currentParams(value: SearchTicklerCaseParams) {
    this._currentParams = value;
  }


  get currentPagination(): Pagination {
    return this._currentPagination;
  }

  set currentPagination(value: Pagination) {
    this._currentPagination = value;
  }

  get currentSortOrder(): SortOrder {
    return this._currentSortOrder;
  }

  set currentSortOrder(value: SortOrder) {
    this._currentSortOrder = value;
  }


}

export class CasesListInfoByAccount{
  _currentId: string;
  _currentType: string;
  _currentCampaignRecordId: string;

  constructor(currentId?: string, currentType?: string, currentCampaignRecordId?: string){
    this.currentId = currentId;
    this.currentType = currentType;
    this.currentCampaignRecordId = currentCampaignRecordId;
  }

  get currentId(): string {
    return this._currentId;
  }

  set currentId(value: string) {
    this._currentId = value;
  }

  get currentType(): string{
    return this._currentType;
  }

  set currentType(value: string){
    this._currentType = value;
  }

  get currentCampaignRecordId():string{
    return this._currentCampaignRecordId;
  }

  set currentCampaignRecordId(value: string){
    this._currentCampaignRecordId = value;
  }
}


export class CampaignListInfo{
  _currentParams: SearchCampaignCriteriaParams = null;
  _currentPagination: Pagination = new Pagination(0, 15);

  constructor(currentParams?: SearchCampaignCriteriaParams, currentPagination?: Pagination){
    this.currentParams = currentParams;
    this.currentPagination = currentPagination;
  }

  set currentParams(value: SearchCampaignCriteriaParams){
    this._currentParams = value;
  }

  get currentParams(): SearchCampaignCriteriaParams{
    return this._currentParams;
  }

  set currentPagination(value: Pagination){
    this._currentPagination = value;
  }

  get currentPagination(): Pagination{
    return this._currentPagination;
  }

}

export class AccountListInfo{
  _currentParams: SearchAccountCriteriaParams = null;
  _currentCustomer: Customer = null;

  constructor(currentParams?: SearchAccountCriteriaParams, currentCustomer?: Customer){
    this.currentParams = currentParams;
    this.currentCustomer = currentCustomer;
  }

  set currentParams(value: SearchAccountCriteriaParams){
    this._currentParams = value;
  }

  get currentParams(): SearchAccountCriteriaParams{
    return this._currentParams;
  }

  set currentCustomer(value: Customer){
    this._currentCustomer = value;
  }

  get currentCustomer(): Customer{
    return this._currentCustomer;
  }

}


@Injectable()
export class TemporalStateServiceService{
   _casesListInfo: CasesListInfo;
   _campaignListInfo: CampaignListInfo;
   _accountListInfo: AccountListInfo;
   _casesListInfoByAccount: CasesListInfoByAccount;
  _urlToRedirect: string;
  _currentCounter: number = 0;

  constructor(_location: Location, _router: Router) {
    _router.events.subscribe((event) => {
      let route = _location.path();

      if (event instanceof NavigationEnd) {
        if (!route.includes(PublicUrls.process_case.url) && !route.includes(PublicUrls.main.url)) {
          this._casesListInfo = null;
        }
        if(!route.includes(PublicUrls.main.url) && !route.includes(PublicUrls.account.url)){
          this._campaignListInfo = null;
          this._accountListInfo = null;
        }
        if(!route.includes(PublicUrls.account.url) && !route.includes(PublicUrls.account.accountId) &&
          !route.includes(PublicUrls.account.accountType) && !route.includes(PublicUrls.account.campaignRecord) &&
          !route.includes(PublicUrls.process_case.url)){
          this._casesListInfoByAccount = null;
        }
      }
    });
  }


  set casesListInfo(info: CasesListInfo) {
    this._casesListInfo = info;
    this._urlToRedirect = PublicUrls.main.url;
  }

  get casesListInfo(): CasesListInfo {
    return this._casesListInfo;
  }

  set campaignListInfo(info: CampaignListInfo){
    this._campaignListInfo = info;
    this._urlToRedirect = PublicUrls.main.url;
  }

  get campaignListInfo(): CampaignListInfo{
    return this._campaignListInfo;
  }

  set accountListInfo(info: AccountListInfo){
    this._accountListInfo = info;
    this._urlToRedirect = PublicUrls.main.url;
  }

  get accountListInfo(): AccountListInfo{
    return this._accountListInfo;
  }

  set casesListInfoByAccount(info: CasesListInfoByAccount){
    this._casesListInfoByAccount = info;
    this._urlToRedirect = PublicUrls.account.url;
  }


  get casesListInfoByAccount(): CasesListInfoByAccount{
    return this._casesListInfoByAccount;
  }

  get isCasesListInfo(): boolean {
    return this.casesListInfo != null;
  }

  get isCampaignListInfo(): boolean{
    return this.campaignListInfo != null;
  }

  get isAccountListInfo(): boolean{
    return this.accountListInfo != null;
  }

  get isCasesListInfoByAccount():boolean{
    return this.casesListInfoByAccount !=null;
  }

  get hasListInfo():boolean{
    return this.isCasesListInfo || this.isCampaignListInfo || this.isAccountListInfo || this.isCasesListInfoByAccount;
  }

  get redirectTo(): string {
    return this._urlToRedirect;
  }

  get currentCounter(): number {
    return this._currentCounter;
  }


  set currentCounter(value: number){
    this._currentCounter = value;
  }

}
