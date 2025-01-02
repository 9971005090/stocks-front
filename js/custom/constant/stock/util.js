`use strict`;
/**
 * @file 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @version 0.0.1
 * @description 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @author zaid
 */

const {CONST: STOCK_CONST} = await import(`/js/custom/constant/stock/constant.js${ver_string}`);

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

        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(STOCK_CONST.API.URL.SELECT, passingParams);
        return response;
    },
    PAGE: function(addParams = null) {
        const passingParams = {

        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(STOCK_CONST.API.URL.PAGE, passingParams);
        return response;
    },
    DELETE: function(firebaseId = null) {
        if (firebaseId === null) {
            return false;
        }
        const passingParams = {
            firebaseId: firebaseId
        }
        const response = custom.request.api(STOCK_CONST.API.URL.DELETE, passingParams);
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
        const response = custom.request.api(STOCK_CONST.API.URL.INSERT, passingParams);
        return response;
    },
    UPDATE: function(addParams= null) {
        const passingParams = {
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(STOCK_CONST.API.URL.UPDATE, passingParams);
        return response;
    },
    TREND: function(stockName, term = 30) {
        const response = custom.request.api(STOCK_CONST.API.URL.TREND.replace("{{stock_name}}", stockName).replace("{{term}}", term));
        return response;
    },
}