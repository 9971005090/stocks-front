`use strict`;
/**
 * @file 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @version 0.0.1
 * @description 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @author zaid
 */

const {CONST: HOSPITAL_CONST} = await import(`/js/custom/constant/patient/hospital-constant.js${ver_string}`);

/**
 * @constant
 * @typedef {object} UTIL
 * @property {object} HEADER 각 메뉴의 헤더 관련 처리 정의
 * @description 각 메뉴의 헤더/레프트에서 사용되는 유틸 함수 정의
 */
export const UTIL = {
    DATA_PARSING: function(data) {
        data.parsingMessageType = HOSPITAL_CONST.MESSAGE_TYPE.TITLE[data.messageType];
        return data;
    },
    LIST: function(addParams = null) {
        GBL.API.FAKE[HOSPITAL_CONST.API.URL.SELECT] = false;
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            organizationCode : GBL.ACCOUNT.INFO.organizationCode,
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(HOSPITAL_CONST.API.URL.SELECT, passingParams);
        return response;
    }
}