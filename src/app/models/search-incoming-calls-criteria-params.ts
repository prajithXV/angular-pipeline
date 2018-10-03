export class SearchCallsIncomingCallsCriteriaParams {
  StartDate: Date;


  clone(): SearchCallsIncomingCallsCriteriaParams  {
    let ret = new SearchCallsIncomingCallsCriteriaParams ();
    ret.StartDate = this.StartDate;

    return ret;
  }

}


