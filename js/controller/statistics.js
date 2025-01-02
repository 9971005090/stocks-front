"use strict";

const promise = async () => {
    // const {CONST: DEFAULT_CONST} = await import(`/js/custom/constant/default/constant.js${ver_string}`);
    // const {CONST: STATISTICS_CONST} = await import(`/js/custom/constant/statistics/constant.js${ver_string}`);
    // const {EVENT: CUSTOM_EVENT} = await import(`/js/custom/constant/util/util.js${ver_string}`);
    // const {EVENT: SELECT_BOX_EVENT, UTIL: SELECT_BOX_UTIL} = await import(`/js/custom/constant/event/select-box.js${ver_string}`);
    // const {EVENT: SEARCH_TERM_EVENT, UTIL: SEARCH_TERM_UTIL} = await import(`/js/custom/constant/event/search-term.js${ver_string}`);
    // const {UTIL: STATISTICS_UTIL} = await import(`/js/custom/constant/statistics/util.js${ver_string}`);
    // const {UTIL: ORGAN_UTIL} = await import(`/js/custom/constant/organ/util.js${ver_string}`);
    // const {UTIL: CHART_FOR_TREND_UTIL} = await import(`/js/custom/constant/statistics/chart-for-trend-use-chartjs.js${ver_string}`);
    // const html = await import(`/template/${GBL.DESIGN.THEME}/content/statistics.js${ver_string}`);
    // const htmlForUnit = await import(`/template/${GBL.DESIGN.THEME}/content/unit.js${ver_string}`);

    const preAction = function() {
        new Promise(function(resolve, reject) {
            let loadingEnd = function() {
                resolve(true);
            }
            let options = {
                files: [
                    // `/js/util/d3/library/d3-5.1.16.js`,
                    // `/js/util/d3/library/d3.selection-1.0.0.js`,
                    // `/js/util/d3/custom/d3.js${ver_string}`,
                    // `/js/util/jquery/jquery-ui-1.12.1.css${ver_string}`,
                    `/js/util/chartjs/chart-4.4.3.min.js`,
                    `/js/util/jquery/jquery-ui.css${ver_string}`,
                    `/js/util/jquery/jquery-ui-timepicker-addon.js${ver_string}`,
                    // `/js/util/jquery/jquery-ui-timepicker-addon.css${ver_string}`,
                    `/assets/css/theme/${GBL.DESIGN.THEME}/jquery-ui-timepicker-addon.css${ver_string}`,
                ],
                errorAfterType: "stop",
                callback: loadingEnd
            }
            let fileLoading = new preFileLoading();
            fileLoading.setInit(options);
            fileLoading.run();
        });
        Handlebars.registerHelper('_t', function(object, key) {
            const _p = GBL.CONSTANTS.get(`PARSING_ORGANIZATIONS`);
            if(key === "organizationCode"){
                return _p[object[key]];
            }
            return object[key];
        });
    }
    const pre = function() {
        return new Promise(function(resolve, reject) {
            let loadingEnd = function() {
                resolve(true);
            }
            let options = {
                files: [
                    // `/js/util/d3/library/d3-5.1.16.js`,
                    // `/js/util/d3/library/d3.selection-1.0.0.js`,
                    // `/js/util/d3/custom/d3.js${ver_string}`,
                    // `/js/util/jquery/jquery-ui-1.12.1.css${ver_string}`,
                    `/js/util/chartjs/chart-4.4.3.min.js`,
                    `/js/util/jquery/jquery-ui.css${ver_string}`,
                    `/js/util/jquery/jquery-ui-timepicker-addon.js${ver_string}`,
                    // `/js/util/jquery/jquery-ui-timepicker-addon.css${ver_string}`,
                    `/assets/css/theme/${GBL.DESIGN.THEME}/jquery-ui-timepicker-addon.css${ver_string}`,
                ],
                errorAfterType: "stop",
                callback: loadingEnd
            }
            let fileLoading = new preFileLoading();
            fileLoading.setInit(options);
            fileLoading.run();
        });
    }

    // const preAction = function() {
    //     const _t = ORGAN_UTIL.LIST();
    //     let _p = {};
    //     let _d = [];
    //     for (let i = 0; i < _t.organizationList.length; i++) {
    //         _p[_t.organizationList[i].organizationCode] = _t.organizationList[i].organizationName;
    //         _d.push({
    //             code: _t.organizationList[i].organizationCode,
    //             title: _t.organizationList[i].organizationName,
    //         });
    //     }
    //     GBL.CONSTANTS.set(`ORGANIZATIONS`, _t, true);
    //     GBL.CONSTANTS.set(`ORGANIZATION_DATAS`, _d, true);
    //     GBL.CONSTANTS.set(`PARSING_ORGANIZATIONS`, _p, true);
    // }
    //
    // const selectBoxCallback2 = function (choiceBox) {
    //     let selectObj = $(choiceBox).parents(".cm-select-box");
    //     selectObj.children(".select-item").val($(choiceBox).attr(`data-code`));
    // }
    //
    // const _search = function(type = `search`) { //first, search_managerUse
    //     let colspan = 5;
    //     $(`${STATISTICS_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.searching);
    //     $("#contents-by-data-table td").attr("colspan", colspan);
    //     if (type === `search`) {
    //         custom.etc.showLoading(GBL.DESIGN.MAIN_DIV_NAME);
    //     }
    //     const params = etc.formSearchParser(`.form-common-search`);
    //     if (params.targetOrganizationCode !== null && params.targetOrganizationCode !== ``) {
    //         params.targetOrganizationCodeList = [params.targetOrganizationCode];
    //         delete params.targetOrganizationCode;
    //     }
    //     const _t = STATISTICS_UTIL.LIST(params);
    //     custom.etc.removeLoading();
    //     if (_t.result === true) {
    //         if (_t.measurementPeriodCountList !== null && _t.measurementPeriodCountList.length > 0) {
    //
    //             $(`${STATISTICS_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(``);
    //             etc.setHtmlParsing($(`${STATISTICS_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`), html.dataTable, {datas: _t.measurementPeriodCountList});
    //             setAddEvent(`datas`);
    //         }
    //         else {
    //             $(`${STATISTICS_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.notFound);
    //             $("#contents-by-data-table td").attr("colspan", colspan);
    //         }
    //     }
    //     else {
    //         $(`${STATISTICS_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.fail);
    //         $("#contents-by-data-table td").attr("colspan", colspan);
    //     }
    // }
    // const _searchForDay = function(type = `search`) { //first, search_managerUse
    //     let colspan = 2;
    //     $(`${STATISTICS_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.searching);
    //     $("#contents-by-data-table td").attr("colspan", colspan);
    //     if (type === `search`) {
    //         custom.etc.showLoading(GBL.DESIGN.MAIN_DIV_NAME);
    //     }
    //     const params = etc.formSearchParser(`.form-common-search`);
    //     const _t = STATISTICS_UTIL.LIST_FOR_DAY(params);
    //     custom.etc.removeLoading();
    //     if (_t.result === true) {
    //         if (_t.measurementOrgDayCountList !== null && _t.measurementOrgDayCountList.length > 0) {
    //             for (let i = 0; i < _t.measurementOrgDayCountList.length; i++) {
    //                 _t.measurementOrgDayCountList[i] = STATISTICS_UTIL.DATA_PARSING(_t.measurementOrgDayCountList[i]);
    //             }
    //             GBL.CONSTANTS.set(`TREND_DATAS`, _t.measurementOrgDayCountList, true);
    //             $(`${STATISTICS_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(``);
    //             etc.setHtmlParsing($(`${STATISTICS_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`), html.dataTableForDay, {datas: _t.measurementOrgDayCountList});
    //             setAddEvent(`datasForDay`);
    //         }
    //         else {
    //             $(`${STATISTICS_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.notFound);
    //             $("#contents-by-data-table td").attr("colspan", colspan);
    //         }
    //     }
    //     else {
    //         $(`${STATISTICS_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.fail);
    //         $("#contents-by-data-table td").attr("colspan", colspan);
    //     }
    // }
    //
    // const setAddEvent = function(content = `index`){
    //     if (content === `index`) {
    //         // search EVENT
    //         CUSTOM_EVENT.SUBMIT_EVENT(null, _search, 'search');
    //     }
    //     else if (content === `datas`) {
    //
    //     }
    //     else if (content === `day`) {
    //         // search EVENT
    //         CUSTOM_EVENT.SUBMIT_EVENT(null, _searchForDay, 'search');
    //     }
    //     else if (content === `datasForDay`) {
    //         //70+56+40+66+48+50+66+200(챠트영역) = 396 + 250 = 646
    //         $('.cm-table-wrap.board-view').slimScroll({
    //             height: `${$(window).height() - 646}px`,
    //             width: `100%`,
    //             railVisible: true,
    //             railColor: '#222',
    //             railOpacity: 0.3,
    //             wheelStep: 5,
    //             allowPageScroll: false,
    //             disableFadeOut: false,
    //             size: `10px`
    //         });
    //
    //         // 챠트 그리기
    //         CHART_FOR_TREND_UTIL._RUN({
    //             parent: `chart-view`,
    //             chart: `chart-view-canvas`,
    //         }, GBL.CONSTANTS.get(`TREND_DATAS`));
    //
    //     }
    // }

    // const index = function() {
    //     $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html(``);
    //     etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.index);
    //
    //     SELECT_BOX_UTIL.MAKE({
    //         type: `organ`,
    //         datas: GBL.CONSTANTS.get(`ORGANIZATION_DATAS`),
    //         all: {code: `all`, title: `기관선택`, isUse: false},
    //         default: null,
    //         attr: {
    //             name: `targetOrganizationCode`,
    //             'add-class': [`use-option`]
    //         }
    //     }, {
    //         'parent': `.select-box-parent-for-organization`,
    //         'box': `.select-box-for-organization`,
    //         'option-list': `.select-box-option-list-for-organization`,
    //         'option-item': `.select-box-option-item-for-organization`,
    //         'label': `.select-box-label-for-organization`,
    //         'selected-class': `selected`,
    //         'box-id': 'select-box-for-organization'
    //     }, {
    //         'width': `width: 216px;`,
    //         'height': `height: 32px;`,
    //         'margin-left': `margin-left: 0px;`,
    //     }, selectBoxCallback2);
    //     // SEARCH_TERM_UTIL.SET_UNIT_INIT(`#start-date-time`, {
    //     //     paramMaxDate: new Date().addYears(500).toString(`yyyy-MM-dd`),
    //     //     showTimepicker: true,
    //     //     timeFormat: `HH:mm:ss`,
    //     //     initDate: {
    //     //         use: true,
    //     //         value: new Date().addDays(-7).toString(`yyyy-MM-dd HH:mm:ss`)
    //     //     },
    //     // });
    //     // SEARCH_TERM_UTIL.SET_UNIT_INIT(`#end-date-time`, {
    //     //     paramMaxDate: new Date().addYears(500).toString(`yyyy-MM-dd`),
    //     //     showTimepicker: true,
    //     //     timeFormat: `HH:mm:ss`,
    //     //     initDate: {
    //     //         use: true,
    //     //         value: new Date().toString(`yyyy-MM-dd HH:mm:ss`)
    //     //     }
    //     // });
    //
    //     SEARCH_TERM_UTIL.SET_UNIT_INIT({
    //         'PARENT': {
    //             'CLASS': `search-date-for-start-parent`,
    //         },
    //         'DATE': {
    //             'CLASS': [`search-date-for-start`, `use-option`],
    //             'ID': `start-date-time`,
    //             'NAME': `startDateTime`
    //         },
    //         'CALENDAR_ICON': {
    //             'CLASS': `search-date-for-start-calendar-icon`,
    //         }
    //     }, {
    //         MAX_DATE: {
    //             USE: true,
    //             VALUE: new Date().addYears(500).toString(`yyyy-MM-dd`)
    //         },
    //         TIME_PICKER: {
    //             USE: true
    //         },
    //         INIT_DATE: {
    //             USE: true,
    //             VALUE: new Date().addDays(-7).toString(`yyyy-MM-dd HH:mm:ss`)
    //         }
    //     });
    //
    //     SEARCH_TERM_UTIL.SET_UNIT_INIT({
    //         'PARENT': {
    //             'CLASS': `search-date-for-end-parent`,
    //         },
    //         'DATE': {
    //             'CLASS': [`search-date-for-end`, `use-option`],
    //             'ID': `end-date-time`,
    //             'NAME': `endDateTime`
    //         },
    //         'CALENDAR_ICON': {
    //             'CLASS': `search-date-for-end-calendar-icon`,
    //         }
    //     }, {
    //         MAX_DATE: {
    //             USE: true,
    //             VALUE: new Date().addYears(500).toString(`yyyy-MM-dd`)
    //         },
    //         TIME_PICKER: {
    //             USE: true
    //         },
    //         INIT_DATE: {
    //             USE: true,
    //             VALUE: new Date().toString(`yyyy-MM-dd HH:mm:ss`)
    //         }
    //     });
    //     setAddEvent();
    //     setTimeout(function() {
    //         _search(`first`);
    //     }, 200);
    // };
    // const day = function() {
    //     $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html(``);
    //     etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.day);
    //     SELECT_BOX_UTIL.MAKE({
    //         type: `organ`,
    //         datas: GBL.CONSTANTS.get(`ORGANIZATION_DATAS`),
    //         all: null,
    //         default: GBL.CONSTANTS.get(`ORGANIZATION_DATAS`)[0],
    //         attr: {
    //             name: `targetOrganizationCode`,
    //             'add-class': [`use-option`]
    //         }
    //     }, {
    //         'parent': `.select-box-parent-for-organization`,
    //         'box': `.select-box-for-organization`,
    //         'option-list': `.select-box-option-list-for-organization`,
    //         'option-item': `.select-box-option-item-for-organization`,
    //         'label': `.select-box-label-for-organization`,
    //         'selected-class': `selected`,
    //         'box-id': 'select-box-for-organization'
    //     }, {
    //         'width': `width: 216px;`,
    //         'height': `height: 32px;`,
    //         'margin-left': `margin-left: 0px;`,
    //     }, selectBoxCallback2);
    //
    //     SEARCH_TERM_UTIL.SET_UNIT_INIT({
    //         'PARENT': {
    //             'CLASS': `search-date-for-start-parent`,
    //         },
    //         'DATE': {
    //             'CLASS': [`search-date-for-start`, `use-option`],
    //             'ID': `start-date`,
    //             'NAME': `startDate`,
    //             'SIZE': {
    //                 'WIDTH': `72px`
    //             }
    //         },
    //         'CALENDAR_ICON': {
    //             'CLASS': `search-date-for-start-calendar-icon`,
    //         }
    //     }, {
    //         MAX_DATE: {
    //             USE: true,
    //             VALUE: new Date().addYears(500).toString(`yyyy-MM-dd`)
    //         },
    //         TIME_PICKER: {
    //             USE: false
    //         },
    //         INIT_DATE: {
    //             USE: true,
    //             VALUE: new Date().addDays(-15).toString(`yyyy-MM-dd`)
    //         }
    //     });
    //
    //     SEARCH_TERM_UTIL.SET_UNIT_INIT({
    //         'PARENT': {
    //             'CLASS': `search-date-for-end-parent`,
    //         },
    //         'DATE': {
    //             'CLASS': [`search-date-for-end`, `use-option`],
    //             'ID': `end-date`,
    //             'NAME': `endDate`,
    //             'SIZE': {
    //                 'WIDTH': `72px`
    //             }
    //         },
    //         'CALENDAR_ICON': {
    //             'CLASS': `search-date-for-end-calendar-icon`,
    //         }
    //     }, {
    //         MAX_DATE: {
    //             USE: true,
    //             VALUE: new Date().addYears(500).toString(`yyyy-MM-dd`)
    //         },
    //         TIME_PICKER: {
    //             USE: false
    //         },
    //         INIT_DATE: {
    //             USE: true,
    //             VALUE: new Date().toString(`yyyy-MM-dd`)
    //         }
    //     });
    //     // setAddEvent(`day`);
    //     // setTimeout(function() {
    //     //     _searchForDay(`first`);
    //     // }, 200);
    // };

    const index = async function() {
        let parameter = {
            "pageName" : "statistics",
        }
        await Seers.Loader.moduleLoad("crud", "index", parameter);
    };

    const dynamic = function(){
        let parameter = {
            "pageName" : "statistics",
        }
        Seers.Loader.moduleLoad("crud", "dynamic", parameter);
    }

    const day = function() {
        let parameter = {
            "pageName" : "statistics",
        }
        Seers.Loader.moduleLoad("crud", "day", parameter);
    }

    return {
        preAction: preAction,
        index: index,
        dynamic: dynamic,
        day: day,
    };
};

export { promise }