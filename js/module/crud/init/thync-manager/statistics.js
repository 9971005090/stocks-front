"use strict";

const {UTIL: STATISTICS_UTIL} = await import(`/js/custom/constant/statistics/util.js${ver_string}`);
const {CONST: STATISTICS_CONST} = await import(`/js/custom/constant/statistics/constant.js${ver_string}`);
const {EVENT: SELECT_BOX_EVENT, UTIL: SELECT_BOX_UTIL} = await import(`/js/custom/constant/event/select-box.js${ver_string}`);
const {EVENT: SEARCH_TERM_EVENT, UTIL: SEARCH_TERM_UTIL} = await import(`/js/custom/constant/event/search-term.js${ver_string}`);
const {UTIL: ORGAN_UTIL} = await import(`/js/custom/constant/organ/util.js${ver_string}`);
const {UTIL: WARD_UTIL} = await import(`/js/custom/constant/ward/util.js${ver_string}`);
const {UTIL: CHART_FOR_TREND_UTIL} = await import(`/js/custom/constant/statistics/chart-for-trend-use-chartjs.js${ver_string}`);

export const CONST = {
    UTIL: {
        API_UTIL: STATISTICS_UTIL,
        API_CONST: STATISTICS_CONST,
        SEARCH_LIST: "measurementPeriodCountList",
        API_SELECT_CONST: "",
        API_SELECT_PAGE: "LIST",
        DELETE_ALL_API: "",
        DELETE_API: "",
        INSERT_API: "",
        SELECT_API: "",
        CONFIRM_OTHER_FUNCTION: true,
        DYNAMIC_TITLE: `Search`,
        VARIABLE_PAGE: true,
        VARIABLE_PAGE_NAME: 'day',
        VARIABLE_SEARCH_LIST: "measurementOrgDayCountList",
        VARIABLE_API_SELECT_PAGE: "LIST_FOR_DAY",
        CUSTOM_CONSTANT_SET: true,
        CUSTOM_CONSTANT_SET_NAME: `TREND_DATAS`,
    },
    MOVE_PAGE_CODE:{
        PAGE_CODE : ``,
    },
    FORM_DATA: {
        COLUMN: [
            {
                VIEW: {
                    TITLE: `기관`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: false,
                    IS_INDEX: true,
                    IS_ADD: true,
                    IS_UPDATE: false,
                    IS_DYNAMIC: false,
                    IS_VARIABLE: false,
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
                    TITLE: `검색기간`,
                    TYPE: `text`,
                    STYLE: null,
                    ACTIVE: true,
                    IS_INDEX: true,
                    IS_ADD: false,
                    IS_UPDATE: false,
                    IS_DYNAMIC: false,
                    IS_VARIABLE: false,
                },
                VALUE: {
                    COLUMN: `searchDate`,
                    TYPE: ``,
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
                    IS_CUSTOM_HTML: true,
                    CUSTOM_HTML: `
                        <div class="tit">검색기간</div>
                        <div class="cont">
                            <div class="search-date-cont search-date-for-start-parent"></div>
                            ~
                            <div class="search-date-cont search-date-for-end-parent"></div>
                            
                            <div class="cm-device-search">
                                <button type="type" class="device-search-btn form-common-search-button">
                                    <span class="img"></span>
                                </button>
                            </div>
                        </div>
                    `,
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
                            name: `기관`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `28%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `총개수`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `18%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `검색기간 이전수`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `18%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `검색기간수`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `18%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
                {
                    TITLE: [
                        {
                            name: `검색기간 다음수`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `18%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
            ],
        },
        BODY: {
            DATA_PARSE: [
                {
                    TYPE: '',
                    DATA_PARSING: ``
                },
            ],
            COLUMN: [
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
                            name: `총개수`,
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
                            key: `orgTotalCount`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `이전수`,
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
                            key: `beforePeriodCount`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `검색기간수`,
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
                            key: `orgPeriodCount`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `다음수`,
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
                            key: `afterPeriodCount`,
                        },
                    ],
                    DATA_ID: ``,
                },
            ],
        },
    },
    VARIABLE_DATA_LIST: {
        HEAD: {
            COLUMN: [
                {
                    TITLE: [
                        {
                            name: `날짜`,
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
                {
                    TITLE: [
                        {
                            name: `개수`,
                            key: ``,
                        },
                    ],
                    TYPE: `text`,
                    STYLE: {
                        WIDTH : `40%`
                    },
                    CHECKBOX_TYPE: null,
                    ADD_CLASS: null,
                },
            ],
        },
        BODY: {
            DATA_PARSE: [
                {
                    TYPE: '',
                    DATA_PARSING: ``
                },
            ],
            COLUMN: [
                {
                    TITLE: [
                        {
                            name: `날짜`,
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
                            key: `date`,
                        },
                    ],
                    DATA_ID: ``,
                },
                {
                    TITLE: [
                        {
                            name: `개수`,
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
                            key: `dayCount`,
                        },
                    ],
                    DATA_ID: ``,
                },
            ],
        },
    },
    ADD_PARAMETER: {
        "subPageName" : ""
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
        else if(param === `search_param`){
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
    selectBoxCallback: function (choiceBox, param=null) {
        let selectObj = $(choiceBox).parents(".cm-select-box");
        selectObj.children(".select-item").val($(choiceBox).attr(`data-code`));
        selectObj.children(".select-item").trigger("keyup");
    },
    USING_SELECT_BOX: function(type='index', param = ''){
        CONST.constantsSet();
        SELECT_BOX_UTIL.MAKE({
            type: `organ`,
            datas: GBL.CONSTANTS.get(`ORGANIZATION_DATAS`),
            all: type === 'index' ? {code: `all`, title: `기관선택`, isUse: false} : null,
            default: type === 'index' ? null : GBL.CONSTANTS.get(`ORGANIZATION_DATAS`)[0],
            attr: {
                name: `targetOrganizationCode`,
                'add-class': [`use-option`]
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
    },
    SEARCH_ETC: function(){},
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
        SEARCH_TERM_UTIL.SET_UNIT_INIT({
            'PARENT': {
                'CLASS': `search-date-for-start-parent`,
            },
            'DATE': {
                'CLASS': [`search-date-for-start`, `use-option`],
                'ID': `start-date-time`,
                'NAME': `startDateTime`
            },
            'CALENDAR_ICON': {
                'CLASS': `search-date-for-start-calendar-icon`,
            }
        }, {
            MAX_DATE: {
                USE: true,
                VALUE: new Date().addYears(500).toString(`yyyy-MM-dd`)
            },
            TIME_PICKER: {
                USE: true
            },
            INIT_DATE: {
                USE: true,
                VALUE: new Date().addDays(-7).toString(`yyyy-MM-dd HH:mm:ss`)
            }
        });

        SEARCH_TERM_UTIL.SET_UNIT_INIT({
            'PARENT': {
                'CLASS': `search-date-for-end-parent`,
            },
            'DATE': {
                'CLASS': [`search-date-for-end`, `use-option`],
                'ID': `end-date-time`,
                'NAME': `endDateTime`
            },
            'CALENDAR_ICON': {
                'CLASS': `search-date-for-end-calendar-icon`,
            }
        }, {
            MAX_DATE: {
                USE: true,
                VALUE: new Date().addYears(500).toString(`yyyy-MM-dd`)
            },
            TIME_PICKER: {
                USE: true
            },
            INIT_DATE: {
                USE: true,
                VALUE: new Date().toString(`yyyy-MM-dd HH:mm:ss`)
            }
        });
    },
    VARIABLE_PAGE_FUNCTION: function(passingParams = {}){
        // $(".pagination").remove();
        SEARCH_TERM_UTIL.SET_UNIT_INIT({
            'PARENT': {
                'CLASS': `search-date-for-start-parent`,
            },
            'DATE': {
                'CLASS': [`search-date-for-start`, `use-option`],
                'ID': `start-date`,
                'NAME': `startDate`,
                'SIZE': {
                    'WIDTH': `72px`
                }
            },
            'CALENDAR_ICON': {
                'CLASS': `search-date-for-start-calendar-icon`,
            }
        }, {
            MAX_DATE: {
                USE: true,
                VALUE: new Date().addYears(500).toString(`yyyy-MM-dd`)
            },
            TIME_PICKER: {
                USE: false
            },
            INIT_DATE: {
                USE: true,
                VALUE: new Date().addDays(-15).toString(`yyyy-MM-dd`)
            }
        });

        SEARCH_TERM_UTIL.SET_UNIT_INIT({
            'PARENT': {
                'CLASS': `search-date-for-end-parent`,
            },
            'DATE': {
                'CLASS': [`search-date-for-end`, `use-option`],
                'ID': `end-date`,
                'NAME': `endDate`,
                'SIZE': {
                    'WIDTH': `72px`
                }
            },
            'CALENDAR_ICON': {
                'CLASS': `search-date-for-end-calendar-icon`,
            }
        }, {
            MAX_DATE: {
                USE: true,
                VALUE: new Date().addYears(500).toString(`yyyy-MM-dd`)
            },
            TIME_PICKER: {
                USE: false
            },
            INIT_DATE: {
                USE: true,
                VALUE: new Date().toString(`yyyy-MM-dd`)
            }
        });

        let chartHtml = `
            <div class="cm-table-wrap chart-view" id="chart-view" style="height: 234px; min-height: 234px; border: 1px solid var(--light-gray-100); margin-bottom: 16px; display: flex; justify-content: center; align-items: center">
                챠트 생성중..
            </div>
        `;
        etc.setHtmlParsing($(".form-common-search"), chartHtml);
    },
    chart_run: function(){
        // 챠트 그리기
        CHART_FOR_TREND_UTIL._RUN({
            parent: `chart-view`,
            chart: `chart-view-canvas`,
        }, GBL.CONSTANTS.get(`TREND_DATAS`));
    },
    VARIABLE_SUB_FUNCTION: function(passingParams = {}){},
    ADD_FUNCTION: function(passingParams= {}){},
    UPDATE_FUNCTION: function(passingParams= {}){},
    SEARCH_FUNCTION: function(passingParams= {}){
        if(passingParams.search){
            $('.cm-table-wrap.board-view')
                .css({"min-height":"100px", "height":"calc(100% - 350)px"})
                .slimScroll({
                    // height: `${$(window).height() - 646}px`,
                    // height: `calc(100% - 350)px`,
                    width: `100%`,
                    railVisible: true,
                    railColor: '#222',
                    railOpacity: 0.3,
                    wheelStep: 5,
                    allowPageScroll: false,
                    disableFadeOut: false,
                    size: `10px`
                });
            CONST.chart_run();
        }
    },
    SEARCH_PARAM_FUNCTION: function(passingParams= {}){
        if (passingParams.targetOrganizationCode !== null && passingParams.targetOrganizationCode !== ``) {
            passingParams.targetOrganizationCodeList = [passingParams.targetOrganizationCode];
            delete passingParams.targetOrganizationCode;
        }
        return passingParams;
    },
    VARIABLE_SEARCH_PARAM_FUNCTION: function(passingParams= {}){},
    SEARCH_PARAM_OK_FUNCTION: function(passingParams= {}){
        return true;
    },
    DYNAMIC_FUNCTION: function(passingParams = {}){},
    INDEX_SUB_FUNCTION: function(passingParams = {}){},
    ADD_CONFIRM_INSERT_FUNCTION: function(form, pageName = null){},
};