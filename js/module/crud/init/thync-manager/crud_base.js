"use strict";

const {UTIL: BASE_UTIL} = await import(`/js/custom/constant/crud_base/util.js${ver_string}`);
const {CONST: BASE_CONST} = await import(`/js/custom/constant/crud_base/constant.js${ver_string}`)
const {EVENT: SELECT_BOX_EVENT, UTIL: SELECT_BOX_UTIL} = await import(`/js/custom/constant/event/select-box.js${ver_string}`);
await import(`/js/custom/constant/crud_base/data-init.js${ver_string}`);

/**
 * @constant
 * @typedef {object} CONST
 * @typedef {object} UTIL
 *          API_UTIL: 사용하는 UTIL 명
 *          API_CONST: 사용하는 CONST 명
 *          SEARCH_LIST: search 시 사용되는 객체명
 *          API_SELECT_CONST: update시 select 되는 객체명
 *          API_SELECT_PAGE: page API 명
 *          DELETE_ALL_API: 다중선택 후 삭제 API 명
 *          INSERT_API: 입력 API 명
 *          SELECT_API: select API 명
 *          CONFIRM_OTHER_FUNCTION: add 화면에서 등록 버튼 클릭시 새로운 함수로 사용할때 유/무
 *          DYNAMIC_TITLE: 등록되지 않은 페이지 추가시 사용. 그 페이지 제목
 * @typedef {object} MOVE_PAGE_CODE
 *          PAGE_CODE: 수정버튼 클릭시 넘기는 parameter
 * @typedef {array} SEARCH_BUTTONS 상단에 들어가는 버튼
 */
/**
 * @typedef {object} FORM_DATA index의 리스트 제외 부분과 add/update 정의
 * @typedef {array} COLUMN FORM_DATA의 배열
 * @typedef {object} VIEW table의 th 부분
 *          TITLE: th 이름
 *          TYPE: th type
 *          STYLE: th 추가 style
 *          ACTIVE: 필수 조건 boolean
 *          IS_INDEX: index 파일에서 유/무 정의
 *          IS_ADD: add 파일에서 유/무 정의
 *          IS_UPDATE: update 파일에서 유/무 정의
 *          IS_DYNAMIC: dynamic 파일에서 유/무 정의
 * @typedef {object} VALUE table의 td 부분
 *          COLUMN: id/value 값에 쓰는 파라미터
 *          TYPE: td type 정의
 *          SEARCH_BTN: search 버튼의 유무
 *          IS_CHECK: 제한 유무
 *          LIMIT: 제한 유무에 따른 min/max 값
 *          CUSTOM_ADD_CLASS: 추가로 넣는 class
 *          RADIO_CONT: radio 버튼일때 정의
 *          STYLE: 추가 style
 *          NAME: name 정의
 *          PLACEHOLDER: placeholder 값
 *          IS_DISABLED: update 파일 일때 disabled 표시 유/무
 *          OTHER_NAME_CHECK: name명 외에 다른 name이 필요시 유/무
 *          OTHER_NAME: name명 외에 다른 name
 *          IS_CUSTOM_HTML: dynamic이나 design에 없는 추가할 html 유/무
 *          CUSTOM_HTML: dynamic에 추가할 custom html
 */
/**
 * @typedef {object} DATA_LIST response data list 정의
 * @typedef {object} HEAD table의 thead 부분
 * @typedef {array} COLUMN HEAD의 배열
 *          TITLE: thead cell의 text
 *          TYPE: thead cell의 type
 *          @typedef {object} STYLE table colgroup style
 *                   WIDTH: table colgroup width 값
 *          CHECKBOX_TYPE: 체크박스 타입 all/list
 *          ADD_CLASS: 추가 class
 * @typedef {object} BODY table의 tbody 부분
 * @typedef {array} DATA_PARSE tbody의 tr에 들어가는 data attribute 부분
 *          TYPE: data-"" 에 들어가는 부분
 *          DATA_PARSING: data attribute 값에 들어가는 부분
 * @typedef {array} COLUMN BODY의 배열
 *          TITLE: tbody cell의 text
 *          TYPE: cell의 type
 *          @typedef {object} STYLE table colgroup style
 *                   TD_STYLE: table body > tr > td 의  style
 *                   DIV_STYLE: table body > tr > td의 자식 tag인 div의 style
 *          CHECKBOX_TYPE: checkbox 일때의 타입
 *          ADD_CLASS: td 추가 class
 *          DATA_PARSING: data parameter 값
 *          DATA_ID: checkbox, radio-box에 필요한 id 값
 * @typedef {object} ADD_PARAMETER 각 페이지별로 필요한 parameter
 */


export const CONST = {
    UTIL: {
        API_UTIL: BASE_UTIL,
        API_CONST: BASE_CONST,
        SEARCH_LIST: "gatewayInfoList",
        API_SELECT_CONST: "gatewayInfo",
        API_SELECT_PAGE: "PAGE",
        DELETE_ALL_API: "DELETE_ALL",
        DELETE_API: "DELETE",
        INSERT_API: "INSERT",
        SELECT_API: "SELECT",
        CONFIRM_OTHER_FUNCTION: false,
        DYNAMIC_TITLE: null,
    },
    MOVE_PAGE_CODE:{
        PAGE_CODE : `data-serialNumber`,
    },
    SEARCH_BUTTONS: [
        {
            NAME: `새로고침`,
            ADD_CLASS: `btn-black btn-refresh`,
        },
        {
            NAME: `등록`,
            ADD_CLASS: `btn-black btn-add`,
        },
        {
            NAME: `선택 삭제`,
            ADD_CLASS: `cm-btn-n-default btn-all-delete`,
        }
    ],
    FORM_DATA: {
        COLUMN: [
            {
                VIEW: {
                    TITLE: `기관`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: true,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `organizationCode`,
                    TYPE: `select-box`,
                    SEARCH_BTN: false,
                    IS_CHECK: false,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: null,
                    },
                    CUSTOM_ADD_CLASS: `select-box-parent-for-organization`,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `organizationCode`,
                    PLACEHOLDER: ``,
                    IS_DISABLED: true,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `검색어`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: false,
                    IS_INDEX: true,
                    IS_ADD: false,
                    IS_UPDATE: false,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `search`,
                    TYPE: `search`,
                    SEARCH_BTN: true,
                    IS_CHECK: false,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: null,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `search`,
                    PLACEHOLDER: `기관 이름을 입력해 주세요.`,
                    IS_DISABLED: true,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `시리얼넘버`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `serialNumber`,
                    TYPE: `text`,
                    SEARCH_BTN: false,
                    IS_CHECK: false,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: null,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    SELECT_VALUE: null,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `serialNumber`,
                    PLACEHOLDER: '시리얼넘버',
                    IS_DISABLED: true,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `macAddress`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `macAddress`,
                    TYPE: `text`,
                    SEARCH_BTN: false,
                    IS_CHECK: false,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: null,
                    },
                    CUSTOM_UL_ID: ``,
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `macAddress`,
                    PLACEHOLDER: 'macAddress',
                    IS_DISABLED: true,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `Firmware Version`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `fwVersion`,
                    TYPE: `text`,
                    SEARCH_BTN: false,
                    IS_CHECK: false,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: null,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `fwVersion`,
                    PLACEHOLDER: '펌에어 버전',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `설치 장소(층)`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: false,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `floor`,
                    TYPE: `text`,
                    SEARCH_BTN: false,
                    IS_CHECK: false,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: null,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `floor`,
                    PLACEHOLDER: 'ex) 13병동 1301호 앞',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `설치 장소(X)`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: false,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `axisX`,
                    TYPE: `text`,
                    SEARCH_BTN: false,
                    IS_CHECK: false,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: null,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `axisX`,
                    PLACEHOLDER: 'X 좌표',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `설치 장소(Y)`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: false,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `axisY`,
                    TYPE: `text`,
                    SEARCH_BTN: false,
                    IS_CHECK: false,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: null,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `axisY`,
                    PLACEHOLDER: 'Y 좌표',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `비고`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: false,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `etc`,
                    TYPE: `textarea`,
                    SEARCH_BTN: false,
                    IS_CHECK: false,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: null,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `etc`,
                    PLACEHOLDER: '비고를 작성해주세요.',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
        ],
    },
    DATA_LIST: {
        HEAD: {
            COLUMN: [
                {
                    TITLE: [
                        {
                            name: ``,
                            key: ``,
                        },
                    ],
                    TYPE: `check-box`,
                    STYLE: {
                        WIDTH : `3%`
                    },
                    CHECKBOX_TYPE: `all`,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `번호`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `3%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `기관`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `10%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `연결상태`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `4%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `serial Number`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `9%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `macAddress`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `15%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `마지막 연결시간`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `10%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `펌웨어버전`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `10%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `설치장소`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `10%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `비고`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `20%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `관리`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `10%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
            ],
        },
        BODY: {
            DATA_PARSE: [
                {
                    TYPE: 'serialNumber',
                    DATA_PARSING: `serialNumber`
                },
                {
                    TYPE: `code`,
                    DATA_PARSING: `organizationCode`,
                },
            ],
            COLUMN: [
                {
                    TITLE: [
                        {
                            name: ``,
                            key: ``,
                        },
                    ],
                    TYPE: `check-box`,
                    STYLE: {
                        TD_STYLE: null,
                        DIV_STYLE: null,
                    },
                    CHECKBOX_TYPE: `list`,
                    ADD_CLASS: null,
                    DATA_PARSING:  [
                        {
                            name: ``,
                            key: `checkbox`,
                        },
                    ],
                    DATA_ID: `gatewayInfoId`,
                },
                {
                    TITLE: [
                        {
                            name: ``,
                            key: ``,
                        },
                    ],
                    TYPE: `number`,
                    STYLE: {
                        TD_STYLE: null,
                        DIV_STYLE: null,
                    },
                    CHECKBOX_TYPE: `list`,
                    ADD_CLASS: null,
                    DATA_PARSING: [
                        {
                            name: ``,
                            key: `gatewayInfoId`,
                        },
                    ],
                    DATA_ID: `gatewayInfoId`,
                },
                {
                    TITLE: [
                        {
                            name: `기관`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        TD_STYLE: null,
                        DIV_STYLE: null,
                    },
                    CHECKBOX_TYPE: `list`,
                    ADD_CLASS: null,
                    DATA_PARSING: [
                        {
                            name: ``,
                            key: `organizationCode`,
                        },
                    ],
                    DATA_ID: `gatewayInfoId`,
                },
                {
                    TITLE: [
                        {
                            name: `연결상태`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        TD_STYLE: null,
                        DIV_STYLE: null,
                    },
                    CHECKBOX_TYPE: `list`,
                    ADD_CLASS: null,
                    DATA_PARSING: [
                        {
                            name: ``,
                            key: `connStatus`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `serial Number`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        TD_STYLE: null,
                        DIV_STYLE: null,
                    },
                    CHECKBOX_TYPE: `list`,
                    ADD_CLASS: null,
                    DATA_PARSING: [
                        {
                            name: ``,
                            key: `serialNumber`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `macAddress`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        TD_STYLE: null,
                        DIV_STYLE: null,
                    },
                    CHECKBOX_TYPE: `list`,
                    ADD_CLASS: null,
                    DATA_PARSING: [
                        {
                            name: ``,
                            key: `macAddress`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `마지막 연결시간`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        TD_STYLE: null,
                        DIV_STYLE: null,
                    },
                    CHECKBOX_TYPE: `list`,
                    ADD_CLASS: null,
                    DATA_PARSING: [
                        {
                            name: ``,
                            key: `connStatusUpdateTimeByStream`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `펌웨어버전`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        TD_STYLE: null,
                        DIV_STYLE: null,
                    },
                    CHECKBOX_TYPE: `list`,
                    ADD_CLASS: null,
                    DATA_PARSING: [
                        {
                            name: ``,
                            key: `fwVersion`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `설치장소`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        TD_STYLE: null,
                        DIV_STYLE: null,
                    },
                    CHECKBOX_TYPE: `list`,
                    ADD_CLASS: null,
                    DATA_PARSING: [
                        {
                            name: ``,
                            key: `floor`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `비고`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        TD_STYLE: null,
                        DIV_STYLE: null,
                    },
                    CHECKBOX_TYPE: `list`,
                    ADD_CLASS: null,
                    DATA_PARSING: [
                        {
                            name: ``,
                            key: `etc`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: ``,
                            key: ``,
                        },
                    ],
                    TYPE: `buttons`,
                    STYLE: {
                        TD_STYLE: null,
                        DIV_STYLE: null,
                    },
                    CHECKBOX_TYPE: `list`,
                    ADD_CLASS: null,
                    DATA_PARSING: [
                        {
                            name: `수정`,
                            key: `btn-black btn-detail-view button-update`,
                        },
                        {
                            name: `삭제`,
                            key: `cm-btn-n-default btn-delete`,
                        },
                    ],
                    DATA_ID: ``,
                },
            ],
        },
    },

    /**
     * CALLBACK_FUNCTION 함수
     * @param {string} param 페이지 상태값
     * @description 각 페이지 마다 추가하려는 함수
     */
    CALLBACK_FUNCTION(param = null, passingParams = {}){
        if(param === "index"){
            CONST.INDEX_FUNCTION(passingParams);
        }
        else if(param === "add"){
            CONST.ADD_FUNCTION(passingParams);
        }
        else if(param === "update"){
            CONST.UPDATE_FUNCTION(passingParams);
        }
        else if(param === "search"){
            CONST.SEARCH_FUNCTION(passingParams);
        }
        else if(param === "search_param"){
            CONST.SEARCH_PARAM_FUNCTION(passingParams);
        }
        else if(param === "variable_search_param"){
            CONST.VARIABLE_SEARCH_PARAM_FUNCTION(passingParams);
        }
        else if(param === "dynamic"){
            CONST.DYNAMIC_FUNCTION(passingParams);
        }
        else if(param === "index_sub"){
            CONST.INDEX_SUB_FUNCTION(passingParams);
        }
    },
    constantsSet: function(){
        const _t = BASE_UTIL.ORGAN_LIST();
        let _p = {};
        let _d = [];
        for (let i = 0; i < _t.organizationList.length; i++) {
            _p[_t.organizationList[i].organizationCode] = _t.organizationList[i].organizationName;
            _d.push({
                code: _t.organizationList[i].organizationCode,
                title: _t.organizationList[i].organizationName,
            });
        }
        GBL.CONSTANTS.set(`ORGANIZATION_DATAS`, _d, true);
    },
    selectBoxCallback: function (choiceBox) {
        let selectObj = $(choiceBox).parents(".cm-select-box");
        selectObj.children(".select-item").val($(choiceBox).attr(`data-code`));
        if ($(choiceBox).attr(`data-type`) === `organ`) {
            let _t =  GBL.CONSTANTS.get(`WARDS_${$(choiceBox).attr(`data-code`)}`);
            let _d = [];
            if (_t !== null) {
                for (let i = 0; i < _t.length; i++) {
                    _d.push({
                        code: _t[i].wardCode,
                        title: _t[i].ward,
                    });
                }
            }
        }
    },
    /**
     * USING_SELECT_BOX 함수
     * @param {string} type 페이지 상태값
     * @description 각 페이지 마다 필요한 select-box를 생성한다.
     */
    USING_SELECT_BOX: function(type='index'){
        CONST.constantsSet();
        SELECT_BOX_UTIL.MAKE({
            type: `organ`,
            datas: GBL.CONSTANTS.get(`ORGANIZATION_DATAS`),
            all: {code: `all`, title: `기관선택`, isUse: false},
            default: null,
            attr: {
                name: `searchOrganizationCode`,
                'add-class': [`use-option`]
            }
        }, {
            'parent': `.select-box-parent-for-organization`,
            'box': `.select-box-for-organization`,
            'option-list': `.select-box-option-list-for-organization`,
            'option-item': `.select-box-option-item-for-organization`,
            'label': `.select-box-label-for-organization`,
            'selected-class': `selected`,
            'box-id': 'select-box-for-organization'
        }, {
            'width': `width: 216px;`,
            'height': `height: 32px;`,
            'margin-left': `margin-left: 0px;`,
        }, CONST.selectBoxCallback);
    },
    /**
     * SEARCH_ETC 함수
     * @description search부분에서 페이징 로드 후 호출되는 함수
     */
    SEARCH_ETC: function(){},
    /**
     * FORM_FORMAT_CHANGE 함수
     * @param {object} params type 변경하기 위한 parameter
     * @description insert 전에 type 변경 해주는 함수
     * @return {object} params type 변경된 parameter
     */
    FORM_FORMAT_CHANGE: function(params){
        params[`axisX`] = Number(params[`axisX`]);
        params[`axisY`] = Number(params[`axisY`]);
        return params;
    },
    /**
     * FORM_FORMAT_CHANGE 함수
     * @param {object} param insert 요청 시 validate 검사하기 위한 parameter
     * @description insert 하기 전 validate 검사를 하기 위한 함수, 에러가 있을시 토스트 메시지를 띄어주고, 에러가 없을시에는 아무이상 없이 return 된다.
     */
    CHECK_INSERT_INFO: function(param=null){
        if(!param){
            return false;
        }
        let msg = "";
        const _checkValidSerialNumber = BASE_UTIL.SELECT(param.serialNumber);
        const _checkValidMacAddress = BASE_UTIL.LIST({'search':param.macAddress});
        let regMacAddress = /^[a-fA-F0-9]{2}(:[a-fA-F0-9]{2}){5}$/;

        if(_checkValidSerialNumber.gatewayInfo !== null){
            msg = `시리얼넘버가 중복됩니다. 시리얼넘버를 확인해주세요.`;
        }
        else if(_checkValidMacAddress.gatewayInfoList !== null){
            msg = `macAddress 중복됩니다. macAddress를 확인해주세요.`;
        }
        else if(!param.macAddress.match(regMacAddress)){
            msg = `macAddress 형식이 잘못되었습니다. 확인해주세요.`
        }
        else if(isNaN(param.axisX)){
            msg = `X좌표는 숫자만 입력 가능합니다.`
        }
        else if(isNaN(param.axisY)){
            msg = `Y좌표는 숫자만 입력 가능합니다.`
        }
        if(msg === ""){
            return true;
        }
        else {
            custom.etc.customToastForColor(msg, `bgRed`);
            etc.isFormSubmit("form-data", "end");
            return false;
        }
    },
    /**
     * CHECK_UPDATE_INFO 함수
     * @param {object} form update 요청 시 validate 검사하기 위한 parameter
     * @param {object} param update 요청에 필요한 parameter
     * @description update 하기 전 validate 검사를 하기 위한 함수, 에러가 있을시 토스트 메시지를 띄어주고, 에러가 없을시에는 아무이상 없이 return 된다.
     */
    CHECK_UPDATE_INFO: function(form, param=null){
        let msg = "";
        if(isNaN(form['axisX'])){
            msg = `X좌표는 숫자만 입력 가능합니다.`
        }
        if(isNaN(form['axisY'])){
            msg = `Y좌표는 숫자만 입력 가능합니다.`
        }
        if(msg !== ""){
            custom.etc.customToastForColor(msg, `bgRed`);
            etc.isFormSubmit("form-data", "end");
            return false;
        }
        if(form['axisX'] === null) form['axisX'] = 0;
        if(form['axisY'] === null) form['axisY'] = 0;

        form['axisX'] = Number(form['axisX']);
        form['axisY'] = Number(form['axisY']);

        const _t = BASE_UTIL.UPDATE(form);
        if (_t.result !== true) {
            custom.etc.customToastForError("정보 수정에 실패하였습니다.");
        }
        else {
            return true;
        }
    },
    /**
     * DELETE_ALL 함수
     * @param {array} deleteList 삭제하려는 배열 목록
     * @param {string} text 삭제 혹은 다른명의 버튼 클릭시 나타나는 토스트 메세지 문구
     * @description 다중 선택을 하기 위한 함수
     * @return {object}
     */
    DELETE_ALL: function(deleteList = [], text=null){
        $("#contents-by-data-table").find(".input[type='checkbox']").each(function (index , items) {
            if($(items).is(":checked")){
                deleteList.push($(items).parents(".cm-tr").data("serialnumber"));
            }
        });
        return {parameter : deleteList};
    },
    /**
     * DELETE_ONE 함수
     * @param {object} parent 삭제하려는 배열 목록
     * @description 삭제 하기 위한 함수. 필요 항목 따라 return 값 변경될수 있음
     * @return {object}
     */
    DELETE_ONE: function(parent=null){
        let parameter = parent.data('serialnumber');
        return {parameter};
    },
    /**
     * INDEX_FUNCTION 함수
     * @description INDEX 페이지에서 추가로 실행할 함수
     */
    INDEX_FUNCTION: function(passingParams= {}){},
    VARIABLE_PAGE_FUNCTION: function(passingParams= {}){},
    VARIABLE_SUB_FUNCTION: function(passingParams= {}){},
    /**
     * ADD_FUNCTION 함수
     * @description ADD 페이지에서 추가로 실행할 함수
     */
    ADD_FUNCTION: function(passingParams= {}){},
    /**
     * UPDATE_FUNCTION 함수
     * @description UPDATE 페이지에서 추가로 실행할 함수
     */
    UPDATE_FUNCTION: function(passingParams= {}){},
    /**
     * SEARCH_FUNCTION 함수
     * @description Search 함수 제일 마지막에 호출하는 함수
     */
    SEARCH_FUNCTION: function(passingParams= {}){},
    /**
     * SEARCH_PARAM_FUNCTION 함수
     * @description Search 할때 parameter 값 변경 필요시 사용하는 함수
     * @return {object} passingParams
     */
    SEARCH_PARAM_FUNCTION: function(passingParams= {}){},
    /**
     * VARIABLE_SEARCH_PARAM_FUNCTION 함수
     * @description 새로운 모듈 페이지(VARIABLE)의 Search 할때 parameter 값 변경 필요시 사용하는 함수
     * @return {object} passingParams
     */
    VARIABLE_SEARCH_PARAM_FUNCTION: function(passingParams= {}){},
    /**
     * SEARCH_PARAM_OK_FUNCTION 함수
     * @description INDEX 페이지 _search 함수에서 parameter 확인후 true/false return
     * @return {boolean} true/false
     */
    SEARCH_PARAM_OK_FUNCTION: function(passingParams= {}){},
    /**
     * DYNAMIC_FUNCTION 함수
     * @description 추가페이지 함수. 제일 마지막에 호출하는 함수
     */
    DYNAMIC_FUNCTION: function(passingParams = {}){},
    /**
     * INDEX_SUB_FUNCTION 함수
     * @description INDEX 에서 setTimeout 후 호출하는 함수
     */
    INDEX_SUB_FUNCTION: function(passingParams = {}){},
    ADD_CONFIRM_INSERT_FUNCTION: function(){},
};