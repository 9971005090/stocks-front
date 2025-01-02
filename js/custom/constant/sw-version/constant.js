"use strict";
export const CONST = {
    API: {
        URL: {
            'SELECT_LIST': "/Manager/SelectSwVersionInfoList",
            'SELECT': "/Manager/SelectSwVersionInfo",
            'PAGE': "/Manager/SelectSwVersionInfoPage",
            'INSERT': "/Manager/InsertSwVersionInfo",
            'UPDATE': "/Manager/UpdateSwVersionInfo",
            'UPDATE_ACTIVE': "/Manager/UpdateSwVersionInfoActiveStatus",
            'DOWNLOAD_FILE': "/Manager/DownLoadSwVersionInfoFile",
            'DELETE': "/Manager/DeleteSwVersionInfo",
            'DELETE_LIST': "/Manager/DeleteSwVersionInfoList",
        }
    },
    DESIGN: {
        CONTENTS_BY_DATA_TABLE: `#contents-by-data-table`,
        CONTENTS_BY_VIEW_DATA_TABLE: `#contents-for-view`,
        CONTENTS_BY_INSTALLED_TABLE: `#contents-by-installed-data-table`,
    },
    IS_USE: {
        CODE: {
            FALSE: 0,
            TRUE: 1,
        },
        TITLE: {}
    },
    USING_SOFTWARE: [
        {
            "swVersionId": 1,
            "organizationCode": "SEERS",
            "swType": 0,
            "swVersion": null,
            "activeStatus": 1,
            "fileKey": "SEERS/2/2.4.7/MT120GW2",
            "fileSize": 1318832,
            "dateTime": "2024-11-19 14:35:39",
            "updateTime": null,
            "checkSum": "db875b6948fad33d36197cacc443b315f8d68ece8bba61c07788ed25bccb92aa",
            "etc": "메모 입력"
        },
        {
            "swVersionId": 2,
            "organizationCode": "SEERS",
            "swType": 1,
            "swVersion": null,
            "activeStatus": 1,
            "fileKey": "SEERS/2/2.4.7/MT120GW2",
            "fileSize": 1318832,
            "dateTime": "2024-11-19 14:35:39",
            "updateTime": null,
            "checkSum": "db875b6948fad33d36197cacc443b315f8d68ece8bba61c07788ed25bccb92aa",
            "etc": "메모 입력"
        },
        {
            "swVersionId": 3,
            "organizationCode": "SEERS",
            "swType": 2,
            "swVersion": null,
            "activeStatus": 1,
            "fileKey": "SEERS/2/2.4.7/MT120GW2",
            "fileSize": 1318832,
            "dateTime": "2024-11-19 14:35:39",
            "updateTime": null,
            "checkSum": "db875b6948fad33d36197cacc443b315f8d68ece8bba61c07788ed25bccb92aa",
            "etc": "메모 입력"
        },
        {
            "swVersionId": 4,
            "organizationCode": "SEERS",
            "swType": 3,
            "swVersion": null,
            "activeStatus": 1,
            "fileKey": "SEERS/2/2.4.7/MT120GW2",
            "fileSize": 1318832,
            "dateTime": "2024-11-19 14:35:39",
            "updateTime": null,
            "checkSum": "db875b6948fad33d36197cacc443b315f8d68ece8bba61c07788ed25bccb92aa",
            "etc": "메모 입력"
        },
        {
            "swVersionId": 5,
            "organizationCode": "SEERS",
            "swType": 4,
            "swVersion": null,
            "activeStatus": 1,
            "fileKey": "SEERS/2/2.4.7/MT120GW2",
            "fileSize": 1318832,
            "dateTime": "2024-11-19 14:35:39",
            "updateTime": null,
            "checkSum": "db875b6948fad33d36197cacc443b315f8d68ece8bba61c07788ed25bccb92aa",
            "etc": "메모 입력"
        },
        {
            "swVersionId": 6,
            "organizationCode": "SEERS",
            "swType": 5,
            "swVersion": null,
            "activeStatus": 1,
            "fileKey": "SEERS/2/2.4.7/MT120GW2",
            "fileSize": 1318832,
            "dateTime": "2024-11-19 14:35:39",
            "updateTime": null,
            "checkSum": "db875b6948fad33d36197cacc443b315f8d68ece8bba61c07788ed25bccb92aa",
            "etc": "메모 입력"
        },
    ],
    SOFTWARE_TYPE: [
        {
            code: 0,
            title: "Backend",
        },
        {
            code: 1,
            title: "FrontEnd",
        },
        {
            code: 2,
            title: "Gateway",
        },
        {
            code: 3,
            title: "AI",
        },
        {
            code: 4,
            title: "Android",
        },
        {
            code: 5,
            title: "Ios",
        },
    ],
    INIT: function(){
        // let _d = [];
        // for (let i = 0; i < CONST.SOFTWARE_TYPE.length; i++) {
        //     _d.push({
        //         code: CONST.SOFTWARE_TYPE[i].swType,
        //         title: CONST.SOFTWARE_TYPE[i].softwareName,
        //     });
        // }
        // GBL.CONSTANTS.set(`SOFTWARE_TYPE_DATAS`, _d, true);

        GBL.CONSTANTS.set(`USING_SOFTWARE`, CONST.USING_SOFTWARE, true);
        CONST.IS_USE.TITLE[CONST.IS_USE.CODE.FALSE] = "미적용";
        CONST.IS_USE.TITLE[CONST.IS_USE.CODE.TRUE] = "적용";
    },
}
CONST.INIT();