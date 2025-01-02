`use strict`;
/**
 * @file 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @version 0.0.1
 * @description 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @author ella
 */

const {CONST: ACCOUNT_CONST} = await import(`/js/custom/constant/account/constant.js${ver_string}`);

/**
 * @constant
 * @typedef {object} UTIL
 * @property {object} HEADER 각 메뉴의 헤더 관련 처리 정의
 * @description 각 메뉴의 헤더/레프트에서 사용되는 유틸 함수 정의
 */
export const UTIL = {
    DATA_PARSING: function(data) {
        const _p = GBL.CONSTANTS.get(`PARSING_ORGANIZATIONS`);
        data.parsingOrganization = _p.hasOwnProperty(data.organizationCode) === true ? _p[data.organizationCode] : data.organizationCode;
        data.parsingLevelCode = ACCOUNT_CONST.LEVEL.TITLE[data.level];
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
        const response = custom.request.api(ACCOUNT_CONST.API.URL.SELECT_SIMPLE_LIST, passingParams);
        return response;
    },
    PAGE: function(addParams = null) {
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(ACCOUNT_CONST.API.URL.PAGE, passingParams);
        return response;
    },
    SELECT: function(code = null) {
        if (code === null) {
            return false;
        }
        const passingParams = {
            requestUser : GBL.ACCOUNT.INFO.userCode,
            organizationCode: GBL.ACCOUNT.INFO.organizationCode,
            id: code,
        }
        const response = custom.request.api(ACCOUNT_CONST.API.URL.SELECT, passingParams);
        return response;
    },
    DELETE: function(code = null) {
        if (code === null) {
            return false;
        }
        const passingParams = {
            requestUserCode : GBL.ACCOUNT.INFO.userCode,
            userCode: code
        }
        const response = custom.request.api(ACCOUNT_CONST.API.URL.DELETE, passingParams);
        return response;
    },
    INSERT: function(addParams = null) {
        const passingParams = {
            requestUser : GBL.ACCOUNT.INFO.userCode,
        }

        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(ACCOUNT_CONST.API.URL.INSERT, passingParams);
        return response;
    },
    UPDATE: function(addParams=null) {
        const passingParams = {
            requestUserCode : GBL.ACCOUNT.INFO.userCode,
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(ACCOUNT_CONST.API.URL.UPDATE, passingParams);
        return response;
    },
    UPDATE_PASSWORD: function(addParams=null) {
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(ACCOUNT_CONST.API.URL.UPDATE_PASSWORD, passingParams);
        return response;
    },
    LIST_ALL: function(addParams = null){
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(ACCOUNT_CONST.API.URL.SELECT_LIST_ALL, passingParams);
        return response;
    },
    PAGE_ALL: function(addParams = null){
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(ACCOUNT_CONST.API.URL.SELECT_PAGE_ALL, passingParams);
        return response;
    },
    DELETE_ALL: function(code = null) {
        if (code === null) {
            return false;
        }
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            userCodeList: code
        }
        const response = custom.request.api(ACCOUNT_CONST.API.URL.DELETE_ALL, passingParams);
        return response;
    },
}