`use strict`;
/**
 * @file 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @version 0.0.1
 * @description 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @author zaid
 */

const {CONST: GATEWAY_FW_CONST} = await import(`/js/custom/constant/gateway/constant-firmware.js${ver_string}`);

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
        data.parsingLevel = GATEWAY_FW_CONST.LEVEL_TYPE.TITLE[data.level];
        return data;
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
        const response = custom.request.api(GATEWAY_FW_CONST.API.URL.PAGE, passingParams);
        return response;
    },
    DELETE: function(param = null) {
        if (param === null) {
            return false;
        }
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            targetOrganizationCode: param.targetOrganizationCode,
            fwVersion: param.fwVersion
        }
        const response = custom.request.api(GATEWAY_FW_CONST.API.URL.DELETE, passingParams);
        return response;
    },
    INSERT: function(addParams = null) {
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        let header = {
            'SX-Auth-Token': GBL.ACCOUNT.TOKEN,
            'SX-Client-IP': null
        }
        const response = custom.request.api(GATEWAY_FW_CONST.API.URL.INSERT, passingParams, null, null, header, {isFormData: true});
        return response;
    }
}