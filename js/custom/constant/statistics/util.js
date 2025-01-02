`use strict`;
/**
 * @file statistics(통계) util 파일
 * @version 0.0.1
 * @description API
 * @author ella
 */

const {CONST: STATISTICS_CONST} = await import(`/js/custom/constant/statistics/constant.js${ver_string}`);
const {CONST: MEASUREMENT_CONST} = await import(`/js/custom/constant/measurement/constant.js${ver_string}`);

/**
 * @constant
 * @typedef {object} UTIL
 * @property {object} HEADER 각 메뉴의 헤더 관련 처리 정의
 * @description 각 메뉴의 헤더/레프트에서 사용되는 유틸 함수 정의
 */
export const UTIL = {
    DATA_PARSING: function(data) {
        data.parsingDate = new Date(data.date).toString(`yy-MM-dd`);
        return data;
    },
    LIST: function(addParams = null) {
        const passingParams = {
            'periodCountType': STATISTICS_CONST.SEARCH_TYPE.IS_COUNT_ZERO_USE.IS_FALSE,
            'measurementStatusList': [MEASUREMENT_CONST.STATUS.CODE.RECODING_START, MEASUREMENT_CONST.STATUS.CODE.RECODING_END]
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(STATISTICS_CONST.API.URL.SELECT, passingParams);
        return response;
    },
    LIST_FOR_DAY: function(addParams = null) {
        const passingParams = {
            'order': `ASC`,
            'measurementStatusList': [MEASUREMENT_CONST.STATUS.CODE.RECODING_START, MEASUREMENT_CONST.STATUS.CODE.RECODING_END]
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(STATISTICS_CONST.API.URL.SELECT_FOR_DAY, passingParams);
        return response;
    }
}