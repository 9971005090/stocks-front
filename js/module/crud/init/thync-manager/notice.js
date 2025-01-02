"use strict";

const {UTIL: NOTICE_UTIL} = await import(`/js/custom/constant/notice/util.js${ver_string}`);
const {CONST: NOTICE_CONST} = await import(`/js/custom/constant/notice/constant.js${ver_string}`);
const {EVENT: SELECT_BOX_EVENT, UTIL: SELECT_BOX_UTIL} = await import(`/js/custom/constant/event/select-box.js${ver_string}`);
const {UTIL: ORGAN_UTIL} = await import(`/js/custom/constant/organ/util.js${ver_string}`);

export const CONST = {
    UTIL: {
        API_UTIL: NOTICE_UTIL,
        API_CONST: NOTICE_CONST,
        SEARCH_LIST: "noticeSimpleList",
        API_SELECT_CONST: "notice",
        API_SELECT_PAGE: "SELECT_SIMPLE_PAGE",
        DELETE_ALL_API: "DELETE",
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
        PAGE_CODE : `data-code`,
    },
    SEARCH_BUTTONS: [
        {
            NAME: `등록`,
            ADD_CLASS: `btn-black btn-add`,
        },
    ],
    FORM_DATA: {
        COLUMN: [
            {
                VIEW: {
                    TITLE: `공지타입`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: true,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `targetType`,
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
                            TITLE: `전체 기관 공지`,
                            VALUE: 0,
                        },
                        {
                            TITLE: `특정 기관 공지`,
                            VALUE: 1,
                        },
                    ],
                    STYLE: null,
                    NAME: `targetType`,
                    PLACEHOLDER: '활성화 여부',
                    IS_DISABLED: true,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `공지 대상 기관 코드`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: false,
                    IS_INDEX: true,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
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
                    OTHER_NAME_CHECK: true,
                    OTHER_NAME: `organizationCode`,
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
                    PLACEHOLDER: `제목을 입력해 주세요.`,
                    IS_DISABLED: true,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `공지 시작 시간`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `calendar`,
                    TYPE: `calendar`,
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
                    NAME: `noticeStartDateTime`,
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
                    TITLE: `공지 종료 시간`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `calendar`,
                    TYPE: `calendar`,
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
                    NAME: `noticeEndDateTime`,
                    PLACEHOLDER: '내용을 입력해주세요.',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `제목`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `title`,
                    TYPE: `text`,
                    SEARCH_BTN: false,
                    IS_CHECK: true,
                    LIMIT: {
                        MIN: null,
                        MAX: null,
                        MINLENGTH: null,
                        MAXLENGTH: 50,
                    },
                    CUSTOM_ADD_CLASS: ``,
                    RADIO_CONT: null,
                    STYLE: ``,
                    NAME: `title`,
                    PLACEHOLDER: '제목을 입력해주세요.',
                    IS_DISABLED: false,
                    OTHER_NAME_CHECK: false,
                    OTHER_NAME: ``,
                    IS_CUSTOM_HTML: false,
                    CUSTOM_HTML: null,
                },
            },
            {
                VIEW: {
                    TITLE: `내용`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: false,
                    IS_ADD: true,
                    IS_UPDATE: true,
                    IS_DYNAMIC: false,
                },
                VALUE: {
                    COLUMN: `body`,
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
                    NAME: `body`,
                    PLACEHOLDER: '내용을 입력해주세요.',
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
                            name: `제목`,
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
                            name: `공지 시작 시간`,
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
                            name: `공지 종료 시간`,
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
                            name: `작성시간`,
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
                            name: `공지 타입`,
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
                            name: `공지 기관`,
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
                            name: `작성자`,
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
                    DATA_PARSING: `noticeId`
                },
                {
                    TYPE: `code`,
                    DATA_PARSING: `noticeCode`,
                },
            ],
            COLUMN: [
                {
                    TITLE: [
                        {
                            name: `제목`,
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
                            key: `title`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `공지 시작 시간`,
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
                            key: `noticeStartDateTime`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `공지 종료 시간`,
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
                            key: `noticeEndDateTime`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `작성시간`,
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
                            name: `공지 타입`,
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
                            key: `noticeLevel`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `공지 기관`,
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
                            name: `작성자`,
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
                            key: `recordUserName`,
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
    USING_SELECT_BOX: function(type='index'){
        CONST.constantsSet();
        if(type !== 'update'){
            SELECT_BOX_UTIL.MAKE({
                type: `type`,
                datas: GBL.CONSTANTS.get(`ORGANIZATION_DATAS`),
                all: {code: `all`, title: `기관선택`, isUse: false},
                default: null,
                attr: {
                    name: `targetOrganizationCode`,
                    'add-class': [`use-option`]
                }
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
        }
    },
    SEARCH_ETC: function(){},
    FORM_FORMAT_CHANGE: function(params){
        params[`targetType`] = Number(params[`targetType`]);
        return params;
    },
    CHECK_INSERT_INFO: function(param=null){
        if(!param){
            return false;
        }
        let msg = "";
        let startDateTime = new Date(param.noticeStartDateTime).getTime();
        let endDateTime = new Date(param.noticeEndDateTime).getTime();

        if(startDateTime > endDateTime){
            if(param.noticeEndDateTime === null){
                msg = `"공지 종료 시간"을 선택해주세요.`;
            }
            else {
                msg = `"공지 종료 시간"이 "공지 시작 시간"보다 빠릅니다. 공지시간을 다시 확인해주세요.`;
            }
        }
        else if(param.noticeStartDateTime === null || param.noticeEndDateTime === null){
            msg = `공지 시간을 선택해주세요.`
        }
        else if(param.targetType === 1 && param.targetOrganizationCode === 'all'){
            msg = `"기관 공지 타입"일 경우에 "공지 대상 기관 코드"를 선택해주세요.`
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
        form.noticeCode = param.code;
        form[`targetType`] = Number(form[`targetType`]);

        let msg = "";

        let startDateTime = new Date(form.noticeStartDateTime).getTime();
        let endDateTime = new Date(form.noticeEndDateTime).getTime();

        if(startDateTime > endDateTime){
            msg = `"공지 종료 시간"이 "공지 시작 시간"보다 빠릅니다. 공지시간을 다시 확인해주세요.`;
        }
        if(msg !== ""){
            custom.etc.customToastForColor(msg, `bgRed`);
            etc.isFormSubmit("form-data", "end");
            return false;
        }

        const _t = NOTICE_UTIL.UPDATE(form);
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
        return {parameter : deleteList};
    },
    DELETE_ONE: function(parent=null){
        let parameter = parent.data('code');
        return {parameter};
    },
    INDEX_FUNCTION: function(passingParams= {}){
        if($("#targetType0").is(":checked")){
            $(".select-box-label-for-organization.label").prop("disabled", true);
        }
        $('input[name="targetType"]').off(`change`).on(`change`, function (){
            if($("#targetType1").is(":checked")){
                $(".select-box-label-for-organization.label").prop("disabled", false);
            }
            else{
                $(".select-box-label-for-organization.label").prop("disabled", true);
            }
        });
    },
    ADD_FUNCTION: function(passingParams= {}){
        let nowDate = new Date();
        let pickerOptions = {
            controlType: 'select',
            dateFormat: 'yy-mm-dd', // 일 표시 형식
            timeFormat: 'HH:mm:ss',
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            monthNamesShort: ['1월.', '2월.', '3월.', '4월.', '5월.', '6월.', '7월.', '8월.', '9월.', '10월.', '11월.', '12월.'],
            monthNames: ['1월.', '2월.', '3월.', '4월.', '5월.', '6월.', '7월.', '8월.', '9월.', '10월.', '11월.', '12월.'],
            yearSuffix: `년`,
            showButtonPanel: false,
        }
        let endPickerOptions = {
            controlType: 'select',
            dateFormat: 'yy-mm-dd', // 일 표시 형식
            timeFormat: 'HH:mm:ss',
            yearRange: `2021:${nowDate.getFullYear()}`,
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            monthNamesShort: ['1월.', '2월.', '3월.', '4월.', '5월.', '6월.', '7월.', '8월.', '9월.', '10월.', '11월.', '12월.'],
            monthNames: ['1월.', '2월.', '3월.', '4월.', '5월.', '6월.', '7월.', '8월.', '9월.', '10월.', '11월.', '12월.'],
            yearSuffix: `년`,
            showButtonPanel: false,
        }
        $('.noticeStartDateTime').on('click', function() {
            $(`#noticeStartDateTime`).datetimepicker(pickerOptions).timepicker('show');
        });
        $('#noticeEndDateTime').on('click', function() {
            $(`#noticeEndDateTime`).datetimepicker(endPickerOptions).timepicker('show');
        });
    },
    UPDATE_FUNCTION: function(passingParams= {}){
        //현재 표시할 값 설정
        let nowDate = new Date();

        let pickerOptions = {
            controlType: 'select',
            dateFormat: 'yy-mm-dd', // 일 표시 형식
            timeFormat: 'HH:mm:ss',
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            monthNamesShort: ['1월.', '2월.', '3월.', '4월.', '5월.', '6월.', '7월.', '8월.', '9월.', '10월.', '11월.', '12월.'],
            monthNames: ['1월.', '2월.', '3월.', '4월.', '5월.', '6월.', '7월.', '8월.', '9월.', '10월.', '11월.', '12월.'],
            yearSuffix: `년`,
            showButtonPanel: false,
        }
        let endPickerOptions = {
            controlType: 'select',
            dateFormat: 'yy-mm-dd', // 일 표시 형식
            timeFormat: 'HH:mm:ss',
            yearRange: `2021:${nowDate.getFullYear()}`,
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            monthNamesShort: ['1월.', '2월.', '3월.', '4월.', '5월.', '6월.', '7월.', '8월.', '9월.', '10월.', '11월.', '12월.'],
            monthNames: ['1월.', '2월.', '3월.', '4월.', '5월.', '6월.', '7월.', '8월.', '9월.', '10월.', '11월.', '12월.'],
            yearSuffix: `년`,
            showButtonPanel: false,
        }
        $('.noticeStartDateTime').on('click', function() {
            $(`#noticeStartDateTime`).datetimepicker(pickerOptions).timepicker('show');
        });
        $('#noticeEndDateTime').on('click', function() {
            $(`#noticeEndDateTime`).datetimepicker(endPickerOptions).timepicker('show');
        });
    },
    SEARCH_FUNCTION: function(passingParams= {}){},
    SEARCH_PARAM_FUNCTION: function(passingParams= {}){
        passingParams[`targetType`] = Number(passingParams[`targetType`]);
        return passingParams;
    },
    VARIABLE_SEARCH_PARAM_FUNCTION: function(passingParams= {}){},
    SEARCH_PARAM_OK_FUNCTION: function(passingParams = {}){
        if(passingParams.targetType === 1 && passingParams.targetOrganizationCode === null){
            custom.etc.customToastForError("'공지 대상 기관 코드'를 선택 후 검색해주세요.");
            return false;
        }
        else{
            return true;
        }
    },
    DYNAMIC_FUNCTION: function(passingParams = {}){},
    INDEX_SUB_FUNCTION: function(passingParams = {}){},
    ADD_CONFIRM_INSERT_FUNCTION: function(){},
};