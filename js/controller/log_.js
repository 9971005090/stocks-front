"use strict";

const promise = async () => {
    const {CONST: DEFAULT_CONST} = await import(`/js/custom/constant/default/constant.js${ver_string}`);
    const {CONST: LOG_CONST} = await import(`/js/custom/constant/log/constant.js${ver_string}`);
    const {UTIL: LOG_UTIL} = await import(`/js/custom/constant/log/util.js${ver_string}`);
    const {EVENT: CUSTOM_EVENT} = await import(`/js/custom/constant/util/util.js${ver_string}`);
    const html = await import(`/template/${GBL.DESIGN.THEME}/content/log.js${ver_string}`);
    const htmlForUnit = await import(`/template/${GBL.DESIGN.THEME}/content/unit.js${ver_string}`);

    const _search = function(type = `search`) { //first, search_managerUse
        let colspan = 5;
        $(`${LOG_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.searching);
        $("#contents-by-data-table td").attr("colspan", colspan);
        if (type === `search`) {
            custom.etc.showLoading(GBL.DESIGN.MAIN_DIV_NAME);
        }
        const currentPage = $(`#log_currentPage`).length > 0 ? Number($(`#log_currentPage`).val()) : 1;
        const params = {
            'search': $(`.form-common-search-keyword`).val(),
            'pageNumber': currentPage,
            'count': DEFAULT_CONST.PAGING.DATA_COUNT,
            'errorType': $(`.radio-input[name="error-type"]:checked`).val(),
        }
        const _t = LOG_UTIL.PAGE(params);
        custom.etc.removeLoading();
        if (_t.result === true) {
            if (_t.dataLogList !== null && _t.dataLogList.length > 0) {
                let startVirtualNumber = Number.getStartVirtualNumber(_t.totalCount, DEFAULT_CONST.PAGING.DATA_COUNT, currentPage);
                for (let i = 0; i < _t.dataLogList.length; i++) {
                    // _t.dataLogList[i] = LOG_UTIL.DATA_PARSING(_t.dataLogList[i]);
                    _t.dataLogList[i].virtualNumber = startVirtualNumber - i;
                }
                $(`${LOG_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(``);
                etc.setHtmlParsing($(`${LOG_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`), html.dataTable, {datas: _t.dataLogList});
                setAddEvent(`datas`);
            }
            else {
                $(`${LOG_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.notFound);
                $("#contents-by-data-table td").attr("colspan", colspan);
            }

            // 페이징 처리 파라미터 셋팅 및 호출
            let pagingParameter = {
                prefix: "log",
                divName: ".pagination",
                totalData: _t.totalCount,
                callback: _search,
                callbackRun: false,
                dataPerPage: DEFAULT_CONST.PAGING.DATA_COUNT
            }
            if($(`#${pagingParameter.prefix}_currentPage`).length > 0) {
                pagingParameter.currentPage = Number($(`#${pagingParameter.prefix}_currentPage`).val());
                pagingParameter.dataPerPage = Number($(`#${pagingParameter.prefix}_dataPerPage`).val());
                pagingParameter.pageCount = Number($(`#${pagingParameter.prefix}_pageCount`).val());
            }

            if(_t.userAccountSimpleList === null){
                pagingParameter.totalData = 0;
            }
            Seers.Loader.moduleLoad("paging", "index", pagingParameter);
        }
        else {
            $(`${LOG_CONST.DESIGN.CONTENTS_BY_DATA_TABLE}`).html(htmlForUnit.fail);
            $("#contents-by-data-table td").attr("colspan", colspan);
        }
    }

    const setAddEvent = function(content = `index`){


        if (content === `index`) {
            // search EVENT
            CUSTOM_EVENT.SUBMIT_EVENT(`#log_currentPage`, _search, 'search');
        }
        else if (content === `datas`) {

        }
    }

    const index = function() {
        console.log(LOG_CONST.EXCEPTION_TYPE.TITLE);
        const _e = Array.deepCopy(LOG_CONST.EXCEPTION_TYPE.TITLE);
        const sortedKeys = Object.keys(_e).sort().reverse();
        console.log(sortedKeys);
        let sortedObj = {};
        sortedKeys.forEach(key => {
            sortedObj[key] = _e[key];
        });
        const _c = {
            EXCEPTION_TYPE: sortedObj,
        };
        console.log(sortedObj);
        GBL.CONSTANTS.set(`CONSTANTS`, _c, true);
        $(`${GBL.DESIGN.PAGE_DIV_NAME}`).html(``);
        etc.setHtmlParsing($(`${GBL.DESIGN.PAGE_DIV_NAME}`), html.index);
        // selectBoxSyncHis(`searchSyncHisSelectBox`, true);
        // selectBoxDeviceManager(`searchDeviceManagerSelectBox`, true);
        setAddEvent();
        setTimeout(function() {
            _search(`first`);
        }, 200);
    };

    return {
        index: index
    };
};

export { promise }