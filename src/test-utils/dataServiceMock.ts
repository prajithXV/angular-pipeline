import {HotkeysSubscriber} from "../app/general/hotkeys-subscriber";
import {Campaign} from "../app/models/campaign";
import {Code} from "../app/models/code";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {
  Account, AccountAdditionalInfo, AccountBankruptcy, AccountCollection, AccountForeclosure, AccountHistoryEntry,
  AccountLoan,
  AccountLossMitigation
} from "../app/models/account";
import {CollectorProductivityRecord} from "../app/models/collector-productivity-record";
import {CampaignStatsToken} from "../app/models/campaign-stats-token";
import {CampaignList} from "../app/models/campaign-list";
import {CampaignListAccount} from "../app/models/campign-list-accounts";
import {Customer} from "../app/models/customer";
import {Person} from "../app/models/person";
import {Address} from "../app/models/address";
import {LineType, Phone, PhoneType} from "../app/models/phone";
import {Agent} from "../app/models/agent";
import {Role} from "../app/models/role";
import {OverallProductivityRecord} from "../app/models/overall-productivity-record";
import {CallsPersHour} from "../app/models/callsPersHour";
import {IncomingCalls} from "../app/models/incomingCalls";
import {ContactPercentage} from "../app/models/contact-percentage";
import {CampaignAttribute} from "../app/models/campaign-attribute";
import {CampaignListAttribute} from "../app/models/campaign-list-attribute";
import {TicklerProcess} from "../app/models/tickler-processes";
import {TicklerType} from "../app/models/tickler-types";
import {AttributeType} from "../app/models/attribute";
import {TicklerAttribute} from "../app/models/tickler-attribute";
import {ProcessCase} from "../app/models/process-case";
import {ProcessCaseTickler} from "../app/models/process-case-tickler";
import {TicklerTypeMap} from "../app/models/tickler-type-map";
import {TicklerAttributeMap} from "../app/models/tickler-attribute-map";
import {CampaignListOrderByType} from "../app/models/cl-order-by-type";
import {CampaignListRecord} from "../app/models/campaign-list-record";
import {SortOrder} from "../app/models/sort-order";
import {Observable} from "rxjs/Observable";
import {CancelCampaignCallRecordReason} from "../app/models/cancel-campaign-call-record-reason";
import {CustomerConsent} from "../app/models/customer-consent";
import {CustomerNote} from "../app/models/customer-note";
import {CallRecord} from "../app/models/call-record";
import {LovType} from "../app/models/lov-types";
import {LovValue} from "../app/models/lov-values";

export const dataServiceMock = {


  accountTypes:
  [
    new Code("L", "Loan"),
    new Code("D", "Deposit")
  ],

  lovValues:
  [
    new LovValue(1, 1, 'V7', 'value 7', 'test1', true, 'Hak'),
    new LovValue(2, 2, '7', '7 name', 'test2', false, 'Yona'),
    new LovValue(3, 3, '11/25/1970 3:22 AM', 'date', 'test3', false, 'Shin'),
  ],

  lovTypesCodes:
  [
    new Code(AttributeType.string.toString(), "String"),
    new Code(AttributeType.number.toString(), "Number"),
    new Code(AttributeType.datetime.toString(), "Date and time")
  ]
  ,

  lovTypes:
  [
    new LovType(1, "LOV_CODE3",  "lov3", "lov3 desc", true, AttributeType.string, false, "Hak", "2018-11-30T11:22:34.57", "Yona", "2018-12-30T11:22:34.57"),
    new LovType(2, "LOV_CODE1",  "lov1", "lov1 desc", false, AttributeType.number, true, "Guts", "2018-11-30T11:22:34.57", "Griffith", "2018-12-30T11:22:34.57"),
    new LovType(3, "LOV_CODE2",  "lov2", "lov2 desc", true, AttributeType.datetime, false, "Shin", "2018-11-30T11:22:34.57", "Yona", "2018-12-30T11:22:34.57"),
  ],

  followUpDueCodes:
    [
    new Code("DUE", "Due"),
    new Code("NODUE", "Nodue"),
    new Code("NULL", "Null"),
  ],

  customerConsents: [
    new CustomerConsent(1, "111", "777777777",true, "note1", "Eren", "2018-11-30T11:22:34.57"),
    new CustomerConsent(2, "112", "89213276207",false, "note2", "Eren", "2018-11-29T11:22:34.57"),
    new CustomerConsent(3, "113", "89213276207",true, "note3", "Eren", "2018-11-28T11:22:34.57"),
    new CustomerConsent(4, "113", "777777777",true, "note3", "Eren", "2018-11-28T11:22:34.57"),
  ],

  cancelCampaignCallRecordReason: [
    new  CancelCampaignCallRecordReason(1,"CODE1", "Code1", "description1")
  ],

  campaignListRecords: [
    new CampaignListRecord("DIRECT", "0", "5555555", "callp", "DONE", "Hak",
      "2018-11-29T11:22:34.57", "2018-11-30T11:22:34.57", "Yona", "TIMEZONE"),

    new CampaignListRecord("INDIRECT", "1", "6555555", "callp2", "NEW", "Hak",
      "2018-11-29T11:22:34.57", "2018-11-30T11:22:34.57", "Yona", "TIMEZONE"),

    new CampaignListRecord("DIRECT", "0", "7555555", "callp3", "DONE", "Hak",
      "2018-11-29T11:22:34.57", "2018-11-30T11:22:34.57", "Yona", "TIMEZONE")

  ],
  campaignListOrderByType: [
    new CampaignListOrderByType("TIMEZONE", "Timezone")
  ],

  ticklerTypeMaps: [
    new TicklerTypeMap(1, 1, "customer1", 2, "CUSTOMER2", "customer2", "Y", "Hak", "2018-11-29T11:22:34.57", "Yona" ),
    new TicklerTypeMap(2, 2, "customer2", 3, "CUSTOMER3", "customer3", "Y", "Hak", "2018-11-29T11:22:34.57", "Yona" ),

  ],

  ticklerTypeMaps2: [
    new TicklerTypeMap(1, 1, "Customer1", 2, "CUSTOMER2", "Customer2", "Y", "Hak", "2018-11-29T11:22:34.57", "Yona" ),
    new TicklerTypeMap(2, 2, "Customer2", 3, "CUSTOMER3", "Customer3", "Y", "Hak", "2018-11-29T11:22:34.57", "Yona" ),
    new TicklerTypeMap(5, 2, "Customer2", 5, "CUSTOMER5", "Customer5", "Y", "Hak", "2018-11-29T11:22:34.57", "Yona" ),

  ],

  ticklerTypeMaps3: [
    new TicklerTypeMap(1, 1, "Customer1", 2, "CUSTOMER2", "Customer2", "Y", "Hak", "2018-11-29T11:22:34.57", "Yona" ),
    new TicklerTypeMap(2, 2, "Customer2", 3, "CUSTOMER3", "Customer3", "Y", "Hak", "2018-11-29T11:22:34.57", "Yona" ),
    new TicklerTypeMap(5, 2, "Customer2", 5, "CUSTOMER5", "Customer5", "Y", "Hak", "2018-11-29T11:22:34.57", "Yona" ),

  ],

  processCaseTicklers: [

    new ProcessCaseTickler(1, 1, "","CUSTOMER1", "desc1", "Hak", "2018-11-29T11:22:34.57",  [new CampaignListAttribute("CODE1", ["val1"])]),
    new ProcessCaseTickler(2, 2, "", "CUSTOMER2", "desc2", "Yona", "2018-11-30T11:22:34.57", [new CampaignListAttribute("CODE2", ["val2"])]),
  ],

  processCases: [
    new ProcessCase(1, "122", "123", "desc", "SPOC", "NEW", "2018-11-29T11:22:34.57", "Guts", "2018-11-27T11:22:34.57", "Isabeau", "", "", "L"),
    new ProcessCase(2, "123", "124", "desc2", "SPAC", "NEW", "2018-11-30T11:22:34.57", "Griffith", "2018-11-28T11:22:34.57", "Navarre", "", "", "D"),
  ],

  currentProcessCase:
    [new ProcessCase(1, "122", "123", "desc", "SPOC", "NEW", "2018-11-29T11:22:34.57", "Guts", "2018-11-27T11:22:34.57", "Isabeau")],
  attributeCodes: [
    new Code(AttributeType.string.toString(), "String"),
    new Code(AttributeType.number.toString(), "Number"),
    new Code(AttributeType.date.toString(), "Date"),
    new Code(AttributeType.datetime.toString(), "Date and time"),
    new Code(AttributeType.lov.toString(), "List of values"),
  ],
  ticklerAttribute:[
    new TicklerAttribute(1, "TEST1","Test1", "desc1", 0, true, true,
                          true,"Guts", "2018-11-29T11:22:34.57","Griffith","2018-11-30T11:22:34.57" , ""),
    new TicklerAttribute(2, "TEST2", "Test2", "desc2", 1, false,true,
                          true,"Griffith", "2018-11-01T11:22:34.57", "Guts", "2018-11-02T11:22:34.57", ""),
    new TicklerAttribute(3, "TEST3", "Test3", "desc3", 4, true,true,
      false,"Hak", "2018-11-02T11:22:34.57", "Yona", "2018-11-03T11:22:34.57", "LOV_CODE3")
  ],


  ticklerAttribute4:[
    new TicklerAttribute(1, "TEST1","Test1", "desc1", 0, true, true, true,
      "Guts", "2018-11-29T11:22:34.57","Griffith","2018-11-30T11:22:34.57" ),
    new TicklerAttribute(2, "TEST2", "Test2", "desc2", 1, false,true, true,
      "Griffith", "2018-11-01T11:22:34.57", "Guts", "2018-11-02T11:22:34.57"),
    new TicklerAttribute(3, "TEST3", "Test3", "desc2", 1, false,true, true,
      "Griffith", "2018-11-01T11:22:34.57", "Guts", "2018-11-02T11:22:34.57")
  ],

  ticklerAttributeMap: [
    new TicklerAttributeMap(1,1, 1, "Hak", "2018-11-30T11:22:34.57", "CUSTOMER1", "Customer1", "TEST1", "Test1", 0,true, true),
    new TicklerAttributeMap(2,2, 2, "Hak", "2018-11-30T11:22:34.57", "CUSTOMER2", "Customer2", "TEST2", "Test2", 1, true, false),
  ],


  ticklerAttribute3:[
    new TicklerAttribute(1, "CODE2","Test1", "desc1", 0, true, true,
      true,"Guts", "2018-11-29T11:22:34.57","Griffith","2018-11-30T11:22:34.57" ),
  ],

  ticklerAttribute2: [],

  ticklerType: [
    new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
                    true,false,false,2,"Shin", "2018-11-29T11:22:34.57"),

    new TicklerType(2, 'CUSTOMER2', "Customer2", "Tickler description", true, 8, 8,
      false,true,true, true, 1,"Hak", "2018-12-29T11:22:34.57")
  ],

  ticklerType4: [
    new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
      true,false,false,2,"Shin", "2018-11-29T11:22:34.57"),

    new TicklerType(2, 'CUSTOMER2', "Customer2", "Tickler description", true, 8, 8,
      false,true,true, true, 1,"Hak", "2018-12-29T11:22:34.57"),
    new TicklerType(4, 'CUSTOMER4', "Customer4", "Tickler description", true, 9, 8,
      false,true,true, true, 5,"Hak", "2018-12-29T11:22:34.57")
  ],

  ticklerType5: [
    new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
      true,false,false,2,"Shin", "2018-11-29T11:22:34.57"),

    new TicklerType(2, 'CUSTOMER2', "Customer2", "Tickler description", true, 8, 8,
      false,true,true, true, 1,"Hak", "2018-12-29T11:22:34.57"),
    new TicklerType(4, 'CUSTOMER4', "Customer4", "Tickler description", true, 9, 8,
      false,true,true, true, 5,"Hak", "2018-12-29T11:22:34.57"),
    new TicklerType(5, 'CUSTOMER5', "Customer5", "Tickler description", true, 10, 8,
      false,true,true, true, 5,"Hak", "2018-12-29T11:22:34.57")
  ],

  ticklerType6: [
    new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
      true,false,false,2,"Shin", "2018-11-29T11:22:34.57"),

    new TicklerType(2, 'CUSTOMER2', "Customer2", "Tickler description", true, 8, 8,
      false,true,true, true, 1,"Hak", "2018-12-29T11:22:34.57"),
    new TicklerType(5, 'CUSTOMER5', "Customer5", "Tickler description", true, 10, 8,
      false,true,true, true, 5,"Hak", "2018-12-29T11:22:34.57")
  ],


  ticklerType7: [
    new TicklerType(1, 'CUSTOMER1', "Customer1", "Tickler description", true, 1, 7, true,
      true,false,false,2,"Shin", "2018-11-29T11:22:34.57"),

    new TicklerType(2, 'CUSTOMER2', "Customer2", "Tickler description", true, 8, 8,
      false,true,true, true, 1,"Hak", "2018-12-29T11:22:34.57"),
    new TicklerType(5, 'CUSTOMER5', "Customer5", "Tickler description", true, 10, 8,
      false,false,true, true, 5,"Hak", "2018-12-29T11:22:34.57")
  ],


  ticklerType2: [],

  processes: [
    new TicklerProcess(1, "SPOC", 'SPOC Name', "Hak", "2018-11-29T11:22:34.57"),
    new TicklerProcess(2, "SPAC", 'SPAC Name', "Yona", "2018-12-29T11:22:34.57")
  ],

  processes2: [],

  campaignList: [

    new CampaignList(1,"DIRECT","Direct", 1,"2018-11-29T11:22:34.57","Arslan","","","NEW",
                [new CampaignListAttribute("1","value1"),
                          new CampaignListAttribute("2","value2")],

                    [new CampaignStatsToken("DIRECT","NEW",5),
                          new CampaignStatsToken("DIRECT","CANCELED",7)], "Timezone", new SortOrder(false, "TIMEZONE")),

    new CampaignList(2,"DIRECT","Direct", 1,"2018-12-29T10:22:34.57","Daryun","","","NEW",
      [new CampaignListAttribute("3","value3"),
                new CampaignListAttribute("4","value4")],

      [new CampaignStatsToken("DIRECT","NEW",20),
        new CampaignStatsToken("DIRECT","CANCELED",17)], "Id", new SortOrder(false, "ID")),

    new CampaignList(3,"DIRECT","Direct", 1,"2018-10-29T12:22:34.57","Parm","","","NEW",
            [new CampaignListAttribute("5","value5"),
                      new CampaignListAttribute("6","value6")],

      [new CampaignStatsToken("DIRECT","NEW",30),
        new CampaignStatsToken("DIRECT","CANCELED",20)], "Timezone", new SortOrder(false, "TIMEZONE"))

  ],


  campaignList2: [],



  campaignList3: [

    new CampaignList(1,"DIRECT","Direct", 1,"2018-11-29T11:22:34.57","Arslan","","","NEW",
      [new CampaignListAttribute("1","value1"),new CampaignListAttribute("2","value2")],
      [new CampaignStatsToken("DIRECT","NEW",5),
        new CampaignStatsToken("DIRECT","CANCELED",7)]),
  ],

  contactPercentage: [
    new ContactPercentage("DIRECT",20, 13)
  ],

  contactPercentage2: [],

  contactPercentage3: [
    new ContactPercentage("DIRECT",20, 13),
    new ContactPercentage("INDIRECT",35, 10)
  ],

  contactPercentage4: [
    new ContactPercentage("INDIRECT",40, 13),
    new ContactPercentage("INDIRECT",20, 10)
  ],

  incomingCalls: [
    new IncomingCalls(13,7)
  ],

  incomingCalls2: [],

  incomingCalls3: [

    new IncomingCalls(13,7),
    new IncomingCalls(8,20)


  ],

  callsPersHour: [

    new CallsPersHour('DIRECT', 13, 10, 20, 5),
  ],

  callsPersHour2: [],

  callsPersHour3: [

    new CallsPersHour('DIRECT', 13, 10, 20, 5),
    new CallsPersHour('INDIRECT', 11, 15, 22, 7),
  ],

  callsPersHour4: [

    new CallsPersHour('DIRECT', 13, 10, 20, 5),
    new CallsPersHour('DIRECT', 11, 15, 22, 7),
  ],


  from: new Date(),
  to: new Date(),

  agent:[
    new Agent("account1","Keanu",true,true,true,true,"2018-12-13T11:34:26.937","R"),
    new Agent("account2","Michael",false,true,false,false,"2018-11-13T13:34:26.937","F")

  ],

  agent2: [],


  agent3: [
    new Agent("Isabeau", "Isabeau", null, null, null, null, "", "d'Anjou"),
    new Agent("Guts", "Guts", null, null, null, null, "", "black sword"),
  ],

  roles: [
    new Role(1,"CODE1","Code1","descritpion1"),
    new Role(2,"CODE2","Code2","description2"),
  ],

  role2: [],

  codes: [
    new Code("NEW", "New"),
    new Code("LOCKED", "Locked"),
    new Code("DONE", "Done"),
    new Code("CANCELED", "Canceled")
  ],

  code:  [
    new Code("CLOSED", "Closed"),
    new Code("NEW", "New"),
    new Code("IN PROGRESS", "In progress")
  ],



  code2: [],

  productivityRecords: [
    new CollectorProductivityRecord("ajaillet", 1, "00:00", 6, 1,
      5, 8, 4, 9, 5, 10)],

  account: new Account("campaignRecordId", "accountId", "accountType"),

  account4:
    new Account("DIRECT", "707", "A", new Customer("1", "777", "888", "555555",
      new Person("Nick Furia", "Nick", "Furia"), new Address("SHIELD", "", "", "NY", "8", "0580"),
      ["nFuria@shield.com", "nFury@shield.com"], "565656", [new Phone("777777777", PhoneType.Business, LineType.LandLine, "Business Phone")], "C", "EN",
      "#market", true, "#emplyment info", 2, true, [new Account("DIRECT","787878", "L", new Customer(), "Primary", "Active", 75, "Vendor","01", new AccountCollection())],
      [
        new CustomerNote("1", "1", "L", "#message1", "9/21/2017 12:00:00 AM", "9/22/2017 12:00:00 AM", "#msg categ1", "#msg type1"),
        new CustomerNote("2", "2", "P", "#message2", "9/20/2017 12:00:00 AM", "9/21/2017 12:00:00 AM", "#msg categ2", "#msg type2"),
      ],
      [
        new CustomerNote("1", "1", "L", "#msg", "9/20/2017 12:00:00 AM", "9/21/2017 12:00:00 AM", "#msg categ", "#msg type")
      ],
      [
        new CallRecord("1", "No promises1", "#next wd1", 700, "#promise date1", "Navarre", "#action1", "Call later", "#created date1", "Griffith", "Keanu", "R"),
        new CallRecord("2", "No promises2", "#next wd2", 800, "#promise date2", "Isabeau", "#action2", "Call later", "#created date2", "Guts", "Robert", "D"),
        new CallRecord("3", "No promises3", "#next wd3", 900, "#promise date3", "Falkor", "#action3", "Answered/No Message", "#created date3", "Eren", "Chris", "E"),
      ],
      [new Customer("1", "111", "1212", "1111111", new Person("Lady Falcon", "Lady", "Falcon"), new Address("Enchanted castle", "", "", "Fanellia", "7878"),["ladyFalcon@falcon.com"], "7777", [new Phone("123456789", PhoneType.CellularHome, LineType.LandLine, "Cellular Home")])]), "#relationDesc", "#sDesc", 7777, "#pDescription", "pCode",
      new AccountCollection("#pre bp", ["MemoPostProPay", "memo", "cust", "custi"], "Y", "2018-12-13T11:34:26.937",
        777777, "12/12/2005 12:00:00 AM", "12/12/2006 12:00:00 AM", 5555, 777, 8888, 9999, 5,
        6, "#Collection notes", 10, 60,  "#due date", "#prom date", "#last work date", "#last prom date", 7, "#action codes", "#result codes", "#contact codes", "#collection status", "#loan status", 555,
        77, "#date ole", "#life pd", "#qFlag", "stolen", "#historical ac", 5, "#non ad", "no money", "#date stamp for rfd", "#interest rate change date", "#end of draw date",
      "#past due 10", "#past due 30", "#past due 60","#past due 90", "#lCode"), new AccountLoan("cInfo", "Hak", "#loan type", 75, 45, "2/1/2001 12:00:00 AM", "#loan term", "#loan rate",
        "#ltv", 55, 7,"#updated appr", "2018-12-20T11:34:26.937", "STARK", "Los Angles", 4, "#escrow change date", "#special messages",7,
        "false", 35, "#mortgage bud"), new AccountLossMitigation("Y", "2/1/2018 12:00:00 AM", "#ticklers", "#tickler dates", "#aCodes", "#action status",
        "#restructured df", "#re date"),
      new AccountBankruptcy("L", "#borrower ai", "#bank ai", "#trust info", "#datef", "#date nr", 5, "false", "#discharge dd", "#ticklers", "#tickler dates", "#aCodes", "#aStatus", "#bank sc"),
      new AccountForeclosure("#borrower ai", "#bank ai", "#date field", "#date nr", 5, "#litigation codes", "#ticklers", "tickler dates", "#aCodes", "#aStatus"),
      new AccountAdditionalInfo("#promp sdt", "#related ac", 50,"#risk rd", 17,"#vantage sd", 10,"#fico sd", 45,"#bsd","true", 55,"#collateral ti"),
      [new AccountHistoryEntry("#post date", 77, "#effect date", "#pmt dd", "#trnCodeCode", "#trnCodeDesc", "#trnType",
        "#affCode")]),

  account5:
    new Account("DIRECT", "707", "A", new Customer("1", "777", "888", "555555",
      new Person("Nick Furia", "Nick", "Furia"), new Address("SHIELD", "", "", "NY", "8", "0580"),
      ["nFuria@shield.com", "nFury@shield.com"], "565656", [new Phone("777777777", PhoneType.Business, LineType.Cellular, "Business Phone")], "P", "EN",
      "#market", true, "#emplyment info", 2, false, [new Account("DIRECT","787878", "L", new Customer(), "Primary", "Active", 75, "Vendor","01", new AccountCollection())],
      [new CustomerNote("1", "1", "L", "#message", "#start date", "#end date", "#msg categ", "#msg type")],
      [new CustomerNote("1", "1", "L", "#msg", "#start date", "#end date", "#msg categ", "#msg type")],
      [new CallRecord("1", "Call later", "#next wd", 700, "#promise date", "Guts", "#action", "#result", "#created date", "Griffith", "Keanu", "R")],
      [new Customer("1", "111", "1212", "1111111", new Person("Lady Falcon", "Lady", "Falcon"), new Address("Enchanted castle", "", "", "Fanellia", "7878"),["ladyFalcon@falcon.com"], "7777", [new Phone("123456789", PhoneType.CellularHome, LineType.Cellular, "Cellular Home")])]), "#relationDesc", "#sDesc", 7777, "#pDescription", "pCode",
      new AccountCollection("#pre bp", ["cust", "custi"], "Y", "2018-12-13T11:34:26.937",
        777777, "12/12/2005 12:00:00 AM", "12/12/2006 12:00:00 AM", 5555, 777, 8888, 9999, 5,
        6, "#Collection notes", 10, 60,  "#due date", "#prom date", "#last work date", "#last prom date", 7, "#action codes", "#result codes", "#contact codes", "#collection status", "#loan status", 555,
        77, "#date ole", "#life pd", "#", "stolen", "#historical ac", 5, "#non ad", "no money", "#date stamp for rfd", "#interest rate change date", "#end of draw date",
        "#past due 10", "#past due 30", "#past due 60","#past due 90", "#lCode"), new AccountLoan("cInfo", "Hak", "#", 75, 45, "2/1/2001 12:00:00 AM", "#loan term", "#loan rate",
        "#ltv", 55, 7,"#updated appr", "2018-12-20T11:34:26.937", "STARK", "Los Angles", 4, "#escrow change date", "#special messages",7,
        "false", 35, "#mortgage bud"), new AccountLossMitigation("Y", "2018-12-13T11:34:26.937", "#ticklers", "#tickler dates", "#aCodes", "#action status",
        "#restructured df", "#"), new AccountBankruptcy("L", "#borrower ai", "#bank ai", "#", "#datef", "#date nr", 5, "false", "#discharge dd", "#ticklers", "#tickler dates"),
      new AccountForeclosure("#borrower ai", "#bank ai", "#date field", "#date nr", 5, "#litigation codes", "#ticklers", "tickler dates", "#aCodes", "#aStatus"),
      new AccountAdditionalInfo("#promp sdt", "#related ac", 50,"#risk rd", 17,"#", 10,"#fico sd", 45,"#bsd","true", 55,"#collateral ti"),
      [new AccountHistoryEntry("#post date", 77, "#effect date", "#pmt dd", "#trnCodeCode", "#trnCodeDesc", "#trnType",
        "#affCode")]),

  account6:
    new Account("DIRECT", "707", "A", new Customer("1", "777", "888", "555555",
      new Person("Nick Furia", "Nick", "Furia"), new Address("SHIELD", "", "", "NY", "8", "0580"),
      ["nFuria@shield.com", "nFury@shield.com"], "565656", [new Phone("777777777", PhoneType.Business, LineType.LandLine, "Business Phone")], "P", "EN",
      "#market", true, "#emplyment info", 2, true, [new Account("DIRECT","787878", "L", new Customer("1", "777", "7", "707", new Person("Etienne Navarre", "Etienne", "Navarre"), new Address("Enchanted Forest", "", "", "Skypiea", "7777", "0880"), ["eNavarre@wolf.com"], "5555",[new Phone("987654321", PhoneType.CellularHome, LineType.LandLine)]), "Primary", "Active", 75, "Vendor","01", new AccountCollection())],
      [new CustomerNote("1", "1", "L", "#message", "#start date", "#end date", "#msg categ", "#msg type")],
      [new CustomerNote("1", "1", "L", "#msg", "#start date", "#end date", "#msg categ", "#msg type")],
      [new CallRecord("1", "Call later", "#next wd", 700, "#promise date", "Guts", "#action", "#result", "#created date", "Griffith", "Keanu", "R")],
      [new Customer("1", "111", "1212", "1111111", new Person("Lady Falcon", "Lady", "Falcon"), new Address("Enchanted castle", "", "", "Fanellia", "7878"),["ladyFalcon@falcon.com"], "7777", null)]), "#relationDesc", "#sDesc", 7777, "#pDescription", "pCode",
      new AccountCollection("#pre bp", ["MemoPostProPay", "memo", "cust", "custi"], "Y", "2018-12-13T11:34:26.937",
        777777, "12/12/2005 12:00:00 AM", "12/12/2006 12:00:00 AM", 5555, 777, 8888, 9999, 5,
        6, "#Collection notes", 10, 60,  "#due date", "#prom date", "#last work date", "#last prom date", 7, "#action codes", "#result codes", "#contact codes", "#collection status", "#loan status", 555,
        77, "#date ole", "#life pd", "#qFlag", "stolen", "#historical ac", 5, "#non ad", "no money", "#date stamp for rfd", "#interest rate change date", "#end of draw date",
        "#past due 10", "#past due 30", "#past due 60","#past due 90", "#lCode"), new AccountLoan("cInfo", "Hak", "#loan type", 75, 45, "2/1/2001 12:00:00 AM", "#loan term", "#loan rate",
        "#ltv", 55, 7,"#updated appr", "2018-12-20T11:34:26.937", "STARK", "Los Angles", 4, "#escrow change date", "#special messages",7,
        "false", 35, "#mortgage bud"), new AccountLossMitigation("Y", "2/1/2018 12:00:00 AM", "#ticklers", "#tickler dates", "#aCodes", "#action status",
        "#restructured df", "#re date"),
      new AccountBankruptcy("L", "#borrower ai", "#bank ai", "#trust info", "#datef", "#date nr", 5, "false", "#discharge dd", "#ticklers", "#tickler dates", "#aCodes", "#aStatus", "#bank sc"),
      new AccountForeclosure("#borrower ai", "#bank ai", "#date field", "#date nr", 5, "#litigation codes", "#ticklers", "tickler dates", "#aCodes", "#aStatus"),
      new AccountAdditionalInfo("#promp sdt", "#related ac", 50,"#risk rd", 17,"#vantage sd", 10,"#fico sd", 45,"#bsd","true", 55,"#collateral ti"),
      [new AccountHistoryEntry("#post date", 77, "#effect date", "#pmt dd", "#trnCodeCode", "#trnCodeDesc", "#trnType",
        "#affCode")]),

  account7: [
    new Account("DIRECT", "707", "A",new Customer(),"Primary","Active",113.07,
                "Vendor","01")
  ],



  account8:
    new Account("DIRECT", "707", "A", new Customer("1", "777", "888", "555555",
      new Person("Nick Furia", "Nick", "Furia"), new Address("SHIELD", "", "", "NY", "8", "0580"),
      ["nFuria@shield.com", "nFury@shield.com"], "565656", [new Phone("777777777", PhoneType.Business, LineType.Cellular, "Business Phone")], "P", "EN",
      "#market", true, "#emplyment info", 2, true, [new Account("DIRECT","787878", "L", new Customer(), "Primary", "Active", 75, "Vendor","01", new AccountCollection())],
      [new CustomerNote("1", "1", "L", "#message", "#start date", "#end date", "#msg categ", "#msg type")],
      [new CustomerNote("1", "1", "L", "#msg", "#start date", "#end date", "#msg categ", "#msg type")],
      [new CallRecord("1", "Call later", "#next wd", 700, "#promise date", "Guts", "#action", "#result", "#created date", "Griffith", "Keanu", "R")],
      [new Customer("1", "111", "1212", "1111111", new Person("Lady Falcon", "Lady", "Falcon"), new Address("Enchanted castle", "", "", "Fanellia", "7878"),["ladyFalcon@falcon.com"], "7777", [new Phone("123456789", PhoneType.CellularHome, LineType.Cellular, "Cellular Home")])]), "#relationDesc", "#sDesc", 7777, "#pDescription", "pCode",
      new AccountCollection("#pre bp", ["cust", "custi"], "Y", "2018-12-13T11:34:26.937",
        777777, "12/12/2005 12:00:00 AM", "12/12/2006 12:00:00 AM", 5555, 777, 8888, 9999, 5,
        6, "#Collection notes", 10, 60,  "#due date", "#prom date", "#last work date", "#last prom date", 7, "#action codes", "#result codes", "#contact codes", "#collection status", "#loan status", 555,
        77, "#date ole", "#life pd", "#", "stolen", "#historical ac", 5, "#non ad", "no money", "#date stamp for rfd", "#interest rate change date", "#end of draw date",
        "#past due 10", "#past due 30", "#past due 60","#past due 90", "#lCode"), new AccountLoan("cInfo", "Hak", "#", 75, 45, "2/1/2001 12:00:00 AM", "#loan term", "#loan rate",
        "#ltv", 55, 7,"#updated appr", "2018-12-20T11:34:26.937", "STARK", "Los Angles", 4, "#escrow change date", "#special messages",7,
        "false", 35, "#mortgage bud"), new AccountLossMitigation("Y", "2018-12-13T11:34:26.937", "#ticklers", "#tickler dates", "#aCodes", "#action status",
        "#restructured df", "#"), new AccountBankruptcy("L", "#borrower ai", "#bank ai", "#", "#datef", "#date nr", 5, "false", "#discharge dd", "#ticklers", "#tickler dates"),
      new AccountForeclosure("#borrower ai", "#bank ai", "#date field", "#date nr", 5, "#litigation codes", "#ticklers", "tickler dates", "#aCodes", "#aStatus"),
      new AccountAdditionalInfo("#promp sdt", "#related ac", 50,"#risk rd", 17,"#", 10,"#fico sd", 45,"#bsd","true", 55,"#collateral ti"),
      [new AccountHistoryEntry("#post date", 77, "#effect date", "#pmt dd", "#trnCodeCode", "#trnCodeDesc", "#trnType",
        "#affCode")]),

  account2: [
    new Account("DIRECT", "707", "A",new Customer(),"Primary","Active",113.07,
      "Vendor","01"),
    new Account("INDIRECT", "708", "D",new Customer(),"Joint","Active",114.07,
      "Commercial Loan","02"),
    new Account("DIRECT", "703", "L",new Customer(),"Primary","Active",113.07,
      "Certificate of Deposit","07"),
  ],

  account3: [],

  customer3: [],

  campaign: [
    new Campaign("DEMO_CAMPAIGN", "Demo Campaign", "user1", null,[new CampaignAttribute(1,"NEW","c1",AttributeType.string,true)], "PAUSED"),
    new Campaign("DIRECT", "Direct", "user2", null,[new CampaignAttribute(1,"0","c1",AttributeType.string,true)], "NEW"),
    new Campaign("INDIRECT", "Indirect", "user3", null,[new CampaignAttribute(1,"0","c1",AttributeType.string,true)], "PAUSED"),
    new Campaign("REAL_STATE", "Real State", "user4", null,[new CampaignAttribute(1,"0","c1",AttributeType.string,true)], "NEW")
  ],

  campaign3: [
    new Campaign("DEMO_CAMPAIGN", "Demo Campaign", "user1", null,[new CampaignAttribute(1,"NEW","c1",AttributeType.string,true)], "PAUSED"),
    new Campaign("DIRECT", "Direct", "user1", null,[new CampaignAttribute(1,"0","c1",AttributeType.string,true)], "NEW"),
    new Campaign("INDIRECT", "Indirect", "user1", null,[new CampaignAttribute(1,"0","c1",AttributeType.string,true)], "PAUSED"),
    new Campaign("REAL_STATE", "Real State", "user1", null,[new CampaignAttribute(1,"0","c1",AttributeType.string,true)], "NEW")
  ],


  campaign4: [
    new Campaign("DEMO_CAMPAIGN", "Demo Campaign", "user1", null,[new CampaignAttribute(1,"NEW","c1",AttributeType.string,true)], "PAUSED"),
    new Campaign("DIRECT", "Direct", "user1", null,[new CampaignAttribute(1,"0","c1",AttributeType.string,true)], "PAUSED"),
    new Campaign("INDIRECT", "Indirect", "user1", null,[new CampaignAttribute(1,"0","c1",AttributeType.string,true)], "PAUSED"),
    new Campaign("REAL_STATE", "Real State", "user1", null,[new CampaignAttribute(1,"0","c1",AttributeType.string,true)], "PAUSED")
  ],

  campaign2: [],

  CampaignStatsToken: [
    new CampaignStatsToken("DEMO_CAMPAIGN", "CANCELED", 10),
    new CampaignStatsToken("DIRECT", "NEW", 11),
    new CampaignStatsToken("INDIRECT", "LOCKED", 5),
    new CampaignStatsToken("REAL_STATE", "DONE", 7),
    new CampaignStatsToken("DIRECT", "DONE", 8),
    new CampaignStatsToken("DEMO_CAMPAIGN", "NEW", 20),
    new CampaignStatsToken("REAL_STATE", "LOCKED", 30),
    new CampaignStatsToken("INDIRECT", "NEW", 30),
    new CampaignStatsToken("INDIRECT", "DONE", 0),
    new CampaignStatsToken("REAL_STATE", "NEW", 15),
  ],

  campaignListAccounts: [
    new CampaignListAccount("DIRECT","Direct", 1076630, "6900551729",
      "L", "WAA1486","P", "589","5.32","07/07/2007",
      "08/08/2007","09/09/2007","Keanu","77",3,"NEW",
      "Hayden","2007-12-20T04:40:10.95", null,"Harrison",null,
      "Edward","10/27/2017")
  ],


  campaignListAccounts2: [],

  customer: [
    new Customer("AAD9461","cifno","436909217","social",new Person("Michael F.","Michael","F"),
                  new Address("Los Angeles")),
  ],

  customer2: [
    new Customer("AAD9461","cifno","436909217","social",new Person("Michael F.","Michael","F"),
      new Address("Los Angeles"),["michaelf@gmail.com"],"",[new Phone("933787878")]),

    new Customer("AAD9462","cifno","436909218","social",new Person("Robert D.","Robert","D"),
      new Address("USA"))
  ],


  customer4:
    new Customer("1", "777", "7", "707", new Person("Etienne Navarre", "Etienne", "Navarre"), new Address("Enchanted Forest", "", "", "Skypiea", "7777", "0880"), ["eNavarre@wolf.com"], "5555",[new Phone("987654321", PhoneType.CellularHome, LineType.LandLine)])
  ,

  overallProductivityRecord: [

    new OverallProductivityRecord("Direct", 7, 10,70,50,20,30)
  ],

  overallProductivityRecord2: null,

  overallProductivityRecord3: [

    new OverallProductivityRecord("Direct", 7, 10,70,50,20,30),
    new OverallProductivityRecord("Indirect", 8, 12,77,55,25,35)
  ],

  overallProductivityRecord4: [

    new OverallProductivityRecord("Direct", 7, 10,70,50,20,30),
    new OverallProductivityRecord("Indirect", 8, 12,77,55,25,35),
    new OverallProductivityRecord("Real Estate", 10, 14,78,60,30,40)
  ],


  _hkSubscription: new HotkeysSubscriber(),
  _hotkeyPopoversObservable: new BehaviorSubject<boolean>(true),


  getCampaignListRecordStatusCodes: function (): Promise<Code[]> {
    return new Promise<Code[]>(s => s(this.codes));
  },
  getAgentCampaigns: function (): Promise<Campaign[]> {
    return new Promise<Campaign[]>(s => s(this.campaign));
  },

  getNextAccount: function (): Promise<Account> {
    return new Promise<Account>(s => s(this.account));
  },

  getCollectorsProductivity: function (): Promise<CollectorProductivityRecord[]> {
    return new Promise<CollectorProductivityRecord[]>(s => s(this.productivityRecords));
  },
  getGlobalCampaigns: function (): Promise<Campaign[]> {
    return new Promise<Campaign[]>(s => s(this.campaign));
  },

  getCampaignStats: function (): Promise<CampaignStatsToken[]> {
    return new Promise<CampaignStatsToken[]>(s => s(this.CampaignStatsToken));
  },

  getCampaignListAccounts: function (): Promise<CampaignListAccount[]> {
   return new Promise<CampaignListAccount[]>(s=>s(this.campaignListAccounts));
  },

  customerSearch: function (): Promise<Customer[]> {
    return new Promise<Customer[]>(s=>s(this.customer));
  },

  getCustomerAccounts: function ():Promise<Account[]> {
    return new  Promise<Account[]>(s=>s(this.account2));

  },

  getRoles: function (): Promise<Role[]> {
    return new Promise<Role[]>(s=>s(this.roles));
  },

  getAgents: function (): Promise<Agent[]> {
    return new Promise<Agent[]>(s=> s(this.agent));
  },

  assignAgentToCampaign: function (): Promise<boolean> {
    return new Promise<boolean>(s=>s(true));
  },

  assignAgentToRole: function (): Promise<boolean> {
    return new Promise<boolean>(s=>s(true));
  },
  getOverallProductivity: function (): Promise<OverallProductivityRecord[]> {
    return new Promise<OverallProductivityRecord[]>(s=>s(this.overallProductivityRecord));
  },

  getCallsPersHour: function ():Promise<CallsPersHour[]> {
    return new Promise<CallsPersHour[]>(s=>s(this.callsPersHour));
  },
  getIncomingCalls: function():Promise<IncomingCalls[]>{
    return new Promise<IncomingCalls[]>(s=>s(this.IncomingCalls));
  },
  getContactPercentage: function(): Promise<ContactPercentage[]>{
    return new Promise<ContactPercentage[]>(s=>s(this.contactPercentage));
  },

  getCampaignLists:  function(): Promise<CampaignList[]>{
    return new Promise<CampaignList[]>(s=>s(this.campaignList));
  },

  getCampaignListStatusCodes:  function(): Promise<Code[]> {
    return new Promise<Code[]>(s => s(this.code));
  },

  loadCampaignListStatistics: function(): Promise<CampaignStatsToken[]>{
    return new Promise<CampaignStatsToken[]>(s=>s(this.CampaignStatsToken));
  },

  launchCampaignList: function (): Promise<boolean> {
    return new Promise<boolean>(s=>s(true));
  },

  createCampaignList: function():Promise<number>{
    return new Promise<number>(s=>s(1));
  },

  getProcesses: function(): Promise<TicklerProcess[]>{
    return new Promise<TicklerProcess[]>(s=>s(this.processes));
  },

  getTicklerTypes: function (): Promise<TicklerType[]> {
    return new Promise<TicklerType[]>(s=> s(this.ticklerType));
  },


  getTicklerStatusCodes: function (): Promise<Code[]> {
    return new Promise<Code[]>(s=> s(this.code))
  },

  getTicklerAttributes: function (): Promise<TicklerAttribute[]> {
    return new Promise<TicklerAttribute[]>(s=>s(this.ticklerAttribute));
  },

  getTicklerAttributeCodes: function(): Promise<Code[]> {
    return new Promise<Code[]>(s => s(this.attributeCodes));
  },
  updateTicklerAttribute: function(): Promise<number>{
    return new Promise<number>(s=>s(200));
  },
  newTicklerAttribute: function(): Promise<number> {
    return new Promise<number>(s=>s(200));
  },

  getCases: function():Promise<ProcessCase[]>{
    return new Promise<ProcessCase[]>(s=>s(this.processCases));
  },

  getProcessCaseTicklers: function(): Promise<ProcessCaseTickler[]>{
    return new Promise<ProcessCaseTickler[]>(s=>(this.processCaseTicklers));
  },

  getTicklerTypesMap: function(): Promise<TicklerTypeMap[]>{
    return new Promise<TicklerTypeMap[]>(s=>s(this.ticklerTypeMaps));
  },

  getTicklerAttributesMap: function(): Promise<TicklerAttributeMap[]> {
    return new Promise<TicklerAttributeMap[]>(s=>s(this.ticklerAttributeMap));
  },


  addTicklerAttributeMap: function(): Promise<number>{
    return new Promise<number>(s=>s(200));
  },


  deleteTicklerAttributeMap: function(): Promise<number>{
    return new Promise<number>(s=>s(200));
  },

  updateTicklerAttributeMap: function(): Promise<number>{
    return new Promise<number>(s=>s(200));
  },

  addTicklerTypeMap: function(): Promise<number>{
    return new Promise<number>(s=>s(200));
  },

  deleteTicklerTypeMap: function(): Promise<number>{
    return new Promise<number>(s=>s(200));
  },

  updateTicklerType: function(): Promise<number>{
    return new Promise<number>(s=>s(200));
  },

  newTicklerType :function(): Promise<number>{
    return new Promise<number>(s=>s(200));
  },

  removeTicklerType: function(): Promise<number>{
    return new Promise<number>(s=>s(200));
  },

  getCaseById: function(): Promise<ProcessCase>{
    return new Promise<ProcessCase>(s=>s(this.currentProcessCase));
  },

  getClOrderByTypes: function(): Promise<CampaignListOrderByType[]>{
    return new Promise<CampaignListOrderByType[]>(s=>s(this.campaignListOrderByType))
  },

  getCampaignListRecords: function(): Promise<CampaignListRecord[]>{
    return new Promise<CampaignListRecord[]>(s=>s(this.campaignListRecords))
  },

  createCaseTickler: function(): Promise<number>{
    return new Promise<number>(s=>s(200));
  },

  getCompleteInfoForAccount: function(): Observable<Account>{
    return new Observable<Account>(()=> this.account4);
  },

  getCampaignCallRecordReasons: function(): Promise<CancelCampaignCallRecordReason[]>{
    return new Promise<CancelCampaignCallRecordReason[]>(s=>s(this.cancelCampaignCallRecordReason));
  },
  getCustomerConsents: function(): Promise<CustomerConsent[]>{
    return new Promise<CustomerConsent[]>(s=>s(this.customerConsents));
  },

  makeCall: function(): Promise<boolean>{
    return new Promise<boolean>(s=>s(true));
  },

  getInfoCustomer: function(): Promise<Customer>{
    return new Promise<Customer>(s=>s(this.customer4));
  },

  addCustomerConsent: function(): Promise<number>{
    return new Promise<number>(s=>s(200));
  },
  getFollowUpDueCodes: function(): Promise<Code[]>{
    return new Promise<Code[]>(s=>s(this.followUpDueCodes));
  },

  getLovTypes: function(): Promise<LovType[]>{
    return new Promise<LovType[]>(s=>s(this.lovTypes));
  },

  getLovTypeCodes: function(): Promise<Code[]>{
    return new Promise<Code[]>(s=>s(this.lovTypesCodes));
  },

  getLovValues: function(): Promise<LovValue[]>{
    return new Promise<LovValue[]>(s=>s(this.lovValues));
  },

  updateLovType: function(): Promise<number>{
    return new Promise<number>(s=>s(200));
  },

  updateLovValue: function(): Promise<number>{
    return new Promise<number>(s=>s(200));
  },
  addLovType: function(): Promise<number>{
    return new Promise<number>(s=>s(200));
  },
  addLovValue: function(): Promise<number>{
    return new Promise<number>(s=>s(200));
  },
  getAccountTypes(): Promise<Code[]> {
    return new Promise<Code[]>(s=>s(this.accountTypes));
  },


};
