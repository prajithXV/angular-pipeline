import { TestBed, inject } from '@angular/core/testing';

import {
  AccountListInfo, CampaignListInfo, CasesListInfo,
  TemporalStateServiceService
} from './temporal-state-service.service';
import {APP_BASE_HREF, Location, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";
import {SearchAccountCriteriaParams} from "../models/search-account-criteria-params";
import {SearchTicklerCaseParams} from "../models/search-tickler-case-params";
import {SearchCampaignCriteriaParams} from "../models/search-campaign-criteria-params";
describe('TemporalStateServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [TemporalStateServiceService, Location, { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: APP_BASE_HREF, useValue: '/my/app'}]
    });
  });

  it('should be created', inject([TemporalStateServiceService], (service: TemporalStateServiceService) => {
    expect(service).toBeTruthy();
  }));


  function createParams(params: any ){
    return new params();
  }


  function createListInfo(info: any, params: any){
    return new info(params);
  }


  function caseParams(id: number, accountId: string, statusCode: string, assignedUser: string, cifId: string, processCode: string, followUpCode: string){
   let p =  createParams(SearchTicklerCaseParams);
       p.Id = id;
       p.AccountId = accountId;
       p.StatusCd = statusCode;
       p.AssignedUser = assignedUser;
       p.CifId = cifId;
       p.ProcessCd = processCode;
       p.FollowUpDueCd = followUpCode;
       return p;
  }

  function campaignParams(campaignCode: string, customerName: string, accountId: string, cifId: string, statusCode: string){
    let p = createParams(SearchCampaignCriteriaParams);
        p.campaignCd = campaignCode;
        p.customerName = customerName;
        p.accountId = accountId;
        p.cifId = cifId;
        p.statusCd = statusCode;
        return p;
  }


  function accountParams(taxId: string, email: string, accountId: string, phoneNumber: string){
    let p = createParams(SearchAccountCriteriaParams);
        p.taxId = taxId;
        p.email = email;
        p.accountId = accountId;
        p.phoneNumber = phoneNumber;
        return p;
  }


  function checkListInfo(listInfo: any, listInfoUrl: string, isListInfo: boolean, urlToRedirect?: string){
    expect(listInfo).toEqual(isListInfo);
    if(listInfo){
      expect(listInfoUrl).toEqual(urlToRedirect);
    }

  }

  it('current cases list info', inject([TemporalStateServiceService], (service: TemporalStateServiceService) => {
    let s = caseParams(1, "1", "NEW", "Guts", "123", "SPOC", "DUE");
    service.casesListInfo = createListInfo(CasesListInfo, s);

    checkListInfo(service.isCasesListInfo, service.redirectTo, true, "app/main");
    checkListInfo(service.isAccountListInfo, service.redirectTo,false, "app/main");
    checkListInfo(service.isCampaignListInfo, service.redirectTo,false, "app/main");

  }));


  it('current campaign list info', inject([TemporalStateServiceService], (service: TemporalStateServiceService) => {
    let s = campaignParams("DIRECT", "Hak", "123", "124", "NEW");
    service.campaignListInfo = createListInfo(CampaignListInfo, s);

    checkListInfo(service.isCasesListInfo, service.redirectTo, false, "app/main");
    checkListInfo(service.isAccountListInfo, service.redirectTo,false, "app/main");
    checkListInfo(service.isCampaignListInfo, service.redirectTo,true, "app/main");


  }));

  it('current account list info', inject([TemporalStateServiceService], (service: TemporalStateServiceService) => {
    let s = accountParams("111", "email", "123", "777");
    service.accountListInfo = createListInfo(AccountListInfo, s);

    checkListInfo(service.isCasesListInfo, service.redirectTo, false, "app/main");
    checkListInfo(service.isAccountListInfo, service.redirectTo,true, "app/main");
    checkListInfo(service.isCampaignListInfo, service.redirectTo,false, "app/main");

  }));




});
