`use strict`;

const {CONST: GATEWAY_FW_CONST} = await import(`/js/custom/constant/gateway/constant-firmware.js${ver_string}`);

export const UTIL = {
    DATA_PARSING: function(data) {
        return data;
    },
    SELECT: function(param = null) {
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            targetOrganizationCode: param.targetOrganizationCode,
            fwVersion: param.fwVersion
        }
        if (param !== null) {
            for (let key in param) {
                passingParams[key] = param[key]
            }
        }
        const response = custom.request.api(GATEWAY_FW_CONST.API.URL.SELECT, passingParams);
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