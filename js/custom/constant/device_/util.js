`use strict`;
/**
 * @file 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @version 0.0.1
 * @description 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @author ella
 */

const {CONST: DEVICE_CONST} = await import(`/js/custom/constant/device_/constant.js${ver_string}`);

/**
 * @constant
 * @typedef {object} UTIL
 * @property {object} HEADER 각 메뉴의 헤더 관련 처리 정의
 * @description 각 메뉴의 헤더/레프트에서 사용되는 유틸 함수 정의
 */
export const UTIL = {
    DATA_PARSING: function(data) {
        const _p = GBL.CONSTANTS.get(`PARSING_ORGANIZATIONS`);
        const _p2 = GBL.CONSTANTS.get(`PARSING_WARDS`);
        data.parsingType = DEVICE_CONST.TYPE.TITLE[data.deviceType];
        data.parsingOrganization = _p.hasOwnProperty(data.organizationCode) === true ? _p[data.organizationCode] : data.organizationCode;
        // data.parsingWard = _p2.hasOwnProperty(data.wardCode) === true ? _p2[data.wardCode] : data.wardCode;
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
        const response = custom.request.api(DEVICE_CONST.API.URL.PAGE, passingParams);
        return response;
    },
    INSERT: function(addParams = null) {
        const passingParams = {}
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(DEVICE_CONST.API.URL.INSERT, passingParams);
        return response;
    },
    INSERT_BULK: function(addParams = null) {
        const passingParams = {
            requestUser : GBL.ACCOUNT.INFO.userCode,
        }

        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(DEVICE_CONST.API.URL.INSERT_BULK, passingParams);
        return response;
    },
    DELETE: function(code = null) {
        if (code === null) {
            return false;
        }
        const passingParams = {
            serialNumber: code
        }
        const response = custom.request.api(DEVICE_CONST.API.URL.DELETE, passingParams);
        return response;
    },
    DELETE_ALL: function(params = null) {
        if (params === null) {
            return false;
        }
        const passingParams = {}
        UTIL._GET_ADD_PARAMS(passingParams, params);
        const response = custom.request.api(DEVICE_CONST.API.URL.DELETE_ALL, passingParams);
        return response;
    },
    UPDATE_ALL: function(params = null) {
        if (params === null) {
            return false;
        }
        const passingParams = {}
        UTIL._GET_ADD_PARAMS(passingParams, params);
        const response = custom.request.api(DEVICE_CONST.API.URL.UPDATE_ALL, passingParams);
        return response;
    },


    _GET_ADD_PARAMS: function(params, addParams) {
        if (addParams !== null) {
            for (let key in addParams) {
                params[key] = addParams[key]
            }
        }
        return params;
    },
    DECIMAL_TO_HEXADECIMAL : function(value, notation = 16) {
        let number = (`000${value.toString(notation)}`).slice(-5);
        return `${number.slice(0,1).toUpperCase()}:${number.slice(1,3).toUpperCase()}:${number.slice(-2).toUpperCase()}`;
    },
    GET_MACADDRESS: function(type = DEVICE_CONST.TYPE.CODE.ECG, value) {
        if(type == DEVICE_CONST.TYPE.CODE.ECG) {
            return `${DEVICE_CONST.PREFIX_ADDRESS.ECG}${UTIL.DECIMAL_TO_HEXADECIMAL(value)}`;
        }
        else if(type == DEVICE_CONST.TYPE.CODE.TEMPERATURE) {
            return `${DEVICE_CONST.PREFIX_ADDRESS.TEMPERATURE}${UTIL.DECIMAL_TO_HEXADECIMAL(value)}`;
        }
        else if(type == DEVICE_CONST.TYPE.CODE.TAG) {
            return `${DEVICE_CONST.PREFIX_ADDRESS.TAG}${UTIL.DECIMAL_TO_HEXADECIMAL(value)}`;
        }
        else if(type == DEVICE_CONST.TYPE.CODE.SPO2) {
            return `${DEVICE_CONST.PREFIX_ADDRESS.SPO2}${UTIL.DECIMAL_TO_HEXADECIMAL(value)}`;
        }
        else if(type == DEVICE_CONST.TYPE.CODE.BP) {
            return `${DEVICE_CONST.PREFIX_ADDRESS.BP}${UTIL.DECIMAL_TO_HEXADECIMAL(value)}`;
        }
    },
    DEVICE_SERIAL_CHECK: function (data = null) {
        let passingParams = null;
        if (data === null) {
            passingParams = {
                result: false,
                msg : `유효하지 않은 시리얼번호 입니다.<br>알파벳 A,C,P 와 숫자6자리로 구성된 시리얼 번호를 확인해주세요`
            }
            return passingParams;
        }
        else {
            // let checkDeviceType = /A|P|C/g;
            // let checkDeviceNum = /\d/g;
            // let checkDeviceKor = /[ㄱ-ㅎㅏ-ㅣ]/g;
            // data = data.replaceAll(checkDeviceKor, "");
            // //시리얼 번호다 - 포함 AAA0000-A000000 일떄
            // if(data.indexOf("-") !== -1){
            //     let splitNumber = data.split("-");
            //     data = splitNumber[1];
            // }
            // let checkType = data.match(checkDeviceType);
            // let checkNum = data.match(checkDeviceNum);
            // if(checkNum === false){
            //     passingParams = {
            //         result: false,
            //         msg : `유효하지 않은 시리얼번호 입니다.<br>알파벳 A,C,P 와 숫자6자리로 구성된 시리얼 번호를 확인해주세요`
            //     }
            // }
            // else if(checkType === false){
            //     passingParams = {
            //         result: false,
            //         msg : `유효하지 않은 시리얼번호 입니다.<br>알파벳 A,C,P 와 숫자6자리로 구성된 시리얼 번호를 확인해주세요`
            //     }
            // }
            // else if(checkNum.length !== 6){
            //     console.log("숫자 자릿수 에러 6자리 이상");
            //     passingParams = {
            //         result: false,
            //         msg : `유효하지 않은 시리얼번호 입니다.<br>알파벳 A,C,P 와 숫자6자리로 구성된 시리얼 번호를 확인해주세요`
            //     }
            // }
            const regex = /^[APCE]\d{6}$/;
            if (regex.test(data) === false) {
                passingParams = {
                    result: false,
                    msg : `유효하지 않은 시리얼번호 입니다.<br>알파벳 A,C,P 와 숫자6자리로 구성된 시리얼 번호를 확인해주세요`
                }
            }
            else {
                let deviceType = data[0] === "A" ? 1 : (data[0] === "P" ? 3 : (data[0] === "C" ? 2 : (data[0] === "E" ? 6 : 0)));
                let serialNumberForNumber = data.replace(/\D/g, '');
                passingParams = {
                    "result": true,
                    "deviceTypeName": data[0],
                    "deviceType": deviceType,
                    "serialNumber": data,
                    "serialFullNumber": data,
                    "serialNumberForNumber": serialNumberForNumber,
                    "macAddress": UTIL.GET_MACADDRESS(deviceType, Number(serialNumberForNumber))
                }
            }
            return passingParams
        }
    }
}