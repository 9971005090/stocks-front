`use strict`;
/**
 * @file 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @version 0.0.1
 * @description 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @author zaid
 */

const {CONST: PUSH_CONST} = await import(`/js/custom/constant/push/constant.js${ver_string}`);

/**
 * @constant
 * @typedef {object} UTIL
 * @property {object} HEADER 각 메뉴의 헤더 관련 처리 정의
 * @description 각 메뉴의 헤더/레프트에서 사용되는 유틸 함수 정의
 */
export const UTIL = {
    DATA_PARSING: function(data) {
        data.parsingSendStatus = PUSH_CONST.SEND_STATUS.TITLE[data.sendStatus];
        data.parsingAlertType = PUSH_CONST.ALERT_TYPE.TITLE[data.alertType];
        data.parsingMessageType = PUSH_CONST.MESSAGE_TYPE.TITLE[data.messageType];
        return data;
    },
    LIST: function(addParams = null) {
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            organizationCode : GBL.ACCOUNT.INFO.organizationCode,
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(PUSH_CONST.API.URL.SELECT, passingParams);
        return response;
    },
    INFO: function(id = null) {
        if (id === null) {
            return false;
        }
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            organizationCode : GBL.ACCOUNT.INFO.organizationCode,
            id: id,
            checkKey: id
        }
        const response = custom.request.api(PUSH_CONST.API.URL.INFO, passingParams);
        return response;
    },
    DELETE: function(id = null) {
        if (id === null) {
            return false;
        }
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            organizationCode : GBL.ACCOUNT.INFO.organizationCode,
            id: id,
            checkKey: id
        }
        const response = custom.request.api(PUSH_CONST.API.URL.DELETE, passingParams);
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
        const response = custom.request.api(PUSH_CONST.API.URL.INSERT, passingParams);
        return response;
    },

}