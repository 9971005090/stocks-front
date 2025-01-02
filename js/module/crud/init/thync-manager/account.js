"use strict";

const {UTIL: ACCOUNT_UTIL} = await import(`/js/custom/constant/account/util.js${ver_string}`);
const {CONST: ACCOUNT_CONST} = await import(`/js/custom/constant/account/constant.js${ver_string}`);
const {UTIL: ORGAN_UTIL} = await import(`/js/custom/constant/organ/util.js${ver_string}`);
const {UTIL: WARD_UTIL} = await import(`/js/custom/constant/ward/util.js${ver_string}`);
const {EVENT: SELECT_BOX_EVENT, UTIL: SELECT_BOX_UTIL} = await import(`/js/custom/constant/event/select-box.js${ver_string}`);

export const CONST = {
    UTIL: {
        API_UTIL: ACCOUNT_UTIL,
        API_CONST: ACCOUNT_CONST,
        SEARCH_LIST: "userAccountSimpleList",
        API_SELECT_CONST: "userAccountSimple",
        API_SELECT_PAGE: "PAGE_ALL",
        DELETE_ALL_API: "DELETE_ALL",
        DELETE_API: "DELETE",
        INSERT_API: "INSERT",
        SELECT_API: "SELECT",
        CONFIRM_OTHER_FUNCTION: false,
        DYNAMIC_TITLE: null,
        VARIABLE_PAGE: false,
        VARIABLE_PAGE_NAME: '',
        VARIABLE_SEARCH_LIST: "",
        VARIABLE_API_SELECT_PAGE: "",
        CUSTOM_CONSTANT_SET: false,
        CUSTOM_CONSTANT_SET_NAME: ``,
    },
    MOVE_PAGE_CODE:{
        PAGE_CODE : `data-id`,
    },
    SEARCH_BUTTONS: [
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
                    TITLE: `기관`, // th text
                    TYPE: `text`, // 타입
                    BASIC_CLASS: `tit`, // 전체적으로 감싸는 div class
                    STYLE: null, // 추가 style
                    ACTIVE: true, // 필수입력
                    IS_INDEX: true, // 검색 유무
                    IS_ADD: true, // add 유무
                    IS_UPDATE: true, // update 유무
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
                        MAXLENGTH: null,
                        MINLENGTH: null,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `search`,
                    PLACEHOLDER: `검색어를 입력해 주세요.`,
                    IS_DISABLED: true,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `계정명(ID)`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `id`,
                    TYPE: `text`,
                    SEARCH_BTN: false,
                    IS_CHECK: true,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: 5,
                        MAXLENGTH: 32,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `id`,
                    PLACEHOLDER: 'ID는 5지 이상 32자 이하로 입력해주세요.',
                    IS_DISABLED: true,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `계정명(닉네임)`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `name`,
                    TYPE: `text`,
                    SEARCH_BTN: false,
                    IS_CHECK: true,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: 25,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `name`,
                    PLACEHOLDER: '닉네임을 입력해주세요.',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `이메일`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `email`,
                    TYPE: `text`,
                    SEARCH_BTN: false,
                    IS_CHECK: true,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: 150,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `email`,
                    PLACEHOLDER: '이메일 정보를 입력해주세요.',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `소속병동`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: false,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `ward.ward`,
                    TYPE: `select-box`,
                    SEARCH_BTN: false,
                    IS_CHECK: false,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: null,
                    },
                    CUSTOM_ADD_CLASS: `select-box-parent-for-ward`,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `wardCode`,
                    PLACEHOLDER: '',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `계정권한`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `level`,
                    TYPE: `radio-box`,
                    SEARCH_BTN: false,
                    IS_CHECK: false,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: null,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: [
                        {
                            TITLE: `환자`,
                            VALUE: 1,
                        },
                        {
                            TITLE: `간호사`,
                            VALUE: 2,
                        },
                        {
                            TITLE: `의사`,
                            VALUE: 5,
                        },
                        {
                            TITLE: `매니저`,
                            VALUE: 8,
                        },
                        {
                            TITLE: `관리자`,
                            VALUE: 14,
                        },
                        {
                            TITLE: `사이트매니저`,
                            VALUE: 20,
                        },
                    ],
                    STYLE: null,
                    NAME: `level`,
                    PLACEHOLDER: '계정권한',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `비밀번호`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: false,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `password`,
                    TYPE: `password`,
                    SEARCH_BTN: false,
                    IS_CHECK: true,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: 8,
                        MAXLENGTH: 20,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `password`,
                    PLACEHOLDER: '비밀번호를 입력해주세요.(알파벳,숫자 포함 8자이상)',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `비밀번호 확인`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: false,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `passwordCheck`,
                    TYPE: `password`,
                    SEARCH_BTN: false,
                    IS_CHECK: true,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: 8,
                        MAXLENGTH: 20,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `passwordCheck`,
                    PLACEHOLDER: '비밀번호 확인을 입력해주세요.',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `현재 비밀번호`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: false,
                    IS_INDEX: false,
                    IS_ADD: false,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `password`,
                    TYPE: `password`,
                    SEARCH_BTN: false,
                    IS_CHECK: true,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: 8,
                        MAXLENGTH: 20,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `password`,
                    PLACEHOLDER: '현재 비밀번호를 입력해주세요.',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `새로운 비밀번호`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: false,
                    IS_INDEX: false,
                    IS_ADD: false,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `modPassword`,
                    TYPE: `password`,
                    SEARCH_BTN: false,
                    IS_CHECK: true,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: 8,
                        MAXLENGTH: 20,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `modPassword`,
                    PLACEHOLDER: '비밀번호를 입력해주세요.(알파벳,숫자 포함 8자이상)',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `새로운 비밀번호 재입력`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: false,
                    IS_INDEX: false,
                    IS_ADD: false,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `passwordCheck`,
                    TYPE: `password`,
                    SEARCH_BTN: false,
                    IS_CHECK: true,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: 8,
                        MAXLENGTH: 20,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `passwordCheck`,
                    PLACEHOLDER: '비밀번호를 다시 한번 입력해주세요.',
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
                        WIDTH : `5%`
                    },
                    CHECKBOX_TYPE: `all`,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `Id`,
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
                            name: `닉네임`,
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
                            name: `email`,
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
                            name: `기관`,
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
                            name: `권한`,
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
                    TYPE: 'id',
                    DATA_PARSING: `id`
                },
                {
                    TYPE: `user-code`,
                    DATA_PARSING: `userCode`,
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
                    DATA_PARSING: [
                        {
                            name: ``,
                            key: `checkbox`,
                        },
                    ],
                    DATA_ID: `id`,
                },
                {
                    TITLE: [
                        {
                            name: `Id`,
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
                            key: `id`,
                        },
                    ],
                    DATA_ID: `id`,
                },
                {
                    TITLE: [
                        {
                            name: `닉네임`,
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
                            key: `name`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `email`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: null,
                    CHECKBOX_TYPE: `list`,
                    ADD_CLASS: null,
                    DATA_PARSING: [
                        {
                            name: ``,
                            key: `email`,
                        },
                    ],
                    DATA_ID: ``,
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
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `권한`,
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
                            key: `level`,
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
    ADD_PARAMETER: {},
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
        else if(param === `variable_search_param`){
            CONST.VARIABLE_SEARCH_PARAM_FUNCTION(passingParams);
        }
        else if(param === "dynamic"){
            CONST.DYNAMIC_FUNCTION(passingParams);
        }
        else if(param === "index_sub"){
            CONST.INDEX_SUB_FUNCTION(passingParams);
        }
        else if(param === "variable_page"){
            CONST.VARIABLE_PAGE_FUNCTION(passingParams);
        }
        else if(param === "variable_sub"){
            CONST.VARIABLE_SUB_FUNCTION(passingParams);
        }
    },
    constantsSet: function(){
        const _t = ORGAN_UTIL.LIST();
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
        GBL.CONSTANTS.set(`PARSING_ORGANIZATIONS`, _p, true);
    },
    selectBoxCallback: function (choiceBox) {
        let selectObj = $(choiceBox).parents(".cm-select-box");
        selectObj.children(".select-item").val($(choiceBox).attr(`data-code`));
        selectObj.children(".select-item").trigger("keyup");
        if ($(choiceBox).attr(`data-type`) === `organ`) {
            let _t =  GBL.CONSTANTS.get(`WARDS_${$(choiceBox).attr(`data-code`)}`);
            if (_t === null && $(choiceBox).attr(`data-code`) !== `all`) {
                _t = WARD_UTIL.LIST(false, false, `list`, true, true, {'organizationCode': $(choiceBox).attr(`data-code`)});
                GBL.CONSTANTS.set(`WARDS_${$(choiceBox).attr(`data-code`)}`, _t);
            }
            let _d = [];
            if (_t !== null) {
                for (let i = 0; i < _t.length; i++) {
                    _d.push({
                        code: _t[i].wardCode,
                        title: _t[i].ward,
                    });
                }
            }
            if ($(choiceBox).attr(`data-code`) !== `all`) {
                $(`.btn-all-delete`).css(`display`, `block`);
            }
            else {
                $(`.btn-all-delete`).css(`display`, `none`);
            }
            SELECT_BOX_UTIL.MAKE({
                type: `ward`,
                datas: _d,
                all: {code: '', title: `병동선택`, isUse: false},
                default: null,
                attr: {
                    name: `wardCode`,
                    'add-class': [`use-option`]
                },
                replace : true,
            }, {
                'parent': `.select-box-parent-for-ward`,
                'box': `.select-box-for-ward`,
                'option-list': `.select-box-option-list-for-ward`,
                'option-item': `.select-box-option-item-for-ward`,
                'label': `.select-box-label-for-ward`,
                'selected-class': `selected`,
                'box-id': 'select-box-for-ward'
            }, {
                'width': `width: 216px;`,
                'height': `height: 32px;`,
                'margin-left': `margin-left: 0px;`,
            }, CONST.selectBoxCallback);
        }
    },
    USING_SELECT_BOX: function(type='index'){
        CONST.constantsSet();
        if(type === 'add'){
            SELECT_BOX_UTIL.MAKE({
                type: `organ`,
                datas: GBL.CONSTANTS.get(`ORGANIZATION_DATAS`),
                all: {code: `all`, title: `기관선택`, isUse: false},
                default: null,
                attr: {
                    name: `organizationCode`,
                    'add-class': [`use-option`, `check`, `active-check`]
                },
                replace : false,
            }, {
                'parent': `.select-box-parent-for-organization`,
                'box': `.select-box-for-organization`,
                'option-list': `.select-box-option-list-for-organization`,
                'option-item': `.select-box-option-item-for-organization`,
                'label': `.select-box-label-for-organization`,
                'selected-class': `selected`,
                'box-id': 'select-box-for-organization',
            }, {
                'width': `width: 216px;`,
                'height': `height: 32px;`,
                'margin-left': `margin-left: 0px;`,
            }, CONST.selectBoxCallback);
            SELECT_BOX_UTIL.MAKE({
                type: `ward`,
                datas: null,
                all: {code: ``, title: `병동선택`, isUse: false},
                default: null,
                attr: {
                    name: `wardCode`,
                    'add-class': [`use-option`]
                },
                replace : false,
            }, {
                'parent': `.select-box-parent-for-ward`,
                'box': `.select-box-for-ward`,
                'option-list': `.select-box-option-list-for-ward`,
                'option-item': `.select-box-option-item-for-ward`,
                'label': `.select-box-label-for-ward`,
                'selected-class': `selected`,
                'box-id': 'select-box-for-ward'
            }, {
                'width': `width: 216px;`,
                'height': `height: 32px;`,
                'margin-left': `margin-left: 0px;`,
            }, CONST.selectBoxCallback);
        }
        else if(type === 'index'){
            SELECT_BOX_UTIL.MAKE({
                type: `organ`,
                datas: GBL.CONSTANTS.get(`ORGANIZATION_DATAS`),
                all: {code: `all`, title: `기관선택`, isUse: false},
                default: null,
                attr: {
                    name: `searchOrganizationCode`,
                    'add-class': [`use-option`, `check`, `active-check`]
                },
                replace : false,
            }, {
                'parent': `.select-box-parent-for-organization`,
                'box': `.select-box-for-organization`,
                'option-list': `.select-box-option-list-for-organization`,
                'option-item': `.select-box-option-item-for-organization`,
                'label': `.select-box-label-for-organization`,
                'selected-class': `selected`,
                'box-id': 'select-box-for-organization',
            }, {
                'width': `width: 216px;`,
                'height': `height: 32px;`,
                'margin-left': `margin-left: 0px;`,
            }, CONST.selectBoxCallback);
            SELECT_BOX_UTIL.MAKE({
                type: `ward`,
                datas: null,
                all: {code: ``, title: `병동선택`, isUse: false},
                default: null,
                attr: {
                    name: `wardCode`,
                    'add-class': [`use-option`]
                },
                replace : false,
            }, {
                'parent': `.select-box-parent-for-ward`,
                'box': `.select-box-for-ward`,
                'option-list': `.select-box-option-list-for-ward`,
                'option-item': `.select-box-option-item-for-ward`,
                'label': `.select-box-label-for-ward`,
                'selected-class': `selected`,
                'box-id': 'select-box-for-ward'
            }, {
                'width': `width: 216px;`,
                'height': `height: 32px;`,
                'margin-left': `margin-left: 0px;`,
            }, CONST.selectBoxCallback);
        }
        else{
            let selectCode = window.location.search.split(`=`)[1];
            let selectWardCode;
            let defaultParameter;
            if(ACCOUNT_UTIL[CONST.UTIL.SELECT_API](selectCode)[CONST.UTIL.API_SELECT_CONST].ward !== null){
                selectWardCode = ACCOUNT_UTIL[CONST.UTIL.SELECT_API](selectCode)[CONST.UTIL.API_SELECT_CONST].ward;
                defaultParameter = {
                    type : 'ward',
                    code : selectWardCode.wardCode,
                    title: selectWardCode.ward
                }
            }
            let _t = WARD_UTIL.LIST(false, false, `list`, true, true, {'organizationCode': $("#organizationCode").val()});
            let _d = [];
            if (_t !== null) {
                for (let i = 0; i < _t.length; i++) {
                    _d.push({
                        code: _t[i].wardCode,
                        title: _t[i].ward,
                    });
                }
            }
            SELECT_BOX_UTIL.MAKE({
                type: `ward`,
                datas: _d,
                all: {code: ``, title: `병동선택`, isUse: false},
                default: defaultParameter !== undefined ? defaultParameter : null,
                attr: {
                    name: `wardCode`,
                    'add-class': [`use-option`]
                },
                replace : false,
            }, {
                'parent': `.select-box-parent-for-ward`,
                'box': `.select-box-for-ward`,
                'option-list': `.select-box-option-list-for-ward`,
                'option-item': `.select-box-option-item-for-ward`,
                'label': `.select-box-label-for-ward`,
                'selected-class': `selected`,
                'box-id': 'select-box-for-ward'
            }, {
                'width': `width: 216px;`,
                'height': `height: 32px;`,
                'margin-left': `margin-left: 0px;`,
            }, CONST.selectBoxCallback);
        }
    },
    SEARCH_ETC: function(){},
    searchUserCode: function(params=null){
        const _t = ACCOUNT_UTIL.SELECT(params);
        if(params){
            return _t.userAccountSimple.userCode;
        }
    },
    FORM_FORMAT_CHANGE: function(params){
        return params;
    },
    CHECK_INSERT_INFO : function(param=null){
        if(!param){
            return false;
        }
        let msg = "";
        let regexId = /^[a-zA-Z](?=.*[a-zA-Z]).{4,32}$/;
        const _checkValidId = ACCOUNT_UTIL.LIST_ALL({'search': param.id});
        let emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        let passwordCheck = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;

        if(_checkValidId.userAccountSimpleList !== null){
            msg = "계정명(ID)가 중복됩니다. 다른 계정명을 사용해주세요.";
        }
        else if(!regexId.test(param.id)){
            msg = "ID는 5자 이상 32자 이하로 입력해주세요."
        }
        else if(!param.email.match(emailCheck)){
            msg = "이메일을 확인해주세요.";
        }
        else if(!param.password.match(passwordCheck)){
            msg = "비밀번호를 다시 입력해주세요.(최소 8자리, 숫자+알파벳)";
        }
        else if(param.password !== $(".cm-input-text[name='passwordCheck']").val()){
            msg = "비밀번호 확인 값이 다릅니다.";
        }
        else if(param.level === undefined){
            msg = "계정권한을 선택해주세요.";
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
    CHECK_UPDATE_INFO: function(form, param=null){
        let userCode = this.searchUserCode(param.code);
        let updateResult, updateResultAccount, passingParameter;
        let msg = "";
        let emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        let passwordCheck = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;

        if(!form[`email`].match(emailCheck)){
            msg = "이메일을 확인해주세요.";
        }
        else if(form[`modPassword`]){
            if(!form[`modPassword`].match(passwordCheck)){
                msg = "새로운 비밀번호를 다시 입력해주세요.(최소 8자리, 숫자+알파벳)";
            }
        }
        if(msg !== ""){
            custom.etc.customToastForColor(msg, `bgRed`);
            etc.isFormSubmit("form-data", "end");
            return false;
        }

        if((form[`password`] !== null) || (form[`modPassword`] !== null) || (form[`passwordCheck`] !== null)){
            let msgPassword = '';
            if(form[`password`] !== null){
                if (String.isNullOrWhitespace(form[`password`].trim()) === false) {
                    const checkPasswordParams = {
                        'organizationCode': form[`organizationCode`],
                        'userCode': userCode,
                        'password': form[`password`].trim(),
                    }
                    let checkPassword = ACCOUNT_UTIL.CHECK_PASSWORD(checkPasswordParams)
                    if(!checkPassword.result) {
                        msgPassword = "'현재 비밀번호'가 일치하지 않습니다.";
                    }
                    else if(!form[`modPassword`]){
                        msgPassword = "'새로운 비밀번호'를 입력해주세요.";
                    }
                    else if(!form[`passwordCheck`]){
                        msgPassword = "'새로운 비밀번호 재입력'을 입력해주세요.";
                    }
                    else if(form[`modPassword`].trim() !== form[`passwordCheck`].trim()){
                        msgPassword = "'새로운 비밀번호'와 '새로운 비밀번호 재입력'이 다릅니다.";
                    }
                }
            }
            if(form[`modPassword`] !== null){
                if (String.isNullOrWhitespace(form[`modPassword`].trim()) === false) {
                    if(!form[`password`]){
                        msgPassword = "'현재 비밀번호'를 입력해주세요.";
                    }
                    if(!form[`passwordCheck`]){
                        msgPassword = "'새로운 비밀번호 재입력'를 입력해주세요.";
                    }
                }
            }
            if(form[`passwordCheck`] !== null){
                if (String.isNullOrWhitespace(form[`passwordCheck`].trim()) === false) {
                    if(!form[`password`]){
                        msgPassword = "'현재 비밀번호'를 입력해주세요.";
                    }
                    if(!form[`modPassword`]){
                        msgPassword = "'새로운 비밀번호'을 입력해주세요.";
                    }
                }
            }
            if(form[`password`] !== null && form[`modPassword`] !== null){
                if((String.isNullOrWhitespace(form[`password`].trim()) === false) && (String.isNullOrWhitespace(form[`modPassword`].trim()) === false)) {
                    if(form[`password`] === form[`modPassword`]){
                        msgPassword = "'현재 비밀번호'와 '새로운 비밀번호'가 같습니다.";
                    }
                }
            }
            if(msgPassword !== ""){
                custom.etc.customToastForColor(msgPassword, `bgRed`);
                etc.isFormSubmit("form-data", "end");
                return false;
            }
            else{
                passingParameter = {
                    "userCode" : userCode,
                    "password" : form[`password`].trim(),
                    "newPassword" : form[`passwordCheck`].trim(),
                };
                updateResult = ACCOUNT_UTIL.UPDATE_PASSWORD(passingParameter);
            }
        }

        form['userCode'] = userCode;
        form['level'] = parseInt($("input[name=level]:checked").val());

        updateResultAccount = ACCOUNT_UTIL.UPDATE(form);
        if (updateResult === undefined && updateResultAccount === undefined) {
            custom.etc.customToastForError("계정 정보 수정에 실패하였습니다.");
            return false;
        }
        else {
            return true;
        }
    },
    DELETE_ALL: function(deleteList = [], text=null){
        $("#contents-by-data-table").find(".input[type='checkbox']").each(function (index , items) {
            if($(items).is(":checked")){
                deleteList.push($(items).parents(".cm-tr").data("user-code"));
            }
        });
        return {parameter : deleteList};
    },
    DELETE_ONE: function(parent=null){
        let parameter = parent.data('user-code');
        return {parameter};
    },
    INDEX_FUNCTION: function(passingParams= {}){},
    VARIABLE_PAGE_FUNCTION: function(passingParams = {}){},
    VARIABLE_SUB_FUNCTION: function(passingParams = {}){},
    ADD_FUNCTION: function(passingParams= {}){},
    UPDATE_FUNCTION: function(passingParams= {}){},
    SEARCH_FUNCTION: function(passingParams= {}){},
    SEARCH_PARAM_FUNCTION: function(passingParams= {}){},
    VARIABLE_SEARCH_PARAM_FUNCTION: function(passingParams= {}){},
    SEARCH_PARAM_OK_FUNCTION: function(passingParams= {}){
        return true;
    },
    DYNAMIC_FUNCTION: function(passingParams = {}){},
    INDEX_SUB_FUNCTION: function(passingParams = {}){},
    ADD_CONFIRM_INSERT_FUNCTION: function(){},
};