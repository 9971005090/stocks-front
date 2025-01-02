`use strict`;

const {CONST: LOG_CONST} = await import(`/js/custom/constant/log/constant.js${ver_string}`);

/**
 * @constant
 * @typedef {object} UTIL
 */
export const UTIL = {
    DATA_PARSING: function(data) {
        return data;
    },
    PAGE: function(addParams = null) {
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            "pageNumber": 1,
            "count": 10
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(LOG_CONST.API.URL.PAGE, passingParams);
        return response;
    }
}