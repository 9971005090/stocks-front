`use strict`;

const {CONST: GATEWAY_CONST} = await import(`/js/custom/constant/gateway/constant.js${ver_string}`);

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
        const response = custom.request.api(GATEWAY_CONST.API.URL.SELECT_LIST, passingParams);
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
        const response = custom.request.api(GATEWAY_CONST.API.URL.PAGE, passingParams);
        return response;
    },
    SELECT: function(code = null) {
        if (code === null) {
            return false;
        }
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            serialNumber: code,
        }
        const response = custom.request.api(GATEWAY_CONST.API.URL.SELECT, passingParams);
        return response;
    },
    DELETE: function(code = null) {
        if (code === null) {
            return false;
        }
        const passingParams = {
            requestUser : GBL.ACCOUNT.INFO.userCode,
            serialNumber: code
        }
        const response = custom.request.api(GATEWAY_CONST.API.URL.DELETE, passingParams);
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
        const response = custom.request.api(GATEWAY_CONST.API.URL.INSERT, passingParams);
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
        const response = custom.request.api(GATEWAY_CONST.API.URL.UPDATE, passingParams);
        return response;
    },
    DELETE_ALL: function(code = null) {
        if (code === null) {
            return false;
        }
        const passingParams = {
            requestUserCode : GBL.ACCOUNT.INFO.userCode,
            serialNumberList: code
        }
        const response = custom.request.api(GATEWAY_CONST.API.URL.DELETE_ALL, passingParams);
        return response;
    },
}