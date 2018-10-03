// url: /api/dictionary/cancel_types/v1

export const getCancelTypesBody = [
  {
    "Id": 6,
    "Code": "AGENT_CANCELED",
    "Name": "Canceled by agent",
    "Description": null
  },
  {
    "Id": 7,
    "Code": "RESERVED",
    "Name": "Reserved",
    "Description": null
  }
];

// To cancel a report:
// method: PUT
// url: api/clrecords/v1
// headers:
// Authorization: token...
// ContentType: application/json

// body:
// {
//     "UserCd": "vsharapo",
//     "CampaignRecordId": 1759903,
//     "CancelCd": "AGENT_CANCELED",
//     "CancelDesc": "my first canceled record"
// }

// The response has a status 200
