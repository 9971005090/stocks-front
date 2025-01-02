"use strict";
const CONST = {
    VERSION: "0.1.0",
    API: {
        BASE_URL: GBL.API.BASE_URL.replace("/API", ""),
        URL: {
            SERVER: {
                STREAM_LIST: "/Server/SelectAPIServer"
            }
        }
    },
    STOMP: {
        SERVER_TYPE: {
            CODE: {
                EVENT: 1,
                DATA: 2,
                GATEWAY: 3
            },
            STR: {
                EVENT: "EVENT",
                DATA: "DATA"
            },
            TITLE: {},
        },
        DATA_TYPE: {
            NORMAL: "bioSignalData",
            SIMPLE: "bioSignalSimpleData",
        },
        CONNECT_TYPE: {
            CODE: {
                GATEWAY: 1,
                WEB: 2,
                EVENT: 1
            }
        },
        EVENT_TYPE: {
            CODE: {
                MEASUREMENT: 10,
                WARD: 20
            },
            OBJ_NAME: {}
        },
        CLIENT: null,
        CLIENT_KEY: {
            DATA: null,
            EVENT: null
        },
        SUBSCRIBE: {}
    },
    FUNCTION: null,

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 사이트별 모듈에서 상이하게 처리해야 할 부분은 init 에 추가를 하던가? 아니면 새로운 함수를 추가하여 활용한다.
    // INIT : config 값 변경시 사용, default.js 에 선언된 함수를 사이트별로 변경시 사용.
    // POST_PROCESS: 해당 모듈의 액션 처리 후 진행해야 할 부분이 있다면 추가, controller에 index이외의 action이 있다면 추가 가능
    // 예시 - init)
    // // 버전은 기본 버전 뒤에 .0부터 올린다.
    // CONST.VERSION = `${CONST.VERSION}.0`;
    // 예시 - 함수 변경(일단! custom에 default 함수 그대로 복사해서 통째로 바꾼다. - 아직 더 좋은 방법이 생각나지 않는다. ㅠㅠ )
    // if(CUSTOM_FUNCTION.getApiServerList !== null) {
    //     CONST.FUNCTION.getApiServerList = CUSTOM_FUNCTION.getApiServerList;
    // }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    INIT: function() {
        let date = new Date();
        let stime = date.toString('yyyy-MM-dd HH:mm:ss');
        console.log("now - ", stime);
        // 아래 영역에 코드 작성
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    },
    POST_PROCESS: {
        index: function() {
            // 아래 영역에 코드 작성
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        }

        // controller에 index이외의 action이 있다면 직접 추가
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    },
    SET_FUNCTION: function(defaultFunction, customFunction) {
        // vanilla 로 구현 방법이 생각이 안나서 jquery 씀.
        $.extend(true, defaultFunction, customFunction);
        CONST.FUNCTION = defaultFunction;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
CONST.STOMP.SERVER_TYPE.TITLE[CONST.STOMP.SERVER_TYPE.CODE.EVENT] = CONST.STOMP.SERVER_TYPE.STR.EVENT;
CONST.STOMP.SERVER_TYPE.TITLE[CONST.STOMP.SERVER_TYPE.CODE.DATA] = CONST.STOMP.SERVER_TYPE.STR.DATA;
CONST.STOMP.EVENT_TYPE.OBJ_NAME[CONST.STOMP.EVENT_TYPE.CODE.MEASUREMENT] = "measurementInfo";
CONST.STOMP.EVENT_TYPE.OBJ_NAME[CONST.STOMP.EVENT_TYPE.CODE.WARD] = "wardList";
CONST.INIT();


export { CONST }
