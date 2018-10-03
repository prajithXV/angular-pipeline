export class SearchAccountCriteriaParams {
  taxId: string = "";
  email: string = "";
  accountId: string = "";
  phoneNumber: string = "";
  accountType: string = null;


  clone(): SearchAccountCriteriaParams{
    let ret = new SearchAccountCriteriaParams();
    ret.taxId = this.taxId;
    ret.email = this.email;
    ret.accountId = this.accountId;
    ret.phoneNumber = this.phoneNumber;
    ret.accountType = this.accountType;
    return ret;
  }









}


