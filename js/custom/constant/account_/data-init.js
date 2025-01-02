"use strict";
const {CONST: ACCOUNT_CONST} = await import(`/js/custom/constant/account/constant.js${ver_string}`);
const _setFakeApi = function() {
    GBL.API.FAKE[ACCOUNT_CONST.API.URL.SELECT] = true;
    FAKE_API_JSON[ACCOUNT_CONST.API.URL.SELECT] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null,
        "hospitalList":[
            {
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
            },
            {
                "id":2,
                "type":"기관(병원)",
                "name":"한림대학교성심병원",
                "location":"경기도 안양시 동안구 관평로170번길 22",
                "locationAddress":"경기도 안양시 동안구",
                "locationAddressDetail":"관평로170번길 22",
                "crs":"4329",
                "crsLatitude":"37.2796727675239",
                "crsLongitude":"127.048284945342",
                "emergencyPhoneNumber":"031-380-4129",
                "dayPhoneNumber":"031-380-4129",
                "nightPhoneNumber":"031-380-4129",
                "isUse":0,
                "dateTime":"2020-08-11 13:11:42",
                "updateDateTime":"2020-08-12 13:11:42",
                "text":"응급의료센터",
            },
            {
                "id":3,
                "type":"기관(병원)",
                "name":"분당서울대학교병원",
                "location":"경기도 성남시 분당구 구미로173번길 82",
                "locationAddress":"경기도 성남시 분당구",
                "locationAddressDetail":"구미로173번길 82",
                "crs":"4330",
                "crsLatitude":"37.2796727675239",
                "crsLongitude":"127.048284945342",
                "emergencyPhoneNumber":"031-787-3036",
                "dayPhoneNumber":"031-787-3036",
                "nightPhoneNumber":"031-787-3036",
                "isUse":1,
                "dateTime":"2020-08-11 13:11:42",
                "updateDateTime":"2020-08-12 13:11:42",
                "text":"응급의료센터",
            },
        ],
        "totalCount": 3,
    };
    GBL.API.FAKE[ACCOUNT_CONST.API.URL.INFO] = true;
    FAKE_API_JSON[`${ACCOUNT_CONST.API.URL.INFO}_1`] = {
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
    GBL.API.FAKE[ACCOUNT_CONST.API.URL.DELETE] = true;
    FAKE_API_JSON[ACCOUNT_CONST.API.URL.DELETE] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null
    };
    GBL.API.FAKE[ACCOUNT_CONST.API.URL.INSERT] = true;
    FAKE_API_JSON[ACCOUNT_CONST.API.URL.INSERT] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null
    };
    GBL.API.FAKE[ACCOUNT_CONST.API.URL.UPDATE] = true;
    FAKE_API_JSON[`${ACCOUNT_CONST.API.URL.UPDATE}_1`] = {
        "result":true,
        "extra":null,
        "error":0,
        "message":null,
        "remoteIp":null
    };
}
_setFakeApi();