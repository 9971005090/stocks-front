"use strict";

const {UTIL: ORGAN_UTIL} = await import(`/js/custom/constant/organ/util.js${ver_string}`);
const {CONST: ORGAN_CONST} = await import(`/js/custom/constant/organ/constant.js${ver_string}`);
const {EVENT: SELECT_BOX_EVENT, UTIL: SELECT_BOX_UTIL} = await import(`/js/custom/constant/event/select-box.js${ver_string}`);

export const CONST = {
    UTIL: {
        API_UTIL: ORGAN_UTIL,
        API_CONST: ORGAN_CONST,
        SEARCH_LIST: "organizationList",
        API_SELECT_CONST: "organization",
        API_SELECT_PAGE: "PAGE",
        DELETE_ALL_API: "UPDATE_EXPIRATION_LIST",
        DELETE_API: "UPDATE_EXPIRATION_LIST",
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
        PAGE_CODE : `data-code`,
    },
    SEARCH_BUTTONS: [
        {
            NAME: `등록`,
            ADD_CLASS: `btn-black btn-add`,
        },
        {
            NAME: `선택 비활성화`,
            ADD_CLASS: `cm-btn-n-default btn-all-delete`,
        }
    ],
    FORM_DATA: {
        COLUMN: [
            {
                VIEW: {
                    TITLE: `활성화 여부`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: true,
                    IS_ADD: false,
                    IS_UPDATE: false,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `expiration`,
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
                            TITLE: `활성화`,
                            VALUE: 0,
                        },
                        {
                            TITLE: `비활성화`,
                            VALUE: 1,
                        },
                    ],
                    STYLE: null,
                    NAME: `expiration`,
                    PLACEHOLDER: '활성화 여부',
                    IS_DISABLED: false,
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
                    PLACEHOLDER: `이름을 입력해 주세요.`,
                    IS_DISABLED: true,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `코드`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `organizationCode`,
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
                    NAME: `organizationCode`,
                    PLACEHOLDER: '기관 고유 코드를 입력해주세요.',
                    IS_DISABLED: true,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `이름`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `organizationName`,
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
                    NAME: `organizationName`,
                    PLACEHOLDER: '이름을 입력해주세요.',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `HIS 연동`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `syncHis`,
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
                            TITLE: `미연동`,
                            VALUE: 0,
                        },
                        {
                            TITLE: `연동`,
                            VALUE: 1,
                        },
                    ],
                    STYLE: null,
                    NAME: `syncHis`,
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
                    TITLE: `장치관리 구분`, // th text
                    TYPE: `text`, // 타입
                    STYLE: null, // 추가 style
                    ACTIVE: true, // 필수입력
                    IS_INDEX: false, // 검색 유무
                    IS_ADD: true, // add 유무
                    IS_UPDATE: true, // update 유무
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `deviceManagerType`,
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
                            TITLE: `SEERS 관리`,
                            VALUE: 0,
                        },
                        {
                            TITLE: `병원 관리`,
                            VALUE: 1,
                        },
                    ],
                    STYLE: null,
                    NAME: `deviceManagerType`,
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
                    TITLE: `측정 기간`, // th text
                    TYPE: `text`, // 타입
                    STYLE: null, // 추가 style
                    ACTIVE: false, // 필수입력
                    IS_INDEX: false, // 검색 유무
                    IS_ADD: true, // add 유무
                    IS_UPDATE: true, // update 유무
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `measurementDate`,
                    TYPE: `text`,
                    SEARCH_BTN: false,
                    IS_CHECK: true,
                    LIMIT: {
                        MIN: 1,
                        MAX: 365,
                        MINLENGTH: null,
                        MAXLENGTH: null,
                    },
                    CUSTOM_ADD_CLASS: `use-option`,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `measurementDate`,
                    PLACEHOLDER: '미 입력 시 측정 기간은 15일로 처리됩니다',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `비식별화`, // th text
                    TYPE: `text`, // 타입
                    STYLE: null, // 추가 style
                    ACTIVE: false, // 필수입력
                    IS_INDEX: false, // 검색 유무
                    IS_ADD: true, // add 유무
                    IS_UPDATE: true, // update 유무
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `hideName`,
                    TYPE: `radio-box`,
                    SEARCH_BTN: false,
                    IS_CHECK: false,
                    LIMIT: {
                        MIN: 1,
                        MAX: 365,
                        MINLENGTH: null,
                        MAXLENGTH: null,
                    },
                    CUSTOM_ADD_CLASS: `use-option`,
                    RADIO_CONT: [
                        // {
                        //     TITLE: `첫번째`,
                        //     VALUE: 0,
                        // },
                        {
                            TITLE: `가운데`,
                            VALUE: 1,
                        },
                        {
                            TITLE: `마지막`,
                            VALUE: 2,
                        },
                    ],
                    STYLE: null,
                    NAME: `hideName`,
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
                    TITLE: `담당자 이메일`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: false,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: false,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `systemManager`,
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
                    NAME: `systemManager`,
                    PLACEHOLDER: '시스템 담당자의 E-Mail 주소를 입력해주세요.',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            /*{
                VIEW: {
                    TITLE: `기관 연락처`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: false,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: false,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `phoneNumber`,
                    TYPE: `text`,
                    IS_CHECK: true,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: 16,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: null,
                    NAME: `phoneNumber`,
                    PLACEHOLDER: '기관 연락처를 입력해주세요.',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },*/
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
                        WIDTH : `5%`
                    },
                    CHECKBOX_TYPE: `all`,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `코드`,
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
                            name: `이름`,
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
                            name: `HIS 연동여부`,
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
                            name: `장치관리`,
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
                            name: `담당자이메일`,
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
                /*{
                    TITLE: `기관 연락처`,
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `10%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },*/
                {
                    TITLE: [
                        {
                            name: `비고`,
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
                    DATA_PARSING: `organizationId`
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
                    DATA_ID: `organizationId`,
                },
                {
                    TITLE: [
                        {
                            name: `코드`,
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
                    DATA_ID: `organizationId`,
                },
                {
                    TITLE: [
                        {
                            name: `이름`,
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
                            key: `organizationName`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `HIS 연동여부`,
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
                            key: `syncHis`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `장치관리`,
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
                            key: `deviceManagerType`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `담당자이메일`,
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
                            key: `systemManager`,
                        },
                    ],
                    DATA_ID: ``,
                },
                /*{
                    TITLE: `기관 연락처`,
                    TYPE: `text`,
                    STYLE: {
                        TD_STYLE: null,
                        DIV_STYLE: null,
                    },
                    CHECKBOX_TYPE: `list`,
                    ADD_CLASS: null,
                    DATA_PARSING: `phoneNumber`,
                    DATA_ID: ``,
                },*/
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
        params[`hideName`] = Number(params[`hideName`]);
        if(params[`measurementDate`]) {
            params[`measurementDate`] = Number(params[`measurementDate`]);
        }
        else{
            params[`measurementDate`] = 15;
        }
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
        else if(param.measurementDate > 365){
            msg = "측정 기간은 1일부터 365일까지입니다. 다시 확인해주세요."
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
        form[`hideName`] = Number(form[`hideName`]);
        if(form[`measurementDate`]) {
            form[`measurementDate`] = Number(form[`measurementDate`]);
        }
        else{
            form[`measurementDate`] = 15;
        }

        let msg = "";
        if(form[`measurementDate`] > 365){
            msg = "측정 기간은 1일부터 365일까지입니다. 다시 확인해주세요."
        }
        if(msg !== ""){
            custom.etc.customToastForColor(msg, `bgRed`);
            etc.isFormSubmit("form-data", "end");
            return false;
        }

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
    ADD_FUNCTION: function(passingParams= {}){
        $("input[name='measurementDate']").off('input').on('input',function(e){
            let inputValue = $(this).val();
            const regexNumber = /[^0-9]/g;
            const regexKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
            let inputNumber = inputValue.replace(regexNumber, "");
            let exceptKorean = inputNumber.replace(regexKorean, '');
            let regResult = exceptKorean.replace(/^0+/, ''); // 시작 0 제외
            $(this).val(regResult);
        });

        // 기관코드 영문입력만 되게
        $(`input[name="organizationCode"]`).off('input').on("input",function(e){
            let inputValue = $(this).val();
            let reg = /[^a-zA-Z0-9\-\_]/g; // 영어,숫자,특수문자(-_) 포함
            // let reg = /[^a-zA-Z0-9@*&=+\-\_\.\,/]/g; // 영어,숫자,특수문자(@*&=+-_.,/) 포함
            let regResult = inputValue.replace(reg, "");
            $(this).val(regResult);
        })

    },
    UPDATE_FUNCTION: function(passingParams= {}){
        $("input[name='measurementDate']").off('input').on('input',function(e){
            let inputValue = $(this).val();
            const regexNumber = /[^0-9]/g;
            const regexKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
            let inputNumber = inputValue.replace(regexNumber, "");
            let exceptKorean = inputNumber.replace(regexKorean, '');
            let regResult = exceptKorean.replace(/^0+/, ''); // 시작 0 제외
            $(this).val(regResult);
        });
    },
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