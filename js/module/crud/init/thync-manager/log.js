"use strict";

const {UTIL: LOG_UTIL} = await import(`/js/custom/constant/log/util.js${ver_string}`);
const {CONST: LOG_CONST} = await import(`/js/custom/constant/organ/constant.js${ver_string}`);
const {EVENT: SELECT_BOX_EVENT, UTIL: SELECT_BOX_UTIL} = await import(`/js/custom/constant/event/select-box.js${ver_string}`);

export const CONST = {
    UTIL: {
        API_UTIL: LOG_UTIL,
        API_CONST: LOG_CONST,
        SEARCH_LIST: "dataLogList",
        API_SELECT_CONST: "",
        API_SELECT_PAGE: "PAGE",
        DELETE_ALL_API: "",
        DELETE_API: "",
        INSERT_API: "",
        SELECT_API: "",
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
        PAGE_CODE : ``,
    },
    SEARCH_BUTTONS: [],
    FORM_DATA: {
        COLUMN: [
            {
                VIEW: {
                    TITLE: `에러 종류`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: false,
                    IS_INDEX: true,
                    IS_ADD: false,
                    IS_UPDATE: false,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `errorType`,
                    TYPE: `radio-box`,
                    SEARCH_BTN: true,
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
                            TITLE: `예상한 에러`,
                            VALUE: 0,
                        },
                        {
                            TITLE: `예상하지 못한 에러`,
                            VALUE: 1,
                        },
                    ],
                    STYLE: null,
                    NAME: `errorType`,
                    PLACEHOLDER: '활성화 여부',
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
                            name: `dateTime`,
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
                {
                    TITLE: [
                        {
                            name: `method`,
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
                            name: `logLevel`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `6%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `errorCode`,
                            key: ``,
                        },
                        {
                            name: `errorCodeDescription`,
                            key: ``,
                        },
                        {
                            name: `errorCodeDescriptionKor`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `12%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `errorMsg`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `60%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
            ],
        },
        BODY: {
            DATA_PARSE: [],
            COLUMN: [
                {
                    TITLE: [
                        {
                            name: `dateTime`,
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
                            name: `method`,
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
                            key: `method`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `logLevel`,
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
                            key: `logLevel`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `errorCode`,
                            key: ``,
                        },
                        {
                            name: `errorCodeDescription`,
                            key: ``,
                        },
                        {
                            name: `errorCodeDescriptionKor`,
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
                            key: `errorCode`,
                        },
                        {
                            name: ``,
                            key: `errorCodeDescription`,
                        },
                        {
                            name: ``,
                            key: `errorCodeDescriptionKor`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `errorMsg`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        TD_STYLE: null,
                        DIV_STYLE: null,
                    },
                    CHECKBOX_TYPE: `list`,
                    ADD_CLASS: `text-left`,
                    DATA_PARSING: [
                        {
                            name: ``,
                            key: `errorMsg`,
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
    USING_SELECT_BOX: function(type='index'){},
    SEARCH_ETC: function(){
        if(Number($(`.radio-input[name="expiration"]:checked`).val()) === 0){
            $(".btn-delete").text("비활성화").removeClass("btn-restore");
            $(".btn-all-delete").text("선택 비활성화").removeClass("btn-all-restore");
        } else{
            $(".btn-delete").text("활성화").addClass("btn-restore");
            $(".btn-all-delete").text("선택 활성화").addClass("btn-all-restore");
        }
    },
    FORM_FORMAT_CHANGE: function(params){
        params[`syncHis`] = Number(params[`syncHis`]);
        params[`deviceManagerType`] = Number(params[`deviceManagerType`]);
        return params;
    },
    CHECK_INSERT_INFO: function(param=null){
        if(!param){
            return false;
        }
        let msg = "";
        const _checkValidCode = ORGAN_UTIL.SELECT(param.organizationCode);
        let emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

        if(param.systemManager){
            if(!param.systemManager.match(emailCheck)){
                msg = "이메일을 확인해주세요.";
            }
        }
        else if(_checkValidCode.organization !== null){
            msg = "코드가 중복됩니다. 다른 코드를 사용해주세요.";
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
        form[`syncHis`] = Number(form[`syncHis`]);
        form[`deviceManagerType`] = Number(form[`deviceManagerType`]);

        const _t = ORGAN_UTIL.UPDATE(form);
        if (_t === undefined) {
            custom.etc.customToastForError("정보 수정에 실패하였습니다.");
        }
        else {
            return true
        }
    },
    DELETE_ALL: function(deleteList = [], text=null){
        $("#contents-by-data-table").find(".input[type='checkbox']").each(function (index , items) {
            if($(items).is(":checked")){
                deleteList.push($(items).parents(".cm-tr").data("code"));
            }
        });
        let parameter={
            'organizationCodeList': deleteList,
        }
        if(Number($(`.radio-input[name="expiration"]:checked`).val()) === 0){
            parameter["expiration"] = 1
            text = "비활성화";
        }
        else {
            parameter['expiration'] = 0
            text = "활성화";
        }
        return {parameter, text}
    },
    DELETE_ONE: function(parent=null){
        let deleteList = [];
        deleteList.push(parent.data('code'));
        let parameter={
            'organizationCodeList': deleteList,
        }
        let text;
        if(Number($(`.radio-input[name="expiration"]:checked`).val()) === 0){
            parameter["expiration"] = 1
            text = "비활성화";
        }
        else {
            parameter['expiration'] = 0
            text = "활성화";
        }
        return {parameter, text}
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
    INDEX_SUB_FUNCTION: function(passingParams= {}){},
    ADD_CONFIRM_INSERT_FUNCTION: function(){},
};