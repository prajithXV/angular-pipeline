export class SearchContactPercentageCriteriaParams{
  CampaignCd: string = "";
  StartDate: Date;


  clone(): SearchContactPercentageCriteriaParams {
    let ret = new SearchContactPercentageCriteriaParams();
    ret.CampaignCd = this.CampaignCd;
    ret.StartDate = this.StartDate;

    return ret;
  }

}


