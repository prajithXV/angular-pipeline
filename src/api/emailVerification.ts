// /api/customer/email/v1?CifId=AAJ5318 GET
export const emailVerificationBody = [
    {
        "Id": 6,
        "CifId": "AAJ5318",
        "Email": [
            "email"
        ],
        "NewEmail": [
            "emailnew"
        ],
        "StatusFlg": "MODIFY",
        "Note": "Test email POST",
        "CreatedBy": "vsharapo",
        "CreatedDt": "2018-11-13T16:11:31.497"
    },
    {
        "Id": 5,
        "CifId": "AAJ5318",
        "Email": [
            "email"
        ],
        "NewEmail": [],
        "StatusFlg": "VERIFIED",
        "Note": "Test email POST",
        "CreatedBy": "vsharapo",
        "CreatedDt": "2018-11-13T16:09:40.91"
    },
    {
        "Id": 4,
        "CifId": "AAJ5318",
        "Email": [
            "email"
        ],
        "NewEmail": [],
        "StatusFlg": "VERIFIED",
        "Note": "Test email POST",
        "CreatedBy": "vsharapo",
        "CreatedDt": "2018-11-13T15:35:24.31"
    },
    {
        "Id": 3,
        "CifId": "AAJ5318",
        "Email": [
            "email"
        ],
        "NewEmail": [],
        "StatusFlg": "VERIFIED",
        "Note": "Test email POST",
        "CreatedBy": "vsharapo",
        "CreatedDt": "2018-11-13T15:29:04.993"
    },
    {
        "Id": 2,
        "CifId": "AAJ5318",
        "Email": [
            "test1",
            "test2"
        ],
        "NewEmail": [],
        "StatusFlg": "VERIFIED",
        "Note": "Test email POST",
        "CreatedBy": "vsharapo",
        "CreatedDt": "2018-11-13T15:28:45.37"
    },
    {
        "Id": 1,
        "CifId": "AAJ5318",
        "Email": [
            "test1",
            "test2"
        ],
        "NewEmail": [],
        "StatusFlg": "VERIFIED",
        "Note": "Test email POST",
        "CreatedBy": "vsharapo",
        "CreatedDt": "2018-11-13T15:15:42.687"
    }
];

// POST Add
// /api/customer/email/v1
// {
// 	"CifId": "AAJ5318",
// 	"Email": ["email"],
// 	"NewEmail": ["emailnew"],
// 	"Note": "Test email POST",
// 	"StatusFlg": "MODIFY",
// 	"CreatedBy": "vsharapo"
// }
