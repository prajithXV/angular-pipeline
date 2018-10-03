export class SearchCampaignCriteriaParams {
  campaignCd: string = "";
  customerName: string = "";
  accountId: string = "";
  cifId: string = "";
  statusCd: string = null;


  clone(): SearchCampaignCriteriaParams {
    let ret = new SearchCampaignCriteriaParams();
    ret.campaignCd = this.campaignCd;
    ret.customerName = this.customerName;
    ret.accountId = this.accountId;
    ret.cifId = this.cifId;
    ret.statusCd = this.statusCd;
    return ret;
  }
}
