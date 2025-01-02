`use strict`;

const {CONST: ACCOUNT_CONST} = await import(`/js/custom/constant/account/constant.js${ver_string}`);

/**
 * @constant
 * @typedef {object} UTIL
 */
export const UTIL = {
    DATA_PARSING: function(data) {
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
    CHECK_PASSWORD: function(param = null){
        if(param === null){
            return false;
        }
        const response = custom.request.api(ACCOUNT_CONST.API.URL.CHECK_PASSWORD, param);
        return response;
    },
}