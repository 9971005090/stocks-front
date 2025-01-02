"use strict";

const {UTIL: GATEWAY_UTIL} = await import(`/js/custom/constant/gateway/util.js${ver_string}`);
const {CONST: GATEWAY_CONST} = await import(`/js/custom/constant/gateway/constant.js${ver_string}`)
const {UTIL: ORGAN_UTIL} = await import(`/js/custom/constant/organ/util.js${ver_string}`);
const {EVENT: SELECT_BOX_EVENT, UTIL: SELECT_BOX_UTIL} = await import(`/js/custom/constant/event/select-box.js${ver_string}`);

export const CONST = {
    UTIL: {
        API_UTIL: GATEWAY_UTIL,
        API_CONST: GATEWAY_CONST,
        SEARCH_LIST: "gatewayInfoList",
        API_SELECT_CONST: "gatewayInfo",
        API_SELECT_PAGE: "PAGE",
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
                    DATA_PARSING: [
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
                    ADD_CLASS: `td-num`,
                    DATA_PARSING: [
                        {
                            name: ``,
                            key: `virtualNumber`,
                        },
                    ],
                    DATA_ID: `virtualNumber`,
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
                    DATA_PARSING:  [
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
                    DATA_PARSING:  [
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
    selectBoxCallback: function (choiceBox) {
        let selectObj = $(choiceBox).parents(".cm-select-box");
        selectObj.children(".select-item").val($(choiceBox).attr(`data-code`));
        selectObj.children(".select-item").trigger("keyup");
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
    USING_SELECT_BOX: function(type='index'){
        CONST.constantsSet();
        let parsingOrganizationCode;
        if(type === 'index'){
            parsingOrganizationCode = `searchOrganizationCode`
        }
        else {
            parsingOrganizationCode = `organizationCode`;
        }
        SELECT_BOX_UTIL.MAKE({
            type: `organ`,
            datas: GBL.CONSTANTS.get(`ORGANIZATION_DATAS`),
            all: {code: `all`, title: `기관선택`, isUse: false},
            default: null,
            attr: {
                name: parsingOrganizationCode,
                'add-class': [`use-option`, `check`, `active-check`]
            },
            replace : false,
            addParam: null,
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
    SEARCH_ETC: function(){},
    FORM_FORMAT_CHANGE: function(params){
        params[`axisX`] = Number(params[`axisX`]);
        params[`axisY`] = Number(params[`axisY`]);
        return params;
    },
    CHECK_INSERT_INFO: function(param=null){
        if(!param){
            return false;
        }
        let msg = "";
        const _checkValidSerialNumber = GATEWAY_UTIL.SELECT(param.serialNumber);
        const _checkValidMacAddress = GATEWAY_UTIL.LIST({'search':param.macAddress});
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

        const _t = GATEWAY_UTIL.UPDATE(form);
        if (_t.result !== true) {
            custom.etc.customToastForError("정보 수정에 실패하였습니다.");
        }
        else {
            return true;
        }
    },
    DELETE_ALL: function(deleteList = [], text=null){
        $("#contents-by-data-table").find(".input[type='checkbox']").each(function (index , items) {
            if($(items).is(":checked")){
                deleteList.push($(items).parents(".cm-tr").data("serialnumber"));
            }
        });
        return {parameter : deleteList};
    },
    DELETE_ONE: function(parent=null){
        let parameter = parent.data('serialnumber');
        return {parameter};
    },
    INDEX_FUNCTION: function(passingParams= {}){
        $(".sub-cont-title").append(`<span class="ml-4 d-inline-flex font-size-10">(<b id="content-by-last-update"></b>)</span>`);

        // 새로고침 버튼.
        CUSTOM.EVENT.HTML.push(`.btn-refresh`);
        $(".btn-refresh").off("click").on("click", function (e) {
            etc.stopBubbling(e);
            passingParams.searchFunction("search", passingParams);
        });

        // 자동 새로고침
        GBL.CONSTANTS.set(`REFRESH`, new Refresh({
            '#type': `timeout`, // timeout, interval
            '#mode': `real`, // real, test
            '#testTerm': 2 * 1000, // 2초
            '#callback': {
                func: passingParams.searchFunction,
                params: [`search`, passingParams]
            }
        }), true);
    },
    VARIABLE_PAGE_FUNCTION: function(passingParams = {}){},
    VARIABLE_SUB_FUNCTION: function(passingParams = {}){},
    ADD_FUNCTION: function(passingParams= {}){},
    UPDATE_FUNCTION: function(passingParams= {}){},
    SEARCH_FUNCTION: function(passingParams= {}){
        // 자동 새로고침
        if (GBL.CONSTANTS.has(`REFRESH`) === true) {
            GBL.CONSTANTS.get(`REFRESH`).run();
        }
        $(`#content-by-last-update`).text(new Date().toString('yyyy-MM-dd HH:mm:ss'));
    },
    SEARCH_PARAM_FUNCTION: function(passingParams= {}){},
    VARIABLE_SEARCH_PARAM_FUNCTION: function(passingParams= {}){},
    SEARCH_PARAM_OK_FUNCTION: function(passingParams= {}){
        return true;
    },
    DYNAMIC_FUNCTION: function(passingParams = {}){},
    INDEX_SUB_FUNCTION: function(passingParams= {}){},
    ADD_CONFIRM_INSERT_FUNCTION: function(){},
};