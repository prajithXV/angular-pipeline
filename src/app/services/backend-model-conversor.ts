import {
  Account, AccountAdditionalInfo, AccountBankruptcy, AccountCollection, AccountDep, AccountForeclosure,
  AccountHistoryEntry,
  AccountLoan,
  AccountLossMitigation
} from "../models/account";
import {Customer} from "../models/customer";
import {CustomerNote} from "../models/customer-note";
import {Person} from "../models/person";
import {Address} from "../models/address";
import {LineType, Phone, PhoneType} from "../models/phone";
import {Campaign} from "../models/campaign";
import {CallRecord} from "../models/call-record";
import {Agent} from "../models/agent";
import {CampaignStatsComponent} from "../views/campaign-stats/campaign-stats.component";
import {CampaignStatsToken} from "../models/campaign-stats-token";
import {CollectorProductivityRecord} from "../models/collector-productivity-record";
import {CampaignList} from "../models/campaign-list";
import {CampaignListRecord} from "../models/campaign-list-record";
import {OverallProductivityRecord} from "../models/overall-productivity-record";
import {CampaignListAttribute} from "../models/campaign-list-attribute";
import {Role} from "../models/role";
import {CampaignListAccount} from "../models/campign-list-accounts";
import {CallsPersHour} from "../models/callsPersHour";
import {IncomingCalls} from "../models/incomingCalls";
import {ContactPercentage} from "../models/contact-percentage";
import {CancelCampaignCallRecordReason} from "../models/cancel-campaign-call-record-reason";
import {CampaignRecordHistory} from "../models/campaign-record-history";
import {TicklerProcess} from "../models/tickler-processes";
import {TicklerType} from "../models/tickler-types";
import {ProcessCase} from "../models/process-case";
import {ProcessCaseTickler} from "../models/process-case-tickler";
import {TicklerTypeMap} from "../models/tickler-type-map";
import {TicklerAttribute} from "../models/tickler-attribute";
import {TicklerAttributeMap} from "../models/tickler-attribute-map";
import {CampaignAttribute} from "../models/campaign-attribute";
import {AttributeType} from "../models/attribute";
import {CustomerConsent} from "../models/customer-consent";
import {CampaignListOrderByType} from "../models/cl-order-by-type";
import {Code} from "../models/code";
import {LovType} from "../models/lov-types";
import {LovValue} from "../models/lov-values";
import {MemoNote} from "../models/memo-note";

const HOME_PHONE = "Home phone";
const BUSINESS_PHONE = "Business phone";
const CELLULAR_PHONE = "Home cell phone";
const LANDLINE_TYPE = "P";

export class BackendModelConversorService {

  static cnAccount2Account(src, srcAcc?: Account): Account {
    if (srcAcc == null) {
      srcAcc = new Account();
    }
    let cust = new Customer();
    cust.id = src.customerId;

    srcAcc.collection = BackendModelConversorService.cnAccountColl2AccountCollection(src.cnAccountColl);
    srcAcc.loan = BackendModelConversorService.cnAccountLoan2AccountLoan(src.cnAccountLoan);
    srcAcc.lossMitigation = BackendModelConversorService.cnAccountLossMitigation2AccountLossMitigation(src.cnAccountLossMitigation);
    srcAcc.bankruptcy = BackendModelConversorService.cnAccountBankruptcy2AccountBankruptcy(src.cnAccountBankruptcy);
    srcAcc.foreclosure = BackendModelConversorService.cnAccountForeclosure2AccountForeclosure(src.cnAccountForeclosure);
    srcAcc.additionalInfo = BackendModelConversorService.cnAccountAdditionalInfo2AccountAdditionalInfo(src.cnAccountAdditionalInfo);
    // srcAcc.accountDep = BackendModelConversorService.cnAccountDep(src.cnAccountDep);

    srcAcc.customer = cust;
    return srcAcc;
  }


  static cnAccountDepAccount(src, srcAcc?: Account): Account {
    if (srcAcc == null) {
      srcAcc = new Account();
    }
    let cust = new Customer();
    cust.id = src.CustomerId;
    srcAcc.accountDep = BackendModelConversorService.cnAccountDep(src);

    srcAcc.customer = cust;
    return srcAcc;
  }

  static cnCustomerInfo2Customer(src, cust?: Customer): Customer {
    if (cust == null) {
      cust = new Customer();
    }
    cust.socialSecurityNumber = src.socialSecurityNumber;

    cust.mainAddress = BackendModelConversorService.address2Address(src.address);

    for (let m of src.emailLst) {
      if (m) {
        cust.addeMail(m);
      }
    }
    cust.cifNo = src.cifNo;
    for (let psrc of src.phoneLst) {
      cust.addPhone(BackendModelConversorService.phone2Phone(psrc));
    }
    cust.phoneLineType = src.phoneLineType;
    cust.languageIndicator = src.languageIndicator;
    cust.market = src.market;
    cust.specialMessageFlag = src.specialMessageFlag;

    cust.mainContact = BackendModelConversorService.person2Person(src.personName);

    cust.employmentInfo = src.employmentInfo;
    cust.birthDate = src.birthDt;

    if(src.consentFlg == null){
      cust.hasConsent = null;
    }else{
      cust.hasConsent = src.consentFlg == "Y";
    }

    return cust;
  }


  static customerConsents(cc): CustomerConsent[]{
    let ret: CustomerConsent[] = [];
    for(let c of cc){
      let cu = new CustomerConsent();
      cu.id = c.Id;
      cu.customerId = c.CifId;
      cu.phoneNumber = c.PhoneNr;
      if(c.ConsentFlg == null){
        cu.hasConsent = null;
      }else{
        cu.hasConsent = c.ConsentFlg == "Y";
      }

      cu.note = c.Note;
      cu.createdBy = c.CreatedBy;
      cu.createdDate = c.CreatedDt;
      ret.push(cu);
    }
    return ret;
  }

  static accountList2Accounts(src): Account[] {
    let ret: Account[] = [];
    for (let acs of src) {
      let acc = new Account();
      acc.accountId = acs.accountId;
      acc.accountType = acs.accountType;
      acc.productCode = acs.prodCode;
      acc.productDescription = acs.prodDesc;
      acc.amount = acs.amt;
      acc.stateDescription = acs.acctStatDesc;
      acc.relationDescription = acs.acctRelDesc;
      ret.push(acc);
    }
    return ret;
  }

  static customerMsgList2Notes(src): CustomerNote[] {
    let ret: CustomerNote[] = [];
    for (let cn of src) {
      let c = new CustomerNote();
      c.customerId = cn.customerId;
      c.accountId = cn.accountId;
      c.accountType = cn.accountType;
      c.message = cn.message;
      c.startDate = cn.startDt;
      c.endDate = cn.endDt;
      c.msgCategory = cn.msgCat;
      c.msgType = cn.msgType;
      ret.push(c);
    }
    return ret;
  }

  static customerList2Customers(src): Customer[] {
    let ret: Customer[] = [];
    for (let c of src) {
      let cust = new Customer();
      cust.id = c.customerId;
      cust.taxId = c.taxId;
      cust.mainContact = BackendModelConversorService.person2Person(c.person);
      cust.mainAddress = BackendModelConversorService.address2Address(c.address);
      ret.push(cust);
    }
    return ret;
  }

  // These two method can be the same for the moment
  static agentCampaigns2Campaigns(cmps): Campaign[] {
    return BackendModelConversorService._2Campaigns(cmps);
  }

  static campaigns2Campaigns(cmps): Campaign[] {
    return BackendModelConversorService._2Campaigns(cmps);
  }

  private static _2Campaigns(cmps): Campaign[] {
    let ret: Campaign[] = [];
    for (let c of cmps) {
      let cp = new Campaign();
      cp.userCode = c.UserCd;
      cp.id = c.Id;
      cp.code = c.CampaignCd;
      cp.name = c.CampaignNm;
      cp.statusCode = c.StatusCd;
      cp.resetAttributes();
      if (c.Attributes) {
        BackendModelConversorService.attributes2CampaignAttributes(c.Attributes, cp.attributes);
      }
      ret.push(cp);
    }
    return ret;
  }

  private static attributes2CampaignAttributes(atts, target?: CampaignAttribute[]): CampaignAttribute[] {
    if (!target) {
      target = [];
    }
    for (let a of atts) {
      let att = new CampaignAttribute();
      att.id = a.AttributeId;
      att.code = a.AttributeCd;
      att.name = a.AttributeNm;
      att.isArray = a.ArrayFlg == "Y" || a.ArrayFlg == "y";
      switch (a.DataType) {
        case "STRING":
          att.type = AttributeType.string;
          break;
        case "NUMBER":
          att.type = AttributeType.number;
          break;
        case "DATE":
          att.type = AttributeType.date;
          break;
        case "DATETIME":
          att.type = AttributeType.datetime;
          break;
        default:
          att.type = AttributeType.unknown;
      }
      target.push(att);
    }
    return target;
  }

  static campaignLists2CampaignLists(cmps): CampaignList[] {
    let ret: CampaignList[] = [];
    for (let c of cmps) {
      let cp = new CampaignList();
      cp.id = c.Id;
      cp.campaignCode = c.CampaignCd;
      cp.campaignName = c.CampaignNm;
      cp.campaignType = c.CampaignType;
      cp.campaignCode = c.CampaignId;
      cp.createdDate = c.CreatedDt;
      cp.createdBy = c.CreatedBy;
      cp.modifiedDate = c.ModifiedDt;
      cp.modifiedBy = c.ModifiedBy;
      cp.statusCode = c.StatusCd;
      cp.orderedBy = c.OrderedBy;

      try {
        BackendModelConversorService.attributes2CampaignListAttributes(cp, JSON.parse(atob(c.Attributes)));
      } catch (e) {
        console.log("Error parsing attributes");
      }
      ret.push(cp);
    }
    return ret;
  }

  static campaignListRecords2CampaignListRecords(cmps): CampaignListRecord[] {
    let ret: CampaignListRecord[] = [];
    for (let c of cmps) {
      let cp = new CampaignListRecord();
      cp.campaignCode = c.CampaignCd;
      cp.campaignNumber = c.CampaignNm;
      cp.accountId = c.AccountId;
      cp.callPriority = c.CallPriority;
      cp.statusCode = c.StatusCd;
      cp.lastCalledBy = c.LastCalledBy;
      cp.lastCalledDate = c.LastCalledDt;
      cp.nextCallDate = c.NextCallDt;
      cp.nextCallUser = c.NextCallUser;
      cp.orderByCode = c.OrderByCd;
      ret.push(cp);
    }
    return ret;
  }

  //campaign list account
  static claccounts2CampaigListAccounts(clacc): CampaignListAccount[] {
    let ret: CampaignListAccount[] = [];
    for (let c of clacc) {
      let cp = new CampaignListAccount();
      cp.campaignCode = c.CampaignCd;
      cp.campaignName = c.CampaignNm;
      cp.campaignRecordId = c.CampaignRecordId;
      cp.accountId = c.AccountId;
      cp.accountType = c.AccountType;
      cp.campaignFId = c.CifId;
      cp.colStatusCode = c.ColStatusCd;
      cp.ficoScore = c.FicoScore;
      cp.interestDue = c.InterestDue;
      cp.lastPayDate = c.LastPaymentDt;
      cp.lastPromiseDate = c.LastPromiseDt;
      cp.lastWorkDate = c.LastWorkDt;
      cp.nextWorkDate = c.NextWorkDt;
      cp.officerName = c.OfficerName;
      cp.pastDueDays = c.PastDueDays;
      cp.callPriority = c.CallPriority;
      cp.statusCode = c.StatusCd;
      cp.lastCalledBy = c.LastCalledBy;
      cp.lastCalledDate = c.LastCalledDt;
      cp.eaPcFlag = c.EaPcFlag;
      cp.nextCalledBy = c.NextCallDt;
      cp.nextCalledUser = c.NextCallUser;
      cp.customerName = c.CustomerName;
      ret.push(cp);
    }
    return ret;

  }


  //calls pers hour

  static callsPersHour(clp): CallsPersHour[] {

    let ret: CallsPersHour[] = [];
    for (let c of clp) {
      let ch = new CallsPersHour();
      ch.campaignCode = c.CampaignCd;
      ch.hour = c.Hour;
      ch.average = c.Average;
      ch.total = c.Total;
      ch.agentsCount = c.AgentsCnt;
      ret.push(ch);
    }

    return ret;
  }


  //Incoming calls

  static incomingCalls(ic): IncomingCalls[] {
    let ret: IncomingCalls[] = [];
    for (let i of ic) {
      let inco = new IncomingCalls();
      inco.hour = i.Hour;
      inco.total = i.Total;
      ret.push(inco);
    }
    return ret;
  }


  //Contact percentage

  static contactPercentage(cnp): ContactPercentage[] {
    let ret: ContactPercentage[] = [];
    for (let i of cnp) {
      let cp = new ContactPercentage();
      cp.campaignCode = i.CampaignCd;
      cp.ContactPercentage = i.ContactPct;
      cp.hour = i.Hour;
      ret.push(cp);
    }
    return ret;
  }


  //cancel campaign record reason
  static cancelCampaignCallRecordReasonFromArray(cr): CancelCampaignCallRecordReason[] {
    let ret: CancelCampaignCallRecordReason[] = [];
    for (let c of cr) {
      let cc = new CancelCampaignCallRecordReason();
      cc.id = c.Id;
      cc.code = c.Code;
      cc.name = c.Name;
      cc.description = c.Description;
      ret.push(cc);
    }

    return ret;
  }


  static lovTypes(lt): LovType[]{
    let ret: LovType[] = [];
    for (let l of lt){
      let lovType = new LovType();

      lovType.id = l.Id;
      lovType.lovCode = l.LovCd;
      lovType.lovName = l.LovNm;
      lovType.lovDescription = l.LovDesc;
      lovType.isActive = l.ActiveFlg  == "Y";
      lovType.isDynamic = l.DynamicFlg == "Y";
      lovType.createdBy = l.CreatedBy;
      lovType.createdDate = l.CreatedDt;
      lovType.modifiedBy = l.ModifiedBy;
      lovType.modifiedDate = l.ModifiedDt;

      switch (l.DataType){
        case "STRING":
          lovType.type = AttributeType.string;
          break;
        case "NUMBER":
          lovType.type = AttributeType.number;
          break;
        case "DATE":
          lovType.type = AttributeType.date;
          break;
        case "DATETIME":
          lovType.type = AttributeType.datetime;
          break;
        default:
          lovType.type = AttributeType.unknown
      }

      ret.push(lovType);
    }

    return ret;
  }

  //lov values
  static lovValues(lv): LovValue[]{
    let ret: LovValue[] = [];
    for (let l of lv){
      let lovValue = new LovValue();
      lovValue.id = l.Id;
      lovValue.lovId = l.LovId;
      lovValue.valueCode = l.ValueCd;
      lovValue.valueName = l.ValueNm;
      lovValue.valueDescription = l.ValueDesc;
      lovValue.isActive = l.ActiveFlg == "Y";
      lovValue.createdBy = l.CreatedBy;
      lovValue.createdDate = l.CreatedDt;
      lovValue.modifiedBy = l.ModifiedBy;
      lovValue.modifiedDate = l.ModifiedDt;

      ret.push(lovValue);
    }

    return ret;
  }

  //tickler processes
  static ticklerProcesses(tp): TicklerProcess[]{
    let ret: TicklerProcess[] = [];
    for (let t of tp){
      let processes = new TicklerProcess();
      processes.id = t.Id;
      processes.processCode = t.ProcessCd;
      processes.processName = t.ProcessNm;
      processes.createdBy = t.CreatedBy;
      processes.createdDate = t.CreatedDt;
      ret.push(processes);
    }

    return ret;
  }

  //tickler types
  static ticklerTypes(tt): TicklerType[]{
    let ret: TicklerType[] = [];
    for (let t of tt){
      let types = new TicklerType();
        types.id = t.Id;
        types.ticklerCode = t.TicklerCd;
        types.ticklerName = t.TicklerNm;
        types.ticklerDescription = t.TicklerDesc;
        types.activeFlag = t.ActiveFlg == "Y";
        types.processId = t.ProcessId;
        types.followUpDays = t.FollowUpDays;
        types.actionRequiredFlag = t.ActionRequiredFlg == "Y";
        types.isCore = t.CoreFlg == "Y";
        types.isBase = t.BaseFlg == "Y";
        types.isCloseable = t.CloseableFlg == "Y";
        types.orderByCode = t.OrderByCd;
        types.createdBy = t.CreatedBy;
        types.createdDate = t.CreatedDt;
        types.modifiedBy = t.ModifiedBy;
        types.modifiedDate = t.ModifiedDt;
        ret.push(types);
    }

    return ret;
  }


  //process case
  static processCase(tpc): ProcessCase[]{
    let ret: ProcessCase[] = [];
    for (let t of tpc){
      let pc = new ProcessCase();
        pc.id = t.Id;
        pc.accountId = t.AccountId;
        pc.accountType = t.AccountType;
        pc.cifId = t.CifId;
        pc.caseDescription = t.CaseDesc;
        pc.processCode = t.ProcessCd;
        pc.statusCode = t.StatusCd;
        pc.followUpDueDate = t.FollowUpDueDt;
        pc.createdBy = t.CreatedBy;
        pc.createdDate = t.CreatedDt;
        pc.assignedUser = t.AssignedUser;
        pc.assignedGroup = t.AssignedGroup;
        pc.contactFirstName = t.FirstName;
        pc.contactLastName = t.LastName;
        ret.push(pc);
    }

    return ret;
  }


  //process case tickler
  static processCaseTickler(tct): ProcessCaseTickler[]{
    let ret: ProcessCaseTickler[] = [];
    for (let t of tct){
      let pct = new ProcessCaseTickler();
        pct.id = t.Id;
        pct.caseId = t.CaseId;
        pct.ticklerName = t.TicklerNm;
        pct.ticklerTypeCode = t.TicklerTypeCd;
        pct.ticklerDescription = t.TicklerDesc;
        pct.createdBy = t.CreatedBy;
        pct.createdDate = t.CreatedDt;
        // Attributes
        try {
          let atts: any = JSON.parse(t.Attributes);
          for (let a in atts) {
             pct.addAttribute(new CampaignListAttribute(a, atts[a]));
          }
        } catch(e) {}
        ret.push(pct);
    }

    console.log("***************************************");
    console.log(ret);
    return ret;
  }

  //tickler type map
  static ticklerTypeMap(ttm): TicklerTypeMap[]{
    let ret: TicklerTypeMap[] = [];
    for (let t of ttm){
      let m = new TicklerTypeMap();
      m.id = t.Id;
      m.ticklerFromId = t.TicklerFromId;
      m.ticklerToCode = t.TicklerToCd;
      m.ticklerFromName = t.TicklerFromNm;
      m.ticklerToId = t.TicklerToId;
      m.ticklerToName = t.TicklerToNm;
      m.activeFlag = t.ActiveFlg;
      m.createdBy = t.CreatedBy;
      m.createdDate = t.CreatedDt;
      m.modifiedBy = t.ModifiedBy;
      m.modifiedDate = t.ModifiedDt;
      ret.push(m);
    }

    return ret;
  }

  //tickler attribute
  static ticklerAttribute(ta): TicklerAttribute[]{
    let ret: TicklerAttribute[] = [];
    for (let t of ta){
      let att = new TicklerAttribute();
        att.id = t.Id;
        att.code = t.AttributeCd;
        att.name = t.AttributeNm;
        att.attributeDescription = t.AttributeDesc;
        att.type = t.DataType;

        switch (t.DataType){
          case "STRING":
            att.type = AttributeType.string;
            break;
          case "NUMBER":
            att.type = AttributeType.number;
            break;
          case "DATE":
            att.type = AttributeType.date;
            break;
          case "DATETIME":
            att.type = AttributeType.datetime;
            break;
          case "LOV":
            att.type = AttributeType.lov;
            break;
          default:
            att.type = AttributeType.unknown
        }

        att.activeFlag = t.ActiveFlg == "Y";
        att.isArray = t.ArrayFlg == "Y";
        att.mandatoryFlag = t.MandatoryFlg == "Y";
        att.createdBy = t.CreatedBy;
        att.createdDate = t.CreatedDt;
        att.modifiedBy = t.ModifiedBy;
        att.modifiedDate = t.ModifiedDt;
        att.lovCode = t.LovCd;

      ret.push(att);
    }

    return ret;
  }


  //tickler attribute
  static listOfValue(la): Code[]{
    let ret: Code[] = [];
    for (let lo of la){
      let co = new Code();
      co.code = lo.Code;
      co.name = lo.Name;
      ret.push(co);
    }
    return ret;
  }


  //tickler attribute map
  static ticklerAttributeMap(tam): TicklerAttributeMap[]{
    let ret: TicklerAttributeMap[] = [];
    for (let t of tam){
      let am = new TicklerAttributeMap();
        am.id = t.Id;
        am.ticklerTypeId = t.TicklerTypeId;
        am.attributeTypeId = t.AttributeTypeId;
        am.createdBy = t.CreatedBy;
        am.createdDate = t.CreatedDt;
        am.ticklerCode = t.TicklerCd;
        am.ticklerName = t.TicklerNm;
        am.code = t.AttributeCd;
        am.name = t.AttributeNm;
        am.type = t.DataType;

      switch (t.DataType){
        case "STRING":
          am.type = AttributeType.string;
          break;
        case "NUMBER":
          am.type = AttributeType.number;
          break;
        case "DATE":
          am.type = AttributeType.date;
          break;
        case "DATETIME":
          am.type = AttributeType.datetime;
          break;
        case "LOV":
          am.type = AttributeType.lov;
          break;
        default:
          am.type = AttributeType.unknown
      }
        am.isArray = t.ArrayFlg == "Y";
        am.mandatoryFlag = t.MandatoryFlg == "Y";


      ret.push(am);
    }
    return ret;
  }

  //campaign list order by type

  static campaignListOrderByType(cl):CampaignListOrderByType[]{
    let ret: CampaignListOrderByType[] = [];

    for(let c of cl ){
      let o = new CampaignListOrderByType();
      o.code = c.Code;
      o.name = c.Name;
      ret.push(o);
    }
    return ret;
  }



  //campaign record history
  static campaignRecordHistory(ch, camp?: CampaignListRecord): CampaignRecordHistory[] {

    if (!camp) {
      camp = new CampaignListRecord();
    }

    if (ch) {
      for (let c of ch) {
        let cr = new CampaignRecordHistory();
        cr.accountId = c.AccountId;
        cr.campaignListId = c.CampaignListId;
        cr.campaignName = c.CampaignNm;
        cr.createdDate = c.CreatedDt;
        cr.statusCode = c.StatusCd;
        cr.cancelCode = c.CancelCd;
        cr.modifiedDate = c.ModifiedDt;
        cr.cancelName = c.CancelNm;
        cr.cancelDescription = c.CancelDesc;
        camp.addCampaignRecordHistory(cr);
      }
    }
    return camp.campaignRecordHistory;
  }


  static completeAgentFromUser(agent: Agent, resj): void {
    agent.account = resj.UserCd;
    agent.firstName = resj.FirstName;
    agent.lastName = resj.LastName;
    agent.lastLogin = resj.LastLogin;
    agent.isUser = BackendModelConversorService.getBooleanFromFlag(resj.UserFlg);
    agent.isManager = BackendModelConversorService.getBooleanFromFlag(resj.ManagerFlg);
    agent.isSupervisor = BackendModelConversorService.getBooleanFromFlag(resj.SupervisorFlg);
    agent.isAdmin = BackendModelConversorService.getBooleanFromFlag(resj.AdminFlg);
    agent.resetRoleCodes();
    if (resj.Roles) {
      for (let rc of resj.Roles) {
        agent.addRoleCode(rc.RoleCd);
      }
    }
  }

  static completeAgentsFromUsers(agents): Agent[] {
    let ret: Agent[] = [];
    for (let ag of agents) {
      let agent = new Agent();
      BackendModelConversorService.completeAgentFromUser(agent, ag);
      ret.push(agent);
    }
    return ret;
  }

  static stats2CampaignStatsToken(sts): CampaignStatsToken[] {
    let ret: CampaignStatsToken[] = [];
    for (let s of sts) {
      let tk = new CampaignStatsToken();
      tk.campaignCode = s.unit.CampaignCd;
      tk.statusCode = s.unit.StatusCd;
      tk.count = s.count;
      ret.push(tk);
    }
    return ret;
  }

  static campaignListsStats2CampaignStatisticsToken(sts, cpl?: CampaignList): CampaignStatsToken[] {
    if (!cpl) {
      cpl = new CampaignList();
    }

    if (sts) {
      for (let s of sts) {
        let tk = new CampaignStatsToken();
        tk.statusCode = s.StatusCd;
        tk.count = s.count;
        cpl.addStatisticsToken(tk);
      }

    }
    return cpl.statistics;

  }

  private static excludeAtts: string[] = ['UserCd', 'UploadId', 'CampaignCd', 'LastWorkDt', 'LastPromiseDt'];

  private static attributes2CampaignListAttributes(cpl: CampaignList, atts) {
    for (let at in atts) {
      // console.log(at + ": " + atts[at]);
      if (!BackendModelConversorService.excludeAtts.find(v => v == at)) {
        // console.log("Adding " + at);
        cpl.addAttribute(new CampaignListAttribute(at, atts[at]));
      } else {
        // console.log("Excluding " + at);
      }
    }
  }

  private static getBooleanFromFlag(flg: string) {
    return flg == 'Y' || flg == 'y';
  }

  private static cnAccountColl2AccountCollection(src): AccountCollection {
    let ret = new AccountCollection();
    if (!src) {
      return ret;
    }
    ret.previousBrokenPromise = src.previousBrokenPromise;
    for (let post of src.memoPostProPayLst) {
      ret.addMemoPostProPay(post);
    }
    ret.demandLetterFlag = src.demandLetterFlag;
    ret.demandLetterDate = src.demandLetterDate;
    ret.paymentAmount = src.paymentAmount;
    ret.paymentDate = src.paymentDate;
    ret.nextPaymentDate = src.nextPaymentDate;
    ret.pastDueAmount = src.pastDueAmount;
    ret.principalAmountDue = src.principalAmountDue;
    ret.principalPastDue = src.principalPastDue;
    ret.interestDue = src.interestDue;
    ret.lateCharges = src.lateCharges;
    ret.otherCharges = src.otherCharges;
    ret.escrowBalance = src.escrowBalance;
    ret.daysPastDue = src.daysPastDue;
    ret.dueDate = src.dueDate;
    ret.promiseDate = src.promiseDate;
    ret.lastWorkDate = src.lastWorkDate;
    ret.lastPromiseDate = src.lastPromiseDate;
    ret.paymentsDue = src.paymentsDue;
    ret.actionCodes = src.actionCodes;
    ret.resultCodes = src.resultCodes;
    ret.contactCodes = src.contactCodes;
    ret.collectionStatusCode = src.collectionStatusCode;
    ret.loanStatus = src.loanStatus;
    ret.numberOfExtensionsYTD = src.numberOfExtensionsYTD;
    ret.numberOfExtensionsLTD = src.numberOfExtensionsLTD;
    ret.dateOfLastExtension = src.dateOfLastExtension;
    ret.lifePastDue = src.lifePastDue;
    ret.queueingFlag = src.queueingFlag;
    ret.historicalAttemptsCalls = src.historicalAttemptsCalls;
    ret.chargeOffAmount = src.chargeOffAmount;
    ret.nonAccrualDate = src.nonAccrualDate;
    ret.reasonForDelinquency = src.reasonForDelinquency;
    ret.dateStampForRfD = src.dateStampForRfD;
    ret.interestRateChangeDate = src.interestRateChangeDate;
    ret.endOfDrawDate = src.endOfDrawDate;
    ret.paymentAmount = src.paymentAmount;
    ret.pastDue10LTD = src.pastDue10LTD;
    ret.pastDue30LTD = src.pastDue30LTD;
    ret.pastDue60LTD = src.pastDue60LTD;
    ret.pastDue90LTD = src.pastDue90LTD;
    ret.languageCode = src.languageCd;
    ret.pastDue30YTD = src.pastDue30YTD;
    ret.maturityDate = src.maturityDate;
    ret.origLoanAmount = src.origLoanAmount;
    ret.chargeOffDate = src.chargeOffDate;
    return ret;
  }


  static cnAccountDep(src): AccountDep{
    let accountDep = new AccountDep();

     if(!src){
       return accountDep;
     }
      accountDep.customerId = src.CustomerId;
      accountDep.openDate = src.OpenDt;
      accountDep.closeDate = src.CloseDt;
      accountDep.colBal = src.ColBal;
      accountDep.curBal = src.CurBal;
      accountDep.avlBal = src.AvlBal;
      accountDep.oDPrvlgAmt = src.ODPrvlgAmt;
      accountDep.lastODDt = src.LastODDt;
      accountDep.hldAmt = src.HldAmt;
      accountDep.lastDepDate = src.LastDepDt;
      accountDep.lastDepAmt = src.LastDepAmt;
      // accountDep.chgdOffAmt = src.ChgdOffAmt;
      accountDep.officer = src.Officer;
      accountDep.branch = src.Branch;
      accountDep.daysOverdrawn = src.DaysOverdrawn;
      accountDep.chargeOffDate = src.ChargeOffDt;
      accountDep.amountChargedOff = src.ChargeOffAmt;
      accountDep.itemsBalance = src.ItemsBal;
      accountDep.nfsFeesBalance = src.NfsFeesBal;
      accountDep.svcChargeBalance = src.SvcChargeBal;
      accountDep.fsOrigBal = src.FsOrigBal;
      accountDep.fsItemsBal = src.FsItemsBal;
      accountDep.fsDate = src.FsDate;
      accountDep.fsLastPayAmt = src.FsLastPayAmt;
      accountDep.fsPayFreq = src.FsPayFreq;
      accountDep.fsPayAmt = src.FsPayAmt;
      accountDep.fsNextPayDate = src.FsNextPayDt;
      accountDep.fsLastPayDate = src.FsLastPayDt;
      accountDep.fsPartialPayAmt = src.FsPartialPayAmt;

    return accountDep;
  }

  static callRecords2CallRecords(src): CallRecord[] {
    let ret: CallRecord[] = [];
    for (let cr of src) {
      let callR = new CallRecord();
      callR.customerId = cr.CustomerId;
      callR.callNote = cr.CallNote;
      callR.nextWorkDate = cr.NextWorkDt;
      callR.promisedAmount = cr.PromisedAmount;
      callR.promisedDate = cr.PromisedDt;
      callR.contacted = cr.Contacted;
      callR.action = cr.Action;
      callR.result = cr.Result;
      callR.createdDate = cr.CreatedDt;
      callR.createdBy = cr.CreatedBy;
      callR.firstName = cr.FirstName;
      callR.lastName = cr.LastName;
      callR.accountNumber = cr.AccountId;
      callR.accountType = cr.AccountType;

      ret.push(callR);
    }
    return ret;
  }

  //memo notes
  static callNotes(src): MemoNote[] {
    let ret: MemoNote[] = [];
    for (let cn of src) {
      let memoNote = new MemoNote();
      memoNote.id = cn.Id;
      memoNote.accountId = cn.AccountId;
      memoNote.accountType = cn.AccountType;
      memoNote.cifId = cn.CifId;
      memoNote.note = cn.Note;
      memoNote.createdBy = cn.CreatedBy;
      memoNote.createdDate = cn.CreatedDt;
      memoNote.firstName = cn.FirstName;
      memoNote.lastName = cn.LastName;
      memoNote.comName = cn.ComName;
      memoNote.createdByFirstName = cn.CreatedByFN;
      memoNote.createdByLastName = cn.CreatedByLN;
      
      ret.push(memoNote);
    }
    return ret;
  }

  static roles2Roles(src): Role[] {
    let ret: Role[] = [];
    for (let cr of src) {
      let role = new Role();
      role.id = cr.Id;
      role.code = cr.RoleCd;
      role.name = cr.RoleNm;
      role.description = cr.RoleDesc;
      role.createdBy = cr.CreatedBy;
      role.createdDate = cr.CreatedDt;

      ret.push(role);
    }
    return ret;
  }

  static nextAccount2Account(src): Account {
    let ret = new Account();
    if (!src) {
      return ret;
    }

    ret.accountId = src.accountId;
    ret.accountType = src.accountType;
    ret.campaignRecordId = src.campaignRecordId;

    return ret;
  }

  static cnAccountHistList2AccountHistoryEntries(histSrch): AccountHistoryEntry[] {
    let ret: AccountHistoryEntry[] = [];
    for (let accHL of histSrch) {
      let ahe = new AccountHistoryEntry();
      ahe.postDate = accHL.PostDt;
      ahe.amount = accHL.Amt;
      ahe.effectDate = accHL.EffDt;
      ahe.pmtDueDate = accHL.PmtDueDt;
      ahe.trnCodeCode = accHL.TrnCodeCode;
      ahe.trnCodeDescription = accHL.TrnCodeDesc;
      ahe.trnType = accHL.TrnType;
      ahe.affCode = accHL.AffCode;
      ret.push(ahe);
    }
    return ret;
  }

  static collectorProductivityArray2CollectorProductivityRecords(arr): CollectorProductivityRecord[] {
    let ret: CollectorProductivityRecord[] = [];
    for (let cpr of arr) {
      let record = new CollectorProductivityRecord();
      record.userCode = cpr.UserCd;
      record.outboundCalls = cpr.OutboundCalls;
      record.hoursWorked = cpr.HoursWorked;
      record.averageCallsPerHour = cpr.AvgCallsPerHour;
      record.contact = cpr.Contact;
      record.promises = cpr.Promises;
      record.paymentReceived = cpr.PaymentReceived;
      record.incomingCalls = cpr.IncomingCalls;
      record.contactPercentage = cpr.ContactPct;
      record.promiseToContactPercentage = cpr.PromiseToContactPct;
      record.totalCalls = cpr.TotalCalls;
      ret.push(record);
    }
    return ret;
  }

  static overallProductivityArray2OverallProductivityRecords(arr): OverallProductivityRecord[] {
    let ret: OverallProductivityRecord[] = [];
    for (let cpr of arr) {
      let record = new OverallProductivityRecord();
      record.campaignName = cpr.CampaignNm;
      record.total = cpr.Total;
      record.contact = cpr.Contact;
      record.paymentReceived = cpr.PaymentReceived;
      record.promises = cpr.Promises;
      record.contactPercentage = cpr.ContactPct;
      record.promiseToContactPercentage = cpr.PromiseToContactPct;
      ret.push(record);
    }
    return ret;
  }

  private static cnAccountLoan2AccountLoan(src): AccountLoan {
    let ret = new AccountLoan();
    if (!src) {
      return ret;
    }
    ret.collateralInformation = src.collateralInformation;
    ret.officer = src.officer;
    ret.loanType = src.loanType;
    ret.currentBalance = src.currentBalance;
    ret.currentPayOff = src.currentPayOff;
    ret.loanDate = src.loanDate;
    ret.loanTerm = src.loanTerm;
    ret.rate = src.rate;
    ret.ltv = src.ltv;
    ret.appraisedAmount = src.appraisedAmount;
    ret.lienPosition = src.lienPosition;
    ret.updatedAppraisal = src.updatedAppraisal;
    ret.updatedAppraisalDate = src.updatedAppraisalDate;
    ret.alertMessages = src.alertMessages;
    ret.collateralAddress = src.collateralAddress;
    ret.escrowAmountDue = src.escrowAmountDue;
    ret.escrowChangeDate = src.escrowChangeDate;
    ret.specialMessages = src.specialMessages;
    ret.user1Id = src.user1Id;
    ret.achAftFlag = src.achAftFlag;
    ret.mortgageBalance = src.mortgageBalance;
    ret.mortgageBalanceUpdatedDate = src.mortgageBalanceUpdatedDate;
    return ret;
  }

  private static cnAccountLossMitigation2AccountLossMitigation(src): AccountLossMitigation {
    let ret = new AccountLossMitigation();
    if (!src) {
      return ret;
    }
    ret.foreclosureFlag = src.foreclosureFlag;
    ret.foreclosureDate = src.foreclosureDate;
    ret.ticklers = src.ticklers;
    ret.ticklerDates = src.ticklerDates;
    ret.actionCodes = src.actionCodes;
    ret.actionStatus = src.actionStatus;
    ret.restructuredDebtFlag = src.restructuredDebtFlag;
    ret.restructuredDate = src.restructuredDate;
    return ret;
  }

  private static cnAccountBankruptcy2AccountBankruptcy(src): AccountBankruptcy {
    let ret = new AccountBankruptcy();
    if (!src) {
      return ret;
    }
    ret.bankruptcyType = src.bankruptcyType;
    ret.borrowerAttorneyInfo = src.borrowerAttorneyInfo;
    ret.bankAttorneyInfo = src.bankAttorneyInfo;
    ret.trusteeInfo = src.trusteeInfo;
    ret.dateFiled = src.dateFiled;
    ret.dateNoticeReceived = src.dateNoticeReceived;
    ret.caseNumber = src.caseNumber;
    ret.dischargeDismissalFlag = src.dischargeDismissalFlag;
    ret.dischargeDismissalDate = src.dischargeDismissalDate;
    ret.ticklers = src.ticklers;
    ret.ticklerDates = src.ticklerDates;
    ret.actionCodes = src.actionCodes;
    ret.actionStatus = src.actionStatus;
    ret.bankruptcyStopCodes = src.bankruptcyStopCodes;
    return ret;
  }

  private static cnAccountForeclosure2AccountForeclosure(src): AccountForeclosure {
    let ret = new AccountForeclosure();
    if (!src) {
      return ret;
    }
    ret.borrowerAttorneyInfo = src.borrowerAttorneyInfo;
    ret.bankAttorneyInfo = src.bankAttorneyInfo;
    ret.dateFiled = src.dateFiled;
    ret.dateNoticeReceived = src.dateNoticeReceived;
    ret.caseNumber = src.caseNumber;
    ret.litigationCode = src.litigationCode;
    ret.ticklers = src.ticklers;
    ret.ticklerDates = src.ticklerDates;
    ret.actionCodes = src.actionCodes;
    ret.actionStatus = src.actionStatus;
    return ret;
  }

  private static cnAccountAdditionalInfo2AccountAdditionalInfo(src): AccountAdditionalInfo {
    let ret = new AccountAdditionalInfo();
    if (!src) {
      return ret;
    }
    ret.promptScriptDecisionTree = src.promptScriptDecisionTree;
    ret.relatedAccounts = src.relatedAccounts;
    ret.riskRating = src.riskRating;
    ret.riskRatingDate = src.riskRatingDate;
    ret.vantage3Score = src.vantage3Score;
    ret.vantage3ScoreDate = src.vantage3ScoreDate;
    ret.ficoScore = src.ficoScore;
    ret.ficoScoreDate = src.ficoScoreDate;
    ret.bankruptcyScore = src.bankruptcyScore;
    ret.bankruptcyScoreDate = src.bankruptcyScoreDate;
    ret.eaPcFlag = src.eaPcFlag;
    ret.historicalFicoVantageScores = src.historicalFicoVantageScores;
    ret.collateralTrackingInformation = src.collateralTrackingInformation;
    return ret;
  }

  private static address2Address(addr): Address {
    let ret = new Address();
    if (!addr) {
      return ret;
    }
    ret.streetAddress1 = addr.streetAddr1;
    ret.streetAddress2 = addr.streetAddr2;
    ret.streetAddress3 = addr.streetAddr3;
    ret.city = addr.city;
    ret.stateCode = addr.stateCode;
    ret.postalCode = addr.postalCode;
    return ret;
  }

  private static person2Person(pers): Person {
    let ret = new Person();
    ret.completeName = pers.comName;
    ret.firstName = pers.firstName;
    ret.lastName = pers.lastName;
    return ret;
  }

  private static phone2Phone(phone): Phone {
    let ret = new Phone();
    ret.number = phone.phoneNum;
    switch (phone.phoneType) {
      case HOME_PHONE:
        ret.type = PhoneType.Home;
        break;
      case BUSINESS_PHONE:
        ret.type = PhoneType.Business;
        break;
      case CELLULAR_PHONE:
        ret.type = PhoneType.CellularHome;
        break;
      default:
        ret.type = PhoneType.Unknown;
    }
    ret.typeDescription = phone.phoneType;
    ret.lineType = phone.phoneLineType == LANDLINE_TYPE ? LineType.LandLine : LineType.Unknown;
    ret.phoneLineTypeCode = phone.phoneLineType;
    ret.callsMadeToday = phone.callsMadeToday;
    return ret;
  }

}


