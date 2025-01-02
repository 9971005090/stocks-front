`use strict`;
/**
 * @file 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @version 0.0.1
 * @description 각 메뉴의 헤더/레프트 메뉴 처리 파일
 * @author ella
 */

const {CONST: WARD_CONST} = await import(`/js/custom/constant/ward/constant.js${ver_string}`);

/**
 * @constant
 * @typedef {object} UTIL
 * @property {object} HEADER 각 메뉴의 헤더 관련 처리 정의
 * @description 각 메뉴의 헤더/레프트에서 사용되는 유틸 함수 정의
 */
export const UTIL = {
    DATA_PARSING: function(data) {
        data.parsingOrganizationCode = WARD_CONST.ORGANIZATION_TYPE.TITLE[data.organizationCode];
        return data;
    },
    LIST: function(includeSickRoom = false , includeSickBed = false, returnType = "parsing", allInclude = false, wardLengthCheck = true, addParams = null) {
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            includeSickRoom: includeSickRoom,
            includeSickBed: includeSickRoom
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(WARD_CONST.API.URL.SELECT, passingParams);
        if(response.result === true) {
            if(allInclude === false) {
                let tempResponse = {wardList: []};
                let _t = Array.deepCopy(response);
                for(let key in _t.wardList) {
                    if(GBL.ACCOUNT.INFO.wardSimple){
                        if(_t.wardList[key].wardCode === GBL.ACCOUNT.INFO.wardSimple.wardCode) {
                            tempResponse.wardList.push(_t.wardList[key]);
                            break;
                        }
                    }
                }
                if(tempResponse.wardList.length > 0) {
                    response.wardList = tempResponse.wardList;
                }
            }
            if(response.wardList !== null) {
                if(returnType === "list") {
                    return response.wardList;
                }
                if(response.wardList.length > 0) {
                    let result = {};
                    if(allInclude !== false) {
                        result[""] = allInclude;
                    }
                    for(let i = 0; i < response.wardList.length; i++) {
                        let choice = response.wardList[i];
                        if(includeSickRoom === false) {
                            result[choice.wardCode] = choice.ward;
                        }
                        else {
                            if(choice.sickRoomList !== null) {
                                result[choice.wardCode] = choice.ward;
                            }
                        }
                    }
                    return result;
                }
            }
        }
        return null;
    },
    PAGE: function(addParams = null) {
        const passingParams = {
            requester : GBL.ACCOUNT.INFO.userCode,
            "organizationCode": GBL.ACCOUNT.INFO.organizationCode,
            "pageNumber": 1,
            "count": 100
        }
        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(WARD_CONST.API.URL.PAGE, passingParams);
        return response;
    },
    SELECT: function(code = null) {
        if (code === null) {
            return false;
        }
        const passingParams = {
            requestUserCode : GBL.ACCOUNT.INFO.userCode,
            serialNumber: code,
        }
        const response = custom.request.api(WARD_CONST.API.URL.SELECT, passingParams);
        return response;
    },
    DELETE: function(code = null) {
        if (code === null) {
            return false;
        }
        const passingParams = {
            requestUserCode : GBL.ACCOUNT.INFO.userCode,
            serialNumber: code
        }
        const response = custom.request.api(WARD_CONST.API.URL.DELETE, passingParams);
        return response;
    },
    INSERT: function(addParams = null) {
        const passingParams = {
            requestUserCode : GBL.ACCOUNT.INFO.userCode,
        }

        if (addParams !== null) {
            for (let key in addParams) {
                passingParams[key] = addParams[key]
            }
        }
        const response = custom.request.api(WARD_CONST.API.URL.INSERT, passingParams);
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
        const response = custom.request.api(WARD_CONST.API.URL.UPDATE, passingParams);
        return response;
    },
}