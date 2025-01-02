`use strict`;
/**
 * @file 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @version 0.0.1
 * @description 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @author zaid
 */

const {CONST: NOTICE_CONST} = await import(`/js/custom/constant/notice/constant.js${ver_string}`);

/**
 * @constant
 * @typedef {object} UTIL
 * @property {object} HEADER 각 메뉴의 헤더 관련 처리 정의
 * @description 각 메뉴의 헤더/레프트에서 사용되는 유틸 함수 정의
 */
export const UTIL = {
    DATA_PARSING: function(data) {
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
        const response = custom.request.api(NOTICE_CONST.API.URL.SELECT_LIST, passingParams);
        return response;
    },
    SELECT_SIMPLE_PAGE: function(addParams = null) {
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            "pageNumber": 1,
            "count": 100,
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(NOTICE_CONST.API.URL.SELECT_SIMPLE_PAGE, passingParams);
        return response;
    },
    SELECT: function(code = null) {
        if (code === null) {
            return false;
        }
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            noticeCode: code,
        }
        const response = custom.request.api(NOTICE_CONST.API.URL.SELECT, passingParams);
        return response;
    },
    INSERT: function(addParams = null) {
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            organizationCode : GBL.ACCOUNT.INFO.organizationCode,
        }

        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(NOTICE_CONST.API.URL.INSERT, passingParams);
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
        const response = custom.request.api(NOTICE_CONST.API.URL.UPDATE, passingParams);
        return response;
    },
    DELETE: function(code = null) {
        if (code === null) {
            return false;
        }
        const passingParams = {
            requestUserCode : GBL.ACCOUNT.INFO.userCode,
            organizationCode : GBL.ACCOUNT.INFO.organizationCode,
            noticeCode: code
        }
        const response = custom.request.api(NOTICE_CONST.API.URL.DELETE, passingParams);
        return response;
    },
}