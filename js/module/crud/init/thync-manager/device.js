"use strict";

const {UTIL: DEVICE_UTIL} = await import(`/js/custom/constant/device/util.js${ver_string}`);
const {CONST: DEVICE_CONST} = await import(`/js/custom/constant/device/constant.js${ver_string}`);
const {EVENT: SELECT_BOX_EVENT, UTIL: SELECT_BOX_UTIL} = await import(`/js/custom/constant/event/select-box.js${ver_string}`);
const {UTIL: ORGAN_UTIL} = await import(`/js/custom/constant/organ/util.js${ver_string}`);
const {UTIL: WARD_UTIL} = await import(`/js/custom/constant/ward/util.js${ver_string}`);

export const CONST = {
    UTIL: {
        API_UTIL: DEVICE_UTIL,
        API_CONST: DEVICE_CONST,
        SEARCH_LIST: "deviceRegisterList",
        API_SELECT_CONST: "notice",
        API_SELECT_PAGE: "PAGE",
        DELETE_ALL_API: "DELETE_ALL",
        DELETE_API: "DELETE",
        INSERT_API: "INSERT",
        SELECT_API: "",
        CONFIRM_OTHER_FUNCTION: true,
        DYNAMIC_TITLE: `대량 등록`,
        VARIABLE_PAGE: false,
        VARIABLE_PAGE_NAME: '',
        VARIABLE_SEARCH_LIST: "",
        VARIABLE_API_SELECT_PAGE: "",
        CUSTOM_CONSTANT_SET: false,
        CUSTOM_CONSTANT_SET_NAME: ``,
    },
    MOVE_PAGE_CODE:{
        PAGE_CODE : ``,
    },
    SEARCH_BUTTONS: [
        {
            NAME: `등록`,
            ADD_CLASS: `btn-black btn-add`,
        },
        {
            NAME: `대량 등록`,
            ADD_CLASS: `btn-black btn-add-for-bulk`,
        },
        {
            NAME: `선택 이동`,
            ADD_CLASS: `btn-black btn-move-for-choice`,
        },
        {
            NAME: `선택 삭제`,
            ADD_CLASS: `cm-btn-n-default btn-all-delete`,
        },
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
                    IS_UPDATE: false,
                    IS_DYNAMIC: true,
                },
                VALUE: {
                    COLUMN: `targetOrganizationCode`,
                    TYPE: `select-box`,
                    SEARCH_BTN: false,
                    IS_CHECK: true,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: null,
                    },
                    CUSTOM_ADD_CLASS: `select-box-parent-for-organization`,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `targetOrganizationCode`,
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
                    TITLE: `병동`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: true,
                    IS_ADD: true,
                    IS_UPDATE: false,
                    IS_DYNAMIC: true,
                },
                VALUE: {
                    COLUMN: `wardCode`,
                    TYPE: `select-box`,
                    SEARCH_BTN: false,
                    IS_CHECK: true,
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
                    TITLE: `종류`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: true,
                    IS_ADD: false,
                    IS_UPDATE: false,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `deviceType`,
                    TYPE: `radio-box`,
                    SEARCH_BTN: false,
                    IS_CHECK: false,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: null,
                    },
                    CUSTOM_ADD_CLASS: `use-option`,
                    RADIO_CONT: [
                        {
                            TITLE: `전체`,
                            VALUE: 0,
                        },
                        {
                            TITLE: `ECG`,
                            VALUE: 1,
                        },
                        {
                            TITLE: `TEMP`,
                            VALUE: 2,
                        },
                        {
                            TITLE: `SpO2`,
                            VALUE: 3,
                        },
                        {
                            TITLE: `BP`,
                            VALUE: 6,
                        },
                        {
                            TITLE: `Tag`,
                            VALUE: 8,
                        },
                    ],
                    STYLE: null,
                    NAME: `deviceType`,
                    PLACEHOLDER: '',
                    IS_DISABLED: true,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `사용`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: true,
                    IS_ADD: false,
                    IS_UPDATE: false,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `deviceUseStatus`,
                    TYPE: `radio-box`,
                    SEARCH_BTN: false,
                    IS_CHECK: false,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: null,
                    },
                    CUSTOM_ADD_CLASS: `use-option`,
                    RADIO_CONT: [
                        {
                            TITLE: `전체`,
                            VALUE: -1,
                        },
                        {
                            TITLE: `사용`,
                            VALUE: 1,
                        },
                        {
                            TITLE: `비사용`,
                            VALUE: 0,
                        },
                    ],
                    STYLE: null,
                    NAME: `deviceUseStatus`,
                    PLACEHOLDER: '',
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
                    TITLE: `시리얼번호`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: false,
                    IS_DYNAMIC: true,
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
                    RADIO_CONT: null,
                    STYLE: ``,
                    NAME: `serialNumber`,
                    PLACEHOLDER: '의료기기 고유 시리얼번호',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: true,
                    CUSTOM_HTML: `
                        <div class="tit require-validation">시리얼번호</div>
                        <div class="cont">
                            <div class="cm-device-search" style="width: auto">
                                <div class="cm-input-cont" style="width: auto">
                                    <input type="text" class="cm-input-text device-bulk-serial-number-text" placeholder="의료기기 고유 시리얼번호" name="serialNumber" maxlength="7" />
                                </div>
                                <button type="button" class="device-search-btn device-bulk-serial-number-add-button">
                                    <span style="color: white; font-size: 11px">추가</span>
                                </button>
                                <button type="button" class="device-search-btn device-bulk-excel-add-button" style=" width: 50px;">
                                    <span style="color: white; font-size: 11px;">엑셀파일</span>
                                </button>
                                <div style="font-size: 11px;">(첫번째 시트의 A칼럼의 각 행에 하나씩 등록하고자 하는 시리얼번호 입력)</div>
                                <input type="file" id="excel-file-upload" style="display: none">
                            </div>
                            <div class="cm-textarea-cont device-bulk-info-parent" style="display: flex; flex-wrap: wrap; gap: 5px;"></div>
                        </div>
                    `,
                },
            },
            {
                VIEW: {
                    TITLE: `닉네임`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: false,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: false,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `deviceCode`,
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
                    STYLE: ``,
                    NAME: `deviceCode`,
                    PLACEHOLDER: '의료기기 고유 닉네임',
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
                    IS_CHECK: true,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: 2000,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: ``,
                    NAME: `etc`,
                    PLACEHOLDER: '의료기기 기타 정보',
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
                            name: `사용`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `5%`
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
                        WIDTH : `15%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `종류`,
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
                            name: `시리얼번호`,
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
                            name: `맥어드레스`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `13%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `전체사용시간`,
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
                            name: `전체사용횟수`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `7%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `등록시간`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `14%`
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
                        WIDTH : `8%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
            ],
        },
        BODY: {
            DATA_PARSE: [
                {
                    TYPE: 'serial-number',
                    DATA_PARSING: `serialNumber`
                },
                {
                    TYPE: 'device-use',
                    DATA_PARSING: `deviceUseStatus`
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
                        TD_STYLE: 'height: 41px;',
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
                    DATA_ID: `serialNumber`,
                },
                {
                    TITLE: [
                        {
                            name: `사용`,
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
                            key: `parsingDeviceUseStatus`,
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
                            name: `종류`,
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
                            key: `deviceType`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `시리얼번호`,
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
                            name: `맥어드레스`,
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
                            name: `전체사용시간`,
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
                            key: `totalUseTime`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `전체사용횟수`,
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
                            key: `totalUseCount`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `등록시간`,
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
                            key: `dateTime`,
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
                            name: `삭제`,
                            key: `cm-btn-n-default btn-delete`,
                        },
                    ],
                    DATA_ID: ``,
                },
            ],
        },
    },
    ADD_PARAMETER: {
        "subPageName" : "add-bulk"
    },
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
    selectBoxCallback: function (choiceBox, param=null) {
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
                    'add-class': [`use-option`, `check`, `active-check`]
                },
                replace : true,
                addParam: param,
            }, {
                'parent': `.select-box-parent-for-ward${param}`,
                'box': `.select-box-for-ward${param}`,
                'option-list': `.select-box-option-list-for-ward${param}`,
                'option-item': `.select-box-option-item-for-ward${param}`,
                'label': `.select-box-label-for-ward${param}`,
                'selected-class': `selected`,
                'box-id': `select-box-for-ward${param}`
            }, {
                'width': `width: 216px;`,
                'height': `height: 32px;`,
                'margin-left': `margin-left: 0px;`,
            }, CONST.selectBoxCallback);
        }
    },
    USING_SELECT_BOX: function(type='index', param = ''){
        CONST.constantsSet();
        SELECT_BOX_UTIL.MAKE({
            type: `organ`,
            datas: GBL.CONSTANTS.get(`ORGANIZATION_DATAS`),
            all: {code: `all`, title: `기관선택`, isUse: false},
            default: null,
            attr: {
                name: `targetOrganizationCode`,
                'add-class': [`use-option`, `check`, `active-check`]
            },
            replace : false,
            addParam: param,
        }, {
            'parent': `.select-box-parent-for-organization${param}`,
            'box': `.select-box-for-organization${param}`,
            'option-list': `.select-box-option-list-for-organization${param}`,
            'option-item': `.select-box-option-item-for-organization${param}`,
            'label': `.select-box-label-for-organization${param}`,
            'selected-class': `selected`,
            'box-id': `select-box-for-organization${param}`,
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
                'add-class': [`use-option`, `check`, `active-check`]
            },
            replace : false,
            addParam: param,
        }, {
            'parent': `.select-box-parent-for-ward${param}`,
            'box': `.select-box-for-ward${param}`,
            'option-list': `.select-box-option-list-for-ward${param}`,
            'option-item': `.select-box-option-item-for-ward${param}`,
            'label': `.select-box-label-for-ward${param}`,
            'selected-class': `selected`,
            'box-id': `select-box-for-ward${param}`
        }, {
            'width': `width: 216px;`,
            'height': `height: 32px;`,
            'margin-left': `margin-left: 0px;`,
        }, CONST.selectBoxCallback);
    },
    SEARCH_ETC: function(){
        $(".cm-tbody .cm-tr").each(function(index, item){
            if($(item).data("device-use") === 1){
                $(item).find(".cm-checkbox-box").remove();
                $(item).find(".cm-btn").remove();
            }
        })
    },
    FORM_FORMAT_CHANGE: function(params){
        return params;
    },
    CHECK_INSERT_INFO: function(param=null){},
    CHECK_UPDATE_INFO: function(form, param=null){},
    DELETE_ALL: function(deleteList = [], text=null){
        const parameter = {
            'targetOrganizationCode': $(`#select-box-for-organization .select-item`).val(),
            'serialNumberList': []
        }
        $("#contents-by-data-table").find(".input[type='checkbox']").each(function (index , items) {
            if($(items).is(":checked") === true) {
                parameter.serialNumberList.push($(items).parents(".cm-tr").attr(`data-serial-number`));
            }
        });
        if (parameter.serialNumberList.length <= 0) {
            custom.etc.customToastForError(`삭제하려는 디바이스를 선택하세요!`);
            return;
        }
        return {parameter : parameter};
    },
    DELETE_ONE: function(parent=null){
        let parameter = parent.data('serial-number');
        return {parameter};
    },
    INDEX_FUNCTION: function(passingParams= {}){
        if ($(`input[name="targetOrganizationCode"]`).val() === `all`) {
            $(`.btn-all-delete`).css(`display`, `none`);
        }

        // 대량 등록 버튼 클릭
        CUSTOM.EVENT.HTML.push(`.btn-add-for-bulk`);
        $(`.btn-add-for-bulk`).off("click").on("click", function() {
            etc.move(`/device/dynamic?sub=add-bulk`);
        })

        let moveForSelectBox = `
            <div style="display: flex; gap: 5px;">
                <div class="select-box-parent-for-organization-on-move"></div>
                <div class="select-box-parent-for-ward-on-move"></div>
            </div>
        `;

        CUSTOM.EVENT.HTML.push(`.btn-move-for-choice`);
        $(".btn-move-for-choice").off("click").on("click", function (e) {
            etc.stopBubbling(e);

            const _selectBoxCallbackForMove = function (choiceBox) {
                let selectObj = $(choiceBox).parents(".cm-select-box");
                selectObj.children(".select-item").val($(choiceBox).attr(`data-code`));
                if ($(choiceBox).attr(`data-type`) === `organ`) {
                    _selectBoxWardForMove($(choiceBox).attr(`data-code`));
                }
            }
            const _selectBoxWardForMove = function(organizationCode = null) {
                const selectBoxId = `move-for-ward-select-box`;
                const searchAllInfo = {
                    code: `all`,
                    title: `병동선택`
                };
                let _t =  GBL.CONSTANTS.get(`WARDS_${organizationCode}`);
                if (_t === null && organizationCode !== `all`) {
                    _t = WARD_UTIL.LIST(false, false, `list`, true, true, {'organizationCode': organizationCode});
                    GBL.CONSTANTS.set(`WARDS_${organizationCode}`, _t);
                }
                let selectBoxHTML = "";
                if (searchAllInfo !== null) {
                    selectBoxHTML += `<li class="option-item" data-type="ward" data-code="${searchAllInfo.code}">${searchAllInfo.title}</li>`;
                    $(`#${selectBoxId}`).find(`.select-item`).val(searchAllInfo.code);
                    $(`#${selectBoxId}`).find(`.select-item`).attr(`data-not-parsing-value`, searchAllInfo.code);
                    $(`#${selectBoxId}`).find(`.label`).text(searchAllInfo.title);
                }
                if (_t !== null && _t !== undefined) {
                    if (Object.keys(_t).length > 0) {
                        for (let i = 0; i < Object.keys(_t).length; i++) {
                            selectBoxHTML += `<li class="option-item" data-type="ward" data-code="${Object.values(_t)[i].wardCode}">${Object.values(_t)[i].ward}</li>`;
                        }
                    }
                }
                $(`#${selectBoxId}`).children(".option-list").html(selectBoxHTML);
                setTimeout(function() {
                    SELECT_BOX_EVENT.ON_CLICK(`.cm-select-box.move`, `.cm-select-box.move .option-list`, `.cm-select-box.move .option-item`, `.label`, `selected`, _selectBoxCallbackForMove);
                }, 10);
            }

            const parameter = {
                'targetOrganizationCode': null,
                'wardCode': null,
                'serialNumberList': []
            }
            $("#contents-by-data-table").find(".input[type='checkbox']").each(function (index , items) {
                if($(items).is(":checked") === true) {
                    parameter.serialNumberList.push($(items).parents(".cm-tr").attr(`data-serial-number`));
                }
            });
            if (parameter.serialNumberList.length <= 0) {
                custom.etc.customToastForError(`이동하려는 디바이스를 선택하세요!`);
                return;
            }

            const modalId = "customAlertForDeviceMove";
            const okBtnCallback = function () {
                if (String.isNullOrWhitespace($(`#select-box-for-organization-on-move`).find(`.select-item`).val()) === true || $(`#select-box-for-organization-on-move`).find(`.select-item`).val() === `all`) {
                    custom.etc.customToastForError(`이동하려는 기관을 선택하세요!`);
                    return false;
                }
                if (String.isNullOrWhitespace($(`#select-box-for-ward-on-move`).find(`.select-item`).val()) === true || $(`#select-box-for-ward-on-move`).find(`.select-item`).val() === `all`) {
                    custom.etc.customToastForError(`이동하려는 기관의 병동을 선택하세요!`);
                    return false;
                }
                parameter.targetOrganizationCode = $(`#select-box-for-organization-on-move .select-item`).val();
                parameter.wardCode = $(`#select-box-for-ward-on-move .select-item`).val();
                const _r = DEVICE_UTIL.UPDATE_ALL(parameter);
                if (_r.result === true) {
                    custom.etc.customToastForColor(`정상적으로 이동했습니다.`)
                }
                else {
                    custom.etc.customToastForError(`이동에 실패했습니다. 잠시 후 다시 시도하세요.`)
                }
                modal.globalClose(modalId);
                passingParams.searchFunction('search', passingParams);
            }

            const cancelBtnCallback = function () {
                modal.globalClose(modalId);
            }

            let initParameter = {
                msg: moveForSelectBox,
                id: modalId,
                isBackgroundClickForClose: false,
                button: {
                    cancel: {
                        callback :[{ name: cancelBtnCallback, params: [] }]
                    },
                    ok : {
                        callback :[{ name: okBtnCallback, params: [] }]
                    },
                    del: {
                        isUse: false
                    }
                },
                modalEventCallback: [{
                    name: CONST.USING_SELECT_BOX,
                    params: ['index', '-on-move']
                }]
            }
            Seers.Loader.moduleLoad("custom-alert", "index", initParameter);
        });
    },
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
    DYNAMIC_FUNCTION: function(passingParams = {}){
        const _serialBulkAdd = function(serialNumber, selector = `.device-bulk-serial-number-text`, parentSelector = `.device-bulk-info-parent`) {
            let form = etc.formParser("form-data");
            form.serialNumber = serialNumber;
            let parameter = CONST.etcInsertDeviceFunction(form);
            if (parameter.result === true) {
                etc.setHtmlParsing($(parentSelector), addForBulkUnitHtml, {...parameter.passingParams});
                $(selector).val(``);
                CUSTOM.EVENT.HTML.push(`.device-bulk-del-btn`);
                $(`.device-bulk-del-btn`).off(`click`).on(`click`, function (e) {
                    etc.stopBubbling(e);
                    $(this).parent().remove();
                });
            }
            $(selector).focus();
        }

        CUSTOM.EVENT.HTML.push(`.device-bulk-serial-number-add-button`);
        $(`.device-bulk-serial-number-add-button`).off(`click`).on(`click`, function (e) {
            etc.stopBubbling(e);
            _serialBulkAdd($(`.device-bulk-serial-number-text`).val());
        });

        CUSTOM.EVENT.HTML.push(`.device-bulk-excel-add-button`);
        $(`.device-bulk-excel-add-button`).off(`click`).on(`click`, function (e) {
            etc.stopBubbling(e);
            $('#excel-file-upload').click();
        });
        CUSTOM.EVENT.HTML.push(`.excel-file-upload`);
        $('#excel-file-upload').off(`change`).on(`change`, async function (e) {
            const file = e.target.files[0];
            if (etc.whatIsFileType(file) !== `excel`) {
                custom.etc.customToastForError(`엑셀 파일이 아닙니다.(2007이후 버전만 허용)`);
                return;
            }
            else {
                $(`.device-bulk-excel-add-button`).find(`span`).text(`처리중....`);
                custom.etc.excelImport(file, function(datas) {
                    for (let i = 0; i < datas.length; i++) {
                        _serialBulkAdd(datas[i].column1);
                    }
                    $(`.device-bulk-excel-add-button`).find(`span`).text(`엑셀파일`);
                });
            }
        });

        let addForBulkUnitHtml = `
            <div class="device-bulk-info-list" data-serial-number="{{serialNumber}}" data-device-type="{{deviceType}}" data-mac-address="{{macAddress}}" data-device-code="">
            <span class="device-bulk-serial-number">{{serialNumber}}</span>
            <div class="device-bulk-del-btn"><span class="img"></span></div>
            </div>`
        ;
    },
    INDEX_SUB_FUNCTION: function(passingParams= {}){},
    ADD_CONFIRM_INSERT_FUNCTION: function(form, pageName = null){
        let _t;
        if(pageName !== 'dynamic'){
            if(CONST.etcInsertDeviceFunction(form).result === true){
                let param = CONST.etcInsertDeviceFunction(form).passingParams;
                const params = {
                    "targetOrganizationCode": param[`targetOrganizationCode`],
                    "deviceCode": param[`deviceCode`],
                    "wardCode": param[`wardCode`],
                    "serialNumber": param[`serialNumber`],
                    "deviceType": param.deviceType,
                    "macAddress": param.macAddress,
                    "etc" : param[`etc`],
                }
                _t = DEVICE_UTIL.INSERT(params);
                if (_t.result === true) {
                    let processEnd = function(mode = `list`) { //list, add
                        if (mode === `list`) {
                            etc.move(`/device/index`);
                        }
                        else {
                            location.reload();
                        }
                    }
                    let modalId = "customAlertForPushAdd";
                    let initParameter = {
                        msg: `<p class="customAlertText">등록이 완료됐습니다.</p>`,
                        id: modalId,
                        isBackgroundClickForClose: false,
                        button: {
                            ok: {
                                callback: [
                                    {
                                        name: processEnd,
                                        params: ['list']
                                    },
                                    {
                                        name: modal.globalClose,
                                        params: [modalId]
                                    }
                                ]
                            },
                            del: {
                                isUse: false
                            },
                            cancel: {
                                isUse: false
                            }
                        }
                    }
                    Seers.Loader.moduleLoad(`custom-alert`, `index`, initParameter);
                }
                else{
                    custom.etc.customToastForColor(`등록에 실패하였습니다.`, `bgRed`);
                    etc.isFormSubmit("form-data", "end");
                }
            }
        }
        else{
            let _l = new Array();
            $(`.device-bulk-info-list`).each(function(index, item) {
                _l.push({
                    "deviceCode": String.isNullOrWhitespace($(item).attr(`data-device-code`)) === true ? null : $(item).attr(`data-device-code`),
                    "serialNumber": $(item).attr(`data-serial-number`),
                    "deviceType": $(item).attr(`data-device-type`),
                    "macAddress": $(item).attr(`data-mac-address`)
                })
            });
            const params = {
                "targetOrganizationCode": form[`targetOrganizationCode`],
                "wardCode": form[`wardCode`],
                "deviceInfoList": _l,
            }
            if(CONST.etcInsertDeviceFunction(params, pageName).result === true){
                _t = DEVICE_UTIL.INSERT_BULK(params);
                if (_t.result === true) {
                    let processEnd = function(mode = `list`) { //list, add
                        if (mode === `list`) {
                            etc.move(`/device/index`);
                        }
                        else {
                            location.reload();
                        }
                    }
                    let modalId = "customAlertForPushAdd";
                    let initParameter = {
                        msg: `<p class="customAlertText">등록이 완료됐습니다.</p>`,
                        id: modalId,
                        isBackgroundClickForClose: false,
                        button: {
                            ok: {
                                callback: [
                                    {
                                        name: processEnd,
                                        params: ['list']
                                    },
                                    {
                                        name: modal.globalClose,
                                        params: [modalId]
                                    }
                                ]
                            },
                            del: {
                                isUse: false
                            },
                            cancel: {
                                isUse: false
                            }
                        }
                    }
                    Seers.Loader.moduleLoad(`custom-alert`, `index`, initParameter);
                }
                else{
                    custom.etc.customToastForColor(`등록에 실패하였습니다.`, `bgRed`);
                    etc.isFormSubmit("form-data", "end");
                }
            }
        }
    },
    etcInsertDeviceFunction: function(form, pageName = null) {
        if(!form){
            return false;
        }
        let msg = "";
        let _serialCheckResult = null;
        if(pageName === 'dynamic'){
            if ($(`.device-bulk-info-list`).length <= 0) {
                msg = `시리얼번호를 입력하세요!`;
            }
        }
        else{
            _serialCheckResult = DEVICE_UTIL.DEVICE_SERIAL_CHECK(form['serialNumber']);
            let searchParams = {
                search: form.serialNumber,
                pageNumber: 1,
                count: 999
            }

            if (form !== null) {
                for (let key in form) {
                    _serialCheckResult[key] = form[key]
                }
            }
            if (_serialCheckResult.result ===  false) {
                msg = _serialCheckResult.msg;
            }
            let _tPage = DEVICE_UTIL.PAGE(searchParams);
            if (_tPage.result === true && _tPage.deviceRegisterList !== null && _tPage.deviceRegisterList.length > 0) {
                if(form['serialNumber'] !== ""){
                    msg = `${GBL.CONSTANTS.get(`PARSING_ORGANIZATIONS`)[_tPage.deviceRegisterList[0].organizationCode]} 기관에 등록된 시리얼번호입니다.`;
                }
            }
        }

        if(msg === ""){
            let parameter = {
                result: true,
                passingParams: _serialCheckResult
            }
            return parameter;
        }
        else {
            custom.etc.customToastForColor(msg, `bgRed`);
            etc.isFormSubmit("form-data", "end");
            let parameter = {
                result: false,
            }
            return parameter;
        }
    },
};