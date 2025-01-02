"use strict";
const {CONST: USER_CONST} = await import(`/js/custom/constant/user/constant.js${ver_string}`);
const _setFakeApi = function() {
    GBL.API.FAKE[USER_CONST.API.URL.SELECT_ORGANIZATION_PAGE] = true;
    FAKE_API_JSON[USER_CONST.API.URL.SELECT_ORGANIZATION_PAGE] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null,
        "organizationSimpleList":[
            {
                city: "Sujeong-gu, Seongnam-si",
                clientSapCode:null,
                countryName:"Republic of Korea",
                dateTime:"2021-12-28 18:17:24",
                expiration:0,
                level:1,
                organizationCode:"ESON",
                organizationId:8,
                organizationName:"이손요양병원",
                state:"Gyeonggi-do"
            },
            {
                city: "Sujeong-gu, Seongnam-si",
                clientSapCode:null,
                countryName:"Republic of Korea",
                dateTime:"2021-12-28 18:17:24",
                expiration:0,
                level:1,
                organizationCode:"YI_SEVERANCE",
                organizationId:7,
                organizationName:"용인세브란스",
                state:"Gyeonggi-do"
            },
            {
                city:"Sujeong-gu, Seongnam-si",
                clientSapCode:null,
                countryName:"Republic of Korea",
                dateTime:"2021-12-28 18:17:24",
                expiration:0,
                level:1,
                organizationCode:"CHEONAN_SCHM",
                organizationId:6,
                organizationName:"천안순천향",
                state:"Gyeonggi-do"
            },
            {
                city:"Sujeong-gu, Seongnam-si",
                clientSapCode:null,
                countryName:"Republic of Korea",
                dateTime:"2021-12-28 18:17:24",
                expiration:0,
                level:1,
                organizationCode:"KR_HUMC",
                organizationId:2,
                organizationName:"한림대성심병원",
                state:"Gyeonggi-do"
            },
            {
                city:"Sujeong-gu, Seongnam-si",
                clientSapCode:null,
                countryName:"Republic of Korea",
                dateTime:"2021-12-28 17:37:24",
                expiration:0,
                level:10,
                organizationCode:"SEERS",
                organizationId:1,
                organizationName:"씨어스테크놀로지",
                state:"Gyeonggi-do"
            }
        ],
        "totalCount": 4,
    };
    GBL.API.FAKE[USER_CONST.API.URL.INFO] = true;
    FAKE_API_JSON[`${USER_CONST.API.URL.INFO}_1`] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null,
        "patient":{
            "id":1,
            "resend":0,
            "alertType":1,
            "messageType":1,
            "code":"PS2022000000001432",
            "requestDateTime":"2022:12:14 15:00:00",
            "sendDateTime":"2022:12:14 15:00:00",
            "transferDateTime":"2022:12:14 15:00:01"
        }
    };
    GBL.API.FAKE[USER_CONST.API.URL.DELETE] = true;
    FAKE_API_JSON[`${USER_CONST.API.URL.DELETE}_1`] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null
    };
    GBL.API.FAKE[USER_CONST.API.URL.INSERT] = true;
    FAKE_API_JSON[USER_CONST.API.URL.INSERT] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null
    };
}
_setFakeApi();