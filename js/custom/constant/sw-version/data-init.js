"use strict";
const {CONST: SW_VERSION_CONST} = await import(`/js/custom/constant/sw-version/constant.js${ver_string}`);
const _setFakeApi = function() {
    GBL.API.FAKE[SW_VERSION_CONST.API.URL.PAGE] = true;
    FAKE_API_JSON[SW_VERSION_CONST.API.URL.PAGE] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null,
        "softwareList":[
            {
                "id":1,
                "softwareType": "thync",
                "softwareName": "thynC Software",
                "version": `1.0.0`,
                "isUse": 1,
                "dateTime":"2020-08-11 13:11:42",
                "updateDateTime":"2024-11-12 13:11:42",
                "etc":"thynC Software 적용",
            },
            {
                "id":2,
                "softwareType": "thync",
                "softwareName": "thynC Software",
                "version": `1.0.0`,
                "isUse": 0,
                "dateTime":"2020-08-11 13:11:42",
                "updateDateTime":"2024-11-10 13:11:42",
                "etc":"비고 test",
            },
            {
                "id":3,
                "softwareType": "firmware",
                "softwareName": "Firmware",
                "version": `1.0.0`,
                "isUse": 0,
                "dateTime":"2020-08-11 13:11:42",
                "updateDateTime":"2024-11-11 13:10:42",
                "etc":"Firmware 미적용",
            },
            {
                "id":4,
                "softwareType": "AI",
                "softwareName": "AI Software",
                "version": `1.0.0`,
                "isUse": 0,
                "dateTime":"2020-08-11 13:11:42",
                "updateDateTime":"2024-11-11 12:10:42",
                "etc":"AI Software 미적용",
            },
            {
                "id":5,
                "softwareType": "firmware",
                "softwareName": "Firmware",
                "version": `1.0.0`,
                "isUse": 1,
                "dateTime":"2020-08-11 13:11:42",
                "updateDateTime":"2024-11-12 12:10:42",
                "etc":"Firmware 적용",
            },
            {
                "id":6,
                "softwareType": "AI",
                "softwareName": "AI Software",
                "version": `1.0.0`,
                "isUse": 1,
                "dateTime":"2020-08-11 13:11:42",
                "updateDateTime":"2024-11-12 12:08:42",
                "etc":"AI Software 적용",
            },
        ],
        "totalCount": 6,
    };
    GBL.API.FAKE[SW_VERSION_CONST.API.URL.INFO] = true;
    FAKE_API_JSON[`${SW_VERSION_CONST.API.URL.INFO}_1`] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null,
        "hospital":{
            "id":1,
            "type":"기관(병원)",
            "number":"HO0002",
            "name":"아주대학교병원",
            "location":"경기도 수원시 영통구 월드컵로 164",
            "locationAddress":"경기도 수원시 영통구",
            "locationAddressDetail":"월드컵로 164",
            "crs":"4326",
            "crsLatitude":"37.2796727675239",
            "crsLongitude":"127.048284945342",
            "emergencyPhoneNumber":"031-219-7700",
            "dayPhoneNumber":"031-219-7700",
            "nightPhoneNumber":"031-219-7700",
            "isUse":1,
            "dateTime":"2020-08-11 13:11:42",
            "updateDateTime":"2020-08-12 13:11:42",
            "text":"응급의료센터",
        }
    };
    GBL.API.FAKE[SW_VERSION_CONST.API.URL.DELETE] = true;
    FAKE_API_JSON[SW_VERSION_CONST.API.URL.DELETE] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null
    };
    GBL.API.FAKE[SW_VERSION_CONST.API.URL.INSERT] = true;
    FAKE_API_JSON[SW_VERSION_CONST.API.URL.INSERT] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null
    };
    GBL.API.FAKE[SW_VERSION_CONST.API.URL.UPDATE] = true;
    FAKE_API_JSON[`${SW_VERSION_CONST.API.URL.UPDATE}_1`] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null
    };
    GBL.API.FAKE[SW_VERSION_CONST.API.URL.SELECT_USE_LIST] = true;
    FAKE_API_JSON[SW_VERSION_CONST.API.URL.SELECT_USE_LIST] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null,
        "softwareUsingList":[
            {
                "id":1,
                "softwareType": "thynC Software",
                "version": `1.0.0`,
                "isUse": 1,
                "dateTime":"2020-08-11 13:11:42",
                "updateDateTime":"2024-11-12 13:11:42",
                "etc":"thynC Software 적용",
            },
            {
                "id":2,
                "softwareType": "Firmware",
                "version": `1.0.0`,
                "isUse": 1,
                "dateTime":"2020-08-11 13:11:42",
                "updateDateTime":"2024-11-12 12:10:42",
                "etc":"Firmware 적용",
            },
            {
                "id":3,
                "softwareType": "AI Software",
                "version": `1.0.0`,
                "isUse": 1,
                "dateTime":"2020-08-11 13:11:42",
                "updateDateTime":"2024-11-12 12:08:42",
                "etc":"AI Software 적용",
            },
        ],
        "totalCount": 3,
    };
    GBL.API.FAKE[SW_VERSION_CONST.API.URL.SOFTWARE_LIST] = true;
    FAKE_API_JSON[SW_VERSION_CONST.API.URL.SOFTWARE_LIST] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null,
        "softwareList":[
            {
                "id":1,
                "softwareType": "thynC",
                "softwareName": "thynC Software",
                "version": `1.0.0`,
                "isUse": 1,
                "dateTime":"2020-08-11 13:11:42",
                "updateDateTime":"2024-11-12 13:11:42",
                "etc":"thynC Software 적용",
            },
            {
                "id":2,
                "softwareType": "Firmware",
                "softwareName": "Firmware",
                "version": `1.0.0`,
                "isUse": 1,
                "dateTime":"2020-08-11 13:11:42",
                "updateDateTime":"2024-11-12 12:10:42",
                "etc":"Firmware 적용",
            },
            {
                "id":3,
                "softwareType": "AI",
                "softwareName": "AI Software",
                "version": `1.0.0`,
                "isUse": 1,
                "dateTime":"2020-08-11 13:11:42",
                "updateDateTime":"2024-11-12 12:08:42",
                "etc":"AI Software 적용",
            },
        ],
        "totalCount": 6,
    };
    GBL.API.FAKE[SW_VERSION_CONST.API.URL.SELECT] = true;
    FAKE_API_JSON[SW_VERSION_CONST.API.URL.SELECT] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null,
        "software": {
                "id":1,
                "softwareType": "thynC",
                "softwareName": "thynC Software",
                "version": `1.0.0`,
                "isUse": 1,
                "dateTime":"2020-08-11 13:11:42",
                "updateDateTime":"2024-11-12 13:11:42",
                "etc":"thynC Software 적용",
        },
    };
}
_setFakeApi();