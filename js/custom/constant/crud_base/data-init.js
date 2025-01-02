"use strict";

/**
 * @file crud 모듈의 가데이터 파일
 * @author Ella
 * @description crud 모듈의 API가 없을때, 가데이터를 사용하여 화면을 뿌려줄수 있게 한다.
 */


const {CONST: BASE_CONST} = await import(`/js/custom/constant/crud_base/constant.js${ver_string}`);
const _setFakeApi = function() {
    GBL.API.FAKE[BASE_CONST.API.URL.SELECT] = true;
    FAKE_API_JSON[BASE_CONST.API.URL.SELECT] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null,
        "gatewayInfo": {
            "gatewayInfoId": 183,
            "organizationCode": "THYNC",
            "serialNumber": "A99999",
            "macAddress": "08:D5:C0:00:00:F0",
            "ip": null,
            "wardCode": null,
            "sickRoomCode": null,
            "floor": "사무실",
            "lcNumber": null,
            "fwVersion": "1.3.6",
            "connStatus": 1,
            "processStatus": 0,
            "connStatusUpdateTime": null,
            "connStatusUpdateTimeByStream": null,
            "gatewayErrorCode": 0,
            "axisX": 26,
            "axisY": 26,
            "updateFwVersion": null,
            "fwUpdateDateTime": null,
            "deactivate": 0,
            "etc": "test입니다.",
            "updateDateTime": "2024-08-01 13:50:26",
            "buildingCode": null
        }
    };
    GBL.API.FAKE[BASE_CONST.API.URL.PAGE] = true;
    FAKE_API_JSON[BASE_CONST.API.URL.PAGE] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null,
        "totalCount": 8,
        "gatewayInfoList": [
            {
                "gatewayInfoId": 1,
                "organizationCode": "THYNC",
                "serialNumber": "A99999",
                "macAddress": "08:D5:C0:00:00:F0",
                "ip": null,
                "wardCode": null,
                "sickRoomCode": null,
                "floor": "사무실",
                "lcNumber": null,
                "fwVersion": "1.3.6",
                "connStatus": 1,
                "processStatus": 0,
                "connStatusUpdateTime": null,
                "connStatusUpdateTimeByStream": null,
                "gatewayErrorCode": 0,
                "axisX": 26,
                "axisY": 26,
                "updateFwVersion": null,
                "fwUpdateDateTime": null,
                "deactivate": 0,
                "etc": "test입니다.",
                "updateDateTime": "2024-08-01 13:50:26",
                "buildingCode": null
            },
            {
                "gatewayInfoId": 2,
                "organizationCode": "THYNC",
                "serialNumber": "B000769",
                "macAddress": "08:D5:C0:20:03:01",
                "ip": null,
                "wardCode": null,
                "sickRoomCode": null,
                "floor": null,
                "lcNumber": null,
                "fwVersion": "1.5.4",
                "connStatus": 2,
                "processStatus": 0,
                "connStatusUpdateTime": null,
                "connStatusUpdateTimeByStream": "2024-08-01 13:39:50",
                "gatewayErrorCode": 0,
                "axisX": 0,
                "axisY": 0,
                "updateFwVersion": null,
                "fwUpdateDateTime": null,
                "deactivate": 0,
                "etc": null,
                "updateDateTime": "2024-03-18 09:13:40",
                "buildingCode": null
            },
            {
                "gatewayInfoId": 3,
                "organizationCode": "THYNC",
                "serialNumber": "B000815",
                "macAddress": "08:D5:C0:20:03:2F",
                "ip": null,
                "wardCode": null,
                "sickRoomCode": null,
                "floor": null,
                "lcNumber": null,
                "fwVersion": "1.5.12",
                "connStatus": 1,
                "processStatus": 0,
                "connStatusUpdateTime": null,
                "connStatusUpdateTimeByStream": "2024-07-26 21:08:32",
                "gatewayErrorCode": 0,
                "axisX": 0,
                "axisY": 0,
                "updateFwVersion": null,
                "fwUpdateDateTime": null,
                "deactivate": 0,
                "etc": null,
                "updateDateTime": "2024-07-26 08:12:33",
                "buildingCode": null
            },
            {
                "gatewayInfoId": 4,
                "organizationCode": "THYNC",
                "serialNumber": "B000831",
                "macAddress": "08:D5:C0:20:03:3F",
                "ip": "192.168.0.21",
                "wardCode": null,
                "sickRoomCode": null,
                "floor": "1",
                "lcNumber": "101",
                "fwVersion": "1.3.3",
                "connStatus": 1,
                "processStatus": 0,
                "connStatusUpdateTime": null,
                "connStatusUpdateTimeByStream": null,
                "gatewayErrorCode": 0,
                "axisX": 0,
                "axisY": 0,
                "updateFwVersion": null,
                "fwUpdateDateTime": null,
                "deactivate": 0,
                "etc": "1800",
                "updateDateTime": "2024-06-05 14:37:58",
                "buildingCode": null
            },
            {
                "gatewayInfoId": 5,
                "organizationCode": "THYNC",
                "serialNumber": "B001498",
                "macAddress": "08:D5:C0:20:05:DA",
                "ip": null,
                "wardCode": null,
                "sickRoomCode": null,
                "floor": "1",
                "lcNumber": null,
                "fwVersion": "1.5.10",
                "connStatus": 1,
                "processStatus": 0,
                "connStatusUpdateTime": null,
                "connStatusUpdateTimeByStream": null,
                "gatewayErrorCode": 0,
                "axisX": 0,
                "axisY": 0,
                "updateFwVersion": null,
                "fwUpdateDateTime": "2024-05-02 08:21:49",
                "deactivate": 0,
                "etc": "1",
                "updateDateTime": "2024-05-02 08:21:49",
                "buildingCode": null
            },
            {
                "gatewayInfoId": 6,
                "organizationCode": "THYNC",
                "serialNumber": "B001500",
                "macAddress": "08:D5:C0:20:05:DC",
                "ip": "192.168.0.21",
                "wardCode": null,
                "sickRoomCode": null,
                "floor": "1",
                "lcNumber": "101",
                "fwVersion": "1.3.3",
                "connStatus": 1,
                "processStatus": 0,
                "connStatusUpdateTime": null,
                "connStatusUpdateTimeByStream": null,
                "gatewayErrorCode": 0,
                "axisX": 0,
                "axisY": 0,
                "updateFwVersion": null,
                "fwUpdateDateTime": null,
                "deactivate": 0,
                "etc": "1800",
                "updateDateTime": null,
                "buildingCode": null
            },
            {
                "gatewayInfoId": 7,
                "organizationCode": "THYNC",
                "serialNumber": "B001501",
                "macAddress": "08:D5:C0:20:05:DD",
                "ip": "192.168.0.21",
                "wardCode": null,
                "sickRoomCode": null,
                "floor": "1",
                "lcNumber": "101",
                "fwVersion": "1.3.2",
                "connStatus": 1,
                "processStatus": 0,
                "connStatusUpdateTime": null,
                "connStatusUpdateTimeByStream": null,
                "gatewayErrorCode": 0,
                "axisX": 0,
                "axisY": 0,
                "updateFwVersion": null,
                "fwUpdateDateTime": null,
                "deactivate": 0,
                "etc": "1806",
                "updateDateTime": null,
                "buildingCode": null
            },
            {
                "gatewayInfoId": 8,
                "organizationCode": "THYNC",
                "serialNumber": "B001502",
                "macAddress": "08:D5:C0:20:05:DE",
                "ip": "192.168.0.21",
                "wardCode": null,
                "sickRoomCode": null,
                "floor": "1",
                "lcNumber": "101",
                "fwVersion": "1.3.3",
                "connStatus": 1,
                "processStatus": 0,
                "connStatusUpdateTime": null,
                "connStatusUpdateTimeByStream": null,
                "gatewayErrorCode": 0,
                "axisX": 0,
                "axisY": 0,
                "updateFwVersion": null,
                "fwUpdateDateTime": null,
                "deactivate": 0,
                "etc": "1800",
                "updateDateTime": null,
                "buildingCode": null
            },
        ]
    };
    GBL.API.FAKE[BASE_CONST.API.URL.INSERT] = true;
    FAKE_API_JSON[BASE_CONST.API.URL.INSERT] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null
    };
    GBL.API.FAKE[BASE_CONST.API.URL.UPDATE] = true;
    FAKE_API_JSON[`${BASE_CONST.API.URL.UPDATE}_1`] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null
    };
    GBL.API.FAKE[BASE_CONST.API.URL.DELETE] = true;
    FAKE_API_JSON[BASE_CONST.API.URL.DELETE] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null
    };
    GBL.API.FAKE[BASE_CONST.API.URL.DELETE_ALL] = true;
    FAKE_API_JSON[BASE_CONST.API.URL.DELETE_ALL] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null
    };
    GBL.API.FAKE[BASE_CONST.API.URL.ORGAN_LIST] = true;
    FAKE_API_JSON[BASE_CONST.API.URL.ORGAN_LIST] = {
        "result": true,
        "extra": null,
        "error": 0,
        "message": null,
        "remoteIp": null,
        "totalCount": 0,
        "organizationList": [
            {
                "organizationId": 12,
                "organizationCode": "THYNC",
                "organizationType": 0,
                "organizationInfo": "세부정보3",
                "systemManager": "teo.kang@seerstech.com",
                "syncHis": 1,
                "deviceManagerType": 0,
                "organizationName": "씽크",
                "countryCode": "KR",
                "countryName": "Republic of Korea",
                "state": "Gyeonggi-do",
                "city": "Sujeong-gu, Seongnam-si",
                "address": "76, Bokjeong-ro",
                "latitude": 37,
                "longitude": 127,
                "phoneNumber": "+8224947582",
                "level": 10,
                "expiration": 0,
                "expirationDateTime": "2220-10-27 12:04:24",
                "dateTime": "2021-12-28 17:37:24",
                "gmtCode": "GMT+0900",
                "timezone": "Asia/Seoul",
                "etc": "Seerstech",
                "themeType": 0,
                "userColor": null,
                "userGradient1": null,
                "userGradient2": null
            },
            {
                "organizationId": 11,
                "organizationCode": "SEERS",
                "organizationType": 0,
                "organizationInfo": "세부정보311",
                "systemManager": "teo.kang@seerstech.com",
                "syncHis": 1,
                "deviceManagerType": 1,
                "organizationName": "씨어스테크놀로지1",
                "countryCode": "KR",
                "countryName": "Republic of Korea",
                "state": "Gyeonggi-do",
                "city": "Sujeong-gu, Seongnam-si",
                "address": "76, Bokjeong-ro",
                "latitude": 37,
                "longitude": 127,
                "phoneNumber": "+8224947582",
                "level": 10,
                "expiration": 0,
                "expirationDateTime": "2220-10-27 12:04:24",
                "dateTime": "2021-12-28 17:37:24",
                "gmtCode": "GMT+0900",
                "timezone": "Asia/Seoul",
                "etc": "Seerstech",
                "themeType": 0,
                "userColor": null,
                "userGradient1": null,
                "userGradient2": null
            },
        ]
    };
}
_setFakeApi();