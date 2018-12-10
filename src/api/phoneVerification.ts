// /api/customer/phone/v1?CifId=AAJ5318
export const phoneVerificationBody = [
    {
        "Id": 11,
        "CifId": "AAJ5318",
        "Phone": [
            {
                "PhoneNr": "123456789",
                "PhoneType": "P",
                "PhoneLineType": ""
            },
            {
                "PhoneNr": "987654321",
                "PhoneType": "C",
                "PhoneLineType": ""
            }
        ],
        "NewPhone": [
            {
                "PhoneNr": "123456789",
                "PhoneType": "P",
                "PhoneLineType": ""
            },
            {
                "PhoneNr": "987654321",
                "PhoneType": "P",
                "PhoneLineType": ""
            }
        ],
        "StatusFlg": "MODIFY",
        "Note": "Test phone POST",
        "CreatedBy": "vsharapo",
        "CreatedDt": "2018-11-15T14:56:23.843"
    },
    {
        "Id": 10,
        "CifId": "AAJ5318",
        "Phone": [
            {
                "PhoneNr": "123456789",
                "PhoneType": "P",
                "PhoneLineType": ""
            },
            {
                "PhoneNr": "987654321",
                "PhoneType": "C",
                "PhoneLineType": ""
            }
        ],
        "NewPhone": [],
        "StatusFlg": "VERIFIED",
        "Note": "Test email POST",
        "CreatedBy": "vsharapo",
        "CreatedDt": "2018-11-14T16:03:09.14"
    },
    {
        "Id": 9,
        "CifId": "AAJ5318",
        "Phone": [
            {
                "PhoneNr": "123456789",
                "PhoneType": "P",
                "PhoneLineType": ""
            },
            {
                "PhoneNr": "987654321",
                "PhoneType": "C",
                "PhoneLineType": ""
            }
        ],
        "NewPhone": [],
        "StatusFlg": "VERIFIED",
        "Note": "Test email POST",
        "CreatedBy": "vsharapo",
        "CreatedDt": "2018-11-14T16:02:16.633"
    },
    {
        "Id": 8,
        "CifId": "AAJ5318",
        "Phone": [
            {
                "PhoneNr": "123456789",
                "PhoneType": "P",
                "PhoneLineType": ""
            }
        ],
        "NewPhone": [],
        "StatusFlg": "VERIFIED",
        "Note": "Test email POST",
        "CreatedBy": "vsharapo",
        "CreatedDt": "2018-11-14T15:57:51.383"
    }
];

// Add: POST
// /api/customer/phone/v1
// {
//     "CifId": "AAJ5318",
//     "Phone": [
//         {
//             "phoneNr": "123456789",
//             "phoneType": "P",
//             "phoneLineType": ""
//         },
//         {
//             "phoneNr": "987654321",
//             "phoneType": "C",
//             "phoneLineType": ""
//         }
//     ],
//     "NewPhone": [
//         {
//             "phoneNr": "123456789",
//             "phoneType": "P",
//             "phoneLineType": ""
//         },
//         {
//             "phoneNr": "987654321",
//             "phoneType": "P",
//             "phoneLineType": ""
//         }
//     ],
//     "Note": "Test phone POST",
//     "StatusFlg": "MODIFY",
//     "CreatedBy": "vsharapo"
// }