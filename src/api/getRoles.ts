// api/roles/v1
export const getRolesBody = [
    {
        "Id": 1,
        "RoleCd": "CL_CONTENT_VIEWER",
        "RoleNm": "View CL content",
        "RoleDesc": "User with this role can view the CL content",
        "CreatedBy": "vsharapo",
        "CreatedDt": "2017-12-15T13:17:40.93"
    },
    {
        "Id": 2,
        "RoleCd": "EXCLUDE_FROM_REPORTS",
        "RoleNm": "Do not include in reports",
        "RoleDesc": "Agent with this role will not be included in reports",
        "CreatedBy": "vsharapo",
        "CreatedDt": "2018-03-06T11:22:16.64"
    },
    {
        "Id": 3,
        "RoleCd": "CREATE_TICKLER_CASE",
        "RoleNm": "Create tickler case",
        "RoleDesc": "User with this role is able to create a tickler case from Account view",
        "CreatedBy": "vsharapo",
        "CreatedDt": "2018-04-17T14:25:26.717"
    },
    {
        "Id": 4,
        "RoleCd": "TICKLER_AGENT",
        "RoleNm": "Tickler Agent",
        "RoleDesc": "User with this role have access to ticklers fuctionality",
        "CreatedBy": "vsharapo",
        "CreatedDt": "2018-04-17T14:27:37.15"
    },
    {
        "Id": 5,
        "RoleCd": "TICKLER_ADMIN",
        "RoleNm": "Tickler Admin",
        "RoleDesc": "User with this role have access to ticklers configuration",
        "CreatedBy": "vsharapo",
        "CreatedDt": "2018-04-17T14:27:37.15"
    }
];

// /api/userroles/v1

// {
//     "UserCd": "pblanco",
//     "RoleCd": "CL_CONTENT_VIEWER",
//     "ActiveFlg":"Y",
//     "CreatedBy": "vsharapo"
// }