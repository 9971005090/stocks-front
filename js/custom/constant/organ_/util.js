`use strict`;
/**
 * @file 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @version 0.0.1
 * @description 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @author zaid
 */

const {CONST: ORGAN_CONST} = await import(`/js/custom/constant/organ/constant.js${ver_string}`);

/**
 * @constant
 * @typedef {object} UTIL
 * @property {object} HEADER 각 메뉴의 헤더 관련 처리 정의
 * @description 각 메뉴의 헤더/레프트에서 사용되는 유틸 함수 정의
 */
export const UTIL = {
    DATA_PARSING: function(data) {
        data.parsingSyncHis = ORGAN_CONST.SYNC_HIS.TITLE[data.syncHis];
        data.parsingDeviceManagerType = ORGAN_CONST.DEVICE_MANAGER_TYPE.TITLE[data.deviceManagerType];
        data.parsingExpiration = ORGAN_CONST.EXPIRATION_TYPE.TITLE[data.expiration];
        return data;
    },
    LIST: function(addParams = null) {
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(ORGAN_CONST.API.URL.SELECT_LIST, passingParams);
        return response;
    },
    PAGE: function(addParams = null) {
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            "count": 100,
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(ORGAN_CONST.API.URL.PAGE, passingParams);
        return response;
    },
    SELECT_SIMPLE_PAGE: function(addParams = null) {
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            "organizationCode": GBL.ACCOUNT.INFO.organizationCode,
            "pageNumber": 1,
            "count": 100
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(ORGAN_CONST.API.URL.SELECT_SIMPLE_PAGE, passingParams);
        return response;
    },
    SELECT: function(code = null) {
        if (code === null) {
            return false;
        }
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            organizationCode: code,
        }
        const response = custom.request.api(ORGAN_CONST.API.URL.SELECT, passingParams);
        return response;
    },
    SELECT_LIST: function(code = null) {
        if (code === null) {
            return false;
        }
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            search: code,
        }
        const response = custom.request.api(ORGAN_CONST.API.URL.SELECT_LIST, passingParams);
        return response;
    },
    DELETE: function(code = null) {
        if (code === null) {
            return false;
        }
        const passingParams = {
            requestUserCode : GBL.ACCOUNT.INFO.userCode,
            serialNumber: code
        }
        const response = custom.request.api(ORGAN_CONST.API.URL.DELETE, passingParams);
        return response;
    },
    INSERT: function(addParams = null) {
        const passingParams = {
            requestUserCode : GBL.ACCOUNT.INFO.userCode,
        }

        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(ORGAN_CONST.API.URL.INSERT, passingParams);
        return response;
    },
    UPDATE: function(addParams=null) {
        const passingParams = {
            requestUser : GBL.ACCOUNT.INFO.userCode,
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(ORGAN_CONST.API.URL.UPDATE, passingParams);
        return response;
    },
    UPDATE_EXPIRATION_LIST: function(addParams=null) {
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(ORGAN_CONST.API.URL.UPDATE_EXPIRATION_LIST, passingParams);
        return response;
    },
}