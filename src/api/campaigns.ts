// 1 Get campaigns
// /api/campaigns/v1
export const campaignsBody = [
  {
    "Id": 1,
    "CampaignCd": "DIRECT",
    "CampaignNm": "Direct",
    "Attributes": [
      {
        "AttributeId": 4,
        "AttributeCd": "LXNWDT_LTE",
        "AttributeNm": "Next Work Date (LTE)",
        "DataType": "DATE",
        "ArrayFlg": "Y"
      },
      {
        "AttributeId": 6,
        "AttributeCd": "LASTPRMDATE_LT",
        "AttributeNm": "Last Promised Date (LT)",
        "DataType": "DATE",
        "ArrayFlg": "N"
      }
    ]
  },
  {
    "Id": 2,
    "CampaignCd": "INDIRECT",
    "CampaignNm": "Indirect",
    "Attributes": []
  },
  {
    "Id": 3,
    "CampaignCd": "REAL_ESTATE",
    "CampaignNm": "Real Estate",
    "Attributes": []
  },
  {
    "Id": 4,
    "CampaignCd": "BUSINESS_BANKING",
    "CampaignNm": "Business Banking",
    "Attributes": []
  },
  {
    "Id": 5,
    "CampaignCd": "DEMO_CAMPAIGN",
    "CampaignNm": "Demo Campaign",
    "Attributes": [
      {
        "AttributeId": 1,
        "AttributeCd": "GROUP_IN",
        "AttributeNm": "Group Code",
        "DataType": "STRING",
        "ArrayFlg": "Y"
      },
      {
        "AttributeId": 2,
        "AttributeCd": "LXSTAT_IN",
        "AttributeNm": "Collection Status (IN)",
        "DataType": "NUMBER",
        "ArrayFlg": "N"
      },
      {
        "AttributeId": 3,
        "AttributeCd": "LXSTAT_NI",
        "AttributeNm": "Collection Status (NOT IN)",
        "DataType": "DATE",
        "ArrayFlg": "Y"
      },
      {
        "AttributeId": 4,
        "AttributeCd": "LXNWDT_LTE",
        "AttributeNm": "Next Work Date (LTE)",
        "DataType": "DATETIME",
        "ArrayFlg": "N"
      }
    ]
  }
];

// 2 Get campaign list
// /api/campaignlists/v1?StatusCd=CLOSED&CampaignCd=BUSINESS_BANKING&pagenr=1&pagesize=5
export const campaignListsBody = [
  {
    "Id": 119,
    "CampaignCd": "DIRECT",
    "CampaignNm": "Direct",
    "CampaignId": 1,
    "CreatedDt": "2017-11-29T11:22:34.57",
    "CreatedBy": "Vasiliy Sharapov",
    "StatusCd": "NEW",
    "ModifiedBy": " ",
    "ModifiedDt": null,
    "Attributes": "eyJVc2VyQ2QiOiJ2c2hhcmFwbyIsIlVwbG9hZElkIjoxLCJDYW1wYWlnbkNkIjoiRElSRUNUIiwiR1JPVVBfSU4iOm51bGwsIkxYU1RBVF9OSSI6bnVsbCwiTFhOV0RUX0xURSI6IjIwMTctMTEtMjlUMDA6MDA6MDAiLCJMQVNUUFJNREFURV9MVCI6IjIwMTctMTEtMjlUMDA6MDA6MDAifQ==",
    "OrderedBy": "Record ID"
  },
  {
    "Id": 116,
    "CampaignCd": "DIRECT",
    "CampaignNm": "Direct",
    "CampaignId": 1,
    "CreatedDt": "2017-11-28T15:45:38.897",
    "CreatedBy": "Vasiliy Sharapov",
    "StatusCd": "PAUSED",
    "ModifiedBy": " ",
    "ModifiedDt": null,
    "Attributes": "eyJVc2VyQ2QiOiJ2c2hhcmFwbyIsIlVwbG9hZElkIjoxLCJDYW1wYWlnbkNkIjoiRElSRUNUIiwiR1JPVVBfSU4iOlsiMzEwIiwiMzUwIiwiNDYwIiwiMzYwIl0sIkxYU1RBVF9OSSI6WyJCIiwiMCIsIjEiLCIzIiwiNyIsIjUiLCJMIiwiUiIsIlMiLCJVIiwiRCJdLCJMWE5XRFRfTFRFIjoiMjAxNy0xMS0yOFQwMDowMDowMCIsIkxBU1RQUk1EQVRFX0xUIjoiMjAxNy0xMS0yOFQwMDowMDowMCJ9",
    "OrderedBy": "Timezone"
  },
  {
    "Id": 115,
    "CampaignCd": "DIRECT",
    "CampaignNm": "Direct",
    "CampaignId": 1,
    "CreatedDt": "2017-11-28T15:18:00.43",
    "CreatedBy": "Vasiliy Sharapov",
    "StatusCd": "PAUSED",
    "ModifiedBy": " ",
    "ModifiedDt": null,
    "Attributes": "eyJVc2VyQ2QiOiJ2c2hhcmFwbyIsIlVwbG9hZElkIjoxLCJDYW1wYWlnbkNkIjoiRElSRUNUIiwiR1JPVVBfSU4iOlsiMzEwIiwiMzUwIiwiNDYwIiwiMzYwIl0sIkxYU1RBVF9OSSI6WyJCIiwiMCIsIjEiLCIzIiwiNyIsIjUiLCJMIiwiUiIsIlMiLCJVIiwiRCJdLCJMWE5XRFRfTFRFIjoiMjAxNC0xMS0yOFQwMDowMDowMCIsIkxBU1RQUk1EQVRFX0xUIjoiMjAxNC0xMS0yOFQwMDowMDowMCJ9",
    "OrderedBy": "Record ID"
  },
  {
    "Id": 114,
    "CampaignCd": "DEMO_CAMPAIGN",
    "CampaignNm": "Demo Campaign",
    "CampaignId": 5,
    "CreatedDt": "2017-11-28T15:15:20.777",
    "CreatedBy": "Vasiliy Sharapov",
    "StatusCd": "NEW",
    "ModifiedBy": " ",
    "ModifiedDt": null,
    "Attributes": "eyJVc2VyQ2QiOiJ2c2hhcmFwbyIsIlVwbG9hZElkIjoxLCJDYW1wYWlnbkNkIjoiRElSRUNUIiwiR1JPVVBfSU4iOlsiMzEwIiwiMzUwIiwiNDYwIiwiMzYwIl0sIkxYU1RBVF9OSSI6WyJCIiwiMCIsIjEiLCIzIiwiNyIsIjUiLCJMIiwiUiIsIlMiLCJVIiwiRCJdLCJMWE5XRFRfTFRFIjoiMjAxNC0xMS0yOFQwMDowMDowMCIsIkxBU1RQUk1EQVRFX0xUIjoiMjAxNC0xMS0yOFQwMDowMDowMCJ9",
    "OrderedBy": "Timezone"
  },
  {
    "Id": 113,
    "CampaignCd": "DEMO_CAMPAIGN",
    "CampaignNm": "Demo Campaign",
    "CampaignId": 5,
    "CreatedDt": "2017-11-28T15:14:39.073",
    "CreatedBy": "Vasiliy Sharapov",
    "StatusCd": "IN PROGRESS",
    "ModifiedBy": " ",
    "ModifiedDt": null,
    "Attributes": "eyJVc2VyQ2QiOiJ2c2hhcmFwbyIsIlVwbG9hZElkIjoxLCJDYW1wYWlnbkNkIjoiRElSRUNUIiwiR1JPVVBfSU4iOlsiMzEwIiwiMzUwIiwiNDYwIiwiMzYwIl0sIkxYU1RBVF9OSSI6WyJCIiwiMCIsIjEiLCIzIiwiNyIsIjUiLCJMIiwiUiIsIlMiLCJVIiwiRCJdLCJMWE5XRFRfTFRFIjoiMjAxNy0xMS0yOFQwMDowMDowMCIsIkxBU1RQUk1EQVRFX0xUIjoiMjAxNy0xMS0yOFQwMDowMDowMCJ9",
    "OrderedBy": "Record ID"
  },
  {
    "Id": 112,
    "CampaignCd": "DEMO_CAMPAIGN",
    "CampaignNm": "Demo Campaign",
    "CampaignId": 5,
    "CreatedDt": "2017-11-28T08:18:02.643",
    "CreatedBy": "Vasiliy Sharapov",
    "StatusCd": "IN PROGRESS",
    "ModifiedBy": " ",
    "ModifiedDt": null,
    "Attributes": "eyJVc2VyQ2QiOiJ2c2hhcmFwbyIsIlVwbG9hZElkIjoxLCJDYW1wYWlnbkNkIjoiREVNT19DQU1QQUlHTiIsIkdST1VQX0lOIjpbIjMxMCIsIjM1MCIsIjQ2MCIsIjM2MCIsImdnIl0sIkxYU1RBVF9OSSI6WyJCIiwiMCIsIjEiLCIzIiwiNyIsIjUiLCJMIiwiUiIsIlMiLCJVIiwiRCJdfQ==",
    "OrderedBy": "Timezone"
  }
];

// 3 Campaigns records
// /api/clrecords/v1?clid=69&statusCd=DONE&pagenr=1&pagesize=5
export const campaignListRecordsBody = [
  {
    "CampaignCd": "BUSINESS_BANKING",
    "CampaignNm": "Business Banking",
    "AccountId": "5300497908",
    "CallPriority": "HIGH",
    "StatusCd":   "DONE",
    "LastCalledBy": "pblanco",
    "LastCalledDt": "2017-11-06T09:19:20.94",
    "NextCallDt": "2017-12-06T09:19:20.94",
    "NextCallUser": "vsharapo",
    "OrderByCd": "CR.TimeZone"
  },
  {
    "CampaignCd": "BUSINESS_BANKING",
    "CampaignNm": "Business Banking",
    "AccountId": "5300450758",
    "CallPriority": null,
    "StatusCd": "NEW",
    "LastCalledBy": "pblanco2",
    "LastCalledDt": "2017-11-09T06:01:00.163",
    "NextCallDt": null,
    "NextCallUser": null,
    "OrderByCd": "CR.Id"
  },
  {
    "CampaignCd": "BUSINESS_BANKING",
    "CampaignNm": "Business Banking",
    "AccountId": "5300283908",
    "CallPriority": null,
    "StatusCd": "IN PROGRESS",
    "LastCalledBy": "pblanco",
    "LastCalledDt": "2017-11-06T07:29:12.443",
    "NextCallDt": null,
    "NextCallUser": null,
    "OrderByCd": "CR.TimeZone"
  },
  {
    "CampaignCd": "BUSINESS_BANKING",
    "CampaignNm": "Business Banking",
    "AccountId": "5300477176",
    "CallPriority": null,
    "StatusCd": "NEW",
    "LastCalledBy": "Hak",
    "LastCalledDt": "2017-11-03T08:32:49.197",
    "NextCallDt": null,
    "NextCallUser": null,
    "OrderByCd": "CR.Id"
  },
  {
    "CampaignCd": "BUSINESS_BANKING",
    "CampaignNm": "Business Banking",
    "AccountId": "5300451584",
    "CallPriority": null,
    "StatusCd": "IN PROGRESS",
    "LastCalledBy": "Keanu",
    "LastCalledDt": "2017-11-06T06:58:14.593",
    "NextCallDt": null,
    "NextCallUser": null,
    "OrderByCd": "CR.TimeZone"
  },
  {
    "CampaignCd": "BUSINESS_BANKING",
    "CampaignNm": "Business Banking",
    "AccountId": "5300497908",
    "CallPriority": "HIGH",
    "StatusCd": "NEW",
    "LastCalledBy": "Robert",
    "LastCalledDt": "2017-11-06T09:19:20.94",
    "NextCallDt": "2017-12-06T09:19:20.94",
    "NextCallUser": "Hayden",
    "OrderByCd": "CR.Id"
  },
  {
    "CampaignCd": "BUSINESS_BANKING",
    "CampaignNm": "Business Banking",
    "AccountId": "5300450758",
    "CallPriority": null,
    "StatusCd": "NEW",
    "LastCalledBy": "Scarlett",
    "LastCalledDt": "2017-11-09T06:01:00.163",
    "NextCallDt": null,
    "NextCallUser": null,
    "OrderByCd": "CR.TimeZone"
  },
  {
    "CampaignCd": "BUSINESS_BANKING",
    "CampaignNm": "Business Banking",
    "AccountId": "5300283908",
    "CallPriority": null,
    "StatusCd": "DONE",
    "LastCalledBy": "Chris",
    "LastCalledDt": "2017-11-06T07:29:12.443",
    "NextCallDt": null,
    "NextCallUser": null,
    "OrderByCd": "CR.Id"
  },
  {
    "CampaignCd": "BUSINESS_BANKING",
    "CampaignNm": "Business Banking",
    "AccountId": "5300477176",
    "CallPriority": null,
    "StatusCd": "DONE",
    "LastCalledBy": "pblanco",
    "LastCalledDt": "2017-11-03T08:32:49.197",
    "NextCallDt": null,
    "NextCallUser": null,
    "OrderByCd": "CR.TimeZone"
  },
  {
    "CampaignCd": "BUSINESS_BANKING",
    "CampaignNm": "Business Banking",
    "AccountId": "5300451584",
    "CallPriority": null,
    "StatusCd": "DONE",
    "LastCalledBy": "pblanco",
    "LastCalledDt": "2017-11-06T06:58:14.593",
    "NextCallDt": null,
    "NextCallUser": null,
    "OrderByCd": "CR.TimeZone"
  },
  {
    "CampaignCd": "BUSINESS_BANKING",
    "CampaignNm": "Business Banking",
    "AccountId": "5300497908",
    "CallPriority": "HIGH",
    "StatusCd": "DONE",
    "LastCalledBy": "pblanco",
    "LastCalledDt": "2017-11-06T09:19:20.94",
    "NextCallDt": "2017-12-06T09:19:20.94",
    "NextCallUser": "Nami",
    "OrderByCd": "CR.Id"
  },
  {
    "CampaignCd": "BUSINESS_BANKING",
    "CampaignNm": "Business Banking",
    "AccountId": "5300450758",
    "CallPriority": null,
    "StatusCd": "DONE",
    "LastCalledBy": "pblanco",
    "LastCalledDt": "2017-11-09T06:01:00.163",
    "NextCallDt": null,
    "NextCallUser": null,
    "OrderByCd": "CR.TimeZone"
  },
  {
    "CampaignCd": "BUSINESS_BANKING",
    "CampaignNm": "Business Banking",
    "AccountId": "5300283908",
    "CallPriority": null,
    "StatusCd": "DONE",
    "LastCalledBy": "Mark",
    "LastCalledDt": "2017-11-06T07:29:12.443",
    "NextCallDt": null,
    "NextCallUser": null,
    "OrderByCd": "CR.Id"
  },
  {
    "CampaignCd": "BUSINESS_BANKING",
    "CampaignNm": "Business Banking",
    "AccountId": "5300477176",
    "CallPriority": null,
    "StatusCd": "DONE",
    "LastCalledBy": "John",
    "LastCalledDt": "2017-11-03T08:32:49.197",
    "NextCallDt": null,
    "NextCallUser": null,
    "OrderByCd": "CR.TimeZone"
  },
  {
    "CampaignCd": "BUSINESS_BANKING",
    "CampaignNm": "Business Banking",
    "AccountId": "5300451584",
    "CallPriority": null,
    "StatusCd": "DONE",
    "LastCalledBy": "Luffy",
    "LastCalledDt": "2017-11-06T06:58:14.593",
    "NextCallDt": null,
    "NextCallUser": null,
    "OrderByCd": "CR.Id"
  },
  // {
  //   "CampaignCd": "BUSINESS_BANKING",
  //   "CampaignNm": "Business Banking",
  //   "AccountId": "5300497908",
  //   "CallPriority": "HIGH",
  //   "StatusCd": "DONE",
  //   "LastCalledBy": "pblanco",
  //   "LastCalledDt": "2017-11-06T09:19:20.94",
  //   "NextCallDt": "2017-12-06T09:19:20.94",
  //   "NextCallUser": "vsharapo"
  // },
  // {
  //   "CampaignCd": "BUSINESS_BANKING",
  //   "CampaignNm": "Business Banking",
  //   "AccountId": "5300450758",
  //   "CallPriority": null,
  //   "StatusCd": "DONE",
  //   "LastCalledBy": "pblanco",
  //   "LastCalledDt": "2017-11-09T06:01:00.163",
  //   "NextCallDt": null,
  //   "NextCallUser": null
  // },
  // {
  //   "CampaignCd": "BUSINESS_BANKING",
  //   "CampaignNm": "Business Banking",
  //   "AccountId": "5300283908",
  //   "CallPriority": null,
  //   "StatusCd": "DONE",
  //   "LastCalledBy": "pblanco",
  //   "LastCalledDt": "2017-11-06T07:29:12.443",
  //   "NextCallDt": null,
  //   "NextCallUser": null
  // },
  // {
  //   "CampaignCd": "BUSINESS_BANKING",
  //   "CampaignNm": "Business Banking",
  //   "AccountId": "5300477176",
  //   "CallPriority": null,
  //   "StatusCd": "DONE",
  //   "LastCalledBy": "pblanco",
  //   "LastCalledDt": "2017-11-03T08:32:49.197",
  //   "NextCallDt": null,
  //   "NextCallUser": null
  // },
  // {
  //   "CampaignCd": "BUSINESS_BANKING",
  //   "CampaignNm": "Business Banking",
  //   "AccountId": "5300451584",
  //   "CallPriority": null,
  //   "StatusCd": "DONE",
  //   "LastCalledBy": "pblanco",
  //   "LastCalledDt": "2017-11-06T06:58:14.593",
  //   "NextCallDt": null,
  //   "NextCallUser": null
  // }
];
