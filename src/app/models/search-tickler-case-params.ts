export class SearchTicklerCaseParams {
  Id: number = null;
  AccountId: string = "";
  CifId: string = "";
  ProcessCd: string = null;
  StatusCd: string = null;
  AssignedUser: string = "";
  FollowUpDueCd: string = null;


  clone(): SearchTicklerCaseParams  {
    let ret = new SearchTicklerCaseParams();
    ret.Id = this.Id;
    ret.AccountId = this.AccountId;
    ret.CifId = this.CifId;
    ret.ProcessCd = this.ProcessCd;
    ret.StatusCd = this.StatusCd;
    ret.AssignedUser = this.AssignedUser;
    ret.FollowUpDueCd = this.FollowUpDueCd;
    return ret;
  }

}
