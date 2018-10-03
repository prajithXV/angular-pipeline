export class SearchCallsPerHourCriteriaParams {
  CampaignCd: string = "";
  StartDate: Date;


  clone(): SearchCallsPerHourCriteriaParams {
    let ret = new SearchCallsPerHourCriteriaParams();
    ret.CampaignCd = this.CampaignCd;
    ret.StartDate = this.StartDate;

    return ret;
  }

}


