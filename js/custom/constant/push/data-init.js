"use strict";
const {CONST: PUSH_CONST} = await import(`/js/custom/constant/push/constant.js${ver_string}`);
const _setFakeApi = function() {
    GBL.API.FAKE[PUSH_CONST.API.URL.SELECT] = true;
    FAKE_API_JSON[PUSH_CONST.API.URL.SELECT] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null,
        "pushList":[
            {
                "id":1,
                "sendStatus":1,
                "resend":0,
                "alertType":1,
                "messageType":1,
                "code":"PS2022000000001432",
                "requestDateTime":"2022:12:14 15:00:00",
                "sendDateTime":"2022:12:14 15:00:00",
                "transferDateTime":"2022:12:14 15:00:01"
            },
            {
                "id":2,
                "sendStatus":1,
                "sendType":1,
                "resend":1,
                "alertType":2,
                "messageType":2,
                "code":"PS2022000000001433",
                "requestDateTime":"2022:12:15 15:00:00",
                "sendDateTime":"2022:12:15 15:00:00",
                "transferDateTime":"2022:12:15 15:00:01"
            },
            {
                "id":3,
                "sendStatus":1,
                "sendType":1,
                "resend":0,
                "alertType":1,
                "messageType":3,
                "code":"PS2022000000001434",
                "requestDateTime":"2022:12:16 15:00:00",
                "sendDateTime":"2022:12:16 15:00:00",
                "transferDateTime":"2022:12:16 15:00:01"
            },
            {
                "id":4,
                "sendStatus":1,
                "sendType":1,
                "resend":0,
                "alertType":1,
                "messageType":99,
                "code":"PS2022000000001435",
                "requestDateTime":"2022:12:17 15:00:00",
                "sendDateTime":"2022:12:17 15:00:00",
                "transferDateTime":"2022:12:17 15:00:01"
            }
        ],
        "totalCount": 4,
    };
    GBL.API.FAKE[PUSH_CONST.API.URL.INFO] = true;
    FAKE_API_JSON[`${PUSH_CONST.API.URL.INFO}_1`] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null,
        "push":{
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
    GBL.API.FAKE[PUSH_CONST.API.URL.DELETE] = true;
    FAKE_API_JSON[`${PUSH_CONST.API.URL.DELETE}_1`] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null
    };
    GBL.API.FAKE[PUSH_CONST.API.URL.INSERT] = true;
    FAKE_API_JSON[PUSH_CONST.API.URL.INSERT] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null
    };
}
_setFakeApi();