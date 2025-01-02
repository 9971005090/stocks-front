"use strict";
const {CONST: PATIENT_CONST} = await import(`/js/custom/constant/patient/constant.js${ver_string}`);
const _setFakeApi = function() {
    GBL.API.FAKE[PATIENT_CONST.API.URL.SELECT] = true;
    FAKE_API_JSON[PATIENT_CONST.API.URL.SELECT] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null,
        "patientList":[
            {
                "id":1,
                "transferStatus":99,
                "code":"P20221213T144009500",
                "gender":0,
                "location":"세종특별자치시 나성동 768",
                "locationAddress":"세종특별자치시 나성동",
                "locationAddressDetail":"768",
                "isTransfer":0
            },
            {
                "id":2,
                "transferStatus":99,
                "code":"P20221208T215942501",
                "gender":1,
                "location":"세종특별자치시 나성동 725",
                "locationAddress":"세종특별자치시 나성동",
                "locationAddressDetail":"725",
                "isTransfer":1
            },
            {
                "id":3,
                "transferStatus":99,
                "code":"P20221209T160000500",
                "gender":2,
                "location":"세종특별자치시 나성동 753",
                "locationAddress":"세종특별자치시 나성동",
                "locationAddressDetail":"753",
                "isTransfer":1
            }
        ],
        "totalCount": 3,
    };
    GBL.API.FAKE[PATIENT_CONST.API.URL.INFO] = true;
    FAKE_API_JSON[`${PATIENT_CONST.API.URL.INFO}_1`] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null,
        "patient":{
            "id":1,
            "transferStatus":99,
            "code":"P20221209T160000500",
            "gender":2,
            "location":"세종특별자치시 나성동 753",
            "locationAddress":"세종특별자치시 나성동",
            "locationAddressDetail":"753",
            "isTransfer":1
        }
    };
    GBL.API.FAKE[PATIENT_CONST.API.URL.DELETE] = true;
    FAKE_API_JSON[PATIENT_CONST.API.URL.DELETE] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null
    };
    GBL.API.FAKE[PATIENT_CONST.API.URL.INSERT] = true;
    FAKE_API_JSON[PATIENT_CONST.API.URL.INSERT] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null
    };
    GBL.API.FAKE[PATIENT_CONST.API.URL.UPDATE] = true;
    FAKE_API_JSON[`${PATIENT_CONST.API.URL.UPDATE}_1`] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null
    };
}
_setFakeApi();