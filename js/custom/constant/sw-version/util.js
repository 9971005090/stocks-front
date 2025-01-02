`use strict`;
/**
 * @file 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @version 0.0.1
 * @description 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @author zaid
 */

const {CONST: SW_VERSION_CONST} = await import(`/js/custom/constant/sw-version/constant.js${ver_string}`);

/**
 * @constant
 * @typedef {object} UTIL
 * @property {object}
 * @description
 */
export const UTIL = {
    DATA_PARSING: function(data) {
        const _po = GBL.CONSTANTS.get(`PARSING_ORGANIZATIONS`);
        data.parsingOrganization = _po.hasOwnProperty(data.organizationCode) === true ? _po[data.organizationCode] : data.organizationCode;
        return data;
    },
    SELECT_LIST: function(addParams = null) {
        const passingParams = {
            requester: GBL.ACCOUNT.INFO.userCode,
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(SW_VERSION_CONST.API.URL.SELECT_LIST, passingParams);
        return response;
    },
    SELECT_USING_LIST: function(addParams = null) {
        const passingParams = {
            requester: GBL.ACCOUNT.INFO.userCode,
            activeStatusList: [1],
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        if(!passingParams.targetOrganizationCode){
            delete passingParams.targetOrganizationCode
            delete passingParams.activeStatusList
            return false;
        }
        const response = custom.request.api(SW_VERSION_CONST.API.URL.SELECT_LIST, passingParams);
        return response;
    },
    SELECT: function(addParams = null) {
        if (addParams === null) {
            return false;
        }
        const passingParams = {
            requestUser : GBL.ACCOUNT.INFO.userCode,
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(SW_VERSION_CONST.API.URL.SELECT, passingParams);
        return response;
    },
    PAGE: function(param = null) {
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
        }

        if (param !== null) {
            for (let key in param) {
                passingParams[key] = param[key]
            }
        }

        const response = custom.request.api(SW_VERSION_CONST.API.URL.PAGE, passingParams);
        return response;
    },
    DELETE: function(param = null) {
        if (param === null) {
            return false;
        }
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            swVersionId: param.swVersionId
        }
        const response = custom.request.api(SW_VERSION_CONST.API.URL.DELETE, passingParams);
        return response;
    },
    DELETE_LIST: function(param = null) {
        if (param === null) {
            return false;
        }
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            swVersionIdList: param
        }
        const response = custom.request.api(SW_VERSION_CONST.API.URL.DELETE_LIST, passingParams);
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
        const response = custom.request.api(SW_VERSION_CONST.API.URL.INSERT, passingParams, null, null, header, {isFormData: true});
        // const response = custom.request.api(SW_VERSION_CONST.API.URL.INSERT, passingParams);
        return response;
    },
    UPDATE: function(addParams = null) {
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
        const response = custom.request.api(SW_VERSION_CONST.API.URL.UPDATE, passingParams, null, null, header, {isFormData: true});
        // const response = custom.request.api(SW_VERSION_CONST.API.URL.INSERT, passingParams);
        return response;
    },
    UPDATE_ACTIVE: function(addParams = null) {
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            // activeStatus: 1
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(SW_VERSION_CONST.API.URL.UPDATE_ACTIVE, passingParams);
        return response;
    },
    DOWNLOAD_FILE: function(addParams = null) {
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }

        const downloadUrl = "https://dev-api.seersthync.com/mobiCAREConsole/API" + SW_VERSION_CONST.API.URL.DOWNLOAD_FILE + "/" + passingParams.targetOrganizationCode + "/" + passingParams.swVersionId;
        window.open(downloadUrl);
    }
}